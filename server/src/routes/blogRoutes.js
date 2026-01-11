import express from 'express';
import { 
    getBlogs, 
    getBlogBySlug, 
    createBlog, 
    updateBlog, 
    deleteBlog 
} from '../controllers/blogController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js'; // Tu configuración de Multer

const router = express.Router();

// Configuración de campos de subida
const uploadFields = upload.fields([
    { name: 'image', maxCount: 1 },          // 1 Portada
    { name: 'pdf', maxCount: 1 },            // 1 PDF
    { name: 'galleryImages', maxCount: 10 }  // Hasta 10 imágenes extra
]);

router.route('/')
    .get(getBlogs)
    .post(protect, admin, uploadFields, createBlog); // 👈 Usar uploadFields

router.route('/:id') // Ojo: Si usas slug en el frontend, aquí el get debe buscar por slug o ID
    .get(getBlogBySlug)
    .put(protect, admin, uploadFields, updateBlog)   // 👈 Usar uploadFields
    .delete(protect, admin, deleteBlog);

export default router;