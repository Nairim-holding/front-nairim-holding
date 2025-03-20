import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import robotoFont from 'next/font/local';

const robotoFontLocation = robotoFont({
  src: '../fonts/roboto.ttf',
  weight: '400',
  style: 'normal',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: "Nairim Holding",
  description: "uma empresa especializada na venda de imóveis, oferecendo soluções completas para quem deseja adquirir casas, apartamentos, terrenos e propriedades comerciais. Nosso compromisso é conectar clientes a empreendimentos de alto padrão, garantindo segurança, transparência e excelência em cada negociação.",
  icons: "/favicon.svg"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${robotoFontLocation.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
