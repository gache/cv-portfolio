export type Lang = "fr" | "en" | "es";

export type T = {
  nav: {
    about: string;
    experience: string;
    skills: string;
    projects: string;
    testimonials: string;
    hobbies: string;
    contact: string;
    downloadCv: string;
  };
  hero: {
    available: string;
    description: string;
    downloadCv: string;
    contactMe: string;
    seeExperience: string;
    terminalSuffix: string;
    scrollLabel: string;
  };
  stats: {
    missions: string;
    tools: string;
    languages: string;
  };
  about: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    p1: string;
    p2: string;
    badges: string[];
    journey: { title: string; desc: string }[];
  };
  experience: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: { id: number; role: string; description: string; responsibilities: string[] }[];
  };
  skills: {
    eyebrow: string;
    title: string;
    subtitle: string;
    categories: Record<string, string>;
    categoryDesc: Record<string, string>;
  };
  projects: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: { id: number; title: string; description: string }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    labelName: string;
    labelEmail: string;
    labelCompany: string;
    labelMessage: string;
    placeholderName: string;
    placeholderEmail: string;
    placeholderCompany: string;
    placeholderMessage: string;
    submit: string;
    sending: string;
    sentTitle: string;
    sentBody: string;
    sendAnother: string;
    errorMsg: string;
    emailInvalid: string;
    emailRequired: string;
    errorsTitle: string;
    availability: string;
    basedIn: string;
    openTo: string;
  };
  testimonials: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaQuestion: string;
    cta: string;
    modalTitle: string;
    labelName: string;
    labelRole: string;
    labelCompany: string;
    labelText: string;
    placeholderName: string;
    placeholderRole: string;
    placeholderCompany: string;
    placeholderText: string;
    submit: string;
    sending: string;
    thankYouTitle: string;
    thankYouBody: string;
    errorMsg: string;
    emptyState: string;
  };
  footer: {
    available: string;
    rights: string;
  };
};

