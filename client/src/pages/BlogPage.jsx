import { useEffect, useState, useContext } from 'react'; // <--- 1. Importar useContext
import { Link } from 'react-router-dom';
import api from '../api';
import Navbar from '../components/Navbar';
import Seo from '../components/Seo';
import AuthContext from '../context/AuthContext'; // <--- 2. Importar AuthContext
import { FaSearch, FaCalendarAlt, FaArrowRight, FaRegNewspaper, FaEdit, FaTrash } from 'react-icons/fa'; // <--- 3. Iconos nuevos

const BlogPage = () => {
  const { user } = useContext(AuthContext); // <--- 4. Obtener usuario
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await api.get('/api/blogs');
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error cargando blog", error);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // --- FUNCIÓN PARA BORRAR ---
  const handleDeletePost = async (slug) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta noticia?')) return;

    try {
        await api.delete(`/api/blogs/${slug}`);
        setPosts(posts.filter(p => p.slug !== slug));
        alert('🗑️ Noticia eliminada');
    } catch (error) {
        console.error(error);
        alert('Error al eliminar');
    }
  };

  const stripHtml = (html) => {
     if (!html) return "";
     const doc = new DOMParser().parseFromString(html, 'text/html');
     return doc.body.textContent || "";
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-500 selection:text-white pb-20">
      <Seo title="Blog" description="Noticias y Artículos de NextSa Tech" />
      <Navbar />
      
      {/* --- HERO SECTION --- */}
      <div className="relative pt-32 pb-16 px-6 bg-slate-900/50 border-b border-slate-800">
          <div className="max-w-7xl mx-auto text-center">
              <span className="text-blue-400 font-bold tracking-widest uppercase text-sm mb-2 block animate-pulse">
                  Conocimiento & Tecnología
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-slate-400">
                  Blog & Novedades
              </h1>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                  Descubre las últimas tendencias en desarrollo web, tutoriales de programación y noticias sobre nuestros proyectos más recientes.
              </p>

              <div className="mt-10 max-w-xl mx-auto relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaSearch className="text-slate-500 group-focus-within:text-blue-400 transition" />
                  </div>
                  <input 
                      type="text" 
                      placeholder="Buscar artículo..." 
                      className="w-full bg-slate-950 border border-slate-700 text-white rounded-full py-4 pl-12 pr-6 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition shadow-xl"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                  />
              </div>
          </div>
      </div>

      {/* --- LISTA DE POSTS --- */}
      <div className="max-w-7xl mx-auto px-6 mt-16">
          {loading ? (
              <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
          ) : filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map((post) => (
                      // CAMBIO IMPORTANTE: Usamos un DIV como contenedor principal, no un Link
                      // Esto permite tener botones interactivos dentro de la tarjeta
                      <div 
                        key={post._id} 
                        className="group bg-slate-900/40 rounded-2xl overflow-hidden border border-slate-800 hover:border-blue-500/50 transition duration-500 hover:shadow-2xl hover:shadow-blue-900/20 flex flex-col h-full relative"
                      >
                          {/* Enlace principal a la noticia */}
                          <Link to={`/blog/${post.slug}`} className="flex-grow flex flex-col">
                              {/* IMAGEN */}
                              <div className="h-56 overflow-hidden relative">
                                  {post.image ? (
                                      <>
                                        <div className="absolute inset-0 bg-blue-900/20 opacity-0 group-hover:opacity-100 transition z-10"></div>
                                        <img 
                                            src={post.image} 
                                            alt={post.title} 
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" 
                                        />
                                      </>
                                  ) : (
                                      <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-600">
                                          <FaRegNewspaper className="text-4xl" />
                                          <span className="ml-2">Sin Imagen</span>
                                      </div>
                                  )}
                                  
                                  <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700 text-xs font-bold text-slate-300 flex items-center gap-2 z-20">
                                      <FaCalendarAlt className="text-blue-400" />
                                      {new Date(post.createdAt).toLocaleDateString()}
                                  </div>
                              </div>

                              {/* CONTENIDO */}
                              <div className="p-6 flex flex-col flex-grow">
                                  <h2 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-blue-400 transition">
                                      {post.title}
                                  </h2>
                                  
                                  <p className="text-slate-400 text-sm line-clamp-3 mb-4 flex-grow leading-relaxed">
                                      {stripHtml(post.content).substring(0, 150)}...
                                  </p>

                                  <div className="flex items-center text-blue-400 text-sm font-bold group-hover:translate-x-2 transition duration-300 mt-auto">
                                      Leer Artículo Completo <FaArrowRight className="ml-2" />
                                  </div>
                              </div>
                          </Link>

                          {/* --- BOTONES DE ADMIN (SOLO VISIBLES SI ERES ADMIN) --- */}
                          {user && user.role === 'admin' && (
                              <div className="px-6 pb-6 pt-2 flex gap-3 border-t border-slate-800/50 mt-2">
                                  <Link 
                                    to={`/admin/blog/edit/${post.slug}`} // Ojo: Asegúrate si tu ruta de edit usa ID o Slug. Si falla, cambia a post._id
                                    className="flex-1 bg-blue-900/30 hover:bg-blue-600 text-blue-400 hover:text-white py-2 rounded-lg text-sm font-bold transition flex items-center justify-center gap-2 border border-blue-500/30"
                                  >
                                      <FaEdit /> Editar
                                  </Link>
                                  <button 
                                    onClick={() => handleDeletePost(post.slug)}
                                    className="flex-1 bg-red-900/30 hover:bg-red-600 text-red-400 hover:text-white py-2 rounded-lg text-sm font-bold transition flex items-center justify-center gap-2 border border-red-500/30"
                                  >
                                      <FaTrash /> Borrar
                                  </button>
                              </div>
                          )}
                      </div>
                  ))}
              </div>
          ) : (
              <div className="text-center py-20 bg-slate-900/30 rounded-2xl border border-slate-800 border-dashed">
                  <p className="text-slate-500 text-xl">No se encontraron artículos.</p>
                  {searchTerm && <button onClick={() => setSearchTerm('')} className="mt-4 text-blue-400 hover:underline">Limpiar búsqueda</button>}
              </div>
          )}
      </div>
    </div>
  );
};

export default BlogPage;