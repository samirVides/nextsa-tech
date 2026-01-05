import mongoose from 'mongoose';

const blogSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }, // Descripción larga
    image: {
        url: String,
        public_id: String
    },
    pdfLink: { type: String },   // Link a Drive/Dropbox para PDFs
    videoLink: { type: String }, // Link a YouTube/Vimeo
    author: { type: String, default: 'Admin' }
}, {
    timestamps: true // Esto guarda la fecha de creación automáticamente
});

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;