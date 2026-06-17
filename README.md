# Portfolio — Erick Franco Delgado

Portfolio professionnel **QA Automation Engineer & Java Spring Boot Developer**, construit avec Next.js 15 et déployé sur Vercel.

## Stack

- **Next.js 15** + TypeScript + Tailwind CSS
- **Framer Motion** — animations scroll-triggered
- **Resend** — formulaire de contact par email
- **Playwright** — tests E2E avec pattern Page Object Model

## Démarrage

```bash
npm install
cp .env.local.example .env.local  # Ajouter RESEND_API_KEY
npm run dev
```

## Tests E2E

```bash
npx playwright install chromium   # première fois seulement
npm run test                       # lancer les tests
npm run test:ui                    # mode interactif
npm run test:report                # rapport HTML
```

Structure POM dans `tests/e2e/pages/`.

## Variables d'environnement

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | Clé API Resend pour le formulaire de contact |

## Déploiement

Connecter le repo à [Vercel](https://vercel.com) et ajouter `RESEND_API_KEY` dans les variables d'environnement du projet.

## Contenu

Toutes les données (expériences, skills, projets, certifications) sont centralisées dans `data/cv.ts`.
