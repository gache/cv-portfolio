export const revalidate = 60;

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Certifications from "@/components/sections/Certifications";
import TestimonialsServer from "@/components/sections/TestimonialsServer";
import Hobbies from "@/components/sections/Hobbies";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-md focus:bg-accent focus:text-bg focus:font-medium focus:text-sm focus:shadow-lg"
      >
        Aller au contenu principal
      </a>
      <Navbar />
      <main id="main-content" className="relative">
        <Hero />
        <Stats />
        <About />
        <Experience />
        <Skills />
        <Certifications />
        <Projects />
        <Hobbies />
        <TestimonialsServer />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
