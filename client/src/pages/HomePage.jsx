import { useEffect, useState, useRef, useMemo } from 'react';
import Globe from 'react-globe.gl'; 
import { Link } from 'react-router-dom';
import { 
  FaWhatsapp, FaEnvelope, FaPaperPlane, 
  FaFacebook, FaInstagram, FaTiktok,
  FaHandHoldingUsd, FaTools, FaHandshake
} from 'react-icons/fa';
import api from '../api';
import ProjectCard from '../components/ProjectCard';
import Seo from '../components/Seo';
import Navbar from '../components/Navbar';
import WhatsAppBtn from '../components/WhatsAppBtn'; 
import FaqSection from '../components/FaqSection';
import SocialMedia from '../components/SocialSidebar';

const HomePage = () => {
  // --- LÓGICA ORIGINAL ---
  const [projects, setProjects] = useState([]);
  const [msgData, setMsgData] = useState({ name: '', email: '', content: '' });
  const [msgStatus, setMsgStatus] = useState(null);
  const globeEl = useRef(); 

  // --- LÓGICA NUEVA: DATOS DEL GLOBO (Arcos y Anillos) ---
  // Generamos datos aleatorios solo una vez usando useMemo para que no parpadee
  const gData = useMemo(() => {
    const N = 30; // Cantidad de líneas de conexión
    return [...Array(N).keys()].map(() => ({
      startLat: (Math.random() - 0.5) * 160,
      startLng: (Math.random() - 0.5) * 360,
      endLat: (Math.random() - 0.5) * 160,
      endLng: (Math.random() - 0.5) * 360,
      color: [['#3b82f6', '#06b6d4'][Math.round(Math.random())], ['#8b5cf6', '#3b82f6'][Math.round(Math.random())]]
    }));
  }, []);

  const ringsData = useMemo(() => {
    const N = 15; // Cantidad de "nodos" pulsando
    return [...Array(N).keys()].map(() => ({
      lat: (Math.random() - 0.5) * 160,
      lng: (Math.random() - 0.5) * 360,
      maxR: Math.random() * 20 + 3,
      propagationSpeed: (Math.random() - 0.5) * 20 + 1,
      repeatPeriod: Math.random() * 2000 + 200
    }));
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await api.get('/api/projects');
        setProjects(data);
      } catch (error) {
        console.error("Error cargando proyectos:", error);
      }
    };
    fetchProjects();
  }, []);

  // Configuración inicial del Globo
  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.8;
      // Vista inicial centrada
      globeEl.current.pointOfView({ lat: 20, lng: -70, altitude: 2.5 }); 
    }
  }, []);

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/messages', msgData);
      setMsgStatus('success');
      setMsgData({ name: '', email: '', content: '' });
      setTimeout(() => setMsgStatus(null), 5000);
    } catch (error) {
      setMsgStatus('error');
    }
  };

  const removeProjectFromState = (id) => {
    setProjects(projects.filter(p => p._id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans relative overflow-x-hidden selection:bg-cyan-500 selection:text-white">
      <Seo title="Inicio" description="NextSa Tech - Desarrollo Web Profesional" />

      <Navbar />
      <SocialMedia />

      {/* FONDO AMBIENTAL */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-slate-950">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full"></div>
      </div>

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-32 pb-12 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[85vh]">
        
        {/* COLUMNA IZQUIERDA: TEXTO */}
        <div className="flex flex-col gap-6 z-10 animate-fade-in-left order-2 lg:order-1">
            <div className="inline-block px-4 py-1 rounded-full bg-blue-900/30 border border-blue-500/30 w-fit">
                <span className="text-blue-400 text-xs md:text-sm font-bold tracking-widest uppercase animate-pulse">
                   🌐 Global Connection System
                </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Bienvenido a <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 drop-shadow-[0_0_25px_rgba(56,189,248,0.3)]">
                NextSa Tech
              </span>
            </h1>
            
            <p className="text-slate-300 text-lg md:text-xl max-w-lg leading-relaxed">
              Transformo ideas abstractas en experiencias digitales de alto impacto. 
              Desarrollo a medida, diseño futurista y tecnología de punta al alcance de tu bolsillo.
            </p>

            <div className="flex flex-wrap gap-4 mt-4">
                <a href="#contacto" className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 transition hover:scale-105">
                    Empezar Proyecto
                </a>
                <a href="#proyectos" className="px-8 py-3 border border-slate-600 hover:border-white text-slate-300 hover:text-white rounded-xl font-bold transition">
                    Ver Portafolio
                </a>
            </div>
        </div>

        {/* COLUMNA DERECHA: GLOBO 3D CON RED */}
        <div className="relative h-[350px] md:h-[500px] w-full flex items-center justify-center animate-fade-in-right order-1 lg:order-2">
            
            {/* Marco Tecnológico */}
            <div className="relative w-full h-full bg-slate-900/40 backdrop-blur-sm border border-slate-700/50 rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/20 group">
                
                {/* Detalles UI del marco */}
                <div className="absolute top-4 left-4 flex gap-2 z-20">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="absolute top-4 right-4 text-xs text-blue-500 font-mono border border-blue-500/30 px-2 py-1 rounded z-20 bg-slate-900/80">NET.STATUS: ONLINE</div>
                <div className="absolute bottom-4 left-6 text-xs text-slate-500 font-mono z-20">DATA FLOW: 100%</div>

                {/* EL GLOBO */}
                <div className="cursor-move w-full h-full flex items-center justify-center opacity-90 hover:opacity-100 transition duration-500">
                    <Globe
                        ref={globeEl}
                        width={600}
                        height={600}
                        backgroundColor="rgba(0,0,0,0)"
                        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                        atmosphereColor="#3b82f6"
                        atmosphereAltitude={0.2}
                        
                        // --- EFECTO DE ARCOS (LÍNEAS) ---
                        arcsData={gData}
                        arcColor={'color'}
                        arcDashLength={0.9} // Largo del "paquete de datos"
                        arcDashGap={4} // Espacio entre paquetes
                        arcDashAnimateTime={1000} // Velocidad (ms)
                        arcStroke={0.5} // Grosor de la línea (fina es más elegante)
                        
                        // --- EFECTO DE ANILLOS (NODOS) ---
                        ringsData={ringsData}
                        ringColor={() => t => `rgba(59,130,246,${1-t})`} // Se desvanece
                        ringMaxRadius={5}
                        ringPropagationSpeed={2}
                        ringRepeatPeriod={800}

                        enableZoom={false}
                    />
                </div>
            </div>
        </div>
      </section>


      {/* SECCIÓN TARJETAS COMPACTAS */}
      <section className="px-6 pb-20 max-w-7xl mx-auto relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900/50 p-6 rounded-xl border border-green-500/20 flex flex-col items-center hover:bg-slate-800 transition hover:-translate-y-2 duration-300 group">
                    <div className="mb-4 p-3 rounded-full bg-green-500/10 text-green-400 group-hover:scale-110 transition shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                        <FaHandHoldingUsd className="text-3xl" />
                    </div>
                    <h3 className="font-bold text-white text-lg">Costo Simbólico</h3>
                    <p className="text-sm text-slate-400 text-center mt-2">
                        Calidad de agencia al precio de un café. Busco casos de éxito, no hacerme rico (aún).
                    </p>
                </div>
                <div className="bg-slate-900/50 p-6 rounded-xl border border-blue-500/20 flex flex-col items-center hover:bg-slate-800 transition hover:-translate-y-2 duration-300 group">
                     <div className="mb-4 p-3 rounded-full bg-blue-500/10 text-blue-400 group-hover:scale-110 transition shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                        <FaTools className="text-3xl" />
                    </div>
                    <h3 className="font-bold text-white text-lg">Soporte Total</h3>
                    <p className="text-sm text-slate-400 text-center mt-2">
                        Despreocúpate. Yo configuro el hosting, dominio, SSL y correos corporativos.
                    </p>
                </div>
                <div className="bg-slate-900/50 p-6 rounded-xl border border-purple-500/20 flex flex-col items-center hover:bg-slate-800 transition hover:-translate-y-2 duration-300 group">
                     <div className="mb-4 p-3 rounded-full bg-purple-500/10 text-purple-400 group-hover:scale-110 transition shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                        <FaHandshake className="text-3xl" />
                    </div>
                    <h3 className="font-bold text-white text-lg">Alianzas</h3>
                    <p className="text-sm text-slate-400 text-center mt-2">
                        Relación a largo plazo. Si tú creces, yo crezco. Mantenimiento y mejoras continuas.
                    </p>
                </div>
          </div>
      </section>

      {/* SECCIÓN PROYECTOS */}
      <section id="proyectos" className="relative max-w-7xl mx-auto px-6 py-20 z-10">
        <h3 className="text-3xl font-bold border-l-4 border-blue-500 pl-4 mb-12">Proyectos Destacados</h3>
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} onDelete={removeProjectFromState} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-900/30 rounded-xl border-dashed border-2 border-slate-700">
            <p className="text-slate-400 text-xl">Cargando portafolio...</p>
          </div>
        )}
      </section>

      {/* SECCIÓN FAQ */}
      <FaqSection />

      {/* SECCIÓN CONTACTO */}
      <section id="contacto" className="relative py-20 z-10 bg-slate-900/20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
            <div>
                <h3 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                  Hablemos de tu idea
                </h3>
                <p className="text-slate-300 mb-8 text-lg">
                    ¿Listo para dar el siguiente paso? Escríbeme y analicemos tu caso sin compromiso.
                </p>
                <div className="space-y-4 mb-10">
                    <a href="https://wa.me/573137163216" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition group border border-slate-700 hover:border-green-500/50">
                        <div className="bg-green-500/20 p-3 rounded-full group-hover:bg-green-500/30 transition">
                          <FaWhatsapp className="text-2xl text-green-400" />
                        </div>
                        <div>
                            <h4 className="font-bold text-white">WhatsApp</h4>
                            <p className="text-sm text-slate-400">+57 313 716 3216</p>
                        </div>
                    </a>
                    <a href="mailto:andresvidesbertel@gmail.com" className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition group border border-slate-700 hover:border-blue-500/50">
                        <div className="bg-blue-500/20 p-3 rounded-full group-hover:bg-blue-500/30 transition">
                          <FaEnvelope className="text-2xl text-blue-400" />
                        </div>
                        <div>
                            <h4 className="font-bold text-white">Email</h4>
                            <p className="text-sm text-slate-400">andresvidesbertel@gmail.com</p>
                        </div>
                    </a>
                </div>
            </div>
            
            <div className="bg-slate-900/80 p-8 rounded-2xl shadow-2xl border border-slate-800">
                <form onSubmit={handleMessageSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Tu Nombre</label>
                        <input 
                            type="text" required
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                            placeholder="Ej. Juan Pérez"
                            value={msgData.name}
                            onChange={(e) => setMsgData({...msgData, name: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Tu Correo</label>
                        <input 
                            type="email" required
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                            placeholder="juan@empresa.com"
                            value={msgData.email}
                            onChange={(e) => setMsgData({...msgData, email: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Mensaje</label>
                        <textarea 
                            required
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition h-32 resize-none"
                            placeholder="Cuéntame sobre tu proyecto..."
                            value={msgData.content}
                            onChange={(e) => setMsgData({...msgData, content: e.target.value})}
                        ></textarea>
                    </div>
                    <button className="w-full bg-white text-slate-900 font-bold py-3 rounded-lg hover:bg-gray-200 transition shadow-lg flex items-center justify-center gap-2 transform active:scale-95">
                        <FaPaperPlane /> Enviar Mensaje
                    </button>
                    {msgStatus === 'success' && (
                        <div className="text-green-400 text-center text-sm bg-green-900/20 p-2 rounded border border-green-500/20 animate-fade-in-down">
                            ¡Recibido! Estaré en contacto pronto.
                        </div>
                    )}
                </form>
            </div>
        </div>
      </section>

      <footer className="relative bg-slate-950 py-8 text-center text-slate-600 text-sm border-t border-slate-900 z-10">
        <p>© {new Date().getFullYear()} NextSa Tech. Innovación y Desarrollo.</p>
        <div className="flex justify-center gap-4 mt-4 opacity-50">
            <FaFacebook className="hover:text-blue-500 cursor-pointer transition" />
            <FaInstagram className="hover:text-pink-500 cursor-pointer transition" />
            <FaTiktok className="hover:text-white cursor-pointer transition" />
        </div>
      </footer>

      <WhatsAppBtn />

    </div>
  );
};

export default HomePage;