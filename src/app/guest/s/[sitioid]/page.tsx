import { RegisterForm } from "./register-form";

export default async function GuestPage({
  params,
  searchParams,
}: {
  params: Promise<{ sitioid: string }>;
  searchParams: Promise<{
    ap?: string;
    id?: string;
    t?: string;
    url?: string;
    ssid?: string;
  }>;
}) {
  const { sitioid } = await params;
  const sp = await searchParams;

  return (
    <RegisterForm
      sitioid={sitioid}
      apMac={sp.ap ?? ""}
      deviceMac={sp.id ?? ""}
      unifiTimestamp={sp.t ?? ""}
      redirectUrl={sp.url ?? "/"}
      ssid={sp.ssid ?? "Comunidad WiFi"}
    />
  );
}