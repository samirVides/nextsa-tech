import { useEffect, useState, useContext } from 'react';
import { FaTrash, FaEnvelopeOpenText } from 'react-icons/fa';
import api from '../../api';
import AuthContext from '../../context/AuthContext';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const { user } = useContext(AuthContext);

  // Cargar mensajes al entrar
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await api.get('/api/messages');
        setMessages(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    if (user?.role === 'admin') fetchMessages();
  }, [user]);

  // Función para borrar
  const handleDelete = async (id) => {
    if (window.confirm('¿Seguro que quieres borrar este mensaje?')) {
      try {
        await api.delete(`/api/messages/${id}`);
        // Actualizar la lista visualmente quitando el borrado
        setMessages(messages.filter(msg => msg._id !== id));
      } catch (error) {
        alert('Error al borrar');
      }
    }
  };

  if (!user || user.role !== 'admin') return <div className="text-white text-center mt-20">Acceso Denegado</div>;

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 border-b border-slate-700 pb-4">
          <FaEnvelopeOpenText className="text-blue-500" />
          Bandeja de Entrada
          <span className="text-sm bg-blue-600 text-white px-2 py-1 rounded-full ml-auto">
            {messages.length} Mensajes
          </span>
        </h2>

        {messages.length === 0 ? (
          <p className="text-center text-gray-500 text-xl mt-20">No tienes mensajes nuevos.</p>
        ) : (
          <div className="grid gap-4">
            {messages.map((msg) => (
              <div key={msg._id} className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-blue-500 transition shadow-lg relative group">
                
                {/* Cabecera del mensaje */}
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 border-b border-slate-700/50 pb-2">
                  <div>
                    <h3 className="font-bold text-lg text-blue-300">{msg.name}</h3>
                    <a href={`mailto:${msg.email}`} className="text-sm text-gray-400 hover:text-white transition">
                      {msg.email}
                    </a>
                  </div>
                  <span className="text-xs text-slate-500 mt-2 md:mt-0">
                    {new Date(msg.createdAt).toLocaleString()}
                  </span>
                </div>

                {/* Contenido */}
                <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                  {msg.content}
                </p>

                {/* Botón Borrar (Aparece al pasar el mouse) */}
                <button 
                  onClick={() => handleDelete(msg._id)}
                  className="absolute top-4 right-4 p-2 text-slate-600 hover:text-red-500 hover:bg-red-500/10 rounded transition"
                  title="Borrar mensaje"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;