import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import Navbar from '../components/Navbar';

const AdminUserEdit = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get(`/api/users/${id}`);
        setName(data.name);
        setEmail(data.email);
        setIsAdmin(data.role === 'admin');
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/users/${id}`, {
        name,
        email,
        role: isAdmin ? 'admin' : 'user', // Convertir booleano a string
      });
      navigate('/admin/users');
    } catch (error) {
      alert('Error al actualizar usuario');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <Navbar />
      <div className="pt-32 px-4 flex justify-center">
        <div className="w-full max-w-lg glass p-8 rounded-xl">
          <Link to="/admin/users" className="text-gray-400 hover:text-white mb-4 block text-sm">← Volver</Link>
          <h2 className="text-2xl font-bold mb-6 text-blue-400">Editar Usuario</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-gray-400 text-sm mb-1">Nombre</label>
                <input 
                    type="text" 
                    className="w-full bg-slate-900 border border-slate-700 rounded p-3"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            
            <div>
                <label className="block text-gray-400 text-sm mb-1">Email</label>
                <input 
                    type="email" 
                    className="w-full bg-slate-900 border border-slate-700 rounded p-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded border border-slate-700">
                <input 
                    type="checkbox" 
                    id="isAdmin"
                    className="w-5 h-5 accent-blue-500"
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                />
                <label htmlFor="isAdmin" className="cursor-pointer select-none">
                    ¿Es Administrador?
                </label>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 font-bold py-3 rounded mt-4">
                Actualizar Usuario
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminUserEdit;