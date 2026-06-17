import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Erick Franco — QA Automation Engineer & Java Spring Boot Developer",
  description:
    "Plus de 10 ans d'expérience en IT. Spécialisé en automatisation de tests (Playwright, UFT), Java Spring Boot, APIs REST et IA Générative. Basé à Lille, France.",
  keywords: [
    "QA Automation Engineer France",
    "Test Automation Engineer Lille",
    "Java Spring Boot Developer",
    "Playwright Automation Engineer",
    "AI Engineer France",
    "Testeur Automaticien Lille",
    "Développeur Full Stack Java Angular",
    "Erick Franco",
  ],
  authors: [{ name: "Erick Franco" }],
  openGraph: {
    title: "Erick Franco — QA Automation Engineer & Java Spring Boot Developer",
    description:
      "10+ ans d'expérience IT. Automatisation de tests, Java/Spring Boot, Angular, IA Générative.",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Erick Franco — QA Automation Engineer",
    description: "10+ ans IT · QA Automation · Java Spring Boot · IA",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`scroll-smooth ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-bg text-text-primary antialiased">{children}</body>
    </html>
  );
}
