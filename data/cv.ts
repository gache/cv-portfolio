export const personal = {
  name: "Erick Franco",
  titles: [
    "QA Automation Engineer",
    "Java Spring Boot Developer",
    "AI Enthusiast",
  ],
  description:
    "Plus de 10 ans d'expérience en IT. Spécialisé en automatisation de tests, Java, Spring Boot, APIs REST, Playwright, IA Générative et développement Full Stack.",
  location: "Lille, France",
  email: "erickfrancodelgado@hotmail.com",
  linkedin: "https://www.linkedin.com/in/erick-franco-delgado-394a6228/",
  github: "https://github.com/gache",
  cvUrl: "/cv-erick-franco.pdf",
};

export const stats = [
  { value: 10, suffix: "+", label: "Ans d'expérience" },
  { value: 20, suffix: "+", label: "Projets livrés" },
  { value: 5, suffix: "", label: "Certifications" },
  { value: 30, suffix: "+", label: "Technologies" },
];

export const experiences = [
  {
    id: 1,
    employer: "IBM",
    role: "Testeur Automaticien",
    company: "Grand Compte — Retail",
    period: "Novembre 2024 — Présent",
    type: "QA",
    description:
      "Maintenance évolutive et corrective d'applications internes. Automatisation des tests et création de nouveaux cas de test pour assurer la qualité des livraisons.",
    responsibilities: [
      "Développement, maintenance et exécution de scripts de tests automatisés avec UFT",
      "Planification et exécution des campagnes de tests via Squash, correction des tests en erreur",
      "Configuration d'une nouvelle matrice de tests automatisés dans Squash",
      "Communication proactive avec les équipes fonctionnelles, définition des critères d'acceptation",
      "Production et diffusion des indicateurs qualité (taux de couverture, taux de réussite)",
      "Création et mise à jour de la documentation technique avec Confluence",
    ],
    tech: ["UFT", "Squash", "Jira", "Confluence", "Git", "Azure DevOps", "Sonar"],
  },
  {
    id: 2,
    employer: "IBM",
    role: "Administrateur M3",
    company: "Grand Compte — Luxe",
    period: "Juillet 2024 — Octobre 2024",
    type: "Admin",
    description:
      "Maintenance et évolution d'une application ERP dans un contexte de forte croissance. Équipe de 15 membres, modèle hybride cycle en V.",
    responsibilities: [
      "Création et gestion des utilisateurs à la demande du client",
      "Définition des rôles et des permissions",
      "Installation des mises à jour logicielles sur les environnements de recette, préproduction et production",
      "Création et maintien de la documentation des configurations système",
    ],
    tech: ["Infor M3 Grid", "Infor OS", "Infor ION", "LDAP"],
  },
  {
    id: 3,
    employer: "IBM",
    role: "Développeur Full Stack — Build (Biban)",
    company: "Grand Compte — Bancaire",
    period: "Mai 2024 — Juillet 2024",
    type: "Dev",
    description:
      "Création d'une application permettant à un client d'ouvrir un second compte bancaire avec gestion d'un apport. Équipe de 9 membres, modèle hybride cycle en V et Kanban.",
    responsibilities: [
      "Développement des API backend avec Spring Boot",
      "Implémentation de tests unitaires avec JUnit et Mockito (couverture >80%)",
      "Développement de services frontend en Angular",
      "Respect des principes CI/CD et validation des API via Postman",
      "Analyse et résolution d'incidents en production",
    ],
    tech: ["Java 11", "Spring Boot", "Angular 11", "JUnit", "Mockito", "Sonar", "GitLab", "CI/CD"],
  },
  {
    id: 4,
    employer: "IBM",
    role: "Développeur Full Stack — RUN (CLI)",
    company: "Grand Compte — Bancaire",
    period: "Janvier 2023 — Mai 2024",
    type: "Dev",
    description:
      "Maintenance et évolutions d'une application utilisée par les conseillers bancaires pour gérer leurs interactions et services clients. Équipe de 15 membres.",
    responsibilities: [
      "Développement et maintenance d'API backend avec Spring Boot",
      "Mise en place de tests unitaires JUnit/Mockito",
      "Développement de fonctionnalités Angular",
      "Suivi de la couverture de code >80% avec Sonar",
      "Participation au processus CI/CD",
    ],
    tech: ["Java 11", "Spring Boot", "Angular", "JUnit", "Mockito", "Sonar", "GitLab", "CI/CD"],
  },
  {
    id: 5,
    employer: "IBM",
    role: "Développeur Full Stack — Build (Succession)",
    company: "Grand Compte — Bancaire",
    period: "Septembre 2022 — Janvier 2023",
    type: "Dev",
    description:
      "Création d'une application permettant à un client de gérer ses droits de succession via un formulaire. Organisation Agile Scrum avec sprints de 3 semaines.",
    responsibilities: [
      "Développement des API backend avec Spring Boot",
      "Implémentation de tests unitaires avec JUnit et Mockito",
      "Développement frontend Angular — affichage de documents PDF",
      "Participation aux rituels Agile et au processus CI/CD",
    ],
    tech: ["Java 11", "Spring Boot", "Angular 11", "JUnit", "Mockito", "Sonar", "GitLab", "Scrum"],
  },
  {
    id: 6,
    employer: "IBM",
    role: "Testeur Technico-Fonctionnel",
    company: "Grand Compte — E-commerce",
    period: "Juin 2021 — Septembre 2022",
    type: "QA",
    description:
      "Refonte d'une application e-commerce avec optimisation du temps de réponse lors des recherches. Équipe de 8 membres en Agile Scrum.",
    responsibilities: [
      "Tests backend et API via Postman, Newman et Insomnia",
      "Automatisation des collections Postman intégrées au pipeline CI/CD via Newman",
      "Implémentation de tests contractuels Pact pour communications interservices Kafka",
      "Tests comportementaux BDD avec Cucumber et Spring Boot",
      "Constitution et maintenance du référentiel de tests dans Confluence et Xray",
      "Analyse des flux Kafka avec Elastic",
    ],
    tech: ["Java 11", "Spring Boot", "Kafka", "Cucumber", "Pact", "Selenium", "UFT", "Postman", "Newman", "Azure DevOps", "Elastic"],
  },
  {
    id: 7,
    employer: "Auchan Retail",
    role: "Développeur Front-end Angular",
    company: "Auchan Retail",
    period: "Juin 2019 — Juillet 2019",
    type: "Dev",
    description:
      "Mission de développement front-end chez Auchan Retail à Villeneuve d'Ascq. Recueil des besoins utilisateurs et développement en mode Agile avec feedback continu.",
    responsibilities: [
      "Recueil des besoins des utilisateurs et définition de la solution",
      "Réponse au cahier des charges du client",
      "Tests réguliers avec les utilisateurs pour feedback immédiat",
    ],
    tech: ["Angular", "Bootstrap", "Git", "GitHub", "Agile", "VSCode", "Windows 10"],
  },
  {
    id: 8,
    employer: "Modis",
    role: "Technicien Support Informatique",
    company: "Maisons du Monde",
    period: "Avril 2017 — Février 2020",
    type: "IT",
    description:
      "Support informatique pour Maisons du Monde via Modis à Lille. Identification, analyse et traitement des demandes utilisateurs sur un parc informatique Windows 10.",
    responsibilities: [
      "Identifier, analyser et traiter les demandes des utilisateurs",
      "Saisie et gestion des données",
      "Mise en réseau des matériels informatiques",
    ],
    tech: ["Easyvista", "Winstore", "Sonicwall", "Windows 10"],
  },
  {
    id: 9,
    employer: "TEJE",
    role: "Trésorier",
    company: "TEJE",
    period: "Avril 2012 — 2017",
    type: "Asso",
    description:
      "Gestion des comptes et élaboration des budgets. Mise en place d'actions collectives et participatives avec des bénévoles autour de la solidarité internationale (animations ludiques, gastronomiques, ciné débat, etc.)",
    responsibilities: [
      "Gestion des comptes et élaboration des budgets",
      "Animation de réunions et prise de parole en public",
      "Gestion d'un groupe de bénévoles",
      "Organisation d'actions autour de la solidarité internationale",
    ],
    tech: ["Gestion de projet", "Animation", "Bénévolat"],
  },
  {
    id: 10,
    employer: "Oidhaco",
    role: "Chargé de Mission Droits Humains",
    company: "Oidhaco — Bruxelles",
    period: "Avril 2015 — Septembre 2015",
    type: "Asso",
    description:
      "Coordination du travail avec des ONG à Bruxelles. Rédaction de rapports économiques, comptes rendus, newsletters et organisation d'événements.",
    responsibilities: [
      "Coordination avec des ONG partenaires",
      "Rédaction de rapports économiques, comptes rendus et newsletters",
      "Organisation d'événements",
      "Mobilisation du réseau de l'organisation à distance",
    ],
    tech: ["Gestion de projet", "Rédaction", "Coordination ONG"],
  },
];

