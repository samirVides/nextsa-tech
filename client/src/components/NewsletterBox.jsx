import { useState } from 'react';
import { FaPaperPlane, FaEnvelopeOpenText, FaCheck } from 'react-icons/fa';
import api from '../api';

const NewsletterBox = () => {
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

    return (
        <div className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8 my-8 group hover:border-blue-500/30 transition-all duration-500">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                
                {/* 1. ÍCONO (Sutil y elegante) */}
                <div className="shrink-0 w-14 h-14 bg-slate-950 rounded-full flex items-center justify-center border border-slate-800 group-hover:border-blue-500/30 group-hover:text-blue-400 text-slate-400 transition-all shadow-lg">
                    <FaEnvelopeOpenText className="text-xl" />
                </div>

                {/* 2. TEXTO (Limpio) */}
                <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl font-bold text-white mb-2">
                        Suscríbete al Newsletter
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Recibe tutoriales y noticias tech. Cero spam, solo valor.
                    </p>
                </div>

                {/* 3. INPUT (Compacto con botón adentro) */}
                <div className="w-full md:w-auto md:min-w-[320px]">
                    <form onSubmit={handleSubscribe} className="relative">
                        <input 
                            type="email" 
                            placeholder="tu@correo.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={status === 'success' || status === 'loading'}
                            className="w-full bg-slate-950 border border-slate-700 text-white text-sm rounded-xl py-4 pl-5 pr-14 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition disabled:opacity-50 shadow-inner"
                        />
                        
                        <button 
                            type="submit"
                            disabled={status === 'success' || status === 'loading'}
                            className={`absolute right-2 top-2 bottom-2 w-10 rounded-lg flex items-center justify-center transition-all
                                ${status === 'success' 
                                    ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]' 
                                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]'}
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
                        <p className="text-green-400 text-xs mt-3 font-bold text-center md:text-left animate-fade-in pl-2">
                            ¡Gracias por suscribirte! 🚀
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NewsletterBox;