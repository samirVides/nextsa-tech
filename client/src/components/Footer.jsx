import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    FaFacebookF, FaInstagram, FaTiktok, FaLinkedinIn, 
    FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaConnectdevelop, FaPaperPlane, FaCheck 
} from 'react-icons/fa';
import api from '../api';
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // --- LÓGICA DEL NEWSLETTER ---
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success

  const handleSubscribe = async (e) => { // Hacerla async
        e.preventDefault();
        if(!email) return;
        setStatus('loading');
        
        try {
            // Llamada REAL al backend
            await api.post('/api/newsletter', { email });
            setStatus('success');
            setEmail('');
            setTimeout(() => setStatus('idle'), 3000);
        } catch (error) {
            console.error(error);
            // Opcional: Manejar error visualmente
            setStatus('idle'); 
            alert(error.response?.data?.message || 'Error al suscribirse');
        }
    };
  // -----------------------------

  return (
    <footer className="relative bg-slate-950 pt-16 pb-8 border-t border-slate-800 overflow-hidden font-sans text-slate-400">
        
        {/* Efecto de luz ambiental (Sutil) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
        <div className="absolute -top-[100px] left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-blue-600/5 blur-[80px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 relative z-10">
            
            {/* COLUMNA 1: MARCA Y REDES */}
            <div className="space-y-6">
                <Link to="/" className="flex items-center gap-3 group w-fit">
                    <div className="w-10 h-10 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg flex items-center justify-center border border-blue-500/30 group-hover:border-blue-400 transition-all">
                        <FaConnectdevelop className="text-2xl text-blue-400 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="text-xl font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-white">
                            NEXTSA
                        </span>
                        <span className="text-[10px] font-bold text-slate-500 tracking-[0.3em]">
                            TECH AGENCY
                        </span>
                    </div>
                </Link>
                <p className="text-sm leading-relaxed text-slate-500">
                    Transformamos el futuro digital. Desarrollo de software de alto impacto para empresas que buscan escalar.
                </p>
                <div className="flex gap-3">
                    <SocialLink icon={<FaFacebookF />} href="https://www.facebook.com/share/1BqjHqE48s/" color="hover:text-blue-500" />
                    <SocialLink icon={<FaInstagram />} href="https://www.instagram.com/nextsatech/" color="hover:text-pink-500" />
                    <SocialLink icon={<FaLinkedinIn />} href="#" color="hover:text-blue-400" />
                    <SocialLink icon={<FaTiktok />} href="https://www.tiktok.com/@nextsatech" color="hover:text-white" />
                </div>
            </div>

            {/* COLUMNA 2: ENLACES RÁPIDOS (Fusionamos Servicios y Compañía para ahorrar espacio) */}
            <div>
                <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
                    Navegación
                </h4>
                <ul className="space-y-3 text-sm">
                    <FooterLink to="/projects" text="Portafolio & Casos de Éxito" />
                    <FooterLink to="/services" text="Servicios de Desarrollo" />
                    <FooterLink to="/about" text="Sobre NextSa Tech" />
                    <FooterLink to="/blog" text="Blog & Noticias" />
                    <FooterLink to="/contacto" text="Cotizar Proyecto" />
                </ul>
            </div>

            {/* COLUMNA 3: CONTACTO */}
            <div>
                <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
                    Contacto
                </h4>
                <ul className="space-y-4 text-sm">
                    <li className="flex items-start gap-3">
                        <FaMapMarkerAlt className="text-blue-500 mt-1 shrink-0" />
                        <span>Santa Marta, Colombia<br /><span className="text-xs text-slate-500">Operaciones Globales</span></span>
                    </li>
                    <li className="flex items-center gap-3">
                        <FaWhatsapp className="text-green-500 shrink-0" />
                        <a href="https://wa.me/573137163216" target="_blank" rel="noreferrer" className="hover:text-white transition">+57 313 716 3216</a>
                    </li>
                    <li className="flex items-center gap-3">
                        <FaEnvelope className="text-purple-500 shrink-0" />
                        <a href="mailto:nextsatech@gmail.com" className="hover:text-white transition">contacto@nexora.tech</a>
                    </li>
                </ul>
            </div>

            {/* COLUMNA 4: NEWSLETTER (INTEGRADO Y MODERADO) */}
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-2">
                    Mantente al día
                </h4>
                <p className="text-xs text-slate-500 mb-4">
                    Recibe tendencias tech y ofertas exclusivas. Sin spam.
                </p>
                
                <form onSubmit={handleSubscribe} className="relative">
                    <input 
                        type="email" 
                        placeholder="tu@correo.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={status === 'success' || status === 'loading'}
                        className="w-full bg-slate-950 border border-slate-700 text-white text-sm rounded-lg py-3 pl-3 pr-10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition disabled:opacity-50"
                    />
                    
                    <button 
                        type="submit"
                        disabled={status === 'success' || status === 'loading'}
                        className={`absolute right-1 top-1 bottom-1 px-3 rounded-md flex items-center justify-center transition-all
                            ${status === 'success' 
                                ? 'bg-green-500 text-white' 
                                : 'bg-blue-600 hover:bg-blue-500 text-white'}
                        `}
                    >
                        {status === 'loading' ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : status === 'success' ? (
                            <FaCheck size={14} />
                        ) : (
                            <FaPaperPlane size={14} />
                        )}
                    </button>
                </form>
                {status === 'success' && (
                    <p className="text-green-400 text-xs mt-2 font-bold animate-fade-in">¡Suscrito correctamente!</p>
                )}
            </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-slate-900 pt-8 mt-4 text-center text-xs text-slate-600">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <p>© {currentYear} NextSa Tech. Todos los derechos reservados.</p>
                <div className="flex gap-6">
                    <Link to="/privacidad" className="hover:text-slate-400 transition">Política de Privacidad</Link>
                    <Link to="/terminos" className="hover:text-slate-400 transition">Términos y Condiciones</Link>
                </div>
            </div>
        </div>
    </footer>
  );
};

// Componentes auxiliares (igual que antes)
const SocialLink = ({ icon, href, color }) => (
    <a href={href} target="_blank" rel="noreferrer" className={`w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800 transition-all hover:scale-110 hover:border-slate-600 text-slate-400 ${color}`}>
        {icon}
    </a>
);

const FooterLink = ({ to, text }) => (
    <li>
        <Link to={to} className="text-slate-400 hover:text-blue-400 hover:translate-x-1 transition-all inline-block">
            {text}
        </Link>
    </li>
);

export default Footer;