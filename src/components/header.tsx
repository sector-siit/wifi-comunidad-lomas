import Image from "next/image";
import logoHeader from "@/../public/images/logo-header.png";

export function Header() {
  return (
    <header className="w-full h-header-h bg-primary flex items-center justify-center px-2 shrink-0">
      <Image
        src={logoHeader}
        alt="WiFi Comunidad"
        width={304}
        height={76}
        className="h-auto"
        priority
      />
    </header>
  );
}
