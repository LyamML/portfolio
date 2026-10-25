// ── Données de DEV C (terminal) ──────────────────────────────────
// Le contenu factuel vient de /data.js (source unique) et est remis
// au format attendu par c.html / c-term.js. Seuls les éléments propres
// à cette maquette vivent ici : familles de compétences, extraits de
// code, notions des certifications et visionneuse.
import * as D from '/data.js';

const kenav = D.EXPERIENCES.find(e => e.id === 'kenavhome');
const freelance = D.EXPERIENCES.find(e => e.id === 'freelance');
const cda = D.EDUCATION.find(e => e.current);

export const PROFILE = {
    name: D.fullName,
    pitch: D.PROFILE.pitch.main,
    school: cda.title,
    schoolPlace: cda.school,
    company: kenav.company,
    companyUrl: kenav.companyUrl,
    companyDesc: kenav.companyDesc,
    freelance: `${freelance.role} sur ${freelance.company}, depuis ${freelance.start.slice(0, 4)}`,
    email: D.PROFILE.email,
    phone: D.PROFILE.phone,
    phoneHref: D.PROFILE.phoneHref,
    github: D.PROFILE.github,
    linkedin: D.PROFILE.linkedin,
    location: D.PROFILE.city,
};

const S = D.SEARCH;
export const SEARCH = {
    title: S.program,
    items: [
        { k: 'Formation visée', v: S.program, d: `${S.level}, en ${S.contract.toLowerCase()} · ${S.school}` },
        { k: 'Rentrée', v: S.start, d: S.duration },
        { k: 'Missions recherchées', v: 'IA, data & ML', d: S.domains.join(', ') },
        { k: 'Localisation', v: S.region, d: S.cities.join(', ') },
    ],
};

export const PROJECTS = D.PROJECTS.map(p => ({
    ...p,
    kind: p.badges[0],
    status: 'En ligne',
    context: p.badges.includes('Freelance') ? 'Freelance' : 'Projet personnel',
    year: String(p.year),
    short: p.tagline,
    done: p.highlights,
    thumb: p.thumbnail,
}));

export const EXPERIENCES = D.EXPERIENCES.map(e => {
    const [start, end] = e.period.split(' – ');
    return {
        ...e,
        org: e.company, orgUrl: e.companyUrl, orgDesc: e.companyDesc || e.place,
        start, end, current: !e.end,
        points: e.points.length ? e.points : ['[Missions à préciser]'],
    };
});

export const EDUCATION = D.EDUCATION.map(e => ({
    ...e,
    year: e.upcoming ? `${e.period.slice(0, 4)} →` : e.period,
    next: !!e.upcoming,
}));

export const LANGUAGES = D.LANGUAGES.map(l => ({ name: l.name, level: l.cefr, detail: l.desc, score: l.level }));
export const SOFT = D.SOFT_SKILLS;

// Notions couvertes par chaque certification, indexées par fichier
const CERT_TOPICS = {
    '/certifications/kaggle/lyam-mafray-lize-python.png': ['Syntaxe et fonctions', 'Booléens et conditions', 'Listes et boucles', 'Compréhensions', 'Chaînes et dictionnaires', 'Bibliothèques externes'],
    '/certifications/kaggle/lyam-mafray-lize-pandas.png': ['Lecture et création de DataFrames', 'Indexation et sélection', 'Fonctions de synthèse et maps', 'Groupby et tri', 'Types et valeurs manquantes', 'Renommage et fusion'],
    '/certifications/kaggle/lyam-mafray-lize-intro-to-machine-learning.png': ['Arbres de décision', 'Exploration des données', 'Validation de modèle (MAE)', 'Underfitting / overfitting', 'Random Forest'],
    '/certifications/kaggle/lyam-mafray-lize-intermediate-machine-learning.png': ['Valeurs manquantes', 'Variables catégorielles', 'Pipelines', 'Validation croisée', 'XGBoost', 'Data leakage'],
    '/certifications/kaggle/lyam-mafray-lize-feature-engineering.png': ['Information mutuelle', 'Création de features', 'Clustering K-means', 'PCA', 'Target encoding'],
    '/certifications/kaggle/lyam-mafray-lize-data-visualization.png': ['Line charts', 'Bar charts et heatmaps', 'Scatter plots', 'Distributions', 'Choix du graphique (Seaborn)'],
    '/certifications/datacamp/openai-api-certificate.pdf': ['Chat Completions', 'Paramètres de génération', 'Modération', 'Intégration dans une application'],
    '/certifications/datacamp/prompt-engineering-certificate.pdf': ['Structure de prompts', 'Few-shot', 'Chain-of-thought', 'Résumé, transformation, classification'],
};
export const CERTS = [...new Set(D.CERTIFICATIONS.map(c => c.provider))].map(provider => ({
    provider,
    items: D.CERTIFICATIONS.filter(c => c.provider === provider).map(c => ({ ...c, topics: CERT_TOPICS[c.file] || [] })),
}));

