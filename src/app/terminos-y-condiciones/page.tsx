import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Términos y Condiciones - WiFi Comunidad",
  description: "Términos y condiciones del servicio WiFi comunitario de Lomas de Zamora",
};

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Términos y Condiciones
        </h1>

        <div className="prose prose-gray max-w-none space-y-4 text-sm text-gray-700">
          <section>
            <h2 className="text-lg font-semibold text-gray-900">1. Aceptación del Servicio</h2>
            <p>
              Al utilizar el servicio de WiFi comunitario &quot;Comunidad WiFi&quot; proporcionado por el
              Municipio de Lomas de Zamora, usted acepta los presentes Términos y Condiciones. Si no
              está de acuerdo con alguno de estos términos, no deberá utilizar el servicio.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">2. Descripción del Servicio</h2>
            <p>
              El servicio de WiFi comunitario brinda acceso gratuito a Internet en espacios públicos
              del Municipio de Lomas de Zamora. El servicio se ofrece &quot;tal cual&quot; y &quot;según
              disponibilidad&quot;, sin garantías de velocidad, disponibilidad continua ni calidad de
              conexión.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">3. Registro de Datos Personales</h2>
            <p>
              Para acceder al servicio, el usuario deberá completar un formulario de registro con los
              siguientes datos: nombre, apellido, documento de identidad, número de celular, y
              opcionalmente correo electrónico. Estos datos son tratados de acuerdo con la Ley N°
              25.326 de Protección de Datos Personales.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">4. Uso Aceptable</h2>
            <p>El usuario se compromete a utilizar el servicio de manera responsable y legal. Queda prohibido:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Utilizar el servicio para actividades ilícitas o que vulneren derechos de terceros.</li>
              <li>Acceder, interceptar o modificar comunicaciones de otros usuarios.</li>
              <li>Introducir virus, malware o cualquier elemento que pueda dañar la red.</li>
              <li>Utilizar el servicio para enviar publicidad no solicitada (spam).</li>
              <li>Realizar descargas masivas que puedan afectar la calidad del servicio para otros usuarios.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">5. Privacidad y Protección de Datos</h2>
            <p>
              Los datos personales recopilados son utilizados exclusivamente para la gestión del
              servicio de WiFi comunitario y fines estadísticos anónimos para mejorar el servicio. El
              Municipio de Lomas de Zamora no compartirá datos personales con terceros, salvo
              requerimiento judicial conforme a la legislación vigente.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">6. Limitación de Responsabilidad</h2>
            <p>
              El Municipio de Lomas de Zamora no será responsable por: interrupciones del servicio,
              pérdidas de datos, daños derivados del uso o imposibilidad de uso del servicio, acciones
              de terceros en la red, ni por el contenido de sitios web de terceros accesibles a través
              del servicio.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">7. Duración de la Sesión</h2>
            <p>
              Cada sesión de WiFi tiene una duración limitada, la cual podrá ser configurada por el
              administrador del servicio. Una vez finalizado el tiempo de sesión, el usuario deberá
              registrarse nuevamente para continuar navegando.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">8. Modificaciones</h2>
            <p>
              El Municipio de Lomas de Zamora se reserva el derecho de modificar estos Términos y
              Condiciones en cualquier momento. Las modificaciones entrarán en vigencia a partir de su
              publicación en este sitio.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">9. Jurisdicción</h2>
            <p>
              Para cualquier controversia derivada del uso del servicio, se aplicará la legislación de
              la República Argentina, con competencia en los tribunales del Partido de Lomas de Zamora,
              Provincia de Buenos Aires.
            </p>
          </section>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <Link
            href="javascript:history.back()"
            className="inline-block py-2 px-6 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover transition-colors"
          >
            Volver al formulario
          </Link>
        </div>
      </div>
    </div>
  );
}