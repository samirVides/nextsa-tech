import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import { FaShieldAlt, FaLock, FaUserSecret } from 'react-icons/fa';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-blue-500 selection:text-white">
      <Seo title="Política de Privacidad" description="Cómo protegemos tus datos en NextSa Tech" />
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-24">
        
        {/* HEADER */}
        <div className="mb-16 border-b border-slate-800 pb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                <FaShieldAlt /> Legal & Transparencia
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                Política de Privacidad
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed">
                En <strong>NextSa Tech</strong>, la privacidad no es una opción, es un derecho fundamental. 
                Esta política detalla cómo recopilamos, usamos y protegemos tu información personal.
            </p>
            <p className="text-sm text-slate-500 mt-4 font-mono">
                Última actualización: Enero 2026
            </p>
        </div>

        {/* CONTENIDO LEGAL */}
        <div className="space-y-12">
            
            <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    1. Información que Recopilamos
                </h2>
                <p className="mb-4">Recopilamos información para brindarte una mejor experiencia y mejorar nuestros servicios:</p>
                <ul className="list-disc pl-6 space-y-2 text-slate-400 marker:text-blue-500">
                    <li><strong>Datos de Identificación:</strong> Nombre, correo electrónico, número de teléfono (cuando te registras o nos contactas).</li>
                    <li><strong>Datos Técnicos:</strong> Dirección IP, tipo de navegador y dispositivo (para optimizar nuestra plataforma).</li>
                    <li><strong>Datos de Uso:</strong> Interacciones con nuestro blog, proyectos visitados y preferencias.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    2. Uso de la Información
                </h2>
                <p className="mb-4">Utilizamos tus datos estrictamente para:</p>
                <ul className="list-disc pl-6 space-y-2 text-slate-400 marker:text-blue-500">
                    <li>Proveer y mantener nuestros servicios de desarrollo y consultoría.</li>
                    <li>Notificarte sobre cambios en nuestros servicios.</li>
                    <li>Proveer soporte al cliente y técnico.</li>
                    <li>Detectar, prevenir y abordar problemas técnicos.</li>
                </ul>
            </section>

            <section className="bg-blue-900/10 border border-blue-500/20 p-6 rounded-2xl">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                    3. Newsletter y Comunicaciones Comerciales
                </h2>
                <p className="mb-4 text-sm">
                    Al marcar la casilla <em>"He leído y acepto los Términos y Condiciones y autorizo el envío de novedades"</em> en nuestros formularios de registro o suscripción:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-400 text-sm marker:text-blue-500">
                    <li>Nos autorizas expresamente a enviarte correos electrónicos sobre nuevos servicios, artículos de nuestro blog, ofertas especiales y actualizaciones de la empresa.</li>
                    <li>Utilizamos tu correo electrónico como medio principal de comunicación.</li>
                    <li><strong>Derecho a Desistir:</strong> Puedes optar por no recibir estas comunicaciones en cualquier momento haciendo clic en el enlace "Darse de baja" (Unsubscribe) al final de cualquier correo, o contactándonos directamente.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    4. Protección de Datos (Seguridad)
                </h2>
                <p>
                    La seguridad de tus datos es importante para nosotros. Implementamos medidas de seguridad de nivel industrial (como encriptación SSL y hashing de contraseñas) para proteger tu información personal contra acceso no autorizado, alteración, divulgación o destrucción. Sin embargo, recuerda que ningún método de transmisión por Internet es 100% seguro.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    5. Tus Derechos (Habeas Data)
                </h2>
                <p className="mb-4">Como usuario, tienes derecho a:</p>
                <ul className="list-disc pl-6 space-y-2 text-slate-400 marker:text-blue-500">
                    <li>Acceder a los datos personales que tenemos sobre ti.</li>
                    <li>Solicitar la corrección de datos inexactos.</li>
                    <li>Solicitar la eliminación de tus datos (Derecho al Olvido), salvo que exista una obligación legal de conservarlos.</li>
                    <li>Retirar tu consentimiento para el marketing en cualquier momento.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    6. Contacto
                </h2>
                <p>
                    Si tienes preguntas sobre esta Política de Privacidad, por favor contáctanos:
                </p>
                <div className="mt-4 p-4 bg-slate-900 rounded-xl inline-block border border-slate-800">
                    <p className="text-white font-bold">NextSa Tech Agency</p>
                    <p className="text-slate-400">Email: contacto@nexora.tech</p>
                    <p className="text-slate-400">Teléfono: +57 313 716 3216</p>
                </div>
            </section>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;