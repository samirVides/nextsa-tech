import mongoose from 'mongoose';

const projectSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, // Imagen principal
  link: { type: String, required: true },
  
  // 👇 ESTO ES LO QUE FALTA ACTUALIZAR PARA QUE RECIBA LA GALERÍA
  gallery: [
    {
        url: { type: String },
        title: { type: String },
        description: { type: String }
    }
  ],
  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  technologies: { type: Array } // (Opcional si lo sigues usando)
}, {
  timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);
export default Project;