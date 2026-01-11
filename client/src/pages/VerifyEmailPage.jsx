import { useEffect, useState, useRef } from 'react'; // <--- 1. Importar useRef
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import { FaCheckCircle, FaTimesCircle, FaConnectdevelop } from 'react-icons/fa';

const VerifyEmailPage = () => {
  const { token } = useParams();
  const [status, setStatus] = useState('verifying');
  
  // 2. Referencia para saber si ya se llamó a la API
  const effectRan = useRef(false);

  useEffect(() => {
    // 3. Si ya corrió, no hacer nada (evita el doble disparo en Dev)
    if (effectRan.current === true) return;

    const verifyAccount = async () => {
      try {
        await api.get(`/api/users/verify/${token}`);
        setStatus('success');
      } catch (error) {
        console.error(error);
        // Si falla, verificamos si es porque ya estaba verificado (opcional, pero buena práctica)
        setStatus('error');
      }
    };

    verifyAccount();

    // Marcar como ejecutado
    return () => {
        effectRan.current = true; 
    };
  }, [token]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-center px-4 font-sans">
      
      {/* Icono de Carga */}
      {status === 'verifying' && (
        <div className="flex flex-col items-center animate-pulse">
            <FaConnectdevelop className="text-6xl text-blue-500 mb-6 animate-spin-slow" />
            <h2 className="text-2xl text-white font-bold">Verificando credenciales...</h2>
            <p className="text-slate-400 mt-2">Estamos conectando con el servidor seguro de NextSa Tech.</p>
        </div>
      )}

      {/* Éxito */}
      {status === 'success' && (
        <div className="bg-slate-900 p-10 rounded-3xl border border-green-500/30 shadow-[0_0_50px_rgba(34,197,94,0.2)] max-w-md animate-fade-in-up">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCheckCircle className="text-4xl text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">¡Cuenta Verificada!</h2>
            <p className="text-slate-400 mb-8">
                Tu identidad ha sido confirmada. Ahora tienes acceso completo a nuestro ecosistema digital.
            </p>
            <Link to="/login" className="block w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-xl transition">
                Ir al Login
            </Link>
        </div>
      )}

      {/* Error */}
      {status === 'error' && (
        <div className="bg-slate-900 p-10 rounded-3xl border border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.2)] max-w-md animate-fade-in-up">
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaTimesCircle className="text-4xl text-red-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Enlace no válido</h2>
            <p className="text-slate-400 mb-8">
                El enlace ha expirado o ya fue utilizado. <br/>
                <span className="text-sm text-blue-400">Intenta iniciar sesión, es posible que tu cuenta ya esté activa.</span>
            </p>
            <div className="space-y-3">
                <Link to="/login" className="block w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition">
                    Probar Iniciar Sesión
                </Link>
                <Link to="/contact" className="block w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl transition">
                    Contactar Soporte
                </Link>
            </div>
        </div>
      )}

    </div>
  );
};

export default VerifyEmailPage;