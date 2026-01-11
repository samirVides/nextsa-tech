import { Link } from 'react-router-dom';
import { FaHome, FaSpaceShuttle } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden text-center px-6 selection:bg-purple-500 selection:text-white">
      
      {/* --- ESTILOS DE ANIMACIÓN --- */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .astronaut-float {
          animation: float 6s ease-in-out infinite;
        }
        .star {
          position: absolute;
          background: white;
          border-radius: 50%;
          opacity: 0.5;
          animation: twinkle 4s infinite;
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
      `}</style>

      {/* --- FONDO ESTRELLADO (Generado dinámicamente) --- */}
      <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
              <div 
                key={i}
                className="star"
                style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    width: `${Math.random() * 3}px`,
                    height: `${Math.random() * 3}px`,
                    animationDelay: `${Math.random() * 5}s`
                }}
              ></div>
          ))}
          {/* Planeta decorativo */}
          <div className="absolute top-20 right-20 w-32 h-32 bg-purple-600/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <div className="relative z-10 max-w-2xl mx-auto">
        
        {/* TEXTO 404 GIGANTE */}
        <h1 className="text-[8rem] md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-slate-700 to-slate-950 leading-none select-none opacity-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
            404
        </h1>

        {/* IMAGEN ASTRONAUTA */}
        <img 
            src="https://cdn3d.iconscout.com/3d/premium/thumb/astronaut-3025714-2526912.png" 
            alt="Astronauta Perdido" 
            className="w-64 md:w-80 mx-auto astronaut-float mb-8 drop-shadow-[0_20px_50px_rgba(59,130,246,0.3)]"
        />

        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            OOPS, tenemos un problema.
        </h2>
        
        <p className="text-slate-400 text-lg md:text-xl mb-10 max-w-lg mx-auto">
            La página que buscas ha sido abducida, se perdió en un agujero negro o simplemente nunca existió.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Link 
                to="/" 
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-full transition shadow-lg shadow-blue-600/20 transform hover:-translate-y-1"
            >
                <FaHome /> Volver a la Tierra
            </Link>
            
            <Link 
                to="/contacto" 
                className="flex items-center gap-2 border border-slate-700 hover:border-white text-slate-400 hover:text-white font-bold py-3 px-8 rounded-full transition"
            >
                <FaSpaceShuttle /> Reportar Anomalía
            </Link>
        </div>

      </div>

      {/* FOOTER PEQUEÑO */}
      <div className="absolute bottom-8 text-slate-600 text-xs font-mono">
          ERROR_CODE: 404_NOT_FOUND | SYSTEM_STATUS: CRITICAL
      </div>

    </div>
  );
};

export default NotFound;