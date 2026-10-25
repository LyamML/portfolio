// ── Source unique du contenu du portfolio ─────────────────────
// Toutes les maquettes (dev / ai / data / main) lisent ce fichier.
// Modifier une info ici = elle change partout.
//
// TODO (Lyam) : les champs marqués « TODO » sont à compléter / confirmer.

export const PROFILE = {
    firstName: 'Lyam',
    lastName: 'Mafray-Lizé',
    initials: 'LM',
    title: 'Développeur Fullstack & IA',
    city: 'Rennes',
    email: 'ly.mafraylize@gmail.com',
    phone: '06 58 42 93 31',
    phoneHref: 'tel:0658429331',
    github: 'https://github.com/LyamML',
    githubHandle: 'LyamML',
    linkedin: 'https://www.linkedin.com/in/lyam-mafray-lizé-a5954a235/',
    malt: null, // TODO : lien profil Malt
    cv: null,   // TODO : chemin du CV PDF (ex. '/cv/lyam-mafray-lize.pdf')
    // Accroches par angle — chaque sous-domaine pioche la sienne.
    pitch: {
        main: "Développeur Fullstack & IA en alternance à l'EPSI Rennes. Je conçois des produits web qui intègrent l'IA de bout en bout : de l'API au déploiement.",
        dev:  "Développeur Fullstack : Node.js, TypeScript, React/Vue/Next, Python (FastAPI, Flask), Docker. Je livre des applications complètes, de la base de données au VPS.",
        ai:   "Je construis des produits qui exploitent les LLMs : embeddings vectoriels, similarité cosinus, vision par GPT, automatisations IA en production.",
        data: "Python, Pandas, Scikit-learn, SQL : je transforme des données brutes en modèles et en décisions. 6 certifications Kaggle en data science et machine learning.",
    },
};

// Ce que je recherche (alternance Mastère).
export const SEARCH = {
    contract: 'Alternance',
    program: 'Mastère IA & Data',
    school: 'EPSI Rennes',
    level: 'Bac+5',
    start: 'Septembre 2027',
    startDate: '2027-09-01',
    duration: '2 ans',
    rhythm: null, // TODO : rythme école / entreprise du Mastère (ex. '1 sem. école / 2 sem. entreprise')
    domains: ['Data Science', 'Machine Learning', 'IA générative / LLMs', 'Data Engineering', 'Automatisation IA'],
    region: 'Bretagne · Pays de la Loire',
    cities: ['Rennes', 'Laval', 'Le Mans'],
};

// Expériences pro, de la plus récente à la plus ancienne.
export const EXPERIENCES = [
    {
        id: 'kenavhome',
        role: 'Alternant Concepteur Développeur d\'Applications', // TODO : intitulé exact du poste
        company: 'Kenavhome',
        companyUrl: 'https://kenavhome.com',
        companyDesc: 'Coliving à Rennes et Angers',
        place: 'Rennes',
        type: 'Alternance',
        start: '2026-09', end: null, period: 'Sept. 2026 – Aujourd\'hui',
        points: [], // TODO : 2-3 missions concrètes chez Kenavhome
        tags: [],   // TODO : stack utilisée chez Kenavhome
    },
    {
        id: 'freelance',
        role: 'Freelance en Automatisation IA',
        company: 'Malt',
        place: 'Remote',
        type: 'Freelance',
        start: '2025-01', end: null, period: '2025 – Aujourd\'hui',
        points: [
            "Conception et déploiement de workflows d'automatisation IA (n8n, Make).",
            "Intégration d'APIs tierces et automatisation de processus métier.",
            "Analyse des besoins clients et rédaction de spécifications techniques.",
        ],
        tags: ['n8n', 'Make', 'IA', 'Automation'],
    },
    {
        id: 'france-batiment',
        role: 'Alternant en Conception Web',
        company: 'France Bâtiment',
        place: 'Le Mans',
        type: 'Alternance',
        start: '2022-11', end: '2024-08', period: 'Nov. 2022 – Août 2024',
        points: [
            'Travail en autonomie au sein du pôle informatique.',
            'Développement back-end PHP et création de sites WordPress et e-commerce PrestaShop.',
            'Écriture de scripts Python et automatisation de pipelines de données.',
        ],
        tags: ['PHP', 'Python', 'WordPress', 'PrestaShop', 'HTML/CSS', 'JavaScript'],
    },
];

