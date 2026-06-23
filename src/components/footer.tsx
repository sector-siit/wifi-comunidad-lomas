import Image from "next/image";
import logoFooter from "@/../public/images/logo-footer-5b5bb2.png";

export function Footer({ className }: { className?: string }) {
  return (
    <footer
      className={`w-full h-footer-h bg-primary flex items-center justify-center px-4 shrink-0 ${className ?? ""}`}
    >
      <Image
        src={logoFooter}
        alt="Municipio de Lomas de Zamora"
        width={238}
        height={61}
        className="h-auto"
      />
    </footer>
  );
}
