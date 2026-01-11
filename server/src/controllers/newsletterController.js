import Subscriber from '../models/Subscriber.js';
import User from '../models/User.js';

// @desc    Suscribirse al newsletter (Público)
// @route   POST /api/newsletter
const subscribe = async (req, res) => {
    const { email } = req.body;

    // 1. Validar si ya existe en suscriptores
    const existsInSubscribers = await Subscriber.findOne({ email });
    if (existsInSubscribers) {
        return res.status(400).json({ message: 'Este correo ya está suscrito.' });
    }

    // 2. (Opcional) Validar si ya es un usuario registrado para no duplicar lógica
    // Pero lo guardaremos igual en Subscribers para tener registro de la acción
    
    try {
        await Subscriber.create({ email });
        res.status(201).json({ message: '¡Gracias por suscribirte!' });
    } catch (error) {
        res.status(500).json({ message: 'Error al suscribirse' });
    }
};

// @desc    Obtener TODOS los correos (Admin)
// @route   GET /api/newsletter
const getAllSubscribers = async (req, res) => {
    try {
        // 1. Obtener correos de la colección Subscriber
        const guests = await Subscriber.find({}).select('email createdAt source');

        // 2. Obtener correos de Usuarios Registrados que aceptaron newsletter
        const registered = await User.find({ newsletterSubscribed: true }).select('email createdAt name');

        // 3. Formatear para que tengan la misma estructura
        const guestList = guests.map(s => ({
            _id: s._id,
            email: s.email,
            type: 'Invitado',
            date: s.createdAt,
            name: 'N/A'
        }));

        const userList = registered.map(u => ({
            _id: u._id,
            email: u.email,
            type: 'Usuario Registrado',
            date: u.createdAt,
            name: u.name
        }));

        // 4. Unir listas (Podrías filtrar duplicados aquí si fuera necesario)
        const allEmails = [...userList, ...guestList];

        // Ordenar por fecha (más recientes primero)
        allEmails.sort((a, b) => new Date(b.date) - new Date(a.date));

        res.json(allEmails);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo suscriptores' });
    }
};

// @desc    Eliminar suscriptor (Admin)
// @route   DELETE /api/newsletter/:id
const deleteSubscriber = async (req, res) => {
    const { id } = req.params;
    // Intentamos borrar de Subscribers
    const sub = await Subscriber.findById(id);
    if (sub) {
        await sub.deleteOne();
        return res.json({ message: 'Suscriptor eliminado' });
    }
    
    // Si no está ahí, intentamos desuscribir al usuario (cambiar flag a false)
    const user = await User.findById(id);
    if (user) {
        user.newsletterSubscribed = false;
        await user.save();
        return res.json({ message: 'Usuario desuscrito correctamente' });
    }

    res.status(404).json({ message: 'No encontrado' });
};

export { subscribe, getAllSubscribers, deleteSubscriber };