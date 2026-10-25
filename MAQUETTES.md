# Refonte du portfolio — maquettes & reprise

Note de reprise de la session Claude du 24-25/10/2026 : à lire (ou à donner à Claude) pour reprendre le travail depuis un autre PC.

## Objectif

Portfolio de Lyam Mafray-Lizé pour trouver une **alternance Mastère IA & Data (EPSI Rennes, 2 ans, rentrée sept. 2027)**, et pour l'activité freelance (automatisation IA, Malt).

Idée retenue : plusieurs sous-domaines, chacun avec un angle, mais **chaque page contient tout le contenu** (rien n'est retiré) :

| Domaine | Angle | Maquette(s) retenue(s) |
|---|---|---|
| `lyamml.fr` | général + freelance | **INNOV B** (canvas infini) — candidate pour devenir la page d'accueil |
| `dev.lyamml.fr` | développement | **DEV A** (terminal) · **DEV B** (IDE) |
| `data.lyamml.fr` | data / ML | **DATA A** (notebook pandas) |
| `ai.lyamml.fr` | LLMs / embeddings | à refaire (les maquettes IA ont été écartées) |
| — | expérimental | **INNOV C** (typo cinétique + physique) |

## Lancer en local

```bash
npm install
npm run dev
```

Puis ouvrir (le port peut être 5173 ou 5174) :

- `/dev/a.html` — terminal, une « session » par section dans la barre latérale (← → ou 1-0)
- `/dev/b.html` — IDE : explorateur, onglets, `Ctrl+P`
- `/data/a.html` — notebook : les cellules s'exécutent au clic (ou `Shift+Entrée`, « Exécuter tout »)
- `/x/b.html` — canvas infini : zones, zoom sémantique, visite guidée, recherche `Ctrl+K`, mode liste, aperçu live des projets, thème sombre
- `/x/c.html` — typo variable réactive au curseur, compétences en physique (Matter.js), projets en scroll horizontal

Le site actuel (`index.html`, `projets.html`) n'a pas été modifié.

## Fichiers

- `data.js` — **source unique du contenu** (profil, recherche, expériences, formations, compétences, soft skills, langues, certifications, projets, services freelance, liens des sous-domaines). Toutes les maquettes le lisent.
- `lab/cert-viewer.js` — visionneuse partagée des certifications (PNG Kaggle / PDF DataCamp) via `data-cert`.
- `lab-switcher.js` — barre de navigation entre maquettes, **à retirer** en production.
- `dev/`, `data/`, `x/` — les maquettes.
- `.claude/launch.json` — config du serveur Vite pour l'app Claude.

## À compléter dans `data.js` (marqué TODO)

- Kenavhome : intitulé exact du poste, missions, stack.
- Rythme école / entreprise du Mastère.
- Lien du CV PDF et du profil Malt.
- Dates approximatives à confirmer : début du freelance (mis à 2025-01), année des projets.

## Retours de Lyam à respecter

- Mettre en avant le **contenu** (skills, langues, soft skills, certifs, projets), pas de phrases creuses.
- Les notebooks doivent être **lancés par le visiteur**, pas s'exécuter seuls.
- Pas de longues pages à scroller pour les vues « outil » : vraies pages/onglets (IDE, terminal).
- Chercher des designs originaux, pas le style « portfolio Claude » habituel.

## Pistes suivantes

1. Faire d'INNOV B la page d'accueil (`index.html`) et retirer `lab-switcher.js`.
2. Créer une nouvelle maquette pour `ai.lyamml.fr`.
3. Prévoir le build multi-pages / multi-sous-domaines (Vite `rollupOptions.input`, Nginx, Docker).
4. Vérifier sur un vrai navigateur les animations (physique INNOV C, visite guidée INNOV B) et l'aperçu live en iframe des projets.