export const skills = {
  "Test Automation": [
    { name: "Playwright", level: 90 },
    { name: "Selenium", level: 85 },
    { name: "UFT", level: 88 },
    { name: "Cucumber / BDD", level: 85 },
    { name: "Pact (Contract)", level: 80 },
    { name: "Postman / Newman", level: 90 },
  ],
  "Backend": [
    { name: "Java", level: 85 },
    { name: "Spring Boot", level: 85 },
    { name: "JUnit / Mockito", level: 85 },
    { name: "REST APIs", level: 88 },
    { name: "Kafka", level: 75 },
  ],
  "Frontend": [
    { name: "Angular", level: 80 },
    { name: "React / Next.js", level: 70 },
    { name: "TypeScript", level: 78 },
  ],
  "DevOps & Outils": [
    { name: "Git / GitLab", level: 85 },
    { name: "Azure DevOps", level: 82 },
    { name: "CI/CD", level: 80 },
    { name: "Sonar", level: 80 },
    { name: "Jira / Confluence", level: 90 },
  ],
  "Intelligence Artificielle": [
    { name: "Prompt Engineering", level: 88 },
    { name: "Claude / ChatGPT", level: 85 },
    { name: "Agentic AI", level: 75 },
    { name: "IBM Consulting Advantage", level: 80 },
  ],
};

