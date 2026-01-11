import Navbar from '../components/Navbar';
import Footer from '../components/Footer'; // Asegúrate de tener el Footer creado
import Seo from '../components/Seo';
import ProcessTimeline from '../components/ProcessTimeline';
import { 
    FaRocket, FaLightbulb, FaGlobeAmericas, FaShieldAlt, 
    FaChartLine, FaCode, FaBrain 
} from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-blue-500 selection:text-white">
      <Seo title="Nosotros" description="Misión y Visión de NextSa Tech - Agencia de Desarrollo" />
      <Navbar />

      {/* --- 1. HERO SECTION: ABSTRACTO & FUTURISTA --- */}
      <section className="relative pt-32 pb-20 px-6 border-b border-slate-900 overflow-hidden">
        {/* Fondo decorativo */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 text-xs font-bold tracking-[0.2em] uppercase mb-6 animate-fade-in">
                Identidad Corporativa
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
                Arquitectos del <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-white">
                    Futuro Digital
                </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                No solo escribimos código; construimos ecosistemas digitales. 
                NextSa Tech nace para ser el motor tecnológico de los emprendedores 
                que se atreven a redefinir sus industrias.
            </p>
        </div>
      </section>

      {/* --- 2. FILOSOFÍA DE LA EMPRESA (EL OBJETIVO SÓLIDO) --- */}
      <section className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              <div className="order-2 lg:order-1 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 blur-2xl opacity-20 rounded-full"></div>
                  <div className="relative bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl">
                      <FaCode className="text-4xl text-blue-500 mb-6" />
                      <h3 className="text-2xl font-bold text-white mb-4">Más allá de una página web</h3>
                      <p className="text-slate-400 mb-6 leading-relaxed">
                          Entendemos que un emprendedor no necesita solo "presencia online", necesita herramientas de venta, automatización y gestión. 
                          Nuestro objetivo es dotar a las nuevas empresas con la misma infraestructura tecnológica que usan los gigantes corporativos.
                      </p>
                      <ul className="space-y-3">
                          <li className="flex items-center gap-3 text-slate-300">
                              <FaRocket className="text-green-400" /> Infraestructura Escalable
                          </li>
                          <li className="flex items-center gap-3 text-slate-300">
                              <FaShieldAlt className="text-blue-400" /> Seguridad de Grado Militar
                          </li>
                          <li className="flex items-center gap-3 text-slate-300">
                              <FaBrain className="text-purple-400" /> Integración de Inteligencia Artificial
                          </li>
                      </ul>
                  </div>
              </div>

              <div className="order-1 lg:order-2">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                      Impulsando la Nueva Era del Emprendimiento
                  </h2>
                  <p className="text-slate-400 text-lg leading-relaxed mb-6">
                      En un mundo hiperconectado, la tecnología es el gran igualador. 
                      NextSa Tech existe para cerrar la brecha técnica, permitiendo que 
                      visionarios se enfoquen en su negocio mientras nosotros nos encargamos 
                      de la ingeniería digital.
                  </p>
                  <p className="text-slate-400 text-lg leading-relaxed">
                      Creemos en el desarrollo a medida, limpio y optimizado. No usamos 
                      plantillas genéricas; creamos soluciones únicas para problemas únicos.
                  </p>
              </div>

          </div>
      </section>

      {/* --- 3. MISIÓN Y VISIÓN (CARDS) --- */}
      <section className="py-20 px-6 bg-slate-900/30">
          <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* MISIÓN */}
                  <div className="bg-slate-950 p-10 rounded-3xl border border-slate-800 hover:border-blue-500/50 transition duration-500 group relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition"></div>
                      <div className="w-14 h-14 bg-blue-900/20 rounded-xl flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition">
                          <FaLightbulb className="text-2xl" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">Nuestra Misión</h3>
                      <p className="text-slate-400 leading-relaxed">
                          Empoderar a empresas y emprendedores emergentes mediante el desarrollo de software de vanguardia. 
                          Nuestra misión es transformar ideas complejas en plataformas digitales intuitivas, robustas y rentables, 
                          eliminando las barreras tecnológicas para el crecimiento empresarial.
                      </p>
                  </div>

                  {/* VISIÓN */}
                  <div className="bg-slate-950 p-10 rounded-3xl border border-slate-800 hover:border-purple-500/50 transition duration-500 group relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-3xl group-hover:bg-purple-600/20 transition"></div>
                      <div className="w-14 h-14 bg-purple-900/20 rounded-xl flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition">
                          <FaGlobeAmericas className="text-2xl" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">Nuestra Visión</h3>
                      <p className="text-slate-400 leading-relaxed">
                          Consolidarnos como la agencia referente en innovación tecnológica en Latinoamérica. 
                          Visualizamos un futuro donde cada emprendimiento, sin importar su tamaño, tenga acceso 
                          a tecnología de élite para competir en el mercado global.
                      </p>
                  </div>

              </div>
          </div>
      </section>
<ProcessTimeline />
      {/* --- 4. NUESTROS PILARES (VALORES) --- */}
      <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">El ADN de NextSa Tech</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                  Estos son los principios innegociables que guían cada línea de código que escribimos.
              </p>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              <ValueCard 
                  icon={<FaChartLine />} 
                  title="Escalabilidad" 
                  desc="Desarrollamos pensando en mañana. Tu software estará listo para crecer de 10 a 1 millón de usuarios sin romperse."
              />
              <ValueCard 
                  icon={<FaBrain />} 
                  title="Innovación Constante" 
                  desc="El mundo digital cambia rápido. Nosotros vamos un paso adelante, implementando las últimas tendencias y frameworks."
              />
              <ValueCard 
                  icon={<FaShieldAlt />} 
                  title="Integridad y Calidad" 
                  desc="Código limpio, seguro y eficiente. No entregamos 'parches', entregamos productos finales de alta ingeniería."
              />
          </div>
      </section>

      {/* --- 5. CTA FINAL --- */}
      <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-[3rem] p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm -z-10"></div>
              
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                  ¿Listo para dar el salto?
              </h2>
              <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                  Tu idea tiene potencial global. Dale la infraestructura que se merece.
                  Agenda una consultoría estratégica con nuestro equipo hoy mismo.
              </p>
              <a href="/contacto" className="inline-block bg-white text-slate-950 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition transform hover:scale-105 shadow-xl shadow-blue-900/20">
                  Iniciar Transformación Digital
              </a>
          </div>
      </section>

      <Footer />
    </div>
  );
};

// Componente pequeño para las tarjetas de valores
const ValueCard = ({ icon, title, desc }) => (
    <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:bg-slate-800 transition text-center group">
        <div className="text-4xl text-slate-500 group-hover:text-blue-400 transition mb-6 flex justify-center">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
    </div>
);

export default AboutPage;