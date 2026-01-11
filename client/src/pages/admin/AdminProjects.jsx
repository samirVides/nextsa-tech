import { useEffect, useState } from 'react';
import api from '../../api';
import { FaTrash, FaEdit, FaProjectDiagram } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AdminProjects = ({ onEdit }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // 👇 ESTA FUNCIÓN ARREGLA TUS IMÁGENES
  const getImageUrl = (image) => {
    // Si la imagen viene como objeto (Cloudinary) o string (Local)
    const imgPath = image?.url || image; 
    
    if (!imgPath) return 'https://via.placeholder.com/150';
    if (imgPath.startsWith('http')) return imgPath; // Ya es una URL completa
    
    // Si es local, le pegamos el localhost:4000
    return `http://localhost:4000/${imgPath.replace(/\\/g, '/')}`;
  };

  const fetchProjects = async () => {
    try {
      const { data } = await api.get('/api/projects');
      setProjects(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Eliminar proyecto?',
      text: "Se borrará permanentemente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
            await api.delete(`/api/projects/${id}`);
            fetchProjects();
            Swal.fire('Eliminado', '', 'success');
        } catch (error) {
            Swal.fire('Error', 'No se pudo eliminar', 'error');
        }
      }
    });
  };

  if (loading) return <div className="text-white p-4">Cargando proyectos...</div>;

  return (
    <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl animate-fade-in">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <FaProjectDiagram className="text-green-500"/> Gestión de Proyectos ({projects.length})
      </h2>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-slate-300">
          <thead className="bg-slate-950 text-slate-400 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 rounded-l-lg">Imagen</th>
              <th className="px-6 py-3">Título</th>
              <th className="px-6 py-3">Cliente</th>
              <th className="px-6 py-3 rounded-r-lg text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {projects.map(project => (
              <tr key={project._id} className="hover:bg-slate-800/50 transition">
                <td className="px-6 py-4">
                    {/* USAMOS LA FUNCIÓN SEGURA AQUÍ */}
                    <img 
                        src={getImageUrl(project.image)} 
                        alt="Miniatura" 
                        className="w-16 h-10 object-cover rounded border border-slate-700"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
                    />
                </td>
                <td className="px-6 py-4 font-bold text-white">{project.title}</td>
                <td className="px-6 py-4 text-sm">{project.client || 'N/A'}</td>
                <td className="px-6 py-4 text-center flex items-center justify-center gap-2">
                  <button onClick={() => onEdit(project._id)} className="text-blue-400 hover:text-blue-300 transition hover:bg-blue-500/20 p-2 rounded-lg">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(project._id)} className="text-red-400 hover:text-red-300 transition hover:bg-red-500/20 p-2 rounded-lg">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {projects.length === 0 && (
            <p className="text-center text-slate-500 py-10">No hay proyectos creados aún.</p>
        )}
      </div>
    </div>
  );
};

export default AdminProjects;