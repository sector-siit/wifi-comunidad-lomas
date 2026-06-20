import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terminos y Condiciones - WiFi Comunidad",
  description: "Terminos y condiciones del servicio WiFi comunitario de Lomas de Zamora",
};

export default async function TerminosPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="w-full h-[104px] bg-[#236999] flex items-center justify-center px-2">
        <span className="text-white font-bold text-lg">WiFi Comunidad</span>
      </header>

      <main className="flex-1 px-6 py-6 max-w-[432px] mx-auto w-full">
        <Link
          href={from || "/"}
          className="inline-flex items-center gap-1 text-[#236999] font-bold text-base hover:text-[#1F5A85] transition-colors mb-[24px]"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 3L5 8L10 13" />
          </svg>
          Atras
        </Link>

        <h1
          className="text-center text-[#236999] mb-[38px]"
          style={{
            fontFamily: "Geometria",
            fontWeight: 700,
            fontSize: "24px",
            lineHeight: "100%",
          }}
        >
          Terminos y Condiciones
        </h1>

        <div className="space-y-4">
          <section>
            <h2
              className="text-[#236999]"
              style={{
                fontFamily: "Geometria",
                fontWeight: 700,
                fontSize: "24px",
                lineHeight: "100%",
              }}
            >
              1. Aceptacion del Servicio
            </h2>
            <p
              className="text-[#3D3D3D]"
              style={{
                fontFamily: "Geometria",
                fontWeight: 400,
                fontSize: "18px",
                lineHeight: "100%",
              }}
            >
              Al utilizar el servicio de WiFi comunitario &quot;Comunidad WiFi&quot; proporcionado por el
              Municipio de Lomas de Zamora, usted acepta los presentes Terminos y Condiciones. Si no
              esta de acuerdo con alguno de estos terminos, no debera utilizar el servicio.
            </p>
          </section>

          <section>
            <h2
              className="text-[#236999]"
              style={{
                fontFamily: "Geometria",
                fontWeight: 700,
                fontSize: "24px",
                lineHeight: "100%",
              }}
            >
              2. Descripcion del Servicio
            </h2>
            <p
              className="text-[#3D3D3D]"
              style={{
                fontFamily: "Geometria",
                fontWeight: 400,
                fontSize: "18px",
                lineHeight: "100%",
              }}
            >
              El servicio de WiFi comunitario brinda acceso gratuito a Internet en espacios publicos
              del Municipio de Lomas de Zamora. El servicio se ofrece &quot;tal cual&quot; y &quot;segun
              disponibilidad&quot;, sin garantias de velocidad, disponibilidad continua ni calidad de
              conexion.
            </p>
          </section>

          <section>
            <h2
              className="text-[#236999]"
              style={{
                fontFamily: "Geometria",
                fontWeight: 700,
                fontSize: "24px",
                lineHeight: "100%",
              }}
            >
              3. Registro de Datos Personales
            </h2>
            <p
              className="text-[#3D3D3D]"
              style={{
                fontFamily: "Geometria",
                fontWeight: 400,
                fontSize: "18px",
                lineHeight: "100%",
              }}
            >
              Para acceder al servicio, el usuario debera completar un formulario de registro con los
              siguientes datos: nombre, apellido, documento de identidad, numero de celular, y
              opcionalmente correo electronico. Estos datos son tratados de acuerdo con la Ley N°
              25.326 de Proteccion de Datos Personales.
            </p>
          </section>

          <section>
            <h2
              className="text-[#236999]"
              style={{
                fontFamily: "Geometria",
                fontWeight: 700,
                fontSize: "24px",
                lineHeight: "100%",
              }}
            >
              4. Uso Aceptable
            </h2>
            <p
              className="text-[#3D3D3D]"
              style={{
                fontFamily: "Geometria",
                fontWeight: 400,
                fontSize: "18px",
                lineHeight: "100%",
              }}
            >
              El usuario se compromete a utilizar el servicio de manera responsable y legal. Queda prohibido:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-1">
              <li
                className="text-[#3D3D3D]"
                style={{
                  fontFamily: "Geometria",
                  fontWeight: 400,
                  fontSize: "18px",
                  lineHeight: "100%",
                }}
              >
                Utilizar el servicio para actividades ilicitas o que vulneren derechos de terceros.
              </li>
              <li
                className="text-[#3D3D3D]"
                style={{
                  fontFamily: "Geometria",
                  fontWeight: 400,
                  fontSize: "18px",
                  lineHeight: "100%",
                }}
              >
                Acceder, interceptar o modificar comunicaciones de otros usuarios.
              </li>
              <li
                className="text-[#3D3D3D]"
                style={{
                  fontFamily: "Geometria",
                  fontWeight: 400,
                  fontSize: "18px",
                  lineHeight: "100%",
                }}
              >
                Introducir virus, malware o cualquier elemento que pueda danar la red.
              </li>
              <li
                className="text-[#3D3D3D]"
                style={{
                  fontFamily: "Geometria",
                  fontWeight: 400,
                  fontSize: "18px",
                  lineHeight: "100%",
                }}
              >
                Utilizar el servicio para enviar publicidad no solicitada (spam).
              </li>
              <li
                className="text-[#3D3D3D]"
                style={{
                  fontFamily: "Geometria",
                  fontWeight: 400,
                  fontSize: "18px",
                  lineHeight: "100%",
                }}
              >
                Realizar descargas masivas que puedan afectar la calidad del servicio para otros usuarios.
              </li>
            </ul>
          </section>

          <section>
            <h2
              className="text-[#236999]"
              style={{
                fontFamily: "Geometria",
                fontWeight: 700,
                fontSize: "24px",
                lineHeight: "100%",
              }}
            >
              5. Privacidad y Proteccion de Datos
            </h2>
            <p
              className="text-[#3D3D3D]"
              style={{
                fontFamily: "Geometria",
                fontWeight: 400,
                fontSize: "18px",
                lineHeight: "100%",
              }}
            >
              Los datos personales recopilados son utilizados exclusivamente para la gestion del
              servicio de WiFi comunitario y fines estadisticos anonimos para mejorar el servicio. El
              Municipio de Lomas de Zamora no compartira datos personales con terceros, salvo
              requerimiento judicial conforme a la legislacion vigente.
            </p>
          </section>

          <section>
            <h2
              className="text-[#236999]"
              style={{
                fontFamily: "Geometria",
                fontWeight: 700,
                fontSize: "24px",
                lineHeight: "100%",
              }}
            >
              6. Limitacion de Responsabilidad
            </h2>
            <p
              className="text-[#3D3D3D]"
              style={{
                fontFamily: "Geometria",
                fontWeight: 400,
                fontSize: "18px",
                lineHeight: "100%",
              }}
            >
              El Municipio de Lomas de Zamora no sera responsable por: interrupciones del servicio,
              perdidas de datos, danos derivados del uso o imposibilidad de uso del servicio, acciones
              de terceros en la red, ni por el contenido de sitios web de terceros accesibles a traves
              del servicio.
            </p>
          </section>

          <section>
            <h2
              className="text-[#236999]"
              style={{
                fontFamily: "Geometria",
                fontWeight: 700,
                fontSize: "24px",
                lineHeight: "100%",
              }}
            >
              7. Duracion de la Sesion
            </h2>
            <p
              className="text-[#3D3D3D]"
              style={{
                fontFamily: "Geometria",
                fontWeight: 400,
                fontSize: "18px",
                lineHeight: "100%",
              }}
            >
              Cada sesion de WiFi tiene una duracion limitada, la cual podra ser configurada por el
              administrador del servicio. Una vez finalizado el tiempo de sesion, el usuario debera
              registrarse nuevamente para continuar navegando.
            </p>
          </section>

          <section>
            <h2
              className="text-[#236999]"
              style={{
                fontFamily: "Geometria",
                fontWeight: 700,
                fontSize: "24px",
                lineHeight: "100%",
              }}
            >
              8. Modificaciones
            </h2>
            <p
              className="text-[#3D3D3D]"
              style={{
                fontFamily: "Geometria",
                fontWeight: 400,
                fontSize: "18px",
                lineHeight: "100%",
              }}
            >
              El Municipio de Lomas de Zamora se reserva el derecho de modificar estos Terminos y
              Condiciones en cualquier momento. Las modificaciones entraran en vigencia a partir de su
              publicacion en este sitio.
            </p>
          </section>

          <section>
            <h2
              className="text-[#236999]"
              style={{
                fontFamily: "Geometria",
                fontWeight: 700,
                fontSize: "24px",
                lineHeight: "100%",
              }}
            >
              9. Jurisdiccion
            </h2>
            <p
              className="text-[#3D3D3D]"
              style={{
                fontFamily: "Geometria",
                fontWeight: 400,
                fontSize: "18px",
                lineHeight: "100%",
              }}
            >
              Para cualquier controversia derivada del uso del servicio, se aplicara la legislacion de
              la Republica Argentina, con competencia en los tribunales del Partido de Lomas de Zamora,
              Provincia de Buenos Aires.
            </p>
          </section>
        </div>
      </main>

      <footer className="w-full h-[91px] bg-[#236999] flex items-center justify-center px-4">
        <span className="text-white text-sm opacity-60">Aca va el logo</span>
      </footer>
    </div>
  );
}
