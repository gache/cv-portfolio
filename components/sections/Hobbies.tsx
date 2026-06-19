"use client";

import { Camera, Mountain, Tv, Home, Heart, Bike, Plane, UtensilsCrossed } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { useLanguage } from "@/contexts/LanguageContext";

const HOBBIES = [
  {
    icon: Camera,
    fr: { title: "Photographie & Randonnée", desc: "Membre d'un groupe photo — on sort ensemble explorer des paysages, capturer des instants et échanger sur la technique." },
    en: { title: "Photography & Hiking", desc: "Member of a photo group — we go out together to explore landscapes, capture moments and discuss technique." },
    es: { title: "Fotografía & Senderismo", desc: "Formo parte de un grupo de fotografía — salimos a explorar paisajes, capturar instantes y charlar sobre la técnica." },
    accent: true,
  },
  {
    icon: Plane,
    fr: { title: "Voyage", desc: "Explorer de nouveaux endroits avec mon appareil photo — ma caméra est toujours dans le sac." },
    en: { title: "Travel", desc: "Exploring new places with my camera — it always goes with me wherever I go." },
    es: { title: "Viajes", desc: "Explorar nuevos lugares con mi cámara — siempre va conmigo a donde sea." },
    accent: true,
  },
  {
    icon: UtensilsCrossed,
    fr: { title: "Cuisine", desc: "J'aime cuisiner, tester de nouvelles recettes et partager un bon repas." },
    en: { title: "Cooking", desc: "I enjoy cooking, trying new recipes and sharing a good meal." },
    es: { title: "Cocina", desc: "Me gusta cocinar, probar nuevas recetas y compartir una buena comida." },
    accent: false,
  },
  {
    icon: Bike,
    fr: { title: "Vélo", desc: "Je sors régulièrement à vélo — pour me dépenser, explorer la ville ou simplement déconnecter." },
    en: { title: "Cycling", desc: "I regularly go out cycling — to exercise, explore the city or simply disconnect." },
    es: { title: "Bicicleta", desc: "Salgo regularmente en bici — para hacer ejercicio, explorar la ciudad o simplemente desconectar." },
    accent: false,
  },
  {
    icon: Home,
    fr: { title: "Domotique", desc: "Automatiser ma maison avec Home Assistant — routines intelligentes, intégrations IA et capteurs connectés." },
    en: { title: "Home Automation", desc: "Automating my home with Home Assistant — smart routines, AI integrations and connected sensors." },
    es: { title: "Domótica", desc: "Automatizando mi casa con Home Assistant — rutinas inteligentes, integraciones IA y sensores conectados." },
    accent: true,
  },
  {
    icon: Tv,
    fr: { title: "Séries & Films", desc: "Curieux de nouvelles histoires, j'aime explorer des univers narratifs variés." },
    en: { title: "Series & Films", desc: "Curious about new stories, I love exploring diverse narrative universes." },
    es: { title: "Series y Películas", desc: "Curioso por nuevas historias, me gusta explorar universos narrativos variados." },
    accent: false,
  },
];

export default function Hobbies() {
  const { lang } = useLanguage();

  const labels = {
    fr: { eyebrow: "Loisirs", title: "Qui suis-je en dehors du travail ?", subtitle: "Le travail c'est une partie de moi. Voici ce qui me définit au quotidien." },
    en: { eyebrow: "Hobbies", title: "Who am I outside of work?", subtitle: "Work is one part of me. Here is what defines me day to day." },
    es: { eyebrow: "Aficiones", title: "¿Quién soy fuera del trabajo?", subtitle: "El trabajo es una parte de mí. Esto es lo que me define en el día a día." },
  };

  const l = labels[lang];

  return (
    <SectionWrapper id="hobbies" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <p className="inline-flex items-center gap-1.5 text-xs font-mono text-accent mb-3 tracking-widest uppercase text-center w-full justify-center">
          <Heart size={12} />
          {l.eyebrow}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">{l.title}</h2>
        <p className="text-text-secondary text-center mb-16 max-w-xl mx-auto">{l.subtitle}</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {HOBBIES.map((hobby, i) => (
            <div
              key={hobby.fr.title}
              className="rounded-xl border border-border/30 bg-surface/40 p-6 flex gap-4 cursor-pointer hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-[0_4px_20px_rgba(129,140,248,0.07)] transition-all duration-300"
              style={{ animation: `slideUpFade 0.4s ease ${i * 80}ms both` }}
            >
              <div className="mt-0.5 flex-shrink-0">
                <hobby.icon
                  size={20}
                  className={hobby.accent ? "text-accent" : "text-pass"}
                />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1 text-sm">{hobby[lang].title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed text-left">{hobby[lang].desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
