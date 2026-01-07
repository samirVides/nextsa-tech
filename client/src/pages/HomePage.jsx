import { useEffect, useState } from 'react';
import { 
  FaWhatsapp, FaEnvelope, FaPaperPlane, 
  FaFacebook, FaInstagram, FaTiktok, FaHandHoldingUsd, FaTools, FaHandshake
} from 'react-icons/fa';
import api from '../api';
import ProjectCard from '../components/ProjectCard';
import Seo from '../components/Seo';
import DigitalGlobe from '../components/DigitalGlobe';
import Navbar from '../components/Navbar';
import WhatsAppBtn from '../components/WhatsAppBtn'; 
import FaqSection from '../components/FaqSection';


const HomePage = () => {
  const [projects, setProjects] = useState([]);
  const [msgData, setMsgData] = useState({ name: '', email: '', content: '' });
  const [msgStatus, setMsgStatus] = useState(null);

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
    <div className="min-h-screen bg-slate-950 text-white font-sans relative overflow-hidden selection:bg-cyan-500 selection:text-white">
      <Seo title="Inicio" description="Portafolio de Samir Bertel." />

      {/* NAVBAR */}
      <Navbar />

      {/* --- FONDO ESPACIAL --- */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-slate-950">
        <div className="absolute inset-0 stars-bg opacity-40"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-900 via-slate-900/50 to-cyan-900/20"></div>
        <div className="comet comet-1"></div>
        <div className="comet comet-2"></div>
        <div className="comet comet-3"></div>
      </div>

    
      {/* Hero Section CON GLOBO 3D */}
      <header className="relative pt-32 pb-32 text-center px-4 flex flex-col items-center overflow-hidden">
        
        {/* --- GLOBO DIGITAL 3D DE FONDO --- */}
        <DigitalGlobe />
        
        {/* Contenido del texto */}
        <div className="relative z-10 flex flex-col items-center max-w-5xl mx-auto">
            
            <div className="inline-block mb-6 px-6 py-2 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-300 text-sm font-semibold animate-pulse backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.4)]">
              Tu Socio Tecnológico de Confianza
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight drop-shadow-2xl">
              Digitalizamos tu Negocio <br /> 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 filter drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                Sin Barreras de Entrada
              </span>
            </h1>
            
            <div className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed drop-shadow-md">
              <p className="mb-4">
                Hola, soy <strong className="text-white">Samir Bertel</strong>. Ayudo a micro, pequeñas y medianas empresas a dar su primer paso digital de forma <strong>segura y eficiente.</strong>
              </p>
              <p className="text-slate-400 text-base">
                Mi modelo es diferente: Tú cubres directamente el <strong>Hosting y Dominio</strong>. 
                El desarrollo de tu web es mediante <strong>aporte voluntario</strong>. Mi ganancia real es ver tu negocio crecer, 
                brindarte mantenimiento a futuro y contar con tu recomendación.
              </p>
            </div>

            {/* Tarjetas de Beneficios (TEXTOS MEJORADOS) */}
            {/* Tarjetas de Beneficios (DISEÑO PROFESIONAL CON ICONOS SVG) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full relative z-20">
                
                {/* Tarjeta 1 - Verde */}
                <div className="bg-slate-900/80 p-6 rounded-xl border border-green-500/40 flex flex-col items-center hover:scale-105 transition shadow-lg shadow-green-900/20 group">
                    {/* Nuevo Contenedor de Icono */}
                    <div className="mb-4 p-4 rounded-full bg-gradient-to-br from-green-500/20 to-green-900/30 border border-green-400/50 shadow-[0_0_15px_rgba(34,197,94,0.3)] group-hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] transition-all">
                        <FaHandHoldingUsd className="text-3xl text-green-400" />
                    </div>
                    <h3 className="font-bold text-green-400 text-lg mb-2">Aporte Voluntario</h3>
                    <p className="text-sm text-slate-300">Pagas lo que consideres justo por mi trabajo de desarrollo inicial.</p>
                </div>

                {/* Tarjeta 2 - Azul */}
                <div className="bg-slate-900/80 p-6 rounded-xl border border-blue-500/40 flex flex-col items-center hover:scale-105 transition shadow-lg shadow-blue-900/20 group">
                     {/* Nuevo Contenedor de Icono */}
                    <div className="mb-4 p-4 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-900/30 border border-blue-400/50 shadow-[0_0_15px_rgba(59,130,246,0.3)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all">
                        <FaTools className="text-3xl text-blue-400" />
                    </div>
                    <h3 className="font-bold text-blue-400 text-lg mb-2">Te Ayudo en Todo</h3>
                    <p className="text-sm text-slate-300">
                      Tranquilo. Yo me encargo de la configuración técnica del hosting y dominio.
                    </p>
                </div>

                {/* Tarjeta 3 - Púrpura */}
                <div className="bg-slate-900/80 p-6 rounded-xl border border-purple-500/40 flex flex-col items-center hover:scale-105 transition shadow-lg shadow-purple-900/20 group">
                     {/* Nuevo Contenedor de Icono */}
                    <div className="mb-4 p-4 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-900/30 border border-purple-400/50 shadow-[0_0_15px_rgba(168,85,247,0.3)] group-hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all">
                        <FaHandshake className="text-3xl text-purple-400" />
                    </div>
                    <h3 className="font-bold text-purple-400 text-lg mb-2">Ganamos Todos</h3>
                    <p className="text-sm text-slate-300">Busco una relación a largo plazo: mejoras, mantenimiento y tus referidos.</p>
                </div>
            </div>
            
            {/* Botones */}
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a href="https://wa.me/573137163216?text=Hola%20Samir,%20me%20interesa%20digitalizar%20mi%20negocio%20con%20tu%20modelo%20voluntario." target="_blank" rel="noreferrer" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-full transition shadow-xl shadow-blue-500/40 transform hover:-translate-y-1 hover:scale-105 flex items-center gap-2 justify-center">
                <FaWhatsapp className="text-xl" /> Agendar Asesoría Gratis
              </a>
              <a href="#proyectos" className="px-8 py-4 bg-slate-900/50 hover:bg-slate-800/80 text-white font-bold rounded-full transition border border-blue-500/30 hover:border-blue-400 backdrop-blur-md shadow-lg hover:shadow-blue-500/20">
                Ver Portafolio
              </a>
            </div>
        </div>
      </header>
      
      <div className="h-20"></div>

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
          <div className="text-center py-20 glass rounded-xl border-dashed border-2 border-slate-700">
            <p className="text-slate-400 text-xl">Cargando portafolio...</p>
          </div>
        )}
      </section>

      {/* SECCIÓN CONTACTO */}
      <FaqSection />
      <section id="contacto" className="relative py-20 z-10">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
            <div>
                <h3 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                  Hablemos de tu proyecto
                </h3>
                <p className="text-slate-300 mb-8 text-lg">
                    ¿Tienes una idea innovadora? Sígueme en redes sociales o escríbeme directamente.
                </p>
                <div className="space-y-4 mb-10">
                    <a href="https://wa.me/573137163216" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 glass rounded-xl hover:bg-white/5 transition group border border-slate-700/50 hover:border-green-500/50">
                        <div className="bg-green-500/20 p-3 rounded-full group-hover:bg-green-500/30 transition">
                          <FaWhatsapp className="text-2xl text-green-400" />
                        </div>
                        <div>
                            <h4 className="font-bold text-white">WhatsApp</h4>
                            <p className="text-sm text-slate-400">+57 313 716 3216</p>
                        </div>
                    </a>
                    <a href="mailto:andresvidesbertel@gmail.com" className="flex items-center gap-4 p-4 glass rounded-xl hover:bg-white/5 transition group border border-slate-700/50 hover:border-blue-500/50">
                        <div className="bg-blue-500/20 p-3 rounded-full group-hover:bg-blue-500/30 transition">
                          <FaEnvelope className="text-2xl text-blue-400" />
                        </div>
                        <div>
                            <h4 className="font-bold text-white">Email</h4>
                            <p className="text-sm text-slate-400">andresvidesbertel@gmail.com</p>
                        </div>
                    </a>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Sígueme en Redes</h4>
                  <div className="flex gap-4">
                    <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-3 bg-slate-800 rounded-full hover:bg-[#1877F2] hover:text-white text-slate-400 transition transform hover:-translate-y-1 shadow-lg">
                      <FaFacebook className="text-xl" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-3 bg-slate-800 rounded-full hover:bg-pink-600 hover:text-white text-slate-400 transition transform hover:-translate-y-1 shadow-lg">
                      <FaInstagram className="text-xl" />
                    </a>
                    <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="p-3 bg-slate-800 rounded-full hover:bg-black hover:text-white border border-slate-700 hover:border-white text-slate-400 transition transform hover:-translate-y-1 shadow-lg">
                      <FaTiktok className="text-xl" />
                    </a>
                  </div>
                </div>
            </div>
            <div className="glass p-8 rounded-2xl shadow-2xl">
                <form onSubmit={handleMessageSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Tu Nombre</label>
                        <input 
                            type="text" required
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                            placeholder="Ej. Juan Pérez"
                            value={msgData.name}
                            onChange={(e) => setMsgData({...msgData, name: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Tu Correo</label>
                        <input 
                            type="email" required
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                            placeholder="juan@empresa.com"
                            value={msgData.email}
                            onChange={(e) => setMsgData({...msgData, email: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Mensaje</label>
                        <textarea 
                            required
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition h-32 resize-none"
                            placeholder="Cuéntame sobre tu proyecto..."
                            value={msgData.content}
                            onChange={(e) => setMsgData({...msgData, content: e.target.value})}
                        ></textarea>
                    </div>
                    <button className="w-full bg-white text-slate-900 font-bold py-3 rounded-lg hover:bg-gray-200 transition shadow-lg flex items-center justify-center gap-2 transform active:scale-95">
                        <FaPaperPlane /> Enviar Mensaje
                    </button>
                    {msgStatus === 'success' && (
                        <div className="text-green-400 text-center text-sm bg-green-900/20 p-2 rounded border border-green-500/20">
                            ¡Recibido! Estaré en contacto pronto.
                        </div>
                    )}
                </form>
            </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative bg-slate-950 py-8 text-center text-slate-600 text-sm border-t border-slate-900 z-10">
        <p>© {new Date().getFullYear()} Nexora Tech. Innovación y Desarrollo.</p>
        <div className="flex justify-center gap-4 mt-4 opacity-50">
            <FaFacebook className="hover:text-blue-500 cursor-pointer transition" />
            <FaInstagram className="hover:text-pink-500 cursor-pointer transition" />
            <FaTiktok className="hover:text-white cursor-pointer transition" />
        </div>
      </footer>

      {/* --- 2. AQUÍ ESTÁ EL BOTÓN DE WHATSAPP FLOTANTE --- */}
      <WhatsAppBtn />

    </div>
  );
};

export default HomePage;