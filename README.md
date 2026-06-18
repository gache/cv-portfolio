# Erick Franco — Portfolio

Portfolio **QA Automation Engineer & AI Enthusiast** — Consultant IBM.
Construit avec Next.js 15, déployé sur Vercel.

**Live:** https://cv-portfolio-sable.vercel.app

## Stack

| Technologie | Usage |
|---|---|
| Next.js 15 + TypeScript | Framework, App Router |
| Tailwind CSS | Design system (tokens custom) |
| Vercel KV (Upstash Redis) | Témoignages — stockage et modération |
| Resend | Formulaire de contact + emails de modération |
| Playwright | Tests E2E |
| Vercel Analytics | Tracking anonyme |

## Démarrage

```bash
npm install
cp .env.local.example .env.local  # remplir les variables
npm run dev                         # localhost:3000
```

## Variables d'environnement

| Variable | Obligatoire | Description |
|---|---|---|
| `RESEND_API_KEY` | ✅ | Clé API Resend — formulaire contact + emails modération |
| `KV_REST_API_URL` | ✅ | URL Upstash Redis (Vercel KV) |
| `KV_REST_API_TOKEN` | ✅ | Token Upstash Redis |
| `KV_REST_API_READ_ONLY_TOKEN` | ✅ | Token lecture seule |
| `KV_URL` | ✅ | URL Redis complète |
| `ADMIN_SECRET` | ✅ | Secret pour l'API admin des témoignages |
| `NEXT_PUBLIC_BASE_URL` | ✅ | URL de production (ex: https://cv-portfolio-sable.vercel.app) |

## Fonctionnalités

**Multilingue** — FR / EN / ES via `lib/i18n/translations.ts`. Tout le contenu est dans `data/cv.ts`.

**Témoignages avec modération**
1. Visiteur soumet un témoignage via le formulaire
2. Email reçu à `erickfrancodelgado@hotmail.com` avec liens Approuver / Rejeter (valides 72h)
3. Approbation → stocké dans KV → visible sur le site

**API admin témoignages** — protégée par `Authorization: Bearer <ADMIN_SECRET>` :
```bash
# Lister les témoignages approuvés
curl -H "Authorization: Bearer $ADMIN_SECRET" \
  https://cv-portfolio-sable.vercel.app/api/admin/testimonials

# Supprimer par index
curl -X DELETE -H "Authorization: Bearer $ADMIN_SECRET" \
  "https://cv-portfolio-sable.vercel.app/api/admin/testimonials?index=0"

# Supprimer tous
curl -X DELETE -H "Authorization: Bearer $ADMIN_SECRET" \
  "https://cv-portfolio-sable.vercel.app/api/admin/testimonials?all=true"
```

## Contenu

Tout le contenu est centralisé dans [`data/cv.ts`](data/cv.ts) — expériences, skills, projets, certifications.
Les traductions sont dans [`lib/i18n/translations.ts`](lib/i18n/translations.ts).

## Tests E2E

```bash
npx playwright install chromium   # première fois
npm run test                       # lancer les tests (serveur dev requis)
npm run test:ui                    # mode interactif
npm run test:report                # rapport HTML
```

## Commandes

```bash
npm run dev      # Dev server localhost:3000
npm run build    # Build production
npm run lint     # ESLint
```
