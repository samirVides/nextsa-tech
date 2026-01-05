import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import AuthContext from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { FaCloudUploadAlt } from 'react-icons/fa';

const BlogForm = () => {
  const [formData, setFormData] = useState({ title: '', content: '', pdfLink: '', videoLink: '' });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { id } = useParams(); // Para saber si estamos editando
  const { user } = useContext(AuthContext);

  // Cargar datos si estamos editando
  useEffect(() => {
    if (id) {
        const fetchPost = async () => {
            try {
                const { data } = await api.get(`/api/blog/${id}`);
                setFormData({
                    title: data.title,
                    content: data.content,
                    pdfLink: data.pdfLink || '',
                    videoLink: data.videoLink || ''
                });
                if(data.image?.url) setPreview(data.image.url);
            } catch (error) {
                console.error("Error cargando datos");
            }
        };
        fetchPost();
    }
  }, [id]);

  if (!user || user.role !== 'admin') return <div className="text-white pt-40 text-center">Acceso Denegado</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (image) data.append('image', image);

    try {
        if (id) {
            await api.put(`/api/blog/${id}`, data); // Actualizar
        } else {
            await api.post('/api/blog', data); // Crear
        }
        navigate('/blog');
    } catch (error) {
        alert('Error al guardar');
        setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setImage(file);
        setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-purple-500">
      <Navbar />
      <div className="pt-32 px-4 flex justify-center pb-20">
        <div className="w-full max-w-3xl glass p-8 md:p-12 rounded-xl">
          <h2 className="text-3xl font-bold mb-8 text-purple-400 border-b border-slate-700 pb-4">
              {id ? 'Editar Noticia' : 'Nueva Noticia'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-gray-400 text-sm mb-2">Título</label>
                <input 
                  value={formData.title}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 focus:border-purple-500 outline-none transition"
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  required 
                />
            </div>

            <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 text-center hover:border-purple-500 transition cursor-pointer relative group">
                <input type="file" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                {preview ? (
                    <img src={preview} alt="Preview" className="h-64 mx-auto object-contain rounded" />
                ) : (
                    <div className="text-gray-400 flex flex-col items-center">
                        <FaCloudUploadAlt className="text-4xl mb-2 group-hover:text-purple-400 transition" />
                        <span>Subir Imagen de Portada</span>
                    </div>
                )}
            </div>

            <div>
                <label className="block text-gray-400 text-sm mb-2">Contenido</label>
                <textarea 
                  value={formData.content}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 h-64 focus:border-purple-500 outline-none transition resize-none"
                  onChange={e => setFormData({...formData, content: e.target.value})}
                  required 
                />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-gray-400 text-sm mb-2">Link PDF (Opcional)</label>
                    <input 
                      value={formData.pdfLink}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 focus:border-purple-500 outline-none"
                      onChange={e => setFormData({...formData, pdfLink: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-gray-400 text-sm mb-2">Link Video (Opcional)</label>
                    <input 
                      value={formData.videoLink}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 focus:border-purple-500 outline-none"
                      onChange={e => setFormData({...formData, videoLink: e.target.value})}
                    />
                </div>
            </div>

            <button disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700 font-bold py-4 rounded-lg transition shadow-lg shadow-purple-500/20 disabled:opacity-50 mt-4">
                {loading ? 'Guardando...' : (id ? 'Actualizar Noticia' : 'Publicar Noticia')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogForm;