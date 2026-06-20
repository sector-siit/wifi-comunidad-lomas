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
    <div className="min-h-screen flex flex-col bg-white">
      <header className="w-full h-[104px] bg-[#236999] flex items-center justify-center px-2">
        <span className="text-white font-bold text-lg">WiFi Comunidad</span>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-8 max-w-[432px] mx-auto w-full">
        <svg
          className="mb-6"
          width="70"
          height="70"
          viewBox="0 0 70 70"
          fill="none"
        >
          <path
            d="M14 38L28 52L56 18"
            stroke="#2ABB5B"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <h1
          className="text-center text-[#236999] mb-4"
          style={{
            fontFamily: "Geometria",
            fontWeight: 700,
            fontSize: "40px",
            lineHeight: "45px",
          }}
        >
          Listo, ya podes navegar
        </h1>

        <p
          className="text-center text-[#3D3D3D] max-w-lg mx-auto px-6 mb-8"
          style={{
            fontFamily: "Geometria",
            fontWeight: 700,
            fontSize: "24px",
            lineHeight: "100%",
          }}
        >
          Parques y plazas conectadas es un programa del Gobierno de la Comunidad
          para que los vecinos y vecinas puedan disfrutar de los espacios al aire
          libre y estar conectados a una red de Wifi gratuita.
        </p>

        <a
          href={redirectUrl}
          className="inline-block w-full max-w-full h-12 px-4 bg-[#236999] text-white font-bold rounded hover:bg-[#1F5A85] focus:outline-none focus:ring-1 focus:ring-[#236999] focus:ring-offset-2 transition-colors flex items-center justify-center"
        >
          Continuar navegando
        </a>

        <p className="mt-4 text-sm text-[#3D3D3D]">
          Seras redirigido automaticamente en 5 segundos...
        </p>
      </main>

      <footer className="w-full h-[91px] bg-[#236999] flex items-center justify-center px-4">
        <span className="text-white text-sm opacity-60">Aca va el logo</span>
      </footer>

      <script
        dangerouslySetInnerHTML={{
          __html: `setTimeout(function(){ window.location.href = ${JSON.stringify(redirectUrl)}; }, 5000);`,
        }}
      />
    </div>
  );
}
