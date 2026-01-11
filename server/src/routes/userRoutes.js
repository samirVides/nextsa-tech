import express from 'express';

// 1. Importamos la AUTENTICACIÓN desde authController
import { 
    authUser, 
    registerUser, 
    logoutUser, 
    verifyEmail,
    forgotPassword, 
    resetPassword 
} from '../controllers/authController.js';

// 2. Importamos la GESTIÓN DE USUARIOS desde userController
import { 
    getUserProfile, 
    updateUserProfile, 
    getUsers, 
    deleteUser, 
    getUserById, 
    updateUser 
} from '../controllers/userController.js';

import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// --- RUTAS PÚBLICAS (Auth) ---
router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/logout', logoutUser);
router.get('/verify/:token', verifyEmail);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resetToken', resetPassword);

// --- RUTAS PRIVADAS (Perfil) ---
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

// --- RUTAS DE ADMIN ---
router.route('/')
    .get(protect, admin, getUsers);

router.route('/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser);

export default router;