// Formations, de la plus récente à la plus ancienne.
export const EDUCATION = [
    {
        id: 'mastere',
        title: 'Mastère IA & Data',
        level: 'Bac+5',
        school: 'EPSI Rennes',
        start: '2027-09', end: '2029-08', period: '2027 – 2029',
        desc: 'Programme visé en alternance — rentrée septembre 2027.',
        upcoming: true,
    },
    {
        id: 'cda',
        title: 'Bachelor Concepteur Développeur d\'Applications (CDA)',
        level: 'Bac+3',
        school: 'EPSI Rennes',
        start: '2026-09', end: '2027-08', period: '2026 – 2027',
        desc: "Formation en alternance : conception et développement d'applications, intégration d'APIs et IA appliquée.",
        current: true,
    },
    {
        id: 'ekod',
        title: 'Développeur Web',
        level: 'Bac+2',
        school: 'EKOD, Le Mans',
        start: '2022-09', end: '2024-08', period: '2022 – 2024',
        desc: 'Option Webmarketing & Communication. Développement web fullstack, UX/UI et stratégies numériques.',
    },
    {
        id: 'bac',
        title: 'BAC STI2D — Mention Bien',
        level: 'Bac',
        school: 'Saint Joseph LaSalle, Le Mans',
        start: '2020-09', end: '2022-07', period: '2022',
        desc: "Option SIN (Systèmes d'Information et Numérique).",
    },
];

// Hard skills par catégorie. `focus` = angles où la catégorie est mise en avant.
export const SKILLS = [
    {
        id: 'web', name: 'Développement Web', icon: '💻', focus: ['dev', 'main'],
        items: ['Node.js', 'Express.js', 'TypeScript', 'JavaScript', 'React', 'Vue.js', 'Next.js', 'Vite.js', 'HTML/CSS', 'Flask', 'FastAPI', 'PHP'],
    },
    {
        id: 'ai', name: 'IA & LLMs', icon: '🧠', focus: ['ai'],
        items: ['LLMs', 'OpenAI API', 'Embeddings', 'Similarité cosinus', 'Prompt Engineering', 'NLP', 'LangChain', 'GPT-4.1-mini'],
    },
    {
        id: 'data', name: 'Data & Machine Learning', icon: '📊', focus: ['data', 'ai'],
        items: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'XGBoost', 'TensorFlow', 'PyTorch', 'Feature Engineering', 'Data Visualization', 'Data Mining', 'Streamlit'],
    },
    {
        id: 'db', name: 'Bases de données', icon: '🗄️', focus: ['data', 'dev'],
        items: ['SQL', 'PostgreSQL', 'Supabase', 'MongoDB'],
    },
    {
        id: 'auto', name: 'APIs & Automatisation', icon: '⚡', focus: ['ai', 'main'],
        items: ['n8n', 'Make', 'Zapier', 'APIs REST', 'Airtable API', 'Stripe', 'Scraping'],
    },
    {
        id: 'infra', name: 'Infra & Déploiement', icon: '⚙️', focus: ['dev'],
        items: ['Docker', 'Git', 'GitHub', 'VPS', 'Coolify', 'Nginx'],
    },
];

export const SOFT_SKILLS = [
    { name: 'Autonomie',        desc: "Gestion de projets en autonomie et prise d'initiative." },
    { name: "Travail d'équipe", desc: 'Collaboration efficace au sein d\'équipes techniques et marketing.' },
    { name: 'Adaptation',       desc: "Capacité à s'adapter rapidement à de nouveaux environnements et technos." },
    { name: 'Curiosité',        desc: "Veille technologique constante sur l'IA et le développement." },
    { name: 'Organisation',     desc: 'Gestion rigoureuse du temps et des priorités en alternance.' },
    { name: 'Rigueur',          desc: "Précision et qualité dans le code et l'analyse de données." },
];

