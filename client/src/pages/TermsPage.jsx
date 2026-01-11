import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import { FaGavel, FaHandshake, FaCopyright } from 'react-icons/fa';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-purple-500 selection:text-white">
      <Seo title="Términos y Condiciones" description="Acuerdo legal de uso de servicios NextSa Tech" />
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-24">
        
        {/* HEADER */}
        <div className="mb-16 border-b border-slate-800 pb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-widest mb-6">
                <FaGavel /> Términos Legales
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                Términos y Condiciones
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed">
                Por favor, lee detenidamente estos términos antes de utilizar nuestros servicios. 
                Al acceder a <strong>NextSa Tech</strong>, aceptas estar vinculado por estas condiciones.
            </p>
            <p className="text-sm text-slate-500 mt-4 font-mono">
                Última actualización: Enero 2026
            </p>
        </div>

        {/* CONTENIDO LEGAL */}
        <div className="space-y-12">
            
            <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. Aceptación de los Términos</h2>
                <p>
                    Al acceder y utilizar este sitio web y nuestros servicios de desarrollo de software, aceptas cumplir y estar sujeto a estos Términos y Condiciones. Si no estás de acuerdo con alguna parte de estos términos, no podrás acceder al servicio.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. Descripción del Servicio</h2>
                <p className="mb-4">
                    NextSa Tech es una agencia de desarrollo de software que provee servicios de:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-400 marker:text-purple-500">
                    <li>Desarrollo de sitios y aplicaciones web.</li>
                    <li>Desarrollo de aplicaciones móviles.</li>
                    <li>Consultoría tecnológica y transformación digital.</li>
                    <li>Soporte y mantenimiento de software.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <FaCopyright className="text-purple-500"/> 3. Propiedad Intelectual
                </h2>
                <p className="mb-4">
                    <strong>Contenido del Sitio:</strong> Todo el contenido, características y funcionalidad (incluyendo pero no limitado a información, software, texto, gráficos, logos e íconos) son propiedad exclusiva de NextSa Tech.
                </p>
                <p>
                    <strong>Desarrollos para Clientes:</strong> La propiedad intelectual de los proyectos desarrollados para clientes será transferida al cliente una vez se haya completado el pago total de los servicios acordados, salvo que se estipule lo contrario en un contrato de servicio específico.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. Obligaciones del Usuario</h2>
                <p className="mb-4">Al usar nuestra plataforma o contratar servicios, te comprometes a:</p>
                <ul className="list-disc pl-6 space-y-2 text-slate-400 marker:text-purple-500">
                    <li>Proporcionar información veraz y actualizada.</li>
                    <li>No utilizar el servicio para fines ilícitos o no autorizados.</li>
                    <li>No intentar vulnerar la seguridad de la plataforma o realizar ingeniería inversa.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Pagos y Cancelaciones</h2>
                <p>
                    Los términos específicos de pago, hitos de entrega y políticas de cancelación para proyectos de desarrollo se detallarán en el contrato de prestación de servicios individual firmado con cada cliente. Para servicios de suscripción (si aplica), la facturación se realizará por adelantado.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Limitación de Responsabilidad</h2>
                <p>
                    En ningún caso NextSa Tech, ni sus directores, empleados o afiliados, serán responsables por daños indirectos, incidentales, especiales, consecuentes o punitivos, incluyendo sin limitación, pérdida de beneficios, datos, uso, fondo de comercio u otras pérdidas intangibles, resultantes de tu acceso o uso de nuestros servicios.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <FaHandshake className="text-purple-500"/> 7. Legislación Aplicable
                </h2>
                <p>
                    Estos Términos se regirán e interpretarán de acuerdo con las leyes de la <strong>República de Colombia</strong>, sin tener en cuenta sus disposiciones sobre conflictos de leyes. Cualquier disputa legal se resolverá en los tribunales competentes de Colombia.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4">8. Cambios en los Términos</h2>
                <p>
                    Nos reservamos el derecho, a nuestra sola discreción, de modificar o reemplazar estos Términos en cualquier momento. Es responsabilidad del usuario revisar periódicamente esta página.
                </p>
            </section>

        </div>
      </div>

    </div>
  );
};

export default TermsPage;