import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Erick Franco — QA Automation Engineer & Java Spring Boot Developer",
  description:
    "Plus de 10 ans d'expérience en IT. Spécialisé en automatisation de tests (Playwright, UFT, Selenium), Java Spring Boot, APIs REST et IA Générative. Basé à Lille, France.",
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
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg text-text-primary antialiased">{children}</body>
    </html>
  );
}