// level : 0 → 5 (5 = natif). cefr pour l'affichage.
export const LANGUAGES = [
    { name: 'Français', flag: '🇫🇷', cefr: 'Natif', level: 5,   desc: 'Langue natale — maîtrise totale' },
    { name: 'Anglais',  flag: '🇬🇧', cefr: 'C2-',   level: 4.5, desc: 'Professionnel complet' },
    { name: 'Espagnol', flag: '🇪🇸', cefr: 'B1',    level: 3,   desc: 'Intermédiaire' },
];

export const CERTIFICATIONS = [
    { provider: 'Kaggle',   name: 'Python',                  topic: 'data', file: '/certifications/kaggle/lyam-mafray-lize-python.png' },
    { provider: 'Kaggle',   name: 'Pandas',                  topic: 'data', file: '/certifications/kaggle/lyam-mafray-lize-pandas.png' },
    { provider: 'Kaggle',   name: 'Intro to Machine Learning', topic: 'ml', file: '/certifications/kaggle/lyam-mafray-lize-intro-to-machine-learning.png' },
    { provider: 'Kaggle',   name: 'Intermediate Machine Learning', topic: 'ml', file: '/certifications/kaggle/lyam-mafray-lize-intermediate-machine-learning.png' },
    { provider: 'Kaggle',   name: 'Feature Engineering',     topic: 'ml',   file: '/certifications/kaggle/lyam-mafray-lize-feature-engineering.png' },
    { provider: 'Kaggle',   name: 'Data Visualization',      topic: 'data', file: '/certifications/kaggle/lyam-mafray-lize-data-visualization.png' },
    { provider: 'DataCamp', name: 'OpenAI API',              topic: 'ai',   file: '/certifications/datacamp/openai-api-certificate.pdf' },
    { provider: 'DataCamp', name: 'Prompt Engineering',      topic: 'ai',   file: '/certifications/datacamp/prompt-engineering-certificate.pdf' },
];

export const PROJECTS = [
    {
        id: 'menucash',
        name: 'Menu Cash',
        tagline: "SaaS d'audit de menu par IA",
        badges: ['MVP', 'Freelance'],
        year: 2025, // TODO : confirmer l'année
        description: "SaaS d'audit de menu IA. Uploadez une photo de votre menu, obtenez un audit gratuit (score, erreurs, estimation des pertes de revenus), puis payez pour recevoir un plan de restructuration complet.",
        highlights: [
            'Analyse de photo de menu par GPT-4.1-mini (vision)',
            'Audit gratuit : score, erreurs, pertes de revenus estimées',
            'Plan de restructuration payant via Stripe',
            'Auth et base PostgreSQL via Supabase, déployé en Docker sur VPS',
        ],
        url: 'https://menucash.lyamml.fr',
        thumbnail: '/projects/menucash/thumb.png',
        images: [1, 2, 3, 4, 5, 6].map(i => `/projects/menucash/screen${i}.png`),
        tags: ['Node.js', 'Express.js', 'GPT-4.1-mini', 'Stripe', 'Supabase', 'PostgreSQL', 'HTML/CSS/JS', 'Docker', 'VPS'],
        angles: { dev: 'SaaS fullstack avec paiement Stripe', ai: 'Vision GPT-4.1-mini sur photo de menu', data: 'Scoring et estimation de pertes de revenus' },
    },
    {
        id: 'jvfindings',
        name: 'JVFindings',
        tagline: 'Recommandation de jeux par embeddings',
        badges: ['POC', 'Entraînement'],
        year: 2025, // TODO : confirmer l'année
        description: "Développé après une certification OpenAI pour appliquer les embeddings vectoriels sur un cas concret. Chaque jeu est converti en vecteur sémantique via text-embedding-3-small et classé par similarité cosinus — avec un pool pré-filtré via RAWG pour des résultats pertinents.",
        highlights: [
            'Chaque jeu → vecteur sémantique (nom, genres, tags) via text-embedding-3-small',
            'Classement par similarité cosinus sur un pool de 100 candidats pré-filtrés via RAWG',
            'Mode Recherche : meilleur match, distribution des scores, tags dominants, médiane',
            'Mode Comparaison : genres/tags communs et uniques, label qualitatif de similarité',
            'Cache in-memory TTL 1h, animations Framer Motion, déployé en Docker sur Coolify',
        ],
        url: 'https://jvfindings.lyamml.fr',
        thumbnail: '/projects/jvfindings/thumb.png',
        images: [1, 2, 3, 4].map(i => `/projects/jvfindings/screen${i}.png`),
        tags: ['Next.js 16', 'TypeScript', 'OpenAI API', 'text-embedding-3-small', 'Embeddings', 'RAWG API', 'Framer Motion', 'Docker', 'VPS'],
        angles: { dev: 'Next.js 16 + TypeScript, cache TTL, Docker', ai: 'Embeddings + similarité cosinus', data: 'Distribution des scores de similarité, médiane' },
    },
];

