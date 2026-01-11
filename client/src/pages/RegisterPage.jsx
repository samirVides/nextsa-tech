import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaConnectdevelop, FaArrowRight } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';
import Seo from '../components/Seo';

const RegisterPage = () => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useContext(AuthContext); // Asumiendo que tienes una funcion register
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register({ name, email, password });
      navigate('/'); 
    } catch (err) {
      setError('Error al registrar. El correo podría estar en uso.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex font-sans overflow-hidden">
      <Seo title="Crear Cuenta" description="Únete a NextSa Tech" />

      {/* --- COLUMNA IZQUIERDA (ARTE & BRANDING - TEMA PURPLE) --- */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-purple-900 items-center justify-center overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
         
         <div className="absolute top-[-20%] right-[-20%] w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse"></div>
         <div className="absolute bottom-[-20%] left-[-20%] w-[800px] h-[800px] bg-purple-500/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>

         <div className="relative z-10 p-12 text-white max-w-lg">
             <div className="w-16 h-16 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center mb-8 border border-white/20 shadow-2xl">
                <FaConnectdevelop className="text-4xl text-purple-300" />
             </div>
             <h2 className="text-5xl font-bold mb-6 leading-tight">
                Construye algo extraordinario.
             </h2>
             <p className="text-purple-200 text-lg leading-relaxed mb-8">
                Al crear tu cuenta en NextSa Tech, obtienes acceso a herramientas exclusivas, seguimiento de proyectos en tiempo real y recursos para desarrolladores.
             </p>
             <div className="flex items-center gap-4 text-sm font-bold tracking-widest uppercase text-purple-400">
                <span className="w-12 h-[1px] bg-purple-400"></span>
                NextSa Tech Agency
             </div>
         </div>
      </div>

      {/* --- COLUMNA DERECHA (FORMULARIO) --- */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 md:p-12 relative">
         <Link to="/" className="absolute top-8 right-8 text-slate-400 hover:text-white transition text-sm font-bold flex items-center gap-2">
            Volver al Inicio <FaArrowRight />
         </Link>

         <div className="w-full max-w-md">
             <div className="mb-10 text-center lg:text-left">
                 <h1 className="text-3xl font-bold text-white mb-2">Crear Cuenta 🚀</h1>
                 <p className="text-slate-400">Completa tus datos para comenzar.</p>
             </div>

             {error && (
                 <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm flex items-center gap-3">
                     <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                     {error}
                 </div>
             )}

             <form onSubmit={handleSubmit} className="space-y-5">
                 <div className="space-y-2">
                     <label className="text-sm font-bold text-slate-300 ml-1">Nombre Completo</label>
                     <div className="relative">
                         <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                             <FaUser />
                         </div>
                         <input 
                            type="text" 
                            required 
                            placeholder="Ej. Juan Pérez"
                            className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl py-4 pl-12 pr-4 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition shadow-inner"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                         />
                     </div>
                 </div>

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
                            className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl py-4 pl-12 pr-4 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition shadow-inner"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                         />
                     </div>
                 </div>

                 <div className="space-y-2">
                     <label className="text-sm font-bold text-slate-300 ml-1">Contraseña</label>
                     <div className="relative">
                         <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                             <FaLock />
                         </div>
                         <input 
                            type="password" 
                            required 
                            placeholder="Mínimo 6 caracteres"
                            className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl py-4 pl-12 pr-4 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition shadow-inner"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                         />
                     </div>
                 </div>

                 {/* 👇 NUEVO CHECKBOX LEGAL */}
                 <div className="flex items-start gap-3 ml-1">
                    <div className="relative flex items-center">
                        <input 
                            type="checkbox" 
                            id="terms"
                            className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-slate-700 bg-slate-900 checked:bg-purple-600 transition-all"
                            checked={termsAccepted}
                            onChange={(e) => setTermsAccepted(e.target.checked)}
                        />
                        <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none text-xs">
                            ✔
                        </span>
                    </div>
                    <label htmlFor="terms" className="text-sm text-slate-400 cursor-pointer select-none">
                        He leído y acepto los <Link to="/terminos" className="text-blue-400 hover:underline">Términos y Condiciones</Link>, la <Link to="/privacidad" className="text-blue-400 hover:underline">Política de Privacidad</Link> y autorizo el envío de novedades.
                    </label>
                 </div>

                 <button 
                    // 👇 DESHABILITAR SI NO ACEPTA
                    disabled={loading || !termsAccepted} 
                    className={`w-full font-bold py-4 rounded-xl shadow-lg transition transform active:scale-95 
                        ${termsAccepted 
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-purple-600/20' 
                            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        }`}
                 >
                    {loading ? 'Registrando...' : 'Crear Cuenta'}
                 </button>
             </form>

             <div className="mt-8 text-center">
                 <p className="text-slate-400 text-sm">
                     ¿Ya tienes cuenta?{' '}
                     <Link to="/login" className="text-purple-400 font-bold hover:text-white transition">
                         Inicia Sesión
                     </Link>
                 </p>
             </div>
         </div>
      </div>
    </div>
  );
};

export default RegisterPage;