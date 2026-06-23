import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import checkmarkIcon from "@/../public/images/checkmark.svg";

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
      <Header />

      <main className="flex-1 flex flex-col items-center px-6 py-10 max-w-form mx-auto w-full gap-field">
        <div className="flex flex-col items-center gap-1.5">
          <Image
            src={checkmarkIcon}
            alt=""
            width={72}
            height={71}
            className="shrink-0"
          />
          <h1 className="text-center text-primary font-bold text-title">
            Listo, ya podes navegar
          </h1>
        </div>

        <p className="text-center text-primary font-bold text-2xl max-w-lg">
          <strong>Parques y plazas conectadas</strong> es un programa del{" "}
          <strong>Gobierno de la Comunidad</strong> para que los vecinos y
          vecinas puedan disfrutar de los espacios al aire libre y estar{" "}
          <strong>conectados a una red de Wifi gratuita.</strong>
        </p>

        <p className="text-center text-primary font-bold text-2xl max-w-lg">
          Queremos que en las plazas y parques{" "}
          <strong>
            puedas estudiar, trabajar, distraerte y estar en comunicacion
          </strong>{" "}
          con tus familia y amigos.
        </p>

        <p className="text-center text-primary font-bold text-2xl max-w-lg">
          Te pedimos que hagas un{" "}
          <strong>uso responsable del servicio.</strong>
        </p>

        <p className="text-center text-primary font-normal text-2xl max-w-lg">
          Podes cerrar esta ventana
        </p>

        <a
          href={redirectUrl}
          className="inline-block w-full max-w-full h-12 px-4 bg-primary text-white font-bold text-lg rounded hover:bg-primary-hover focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-2 transition-colors flex items-center justify-center"
        >
          Continuar navegando
        </a>

        <p className="text-sm text-foreground">
          Seras redirigido automaticamente en 5 segundos...
        </p>
      </main>

      <Footer />

      <script
        dangerouslySetInnerHTML={{
          __html: `setTimeout(function(){ window.location.href = ${JSON.stringify(redirectUrl)}; }, 5000);`,
        }}
      />
    </div>
  );
}
