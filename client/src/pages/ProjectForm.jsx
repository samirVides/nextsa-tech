import { useState, useContext, useEffect } from 'react'; // <--- Importar useEffect
import { useNavigate, useParams } from 'react-router-dom'; // <--- Importar useParams
import api from '../api';
import AuthContext from '../context/AuthContext';
import { FaCloudUploadAlt } from 'react-icons/fa';

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    title: '', description: '', technologies: '', linkDemo: '', linkRepo: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { id } = useParams(); // Leer ID de la URL (si existe)
  const { user } = useContext(AuthContext);

  // MODO EDICIÓN: Cargar datos si hay ID
  useEffect(() => {
    if (id) {
        const fetchProject = async () => {
            try {
                // Buscamos el proyecto específico en la lista (o podriamos hacer un endpoint GET /:id)
                const { data } = await api.get('/api/projects'); 
                const project = data.find(p => p._id === id);
                
                if (project) {
                    setFormData({
                        title: project.title,
                        description: project.description,
                        technologies: project.technologies.join(', '), // Convertir array a string
                        linkDemo: project.linkDemo || '',
                        linkRepo: project.linkRepo || ''
                    });
                    setPreview(project.image.url); // Mostrar imagen actual
                }
            } catch (err) {
                setError('Error cargando datos del proyecto');
            }
        };
        fetchProject();
    }
  }, [id]);

  if (!user || user.role !== 'admin') return <div>Acceso Denegado</div>;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setImageFile(file);
        setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('technologies', formData.technologies);
      data.append('linkDemo', formData.linkDemo);
      data.append('linkRepo', formData.linkRepo);
      if (imageFile) {
        data.append('image', imageFile);
      }

      if (id) {
        // MODO EDICIÓN (PUT)
        await api.put(`/api/projects/${id}`, data);
      } else {
        // MODO CREACIÓN (POST)
        if (!imageFile) throw new Error("La imagen es obligatoria al crear");
        await api.post('/api/projects', data);
      }
      
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Error al guardar');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 flex justify-center">
      <div className="max-w-2xl w-full bg-slate-800 p-8 rounded-xl shadow-2xl border border-slate-700">
        <h2 className="text-3xl font-bold mb-6 text-blue-400">
            {id ? 'Editar Proyecto' : 'Nuevo Proyecto'} {/* Título dinámico */}
        </h2>
        
        {error && <p className="bg-red-500/20 text-red-400 p-3 rounded mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Título</label>
            <input name="title" value={formData.title} onChange={handleChange} className="w-full bg-slate-900 border border-slate-600 rounded p-2 focus:border-blue-500 outline-none" required />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Descripción</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className="w-full bg-slate-900 border border-slate-600 rounded p-2 h-32 outline-none" required />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Tecnologías</label>
            <input name="technologies" value={formData.technologies} onChange={handleChange} className="w-full bg-slate-900 border border-slate-600 rounded p-2 outline-none" required />
          </div>

          <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-blue-500 transition cursor-pointer relative">
            <input type="file" onChange={handleFileChange} accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            {preview ? (
                <img src={preview} alt="Vista previa" className="max-h-48 mx-auto rounded shadow-lg" />
            ) : (
                <div className="flex flex-col items-center text-gray-400">
                    <FaCloudUploadAlt className="text-4xl mb-2" />
                    <p>Subir nueva imagen (Opcional al editar)</p>
                </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input name="linkDemo" value={formData.linkDemo} onChange={handleChange} className="bg-slate-900 border border-slate-600 rounded p-2 outline-none" placeholder="Link Demo" />
            <input name="linkRepo" value={formData.linkRepo} onChange={handleChange} className="bg-slate-900 border border-slate-600 rounded p-2 outline-none" placeholder="Link GitHub" />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 text-white font-bold py-3 rounded mt-6 transition">
            {loading ? 'Guardando...' : (id ? 'Actualizar Proyecto' : 'Crear Proyecto')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;