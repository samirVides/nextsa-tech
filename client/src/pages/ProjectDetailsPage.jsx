import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import Navbar from '../components/Navbar';
import { 
  FaGithub, 
  FaExternalLinkAlt, 
  FaArrowLeft, 
  FaLayerGroup, 
  FaSearchPlus, // Icono de lupa para indicar zoom
  FaTimes       // Icono para cerrar el zoom
} from 'react-icons/fa';

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // --- NUEVO: Estado para controlar la imagen agrandada ---
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data } = await api.get(`/api/projects/${id}`);
        setProject(data);
        setLoading(false);
      } catch (err) {
        setError('No se pudo cargar el proyecto.');
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const getImgUrl = (img) => {
    if (!img) return null;
    return img.url ? img.url : img;
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
    </div>
  );

  if (error || !project) return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <h2 className="text-3xl font-bold mb-4">😕 {error || 'Proyecto no encontrado'}</h2>
        <Link to="/" className="text-blue-400 hover:text-blue-300 flex items-center gap-2">
            <FaArrowLeft /> Volver al Inicio
        </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans pb-20">
      <Navbar />
      
      {/* --- HERO SECTION --- */}
      <div className="relative h-[60vh] w-full overflow-hidden flex items-end">
         <div 
            className="absolute inset-0 bg-cover bg-center blur-sm opacity-30 scale-110"
            style={{ backgroundImage: `url(${getImgUrl(project.image)})` }}
         ></div>
         <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>

         <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pb-12"> {/* CAMBIO: max-w-7xl para más ancho */}
            <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition">
                <FaArrowLeft /> Volver al Portafolio
            </Link>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                {project.title}
            </h1>
            
            <div className="flex flex-wrap gap-4 mt-6">
                {project.link && (
                    <a href={project.link} target="_blank" rel="noreferrer" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 flex items-center gap-2 transition hover:scale-105">
                        <FaExternalLinkAlt /> Ver Proyecto en Vivo
                    </a>
                )}
            </div>
         </div>
      </div>

      {/* --- CONTENIDO PRINCIPAL --- */}
      {/* CAMBIO: Usamos max-w-7xl en lugar de 5xl para que sea MÁS ANCHO en PC */}
      <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-8">
              <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800">
                  <h3 className="text-2xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                      <FaLayerGroup /> Sobre el Proyecto
                  </h3>
                  <p className="text-slate-300 leading-relaxed text-lg whitespace-pre-line">
                      {project.description}
                  </p>
              </div>

              {/* --- GALERÍA ZIG-ZAG INTERACTIVA --- */}
              {project.gallery && project.gallery.length > 0 && (
                  <div className="space-y-16 mt-16">
                      <h3 className="text-3xl font-bold border-l-4 border-purple-500 pl-4">Galería de Funcionalidades</h3>
                      
                      {project.gallery.map((item, index) => (
                          <div key={index} className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                              
                              {/* IMAGEN (Ahora clickeable) */}
                              {/* CAMBIO: w-full md:w-3/5 para darle más espacio a la foto (60%) y menos al texto */}
                              <div 
                                className="w-full md:w-3/5 relative group cursor-pointer"
                                onClick={() => setSelectedImage(item.url)}
                              >
                                  <div className="rounded-xl overflow-hidden shadow-2xl shadow-blue-900/20 border border-slate-800 transition duration-500 transform group-hover:scale-[1.02]">
                                      <img src={item.url} alt={item.title} className="w-full h-auto object-cover" />
                                      
                                      {/* Overlay de "Ver más" al pasar el mouse */}
                                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center backdrop-blur-sm">
                                          <FaSearchPlus className="text-white text-4xl drop-shadow-lg" />
                                      </div>
                                  </div>
                              </div>
                              
                              {/* Texto */}
                              <div className="w-full md:w-2/5 space-y-4">
                                  <h4 className="text-2xl font-bold text-white border-b border-slate-800 pb-2">{item.title}</h4>
                                  <p className="text-slate-400 leading-relaxed text-lg">{item.description}</p>
                              </div>
                          </div>
                      ))}
                  </div>
              )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 sticky top-24">
                  <h4 className="text-lg font-bold text-white mb-4">Detalles Técnicos</h4>
                  <ul className="space-y-3 text-sm text-slate-400">
                      <li className="flex justify-between border-b border-slate-800 pb-2">
                          <span>Fecha:</span> <span className="text-white">{new Date(project.createdAt).toLocaleDateString()}</span>
                      </li>
                      <li className="flex justify-between border-b border-slate-800 pb-2">
                          <span>Estado:</span> <span className="text-green-400 font-bold">Completado</span>
                      </li>
                  </ul>
              </div>
          </div>
      </div>

      {/* --- MODAL (LIGHTBOX) PARA VER IMAGEN EN GRANDE --- */}
      {selectedImage && (
        <div 
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setSelectedImage(null)} // Cierra al hacer click afuera
        >
            <button 
                className="absolute top-6 right-6 text-white text-4xl hover:text-red-500 transition z-50 bg-black/50 rounded-full p-2"
                onClick={() => setSelectedImage(null)}
            >
                <FaTimes />
            </button>
            
            <img 
                src={selectedImage} 
                alt="Zoom" 
                className="max-h-[90vh] max-w-[95vw] rounded-lg shadow-2xl border border-slate-700 object-contain animate-in fade-in zoom-in duration-300"
                onClick={(e) => e.stopPropagation()} // Evita que se cierre si tocas la foto
            />
        </div>
      )}

    </div>
  );
};

export default ProjectDetailsPage;