import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import connectDB from './src/config/db.js'; // <--- 1. Importar
import userRoutes from './src/routes/userRoutes.js';
import projectRoutes from './src/routes/projectRoutes.js';
import messageRoutes from './src/routes/messageRoutes.js';
import blogRoutes from './src/routes/blogRoutes.js';

// Configuración de variables de entorno
dotenv.config();

// 2. Conectar a la Base de Datos
connectDB();

const app = express();

// ... (El resto de tu código de middlewares sigue igual) ...

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], 
    credentials: true
}));

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/blog', blogRoutes);
app.get('/', (req, res) => {
    res.json({ message: 'API de Nexora Tech funcionando correctamente 🚀' });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});

