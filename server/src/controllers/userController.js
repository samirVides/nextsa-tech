import User from '../models/User.js';

// ==========================================
// GESTIÓN DE PERFIL (Usuario Logueado)
// ==========================================

// @desc    Obtener perfil del usuario actual
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
    // req.user viene del middleware 'protect'
    if (req.user) {
        res.json({
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role,
            isVerified: req.user.isVerified
        });
    } else {
        res.status(404);
        throw new Error('Usuario no encontrado');
    }
};

// @desc    Actualizar perfil del usuario actual
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            isVerified: updatedUser.isVerified,
            token: generateToken(updatedUser._id), // Opcional: renovar token si cambia algo crítico
        });
    } else {
        res.status(404);
        throw new Error('Usuario no encontrado');
    }
};

// ==========================================
// GESTIÓN DE ADMIN (CRUD Usuarios)
// ==========================================

// @desc    Obtener todos los usuarios
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
    const users = await User.find({});
    res.json(users);
};

// @desc    Borrar usuario
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        await user.deleteOne();
        res.json({ message: 'Usuario eliminado correctamente' });
    } else {
        res.status(404);
        throw new Error('Usuario no encontrado');
    }
};

// @desc    Obtener usuario por ID (Para editarlo)
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error('Usuario no encontrado');
    }
};

// @desc    Actualizar usuario (Admin)
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        // Solo el admin puede cambiar roles
        user.role = req.body.role || user.role; 

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
        });
    } else {
        res.status(404);
        throw new Error('Usuario no encontrado');
    }
};

export {
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
};