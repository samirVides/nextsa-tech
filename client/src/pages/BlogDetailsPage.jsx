import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import Navbar from '../components/Navbar';
import Seo from '../components/Seo';
import Footer from '../components/Footer';
import NewsletterBox from '../components/NewsletterBox';
import { 
    FaArrowLeft, FaCalendarAlt, FaUserCircle, FaClock, 
    FaFacebookF, FaTwitter, FaLinkedinIn, FaWhatsapp,
    FaFilePdf, FaPlay, FaCheckCircle, FaHashtag, FaImage, FaDownload
} from 'react-icons/fa';

const BlogDetailsPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const currentUrl = window.location.href;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await api.get(`/api/blogs/${slug}`);
        setPost(data);
        setLoading(false);
      } catch (err) { console.error(err); setLoading(false); }
    };
    fetchPost();
  }, [slug]);

  const calculateReadTime = (text) => {
    if (!text) return "1 min";
    const wordsPerMinute = 200;
    // Eliminamos tags HTML para contar solo palabras reales
    const strippedText = text.replace(/(<([^>]+)>)/gi, "");
    const words = strippedText.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min lectura`;
  };

  const getUrl = (url) => {
    if (!url) return '';
    return url.startsWith('http') ? url : `http://localhost:4000/${url.replace(/\\/g, '/')}`;
  };

  const handleShare = (platform) => {
    let url = '';
    const text = encodeURIComponent(post.title);
    const link = encodeURIComponent(currentUrl);

    switch(platform) {
        case 'facebook': url = `https://www.facebook.com/sharer/sharer.php?u=${link}`; break;
        case 'twitter': url = `https://twitter.com/intent/tweet?text=${text}&url=${link}`; break;
        case 'linkedin': url = `https://www.linkedin.com/sharing/share-offsite/?url=${link}`; break;
        case 'whatsapp': url = `https://api.whatsapp.com/send?text=${text}%20${link}`; break;
        default: return;
    }
    window.open(url, '_blank', 'width=600,height=400');
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
    </div>
  );

  if (!post) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Artículo no encontrado</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans pb-20 overflow-x-hidden selection:bg-blue-500 selection:text-white">
      <Seo title={post.title} description={post.metaDescription || "NextSa Tech Blog"} />
      <Navbar />

      {/* ESTILOS PARA QUE EL CONTENIDO SE VEA COMO NOTICIA Y NO SE DESBORDE */}
      <style>{`
        .blog-content { 
            width: 100%; 
            font-family: 'Inter', sans-serif;
            color: #cbd5e1;
            font-size: 1.125rem; /* 18px */
            line-height: 1.8;
        }
        /* Importante: Romper palabras largas para que no se salgan del móvil */
        .blog-content p, .blog-content li, .blog-content h1, .blog-content h2 { 
            overflow-wrap: break-word; 
            word-wrap: break-word; 
            word-break: break-word; 
            max-width: 100%;
        }
        .blog-content p { margin-bottom: 1.5em; font-weight: 300; }
        .blog-content strong { color: white; font-weight: 700; }
        .blog-content h1, .blog-content h2, .blog-content h3 { color: white; margin-top: 2em; margin-bottom: 0.8em; font-weight: 800; line-height: 1.2; }
        .blog-content h2 { font-size: 1.8rem; border-left: 4px solid #3b82f6; padding-left: 1rem; }
        .blog-content h3 { font-size: 1.5rem; }
        .blog-content ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.5rem; }
        .blog-content ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1.5rem; }
        .blog-content li { margin-bottom: 0.5rem; }
        .blog-content a { color: #60a5fa; text-decoration: underline; text-underline-offset: 4px; }
        .blog-content blockquote { border-left: 4px solid #8b5cf6; background: rgba(139, 92, 246, 0.1); padding: 1.5rem; font-style: italic; border-radius: 0 1rem 1rem 0; margin: 2rem 0; color: #e2e8f0; }
        .blog-content img { max-width: 100%; height: auto; border-radius: 1rem; margin: 2rem 0; box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5); display: block; }
        .blog-content iframe { max-width: 100%; border-radius: 1rem; margin: 2rem 0; }
      `}</style>

      {/* --- 1. HERO HEADER (PORTADA TIPO REVISTA) --- */}
      <div className="relative h-[65vh] w-full">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent z-10"></div>
        <img 
          src={getUrl(post.image)} 
          alt={post.title} 
          loading="lazy"
          className="w-full h-full object-cover fixed-bg"
        />

        {/* Botón Volver Flotante */}
        <div className="absolute top-28 left-6 md:left-10 z-50">
             <Link to="/blog" className="flex items-center gap-2 text-white hover:text-blue-400 bg-black/40 backdrop-blur-md px-5 py-2.5 rounded-full transition-all border border-white/10 text-sm font-bold shadow-lg hover:pl-4">
                <FaArrowLeft /> Volver
             </Link>
        </div>

        {/* Título y Metadatos */}
        <div className="absolute bottom-0 left-0 w-full z-20 p-6 md:p-12 pb-24 md:pb-32">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-wrap gap-3 mb-4 animate-fade-in-up">
                    <span className="bg-blue-600 text-white text-[10px] md:text-xs font-black px-3 py-1 rounded-lg uppercase tracking-widest shadow-lg shadow-blue-600/40">
                        {post.category || 'Actualidad'}
                    </span>
                </div>
                
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl max-w-5xl animate-fade-in-up delay-100 break-words">
                    {post.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 md:gap-6 text-slate-300 text-xs md:text-sm font-medium animate-fade-in-up delay-200">
                    <div className="flex items-center gap-2">
                         <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-600"><FaUserCircle /></div>
                         <span>{post.author || 'NextSa Team'}</span>
                    </div>
                    <div className="w-px h-4 bg-slate-500 hidden md:block"></div>
                    <div className="flex items-center gap-2">
                         <FaCalendarAlt className="text-blue-400"/> <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="w-px h-4 bg-slate-500 hidden md:block"></div>
                    <div className="flex items-center gap-2">
                         <FaClock className="text-green-400"/> <span>{calculateReadTime(post.content)}</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* --- 2. LAYOUT PRINCIPAL (GRID) --- */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-30 -mt-20">
          <div className="flex flex-col lg:flex-row gap-12">
              
              {/* === COLUMNA IZQUIERDA: CONTENIDO === */}
              <div className="lg:w-2/3">
                  <div className="bg-slate-950 border border-slate-800 p-6 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
                      
                      {/* --- CONTENIDO HTML DEL ARTÍCULO --- */}
                      <article 
                          className="blog-content"
                          dangerouslySetInnerHTML={{ __html: post.content }} 
                      />

                      {/* --- SECCIÓN MULTIMEDIA (Video & PDF) --- */}
                      {(post.video || post.pdf) && (
                          <div className="mt-12 space-y-6">
                              {post.video && (
                                  <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800">
                                      <div className="px-5 py-3 bg-slate-950 border-b border-slate-800 flex items-center gap-2">
                                          <FaPlay className="text-red-500"/> <span className="font-bold text-white text-sm">Video Relacionado</span>
                                      </div>
                                      <div className="aspect-video">
                                          <iframe 
                                              className="w-full h-full" 
                                              src={post.video.replace("watch?v=", "embed/")} 
                                              allowFullScreen 
                                              title="Video"
                                          ></iframe>
                                      </div>
                                  </div>
                              )}

                              {post.pdf && (
                                  <div className="bg-gradient-to-r from-slate-900 to-slate-900 border border-slate-700 p-6 rounded-2xl flex items-center gap-5 hover:border-blue-500 transition group cursor-pointer" onClick={() => window.open(getUrl(post.pdf), '_blank')}>
                                      <div className="bg-red-500/10 p-4 rounded-xl text-red-500 group-hover:scale-110 transition">
                                          <FaFilePdf size={24} />
                                      </div>
                                      <div className="flex-1">
                                          <h4 className="font-bold text-white text-lg">Documentación Técnica</h4>
                                          <p className="text-sm text-slate-400">Descarga el PDF complementario de este artículo.</p>
                                      </div>
                                      <div className="bg-slate-800 p-2 rounded-full text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition">
                                          <FaDownload />
                                      </div>
                                  </div>
                              )}
                          </div>
                      )}

                      {/* --- GALERÍA CORREGIDA: TARJETAS VISIBLES --- */}
                      {post.gallery && post.gallery.length > 0 && (
                          <div className="mt-16 pt-10 border-t border-slate-800">
                              <h3 className="font-bold text-white mb-8 text-2xl flex items-center gap-3">
                                  <FaImage className="text-blue-500"/> Galería de Detalles
                              </h3>
                              
                              <div className="space-y-12">
                                  {post.gallery.map((item, idx) => (
                                      <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg group">
                                          
                                          {/* 1. Imagen Grande */}
                                          <div className="relative overflow-hidden">
                                              <img 
                                                src={getUrl(item.url)} 
                                                alt={item.title || `Imagen ${idx + 1}`}
                                                loading="lazy"
                                                className="w-full h-auto max-h-[500px] object-cover object-center group-hover:scale-[1.02] transition duration-700 block" 
                                              />
                                              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/20">
                                                  Imagen {idx + 1}
                                              </div>
                                          </div>

                                          {/* 2. Bloque de Texto (Título y Descripción) */}
                                          <div className="p-6 md:p-8 bg-slate-900/50">
                                              {item.title ? (
                                                  <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                                              ) : (
                                                  <h4 className="text-lg font-bold text-slate-500 italic mb-2">Sin título</h4>
                                              )}
                                              
                                              {item.description ? (
                                                  <p className="text-slate-300 leading-relaxed text-base border-l-4 border-blue-500 pl-4">
                                                      {item.description}
                                                  </p>
                                              ) : (
                                                  <p className="text-slate-600 text-sm italic">Sin descripción disponible para esta imagen.</p>
                                              )}
                                          </div>
                                      </div>
                                  ))}
                              </div>
                          </div>
                      )}

                      {/* --- BARRA DE COMPARTIR --- */}
                      <div className="border-t border-slate-800 mt-16 pt-8">
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                             <FaHashtag /> Compartir este artículo
                          </p>
                          <div className="flex gap-3">
                              <button onClick={() => handleShare('facebook')} className="w-10 h-10 rounded-full bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition flex items-center justify-center"><FaFacebookF/></button>
                              <button onClick={() => handleShare('twitter')} className="w-10 h-10 rounded-full bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white transition flex items-center justify-center"><FaTwitter/></button>
                              <button onClick={() => handleShare('linkedin')} className="w-10 h-10 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition flex items-center justify-center"><FaLinkedinIn/></button>
                              <button onClick={() => handleShare('whatsapp')} className="w-10 h-10 rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition flex items-center justify-center"><FaWhatsapp/></button>
                          </div>
                      </div>

                  </div>
              </div>

              {/* === COLUMNA DERECHA: SIDEBAR === */}
              <div className="lg:w-1/3 space-y-8">
                  
                  {/* Tarjeta de Autor */}
                  <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl flex items-center gap-4 sticky top-28 z-0">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center font-bold text-xl text-white shadow-lg">
                          NX
                      </div>
                      <div>
                          <h4 className="font-bold text-white text-lg">NextSa Tech</h4>
                          <p className="text-xs text-blue-400 uppercase tracking-wider font-bold">Autor Verificado</p>
                      </div>
                  </div>

                  {/* Tarjeta CTA */}
                  <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-[2rem] border border-slate-700 relative overflow-hidden shadow-2xl group hover:border-blue-500/30 transition-all sticky top-56">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                      
                      <h3 className="text-xl font-bold text-white mb-4 relative z-10">¿Te gustó este tema?</h3>
                      <p className="text-slate-400 text-sm mb-6 relative z-10 leading-relaxed">
                          Implementamos estas tecnologías en tu negocio. Lleva tu proyecto al siguiente nivel con nosotros.
                      </p>
                      
                      <ul className="space-y-3 mb-8 relative z-10">
                         <li className="flex items-center gap-3 text-sm font-medium text-slate-300"><FaCheckCircle className="text-green-400"/> Asesoría Inicial Gratuita</li>
                         <li className="flex items-center gap-3 text-sm font-medium text-slate-300"><FaCheckCircle className="text-green-400"/> Desarrollo a Medida</li>
                      </ul>
                      
                      <Link to="/#contacto" className="block w-full py-4 bg-white text-slate-950 font-black text-xs uppercase tracking-widest rounded-xl hover:bg-blue-50 transition-colors text-center relative z-10 shadow-lg">
                          Contactar Ahora
                      </Link>
                  </div>

              </div>
          </div>

          <div className="mt-20">
             <NewsletterBox />
          </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BlogDetailsPage;