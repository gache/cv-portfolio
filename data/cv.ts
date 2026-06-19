export const personal = {
  name: "Erick Franco",
  titles: [
    "QA Automation Engineer",
    "AI Enthusiast",
    "IBM Consultant",
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
    company: "Grand Compte — E-commerce",
    period: "Novembre 2024 — Présent",
    type: "QA",
    description:
      "Maintenance évolutive et corrective des applications internes. Assurer la qualité des livraisons via l'automatisation des tests, la maintenance des scripts existants et l'amélioration continue de la stratégie d'automatisation.",
    responsibilities: [
      "Développement, maintenance et exécution de scripts de tests automatisés avec UFT",
      "Planification et exécution des campagnes de tests automatisés via Squash, avec correction des tests en erreur",
      "Configuration et mise en place d'une nouvelle matrice de tests automatisés dans Squash",
      "Communication proactive avec les équipes fonctionnelles, accompagnement dans la définition des critères d'acceptation",
      "Participation aux revues de code, partage des bonnes pratiques UFT et contribution aux standards qualité",
      "Production et diffusion des indicateurs qualité (taux de couverture, taux de réussite des campagnes, anomalies ouvertes/fermées)",
      "Identification et suivi des risques liés à l'automatisation",
      "Création et mise à jour de la documentation technique avec Confluence",
    ],
    tech: ["UFT", "Squash", "Jira", "Confluence", "Git", "Azure DevOps", "Sonar", "Logys"],
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
      "Installation des mises à jour logicielles et correctifs sur les environnements de recette, préproduction et production",
      "Création et maintien d'une documentation précise des configurations système, des procédures et des bonnes pratiques",
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
      "Création d'une application en build permettant à un client d'ouvrir une seconde banque avec gestion d'un apport. Équipe de 9 membres, modèle hybride cycle en V et Kanban.",
    responsibilities: [
      "Développement des API backend avec Spring Boot",
      "Implémentation de tests unitaires avec JUnit et Mockito pour garantir la fiabilité du code",
      "Développement de services frontend en Angular, notamment visualisation et sélection de conseillers bancaires",
      "Suivi de la qualité et de la couverture de code (>80%) avec Sonar",
      "Respect des principes CI/CD et validation des API via Postman",
      "Analyse et résolution d'incidents en production",
    ],
    tech: ["Java 11", "Spring Boot", "Angular 11", "AngularJS", "JUnit", "Mockito", "Sonar", "GitLab", "CI/CD"],
  },
  {
    id: 4,
    employer: "IBM",
    role: "Développeur Full Stack — RUN (CLI)",
    company: "Grand Compte — Bancaire",
    period: "Janvier 2023 — Mai 2024",
    type: "Dev",
    description:
      "Maintenance et évolutions d'une application utilisée par les conseillers bancaires pour gérer leurs interactions et services clients. Équipe de 15 membres, organisation hybride cycle en V et Kanban.",
    responsibilities: [
      "Développement et maintenance d'API backend avec Spring Boot",
      "Mise en place de tests unitaires (JUnit, Mockito)",
      "Développement de fonctionnalités Angular, notamment un service de blocage de fiche client en cas de gel des avoirs",
      "Analyse et résolution d'incidents en production",
      "Suivi de la couverture de code (>80%) avec Sonar",
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
      "Création d'une application en build permettant à un client de gérer ses droits de succession via un formulaire. Organisation Agile Scrum avec sprints de 3 semaines. Équipe de 7 membres.",
    responsibilities: [
      "Développement des API backend avec Spring Boot",
      "Implémentation de tests unitaires avec JUnit et Mockito",
      "Suivi de la qualité et de la couverture de code avec Sonar",
      "Développement frontend Angular — affichage de documents PDF dans l'interface utilisateur",
      "Participation aux rituels Agile et au processus CI/CD",
    ],
    tech: ["Java 11", "Spring Boot", "Angular 11", "JUnit", "Mockito", "Sonar", "GitLab", "Eclipse", "Postman", "Scrum"],
  },
  {
    id: 6,
    employer: "IBM",
    role: "Testeur Technico-Fonctionnel",
    company: "Grand Compte — E-commerce",
    period: "Juin 2021 — Septembre 2022",
    type: "QA",
    description:
      "Refonte d'une application e-commerce avec optimisation du temps de réponse lors des recherches de produits. Équipe de 8 membres en Agile Scrum, sprints de 2 semaines.",
    responsibilities: [
      "Conception et exécution de tests backend et API via Postman, Newman et Insomnia ; automatisation des collections intégrées au pipeline CI/CD",
      "Implémentation de tests contractuels Pact pour les communications interservices via Kafka",
      "Validation fonctionnelle des User Stories en collaboration avec développeurs et Product Owners",
      "Accompagnement des PO dans la définition des critères d'acceptation et des stratégies de validation",
      "Implémentation de tests comportementaux BDD avec Cucumber et Spring Boot",
      "Constitution et maintenance du référentiel de tests dans Confluence et Xray",
      "Analyse des flux Kafka à grande échelle avec Elastic",
    ],
    tech: ["Java 11", "Spring Boot", "Kafka", "Cucumber", "Pact", "Selenium", "UFT", "Postman", "Newman", "Insomnia", "Xray", "Azure DevOps", "Elastic"],
  },
  {
    id: 7,
    employer: "Auchan Retail",
    role: "Développeur Front-end Angular",
    company: "Auchan Retail",
    period: "Juin 2019 — Juillet 2019",
    type: "Dev",
    description:
      "Participation au développement d'applications web en environnement Agile, en collaboration avec les utilisateurs et les équipes projet. Analyse des besoins fonctionnels, développement des interfaces utilisateur et validation continue grâce aux retours des utilisateurs.",
    responsibilities: [
      "Recueil et analyse des besoins métiers",
      "Conception et développement d'interfaces web avec Angular",
      "Traduction des besoins fonctionnels en solutions techniques",
      "Participation aux cérémonies Agile et travail en équipe Scrum",
      "Validation fonctionnelle et tests utilisateurs (UAT)",
      "Amélioration continue basée sur les retours utilisateurs",
      "Gestion du code source et collaboration via Git/GitHub",
      "Intégration responsive avec Bootstrap",
    ],
    tech: ["Angular", "TypeScript", "HTML5", "CSS3", "Bootstrap", "Git", "GitHub", "VSCode"],
  },
  {
    id: 8,
    employer: "Modis",
    role: "Technicien Support Informatique",
    company: "Maisons du Monde",
    period: "Avril 2017 — Février 2020",
    type: "IT",
    description:
      "Assistance et support informatique de proximité pour les utilisateurs de Maisons du Monde. Prise en charge des incidents et demandes de service, administration du poste de travail et support des infrastructures dans un environnement Windows.",
    responsibilities: [
      "Support utilisateurs N1/N2 et gestion des incidents",
      "Analyse, diagnostic et résolution de problèmes techniques",
      "Gestion des tickets et suivi des demandes via EasyVista",
      "Administration et support des postes de travail Windows 10",
      "Installation, configuration et mise en réseau des équipements informatiques",
      "Gestion et mise à jour des données utilisateurs",
      "Assistance à distance et accompagnement des utilisateurs",
      "Respect des procédures IT et amélioration de la qualité de service",
    ],
    tech: ["Easyvista", "Winstore", "Sonicwall", "Windows 10"],
  },
  {
    id: 9,
    employer: "TEJE",
    role: "Trésorier",
    company: "TEJE",
    period: "Septembre 2015 — 2017",
    type: "Asso",
    description:
      "Pilotage de projets associatifs et de solidarité internationale : gestion budgétaire, coordination d'équipes de bénévoles et mise en œuvre d'actions collectives de sensibilisation (événements culturels, ateliers pédagogiques, débats et animations participatives).",
    responsibilities: [
      "Gestion budgétaire et suivi financier de projets",
      "Coordination et encadrement d'équipes de bénévoles",
      "Gestion de projet et mobilisation des parties prenantes",
      "Animation de réunions et d'ateliers participatifs",
      "Communication, sensibilisation et prise de parole en public",
      "Pédagogie, facilitation et travail collaboratif",
      "Organisation d'événements et d'actions de solidarité internationale",
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
      "Coordination de partenariats avec des ONG à Bruxelles",
      "Rédaction de rapports économiques, notes de synthèse et newsletters",
      "Organisation et gestion d'événements",
      "Animation et mobilisation d'un réseau de partenaires à distance",
      "Coordination de projets et communication avec les parties prenantes",
    ],
    tech: ["Gestion de projet", "Rédaction", "Coordination ONG"],
  },
];

export const skills = {
  "Test Automation": [
    { name: "Playwright", level: 90 },
    { name: "UFT", level: 88 },
    { name: "Cucumber / BDD", level: 85 },
    { name: "Squash TM", level: 88 },
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
    { name: "TypeScript", level: 78 },
  ],
  "DevOps & Outils": [
    { name: "Git / GitLab", level: 85 },
    { name: "Azure DevOps", level: 82 },
    { name: "CI/CD", level: 80 },
    { name: "Sonar", level: 80 },
    { name: "Jira / Confluence", level: 90 },
    { name: "Agile / Scrum", level: 88 },
  ],
  "Intelligence Artificielle": [
    { name: "Prompt Engineering", level: 88 },
    { name: "Claude / ChatGPT", level: 85 },
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
    description: "Ce site web — portfolio professionnel construit avec Next.js, Tailwind CSS et TypeScript. Tests E2E Playwright avec pattern POM, formulaire contact via Resend, déployé sur Vercel.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Playwright", "Resend"],
    github: "https://github.com/gache/cv-portfolio",
    demo: "https://erickfranco.fr",
    image: "/projects/cv-portfolio.png",
    featured: true,
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
    id: 3,
    title: "Home Assistant Smart Home",
    description: "Automatisation domotique complète avec Home Assistant, intégrations IA pour des routines intelligentes.",
    tech: ["Home Assistant", "Python", "MQTT", "Node-RED"],
    github: "#",
    demo: "https://sxxglzal3i5wono7q6s9tjebugdb6rkx.ui.nabu.casa/dashboard-home/0",
    image: "/projects/home-assistant.png",
  },
];

export const certifications = [
  { name: "Claude 101", issuer: "Anthropic", year: "2026" },
  { name: "Generative & Agentic AI Foundation", issuer: "IBM", year: "2026" },
];

export const blogPosts: never[] = [];

export const testimonials: { name: string; role: string; company: string; text: string }[] = [];
