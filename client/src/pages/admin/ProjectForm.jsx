import { useState, useEffect } from 'react';
import api from '../../api';
import { FaCloudUploadAlt, FaPlus, FaTrash, FaImage, FaSave, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';

// Recibimos 'projectId' desde el Dashboard para editar sin recargar
const ProjectForm = ({ projectId }) => {
  // --- ESTADOS PRINCIPALES ---
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [client, setClient] = useState('');
  const [link, setLink] = useState('');
  
  // Estado Imagen Principal
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Estado Galería (Lo que te faltaba)
  const [galleryItems, setGalleryItems] = useState([]);

  const [loading, setLoading] = useState(false);

  // --- CARGAR DATOS SI ESTAMOS EDITANDO ---
  useEffect(() => {
    if (projectId) {
      const fetchProject = async () => {
        try {
          const { data } = await api.get(`/api/projects/${projectId}`);
          
          // 1. Cargar Datos Básicos
          setTitle(data.title);
          setDescription(data.description);
          setClient(data.client || '');
          setLink(data.link || '');
          
          // 2. Cargar Imagen Principal
          if (data.image) {
             const imgUrl = data.image.url || data.image;
             // Ajuste para imágenes locales vs Cloudinary
             setPreview(imgUrl.startsWith('http') ? imgUrl : `http://localhost:4000/${imgUrl.replace(/\\/g, '/')}`);
          }

          // 3. Cargar Galería Existente
          if (data.gallery && data.gallery.length > 0) {
            setGalleryItems(data.gallery.map(item => ({
                title: item.title || '',
                description: item.description || '',
                url: item.url, // URL existente
                file: null,    // No hay archivo nuevo aún
                preview: item.url.startsWith('http') ? item.url : `http://localhost:4000/${item.url.replace(/\\/g, '/')}`
            })));
          } else {
            setGalleryItems([]);
          }

        } catch (error) {
          console.error(error);
          Swal.fire('Error', 'No se pudo cargar el proyecto', 'error');
        }
      };
      fetchProject();
    } else {
      // Limpiar formulario si es nuevo proyecto
      resetForm();
    }
  }, [projectId]);

  const resetForm = () => {
      setTitle(''); setDescription(''); setClient(''); setLink(''); 
      setImage(null); setPreview(null); 
      setGalleryItems([]);
  };

  // --- MANEJADORES DE IMAGEN PRINCIPAL ---
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // --- MANEJADORES DE GALERÍA (La lógica recuperada) ---
  const addGalleryItem = () => {
    setGalleryItems([...galleryItems, { title: '', description: '', file: null, preview: null }]);
  };

  const removeGalleryItem = (index) => {
    setGalleryItems(galleryItems.filter((_, i) => i !== index));
  };

  const handleGalleryChange = (index, field, value) => {
    const newItems = [...galleryItems];
    if (field === 'file') {
      const file = value;
      if (file) {
        newItems[index].file = file;
        newItems[index].preview = URL.createObjectURL(file);
      }
    } else {
      newItems[index][field] = value;
    }
    setGalleryItems(newItems);
  };

  // --- ENVÍO DEL FORMULARIO ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('client', client);
    formData.append('link', link);

    if (image) formData.append('image', image);

    // Lógica compleja de Galería (Texto + Archivos)
    const galleryTexts = galleryItems.map(item => ({
        title: item.title,
        description: item.description,
        existingUrl: item.url || null // Para mantener imágenes viejas si no se cambian
    }));

    formData.append('galleryTexts', JSON.stringify(galleryTexts));

    galleryItems.forEach(item => {
        if (item.file) {
            formData.append('galleryImages', item.file);
        }
    });

    try {
      if (projectId) {
        await api.put(`/api/projects/${projectId}`, formData);
        Swal.fire('¡Actualizado!', 'Proyecto y galería actualizados.', 'success');
      } else {
        if (!image) throw new Error("La imagen de portada es obligatoria");
        await api.post('/api/projects', formData);
        Swal.fire('¡Creado!', 'Proyecto creado con éxito.', 'success');
        resetForm();
      }
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || error.message || 'Error al guardar';
      Swal.fire('Error', msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl max-w-5xl mx-auto animate-fade-in">
        
        {/* Encabezado */}
        <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                {projectId ? '✏️ Editar Proyecto' : '🚀 Nuevo Proyecto'}
            </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* SECCIÓN 1: INFORMACIÓN PRINCIPAL */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Columna Izquierda: Inputs Texto */}
                <div className="lg:col-span-2 space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-slate-400 text-sm font-bold mb-2">Título</label>
                            <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-blue-500 outline-none" required />
                        </div>
                        <div>
                            <label className="block text-slate-400 text-sm font-bold mb-2">Cliente</label>
                            <input type="text" value={client} onChange={e => setClient(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-blue-500 outline-none" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-slate-400 text-sm font-bold mb-2">Enlace (URL)</label>
                        <input type="url" value={link} onChange={e => setLink(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-blue-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-slate-400 text-sm font-bold mb-2">Descripción General</label>
                        <textarea rows="4" value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-blue-500 outline-none resize-none" required></textarea>
                    </div>
                </div>

                {/* Columna Derecha: Imagen Portada */}
                <div className="lg:col-span-1">
                    <label className="block text-slate-400 text-sm font-bold mb-2">Portada</label>
                    <div className={`relative h-64 border-2 border-dashed border-slate-700 rounded-2xl flex flex-col items-center justify-center p-2 transition hover:border-blue-500 ${!preview && 'hover:bg-slate-800/50'}`}>
                        {preview ? (
                            <>
                                <img src={preview} alt="Portada" className="w-full h-full object-cover rounded-xl shadow-lg" />
                                <button type="button" onClick={() => { setImage(null); setPreview(null); }} className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-500 transition">
                                    <FaTrash size={12} />
                                </button>
                            </>
                        ) : (
                            <div className="text-center">
                                <FaCloudUploadAlt className="text-4xl text-slate-600 mx-auto mb-2" />
                                <p className="text-slate-500 text-sm">Subir Portada</p>
                            </div>
                        )}
                        <input type="file" onChange={handleMainImageChange} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                    </div>
                </div>
            </div>

            <hr className="border-slate-800" />

            {/* SECCIÓN 2: GALERÍA DINÁMICA (RESTAURADA) */}
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <FaImage className="text-purple-500"/> Galería de Detalles
                    </h3>
                    <button type="button" onClick={addGalleryItem} className="bg-purple-600/20 text-purple-400 border border-purple-500/30 px-4 py-2 rounded-lg text-sm font-bold hover:bg-purple-600 hover:text-white transition flex items-center gap-2">
                        <FaPlus /> Agregar Sección
                    </button>
                </div>

                <div className="space-y-6">
                    {galleryItems.length === 0 && (
                        <p className="text-slate-500 text-center py-8 border border-dashed border-slate-800 rounded-xl">No hay elementos en la galería aún.</p>
                    )}

                    {galleryItems.map((item, index) => (
                        <div key={index} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 relative group animate-fade-in-up">
                            {/* Botón Eliminar Item */}
                            <button type="button" onClick={() => removeGalleryItem(index)} className="absolute -top-3 -right-3 bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-500 transition z-10">
                                <FaTrash size={12} />
                            </button>

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Datos del Item */}
                                <div className="space-y-4">
                                    <input 
                                        placeholder="Título de la sección (Ej: Panel Admin)" 
                                        value={item.title} 
                                        onChange={(e) => handleGalleryChange(index, 'title', e.target.value)} 
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-white focus:border-purple-500 outline-none" 
                                    />
                                    <textarea 
                                        placeholder="Descripción del detalle..." 
                                        value={item.description} 
                                        onChange={(e) => handleGalleryChange(index, 'description', e.target.value)} 
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-white h-32 resize-none focus:border-purple-500 outline-none" 
                                    />
                                </div>

                                {/* Imagen del Item */}
                                <div className="relative h-48 border-2 border-dashed border-slate-800 rounded-xl flex items-center justify-center overflow-hidden hover:border-purple-500 transition">
                                    {item.preview ? (
                                        <img src={item.preview} className="w-full h-full object-cover" alt="Detalle" />
                                    ) : (
                                        <div className="text-center text-slate-600">
                                            <FaImage className="text-3xl mx-auto mb-2" />
                                            <span className="text-xs">Imagen del detalle</span>
                                        </div>
                                    )}
                                    <input type="file" onChange={(e) => handleGalleryChange(index, 'file', e.target.files[0])} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* BOTÓN GUARDAR FINAL */}
            <div className="pt-6 border-t border-slate-800">
                <button disabled={loading} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition shadow-lg shadow-blue-500/20 text-lg disabled:opacity-50">
                    {loading ? 'Guardando...' : <><FaSave /> {projectId ? 'Guardar Cambios' : 'Publicar Proyecto Completo'}</>}
                </button>
            </div>

        </form>
    </div>
  );
};

export default ProjectForm;