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

const whiteList = [
  "http://localhost:5173", // Para que funcione en tu PC
  "https://nexora-tech-36tz2519u-andresvidesbs-projects.vercel.app", 
  "https://nexora-tech-eight.vercel.app",// <--- ESTA ES LA URL DEL ERROR QUE TE DIO
  "https://nexora-tech.vercel.app" // (Opcional) Agrega también tu URL principal de Vercel si tienes una más corta
];

// ... (El resto de tu código de middlewares sigue igual) ...

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({
  origin: function (origin, callback) {
    // Permitir peticiones sin origen (como Postman o Apps móviles) o si está en la lista
    if (!origin || whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Bloqueado por CORS: ' + origin));
    }
  },
  credentials: true // ¡Vital para que funcionen las cookies/sesiones!
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

