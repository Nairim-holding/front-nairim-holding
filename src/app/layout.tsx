import type { Metadata } from "next";
import "./globals.css";
import robotoFont from 'next/font/local';
import interFont from 'next/font/local';
import bebasNeueFont from 'next/font/local';

const robotoFontLocation = robotoFont({
  src: '../fonts/roboto.ttf',
  weight: '400',
  style: 'normal',
  variable: '--font-roboto',
});

const interFontLocation = interFont({
  src: '../fonts/inter.ttf',
  weight: '400',
  style: 'normal',
  variable: '--font-inter',
});

const bebasNeueFontLocation = bebasNeueFont({
  src: '../fonts/BebasNeue.ttf',
  weight: '400',
  style: 'normal',
  variable: '--font-bebasNeue',
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
        className={`${robotoFontLocation.className} ${interFontLocation.className}  ${bebasNeueFontLocation.variable}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
