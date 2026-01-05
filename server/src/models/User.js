import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    resetPasswordToken: String,
    resetPasswordExpire: Date
}, {
    timestamps: true
});

// Método para verificar contraseña
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// ============================================================
// VERSIÓN MODERNA (Sin usar 'next')
// ============================================================
userSchema.pre('save', async function () { // <--- Fíjate: Paréntesis vacíos
    
    // Si la contraseña no cambió, simplemente retornamos (salir)
    if (!this.isModified('password')) {
        return;
    }

    // Si cambió, la encriptamos y la función termina sola
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
export default User;