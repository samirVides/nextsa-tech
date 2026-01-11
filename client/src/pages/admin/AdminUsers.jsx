import { useEffect, useState } from 'react';
import api from '../../api';
import { FaTrash, FaUserShield, FaCheckCircle, FaTimesCircle, FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AdminUsers = ({ onEdit }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/api/users');
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Eliminar usuario?',
      text: "No se podrá recuperar",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
            await api.delete(`/api/users/${id}`);
            fetchUsers();
            Swal.fire('Eliminado', '', 'success');
        } catch (error) {
            Swal.fire('Error', 'No se pudo eliminar', 'error');
        }
      }
    });
  };

  if (loading) return <div className="text-white p-4">Cargando usuarios...</div>;

  return (
    <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl animate-fade-in">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <FaUserShield className="text-purple-500"/> Gestión de Usuarios ({users.length})
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-slate-300">
          <thead className="bg-slate-950 text-slate-400 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 rounded-l-lg">Nombre</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Rol</th>
              <th className="px-6 py-3">Verificado</th>
              <th className="px-6 py-3 rounded-r-lg text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {users.map(user => (
              <tr key={user._id} className="hover:bg-slate-800/50 transition">
                <td className="px-6 py-4 font-bold text-white">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  {user.role === 'admin' 
                    ? <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-xs font-bold border border-purple-500/30">ADMIN</span>
                    : <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs font-bold">USER</span>
                  }
                </td>
                <td className="px-6 py-4">
                    {user.isVerified 
                        ? <FaCheckCircle className="text-green-500" title="Verificado"/> 
                        : <FaTimesCircle className="text-slate-600" title="No Verificado"/>
                    }
                </td>
                <td className="px-6 py-4 text-center flex items-center justify-center gap-2">
                  <button onClick={() => onEdit(user._id)} className="text-blue-400 hover:text-blue-300 transition hover:bg-blue-500/20 p-2 rounded-lg">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(user._id)} className="text-red-400 hover:text-red-300 transition hover:bg-red-500/20 p-2 rounded-lg">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;