import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit, FaArrowRight } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import api from '../api';
import AuthContext from '../context/AuthContext';
import Seo from '../components/Seo';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await api.get('/api/blog');
        setPosts(data);
      } catch (error) {
        console.error("Error cargando blog");
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if(window.confirm('¿Borrar esta noticia?')) {
        await api.delete(`/api/blog/${id}`);
        setPosts(posts.filter(p => p._id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-purple-500">
      <Seo title="Blog" description="Noticias y artículos de Nexora Tech" />
      <Navbar />

      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Blog & Novedades
        </h1>
        <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
            Explora nuestros últimos artículos, tutoriales y noticias sobre tecnología y desarrollo.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <div key={post._id} className="glass rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-purple-500/10 transition duration-300 flex flex-col h-full border border-slate-800 hover:border-purple-500/30 group">
              
              {/* Imagen con efecto Zoom */}
              <div className="h-48 overflow-hidden relative">
                {post.image?.url ? (
                  <img src={post.image.url} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                ) : (
                  <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-600">Sin Imagen</div>
                )}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-purple-300 border border-purple-500/20">
                    {new Date(post.createdAt).toLocaleDateString()}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-bold mb-3 leading-tight group-hover:text-purple-400 transition">{post.title}</h2>
                <p className="text-slate-400 text-sm line-clamp-3 mb-6 flex-grow">{post.content}</p>
                
                {/* Botón Leer Más */}
                <Link to={`/blog/${post._id}`} className="inline-flex items-center gap-2 text-white font-bold text-sm bg-purple-600/80 hover:bg-purple-600 px-4 py-2 rounded-lg transition w-fit mb-4">
                    Leer artículo <FaArrowRight className="text-xs" />
                </Link>

                {/* Controles Admin */}
                {user?.role === 'admin' && (
                    <div className="border-t border-slate-700/50 pt-4 flex justify-between">
                        <Link to={`/admin/blog/edit/${post._id}`} className="text-xs text-yellow-500 hover:text-yellow-400 flex items-center gap-1">
                            <FaEdit /> Editar
                        </Link>
                        <button onClick={() => handleDelete(post._id)} className="text-xs text-red-500 hover:text-red-400 flex items-center gap-1">
                            <FaTrash /> Eliminar
                        </button>
                    </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;