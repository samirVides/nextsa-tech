import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import crypto from 'crypto';
import sendEmail from '../utils/sendEmail.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        });
    } else {
        res.status(401).json({ message: 'Email o contraseña inválidos' });
    }
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
};

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role
    };
    res.status(200).json(user);
};

// ==========================================
// NUEVAS FUNCIONES DE RECUPERACIÓN (Password)
// ==========================================

// @desc    Olvide mi contraseña (Envia email)
// @route   POST /api/users/forgotpassword
// @access  Public
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: 'No existe usuario con ese email' });
    }

    // 1. Generar token aleatorio
    const resetToken = crypto.randomBytes(20).toString('hex');

    // 2. Hashear el token y guardarlo en la DB
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutos

    await user.save();

    // 3. Crear URL de reseteo
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    const message = `
      <h1>Has solicitado restablecer tu contraseña</h1>
      <p>Haz clic en este enlace para crear una nueva contraseña:</p>
      <a href="${resetUrl}" clicktracking=off>${resetUrl}</a>
      <p>Si no fuiste tú, ignora este correo.</p>
    `;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Recuperación de Contraseña - Nexora Tech',
            message
        });
        res.status(200).json({ success: true, data: 'Correo enviado' });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        return res.status(500).json({ message: 'El correo no se pudo enviar' });
    }
};

// @desc    Restablecer contraseña (Nueva password)
// @route   PUT /api/users/resetpassword/:resetToken
// @access  Public
const resetPassword = async (req, res) => {
    // 1. Obtener el token de la URL y hashearlo para comparar
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');

    // 2. Buscar usuario con ese token y que no haya expirado
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
        return res.status(400).json({ message: 'Token inválido o expirado' });
    }

    // 3. Guardar nueva contraseña
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(201).json({ success: true, message: 'Contraseña actualizada' });
};
// ... (código anterior: authUser, registerUser, etc.)

// @desc    Obtener todos los usuarios (Admin)
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
    const users = await User.find({});
    res.json(users);
};

// @desc    Borrar usuario (Admin)
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        await user.deleteOne();
        res.json({ message: 'Usuario eliminado' });
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
};

// @desc    Obtener usuario por ID (Admin)
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
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
        user.role = req.body.role || user.role; // Aquí cambiamos el rol

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
        });
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
};

// --- ACTUALIZA EL EXPORT FINAL ---
export { 
    authUser, 
    registerUser, 
    logoutUser, 
    getUserProfile,
    forgotPassword, 
    resetPassword,
    // Nuevas funciones:
    getUsers,
    deleteUser,
    getUserById,
    updateUser
};
