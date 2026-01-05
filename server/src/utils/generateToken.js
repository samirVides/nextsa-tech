import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
    // 1. Crear el token con el ID del usuario
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d' // El token dura 30 días
    });

    // 2. Guardar el token en una cookie segura
    res.cookie('jwt', token, {
        httpOnly: true, // No accesible vía JavaScript del navegador (Seguridad XSS)
        secure: false ,//process.env.NODE_ENV !== 'development', // Solo HTTPS en producción
        sameSite: 'strict', // Protege contra ataques CSRF
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 días en milisegundos
    });
};

export default generateToken;