import Project from '../models/Project.js';

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
        // Validación: Verificar si se subió imagen
        if (!req.file) {
            return res.status(400).json({ message: 'Por favor sube una imagen' });
        }

        // Convertir string "React, Node" a array (viene como texto en multipart/form-data)
        // A veces ya viene como array si usas postman, pero FormData lo envía como string
        let techs = req.body.technologies;
        if (typeof techs === 'string') {
            techs = techs.split(',').map(t => t.trim());
        }

        const project = new Project({
            title: req.body.title,
            description: req.body.description,
            // AQUÍ LA MAGIA: Cloudinary nos da path (url) y filename (public_id)
            image: {
                url: req.file.path,
                public_id: req.file.filename
            },
            technologies: techs,
            linkDemo: req.body.linkDemo,
            linkRepo: req.body.linkRepo,
            user: req.user._id
        });

        const createdProject = await project.save();
        res.status(201).json(createdProject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Actualizar un proyecto
// @route   PUT /api/projects/:id
// @access  Private/Admin

const updateProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }

        // Actualizar campos de texto
        project.title = req.body.title || project.title;
        project.description = req.body.description || project.description;
        project.linkDemo = req.body.linkDemo || project.linkDemo;
        project.linkRepo = req.body.linkRepo || project.linkRepo;

        // Actualizar tecnologías (si vienen nuevas)
        if (req.body.technologies) {
            let techs = req.body.technologies;
            if (typeof techs === 'string') {
                techs = techs.split(',').map(t => t.trim());
            }
            project.technologies = techs;
        }

        // Actualizar imagen (SOLO si se subió una nueva)
        if (req.file) {
            project.image = {
                url: req.file.path,
                public_id: req.file.filename
            };
        }

        const updatedProject = await project.save();
        res.json(updatedProject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Borrar un proyecto
// @route   DELETE /api/projects/:id
// @access  Private/Admin
const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (project) {
            await project.deleteOne();
            res.json({ message: 'Proyecto eliminado' });
        } else {
            res.status(404).json({ message: 'Proyecto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getProjects, createProject, updateProject, deleteProject };