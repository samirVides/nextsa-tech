import { useEffect, useState } from 'react';
import api from '../../api';
import { FaEnvelope, FaTrash, FaUser, FaUserSecret, FaCopy } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AdminNewsletter = () => {
    const [subscribers, setSubscribers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSubscribers = async () => {
        try {
            const { data } = await api.get('/api/newsletter');
            setSubscribers(data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubscribers();
    }, []);

    const handleDelete = (id) => {
        Swal.fire({
            title: '¿Desuscribir?',
            text: "Este usuario dejará de recibir correos.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await api.delete(`/api/newsletter/${id}`);
                    fetchSubscribers();
                    Swal.fire('Eliminado', 'El usuario ha sido desuscrito.', 'success');
                } catch (error) {
                    Swal.fire('Error', 'No se pudo eliminar', 'error');
                }
            }
        });
    };

    const copyToClipboard = () => {
        const emails = subscribers.map(s => s.email).join(', ');
        navigator.clipboard.writeText(emails);
        Swal.fire('Copiado', 'Lista de correos copiada al portapapeles', 'success');
    };

    if (loading) return <div className="text-white p-10">Cargando suscriptores...</div>;

    return (
        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl">
            
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <FaEnvelope className="text-blue-500"/> Gestión de Newsletter
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">
                        Total Suscriptores: <span className="text-white font-bold">{subscribers.length}</span>
                    </p>
                </div>
                <button 
                    onClick={copyToClipboard}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold transition shadow-lg shadow-blue-600/20"
                >
                    <FaCopy /> Copiar todos los emails
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-slate-300">
                    <thead className="text-xs uppercase bg-slate-800 text-slate-400">
                        <tr>
                            <th className="px-6 py-4 rounded-l-xl">Email</th>
                            <th className="px-6 py-4">Tipo</th>
                            <th className="px-6 py-4">Nombre (Si aplica)</th>
                            <th className="px-6 py-4">Fecha Suscripción</th>
                            <th className="px-6 py-4 rounded-r-xl text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {subscribers.map((sub) => (
                            <tr key={sub._id} className="hover:bg-slate-800/50 transition">
                                <td className="px-6 py-4 font-medium text-white">{sub.email}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 w-fit ${
                                        sub.type === 'Usuario Registrado' 
                                        ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' 
                                        : 'bg-green-500/10 text-green-400 border border-green-500/20'
                                    }`}>
                                        {sub.type === 'Usuario Registrado' ? <FaUser size={10}/> : <FaUserSecret size={10}/>}
                                        {sub.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm">{sub.name}</td>
                                <td className="px-6 py-4 text-sm">{new Date(sub.date).toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-center">
                                    <button 
                                        onClick={() => handleDelete(sub._id)}
                                        className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition"
                                        title="Desuscribir"
                                    >
                                        <FaTrash size={14} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {subscribers.length === 0 && (
                    <div className="text-center py-10 text-slate-500">
                        No hay suscriptores aún.
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminNewsletter;