import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppBtn = () => {
  return (
    <a 
      href="https://wa.me/573137163216?text=Hola%20Nexora%20Tech,%20quiero%20cotizar%20un%20proyecto."
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.6)] hover:scale-110 hover:bg-green-400 transition duration-300 animate-bounce-slow"
      title="¡Chatea con nosotros!"
    >
      <FaWhatsapp className="text-3xl" />
    </a>
  );
};

export default WhatsAppBtn;