import { useState, useEffect } from 'react';
import api from '../../api';
import { FaArrowLeft, FaSave, FaUserShield } from 'react-icons/fa';
import Swal from 'sweetalert2';

// Ahora recibe 'userId' y 'onBack' como propiedades del Dashboard
const AdminUserEdit = ({ userId, onBack }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get(`/api/users/${userId}`);
        setName(data.name);
        setEmail(data.email);
        setIsAdmin(data.role === 'admin');
        setLoading(false);
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'No se pudo cargar el usuario', 'error');
        onBack(); // Volver si falla
      }
    };
    if(userId) fetchUser();
  }, [userId, onBack]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/users/${userId}`, {
        name,
        email,
        role: isAdmin ? 'admin' : 'user', 
      });
      
      Swal.fire('¡Actualizado!', 'El usuario ha sido modificado.', 'success');
      onBack(); // Volver a la lista automáticamente
    } catch (error) {
      Swal.fire('Error', 'No se pudo actualizar', 'error');
    }
  };

  if (loading) return <div className="text-white">Cargando datos...</div>;

  return (
    <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl max-w-2xl mx-auto animate-fade-in-up">
        
        <button onClick={onBack} className="text-slate-400 hover:text-white mb-6 flex items-center gap-2 transition">
            <FaArrowLeft /> Volver a la lista
        </button>

        <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
            <FaUserShield className="text-blue-500"/> Editar Usuario
        </h2>
          
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label className="block text-slate-400 text-sm mb-2 font-bold">Nombre Completo</label>
                <input 
                    type="text" 
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 focus:border-blue-500 outline-none transition"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            
            <div>
                <label className="block text-slate-400 text-sm mb-2 font-bold">Correo Electrónico</label>
                <input 
                    type="email" 
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 focus:border-blue-500 outline-none transition"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="flex items-center gap-4 p-4 bg-slate-950 rounded-xl border border-slate-700 hover:border-blue-500/50 transition cursor-pointer" onClick={() => setIsAdmin(!isAdmin)}>
                <div className={`w-6 h-6 rounded border flex items-center justify-center transition ${isAdmin ? 'bg-blue-600 border-blue-600' : 'border-slate-500'}`}>
                    {isAdmin && <span className="text-white text-xs">✔</span>}
                </div>
                <div>
                    <span className="block text-white font-bold select-none">Permisos de Administrador</span>
                    <span className="text-xs text-slate-500 select-none">Si activas esto, el usuario tendrá acceso total al Dashboard.</span>
                </div>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl mt-4 flex items-center justify-center gap-2 transition shadow-lg shadow-blue-600/20">
                <FaSave /> Guardar Cambios
            </button>
        </form>
    </div>
  );
};

export default AdminUserEdit;