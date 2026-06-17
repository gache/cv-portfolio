export type Lang = "fr" | "en" | "es";

export type T = {
  nav: {
    about: string;
    experience: string;
    skills: string;
    projects: string;
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
    placeholderCompany: string;
    placeholderMessage: string;
    submit: string;
    sending: string;
    sentTitle: string;
    sentBody: string;
    errorMsg: string;
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
      contact: "Contact",
      downloadCv: "Télécharger CV",
    },
    hero: {
      available: "Disponible pour de nouvelles missions",
      description: "Plus de 10 ans d'expérience en IT. Spécialisé en automatisation de tests, Java, Spring Boot, APIs REST, Playwright, IA Générative et développement Full Stack.",
      downloadCv: "Télécharger CV",
      contactMe: "Me contacter",
      seeExperience: "Voir l'expérience",
      terminalSuffix: "3/3 passed · 10+ ans d'expérience",
      scrollLabel: "Défiler vers le bas",
    },
    about: {
      eyebrow: "À propos",
      title: "Du support IT à l'IA —",
      titleAccent: "une trajectoire technique",
      p1: "Consultant IT chez IBM depuis plusieurs années, j'ai forgé mon expertise dans des environnements exigeants : secteur bancaire, e-commerce, luxe et retail. Mon profil hybride QA + Dev me permet de comprendre la qualité logicielle sous tous ses angles — de l'écriture du code à la validation de son comportement.",
      p2: "Convaincu que la qualité n'est pas une phase mais une culture, je m'investis dans l'automatisation intelligente, les bonnes pratiques de testing et l'intégration de l'IA générative pour des workflows plus efficaces.",
      badges: ["ISTQB", "IBM Certified", "Agile / Scrum", "BDD", "CI/CD"],
      journey: [
        { title: "Support IT & Infrastructure", desc: "Début de carrière dans le support technique et l'administration système — bases solides en IT." },
        { title: "Développement Full Stack", desc: "Évolution vers le développement Java/Spring Boot et Angular dans des contextes bancaires critiques." },
        { title: "QA Automation", desc: "Spécialisation en automatisation de tests — UFT, Playwright, Cucumber, BDD, contract testing." },
        { title: "Intelligence Artificielle", desc: "Intégration de l'IA générative dans les workflows : prompt engineering, agents autonomes, IBM AI." },
        { title: "Apprentissage continu", desc: "Certifications, side projects, veille techno — toujours en mouvement." },
      ],
    },
    experience: {
      eyebrow: "Expérience",
      title: "Parcours professionnel",
      subtitle: "Expériences regroupées par employeur — missions ESN et engagements directs.",
      items: [
        { id: 1, role: "Testeur Automaticien", description: "Maintenance évolutive et corrective d'applications internes. Automatisation des tests et création de nouveaux cas de test pour assurer la qualité des livraisons.", responsibilities: ["Développement, maintenance et exécution de scripts de tests automatisés avec UFT", "Planification et exécution des campagnes de tests via Squash, correction des tests en erreur", "Configuration d'une nouvelle matrice de tests automatisés dans Squash", "Communication proactive avec les équipes fonctionnelles, définition des critères d'acceptation", "Production et diffusion des indicateurs qualité (taux de couverture, taux de réussite)", "Création et mise à jour de la documentation technique avec Confluence"] },
        { id: 2, role: "Administrateur M3", description: "Maintenance et évolution d'une application ERP dans un contexte de forte croissance. Équipe de 15 membres, modèle hybride cycle en V.", responsibilities: ["Création et gestion des utilisateurs à la demande du client", "Définition des rôles et des permissions", "Installation des mises à jour logicielles sur les environnements de recette, préproduction et production", "Création et maintien de la documentation des configurations système"] },
        { id: 3, role: "Développeur Full Stack — Build (Biban)", description: "Création d'une application permettant à un client d'ouvrir un second compte bancaire avec gestion d'un apport. Équipe de 9 membres, modèle hybride cycle en V et Kanban.", responsibilities: ["Développement des API backend avec Spring Boot", "Implémentation de tests unitaires avec JUnit et Mockito (couverture >80%)", "Développement de services frontend en Angular", "Respect des principes CI/CD et validation des API via Postman", "Analyse et résolution d'incidents en production"] },
        { id: 4, role: "Développeur Full Stack — RUN (CLI)", description: "Maintenance et évolutions d'une application utilisée par les conseillers bancaires pour gérer leurs interactions et services clients. Équipe de 15 membres.", responsibilities: ["Développement et maintenance d'API backend avec Spring Boot", "Mise en place de tests unitaires JUnit/Mockito", "Développement de fonctionnalités Angular", "Suivi de la couverture de code >80% avec Sonar", "Participation au processus CI/CD"] },
        { id: 5, role: "Développeur Full Stack — Build (Succession)", description: "Création d'une application permettant à un client de gérer ses droits de succession via un formulaire. Organisation Agile Scrum avec sprints de 3 semaines.", responsibilities: ["Développement des API backend avec Spring Boot", "Implémentation de tests unitaires avec JUnit et Mockito", "Développement frontend Angular — affichage de documents PDF", "Participation aux rituels Agile et au processus CI/CD"] },
        { id: 6, role: "Testeur Technico-Fonctionnel", description: "Refonte d'une application e-commerce avec optimisation du temps de réponse lors des recherches. Équipe de 8 membres en Agile Scrum.", responsibilities: ["Tests backend et API via Postman, Newman et Insomnia", "Automatisation des collections Postman intégrées au pipeline CI/CD via Newman", "Implémentation de tests contractuels Pact pour communications interservices Kafka", "Tests comportementaux BDD avec Cucumber et Spring Boot", "Constitution et maintenance du référentiel de tests dans Confluence et Xray", "Analyse des flux Kafka avec Elastic"] },
        { id: 7, role: "Développeur Front-end Angular", description: "Mission de développement front-end chez Auchan Retail à Villeneuve d'Ascq. Recueil des besoins utilisateurs et développement en mode Agile avec feedback continu.", responsibilities: ["Recueil des besoins des utilisateurs et définition de la solution", "Réponse au cahier des charges du client", "Tests réguliers avec les utilisateurs pour feedback immédiat"] },
        { id: 8, role: "Technicien Support Informatique", description: "Support informatique pour Maisons du Monde via Modis à Lille. Identification, analyse et traitement des demandes utilisateurs sur un parc informatique Windows 10.", responsibilities: ["Identifier, analyser et traiter les demandes des utilisateurs", "Saisie et gestion des données", "Mise en réseau des matériels informatiques"] },
        { id: 9, role: "Trésorier", description: "Gestion des comptes et élaboration des budgets. Mise en place d'actions collectives et participatives avec des bénévoles autour de la solidarité internationale.", responsibilities: ["Gestion des comptes et élaboration des budgets", "Animation de réunions et prise de parole en public", "Gestion d'un groupe de bénévoles", "Organisation d'actions autour de la solidarité internationale"] },
        { id: 10, role: "Chargé de Mission Droits Humains", description: "Coordination du travail avec des ONG à Bruxelles. Rédaction de rapports économiques, comptes rendus, newsletters et organisation d'événements.", responsibilities: ["Coordination avec des ONG partenaires", "Rédaction de rapports économiques, comptes rendus et newsletters", "Organisation d'événements", "Mobilisation du réseau de l'organisation à distance"] },
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
      placeholderCompany: "Nom de votre entreprise",
      placeholderMessage: "Décrivez votre besoin ou opportunité...",
      submit: "Envoyer le message",
      sending: "Envoi...",
      sentTitle: "Message envoyé !",
      sentBody: "Je vous réponds dans les 24h.",
      errorMsg: "Erreur d'envoi. Réessayez ou contactez-moi directement par email.",
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
      labelName: "Nom *",
      labelRole: "Poste *",
      labelCompany: "Entreprise",
      labelText: "Témoignage *",
      placeholderName: "Marie L.",
      placeholderRole: "Tech Lead",
      placeholderCompany: "Nom de l'entreprise",
      placeholderText: "Décris ton expérience de travail avec Erick...",
      submit: "Envoyer",
      sending: "Envoi...",
      thankYouTitle: "Merci pour ton témoignage !",
      thankYouBody: "Il sera ajouté au site prochainement.",
      errorMsg: "Erreur d'envoi. Réessayez.",
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
      contact: "Contact",
      downloadCv: "Download CV",
    },
    hero: {
      available: "Available for new opportunities",
      description: "10+ years of IT experience. Specialized in test automation, Java, Spring Boot, REST APIs, Playwright, Generative AI and Full Stack development.",
      downloadCv: "Download CV",
      contactMe: "Contact me",
      seeExperience: "View experience",
      terminalSuffix: "3/3 passed · 10+ years of experience",
      scrollLabel: "Scroll down",
    },
    about: {
      eyebrow: "About",
      title: "From IT support to AI —",
      titleAccent: "a technical journey",
      p1: "IT Consultant at IBM for several years, I have built my expertise in demanding environments: banking, e-commerce, luxury and retail. My hybrid QA + Dev profile allows me to understand software quality from every angle — from writing code to validating its behavior.",
      p2: "Convinced that quality is not a phase but a culture, I invest in intelligent automation, testing best practices and the integration of generative AI for more efficient workflows.",
      badges: ["ISTQB", "IBM Certified", "Agile / Scrum", "BDD", "CI/CD"],
      journey: [
        { title: "IT Support & Infrastructure", desc: "Career start in technical support and system administration — solid IT foundations." },
        { title: "Full Stack Development", desc: "Evolution towards Java/Spring Boot and Angular development in critical banking contexts." },
        { title: "QA Automation", desc: "Specialization in test automation — UFT, Playwright, Cucumber, BDD, contract testing." },
        { title: "Artificial Intelligence", desc: "Integration of generative AI into workflows: prompt engineering, autonomous agents, IBM AI." },
        { title: "Continuous Learning", desc: "Certifications, side projects, tech watch — always moving forward." },
      ],
    },
    experience: {
      eyebrow: "Experience",
      title: "Professional Experience",
      subtitle: "Experiences grouped by employer — consulting missions and direct engagements.",
      items: [
        { id: 1, role: "Test Automation Engineer", description: "Evolutionary and corrective maintenance of internal applications. Test automation and creation of new test cases to ensure delivery quality.", responsibilities: ["Development, maintenance and execution of automated test scripts with UFT", "Planning and execution of test campaigns via Squash, correction of failing tests", "Configuration of a new automated test matrix in Squash", "Proactive communication with functional teams, definition of acceptance criteria", "Production and distribution of quality indicators (coverage rate, success rate)", "Creation and maintenance of technical documentation with Confluence"] },
        { id: 2, role: "M3 Administrator", description: "Maintenance and evolution of an ERP application in a high-growth context. 15-member team, hybrid V-model.", responsibilities: ["User creation and management at client request", "Definition of roles and permissions", "Software update installation on staging, pre-production and production environments", "Creation and maintenance of system configuration documentation"] },
        { id: 3, role: "Full Stack Developer — Build (Biban)", description: "Creation of an application allowing a client to open a second bank account with contribution management. 9-member team, hybrid V-model and Kanban.", responsibilities: ["Backend API development with Spring Boot", "Unit test implementation with JUnit and Mockito (>80% coverage)", "Frontend service development in Angular", "CI/CD principles compliance and API validation via Postman", "Production incident analysis and resolution"] },
        { id: 4, role: "Full Stack Developer — RUN (CLI)", description: "Maintenance and evolution of an application used by bank advisors to manage client interactions and services. 15-member team.", responsibilities: ["Backend API development and maintenance with Spring Boot", "Unit test setup with JUnit/Mockito", "Angular feature development", "Code coverage tracking >80% with Sonar", "Participation in CI/CD process"] },
        { id: 5, role: "Full Stack Developer — Build (Succession)", description: "Creation of an application allowing a client to manage inheritance rights via a form. Agile Scrum organization with 3-week sprints.", responsibilities: ["Backend API development with Spring Boot", "Unit test implementation with JUnit and Mockito", "Angular frontend development — PDF document display", "Participation in Agile rituals and CI/CD process"] },
        { id: 6, role: "Technical-Functional Test Engineer", description: "Redesign of an e-commerce application with optimization of search response time. 8-member Agile Scrum team.", responsibilities: ["Backend and API testing via Postman, Newman and Insomnia", "Automation of Postman collections integrated into CI/CD pipeline via Newman", "Implementation of Pact contract tests for inter-service Kafka communications", "BDD behavioral tests with Cucumber and Spring Boot", "Construction and maintenance of test repository in Confluence and Xray", "Kafka stream analysis with Elastic"] },
        { id: 7, role: "Angular Front-end Developer", description: "Front-end development mission at Auchan Retail in Villeneuve d'Ascq. User requirements gathering and Agile development with continuous feedback.", responsibilities: ["User requirements gathering and solution definition", "Response to client specification documents", "Regular user testing for immediate feedback"] },
        { id: 8, role: "IT Support Technician", description: "IT support for Maisons du Monde via Modis in Lille. Identification, analysis and processing of user requests on a Windows 10 infrastructure.", responsibilities: ["Identify, analyze and process user requests", "Data entry and management", "Computer hardware networking"] },
        { id: 9, role: "Treasurer", description: "Account management and budget preparation. Implementation of collective and participatory actions with volunteers around international solidarity.", responsibilities: ["Account management and budget preparation", "Meeting facilitation and public speaking", "Volunteer group management", "Organization of actions around international solidarity"] },
        { id: 10, role: "Human Rights Project Officer", description: "Coordination of work with NGOs in Brussels. Writing economic reports, minutes, newsletters and organizing events.", responsibilities: ["Coordination with partner NGOs", "Writing economic reports, minutes and newsletters", "Event organization", "Remote mobilization of the organization's network"] },
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
      placeholderCompany: "Your company name",
      placeholderMessage: "Describe your need or opportunity...",
      submit: "Send message",
      sending: "Sending...",
      sentTitle: "Message sent!",
      sentBody: "I will reply within 24h.",
      errorMsg: "Send error. Please try again or contact me directly by email.",
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
      labelName: "Name *",
      labelRole: "Position *",
      labelCompany: "Company",
      labelText: "Testimonial *",
      placeholderName: "Marie L.",
      placeholderRole: "Tech Lead",
      placeholderCompany: "Company name",
      placeholderText: "Describe your experience working with Erick...",
      submit: "Send",
      sending: "Sending...",
      thankYouTitle: "Thank you for your testimonial!",
      thankYouBody: "It will be added to the site shortly.",
      errorMsg: "Send error. Please try again.",
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
      contact: "Contacto",
      downloadCv: "Descargar CV",
    },
    hero: {
      available: "Disponible para nuevas oportunidades",
      description: "Más de 10 años de experiencia en IT. Especializado en automatización de pruebas, Java, Spring Boot, APIs REST, Playwright, IA Generativa y desarrollo Full Stack.",
      downloadCv: "Descargar CV",
      contactMe: "Contáctame",
      seeExperience: "Ver experiencia",
      terminalSuffix: "3/3 passed · 10+ años de experiencia",
      scrollLabel: "Desplazarse hacia abajo",
    },
    about: {
      eyebrow: "Sobre mí",
      title: "Del soporte IT a la IA —",
      titleAccent: "una trayectoria técnica",
      p1: "Consultor IT en IBM durante varios años, he forjado mi experiencia en entornos exigentes: sector bancario, e-commerce, lujo y retail. Mi perfil híbrido QA + Dev me permite comprender la calidad del software desde todos sus ángulos — desde la escritura del código hasta la validación de su comportamiento.",
      p2: "Convencido de que la calidad no es una fase sino una cultura, me involucro en la automatización inteligente, las buenas prácticas de testing y la integración de la IA generativa para flujos de trabajo más eficientes.",
      badges: ["ISTQB", "IBM Certified", "Agile / Scrum", "BDD", "CI/CD"],
      journey: [
        { title: "Soporte IT e Infraestructura", desc: "Inicio de carrera en soporte técnico y administración de sistemas — bases sólidas en IT." },
        { title: "Desarrollo Full Stack", desc: "Evolución hacia el desarrollo Java/Spring Boot y Angular en contextos bancarios críticos." },
        { title: "QA Automation", desc: "Especialización en automatización de pruebas — UFT, Playwright, Cucumber, BDD, contract testing." },
        { title: "Inteligencia Artificial", desc: "Integración de la IA generativa en los workflows: prompt engineering, agentes autónomos, IBM AI." },
        { title: "Aprendizaje Continuo", desc: "Certificaciones, proyectos personales, vigilancia tecnológica — siempre en movimiento." },
      ],
    },
    experience: {
      eyebrow: "Experiencia",
      title: "Experiencia Profesional",
      subtitle: "Experiencias agrupadas por empleador — misiones de consultoría y compromisos directos.",
      items: [
        { id: 1, role: "Ingeniero de Automatización de Pruebas", description: "Mantenimiento evolutivo y correctivo de aplicaciones internas. Automatización de pruebas y creación de nuevos casos de prueba para asegurar la calidad de las entregas.", responsibilities: ["Desarrollo, mantenimiento y ejecución de scripts de pruebas automatizadas con UFT", "Planificación y ejecución de campañas de pruebas en Squash, corrección de pruebas en error", "Configuración de una nueva matriz de pruebas automatizadas en Squash", "Comunicación proactiva con los equipos funcionales, definición de criterios de aceptación", "Producción y difusión de indicadores de calidad (tasa de cobertura, tasa de éxito)", "Creación y actualización de la documentación técnica con Confluence"] },
        { id: 2, role: "Administrador M3", description: "Mantenimiento y evolución de una aplicación ERP en contexto de alto crecimiento. Equipo de 15 miembros, modelo híbrido ciclo en V.", responsibilities: ["Creación y gestión de usuarios a petición del cliente", "Definición de roles y permisos", "Instalación de actualizaciones de software en entornos de receta, preproducción y producción", "Creación y mantenimiento de la documentación de configuraciones del sistema"] },
        { id: 3, role: "Desarrollador Full Stack — Build (Biban)", description: "Creación de una aplicación que permite a un cliente abrir una segunda cuenta bancaria con gestión de aportación. Equipo de 9 miembros, modelo híbrido ciclo en V y Kanban.", responsibilities: ["Desarrollo de APIs backend con Spring Boot", "Implementación de pruebas unitarias con JUnit y Mockito (cobertura >80%)", "Desarrollo de servicios frontend en Angular", "Cumplimiento de principios CI/CD y validación de APIs con Postman", "Análisis y resolución de incidentes en producción"] },
        { id: 4, role: "Desarrollador Full Stack — RUN (CLI)", description: "Mantenimiento y evoluciones de una aplicación utilizada por asesores bancarios para gestionar sus interacciones y servicios con clientes. Equipo de 15 miembros.", responsibilities: ["Desarrollo y mantenimiento de APIs backend con Spring Boot", "Configuración de pruebas unitarias JUnit/Mockito", "Desarrollo de funcionalidades Angular", "Seguimiento de cobertura de código >80% con Sonar", "Participación en el proceso CI/CD"] },
        { id: 5, role: "Desarrollador Full Stack — Build (Succession)", description: "Creación de una aplicación que permite a un cliente gestionar sus derechos de sucesión a través de un formulario. Organización Agile Scrum con sprints de 3 semanas.", responsibilities: ["Desarrollo de APIs backend con Spring Boot", "Implementación de pruebas unitarias con JUnit y Mockito", "Desarrollo frontend Angular — visualización de documentos PDF", "Participación en los rituales Agile y en el proceso CI/CD"] },
        { id: 6, role: "Ingeniero de Pruebas Técnico-Funcional", description: "Rediseño de una aplicación e-commerce con optimización del tiempo de respuesta en búsquedas. Equipo de 8 miembros en Agile Scrum.", responsibilities: ["Pruebas backend y API con Postman, Newman e Insomnia", "Automatización de colecciones Postman integradas en el pipeline CI/CD con Newman", "Implementación de pruebas contractuales Pact para comunicaciones entre servicios Kafka", "Pruebas de comportamiento BDD con Cucumber y Spring Boot", "Construcción y mantenimiento del repositorio de pruebas en Confluence y Xray", "Análisis de flujos Kafka con Elastic"] },
        { id: 7, role: "Desarrollador Front-end Angular", description: "Misión de desarrollo front-end en Auchan Retail en Villeneuve d'Ascq. Recogida de requisitos de usuario y desarrollo en modo Agile con feedback continuo.", responsibilities: ["Recogida de necesidades de los usuarios y definición de la solución", "Respuesta al pliego de condiciones del cliente", "Pruebas regulares con los usuarios para feedback inmediato"] },
        { id: 8, role: "Técnico de Soporte Informático", description: "Soporte informático para Maisons du Monde a través de Modis en Lille. Identificación, análisis y tratamiento de solicitudes de usuarios en un parque informático Windows 10.", responsibilities: ["Identificar, analizar y tratar las solicitudes de los usuarios", "Entrada y gestión de datos", "Conexión en red de equipos informáticos"] },
        { id: 9, role: "Tesorero", description: "Gestión de cuentas y elaboración de presupuestos. Implementación de acciones colectivas y participativas con voluntarios en torno a la solidaridad internacional.", responsibilities: ["Gestión de cuentas y elaboración de presupuestos", "Animación de reuniones y comunicación pública", "Gestión de un grupo de voluntarios", "Organización de acciones en torno a la solidaridad internacional"] },
        { id: 10, role: "Responsable de Misión Derechos Humanos", description: "Coordinación del trabajo con ONG en Bruselas. Redacción de informes económicos, actas, newsletters y organización de eventos.", responsibilities: ["Coordinación con ONG asociadas", "Redacción de informes económicos, actas y newsletters", "Organización de eventos", "Movilización a distancia de la red de la organización"] },
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
      placeholderCompany: "Nombre de tu empresa",
      placeholderMessage: "Describe tu necesidad u oportunidad...",
      submit: "Enviar mensaje",
      sending: "Enviando...",
      sentTitle: "¡Mensaje enviado!",
      sentBody: "Te responderé en menos de 24h.",
      errorMsg: "Error de envío. Inténtalo de nuevo o contáctame directamente por email.",
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
      labelName: "Nombre *",
      labelRole: "Puesto *",
      labelCompany: "Empresa",
      labelText: "Testimonio *",
      placeholderName: "Marie L.",
      placeholderRole: "Tech Lead",
      placeholderCompany: "Nombre de la empresa",
      placeholderText: "Describe tu experiencia trabajando con Erick...",
      submit: "Enviar",
      sending: "Enviando...",
      thankYouTitle: "¡Gracias por tu testimonio!",
      thankYouBody: "Se añadirá al sitio en breve.",
      errorMsg: "Error de envío. Inténtalo de nuevo.",
    },
    footer: {
      available: "Disponible · Lille, Francia · Remote OK",
      rights: "Todos los derechos reservados",
    },
  },
};
