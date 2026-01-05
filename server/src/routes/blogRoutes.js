import express from 'express';
import Blog from '../models/Blog.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';
import upload from '../config/cloudinary.js';

const router = express.Router();

// 1. Obtener todas las noticias (Público)
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 }); // Las más nuevas primero
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener noticias' });
    }
});

// 2. Obtener una noticia por ID (Público)
router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (blog) res.json(blog);
        else res.status(404).json({ message: 'Noticia no encontrada' });
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' });
    }
});

// 3. Crear noticia (Solo Admin)
router.post('/', protect, adminOnly, upload.single('image'), async (req, res) => {
    try {
        const { title, content, pdfLink, videoLink } = req.body;
        let imageData = {};
        
        if (req.file) {
            imageData = { url: req.file.path, public_id: req.file.filename };
        }

        const blog = await Blog.create({
            title,
            content,
            image: imageData,
            pdfLink,
            videoLink
        });
        res.status(201).json(blog);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear noticia' });
    }
});

// 4. Borrar noticia (Solo Admin)
router.delete('/:id', protect, adminOnly, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (blog) {
            await blog.deleteOne();
            res.json({ message: 'Noticia eliminada' });
        } else {
            res.status(404).json({ message: 'No encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar' });
    }
});
// ... (código anterior get, post, delete)

// 5. Actualizar noticia (Solo Admin) - NUEVO
router.put('/:id', protect, adminOnly, upload.single('image'), async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Noticia no encontrada' });

        // Actualizar campos de texto
        blog.title = req.body.title || blog.title;
        blog.content = req.body.content || blog.content;
        blog.pdfLink = req.body.pdfLink || blog.pdfLink;
        blog.videoLink = req.body.videoLink || blog.videoLink;

        // Si suben nueva imagen, reemplazarla
        if (req.file) {
            blog.image = {
                url: req.file.path,
                public_id: req.file.filename
            };
        }

        const updatedBlog = await blog.save();
        res.json(updatedBlog);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar noticia' });
    }
});

export default router;