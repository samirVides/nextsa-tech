import { FaHandshake, FaLightbulb, FaRocket, FaGraduationCap } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Seo from '../components/Seo';
import yoFoto from '../assets/yo.jpeg';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-cyan-500 selection:text-white relative overflow-hidden">
      <Seo title="Sobre Mí" description="Conoce a Samir Bertel y la misión de Nexora Tech" />
      <Navbar />

      {/* Fondo decorativo sutil */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto relative z-10">
        
        {/* ENCABEZADO */}
        <div className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Más que Código, <br /> Construyo Oportunidades
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Mi misión es simple: Que ningún pequeño negocio se quede atrás en la era digital por falta de presupuesto.
            </p>
        </div>

        {/* SECCIÓN DE PERFIL (FOTO + HISTORIA) */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            {/* Espacio para TU FOTO */}
            <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
                {/* REEMPLAZA ESTA URL CON TU FOTO REAL */}
                <img 
                    src={yoFoto} 
                    alt="Samir Bertel" 
                    className="relative w-full h-[400px] object-cover rounded-2xl shadow-2xl border border-slate-700/50 grayscale hover:grayscale-0 transition duration-500" 
                />
            </div>

            {/* Texto Biográfico */}
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                    Hola, soy Samir Bertel Vides
                </h2>
                <div className="text-slate-300 space-y-4 leading-relaxed text-lg">
                    <p>
                        Como estudiante de <strong>Ingeniería de Sistemas</strong>, siempre me molestó ver cómo las grandes agencias cobran millones por sitios web sencillos, dejando fuera a los emprendedores que realmente mueven la economía.
                    </p>
                    <p>
                        Por eso fundé <strong>Nexora Tech</strong> con una filosofía diferente. No busco hacerme rico con un solo cliente; busco crear una red de negocios exitosos que confíen en mí a largo plazo.
                    </p>
                    <p>
                        Mi enfoque combina la <strong>calidad técnica</strong> de un ingeniero con la <strong>empatía</strong> de un socio. Yo me encargo de lo difícil (código, servidores, seguridad) para que tú te encargues de lo que amas: tu negocio.
                    </p>
                </div>
                
                {/* Pequeño Badge de Estudios */}
                <div className="inline-flex items-center gap-3 bg-slate-900/50 border border-slate-700 px-4 py-2 rounded-full text-sm text-blue-300">
                    <FaGraduationCap className="text-xl" />
                    <span>Ingeniero de Sistemas en Formación</span>
                </div>
            </div>
        </div>

        {/* VALORES (GRID) */}
        <div className="grid md:grid-cols-3 gap-6">
            <div className="glass p-8 rounded-xl border-t-4 border-green-500 hover:-translate-y-2 transition duration-300">
                <FaLightbulb className="text-4xl text-green-400 mb-4" />
                <h3 className="text-xl font-bold mb-3">Innovación Accesible</h3>
                <p className="text-slate-400">
                    Uso las mismas tecnologías que las grandes startups (React, Node.js), pero adaptadas a la realidad de tu negocio. Calidad top, sin costos inflados.
                </p>
            </div>
            
            <div className="glass p-8 rounded-xl border-t-4 border-blue-500 hover:-translate-y-2 transition duration-300">
                <FaHandshake className="text-4xl text-blue-400 mb-4" />
                <h3 className="text-xl font-bold mb-3">Trato Humano</h3>
                <p className="text-slate-400">
                    Aquí no hablas con un bot ni con una secretaria. Hablas directamente conmigo. Te explico todo en español claro, sin tecnicismos raros.
                </p>
            </div>

            <div className="glass p-8 rounded-xl border-t-4 border-purple-500 hover:-translate-y-2 transition duration-300">
                <FaRocket className="text-4xl text-purple-400 mb-4" />
                <h3 className="text-xl font-bold mb-3">Crecimiento Mutuo</h3>
                <p className="text-slate-400">
                    Si a tu página le va bien, tú me recomiendas y sigues contratando el mantenimiento. Mi éxito depende 100% de tu satisfacción.
                </p>
            </div>
        </div>

        {/* CTA FINAL */}
        <div className="mt-24 text-center glass p-10 rounded-2xl border border-blue-500/30">
            <h2 className="text-3xl font-bold mb-4">¿Listo para dar el paso?</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
                No tienes nada que perder. Hablemos, cuéntame tu idea y veamos cómo podemos hacerla realidad con tu presupuesto actual.
            </p>
            <a 
                href="https://wa.me/573137163216" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-block px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-slate-200 transition shadow-lg shadow-white/20"
            >
                Hablar con Samir
            </a>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;