import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { FaBars, FaTimes, FaUsers, FaConnectdevelop } from 'react-icons/fa'; // <--- Agregamos el ícono del logo

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Función para saber si el link está activo
  const isActive = (path) => location.pathname === path ? "text-white bg-white/10" : "text-gray-300 hover:text-white hover:bg-white/5";
  const linkClass = "px-3 py-2 rounded-lg transition font-medium text-sm";

  return (
    <nav className="fixed w-full px-6 py-3 flex justify-between items-center z-50 glass border-b border-cyan-500/10 backdrop-blur-xl bg-slate-950/50">
      
      {/* --- LOGO TIPO MARCA DE AGENCIA --- */}
      <Link to="/" className="flex items-center gap-3 group">
        {/* 1. El Ícono (Isotipo) */}
        <div className="w-10 h-10 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg flex items-center justify-center border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] group-hover:border-blue-400 transition-all duration-300 transform group-hover:rotate-180">
            <FaConnectdevelop className="text-2xl text-blue-400 group-hover:text-white transition-colors duration-300" />
        </div>
        
        {/* 2. El Texto (Logotipo) */}
        <div className="flex flex-col leading-none">
            <span className="text-lg font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-white group-hover:to-blue-400 transition-all">
                NEXORA
            </span>
            <span className="text-[10px] font-bold text-slate-400 tracking-[0.3em] group-hover:text-white transition-colors">
                TECH
            </span>
        </div>
      </Link>
      
      {/* Menú Escritorio */}
      <div className="hidden md:flex items-center gap-2">
        <Link to="/" className={`${isActive('/')} ${linkClass}`}>Inicio</Link>
        <Link to="/about" className={`${isActive('/about')} ${linkClass}`}>Nosotros</Link>
        <Link to="/blog" className={`${isActive('/blog')} ${linkClass}`}>Blog</Link>

        {user ? (
          <div className="flex items-center gap-3 border-l border-slate-700 pl-4 ml-2">
            <div className="text-right hidden lg:block">
                <p className="text-xs text-slate-400">Hola,</p>
                <p className="text-sm font-bold text-blue-400 leading-none">{user.name}</p>
            </div>
            
            {user.role === 'admin' && (
              <div className="flex gap-2">
                <Link to="/admin/users" className="p-2 bg-slate-800 hover:bg-blue-600 border border-slate-700 hover:border-blue-500 rounded text-white transition" title="Usuarios">
                    <FaUsers />
                </Link>
                <Link to="/admin/new" className="px-3 py-2 bg-green-600/20 text-green-400 border border-green-500/30 hover:bg-green-600 hover:text-white rounded text-xs font-bold transition">
                    + Proy
                </Link>
                <Link to="/admin/blog/new" className="px-3 py-2 bg-purple-600/20 text-purple-400 border border-purple-500/30 hover:bg-purple-600 hover:text-white rounded text-xs font-bold transition">
                    + Blog
                </Link>
                <Link to="/admin/messages" className="p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded text-white transition">
                    📩
                </Link>
              </div>
            )}
            <button onClick={logout} className="px-4 py-2 text-xs font-bold border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white rounded transition ml-2">
                Salir
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

      {/* Menú Móvil (Hamburguesa) */}
      <button className="md:hidden text-white text-2xl" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Desplegable Móvil */}
      {isOpen && (
        <div className="absolute top-[70px] left-0 w-full glass flex flex-col items-center py-6 gap-4 md:hidden border-b border-slate-700 animate-fade-in-down shadow-2xl">
             <Link to="/" className="text-lg font-medium" onClick={() => setIsOpen(false)}>Inicio</Link>
             <Link to="/about" className="text-lg font-medium" onClick={() => setIsOpen(false)}>Nosotros</Link>
             <Link to="/blog" className="text-lg font-medium" onClick={() => setIsOpen(false)}>Blog</Link>
             {!user && (
                 <div className="flex flex-col gap-4 mt-4 w-full px-10">
                    <Link to="/login" className="w-full text-center py-3 border border-slate-600 rounded-xl" onClick={() => setIsOpen(false)}>Entrar</Link>
                    <Link to="/register" className="w-full text-center py-3 bg-blue-600 rounded-xl font-bold" onClick={() => setIsOpen(false)}>Registro</Link>
                 </div>
             )}
             {user && <button onClick={logout} className="text-red-400 mt-4">Cerrar Sesión</button>}
        </div>
      )}
    </nav>
  );
};

export default Navbar;