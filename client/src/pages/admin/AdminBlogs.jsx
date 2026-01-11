import { useEffect, useState } from 'react';
import api from '../../api';
import { FaTrash, FaEdit, FaNewspaper, FaPlus } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AdminBlogs = ({ onEdit }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función auxiliar para imágenes
  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/150';
    if (imagePath.startsWith('http')) return imagePath;
    // Ajusta esto a tu puerto del backend
    return `http://localhost:4000/${imagePath.replace(/\\/g, '/')}`;
  };

  const fetchBlogs = async () => {
    try {
      const { data } = await api.get('/api/blogs');
      setBlogs(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => { fetchBlogs(); }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Eliminar artículo?',
      text: "Se borrará del blog permanentemente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
            await api.delete(`/api/blogs/${id}`);
            fetchBlogs();
            Swal.fire('Eliminado', '', 'success');
        } catch (error) {
            Swal.fire('Error', 'No se pudo eliminar', 'error');
        }
      }
    });
  };

  if (loading) return <div className="text-white p-4">Cargando blogs...</div>;

  return (
    <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl animate-fade-in">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <FaNewspaper className="text-purple-500"/> Gestión de Blogs ({blogs.length})
      </h2>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-slate-300">
          <thead className="bg-slate-950 text-slate-400 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 rounded-l-lg">Portada</th>
              <th className="px-6 py-3">Título</th>
              <th className="px-6 py-3">Autor</th>
              <th className="px-6 py-3">Fecha</th>
              <th className="px-6 py-3 rounded-r-lg text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {blogs.map(blog => (
              <tr key={blog._id} className="hover:bg-slate-800/50 transition">
                <td className="px-6 py-4">
                    <img 
                        src={getImageUrl(blog.image)} 
                        alt="Blog" 
                        className="w-16 h-10 object-cover rounded border border-slate-700"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }} 
                    />
                </td>
                <td className="px-6 py-4 font-bold text-white truncate max-w-[200px]" title={blog.title}>{blog.title}</td>
                <td className="px-6 py-4 text-sm">{blog.author || 'Admin'}</td>
                <td className="px-6 py-4 text-sm">{new Date(blog.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-center flex items-center justify-center gap-2">
                  <button 
                    onClick={() => onEdit(blog._id)} 
                    className="text-blue-400 hover:text-blue-300 transition hover:bg-blue-500/20 p-2 rounded-lg"
                  >
                    <FaEdit />
                  </button>
                  <button 
                    onClick={() => handleDelete(blog._id)} 
                    className="text-red-400 hover:text-red-300 transition hover:bg-red-500/20 p-2 rounded-lg"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {blogs.length === 0 && (
            <p className="text-center text-slate-500 py-10">No hay artículos publicados.</p>
        )}
      </div>
    </div>
  );
};

export default AdminBlogs;