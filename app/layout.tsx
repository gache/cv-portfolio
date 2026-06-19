import type { Metadata } from "next";
import { headers } from "next/headers";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { LanguageProvider } from "@/contexts/LanguageContext";
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
  title: "Erick Franco — QA Automation Engineer & AI Enthusiast",
  description:
    "Consultant IT chez IBM. Expert en QA Automation (Playwright, UFT) et IA Générative (certifié Claude 101 — Anthropic). Background Java/Spring Boot & APIs REST. Basé à Lille, France.",
  keywords: [
    "QA Automation Engineer France",
    "Test Automation Engineer Lille",
    "Playwright Automation Engineer",
    "UFT QA Engineer",
    "Claude 101 Anthropic",
    "AI Enthusiast IBM",
    "Testeur Automaticien Lille",
    "Erick Franco",
  ],
  authors: [{ name: "Erick Franco" }],
  openGraph: {
    title: "Erick Franco — QA Automation Engineer & AI Enthusiast",
    description:
      "IBM Consultant · QA Automation (Playwright, UFT) · Generative AI (Claude 101) · Lille, France.",
    type: "website",
    locale: "en_US",
    alternateLocale: ["fr_FR", "es_ES"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Erick Franco — QA Automation Engineer",
    description: "IBM Consultant · QA Automation · Claude 101 · Playwright · UFT",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nonce = (await headers()).get("x-nonce") ?? "";
  return (
    <html lang="fr" className={`scroll-smooth ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-bg text-text-primary antialiased">
        <LanguageProvider>{children}</LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
