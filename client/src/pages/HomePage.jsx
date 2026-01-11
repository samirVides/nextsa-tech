import React, { useEffect, useState, useRef, useMemo, lazy, Suspense } from 'react';

import { Link } from 'react-router-dom';
import { 
  FaWhatsapp, FaEnvelope, FaPaperPlane, 
  FaHandHoldingUsd, FaTools, FaHandshake, FaArrowRight, FaCalendarAlt
} from 'react-icons/fa';
import api from '../api';
import ProjectCard from '../components/ProjectCard';
import Seo from '../components/Seo';
import Navbar from '../components/Navbar';
import WhatsAppBtn from '../components/WhatsAppBtn'; 
import FaqSection from '../components/FaqSection';
import SocialMedia from '../components/SocialSidebar';

// Antes de la función HomePage
const Globe = React.lazy(() => import('react-globe.gl'));

const HomePage = () => {
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]); 
  const [msgData, setMsgData] = useState({ name: '', email: '', content: '' });
  const [msgStatus, setMsgStatus] = useState(null);
  const globeEl = useRef(); 

  // --- DATOS DEL GLOBO (Mantener igual) ---
  const gData = useMemo(() => {
    const N = 30; 
    return [...Array(N).keys()].map(() => ({
      startLat: (Math.random() - 0.5) * 160,
      startLng: (Math.random() - 0.5) * 360,
      endLat: (Math.random() - 0.5) * 160,
      endLng: (Math.random() - 0.5) * 360,
      color: [['#3b82f6', '#06b6d4'][Math.round(Math.random())], ['#8b5cf6', '#3b82f6'][Math.round(Math.random())]]
    }));
  }, []);
  
  const ringsData = useMemo(() => [...Array(15).keys()].map(() => ({
      lat: (Math.random() - 0.5) * 160, lng: (Math.random() - 0.5) * 360, maxR: Math.random() * 20 + 3, propagationSpeed: (Math.random() - 0.5) * 20 + 1, repeatPeriod: Math.random() * 2000 + 200
  })), []);

  useEffect(() => {
    const fetchProjects = async () => {
      try { const { data } = await api.get('/api/projects'); setProjects(data); } catch (error) { console.error(error); }
    };
    const fetchBlogs = async () => {
      try { const { data } = await api.get('/api/blogs'); setBlogs(data.slice(0, 3)); } catch (error) { console.error(error); }
    };
    fetchProjects();
    fetchBlogs();
  }, []);


useEffect(() => {
    // Solo ejecutamos si globeEl.current existe (cuando Suspense termine)
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.8;
      globeEl.current.pointOfView({ lat: 20, lng: -70, altitude: 2.5 }); 
    }
  }, [projects]); // Dependencia para re-intentar cuando cargue


  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/messages', msgData);
      setMsgStatus('success');
      setMsgData({ name: '', email: '', content: '' });
      setTimeout(() => setMsgStatus(null), 5000);
    } catch (error) { setMsgStatus('error'); }
  };

