import Blog from '../models/Blog.js';
import fs from 'fs';
import path from 'path';

// --- FUNCIÓN AUXILIAR: Procesar Galería ---
// Combina los textos (JSON) con los archivos nuevos (Multer)
const processGallery = (galleryTextsStr, newFiles) => {
    if (!galleryTextsStr) return [];

    try {
        // 1. Convertir el string JSON a objeto real
        const items = JSON.parse(galleryTextsStr); 
        const uploadedFiles = newFiles || [];
        let fileIndex = 0;

        // 2. Mapear cada item
        return items.map(item => {
            let finalUrl = item.existingUrl || null; // Si ya tenía URL (edición), la mantenemos

            // Si no tiene URL (es nuevo) y hay archivos disponibles, usamos el siguiente archivo subido
            if (!finalUrl && uploadedFiles[fileIndex]) {
                finalUrl = uploadedFiles[fileIndex].path.replace(/\\/g, '/'); // Aseguramos slash normal
                fileIndex++;
            }

            return {
                title: item.title || '',
                description: item.description || '',
                url: finalUrl
            };
        }).filter(item => item.url); // Eliminamos items que se hayan quedado sin imagen
    } catch (error) {
        console.error("Error procesando galería:", error);
        return [];
    }
};

// @desc    Obtener todos los blogs
// @route   GET /api/blogs
const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort({ createdAt: -1 }); // Más recientes primero
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener blogs' });
    }
};

// @desc    Obtener un blog por Slug o ID
// @route   GET /api/blogs/:id
const getBlogBySlug = async (req, res) => {
    try {
        // Intentamos buscar por slug primero, si no, por ID
        let blog = await Blog.findOne({ slug: req.params.id });
        
        if (!blog && req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            blog = await Blog.findById(req.params.id);
        }

        if (blog) {
            res.json(blog);
        } else {
            res.status(404).json({ message: 'Blog no encontrado' });
        }
    } catch (error) {
        res.status(404).json({ message: 'Error al buscar el blog' });
    }
};

// @desc    Crear nuevo blog
// @route   POST /api/blogs
const createBlog = async (req, res) => {
    try {
        const { title, content, category, author, video, galleryTexts } = req.body;

        // Verificar si se subieron archivos principales
        const imagePath = req.files && req.files['image'] ? req.files['image'][0].path.replace(/\\/g, '/') : null;
        const pdfPath = req.files && req.files['pdf'] ? req.files['pdf'][0].path.replace(/\\/g, '/') : null;
        const galleryFiles = req.files ? req.files['galleryImages'] : [];

        // Procesar la galería
        const galleryData = processGallery(galleryTexts, galleryFiles);

        const blog = new Blog({
            title,
            content,
            image: imagePath,
            category,
            author,
            video,
            pdf: pdfPath,
            gallery: galleryData // Array de objetos { title, description, url }
        });

        const createdBlog = await blog.save();
        res.status(201).json(createdBlog);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error al crear blog', error: error.message });
    }
};

// @desc    Actualizar blog
// @route   PUT /api/blogs/:id
const updateBlog = async (req, res) => {
    try {
        const { title, content, category, author, video, galleryTexts } = req.body;
        const blog = await Blog.findById(req.params.id);

        if (blog) {
            // Actualizar campos de texto si existen
            blog.title = title || blog.title;
            blog.content = content || blog.content;
            blog.category = category || blog.category;
            blog.author = author || blog.author;
            blog.video = video || blog.video;

            // Actualizar Portada (Si se subió una nueva)
            if (req.files && req.files['image']) {
                // (Opcional) Aquí podrías borrar la imagen anterior usando fs.unlink
                blog.image = req.files['image'][0].path.replace(/\\/g, '/');
            }

            // Actualizar PDF (Si se subió uno nuevo)
            if (req.files && req.files['pdf']) {
                blog.pdf = req.files['pdf'][0].path.replace(/\\/g, '/');
            }

            // Actualizar Galería (Solo si se envía data de galería)
            if (galleryTexts) {
                const galleryFiles = req.files ? req.files['galleryImages'] : [];
                blog.gallery = processGallery(galleryTexts, galleryFiles);
            }

            const updatedBlog = await blog.save();
            res.json(updatedBlog);
        } else {
            res.status(404).json({ message: 'Blog no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error al actualizar blog', error: error.message });
    }
};

// @desc    Eliminar blog
// @route   DELETE /api/blogs/:id
const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (blog) {
            // (Opcional) Borrar imagen principal del servidor
            /*
            if (blog.image && fs.existsSync(blog.image)) {
                fs.unlinkSync(blog.image);
            }
            */
            
            await blog.deleteOne();
            res.json({ message: 'Blog eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'Blog no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar blog' });
    }
};

export { 
    getBlogs, 
    getBlogBySlug, 
    createBlog, 
    updateBlog, 
    deleteBlog 
};