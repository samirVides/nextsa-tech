import express from 'express';
import { getProjects, createProject, deleteProject, updateProject } from '../controllers/projectController.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';
import upload from '../config/cloudinary.js';

const router = express.Router();

// Ruta raíz (/api/projects)
router.route('/')
    .get(getProjects) // Cualquiera puede ver
    //.post(protect, adminOnly, createProject); // Solo Admin puede crear
    .post(protect, adminOnly, upload.single('image'), createProject);

// Ruta con ID (/api/projects/:id)
router.route('/:id')
.put(protect, adminOnly, upload.single('image'), updateProject)
    .delete(protect, adminOnly, deleteProject); // Solo Admin puede borrar

export default router;