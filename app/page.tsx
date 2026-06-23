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
import ScrollToTop from "@/components/ui/ScrollToTop";
import LangUpdater from "@/components/ui/LangUpdater";
import SkipLink from "@/components/ui/SkipLink";
import { getExperiences, getProjects, getSkills, getCertifications } from "@/lib/getPortfolioData";

export default async function Home() {
  const [experiencesData, projectsData, skillsData, certificationsData] = await Promise.all([
    getExperiences(),
    getProjects(),
    getSkills(),
    getCertifications(),
  ]);

  return (
    <>
      <SkipLink />
      <LangUpdater />
      <Navbar />
      <main id="main-content" className="relative">
        <Hero />
        <Stats />
        <About />
        <Experience experiences={experiencesData} />
        <Skills skills={skillsData} />
        <Certifications certifications={certificationsData} />
        <Projects projects={projectsData} />
        <Hobbies />
        <TestimonialsServer />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
