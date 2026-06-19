import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bienvenido - WiFi Comunidad",
  description: "Te conectaste exitosamente a la red WiFi comunitaria",
};

export default function BienvenidaPage({
  searchParams,
}: {
  searchParams: Promise<{ url?: string }>;
}) {
  return <BienvenidaContent searchParams={searchParams} />;
}

async function BienvenidaContent({
  searchParams,
}: {
  searchParams: Promise<{ url?: string }>;
}) {
  const { url } = await searchParams;
  const redirectUrl = url ?? "/";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          ¡Conexión exitosa!
        </h1>
        <p className="text-gray-500 mb-6">
          Ya estás conectado a la red WiFi comunitaria.
          Disfrutá de tu conexión a Internet.
        </p>

        <a
          href={redirectUrl}
          className="inline-block w-full py-3 px-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
        >
          Continuar navegando
        </a>

        <p className="mt-4 text-sm text-gray-400">
          Serás redirigido automáticamente en 5 segundos...
        </p>

        <script
          dangerouslySetInnerHTML={{
            __html: `setTimeout(function(){ window.location.href = ${JSON.stringify(redirectUrl)}; }, 5000);`,
          }}
        />
      </div>
    </div>
  );
}