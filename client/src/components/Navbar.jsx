import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { FaBars, FaTimes, FaConnectdevelop, FaChartPie, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Función para saber si el link está activo
  const isActive = (path) => location.pathname === path ? "text-white bg-white/10" : "text-gray-300 hover:text-white hover:bg-white/5";
  const linkClass = "px-3 py-2 rounded-lg transition font-medium text-sm";

  return (
    <nav className="fixed w-full px-6 py-3 flex justify-between items-center z-50 glass border-b border-cyan-500/10 backdrop-blur-xl bg-slate-950/80">
      
      {/* --- LOGO --- */}
      <Link to="/" className="flex items-center gap-3 group">
        <div className="w-10 h-10 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg flex items-center justify-center border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] group-hover:border-blue-400 transition-all duration-300 transform group-hover:rotate-180">
            <FaConnectdevelop className="text-2xl text-blue-400 group-hover:text-white transition-colors duration-300" />
        </div>
        
        <div className="flex flex-col leading-none">
            <span className="text-lg font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-white group-hover:to-blue-400 transition-all">
                NEXTSA
            </span>
            <span className="text-[10px] font-bold text-slate-400 tracking-[0.3em] group-hover:text-white transition-colors">
                TECH
            </span>
        </div>
      </Link>
      
      {/* --- MENÚ ESCRITORIO --- */}
      <div className="hidden md:flex items-center gap-2">
        <Link to="/" className={`${isActive('/')} ${linkClass}`}>Inicio</Link>
        <Link to="/projects" className={`${isActive('/projects')} ${linkClass}`}>Proyectos</Link>
        <Link to="/about" className={`${isActive('/about')} ${linkClass}`}>Nosotros</Link>
        <Link to="/blog" className={`${isActive('/blog')} ${linkClass}`}>Blog</Link>
        
        {user ? (
          <div className="flex items-center gap-3 border-l border-slate-700 pl-4 ml-2">
            
            {/* Info Usuario */}
            <div className="text-right hidden lg:block">
                <p className="text-xs text-slate-400">Hola,</p>
                <p className="text-sm font-bold text-blue-400 leading-none">{user.name?.split(' ')[0]}</p>
            </div>
            
            {/* 👇 EL ÚNICO BOTÓN DE ADMIN (LIMPIO) */}
            {user.role === 'admin' && (
              <Link 
                to="/admin" 
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-xs uppercase tracking-wide shadow-lg shadow-blue-600/20 transition-all hover:scale-105"
              >
                 <FaChartPie /> Dashboard
              </Link>
            )}

            <button 
                onClick={logout} 
                className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition" 
                title="Cerrar Sesión"
            >
                <FaSignOutAlt />
            </button>
          </div>
        ) : (
          <div className="flex gap-3 ml-4">
            <Link to="/login" className="px-5 py-2 text-sm font-bold text-slate-300 hover:text-white transition">
                Entrar
            </Link>
            <Link to="/register" className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-full text-sm font-bold text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition transform hover:-translate-y-0.5">
                Empezar
            </Link>
          </div>
        )}
      </div>

      {/* --- BOTÓN MÓVIL --- */}
      <button className="md:hidden text-white text-2xl p-2" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* --- MENÚ MÓVIL DESPLEGABLE --- */}
      {isOpen && (
        <div className="absolute top-[70px] left-0 w-full md:hidden bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 shadow-2xl flex flex-col items-center py-8 gap-6 animate-fade-in-down z-40 h-screen">
             
             <Link to="/" className="text-xl font-medium text-slate-200 hover:text-blue-400" onClick={() => setIsOpen(false)}>Inicio</Link>
             <Link to="/projects" className="text-xl font-medium text-slate-200 hover:text-green-400" onClick={() => setIsOpen(false)}>Proyectos</Link>
             <Link to="/about" className="text-xl font-medium text-slate-200 hover:text-purple-400" onClick={() => setIsOpen(false)}>Nosotros</Link>
             <Link to="/blog" className="text-xl font-medium text-slate-200 hover:text-cyan-400" onClick={() => setIsOpen(false)}>Blog</Link>

             <div className="w-1/3 h-[1px] bg-slate-800 my-2"></div>

             {/* Sección Admin Móvil Limpia */}
             {user && user.role === 'admin' && (
                <Link 
                    to="/admin" 
                    onClick={() => setIsOpen(false)}
                    className="w-3/4 py-3 bg-blue-900/30 border border-blue-500/30 text-blue-400 rounded-xl flex items-center justify-center gap-2 font-bold"
                >
                    <FaChartPie /> Ir al Dashboard
                </Link>
             )}

             {/* Botones Auth Móvil */}
             {!user ? (
                 <div className="flex flex-col gap-4 w-3/4">
                    <Link to="/login" className="w-full text-center py-3 border border-slate-700 text-slate-300 rounded-xl font-bold" onClick={() => setIsOpen(false)}>Entrar</Link>
                    <Link to="/register" className="w-full text-center py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold" onClick={() => setIsOpen(false)}>Registrarse</Link>
                 </div>
             ) : (
                 <button 
                    onClick={() => { logout(); setIsOpen(false); }} 
                    className="flex items-center gap-2 text-red-400 font-bold border border-red-500/30 px-8 py-3 rounded-xl hover:bg-red-500 hover:text-white transition"
                 >
                    <FaSignOutAlt /> Cerrar Sesión
                 </button>
             )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;