// Offre freelance (tirée de l'expérience Malt) — TODO : ajuster les intitulés si besoin.
export const SERVICES = [
    { name: 'Automatisation IA', desc: 'Workflows n8n / Make connectés à vos outils et à des LLMs.', tools: ['n8n', 'Make', 'Zapier', 'OpenAI API'] },
    { name: "Intégration d'APIs", desc: "Connexion d'APIs tierces et automatisation de processus métier, spécifications comprises.", tools: ['APIs REST', 'Airtable API', 'Stripe', 'Scraping'] },
    { name: 'Produit web avec IA', desc: 'Du MVP au déploiement : front, back, paiement, base de données, IA.', tools: ['Node.js', 'Next.js', 'Supabase', 'Docker'] },
];

// Les 4 versions du portfolio.
export const SITES = [
    { id: 'main', url: 'https://lyamml.fr',      label: 'lyamml.fr',      angle: 'Général & freelance' },
    { id: 'dev',  url: 'https://dev.lyamml.fr',  label: 'dev.lyamml.fr',  angle: 'Développement fullstack' },
    { id: 'ai',   url: 'https://ai.lyamml.fr',   label: 'ai.lyamml.fr',   angle: 'LLMs & embeddings' },
    { id: 'data', url: 'https://data.lyamml.fr', label: 'data.lyamml.fr', angle: 'Data & machine learning' },
];

// ── Helpers partagés ──────────────────────────────────────────
export const fullName = `${PROFILE.firstName} ${PROFILE.lastName}`;
export const allSkills = SKILLS.flatMap(c => c.items);

// Nombre de mois entiers avant la rentrée visée.
export function monthsUntilStart(now = new Date()) {
    const t = new Date(SEARCH.startDate);
    return Math.max(0, (t.getFullYear() - now.getFullYear()) * 12 + t.getMonth() - now.getMonth());
}

// Mois d'expérience pro cumulés (alternances + freelance, chevauchements comptés une fois).
export function monthsOfExperience(now = new Date()) {
    const toIdx = s => { const [y, m] = s.split('-').map(Number); return y * 12 + m - 1; };
    const nowIdx = now.getFullYear() * 12 + now.getMonth();
    const months = new Set();
    for (const e of EXPERIENCES) {
        for (let i = toIdx(e.start); i <= (e.end ? toIdx(e.end) : nowIdx); i++) months.add(i);
    }
    return months.size;
}

// Sections dans l'ordre conseillé — chaque page doit toutes les afficher.
export const SECTIONS = ['recherche', 'projets', 'experiences', 'formations', 'competences', 'soft-skills', 'certifications', 'langues', 'contact'];