const handleDeleteProject = async (id) => {
    if (!window.confirm('¿Eliminar proyecto?')) return;
    try {
        await api.delete(`/api/projects/${id}`);
        setProjects(projects.filter(p => p._id !== id));
    } catch (error) { console.error(error); }
  };

  // --- FUNCIÓN PARA LIMPIAR HTML ---
  const stripHtml = (html) => {
     if (!html) return "";
     const doc = new DOMParser().parseFromString(html, 'text/html');
     return doc.body.textContent || "";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans relative overflow-x-hidden selection:bg-cyan-500 selection:text-white">
      <Seo title="Inicio" description="NextSa Tech - Desarrollo Web Profesional" />
      <Navbar />
      <SocialMedia />

      {/* FONDO AMBIENTAL */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-slate-900">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full"></div>
      </div>

      <section className="relative pt-32 pb-12 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[85vh]">
        <div className="flex flex-col gap-6 z-10 animate-fade-in-left order-2 lg:order-1">
            <div className="inline-block px-4 py-1 rounded-full bg-blue-900/30 border border-blue-500/30 w-fit">
                <span className="text-blue-400 text-xs md:text-sm font-bold tracking-widest uppercase animate-pulse">🌐 Global Connection System</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Bienvenido a <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 drop-shadow-[0_0_25px_rgba(56,189,248,0.3)]">NextSa Tech</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl max-w-lg leading-relaxed">
              Transformo ideas abstractas en experiencias digitales de alto impacto. Desarrollo a medida, diseño personalizado y tecnología de punta.
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
                <a href="#contacto" className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 transition hover:scale-105">Empezar Proyecto</a>
                <a href="#proyectos" className="px-8 py-3 border border-slate-600 hover:border-white text-slate-300 hover:text-white rounded-xl font-bold transition">Ver Portafolio</a>
            </div>
        </div>

        {/* CONTENEDOR DEL GLOBO CON OPTIMIZACIÓN */}
        <div className="relative h-[350px] md:h-[500px] w-full flex items-center justify-center animate-fade-in-right order-1 lg:order-2">
            <div className="relative w-full h-full bg-slate-900/40 backdrop-blur-sm border border-slate-700/50 rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/20 group">
                <div className="absolute top-4 right-4 text-xs text-blue-500 font-mono border border-blue-500/30 px-2 py-1 rounded z-20 bg-slate-900/80">NET.STATUS: ONLINE</div>
                
                <div className="cursor-move w-full h-full flex items-center justify-center opacity-90 hover:opacity-100 transition duration-500">
                    {/* 2. SUSPENSE PARA EL GLOBO */}
                    <React.Suspense fallback={
                      <div className="flex items-center justify-center w-full h-full">
                         {/* Círculo de carga que imita al globo mientras descarga el JS */}
                         <div className="w-64 h-64 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin"></div>
                      </div>
                    }>
                        <Globe 
                          ref={globeEl} 
                          width={600} 
                          height={600} 
                          backgroundColor="rgba(0,0,0,0)" 
                          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg" 
                          atmosphereColor="#3b82f6" 
                          atmosphereAltitude={0.2} 
                          arcsData={gData} 
                          arcColor={'color'} 
                          arcDashLength={0.9} 
                          arcDashGap={4} 
                          arcDashAnimateTime={1000} 
                          arcStroke={0.5} 
                          ringsData={ringsData} 
                          ringColor={() => t => `rgba(59,130,246,${1-t})`} 
                          ringMaxRadius={5} 
                          ringPropagationSpeed={2} 
                          ringRepeatPeriod={800} 
                          enableZoom={false} 
                        />
                    </React.Suspense>
                </div>
            </div>
        </div>
      </section>

      {/* SECCIÓN DE BENEFICIOS */}
      <section className="px-6 pb-20 max-w-7xl mx-auto relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Card 1 */}
                <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                    <div className="relative h-full bg-slate-900/90 border border-slate-700/50 p-8 rounded-2xl overflow-hidden hover:-translate-y-2 transition duration-300">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-bl-full -mr-4 -mt-4 transition group-hover:bg-green-500/20"></div>
                        <div className="w-14 h-14 bg-green-900/30 rounded-lg flex items-center justify-center mb-6 text-green-400 text-2xl group-hover:scale-110 transition border border-green-500/20">
                            <FaHandHoldingUsd />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Inversión accesible</h3>
                        <p className="text-slate-400 leading-relaxed text-sm">
                            Olvídate de presupuestos inflados. Accedes a desarrollo de nivel profesional con una inversión pensada para emprendedores y proyectos en crecimiento. Mi objetivo es construir casos de éxito reales y duraderos.
                        </p>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                    <div className="relative h-full bg-slate-900/90 border border-slate-700/50 p-8 rounded-2xl overflow-hidden hover:-translate-y-2 transition duration-300">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-bl-full -mr-4 -mt-4 transition group-hover:bg-blue-500/20"></div>
                        <div className="w-14 h-14 bg-blue-900/30 rounded-lg flex items-center justify-center mb-6 text-blue-400 text-2xl group-hover:scale-110 transition border border-blue-500/20">
                            <FaTools />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Soporte Integral</h3>
                        <p className="text-slate-400 leading-relaxed text-sm">
                            No te preocupes por lo técnico. Yo configuro tu dominio, hosting, certificados SSL y correos corporativos para que tú solo te enfoques en vender.
                        </p>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                    <div className="relative h-full bg-slate-900/90 border border-slate-700/50 p-8 rounded-2xl overflow-hidden hover:-translate-y-2 transition duration-300">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-bl-full -mr-4 -mt-4 transition group-hover:bg-purple-500/20"></div>
                        <div className="w-14 h-14 bg-purple-900/30 rounded-lg flex items-center justify-center mb-6 text-purple-400 text-2xl group-hover:scale-110 transition border border-purple-500/20">
                            <FaHandshake />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Alianzas a Largo Plazo</h3>
                        <p className="text-slate-400 leading-relaxed text-sm">
                            No entrego y me voy. Busco relaciones duraderas donde ambos crezcamos. Mantenimiento, actualizaciones y mejoras continuas garantizadas.
                        </p>
                    </div>
                </div>
          </div>
      </section>

      {/* SECCIÓN PROYECTOS */}
      <section id="proyectos" className="relative max-w-7xl mx-auto px-6 py-20 z-10">
        <div className="flex justify-between items-end mb-12">
            <div>
                <span className="text-blue-500 font-bold tracking-wider text-sm uppercase">Portafolio</span>
                <h3 className="text-3xl md:text-4xl font-bold mt-2">Proyectos Recientes</h3>
            </div>
            <Link to="/projects" className="hidden md:flex items-center gap-2 text-slate-400 hover:text-blue-400 transition">
                Ver todos <FaArrowRight />
            </Link>
        </div>
        
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 5).map((project) => (
              <ProjectCard 
                key={project._id} 
                project={project} 
                onDelete={handleDeleteProject} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-900/30 rounded-xl border-dashed border-2 border-slate-700">
            <p className="text-slate-400 text-xl">Cargando portafolio...</p>
          </div>
        )}

        <div className="mt-10 text-center md:hidden">
            <Link to="/projects" className="inline-block px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-white font-bold transition">
                Ver Portafolio Completo
            </Link>
        </div>
      </section>

      {/* SECCIÓN: ÚLTIMAS NOTICIAS (BLOG) - CORREGIDA */}
      {blogs.length > 0 && (
          <section className="relative max-w-7xl mx-auto px-6 py-20 z-10 border-t border-slate-800">
            <div className="flex justify-between items-center mb-10">
                <h3 className="text-3xl font-bold">Últimas Novedades</h3>
                <Link to="/blog" className="text-blue-400 hover:text-white flex items-center gap-2 transition">
                    Ver todo el Blog <FaArrowRight />
                </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                    <Link to={`/blog/${blog._id}`} key={blog._id} className="group bg-slate-900/50 rounded-xl overflow-hidden border border-slate-800 hover:border-blue-500/50 transition duration-300">
                        <div className="h-48 overflow-hidden relative">
                             <div className="absolute inset-0 bg-blue-900/20 opacity-0 group-hover:opacity-100 transition z-10"></div>
                             <img 
                                src={blog.image?.startsWith('http') ? blog.image : `http://localhost:4000/${blog.image}`} 
                                alt={blog.title} 
                                loading="lazy"
                                className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500" 
                             />
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                                <FaCalendarAlt />
                                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                            </div>
                            <h4 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition line-clamp-2">
                                {blog.title}
                            </h4>
                            {/* AQUÍ USAMOS stripHtml PARA LIMPIAR EL CONTENIDO */}
                            <p className="text-slate-400 text-sm line-clamp-3">
                                {stripHtml(blog.content)}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
          </section>
      )}

      {/* FAQ & CONTACTO */}
      <FaqSection />
      
      <section id="contacto" className="relative py-20 z-10 bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
            <div>
                <h3 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                  Hablemos de tu idea
                </h3>
                <p className="text-slate-300 mb-8 text-lg">
                    ¿Listo para dar el siguiente paso? Escríbeme y analicemos tu caso sin compromiso.
                </p>
                <div className="space-y-4 mb-10">
                    <a href="https://wa.me/573137163216" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition border border-slate-700 hover:border-green-500/50">
                        <div className="bg-green-500/20 p-3 rounded-full"><FaWhatsapp className="text-2xl text-green-400" /></div>
                        <div><h4 className="font-bold text-white">WhatsApp</h4><p className="text-sm text-slate-400">+57 313 716 3216</p></div>
                    </a>
                    <a href="mailto:nextsatech@gmail.com" className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition border border-slate-700 hover:border-blue-500/50">
                        <div className="bg-blue-500/20 p-3 rounded-full"><FaEnvelope className="text-2xl text-blue-400" /></div>
                        <div><h4 className="font-bold text-white">Email</h4><p className="text-sm text-slate-400">nextsatech@gmail.com</p></div>
                    </a>
                </div>
            </div>
            
            <div className="bg-slate-900/80 p-8 rounded-2xl shadow-2xl border border-slate-800">
                <form onSubmit={handleMessageSubmit} className="space-y-5">
                    <div><label className="block text-xs font-bold text-slate-400 uppercase mb-2">Tu Nombre</label><input type="text" required className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white outline-none focus:border-blue-500 transition" value={msgData.name} onChange={(e) => setMsgData({...msgData, name: e.target.value})} /></div>
                    <div><label className="block text-xs font-bold text-slate-400 uppercase mb-2">Tu Correo</label><input type="email" required className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white outline-none focus:border-blue-500 transition" value={msgData.email} onChange={(e) => setMsgData({...msgData, email: e.target.value})} /></div>
                    <div><label className="block text-xs font-bold text-slate-400 uppercase mb-2">Mensaje</label><textarea required className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white outline-none focus:border-blue-500 transition h-32 resize-none" value={msgData.content} onChange={(e) => setMsgData({...msgData, content: e.target.value})}></textarea></div>
                    <button className="w-full bg-white text-slate-900 font-bold py-3 rounded-lg hover:bg-gray-200 transition shadow-lg flex items-center justify-center gap-2 transform active:scale-95"><FaPaperPlane /> Enviar Mensaje</button>
                    {msgStatus === 'success' && <div className="text-green-400 text-center text-sm bg-green-900/20 p-2 rounded border border-green-500/20">¡Recibido! Estaré en contacto pronto.</div>}
                </form>
            </div>
        </div>
      </section>
     
      <WhatsAppBtn />
    </div>
  );
};

export default HomePage;