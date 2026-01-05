import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    content: { type: String, required: true },
    read: { type: Boolean, default: false } // Para marcar si ya lo leíste
}, {
    timestamps: true
});

const Message = mongoose.model('Message', messageSchema);
export default Message; 