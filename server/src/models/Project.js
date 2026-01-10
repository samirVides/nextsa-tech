import mongoose from 'mongoose';

const projectSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: { 
    type: String, 
    required: true // Esta será la "Portada" principal del proyecto
  },
  link: {
    type: String,
    required: true,
  },
  // 👇 AQUÍ ESTÁ LO NUEVO: GALERÍA DE DETALLES
  gallery: [
    {
        url: { type: String },         // URL de la imagen extra
        title: { type: String },       // Título de esa sección (ej: "Panel de Admin")
        description: { type: String }  // Descripción detallada de esa imagen
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

export default Project;