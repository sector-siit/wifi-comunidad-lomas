import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geometria = localFont({
  src: [
    {
      path: "./fonts/Geometria-Bold.woff2",
      weight: "700",
      style: "bold",
    },
    {
      path: "./fonts/Geometria-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Geometria-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Geometria-Light.woff2",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-geometria",
});

export const metadata: Metadata = {
  title: "WiFi Comunidad - Lomas de Zamora",
  description: "Portal cautivo WiFi comunitario - Municipio de Lomas de Zamora",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geometria.variable} h-full antialiased`}
    >
      <body className={`${geometria.className} min-h-full flex flex-col bg-gray-50`}>
        {children}
      </body>
    </html>
  );
}
