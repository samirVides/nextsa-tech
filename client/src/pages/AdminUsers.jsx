import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit, FaCheck, FaTimes, FaUserShield } from 'react-icons/fa';
import api from '../api';
import Navbar from '../components/Navbar';
import AuthContext from '../context/AuthContext';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await api.get('/api/users');
        setUsers(data);
      } catch (error) {
        console.error('Error cargando usuarios');
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      try {
        await api.delete(`/api/users/${id}`);
        setUsers(users.filter((user) => user._id !== id));
      } catch (error) {
        alert('Error al eliminar');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <Navbar />
      <div className="pt-32 px-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
            <FaUserShield className="text-blue-500" /> Gestión de Usuarios
        </h1>

        <div className="overflow-x-auto glass rounded-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/50 border-b border-slate-700 text-gray-400 uppercase text-sm">
                <th className="p-4">ID</th>
                <th className="p-4">Nombre</th>
                <th className="p-4">Email</th>
                <th className="p-4 text-center">Admin</th>
                <th className="p-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b border-slate-800 hover:bg-slate-800/50 transition">
                  <td className="p-4 font-mono text-xs text-slate-500">{user._id.substring(20)}...</td>
                  <td className="p-4 font-bold">{user.name}</td>
                  <td className="p-4 text-blue-300">
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td className="p-4 text-center">
                    {user.role === 'admin' ? (
                      <FaCheck className="text-green-500 mx-auto" />
                    ) : (
                      <FaTimes className="text-red-500 mx-auto" />
                    )}
                  </td>
                  <td className="p-4 flex justify-center gap-3">
                    <Link 
                        to={`/admin/user/${user._id}/edit`} 
                        className="bg-slate-700 p-2 rounded hover:bg-blue-600 transition"
                        title="Editar"
                    >
                        <FaEdit />
                    </Link>
                    <button 
                        onClick={() => handleDelete(user._id)}
                        disabled={user._id === currentUser._id} // No borrarse a sí mismo
                        className={`p-2 rounded transition ${user._id === currentUser._id ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : 'bg-red-900/50 text-red-400 hover:bg-red-600 hover:text-white'}`}
                        title="Eliminar"
                    >
                        <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;