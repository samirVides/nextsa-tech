import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import crypto from 'crypto';
import sendEmail from '../utils/sendEmail.js';

// ==========================================
// AUTENTICACIÓN BÁSICA
// ==========================================

// @desc    Auth user & get token (LOGIN)
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
            role: user.role,
            isVerified: user.isVerified // Enviamos esto para que el frontend sepa
        });
    } else {
        res.status(401).json({ message: 'Email o contraseña inválidos' });
    }
};

// @desc    Register a new user (AHORA CON VERIFICACIÓN)
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('El usuario ya existe');
    }

    // 1. Generar token de verificación (hexadecimal aleatorio)
    const verificationToken = crypto.randomBytes(20).toString('hex');

    // 2. Crear usuario
    const user = await User.create({
        name,
        email,
        password,
        verificationToken // Guardamos el token
    });

    if (user) {
        // A. Loguear automáticamente
        generateToken(res, user._id);

        // B. Crear URL de verificación
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        const verifyUrl = `${frontendUrl}/verify-email/${verificationToken}`;

        // C. Mensaje HTML Profesional
        const message = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0f172a; color: #e2e8f0; padding: 20px; border-radius: 10px;">
                <h2 style="color: #3b82f6; text-align: center;">Bienvenido a NextSa Tech 🚀</h2>
                <p>Hola <strong>${user.name}</strong>,</p>
                <p>Gracias por unirte. Para activar tu cuenta, por favor verifica tu correo.</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${verifyUrl}" style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Verificar mi Cuenta</a>
                </div>
                <p style="font-size: 12px; color: #64748b; text-align: center;">Si no creaste esta cuenta, ignora este correo.</p>
            </div>
        `;

        // D. Enviar correo
        try {
            await sendEmail({
                email: user.email,
                subject: 'NextSa Tech - Verifica tu cuenta',
                message
            });
        } catch (error) {
            console.log("Error enviando email de verificación:", error);
        }

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            isVerified: user.isVerified,
            message: "Registro exitoso. ¡Revisa tu correo!"
        });
    } else {
        res.status(400);
        throw new Error('Datos de usuario inválidos');
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
    res.status(200).json({ message: 'Sesión cerrada exitosamente' });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
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

// ==========================================
// NUEVA FUNCIÓN: VERIFICACIÓN DE EMAIL
// ==========================================

// @desc    Verificar correo electrónico
// @route   GET /api/users/verify/:token
const verifyEmail = async (req, res) => {
    const { token } = req.params;

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
        res.status(400);
        throw new Error('Token inválido o expirado');
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.json({ message: 'Correo verificado correctamente.' });
};

// ==========================================
// RECUPERACIÓN DE CONTRASEÑA
// ==========================================

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: 'No existe usuario con ese email' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    // OJO: Ajusta esto a tu frontend
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const resetUrl = `${frontendUrl}/reset-password/${resetToken}`;

    const message = `
      <h1>Recuperar Contraseña</h1>
      <p>Haz clic en este enlace para crear una nueva contraseña:</p>
      <a href="${resetUrl}">${resetUrl}</a>
    `;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Recuperación de Contraseña',
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

const resetPassword = async (req, res) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
        return res.status(400).json({ message: 'Token inválido o expirado' });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(201).json({ success: true, message: 'Contraseña actualizada' });
};

// ==========================================
// FUNCIONES DE ADMIN
// ==========================================

const getUsers = async (req, res) => {
    const users = await User.find({});
    res.json(users);
};

const deleteUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        await user.deleteOne();
        res.json({ message: 'Usuario eliminado' });
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
};

const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
};

const updateUser = async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.role = req.body.role || user.role;

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

// ==========================================
// EXPORT FINAL (TODO INCLUIDO)
// ==========================================
export { 
    authUser, 
    registerUser, 
    logoutUser, 
    getUserProfile,
    verifyEmail,      // <--- ¡Nueva!
    forgotPassword, 
    resetPassword,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
};