// Familles de compétences propres à DEV C (focus = priorité IA & Data)
export const SKILLS = [
    {
        id: 'ml', name: 'Machine learning', focus: true,
        what: "Préparer les données, entraîner, valider et comparer des modèles supervisés.",
        items: ['Scikit-learn', 'XGBoost', 'Arbres de décision', 'Random Forest', 'Validation croisée', 'Pipelines', 'Feature engineering', 'Valeurs manquantes', 'Encodage catégoriel', 'Data leakage', 'K-means', 'PCA', 'TensorFlow', 'PyTorch'],
    },
    {
        id: 'data', name: 'Data', focus: true,
        what: "Collecter, nettoyer, explorer et visualiser des jeux de données.",
        items: ['Python', 'Pandas', 'NumPy', 'SQL', 'PostgreSQL', 'MongoDB', 'Data mining', 'Seaborn', 'Data visualisation', 'Streamlit', 'Scraping'],
    },
    {
        id: 'genai', name: 'IA générative & NLP', focus: true,
        what: "Brancher des LLMs et des embeddings sur de vrais cas métier.",
        items: ['LLMs', 'OpenAI API', 'GPT-4.1', 'Embeddings', 'Recherche sémantique', 'Similarité cosinus', 'LangChain', 'NLP', 'Prompt engineering'],
    },
    {
        id: 'web', name: 'Développement web',
        what: "Concevoir des applications complètes, du back-end à l'interface.",
        items: ['JavaScript', 'TypeScript', 'Node.js', 'Express', 'React', 'Next.js', 'Vue.js', 'Vite', 'HTML / CSS', 'Framer Motion', 'Python', 'Flask', 'FastAPI', 'PHP', 'WordPress', 'PrestaShop'],
    },
    {
        id: 'auto', name: 'APIs & automatisation',
        what: "Intégrer des services tiers et automatiser des processus métier.",
        items: ['APIs REST', 'n8n', 'Make', 'Zapier', 'Airtable API', 'Stripe', 'Supabase', 'RAWG API'],
    },
    {
        id: 'infra', name: 'Infra & déploiement',
        what: "Mettre en production et maintenir ses propres services.",
        items: ['Docker', 'Docker Compose', 'VPS Linux', 'nginx', 'Coolify', 'Git', 'GitHub'],
    },
    {
        id: 'sec', name: 'Cybersécurité',
        what: "Les bonnes pratiques qu'un développeur doit appliquer dès la conception.",
        items: D.SKILLS.find(c => c.id === 'cyber').items,
    },
];

// Extraits de code par famille (illustratifs : montrent le style de code, pas une copie des projets)
export const SNIPPETS = [
    { family: 'ml', file: 'ml/pipeline_xgboost.py', lang: 'py', code: `from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder
from sklearn.model_selection import cross_val_score
from xgboost import XGBRegressor

pre = ColumnTransformer([
    ("num", SimpleImputer(strategy="median"), num_cols),
    ("cat", OneHotEncoder(handle_unknown="ignore"), cat_cols),
])
model = Pipeline([
    ("pre", pre),
    ("xgb", XGBRegressor(n_estimators=500, learning_rate=0.05)),
])

# Validation croisée 5 folds, sans fuite : le préprocessing est refait dans chaque fold
scores = -cross_val_score(model, X, y, cv=5, scoring="neg_mean_absolute_error")
print(f"MAE : {scores.mean():.0f} ± {scores.std():.0f}")` },
    { family: 'data', file: 'data/exploration.py', lang: 'py', code: `df = pd.read_csv("ventes.csv", parse_dates=["date"])
df["mois"] = df["date"].dt.to_period("M")

resume = (
    df.dropna(subset=["montant"])
      .groupby(["mois", "categorie"])["montant"]
      .agg(["sum", "mean", "count"])
      .sort_values("sum", ascending=False)
)
sns.lineplot(data=df, x="mois", y="montant", hue="categorie")` },
    { family: 'genai', file: 'genai/similarite.ts', lang: 'ts', code: `// Principe de JVFindings : un jeu = un vecteur, proximité = angle entre vecteurs
const { data } = await openai.embeddings.create({
  model: "text-embedding-3-small",
  input: games.map(g => \`\${g.name} | \${g.genres.join(", ")} | \${g.tags.join(", ")}\`),
});

const cosine = (a: number[], b: number[]) => {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) { dot += a[i] * b[i]; na += a[i] ** 2; nb += b[i] ** 2; }
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
};` },
    { family: 'web', file: 'web/checkout.js', lang: 'js', code: `// Principe du paiement de Menu Cash : session Stripe liée à l'audit
app.post("/api/checkout", requireAuth, async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
    metadata: { auditId: req.body.auditId, userId: req.user.id },
    success_url: \`\${BASE_URL}/audit/\${req.body.auditId}?paid=1\`,
    cancel_url: \`\${BASE_URL}/audit/\${req.body.auditId}\`,
  });
  res.json({ url: session.url });
});` },
    { family: 'infra', file: 'infra/Dockerfile', lang: 'docker', note: 'Dockerfile réel de ce portfolio', code: `# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]` },
    { family: 'sec', file: 'sec/middlewares.js', lang: 'js', code: `app.use(helmet());                                   // en-têtes HTTP de sécurité
app.use("/api/", rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

const Body = z.object({ auditId: z.string().uuid() }); // validation des entrées
const secret = process.env.JWT_SECRET;                  // jamais de secret en dur` },
];

