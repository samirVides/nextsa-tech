import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path'; // <--- 1. NUEVO: Importar path
import { fileURLToPath } from 'url'; // <--- 2. NUEVO: Importar esto para manejar rutas
import connectDB from './src/config/db.js';
import userRoutes from './src/routes/userRoutes.js';
import projectRoutes from './src/routes/projectRoutes.js';
import messageRoutes from './src/routes/messageRoutes.js';
import blogRoutes from './src/routes/blogRoutes.js';
import newsletterRoutes from './src/routes/newsletterRoutes.js';

// Configuración de variables de entorno
dotenv.config();

// Conectar a la Base de Datos
connectDB();

// --- CONFIGURACIÓN DE RUTAS (Vital para las imágenes) ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const whiteList = [
  "http://localhost:5173", 
  "https://nexora-tech-36tz2519u-andresvidesbs-projects.vercel.app", 
  "https://nexora-tech-eight.vercel.app",
  "https://nexora-tech.vercel.app"
];

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Bloqueado por CORS: ' + origin));
    }
  },
  credentials: true 
}));

// --- 3. NUEVO: HACER PÚBLICA LA CARPETA UPLOADS ---
// Esto permite que al entrar a http://localhost:4000/uploads/foto.png se vea la imagen
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas API
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/newsletter', newsletterRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'API de Nexora Tech funcionando correctamente 🚀' });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});