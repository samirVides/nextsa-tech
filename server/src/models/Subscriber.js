import mongoose from 'mongoose';

const subscriberSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // Evitar duplicados en esta lista
        trim: true,
        lowercase: true
    },
    source: {
        type: String,
        default: 'Web Newsletter' // Para saber de dónde vino
    }
}, { timestamps: true });

const Subscriber = mongoose.model('Subscriber', subscriberSchema);
export default Subscriber;