import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCookieBite, FaTimes } from 'react-icons/fa';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 1. Verificamos si ya aceptó antes
    const consent = localStorage.getItem('nextsa_cookie_consent');
    if (!consent) {
      // Si no ha aceptado, mostramos el banner con un pequeño retraso para que sea suave
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    // 2. Guardamos la decisión en el navegador del usuario
    localStorage.setItem('nextsa_cookie_consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md bg-slate-900/95 backdrop-blur-md border border-slate-700 p-6 rounded-2xl shadow-2xl z-50 animate-fade-in-up">
      <div className="flex items-start gap-4">
        <div className="bg-blue-600/20 p-3 rounded-full text-blue-400 shrink-0">
            <FaCookieBite size={24} />
        </div>
        <div>
            <h4 className="text-white font-bold text-lg mb-2">Uso de Cookies</h4>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                Utilizamos cookies propias y de terceros para mejorar tu experiencia y analizar el tráfico. Al continuar navegando, aceptas nuestra{' '}
                <Link to="/privacidad" className="text-blue-400 hover:underline">
                    Política de Privacidad
                </Link>.
            </p>
            <div className="flex gap-3">
                <button 
                    onClick={acceptCookies}
                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-xl font-bold text-sm transition shadow-lg shadow-blue-600/20"
                >
                    Aceptar Todo
                </button>
                <button 
                    onClick={() => setIsVisible(false)}
                    className="px-3 py-2 text-slate-400 hover:text-white transition"
                >
                    <FaTimes />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;