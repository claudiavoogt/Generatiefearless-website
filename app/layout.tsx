import type { Metadata } from "next";
import { Poppins, Lora, Playfair_Display } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Generatie Fearless | Leer je kind beleggen",
  description:
    "Geef je kind de financiële voorsprong die jij nooit kreeg. De online cursus die ouders en kinderen samen financieel slim maakt.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${poppins.variable} ${lora.variable} ${playfair.variable}`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
