import multer from 'multer';
import path from 'path';

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination(req, file, cb) {
    // Los archivos se guardarán temporalmente en la carpeta 'uploads'
    // Asegúrate de crear esta carpeta en la raíz del servidor
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    // Le damos un nombre único: nombreOriginal-fecha-extensión
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Filtro para aceptar solo imágenes
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|webp/;
  // Verificar extensión
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Verificar tipo MIME
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Solo se permiten imágenes (jpg, jpeg, png, webp)'));
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

export default upload;