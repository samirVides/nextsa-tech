import { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes, FaPaperPlane, FaWhatsapp, FaCode, FaProjectDiagram, FaBug } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

const AiAssistant = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 1. DECLARAR TODOS LOS HOOKS PRIMERO
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "¡Hola! Soy NEX 🤖, el asistente virtual de NextSa Tech. ¿En qué puedo ayudarte hoy?", 
      sender: 'bot' 
    }
  ]);

  const options = [
    { id: 'services', label: '🚀 ¿Qué servicios ofrecen?', icon: <FaCode /> },
    { id: 'portfolio', label: '📂 Ver Proyectos', icon: <FaProjectDiagram /> },
    { id: 'price', label: '💰 Quiero una cotización', icon: <FaPaperPlane /> },
    { id: 'contact', label: '📞 Hablar con un humano', icon: <FaWhatsapp /> },

  ];

  // Este useEffect es un Hook, TIENE que estar antes de cualquier return
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, isOpen]);

  // ============================================================
  // 👇 AQUÍ ES EL LUGAR CORRECTO PARA EL 'RETURN NULL'
  // (Después de todos los hooks, pero antes de las funciones)
  // ============================================================
  const hiddenRoutes = ['/login', '/register', '/forgot-password'];
  if (hiddenRoutes.includes(location.pathname) || location.pathname.startsWith('/verify-email')) {
    return null; 
  }
  // ============================================================

  const handleOptionClick = (option) => {
    const userMsg = { id: Date.now(), text: option.label, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = "";
      let action = null;

      switch(option.id) {
        case 'services':
          botResponse = "Desarrollamos soluciones a medida: Sitios Web, Apps Móviles, E-commerce, Sistemas de Gestión, Software a medida. Nos enfocamos en escalabilidad y diseño personalizado.";
          break;
        case 'portfolio':
          botResponse = "¡Excelente elección! Te llevaré a nuestra galería de proyectos destacados.";
          action = () => navigate('/projects');
          break;
        case 'price':
          botResponse = "Cada proyecto es único. Para darte un precio exacto, necesito conocer tu idea. ¿Te parece si lo hablamos por WhatsApp?";
          action = () => window.open('https://wa.me/573137163216?text=Hola,%20quiero%20cotizar%20un%20proyecto.', '_blank');
          break;
        case 'contact':
          botResponse = "Entendido. Te conectaré directamente con nuestro Ingeniero Principal.";
          action = () => window.open('https://wa.me/573137163216', '_blank');
          break;

        default:
          botResponse = "No entendí esa orden.";
      }

      const botMsg = { id: Date.now() + 1, text: botResponse, sender: 'bot' };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);

      if (action) {
        setTimeout(action, 1500);
      }

    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[350px] md:w-[400px] bg-slate-900/95 backdrop-blur-xl border border-blue-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-fade-in-up origin-bottom-right">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-900 to-slate-900 p-4 border-b border-slate-700 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center relative">
                    <FaRobot className="text-white text-xl" />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></span>
                </div>
                <div>
                    <h3 className="font-bold text-white">NEX Assistant</h3>
                    <p className="text-xs text-blue-300">En línea ahora</p>
                </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition">
                <FaTimes />
            </button>
          </div>

          {/* Chat Body */}
          <div className="h-[350px] overflow-y-auto p-4 space-y-4 bg-slate-950/50 scrollbar-thin scrollbar-thumb-slate-700">
             {messages.map((msg) => (
               <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                 <div className={`
                    max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm
                    ${msg.sender === 'user' 
                        ? 'bg-blue-600 text-white rounded-br-none' 
                        : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'}
                 `}>
                    {msg.text}
                 </div>
               </div>
             ))}

             {isTyping && (
               <div className="flex justify-start">
                 <div className="bg-slate-800 border border-slate-700 p-3 rounded-2xl rounded-bl-none flex gap-1 items-center">
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-200"></div>
                 </div>
               </div>
             )}
             <div ref={messagesEndRef} />
          </div>

          {/* Options */}
          <div className="p-4 bg-slate-900 border-t border-slate-800">
             <p className="text-xs text-slate-500 mb-3 text-center">Selecciona una opción:</p>
             <div className="grid grid-cols-1 gap-2 max-h-[150px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-700">
                {options.map((opt) => (
                    <button 
                        key={opt.id} 
                        onClick={() => handleOptionClick(opt)}
                        disabled={isTyping}
                        className="w-full text-left px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-sm text-slate-200 hover:text-blue-400 transition flex items-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span className="text-slate-500 group-hover:text-blue-500 transition">{opt.icon}</span>
                        {opt.label}
                    </button>
                ))}
             </div>
          </div>

        </div>
      )}

      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`
            w-16 h-16 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)] 
            flex items-center justify-center text-2xl transition-all duration-300
            ${isOpen ? 'bg-slate-800 text-white rotate-90' : 'bg-blue-600 text-white hover:scale-110 hover:bg-blue-500'}
        `}
      >
        {isOpen ? <FaTimes /> : <FaRobot />}
        
        {!isOpen && (
            <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-slate-950 animate-ping"></span>
        )}
        {!isOpen && (
            <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-slate-950"></span>
        )}
      </button>

    </div>
  );
};

export default AiAssistant;