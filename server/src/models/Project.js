import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'El título del proyecto es obligatorio'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    image: {
        type: Object,
        required: [true, 'La imagen es obligatoria'],
        // Guardaremos un objeto con url y public_id (para Cloudinary)
        url: String,
        public_id: String
    },
    technologies: {
        type: [String], // Array de strings. Ej: ['React', 'Node', 'MongoDB']
        required: true
    },
    linkDemo: {
        type: String, // URL del sitio en vivo
        required: false
    },
    linkRepo: {
        type: String, // URL de GitHub
        required: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Relación: Quién creó el proyecto (Tú)
        required: true
    }
}, {
    timestamps: true
});

const Project = mongoose.model('Project', projectSchema);
export default Project;