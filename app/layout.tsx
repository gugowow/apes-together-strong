import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "APES TOGETHA STRONG", template: "%s | APES TOGETHA STRONG" },
  description: "Guild brasileira de World of Warcraft. Core em formação para Heroic Raid e Mythic+. Segunda, terça e quarta, às 22h." ,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
     <body className="min-h-full flex flex-col">
        <a href="#main-content" className="sr-only fixed left-4 top-4 z-[100] bg-orange-500 px-4 py-3 font-bold text-black focus:not-sr-only">Pular para o conteúdo</a>
        <Navbar />
        {children}
    </body>
    </html>
  );
}

