import { FaSearch, FaPencilRuler, FaCode, FaRocket } from 'react-icons/fa';

const ProcessTimeline = () => {
  const steps = [
    {
      id: 1,
      title: "1. Descubrimiento y Estrategia",
      desc: "No adivinamos; analizamos. Nos reunimos contigo para entender tu modelo de negocio, tus objetivos y tu competencia. Definimos el alcance técnico y la hoja de ruta.",
      icon: <FaSearch />,
      color: "blue"
    },
    {
      id: 2,
      title: "2. Diseño UI/UX y Prototipado",
      desc: "Antes de escribir código, diseñamos la experiencia. Creamos esquemas visuales de alta fidelidad para que veas exactamente cómo lucirá tu plataforma antes de construirla.",
      icon: <FaPencilRuler />,
      color: "purple"
    },
    {
      id: 3,
      title: "3. Desarrollo e Ingeniería",
      desc: "Nuestros expertos construyen el sistema usando tecnologías modernas (React, Node, Laravel). Código limpio, seguro y optimizado para cargar en milisegundos.",
      icon: <FaCode />,
      color: "cyan"
    },
    {
      id: 4,
      title: "4. Lanzamiento y Escalamiento",
      desc: "Realizamos pruebas exhaustivas de calidad (QA). Desplegamos tu proyecto en servidores seguros, configuramos dominios y te entregamos las llaves de tu nuevo imperio digital.",
      icon: <FaRocket />,
      color: "green"
    }
  ];

  return (
    <section className="py-24 px-6 bg-slate-950 relative overflow-hidden">
      
      {/* TÍTULO DE LA SECCIÓN */}
      <div className="max-w-4xl mx-auto text-center mb-20 relative z-10">
        <span className="text-blue-500 font-bold tracking-widest uppercase text-xs mb-2 block">
            Metodología NextSa
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Tu camino al éxito digital
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
            Hemos optimizado nuestro flujo de trabajo para eliminar la incertidumbre. 
            Sabrás exactamente qué está pasando en cada etapa del proyecto.
        </p>
      </div>

      <div className="max-w-6xl mx-auto relative">
        
        {/* LÍNEA CENTRAL (SOLO VISIBLE EN DESKTOP) */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 opacity-30 rounded-full"></div>
        
        {/* LÍNEA LATERAL (SOLO VISIBLE EN MÓVIL) */}
        <div className="md:hidden absolute left-6 top-0 h-full w-1 bg-slate-800 rounded-full"></div>

        {/* ITEMS DEL TIMELINE */}
        <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => (
                <div key={step.id} className={`flex flex-col md:flex-row items-center justify-between w-full relative group ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    
                    {/* ESPACIO VACÍO (Para equilibrar en Desktop) */}
                    <div className="hidden md:block w-5/12"></div>

                    {/* PUNTO CENTRAL / ÍCONO */}
                    <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-slate-900 border-4 border-slate-950 z-20 shadow-[0_0_20px_rgba(59,130,246,0.3)] group-hover:scale-110 transition duration-300">
                        <div className={`text-${step.color}-400 text-lg`}>
                            {step.icon}
                        </div>
                    </div>

                    {/* TARJETA DE CONTENIDO */}
                    <div className="w-full pl-24 md:pl-0 md:w-5/12 relative">
                        <div className={`
                            bg-slate-900/50 p-8 rounded-2xl border border-slate-800 
                            hover:border-${step.color}-500/50 hover:bg-slate-900 
                            transition duration-500 group-hover:shadow-2xl 
                            ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}
                            group-hover:-translate-y-2
                        `}>
                            <h3 className={`text-xl font-bold text-white mb-3 flex items-center gap-3 md:block`}>
                                <span className={`text-${step.color}-400`}>{step.title}</span>
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                {step.desc}
                            </p>
                            
                            {/* Flecha decorativa (CSS Trick) */}
                            <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-slate-900 border-t border-r border-slate-800 rotate-45 
                                ${index % 2 !== 0 ? '-right-2 border-r border-t' : '-left-2 border-l border-b bg-slate-900 border-slate-800'}
                            `}></div>
                        </div>
                    </div>

                </div>
            ))}
        </div>

      </div>
    </section>
  );
};

export default ProcessTimeline;