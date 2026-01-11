import mongoose from 'mongoose';

const blogSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String }, // Portada
    category: { type: String },
    author: { type: String },
    video: { type: String }, // Link de YouTube
    pdf: { type: String },   // Archivo PDF
    
    // Array de objetos para la galería (CORRECTO)
    gallery: [{
        url: { type: String, required: true },
        title: { type: String },
        description: { type: String }
    }],
    
    slug: { type: String, unique: true }
}, {
    timestamps: true
});

// 👇 CORRECCIÓN AQUÍ: Quitamos 'next' de los parámetros y del cuerpo.
// Mongoose detectará automáticamente cuando termine esta función.
blogSchema.pre('save', function() {
    if (this.isModified('title')) {
        this.slug = this.title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '') // Elimina caracteres especiales
            .replace(/[\s_-]+/g, '-') // Reemplaza espacios con guiones
            .replace(/^-+|-+$/g, ''); // Elimina guiones al inicio/final
    }
});

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;