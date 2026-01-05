import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
        {/* Fondo de estrellas sutil */}
        <div className="absolute inset-0 stars-bg opacity-20"></div>
        
        <h1 className="text-9xl font-extrabold text-slate-800 select-none absolute z-0 opacity-50">404</h1>
        
        <div className="relative z-10 glass p-10 rounded-2xl max-w-lg border border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.2)]">
            <h2 className="text-4xl font-bold mb-4 text-red-400">¡Houston, tenemos un problema!</h2>
            <p className="text-slate-300 mb-8 text-lg">
                La página que buscas se ha perdido en el espacio exterior o nunca existió.
            </p>
            <Link to="/" className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition shadow-lg shadow-blue-500/30">
                Regresar a la Tierra (Inicio)
            </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;