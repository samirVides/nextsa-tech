import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaConnectdevelop, FaArrowRight } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';
import Seo from '../components/Seo';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login({ email, password });
      navigate('/');
    } catch (err) {
      setError('Credenciales incorrectas. Verifica tu correo y contraseña.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex font-sans overflow-hidden">
      <Seo title="Iniciar Sesión" description="Accede a tu cuenta en NextSa Tech" />

      {/* --- COLUMNA IZQUIERDA (ARTE & BRANDING) --- */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-blue-900 items-center justify-center overflow-hidden">
         {/* Fondo animado abstracto */}
         <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"></div>
         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
         
         {/* Orbes de luz */}
         <div className="absolute top-[-20%] left-[-20%] w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse"></div>
         <div className="absolute bottom-[-20%] right-[-20%] w-[800px] h-[800px] bg-purple-500/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>

         <div className="relative z-10 p-12 text-white max-w-lg">
             <div className="w-16 h-16 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center mb-8 border border-white/20 shadow-2xl">
                <FaConnectdevelop className="text-4xl text-blue-400" />
             </div>
             <h2 className="text-5xl font-bold mb-6 leading-tight">
                El futuro digital comienza aquí.
             </h2>
             <p className="text-blue-200 text-lg leading-relaxed mb-8">
                Únete al ecosistema de NextSa Tech. Gestiona tus proyectos, accede a soporte prioritario y escala tu negocio con tecnología de vanguardia.
             </p>
             <div className="flex items-center gap-4 text-sm font-bold tracking-widest uppercase text-blue-400">
                <span className="w-12 h-[1px] bg-blue-400"></span>
                NextSa Tech Agency
             </div>
         </div>
      </div>

      {/* --- COLUMNA DERECHA (FORMULARIO) --- */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 md:p-12 relative">
         {/* Botón flotante para volver */}
         <Link to="/" className="absolute top-8 right-8 text-slate-400 hover:text-white transition text-sm font-bold flex items-center gap-2">
            Volver al Inicio <FaArrowRight />
         </Link>

         <div className="w-full max-w-md">
             <div className="mb-10 text-center lg:text-left">
                 <h1 className="text-3xl font-bold text-white mb-2">Bienvenido de nuevo</h1>
                 <p className="text-slate-400">Ingresa tus credenciales para acceder al panel.</p>
             </div>

             {error && (
                 <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm flex items-center gap-3">
                     <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                     {error}
                 </div>
             )}

             <form onSubmit={handleSubmit} className="space-y-6">
                 <div className="space-y-2">
                     <label className="text-sm font-bold text-slate-300 ml-1">Correo Electrónico</label>
                     <div className="relative">
                         <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                             <FaEnvelope />
                         </div>
                         <input 
                            type="email" 
                            required 
                            placeholder="nombre@ejemplo.com"
                            className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl py-4 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition shadow-inner"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                         />
                     </div>
                 </div>

                 <div className="space-y-2">
                     <div className="flex justify-between items-center ml-1">
                        <label className="text-sm font-bold text-slate-300">Contraseña</label>
                        <Link to="/forgot-password" className="text-xs text-blue-400 hover:text-blue-300 transition">¿Olvidaste tu contraseña?</Link>
                     </div>
                     <div className="relative">
                         <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                             <FaLock />
                         </div>
                         <input 
                            type="password" 
                            required 
                            placeholder="••••••••"
                            className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl py-4 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition shadow-inner"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                         />
                     </div>
                 </div>

                 <button 
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 transition transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                    {loading ? 'Autenticando...' : 'Iniciar Sesión'}
                 </button>
             </form>

             <div className="mt-8 text-center">
                 <p className="text-slate-400 text-sm">
                     ¿Aún no tienes cuenta?{' '}
                     <Link to="/register" className="text-blue-400 font-bold hover:text-white transition">
                         Regístrate gratis
                     </Link>
                 </p>
             </div>
         </div>
      </div>
    </div>
  );
};

export default LoginPage;