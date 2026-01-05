import express from 'express';
import { 
    authUser, 
    registerUser, 
    logoutUser, 
    getUserProfile,
    forgotPassword, 
    resetPassword,
    getUsers,      // <--- Importar
    deleteUser,    // <--- Importar
    getUserById,   // <--- Importar
    updateUser     // <--- Importar
} from '../controllers/userController.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Ruta Raíz (/api/users)
router.route('/')
    .post(registerUser) // Registro público
    .get(protect, adminOnly, getUsers); // Ver lista (Solo Admin)

// Rutas de Sesión
router.post('/login', authUser);
router.post('/logout', logoutUser);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resetToken', resetPassword);
router.route('/profile').get(protect, getUserProfile);

// Rutas de Gestión de Usuarios por ID (Solo Admin)
router.route('/:id')
    .delete(protect, adminOnly, deleteUser)
    .get(protect, adminOnly, getUserById)
    .put(protect, adminOnly, updateUser);

export default router;