// Petit helper partagé : visionneuse d'images / PDF (certifs, captures projets)
export function viewer() {
    const el = document.createElement('div');
    el.className = 'viewer';
    el.innerHTML = `<div class="viewer-bg"></div><div class="viewer-box">
        <button class="viewer-x" aria-label="Fermer">×</button>
        <button class="viewer-prev" aria-label="Précédent">‹</button>
        <div class="viewer-media"></div>
        <button class="viewer-next" aria-label="Suivant">›</button>
        <p class="viewer-cap"></p></div>`;
    document.body.append(el);
    const media = el.querySelector('.viewer-media'), cap = el.querySelector('.viewer-cap');
    let list = [], idx = 0;
    const render = () => {
        const { src, caption } = list[idx];
        media.innerHTML = src.endsWith('.pdf')
            ? `<iframe src="${src}" title="${caption || ''}"></iframe>`
            : `<img src="${src}" alt="${caption || ''}">`;
        cap.textContent = list.length > 1 ? `${caption || ''} · ${idx + 1}/${list.length}` : (caption || '');
        el.querySelector('.viewer-prev').hidden = el.querySelector('.viewer-next').hidden = list.length < 2;
    };
    const close = () => { el.classList.remove('on'); media.innerHTML = ''; document.body.style.overflow = ''; };
    const go = d => { idx = (idx + d + list.length) % list.length; render(); };
    el.querySelector('.viewer-bg').onclick = close;
    el.querySelector('.viewer-x').onclick = close;
    el.querySelector('.viewer-prev').onclick = () => go(-1);
    el.querySelector('.viewer-next').onclick = () => go(1);
    addEventListener('keydown', e => {
        if (!el.classList.contains('on')) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft') go(-1);
        if (e.key === 'ArrowRight') go(1);
    });
    // Délégation : tout élément [data-view="src"] (+ data-group pour naviguer) ouvre la visionneuse
    document.addEventListener('click', e => {
        const t = e.target.closest('[data-view]');
        if (!t) return;
        e.preventDefault();
        const group = t.dataset.group;
        const nodes = group ? [...document.querySelectorAll(`[data-view][data-group="${group}"]`)] : [t];
        list = nodes.map(n => ({ src: n.dataset.view, caption: n.dataset.caption }));
        idx = nodes.indexOf(t);
        render();
        el.classList.add('on');
        document.body.style.overflow = 'hidden';
    });
}

// Styles de base de la visionneuse ; chaque maquette surcharge via ses variables
export const VIEWER_CSS = `
.viewer { position: fixed; inset: 0; z-index: 100; display: none; place-items: center; }
.viewer.on { display: grid; }
.viewer-bg { position: absolute; inset: 0; background: rgba(0,0,0,.78); backdrop-filter: blur(4px); }
.viewer-box { position: relative; width: min(1100px, 92vw); display: flex; align-items: center; gap: 10px; flex-wrap: wrap; justify-content: center; }
.viewer-media { flex: 1; min-width: 0; display: grid; place-items: center; }
.viewer-media img { max-width: 100%; max-height: 80vh; display: block; border-radius: 4px; }
.viewer-media iframe { width: 100%; height: 80vh; border: 0; background: #fff; border-radius: 4px; }
.viewer button { all: unset; cursor: pointer; color: #fff; font-size: 34px; line-height: 1; padding: 6px 10px; opacity: .75; }
.viewer button:hover { opacity: 1; }
.viewer [hidden] { display: none; }
.viewer .viewer-x { position: absolute; top: -48px; right: 0; }
.viewer-cap { width: 100%; text-align: center; color: #ddd; font-size: 13px; }
@media (max-width: 700px) { .viewer-prev, .viewer-next { display: none; } }
`;
