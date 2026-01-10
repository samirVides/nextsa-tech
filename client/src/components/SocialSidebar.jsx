import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';

const SocialSidebar = () => {
  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50">
      {/* El grupo controla el hover de todo el componente */}
      <div className="group relative flex items-center">
        
        {/* CAJA DE ÍCONOS (Oculta a la izquierda por defecto) */}
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700 p-4 rounded-r-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] 
                        transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out flex flex-col gap-6 relative z-20">
          
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-pink-500 hover:text-pink-400 text-2xl transition hover:scale-110">
            <FaInstagram />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-blue-500 hover:text-blue-400 text-2xl transition hover:scale-110">
            <FaFacebook />
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="text-white hover:text-gray-300 text-2xl transition hover:scale-110">
            <FaTiktok />
          </a>
        </div>

        {/* PESTAÑA "REDES" (Visible por defecto, desaparece al hacer hover) */}
        <div className="bg-blue-600/90 p-2 rounded-r-lg text-white text-xs font-bold writing-vertical-rl h-24 flex items-center justify-center cursor-pointer shadow-lg shadow-blue-500/50 
                        absolute left-0 group-hover:opacity-0 group-hover:-translate-x-10 transition-all duration-300 z-10">
          <span className="rotate-180" style={{ writingMode: 'vertical-rl' }}>REDES</span>
        </div>

      </div>
    </div>
  );
};

export default SocialSidebar;