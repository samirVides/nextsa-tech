import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const faqs = [
  {
    question: "¿Cuánto tiempo tarda en desarrollarse una página web?",
    answer: "Depende de la complejidad. Una Landing Page puede estar lista en 5-7 días, mientras que un sistema completo o e-commerce puede tomar de 3 a 6 semanas."
  },
  {
    question: "¿Incluyen el dominio y hosting?",
    answer: "Podemos asesorarte en la compra o gestionarlo por ti. Trabajamos con los mejores proveedores para asegurar velocidad y seguridad."
  },
  {
    question: "¿El software es compatible con celulares?",
    answer: "¡Absolutamente! Todo lo que desarrollamos en Nexora Tech es 'Mobile First', garantizando que se vea perfecto en cualquier dispositivo."
  },
  {
    question: "¿Ofrecen soporte después de la entrega?",
    answer: "Sí, todos nuestros proyectos incluyen 1 mes de soporte gratuito para asegurar que todo funcione correctamente. También tenemos planes de mantenimiento."
  }
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-20 px-6 z-10 max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
        Preguntas Frecuentes
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="glass rounded-xl overflow-hidden border border-slate-700">
            <button 
              className="w-full flex justify-between items-center p-6 text-left hover:bg-white/5 transition"
              onClick={() => toggleFaq(index)}
            >
              <span className="font-bold text-slate-200">{faq.question}</span>
              {openIndex === index ? <FaChevronUp className="text-blue-400" /> : <FaChevronDown className="text-slate-500" />}
            </button>
            
            <div 
              className={`px-6 text-slate-400 text-sm overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-40 pb-6' : 'max-h-0'}`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;