export const projects = [
  {
    id: 0,
    title: "ClaudeEnergia — Dashboard HC/HP",
    description: "Dashboard d'analyse énergétique Heures Creuses / Heures Pleines. Visualisation des coûts, graphiques interactifs et optimisation de consommation. Construit avec Claude Code et déployé sur Vercel.",
    tech: ["Next.js 14", "TypeScript", "Claude Code", "Vercel"],
    github: "https://github.com/gache/claudeEnergia",
    demo: "https://claude-energia.vercel.app",
    image: "/projects/claude-energia.png",
    featured: true,
  },
  {
    id: 1,
    title: "Portfolio CV — Erick Franco",
    description: "Ce site web — portfolio professionnel construit avec Next.js 15, Tailwind CSS et TypeScript. Tests E2E Playwright avec pattern POM, formulaire contact via Resend, déployé sur Vercel.",
    tech: ["Next.js 15", "TypeScript", "Tailwind CSS", "Playwright", "Resend"],
    github: "https://github.com/gache/cv-portfolio",
    demo: "#",
    image: "/projects/cv-portfolio.png",
    featured: false,
  },
  {
    id: 1000,
    title: "Formation Playwright — Tests E2E",
    description: "Projet réalisé dans le cadre d'une formation en automatisation de tests. Couverture end-to-end, gestion des sélecteurs, assertions avancées et bonnes pratiques QA avec Playwright.",
    tech: ["Playwright", "TypeScript", "QA Automation"],
    github: "https://github.com/gache/playwright",
    demo: "#",
    image: "/projects/playwright-formation.png",
    featured: false,
  },
  {
    id: 2,
    title: "Application Spring Boot Hexagonale",
    description: "Architecture hexagonale (ports & adapters) avec Spring Boot, tests unitaires et d'intégration, déploiement Docker.",
    tech: ["Java", "Spring Boot", "Docker", "PostgreSQL", "JUnit"],
    github: "#",
    demo: "#",
    image: "/projects/spring-hexagonal.png",
  },
  {
    id: 3,
    title: "Home Assistant Smart Home",
    description: "Automatisation domotique complète avec Home Assistant, intégrations IA pour des routines intelligentes.",
    tech: ["Home Assistant", "Python", "MQTT", "Node-RED"],
    github: "#",
    demo: "#",
    image: "/projects/home-assistant.png",
  },
  {
    id: 4,
    title: "Apps IA Générative",
    description: "Collection d'applications exploitant Claude et ChatGPT — agents autonomes, outils de productivité, automations.",
    tech: ["Claude API", "Python", "LangChain", "FastAPI"],
    github: "#",
    demo: "#",
    image: "/projects/ai-apps.png",
  },
];

export const certifications = [
  { name: "Claude 101", issuer: "Anthropic", year: "2026" },
  { name: "Generative & Agentic AI Foundation", issuer: "IBM", year: "2026" },
];

export const blogPosts = [
  {
    title: "Playwright vs Selenium en 2025 : mon retour d'expérience",
    excerpt: "Après 2 ans avec Selenium et 1 an avec Playwright, voici pourquoi j'ai migré et ce que j'ai appris.",
    tag: "QA Automation",
    date: "Bientôt",
    slug: "#",
  },
  {
    title: "Architecture hexagonale avec Spring Boot — guide pratique",
    excerpt: "Implémenter les ports & adapters en Java, avec des exemples concrets tirés de projets bancaires.",
    tag: "Spring Boot",
    date: "Bientôt",
    slug: "#",
  },
  {
    title: "Construire un agent IA avec Claude et LangChain",
    excerpt: "De zéro à un agent opérationnel : outils, mémoire, et intégration dans un workflow existant.",
    tag: "IA Générative",
    date: "Bientôt",
    slug: "#",
  },
];