export const translations: Record<Lang, T> = {
  fr: {
    nav: {
      about: "À propos",
      experience: "Expérience",
      skills: "Skills",
      projects: "Projets",
      testimonials: "Témoignages",
      hobbies: "Loisirs",
      contact: "Contact",
      downloadCv: "Télécharger CV",
    },
    hero: {
      available: "Disponible pour de nouvelles missions",
      description: "Consultant IT chez IBM. Expert en QA Automation (Playwright, UFT) et IA Générative (certifié Claude 101 — Anthropic). Background Java/Spring Boot & APIs REST.",
      downloadCv: "Télécharger CV",
      contactMe: "Me contacter",
      seeExperience: "Voir l'expérience",
      terminalSuffix: "3/3 passed · IBM Consultant",
      scrollLabel: "Défiler vers le bas",
    },
    stats: {
      missions: "missions IBM",
      tools: "outils QA & techno",
      languages: "langues",
    },
    about: {
      eyebrow: "À propos",
      title: "Du support IT à l'IA —",
      titleAccent: "une trajectoire technique",
      p1: "Consultant IT chez IBM depuis plusieurs années, j'ai forgé mon expertise dans des environnements exigeants : secteur bancaire, e-commerce, luxe et retail. Mon profil hybride QA + Dev me permet de comprendre la qualité logicielle sous tous ses angles — de l'écriture du code à la validation de son comportement.",
      p2: "Convaincu que la qualité n'est pas une phase mais une culture, je m'investis dans l'automatisation intelligente, les bonnes pratiques de testing et l'intégration de l'IA générative pour des workflows plus efficaces.",
      badges: [],
      journey: [
        { title: "Support IT & Infrastructure", desc: "Support utilisateurs N1/N2, gestion des incidents et administration de postes Windows — fondations solides avant la transition vers le développement." },
        { title: "Développement Full Stack", desc: "Développement d'APIs Java/Spring Boot et d'interfaces Angular dans des contextes bancaires critiques — tests unitaires JUnit/Mockito et CI/CD." },
        { title: "QA Automation", desc: "Spécialisation en QA Automation — UFT, Playwright, Cucumber (BDD), Pact (contract testing) et Squash TM. Profil hybride QA/Dev au service de la qualité logicielle." },
        { title: "Intelligence Artificielle", desc: "Certifié Claude 101 (Anthropic) et IBM Generative & Agentic AI Foundation. Application de l'IA générative dans les workflows qualité." },
        { title: "Apprentissage continu", desc: "ClaudeEnergia, portfolio CV, formation Playwright — projets personnels construits avec Claude Code, déployés sur Vercel, toujours en veille technologique." },
      ],
    },
    experience: {
      eyebrow: "Expérience",
      title: "Parcours professionnel",
      subtitle: "Expériences regroupées par employeur — missions ESN et engagements directs.",
      items: [
        { id: 1, role: "Testeur Automaticien", description: "Maintenance évolutive et corrective des applications internes. Assurer la qualité des livraisons via l'automatisation des tests, la maintenance des scripts existants et l'amélioration continue de la stratégie d'automatisation.", responsibilities: ["Développement, maintenance et exécution de scripts de tests automatisés avec UFT.", "Planification et exécution des campagnes de tests automatisés via Squash, avec correction des tests en erreur.", "Configuration et mise en place d'une nouvelle matrice de tests automatisés dans Squash.", "Communication proactive avec les équipes fonctionnelles, accompagnement dans la définition des critères d'acceptation et intégration de leurs retours dans la stratégie de validation.", "Participation aux revues de code, partage des bonnes pratiques UFT et contribution à l'évolution du référentiel de tests et des standards qualité de l'équipe.", "Production et diffusion des indicateurs qualité (taux de couverture, taux de réussite des campagnes, anomalies ouvertes/fermées) à destination des équipes projet et du management.", "Identification et suivi des risques liés à l'automatisation.", "Création et mise à jour de la documentation technique avec Confluence."] },
        { id: 2, role: "Administrateur M3", description: "Maintenance et évolution d'une application ERP dans un contexte de forte croissance. Équipe de 15 membres, modèle hybride cycle en V.", responsibilities: ["Création et gestion des utilisateurs à la demande du client.", "Définition des rôles et des permissions.", "Installation des mises à jour logicielles et des correctifs sur les environnements de recette, préproduction et production afin de maintenir le système sécurisé et à jour.", "Création et maintien d'une documentation précise des configurations système, des procédures et des bonnes pratiques."] },
        { id: 3, role: "Développeur Full Stack — Build (Biban)", description: "Création d'une application en build permettant à un client d'ouvrir une seconde banque avec gestion d'un apport. Équipe de 9 membres, modèle hybride cycle en V et Kanban.", responsibilities: ["Développement des API backend avec Spring Boot.", "Implémentation de tests unitaires avec JUnit et Mockito pour garantir la fiabilité du code.", "Développement de services frontend en Angular, notamment une fonctionnalité permettant la visualisation et la sélection de conseillers bancaires.", "Suivi de la qualité et de la couverture de code (>80%) avec Sonar.", "Respect des principes CI/CD et validation des API via Postman.", "Analyse et résolution d'incidents en production."] },
        { id: 4, role: "Développeur Full Stack — RUN (CLI)", description: "Maintenance et évolutions d'une application utilisée par les conseillers bancaires pour gérer leurs interactions et services clients. Équipe de 15 membres, organisation hybride cycle en V et Kanban.", responsibilities: ["Développement et maintenance d'API backend avec Spring Boot.", "Mise en place de tests unitaires (JUnit, Mockito).", "Développement de fonctionnalités Angular, notamment un service permettant le blocage d'une fiche client en cas de gel des avoirs.", "Analyse et résolution d'incidents en production.", "Suivi de la couverture de code (>80%) avec Sonar.", "Participation au processus CI/CD."] },
        { id: 5, role: "Développeur Full Stack — Build (Succession)", description: "Création d'une application en build permettant à un client de gérer ses droits de succession via un formulaire. Organisation Agile Scrum avec sprints de 3 semaines. Équipe de 7 membres.", responsibilities: ["Développement des API backend avec Spring Boot.", "Implémentation de tests unitaires avec JUnit et Mockito.", "Suivi de la qualité et de la couverture de code avec Sonar.", "Développement frontend Angular — affichage de documents PDF dans l'interface utilisateur.", "Participation aux rituels Agile et au processus CI/CD."] },
        { id: 6, role: "Testeur Technico-Fonctionnel", description: "Refonte d'une application e-commerce avec optimisation du temps de réponse lors des recherches de produits. Équipe de 8 membres en Agile Scrum, sprints de 2 semaines.", responsibilities: ["Conception et exécution de tests backend et API via Postman, Newman et Insomnia ; automatisation des collections Postman intégrées au pipeline CI/CD via Newman.", "Implémentation de tests contractuels Pact pour les communications interservices via Kafka.", "Validation fonctionnelle des User Stories en collaboration avec les développeurs et les Product Owners.", "Accompagnement des Product Owners dans la définition des critères d'acceptation et des stratégies de validation.", "Implémentation de tests comportementaux BDD avec Cucumber et Spring Boot.", "Constitution et maintenance du référentiel de tests dans Confluence et Xray.", "Analyse des flux Kafka à grande échelle avec Elastic."] },
        { id: 7, role: "Développeur Front-end Angular", description: "Participation au développement d'applications web en environnement Agile, en collaboration avec les utilisateurs et les équipes projet. Analyse des besoins fonctionnels, développement des interfaces utilisateur et validation continue grâce aux retours des utilisateurs.", responsibilities: ["Recueil et analyse des besoins métiers", "Conception et développement d'interfaces web avec Angular", "Traduction des besoins fonctionnels en solutions techniques", "Participation aux cérémonies Agile et travail en équipe Scrum", "Validation fonctionnelle et tests utilisateurs (UAT)", "Amélioration continue basée sur les retours utilisateurs", "Gestion du code source et collaboration via Git/GitHub", "Intégration responsive avec Bootstrap"] },
        { id: 8, role: "Technicien Support Informatique", description: "Assistance et support informatique de proximité pour les utilisateurs de Maisons du Monde. Prise en charge des incidents et demandes de service, administration du poste de travail et support des infrastructures dans un environnement Windows.", responsibilities: ["Support utilisateurs N1/N2 et gestion des incidents", "Analyse, diagnostic et résolution de problèmes techniques", "Gestion des tickets et suivi des demandes via EasyVista", "Administration et support des postes de travail Windows 10", "Installation, configuration et mise en réseau des équipements informatiques", "Gestion et mise à jour des données utilisateurs", "Assistance à distance et accompagnement des utilisateurs", "Respect des procédures IT et amélioration de la qualité de service"] },
        { id: 9, role: "Trésorier", description: "Pilotage de projets associatifs et de solidarité internationale : gestion budgétaire, coordination d'équipes de bénévoles et mise en œuvre d'actions collectives de sensibilisation (événements culturels, ateliers pédagogiques, débats et animations participatives).", responsibilities: ["Gestion budgétaire et suivi financier de projets", "Coordination et encadrement d'équipes de bénévoles", "Gestion de projet et mobilisation des parties prenantes", "Animation de réunions et d'ateliers participatifs", "Communication, sensibilisation et prise de parole en public", "Pédagogie, facilitation et travail collaboratif", "Organisation d'événements et d'actions de solidarité internationale"] },
        { id: 10, role: "Chargé de Mission Droits Humains", description: "Coordination du travail avec des ONG à Bruxelles. Rédaction de rapports économiques, comptes rendus, newsletters et organisation d'événements.", responsibilities: ["Coordination de partenariats avec des ONG à Bruxelles", "Rédaction de rapports économiques, notes de synthèse et newsletters", "Organisation et gestion d'événements", "Animation et mobilisation d'un réseau de partenaires à distance", "Coordination de projets et communication avec les parties prenantes"] },
      ],
    },
    skills: {
      eyebrow: "Compétences",
      title: "Stack technique",
      subtitle: "Expertise construite sur des projets réels en environnements critiques.",
      categories: {
        "Test Automation": "Test Automation",
        "Backend": "Backend",
        "Frontend": "Frontend",
        "DevOps & Outils": "DevOps & Outils",
        "Intelligence Artificielle": "Intelligence Artificielle",
      },
      categoryDesc: {
        "Test Automation": "Frameworks & outils de test automatisé",
        "Backend": "APIs, services & persistance",
        "Frontend": "Interfaces & composants",
        "DevOps & Outils": "CI/CD, versionning & monitoring",
        "Intelligence Artificielle": "LLMs, agents & prompt engineering",
      },
    },
    projects: {
      eyebrow: "Projets",
      title: "Projets personnels",
      subtitle: "Side projects construits pour explorer de nouvelles technologies et résoudre de vrais problèmes.",
      items: [
        { id: 0, title: "ClaudeEnergia — Dashboard HC/HP", description: "Dashboard d'analyse énergétique Heures Creuses / Heures Pleines. Visualisation des coûts, graphiques interactifs et optimisation de consommation. Construit avec Claude Code et déployé sur Vercel." },
        { id: 1, title: "Portfolio CV — Erick Franco", description: "Ce site web — portfolio professionnel construit avec Next.js, Tailwind CSS et TypeScript. Tests E2E Playwright avec pattern POM, formulaire contact via Resend, déployé sur Vercel." },
        { id: 1000, title: "Formation Playwright — Tests E2E", description: "Projet réalisé dans le cadre d'une formation en automatisation de tests. Couverture end-to-end, gestion des sélecteurs, assertions avancées et bonnes pratiques QA avec Playwright." },
        { id: 3, title: "Home Assistant Smart Home", description: "Automatisation domotique complète avec Home Assistant, intégrations IA pour des routines intelligentes." },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Travaillons ensemble",
      subtitle: "Une opportunité, un projet, une question — je réponds sous 24h.",
      labelName: "Nom",
      labelEmail: "Email",
      labelCompany: "Entreprise",
      labelMessage: "Message",
      placeholderName: "Jean Dupont",
      placeholderEmail: "jean@entreprise.fr",
      placeholderCompany: "Nom de votre entreprise",
      placeholderMessage: "Décrivez votre besoin ou opportunité...",
      submit: "Envoyer le message",
      sending: "Envoi...",
      sentTitle: "Message envoyé !",
      sentBody: "Je vous réponds dans les 24h.",
      sendAnother: "Envoyer un autre message",
      errorMsg: "Erreur d'envoi. Réessayez ou contactez-moi directement par email.",
      emailInvalid: "Adresse e-mail invalide.",
      emailRequired: "Ce champ est obligatoire.",
      errorsTitle: "Veuillez corriger les erreurs suivantes :",
      availability: "Disponible pour des missions en ESN, des postes en CDI ou des freelances dans les domaines de la QA automatisation, du développement Java/Spring Boot ou de l'intégration IA.",
      basedIn: "Basé à Lille, France",
      openTo: "Open à remote & hybride",
    },
    testimonials: {
      eyebrow: "Témoignages",
      title: "Ce que disent mes collègues",
      subtitle: "Retours de collaborateurs avec qui j'ai travaillé sur des projets réels.",
      ctaQuestion: "Vous avez travaillé avec moi ?",
      cta: "Laisser un témoignage",
      modalTitle: "Laisser un témoignage",
      labelName: "Nom",
      labelRole: "Poste",
      labelCompany: "Entreprise",
      labelText: "Témoignage",
      placeholderName: "Marie L.",
      placeholderRole: "Tech Lead",
      placeholderCompany: "Nom de l'entreprise",
      placeholderText: "Décris ton expérience de travail avec Erick...",
      submit: "Envoyer",
      sending: "Envoi...",
      thankYouTitle: "Merci pour ton témoignage !",
      thankYouBody: "Il sera ajouté au site prochainement.",
      errorMsg: "Erreur d'envoi. Réessayez.",
      emptyState: "Les premiers témoignages arrivent bientôt.",
    },
    footer: {
      available: "Disponible · Lille, France · Remote OK",
      rights: "Tous droits réservés",
    },
  },

  en: {
    nav: {
      about: "About",
      experience: "Experience",
      skills: "Skills",
      projects: "Projects",
      testimonials: "Testimonials",
      hobbies: "Hobbies",
      contact: "Contact",
      downloadCv: "Download CV",
    },
    hero: {
      available: "Available for new opportunities",
      description: "IT Consultant at IBM. Expert in QA Automation (Playwright, UFT) and Generative AI (Claude 101 certified — Anthropic). Background in Java/Spring Boot & REST APIs.",
      downloadCv: "Download CV",
      contactMe: "Contact me",
      seeExperience: "View experience",
      terminalSuffix: "3/3 passed · IBM Consultant",
      scrollLabel: "Scroll down",
    },
    stats: {
      missions: "IBM missions",
      tools: "QA tools & tech",
      languages: "languages",
    },
    about: {
      eyebrow: "About",
      title: "From IT support to AI —",
      titleAccent: "a technical journey",
      p1: "IT Consultant at IBM for several years, I have built my expertise in demanding environments: banking, e-commerce, luxury and retail. My hybrid QA + Dev profile allows me to understand software quality from every angle — from writing code to validating its behavior.",
      p2: "Convinced that quality is not a phase but a culture, I invest in intelligent automation, testing best practices and the integration of generative AI for more efficient workflows.",
      badges: [],
      journey: [
        { title: "IT Support & Infrastructure", desc: "N1/N2 user support, incident management and Windows workstation administration — solid foundations before transitioning to development." },
        { title: "Full Stack Development", desc: "Java/Spring Boot API and Angular interface development in critical banking contexts — JUnit/Mockito unit tests and CI/CD." },
        { title: "QA Automation", desc: "QA Automation specialization — UFT, Playwright, Cucumber (BDD), Pact (contract testing) and Squash TM. Hybrid QA/Dev profile serving software quality." },
        { title: "Artificial Intelligence", desc: "Claude 101 certified (Anthropic) and IBM Generative & Agentic AI Foundation. Applying generative AI to quality workflows." },
        { title: "Continuous Learning", desc: "ClaudeEnergia, CV portfolio, Playwright training — personal projects built with Claude Code, deployed on Vercel, always watching the tech landscape." },
      ],
    },
    experience: {
      eyebrow: "Experience",
      title: "Professional Experience",
      subtitle: "Experiences grouped by employer — consulting missions and direct engagements.",
      items: [
        { id: 1, role: "Test Automation Engineer", description: "Evolutionary and corrective maintenance of internal applications. Ensuring delivery quality through test automation, existing script maintenance and continuous improvement of the automation strategy.", responsibilities: ["Development, maintenance and execution of automated test scripts with UFT.", "Planning and execution of automated test campaigns via Squash, with correction of failing tests.", "Configuration and setup of a new automated test matrix in Squash.", "Proactive communication with functional teams, supporting acceptance criteria definition and integrating their feedback into the validation strategy.", "Code review participation, sharing UFT best practices and contributing to the team's test repository and quality standards.", "Production and distribution of quality indicators (coverage rate, campaign success rate, open/closed anomalies) to project teams and management.", "Identification and monitoring of automation-related risks.", "Creation and maintenance of technical documentation with Confluence."] },
        { id: 2, role: "M3 Administrator", description: "Maintenance and evolution of an ERP application in a high-growth context. 15-member team, hybrid V-model.", responsibilities: ["User creation and management at client request.", "Definition of roles and permissions.", "Installation of software updates and patches on staging, pre-production and production environments to keep the system secure and up to date.", "Creation and maintenance of accurate system configuration documentation, procedures and best practices."] },
        { id: 3, role: "Full Stack Developer — Build (Biban)", description: "Creation of a build application allowing a client to open a second bank account with contribution management. 9-member team, hybrid V-model and Kanban.", responsibilities: ["Backend API development with Spring Boot.", "Unit test implementation with JUnit and Mockito to ensure code reliability.", "Frontend service development in Angular, including a feature for visualizing and selecting bank advisors.", "Code quality and coverage tracking (>80%) with Sonar.", "CI/CD principles compliance and API validation via Postman.", "Production incident analysis and resolution."] },
        { id: 4, role: "Full Stack Developer — RUN (CLI)", description: "Maintenance and evolution of an application used by bank advisors to manage client interactions and services. 15-member team, hybrid V-model and Kanban.", responsibilities: ["Backend API development and maintenance with Spring Boot.", "Unit test setup with JUnit and Mockito.", "Angular feature development, including a service for blocking a client file in case of asset freeze.", "Production incident analysis and resolution.", "Code coverage tracking (>80%) with Sonar.", "Participation in CI/CD process."] },
        { id: 5, role: "Full Stack Developer — Build (Succession)", description: "Creation of a build application allowing a client to manage inheritance rights via a form. Agile Scrum with 3-week sprints. 7-member team.", responsibilities: ["Backend API development with Spring Boot.", "Unit test implementation with JUnit and Mockito.", "Code quality and coverage tracking with Sonar.", "Angular frontend development — PDF document display in the user interface.", "Participation in Agile rituals and CI/CD process."] },
        { id: 6, role: "Technical-Functional Test Engineer", description: "Redesign of an e-commerce application with optimization of product search response time. 8-member Agile Scrum team, 2-week sprints.", responsibilities: ["Design and execution of backend and API tests via Postman, Newman and Insomnia; automation of Postman collections integrated into CI/CD pipeline via Newman.", "Implementation of Pact contract tests for inter-service communications via Kafka.", "Functional validation of User Stories in collaboration with developers and Product Owners.", "Supporting Product Owners in defining acceptance criteria and validation strategies.", "Implementation of BDD behavioral tests with Cucumber and Spring Boot.", "Construction and maintenance of test repository in Confluence and Xray.", "Large-scale Kafka stream analysis with Elastic."] },
        { id: 7, role: "Angular Front-end Developer", description: "Participation in web application development in an Agile environment, collaborating with users and project teams. Functional requirements analysis, UI development and continuous validation through user feedback.", responsibilities: ["Business requirements gathering and analysis", "Design and development of web interfaces with Angular", "Translation of functional requirements into technical solutions", "Participation in Agile ceremonies and Scrum team collaboration", "Functional validation and user acceptance testing (UAT)", "Continuous improvement based on user feedback", "Source code management and collaboration via Git/GitHub", "Responsive integration with Bootstrap"] },
        { id: 8, role: "IT Support Technician", description: "On-site IT support for Maisons du Monde users. Incident and service request handling, workstation administration and IT infrastructure support in a Windows environment.", responsibilities: ["N1/N2 user support and incident management", "Analysis, diagnosis and resolution of technical issues", "Ticket management and request tracking via EasyVista", "Administration and support of Windows 10 workstations", "Installation, configuration and networking of IT equipment", "User data management and updates", "Remote assistance and user guidance", "IT procedure compliance and service quality improvement"] },
        { id: 9, role: "Treasurer", description: "Management of association projects and international solidarity initiatives: budget management, volunteer team coordination and implementation of collective awareness actions (cultural events, educational workshops, debates and participatory activities).", responsibilities: ["Budget management and financial tracking of projects", "Coordination and supervision of volunteer teams", "Project management and stakeholder mobilization", "Facilitation of meetings and participatory workshops", "Communication, awareness-raising and public speaking", "Education, facilitation and collaborative work", "Organization of events and international solidarity actions"] },
        { id: 10, role: "Human Rights Project Officer", description: "Coordination of work with NGOs in Brussels. Writing economic reports, minutes, newsletters and organizing events.", responsibilities: ["Partnership coordination with NGOs in Brussels", "Writing economic reports, briefing notes and newsletters", "Organization and management of events", "Facilitation and mobilization of a remote partner network", "Project coordination and stakeholder communication"] },
      ],
    },
    skills: {
      eyebrow: "Skills",
      title: "Technical Stack",
      subtitle: "Expertise built on real projects in critical environments.",
      categories: {
        "Test Automation": "Test Automation",
        "Backend": "Backend",
        "Frontend": "Frontend",
        "DevOps & Outils": "DevOps & Tools",
        "Intelligence Artificielle": "Artificial Intelligence",
      },
      categoryDesc: {
        "Test Automation": "Automated testing frameworks & tools",
        "Backend": "APIs, services & persistence",
        "Frontend": "Interfaces & components",
        "DevOps & Outils": "CI/CD, versioning & monitoring",
        "Intelligence Artificielle": "LLMs, agents & prompt engineering",
      },
    },
    projects: {
      eyebrow: "Work",
      title: "Personal Projects",
      subtitle: "Side projects built to explore new technologies and solve real problems.",
      items: [
        { id: 0, title: "ClaudeEnergia — HC/HP Dashboard", description: "Energy analysis dashboard for Off-Peak / Peak Hours. Cost visualization, interactive charts and consumption optimization. Built with Claude Code and deployed on Vercel." },
        { id: 1, title: "Portfolio CV — Erick Franco", description: "This website — professional portfolio built with Next.js, Tailwind CSS and TypeScript. Playwright E2E tests with POM pattern, contact form via Resend, deployed on Vercel." },
        { id: 1000, title: "Playwright Training — E2E Tests", description: "Project completed as part of a test automation training course. End-to-end coverage, selector management, advanced assertions and QA best practices with Playwright." },
        { id: 3, title: "Home Assistant Smart Home", description: "Complete home automation with Home Assistant, AI integrations for intelligent routines." },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's work together",
      subtitle: "An opportunity, a project, a question — I respond within 24h.",
      labelName: "Name",
      labelEmail: "Email",
      labelCompany: "Company",
      labelMessage: "Message",
      placeholderName: "John Smith",
      placeholderEmail: "john@company.com",
      placeholderCompany: "Your company name",
      placeholderMessage: "Describe your need or opportunity...",
      submit: "Send message",
      sending: "Sending...",
      sentTitle: "Message sent!",
      sentBody: "I will reply within 24h.",
      sendAnother: "Send another message",
      errorMsg: "Send error. Please try again or contact me directly by email.",
      emailInvalid: "Invalid email address.",
      emailRequired: "This field is required.",
      errorsTitle: "Please correct the following errors:",
      availability: "Available for consulting missions, permanent positions or freelance in QA automation, Java/Spring Boot development or AI integration.",
      basedIn: "Based in Lille, France",
      openTo: "Open to remote & hybrid",
    },
    testimonials: {
      eyebrow: "Testimonials",
      title: "What my colleagues say",
      subtitle: "Feedback from collaborators I have worked with on real projects.",
      ctaQuestion: "Have you worked with me?",
      cta: "Leave a testimonial",
      modalTitle: "Leave a testimonial",
      labelName: "Name",
      labelRole: "Position",
      labelCompany: "Company",
      labelText: "Testimonial",
      placeholderName: "Marie L.",
      placeholderRole: "Tech Lead",
      placeholderCompany: "Company name",
      placeholderText: "Describe your experience working with Erick...",
      submit: "Send",
      sending: "Sending...",
      thankYouTitle: "Thank you for your testimonial!",
      thankYouBody: "It will be added to the site shortly.",
      errorMsg: "Send error. Please try again.",
      emptyState: "First testimonials coming soon.",
    },
    footer: {
      available: "Available · Lille, France · Remote OK",
      rights: "All rights reserved",
    },
  },

  es: {
    nav: {
      about: "Sobre mí",
      experience: "Experiencia",
      skills: "Skills",
      projects: "Proyectos",
      testimonials: "Testimonios",
      hobbies: "Aficiones",
      contact: "Contacto",
      downloadCv: "Descargar CV",
    },
    hero: {
      available: "Disponible para nuevas oportunidades",
      description: "Consultor IT en IBM. Experto en QA Automation (Playwright, UFT) e IA Generativa (certificado Claude 101 — Anthropic). Background Java/Spring Boot & APIs REST.",
      downloadCv: "Descargar CV",
      contactMe: "Contáctame",
      seeExperience: "Ver experiencia",
      terminalSuffix: "3/3 passed · IBM Consultant",
      scrollLabel: "Desplazarse hacia abajo",
    },
    stats: {
      missions: "misiones IBM",
      tools: "herramientas & tech",
      languages: "idiomas",
    },
    about: {
      eyebrow: "Sobre mí",
      title: "Del soporte IT a la IA —",
      titleAccent: "una trayectoria técnica",
      p1: "Consultor IT en IBM durante varios años, he forjado mi experiencia en entornos exigentes: sector bancario, e-commerce, lujo y retail. Mi perfil híbrido QA + Dev me permite comprender la calidad del software desde todos sus ángulos — desde la escritura del código hasta la validación de su comportamiento.",
      p2: "Convencido de que la calidad no es una fase sino una cultura, me involucro en la automatización inteligente, las buenas prácticas de testing y la integración de la IA generativa para flujos de trabajo más eficientes.",
      badges: [],
      journey: [
        { title: "Soporte IT e Infraestructura", desc: "Soporte de usuarios N1/N2, gestión de incidentes y administración de puestos Windows — bases sólidas antes de la transición al desarrollo." },
        { title: "Desarrollo Full Stack", desc: "Desarrollo de APIs Java/Spring Boot e interfaces Angular en contextos bancarios críticos — pruebas unitarias JUnit/Mockito y CI/CD." },
        { title: "QA Automation", desc: "Especialización en QA Automation — UFT, Playwright, Cucumber (BDD), Pact (contract testing) y Squash TM. Perfil híbrido QA/Dev al servicio de la calidad del software." },
        { title: "Inteligencia Artificial", desc: "Certificado Claude 101 (Anthropic) e IBM Generative & Agentic AI Foundation. Aplicación de la IA generativa en los workflows de calidad." },
        { title: "Aprendizaje Continuo", desc: "ClaudeEnergia, portfolio CV, formación Playwright — proyectos personales construidos con Claude Code, desplegados en Vercel, siempre en vigilancia tecnológica." },
      ],
    },
    experience: {
      eyebrow: "Experiencia",
      title: "Experiencia Profesional",
      subtitle: "Experiencias agrupadas por empleador — misiones de consultoría y compromisos directos.",
      items: [
        { id: 1, role: "Ingeniero de Automatización de Pruebas", description: "Mantenimiento evolutivo y correctivo de aplicaciones internas. Asegurar la calidad de las entregas mediante la automatización de pruebas, el mantenimiento de scripts existentes y la mejora continua de la estrategia de automatización.", responsibilities: ["Desarrollo, mantenimiento y ejecución de scripts de pruebas automatizadas con UFT.", "Planificación y ejecución de campañas de pruebas automatizadas en Squash, con corrección de pruebas en error.", "Configuración e implementación de una nueva matriz de pruebas automatizadas en Squash.", "Comunicación proactiva con los equipos funcionales, acompañamiento en la definición de criterios de aceptación e integración de sus comentarios en la estrategia de validación.", "Participación en revisiones de código, compartición de buenas prácticas UFT y contribución a los estándares de calidad del equipo.", "Producción y difusión de indicadores de calidad (tasa de cobertura, tasa de éxito de campañas, anomalías abiertas/cerradas) a los equipos de proyecto y dirección.", "Identificación y seguimiento de los riesgos relacionados con la automatización.", "Creación y actualización de la documentación técnica con Confluence."] },
        { id: 2, role: "Administrador M3", description: "Mantenimiento y evolución de una aplicación ERP en contexto de alto crecimiento. Equipo de 15 miembros, modelo híbrido ciclo en V.", responsibilities: ["Creación y gestión de usuarios a petición del cliente.", "Definición de roles y permisos.", "Instalación de actualizaciones de software y parches en entornos de receta, preproducción y producción para mantener el sistema seguro y actualizado.", "Creación y mantenimiento de documentación precisa de configuraciones del sistema, procedimientos y buenas prácticas."] },
        { id: 3, role: "Desarrollador Full Stack — Build (Biban)", description: "Creación de una aplicación en build que permite a un cliente abrir una segunda cuenta bancaria con gestión de aportación. Equipo de 9 miembros, modelo híbrido ciclo en V y Kanban.", responsibilities: ["Desarrollo de APIs backend con Spring Boot.", "Implementación de pruebas unitarias con JUnit y Mockito para garantizar la fiabilidad del código.", "Desarrollo de servicios frontend en Angular, incluyendo una funcionalidad para visualizar y seleccionar asesores bancarios.", "Seguimiento de la calidad y cobertura de código (>80%) con Sonar.", "Cumplimiento de principios CI/CD y validación de APIs con Postman.", "Análisis y resolución de incidentes en producción."] },
        { id: 4, role: "Desarrollador Full Stack — RUN (CLI)", description: "Mantenimiento y evoluciones de una aplicación utilizada por asesores bancarios para gestionar sus interacciones y servicios con clientes. Equipo de 15 miembros, organización híbrida ciclo en V y Kanban.", responsibilities: ["Desarrollo y mantenimiento de APIs backend con Spring Boot.", "Configuración de pruebas unitarias (JUnit, Mockito).", "Desarrollo de funcionalidades Angular, incluyendo un servicio de bloqueo de ficha cliente en caso de congelación de activos.", "Análisis y resolución de incidentes en producción.", "Seguimiento de cobertura de código (>80%) con Sonar.", "Participación en el proceso CI/CD."] },
        { id: 5, role: "Desarrollador Full Stack — Build (Succession)", description: "Creación de una aplicación en build que permite a un cliente gestionar sus derechos de sucesión a través de un formulario. Organización Agile Scrum con sprints de 3 semanas. Equipo de 7 miembros.", responsibilities: ["Desarrollo de APIs backend con Spring Boot.", "Implementación de pruebas unitarias con JUnit y Mockito.", "Seguimiento de la calidad y cobertura de código con Sonar.", "Desarrollo frontend Angular — visualización de documentos PDF en la interfaz de usuario.", "Participación en los rituales Agile y en el proceso CI/CD."] },
        { id: 6, role: "Ingeniero de Pruebas Técnico-Funcional", description: "Rediseño de una aplicación e-commerce con optimización del tiempo de respuesta en búsquedas de productos. Equipo de 8 miembros en Agile Scrum, sprints de 2 semanas.", responsibilities: ["Diseño y ejecución de pruebas backend y API con Postman, Newman e Insomnia; automatización de colecciones Postman integradas en el pipeline CI/CD con Newman.", "Implementación de pruebas contractuales Pact para las comunicaciones entre servicios a través de Kafka.", "Validación funcional de User Stories en colaboración con desarrolladores y Product Owners.", "Acompañamiento de los Product Owners en la definición de criterios de aceptación y estrategias de validación.", "Implementación de pruebas de comportamiento BDD con Cucumber y Spring Boot.", "Construcción y mantenimiento del repositorio de pruebas en Confluence y Xray.", "Análisis de flujos Kafka a gran escala con Elastic."] },
        { id: 7, role: "Desarrollador Front-end Angular", description: "Participación en el desarrollo de aplicaciones web en entorno Agile, en colaboración con usuarios y equipos de proyecto. Análisis de requisitos funcionales, desarrollo de interfaces de usuario y validación continua mediante retornos de los usuarios.", responsibilities: ["Recogida y análisis de necesidades de negocio", "Diseño y desarrollo de interfaces web con Angular", "Traducción de requisitos funcionales en soluciones técnicas", "Participación en ceremonias Agile y trabajo en equipo Scrum", "Validación funcional y pruebas de aceptación de usuarios (UAT)", "Mejora continua basada en los retornos de los usuarios", "Gestión del código fuente y colaboración con Git/GitHub", "Integración responsive con Bootstrap"] },
        { id: 8, role: "Técnico de Soporte Informático", description: "Asistencia y soporte informático de proximidad para los usuarios de Maisons du Monde. Gestión de incidentes y solicitudes de servicio, administración de puestos de trabajo y soporte de infraestructuras en entorno Windows.", responsibilities: ["Soporte a usuarios N1/N2 y gestión de incidentes", "Análisis, diagnóstico y resolución de problemas técnicos", "Gestión de tickets y seguimiento de solicitudes con EasyVista", "Administración y soporte de puestos de trabajo Windows 10", "Instalación, configuración y conexión en red de equipos informáticos", "Gestión y actualización de datos de usuarios", "Asistencia remota y acompañamiento a los usuarios", "Cumplimiento de procedimientos IT y mejora de la calidad de servicio"] },
        { id: 9, role: "Tesorero", description: "Gestión de proyectos asociativos y de solidaridad internacional: gestión presupuestaria, coordinación de equipos de voluntarios e implementación de acciones colectivas de sensibilización (eventos culturales, talleres pedagógicos, debates y animaciones participativas).", responsibilities: ["Gestión presupuestaria y seguimiento financiero de proyectos", "Coordinación y supervisión de equipos de voluntarios", "Gestión de proyectos y movilización de partes interesadas", "Animación de reuniones y talleres participativos", "Comunicación, sensibilización y comunicación pública", "Pedagogía, facilitación y trabajo colaborativo", "Organización de eventos y acciones de solidaridad internacional"] },
        { id: 10, role: "Responsable de Misión Derechos Humanos", description: "Coordinación del trabajo con ONG en Bruselas. Redacción de informes económicos, actas, newsletters y organización de eventos.", responsibilities: ["Coordinación de alianzas con ONG en Bruselas", "Redacción de informes económicos, notas de síntesis y newsletters", "Organización y gestión de eventos", "Animación y movilización de una red de socios a distancia", "Coordinación de proyectos y comunicación con las partes interesadas"] },
      ],
    },
    skills: {
      eyebrow: "Habilidades",
      title: "Stack Técnico",
      subtitle: "Experiencia construida en proyectos reales en entornos críticos.",
      categories: {
        "Test Automation": "Automatización de Pruebas",
        "Backend": "Backend",
        "Frontend": "Frontend",
        "DevOps & Outils": "DevOps & Herramientas",
        "Intelligence Artificielle": "Inteligencia Artificial",
      },
      categoryDesc: {
        "Test Automation": "Frameworks y herramientas de pruebas automatizadas",
        "Backend": "APIs, servicios y persistencia",
        "Frontend": "Interfaces y componentes",
        "DevOps & Outils": "CI/CD, versionado y monitoreo",
        "Intelligence Artificielle": "LLMs, agentes y prompt engineering",
      },
    },
    projects: {
      eyebrow: "Proyectos",
      title: "Proyectos Personales",
      subtitle: "Side projects construidos para explorar nuevas tecnologías y resolver problemas reales.",
      items: [
        { id: 0, title: "ClaudeEnergia — Dashboard HC/HP", description: "Dashboard de análisis energético Horas Valle / Horas Punta. Visualización de costos, gráficos interactivos y optimización del consumo. Construido con Claude Code y desplegado en Vercel." },
        { id: 1, title: "Portfolio CV — Erick Franco", description: "Este sitio web — portfolio profesional construido con Next.js, Tailwind CSS y TypeScript. Tests E2E Playwright con patrón POM, formulario de contacto con Resend, desplegado en Vercel." },
        { id: 1000, title: "Formación Playwright — Tests E2E", description: "Proyecto realizado en el marco de una formación en automatización de pruebas. Cobertura end-to-end, gestión de selectores, aserciones avanzadas y buenas prácticas QA con Playwright." },
        { id: 3, title: "Home Assistant Smart Home", description: "Domótica completa con Home Assistant, integraciones de IA para rutinas inteligentes." },
      ],
    },
    contact: {
      eyebrow: "Contacto",
      title: "Trabajemos juntos",
      subtitle: "Una oportunidad, un proyecto, una pregunta — respondo en menos de 24h.",
      labelName: "Nombre",
      labelEmail: "Email",
      labelCompany: "Empresa",
      labelMessage: "Mensaje",
      placeholderName: "Juan García",
      placeholderEmail: "juan@empresa.com",
      placeholderCompany: "Nombre de tu empresa",
      placeholderMessage: "Describe tu necesidad u oportunidad...",
      submit: "Enviar mensaje",
      sending: "Enviando...",
      sentTitle: "¡Mensaje enviado!",
      sentBody: "Te responderé en menos de 24h.",
      sendAnother: "Enviar otro mensaje",
      errorMsg: "Error de envío. Inténtalo de nuevo o contáctame directamente por email.",
      emailInvalid: "Dirección de correo inválida.",
      emailRequired: "Este campo es obligatorio.",
      errorsTitle: "Por favor corrija los siguientes errores:",
      availability: "Disponible para misiones en ESN, puestos en CDI o freelance en QA automation, desarrollo Java/Spring Boot o integración de IA.",
      basedIn: "Basado en Lille, Francia",
      openTo: "Abierto a remoto e híbrido",
    },
    testimonials: {
      eyebrow: "Testimonios",
      title: "Lo que dicen mis colegas",
      subtitle: "Comentarios de colaboradores con quienes he trabajado en proyectos reales.",
      ctaQuestion: "¿Has trabajado conmigo?",
      cta: "Dejar un testimonio",
      modalTitle: "Dejar un testimonio",
      labelName: "Nombre",
      labelRole: "Puesto",
      labelCompany: "Empresa",
      labelText: "Testimonio",
      placeholderName: "Marie L.",
      placeholderRole: "Tech Lead",
      placeholderCompany: "Nombre de la empresa",
      placeholderText: "Describe tu experiencia trabajando con Erick...",
      submit: "Enviar",
      sending: "Enviando...",
      thankYouTitle: "¡Gracias por tu testimonio!",
      thankYouBody: "Se añadirá al sitio en breve.",
      errorMsg: "Error de envío. Inténtalo de nuevo.",
      emptyState: "Los primeros testimonios llegan pronto.",
    },
    footer: {
      available: "Disponible · Lille, Francia · Remote OK",
      rights: "Todos los derechos reservados",
    },
  },
};
