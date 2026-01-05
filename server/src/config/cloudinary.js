import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

// 1. Configurar Cloudinary con tus credenciales
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// 2. Configurar el Almacenamiento
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'nexora_portfolio', // Nombre de la carpeta en tu nube
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'], // Formatos permitidos
        transformation: [{ width: 800, height: 600, crop: 'limit' }] // Opcional: Redimensionar imagen automáticamente
    }
});

// 3. Crear el middleware de subida
const upload = multer({ storage });

export default upload;