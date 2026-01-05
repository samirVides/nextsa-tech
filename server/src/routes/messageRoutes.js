import express from 'express';
import Message from '../models/Message.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js'; // <--- IMPORTAR SEGURIDAD

const router = express.Router();

// 1. Enviar mensaje (Público)
router.post('/', async (req, res) => {
    try {
        const { name, email, content } = req.body;
        const message = await Message.create({ name, email, content });
        res.status(201).json(message);
    } catch (error) {
        res.status(400).json({ message: 'Error al enviar mensaje' });
    }
});

// 2. Leer todos los mensajes (Solo Admin)
router.get('/', protect, adminOnly, async (req, res) => {
    try {
        const messages = await Message.find({}).sort({ createdAt: -1 }); // Los nuevos primero
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo mensajes' });
    }
});

// 3. Borrar mensaje (Solo Admin)
router.delete('/:id', protect, adminOnly, async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (message) {
            await message.deleteOne();
            res.json({ message: 'Mensaje eliminado' });
        } else {
            res.status(404).json({ message: 'Mensaje no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error borrando mensaje' });
    }
});

export default router;