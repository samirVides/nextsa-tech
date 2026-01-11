import { useState, useEffect } from 'react';
import api from '../../api';
import { FaSave, FaImage, FaTimes, FaFilePdf, FaYoutube, FaPlus, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const BlogForm = ({ blogId }) => {
  // --- ESTADOS BÁSICOS ---
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  
  // --- MEDIA PRINCIPAL ---
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // --- EXTRAS (PDF & VIDEO) ---
  const [pdf, setPdf] = useState(null); // Archivo nuevo
  const [existingPdf, setExistingPdf] = useState(null); // URL PDF existente
  const [video, setVideo] = useState(''); // Link de YouTube

  // --- GALERÍA (La misma lógica potente de Proyectos) ---
  const [galleryItems, setGalleryItems] = useState([]);

  const [loading, setLoading] = useState(false);

  // --- CARGAR DATOS SI EDITAMOS ---
  useEffect(() => {
    if (blogId) {
      const fetchBlog = async () => {
        try {
            const { data } = await api.get(`/api/blogs/${blogId}`);
            
            // 1. Datos básicos
            setTitle(data.title);
            setContent(data.content);
            setCategory(data.category || '');
            setAuthor(data.author || '');
            setVideo(data.video || '');

            // 2. Imagen Portada
            if (data.image) {
                const imgUrl = data.image.startsWith('http') ? data.image : `http://localhost:4000/${data.image}`;
                setPreview(imgUrl);
            }

            // 3. PDF Existente
            if (data.pdf) {
                setExistingPdf(data.pdf); // Guardamos la URL o path
            }

            // 4. Galería
            if (data.gallery && data.gallery.length > 0) {
                setGalleryItems(data.gallery.map(item => ({
                    title: item.title || '',
                    description: item.description || '',
                    url: item.url, 
                    file: null,
                    preview: item.url.startsWith('http') ? item.url : `http://localhost:4000/${item.url}`
                })));
            } else {
                setGalleryItems([]);
            }

        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'No se pudo cargar el artículo', 'error');
        }
      };
      fetchBlog();
    } else {
       // Resetear si es nuevo
       setTitle(''); setContent(''); setCategory(''); setAuthor(''); 
       setPreview(null); setImage(null); setPdf(null); setExistingPdf(null); setVideo('');
       setGalleryItems([]);
    }
  }, [blogId]);

  // --- MANEJADORES DE MEDIA ---
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handlePdfChange = (e) => {
      const file = e.target.files[0];
      if (file) setPdf(file);
  };

  // --- LÓGICA DE GALERÍA ---
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

  // --- SUBMIT ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category', category);
    formData.append('author', author);
    formData.append('video', video); // Link de video

    if (image) formData.append('image', image);
    if (pdf) formData.append('pdf', pdf); // Archivo PDF

    // Procesar Galería
    const galleryTexts = galleryItems.map(item => ({
        title: item.title,
        description: item.description,
        existingUrl: item.url || null 
    }));
    formData.append('galleryTexts', JSON.stringify(galleryTexts));

    galleryItems.forEach(item => {
        if (item.file) formData.append('galleryImages', item.file);
    });

    try {
      if (blogId) {
        await api.put(`/api/blogs/${blogId}`, formData);
        Swal.fire('¡Actualizado!', 'Artículo actualizado con éxito', 'success');
      } else {
        await api.post('/api/blogs', formData);
        Swal.fire('¡Publicado!', 'Artículo publicado con éxito', 'success');
        // Limpiar tras crear
        setTitle(''); setContent(''); setCategory(''); setAuthor(''); 
        setPreview(null); setImage(null); setPdf(null); setVideo(''); setGalleryItems([]);
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudo guardar', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl max-w-5xl mx-auto animate-fade-in">
        
        <h2 className="text-2xl font-bold text-white mb-8 border-b border-slate-800 pb-4 flex items-center gap-2">
            {blogId ? '✏️ Editar Artículo' : '📰 Publicar Nuevo Artículo'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* SECCIÓN 1: DATOS PRINCIPALES */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Columna Izquierda: Textos */}
                <div className="lg:col-span-2 space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-slate-400 text-sm font-bold mb-2">Título</label>
                            <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-purple-500 outline-none" required />
                        </div>
                        <div>
                            <label className="block text-slate-400 text-sm font-bold mb-2">Categoría</label>
                            <input type="text" value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-purple-500 outline-none" placeholder="Ej: Tutoriales" />
                        </div>
                    </div>
                    
                    {/* Campos Extra: Autor y Video */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-slate-400 text-sm font-bold mb-2">Autor</label>
                            <input type="text" value={author} onChange={e => setAuthor(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-purple-500 outline-none" placeholder="Nombre del autor" />
                        </div>
                        <div>
                            <label className="block text-slate-400 text-sm font-bold mb-2 flex items-center gap-2"><FaYoutube className="text-red-500"/> Video (URL)</label>
                            <input type="url" value={video} onChange={e => setVideo(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-purple-500 outline-none" placeholder="https://youtube.com/..." />
                        </div>
                    </div>

                    <div>
                        <label className="block text-slate-400 text-sm font-bold mb-2">Contenido Principal</label>
                        <textarea rows="8" value={content} onChange={e => setContent(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white focus:border-purple-500 outline-none leading-relaxed resize-none" required></textarea>
                    </div>
                </div>

                {/* Columna Derecha: Archivos (Portada y PDF) */}
                <div className="lg:col-span-1 space-y-6">
                    {/* PORTADA */}
                    <div>
                        <label className="block text-slate-400 text-sm font-bold mb-2">Portada</label>
                        <div className={`relative h-48 border-2 border-dashed border-slate-700 rounded-2xl flex flex-col items-center justify-center overflow-hidden transition hover:border-purple-500 ${!preview && 'hover:bg-slate-800/50'}`}>
                            {preview ? (
                                <>
                                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                    <button type="button" onClick={() => { setImage(null); setPreview(null); }} className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-lg"><FaTimes/></button>
                                </>
                            ) : (
                                <div className="text-center">
                                    <FaImage className="text-3xl text-slate-600 mx-auto mb-2" />
                                    <p className="text-slate-500 text-xs">Subir Imagen</p>
                                </div>
                            )}
                            <input type="file" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                        </div>
                    </div>

                    {/* PDF */}
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                        <label className="block text-slate-400 text-sm font-bold mb-3 flex items-center gap-2">
                            <FaFilePdf className="text-red-400"/> Recurso Descargable (PDF)
                        </label>
                        
                        {existingPdf && !pdf && (
                            <div className="mb-3 text-xs text-green-400 bg-green-900/20 p-2 rounded border border-green-500/20 flex items-center gap-2">
                                <span className="truncate max-w-[150px]">Archivo actual guardado</span>
                            </div>
                        )}

                        <div className="relative">
                            <input type="file" onChange={handlePdfChange} className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-500 cursor-pointer" accept="application/pdf" />
                        </div>
                    </div>
                </div>
            </div>

            <hr className="border-slate-800" />

            {/* SECCIÓN 2: GALERÍA MULTIMEDIA */}
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <FaImage className="text-blue-500"/> Galería & Detalles Extra
                    </h3>
                    <button type="button" onClick={addGalleryItem} className="bg-blue-600/20 text-blue-400 border border-blue-500/30 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-600 hover:text-white transition flex items-center gap-2">
                        <FaPlus /> Agregar Bloque
                    </button>
                </div>

                <div className="space-y-6">
                    {galleryItems.length === 0 && (
                        <p className="text-slate-500 text-center py-8 border border-dashed border-slate-800 rounded-xl text-sm">No hay imágenes extra en la galería.</p>
                    )}

                    {galleryItems.map((item, index) => (
                        <div key={index} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 relative group animate-fade-in-up">
                            <button type="button" onClick={() => removeGalleryItem(index)} className="absolute -top-3 -right-3 bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-500 transition z-10">
                                <FaTrash size={12} />
                            </button>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <input placeholder="Título de la sección / imagen" value={item.title} onChange={(e) => handleGalleryChange(index, 'title', e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-white focus:border-purple-500 outline-none" />
                                    <textarea placeholder="Descripción detallada..." value={item.description} onChange={(e) => handleGalleryChange(index, 'description', e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-white h-32 resize-none focus:border-purple-500 outline-none" />
                                </div>

                                <div className="relative h-48 border-2 border-dashed border-slate-800 rounded-xl flex items-center justify-center overflow-hidden hover:border-purple-500 transition">
                                    {item.preview ? (
                                        <img src={item.preview} className="w-full h-full object-cover" alt="Detalle" />
                                    ) : (
                                        <div className="text-center text-slate-600">
                                            <FaImage className="text-3xl mx-auto mb-2" />
                                            <span className="text-xs">Imagen del bloque</span>
                                        </div>
                                    )}
                                    <input type="file" onChange={(e) => handleGalleryChange(index, 'file', e.target.files[0])} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* BOTÓN FINAL */}
            <div className="pt-6 border-t border-slate-800">
                <button disabled={loading} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition shadow-lg shadow-purple-500/20 text-lg disabled:opacity-50">
                    {loading ? 'Procesando...' : <><FaSave /> {blogId ? 'Guardar Cambios' : 'Publicar Ahora'}</>}
                </button>
            </div>

        </form>
    </div>
  );
};

export default BlogForm;