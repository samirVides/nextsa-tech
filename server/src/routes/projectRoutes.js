import express from 'express';
// 👇 AQUÍ FALTABA AGREGAR 'updateProject'
import { getProjects, getProjectById, createProject, updateProject, deleteProject } from '../controllers/projectController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getProjects)
  .post(protect, admin, upload.fields([
      { name: 'image', maxCount: 1 },
      { name: 'galleryImages', maxCount: 10 }
  ]), createProject);

router.route('/:id')
  .get(getProjectById)
  .put(protect, admin, upload.fields([
      { name: 'image', maxCount: 1 },
      { name: 'galleryImages', maxCount: 10 }
  ]), updateProject) // Ahora sí funcionará porque ya lo importamos arriba
  .delete(protect, admin, deleteProject);

export default router;