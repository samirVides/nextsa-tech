import { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaFilePdf, FaVideo, FaArrowLeft, FaEdit, FaTrash } from 'react-icons/fa';
import api from '../api';
import Navbar from '../components/Navbar';
import AuthContext from '../context/AuthContext';
import Seo from '../components/Seo';

const BlogDetailsPage = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await api.get(`/api/blog/${id}`);
        setPost(data);
      } catch (error) {
        console.error("Error cargando noticia");
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if(window.confirm('¿Borrar esta noticia permanentemente?')) {
        await api.delete(`/api/blog/${id}`);
        navigate('/blog');
    }
  };

  if (!post) return <div className="min-h-screen bg-slate-950 text-white pt-40 text-center">Cargando...</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-purple-500">
      <Seo title={post.title} description={post.content.substring(0, 150)} />
      <Navbar />

      <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <Link to="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition">
            <FaArrowLeft /> Volver al Blog
        </Link>

        <article className="glass rounded-2xl overflow-hidden p-8 md:p-12">
            <span className="text-sm text-purple-400 font-bold uppercase tracking-wider block mb-2">
                {new Date(post.createdAt).toLocaleDateString()}
            </span>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">{post.title}</h1>

            {post.image?.url && (
                <img src={post.image.url} alt={post.title} className="w-full h-auto max-h-[500px] object-cover rounded-xl mb-8 shadow-2xl" />
            )}

            {/* Contenido con saltos de línea respetados */}
            <div className="text-slate-300 text-lg leading-relaxed whitespace-pre-wrap mb-10">
                {post.content}
            </div>

            {/* Botones de recursos extra */}
            <div className="flex flex-wrap gap-4 border-t border-slate-700 pt-6">
                {post.pdfLink && (
                    <a href={post.pdfLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-red-500/10 text-red-400 border border-red-500/20 px-4 py-3 rounded-lg hover:bg-red-500/20 transition">
                        <FaFilePdf className="text-xl" /> Descargar PDF
                    </a>
                )}
                {post.videoLink && (
                    <a href={post.videoLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 px-4 py-3 rounded-lg hover:bg-blue-500/20 transition">
                        <FaVideo className="text-xl" /> Ver Video
                    </a>
                )}
            </div>

            {/* Panel de Admin para Editar/Borrar desde aquí mismo */}
            {user?.role === 'admin' && (
                <div className="mt-8 flex gap-4 pt-6 border-t border-slate-700/50">
                    <Link to={`/admin/blog/edit/${post._id}`} className="flex items-center gap-2 bg-yellow-600/20 text-yellow-500 px-4 py-2 rounded hover:bg-yellow-600/30 transition">
                        <FaEdit /> Editar Noticia
                    </Link>
                    <button onClick={handleDelete} className="flex items-center gap-2 bg-red-600/20 text-red-500 px-4 py-2 rounded hover:bg-red-600/30 transition">
                        <FaTrash /> Eliminar
                    </button>
                </div>
            )}
        </article>
      </div>
    </div>
  );
};

export default BlogDetailsPage;