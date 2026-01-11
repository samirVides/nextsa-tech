import Project from '../models/Project.js';
import cloudinary from '../config/cloudinary.js'; 
import fs from 'fs';
// @desc    Obtener todos los proyectos
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({}).sort({ createdAt: -1 }); // Los más nuevos primero
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Crear un proyecto
// @route   POST /api/projects
// @access  Private/Admin
const createProject = async (req, res) => {
  try {
    const { title, description, link, galleryTexts } = req.body;

    // 1. Validar Imagen Principal
    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: 'La imagen principal es obligatoria' });
    }

    // 2. Subir Imagen Principal a Cloudinary
    const mainImgResult = await cloudinary.uploader.upload(req.files.image[0].path, {
      folder: 'nexora-projects',
    });
    
    // Borrar archivo temporal de la imagen principal
    try { fs.unlinkSync(req.files.image[0].path); } catch (e) {}

    // 3. Procesar Galería (Si hay imágenes)
    let galleryData = [];
    
    // Convertimos los textos que vienen como string JSON a objeto real
    const parsedGalleryTexts = galleryTexts ? JSON.parse(galleryTexts) : [];

    if (req.files.galleryImages) {
        // Subimos todas las imágenes de galería en paralelo
        const uploadPromises = req.files.galleryImages.map(file => 
            cloudinary.uploader.upload(file.path, { folder: 'nexora-projects/gallery' })
        );
        
        const uploadResults = await Promise.all(uploadPromises);

        // Combinamos la URL subida con el título/descripción correspondiente
        galleryData = uploadResults.map((result, index) => {
            // Borrar archivo temporal
            try { fs.unlinkSync(req.files.galleryImages[index].path); } catch (e) {}
            
            return {
                url: result.secure_url,
                title: parsedGalleryTexts[index]?.title || 'Sin Título',
                description: parsedGalleryTexts[index]?.description || ''
            };
        });
    }

    // 4. Guardar en Base de Datos
    const project = new Project({
      title,
      description,
      link,
      image: mainImgResult.secure_url,
      gallery: galleryData, // Guardamos el array completo
      user: req.user._id,
    });

    const createdProject = await project.save();
    res.status(201).json(createdProject);

  } catch (error) {
    console.error("Error al crear proyecto:", error);
    res.status(500).json({ message: 'Error en el servidor al crear proyecto' });
  }
};

// @desc    Obtener un proyecto por ID
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: 'Proyecto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
};



// @desc    Actualizar un proyecto
// @route   PUT /api/projects/:id
// @access  Private/Admin
const updateProject = async (req, res) => {
  try {
    const { title, description, link } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Proyecto no encontrado' });
    }

    // --- ACTUALIZAR TEXTOS ---
    project.title = title || project.title;
    project.description = description || project.description;
    project.link = link || project.link;

    // --- ACTUALIZAR IMAGEN PRINCIPAL (Si subieron una nueva) ---
    if (req.files && req.files.image) {
        // 1. Borrar la imagen anterior de Cloudinary
        if (project.image && project.image.public_id) {
            await cloudinary.uploader.destroy(project.image.public_id);
        }

        // 2. Subir la nueva
        const result = await cloudinary.uploader.upload(req.files.image[0].path, {
            folder: 'nexora-projects'
        });
        
        // 3. Borrar archivo temporal
        try { fs.unlinkSync(req.files.image[0].path); } catch(e) {}

        // 4. Asignar al proyecto
        project.image = {
            url: result.secure_url,
            public_id: result.public_id
        };
    }

    // --- AGREGAR FOTOS A LA GALERÍA (Si subieron nuevas) ---
    if (req.files && req.files.galleryImages) {
        let galleryData = [];
        try {
            // Intentar leer los títulos/descripciones nuevos
            galleryData = req.body.galleryData ? JSON.parse(req.body.galleryData) : [];
        } catch (error) {
            galleryData = [];
        }

        for (let i = 0; i < req.files.galleryImages.length; i++) {
            const file = req.files.galleryImages[i];
            
            // Subir a Cloudinary
            const result = await cloudinary.uploader.upload(file.path, {
                folder: 'nexora-projects/gallery'
            });

            // Borrar temporal
            try { fs.unlinkSync(file.path); } catch(e) {}

            const meta = galleryData[i] || {};

            // Agregar al array existente (push)
            project.gallery.push({
                url: result.secure_url,
                public_id: result.public_id,
                title: meta.title || '',
                description: meta.description || ''
            });
        }
    }

    // --- GUARDAR CAMBIOS ---
    const updatedProject = await project.save();
    res.json(updatedProject);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar proyecto' });
  }
};

// @desc    Borrar un proyecto (Versión Nuclear + Logs)
// @route   DELETE /api/projects/:id
// @access  Private/Admin
const deleteProject = async (req, res) => {
  // 1. LOG DE RASTREO: Veremos si llega la petición
  console.log("📢 INTENTANDO ELIMINAR PROYECTO:", req.params.id);

  try {
    // Buscamos el proyecto solo para obtener los IDs de las fotos
    const project = await Project.findById(req.params.id);

    if (!project) {
      console.log("❌ Proyecto no encontrado en DB");
      return res.status(404).json({ message: 'Proyecto no encontrado' });
    }

    // --- INTENTO DE BORRAR FOTOS (Ignora si falla) ---
    try {
        if (project.image && project.image.public_id) {
            await cloudinary.uploader.destroy(project.image.public_id);
        }
        if (project.gallery && project.gallery.length > 0) {
            for (const item of project.gallery) {
                if (item.public_id) {
                    await cloudinary.uploader.destroy(item.public_id);
                }
            }
        }
        console.log("✅ Imágenes eliminadas de Cloudinary");
    } catch (err) {
        console.log("⚠️ Error borrando imágenes (se ignora):", err.message);
    }

    // --- BORRADO NUCLEAR DIRECTO ---
    // Usamos findByIdAndDelete que fuerza el borrado en MongoDB
    await Project.findByIdAndDelete(req.params.id);
    
    console.log("🚀 ¡PROYECTO BORRADO DE LA DB EXITOSAMENTE!");
    res.json({ message: 'Proyecto eliminado correctamente' });

  } catch (error) {
    console.error("☠️ ERROR FATAL EN ELIMINACIÓN:", error);
    res.status(500).json({ message: 'Error al eliminar proyecto' });
  }
};
export { getProjects, createProject, updateProject, deleteProject,getProjectById};