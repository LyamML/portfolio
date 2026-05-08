// ── Project data ─────────────────────────────────────────────
// Add screenshot paths to `images` once available.
// thumbnail: path to the card preview image (e.g. './projects/menucash/thumb.png')
const PROJECTS = [
    {
        id: 'menucash',
        name: 'Menu Cash',
        badges: ['MVP'],
        freelance: true,
        description: "SaaS d'audit de menu IA. Uploadez une photo de votre menu, obtenez un audit gratuit (score, erreurs, estimation des pertes de revenus), puis payez pour recevoir un plan de restructuration complet.",
        url: 'https://menucash.lyamml.fr',
        thumbnail: './projects/menucash/thumb.png',
        images: [
            './projects/menucash/screen1.png',
            './projects/menucash/screen2.png',
            './projects/menucash/screen3.png',
            './projects/menucash/screen4.png',
            './projects/menucash/screen5.png',
            './projects/menucash/screen6.png',
        ],
        tags: ['Node.js', 'Express.js', 'GPT-4.1-mini', 'Stripe', 'Supabase', 'PostgreSQL', 'HTML/CSS/JS', 'Docker', 'VPS'],
    },
    {
        id: 'jvfinder',
        name: 'JVFinder',
        badges: ['POC', 'Entrainement'],
        freelance: false,
        description: "Développé après une certification OpenAI pour appliquer les embeddings vectoriels sur un cas concret. Chaque jeu est converti en vecteur sémantique via text-embedding-3-small et classé par similarité cosinus — avec un pool pré-filtré via RAWG pour des résultats pertinents.",
        descriptionDetail: "Développé après une certification OpenAI pour mettre en pratique les embeddings vectoriels sur un cas concret. L'algorithme convertit chaque jeu en vecteur sémantique (nom, genres, tags) via text-embedding-3-small, puis calcule une similarité cosinus pour retourner les titres les plus proches. Un pool de jusqu'à 100 candidats pré-filtrés par genres et tags via RAWG optimise la pertinence des résultats sans surcharger les appels API.\n\nDeux modes : Recherche (le meilleur match s'affiche en grand avec distribution des scores, tags dominants, médiane) et Comparaison directe entre deux jeux (genres/tags communs et uniques, label qualitatif de similarité). Un cache in-memory TTL 1h évite tout appel redondant. Interface animée avec Framer Motion, déployée en Docker sur Coolify.",
        url: 'https://jvfindings.lyamml.fr',
        thumbnail: './projects/jvfindings/thumb.png',
        images: [
            './projects/jvfindings/screen1.png',
            './projects/jvfindings/screen2.png',
            './projects/jvfindings/screen3.png',
            './projects/jvfindings/screen4.png',
        ],
        tags: ['Next.js 16', 'TypeScript', 'OpenAI API', 'Embeddings', 'RAWG API', 'Framer Motion', 'Docker', 'VPS'],
    },
];

// ── Gallery state ─────────────────────────────────────────────
const GALLERY_VISIBLE = 3;
let galleryOffset = 0;
let currentImages = [];

// ── DOM refs ──────────────────────────────────────────────────
const grid         = document.getElementById('projects-grid');
const modalOverlay = document.getElementById('proj-modal-overlay');
const modal        = document.getElementById('proj-modal');
const iframe       = document.getElementById('proj-iframe');
const iframeLoader = document.getElementById('iframe-loading');
const detailBadge  = document.getElementById('detail-badge');
const detailName   = document.getElementById('detail-name');
const detailDesc   = document.getElementById('detail-desc');
const detailTags   = document.getElementById('detail-tags');
const detailLink   = document.getElementById('detail-ext-link');
const galleryBlock = document.getElementById('gallery-block');
const galleryTrack = document.getElementById('gallery-track');
const galleryPrev  = document.getElementById('gallery-prev');
const galleryNext  = document.getElementById('gallery-next');
const modalClose   = document.getElementById('proj-modal-close');
const lightbox     = document.getElementById('img-lightbox');
const lightboxImg  = document.getElementById('lightbox-img');
const lightboxOvl  = document.getElementById('lightbox-overlay');
const lightboxX    = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');
let   lightboxIdx  = 0;

// ── Badge class map ───────────────────────────────────────────
const BADGE_CLASSES = {
    'POC':          'proj-badge-poc',
    'Entrainement': 'proj-badge-training',
    'FREELANCE':    'proj-badge-freelance',
};
function badgeClass(label) { return BADGE_CLASSES[label] || ''; }

// ── Render cards ──────────────────────────────────────────────
function renderCards() {
    PROJECTS.forEach((proj, i) => {
        const card = document.createElement('div');
        card.className = 'proj-card';

        const thumbHtml = proj.thumbnail
            ? `<img src="${proj.thumbnail}" alt="${proj.name}" loading="lazy">`
            : `<div class="proj-thumb-placeholder"><span class="thumb-initials">${initials(proj.name)}</span></div>`;

        const visibleTags = proj.tags.slice(0, 5);
        const extraCount  = proj.tags.length - visibleTags.length;
        const tagsHtml = visibleTags.map(t => `<span class="tag-box">${t}</span>`).join('')
            + (extraCount > 0 ? `<span class="tag-box">+${extraCount}</span>` : '');

        card.innerHTML = `
            <div class="proj-thumb">${thumbHtml}</div>
            <div class="proj-card-content">
                <div>
                    <div class="proj-card-badges">
                        ${(proj.badges || []).map(b => `<span class="proj-card-badge ${badgeClass(b)}">${b}</span>`).join('')}
                        ${proj.freelance ? `<span class="proj-card-badge proj-badge-freelance">FREELANCE</span>` : ''}
                    </div>
                    <h2 class="proj-card-title">${proj.name}</h2>
                    <p class="proj-card-desc">${proj.description}</p>
                </div>
                <div class="proj-card-tags">${tagsHtml}</div>
            </div>`;

        card.addEventListener('click', () => openModal(proj));
        grid.appendChild(card);

        // Staggered reveal
        requestAnimationFrame(() => {
            setTimeout(() => card.classList.add('reveal-in'), i * 80);
        });
    });
}

// ── Modal open/close ──────────────────────────────────────────
function openModal(proj) {
    detailBadge.innerHTML = [
        ...(proj.badges || []).map(b => `<span class="proj-details-badge ${badgeClass(b)}">${b}</span>`),
        proj.freelance ? `<span class="proj-details-badge proj-badge-freelance">FREELANCE</span>` : '',
    ].join('');
    detailBadge.style.display = ((proj.badges?.length) || proj.freelance) ? 'flex' : 'none';
    detailName.textContent  = proj.name;
    detailDesc.innerHTML = (proj.descriptionDetail || proj.description)
        .split('\n\n')
        .map(p => `<p>${p}</p>`)
        .join('');
    detailLink.href         = proj.url;

    detailTags.innerHTML = proj.tags.map(t => `<span class="tag-box">${t}</span>`).join('');

    currentImages  = proj.images || [];
    galleryOffset  = 0;

    if (currentImages.length > 0) {
        galleryBlock.style.display = '';
        renderGallery();
    } else {
        galleryBlock.style.display = 'none';
    }

    iframeLoader.classList.remove('hidden');
    iframe.onload = () => iframeLoader.classList.add('hidden');

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Load iframe after paint so the animation shows cleanly
    requestAnimationFrame(() => requestAnimationFrame(() => { iframe.src = proj.url; }));
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => { iframe.src = ''; }, 350);
}

// ── Gallery ───────────────────────────────────────────────────
function renderGallery() {
    galleryTrack.innerHTML = currentImages.map((src, i) =>
        `<img src="${src}" class="gallery-thumb" alt="Capture ${i + 1}" data-src="${src}" loading="lazy">`
    ).join('');

    galleryTrack.querySelectorAll('.gallery-thumb').forEach(img => {
        img.addEventListener('click', () => openLightbox(img.dataset.src));
    });

    // Wait for images to have natural dimensions before computing positions
    galleryTrack.querySelectorAll('.gallery-thumb').forEach(img => {
        img.addEventListener('load', updateGalleryPos, { once: true });
    });

    updateGalleryPos();
}

function updateGalleryPos() {
    const firstImg = galleryTrack.querySelector('.gallery-thumb');
    if (!firstImg) return;
    const gap = 6;
    const w   = firstImg.offsetWidth;
    if (!w) return;
    galleryTrack.style.transform = `translateX(${-galleryOffset * (w + gap)}px)`;

    galleryPrev.disabled = galleryOffset === 0;
    galleryNext.disabled = galleryOffset >= currentImages.length - GALLERY_VISIBLE;
}

// ── Lightbox ──────────────────────────────────────────────────
function openLightbox(src) {
    lightboxIdx = currentImages.indexOf(src);
    updateLightboxImage();
    lightbox.classList.add('active');
}

function updateLightboxImage() {
    lightboxImg.src = currentImages[lightboxIdx];
    lightboxPrev.disabled = lightboxIdx === 0;
    lightboxNext.disabled = lightboxIdx === currentImages.length - 1;
}

function lightboxNavigate(dir) {
    const next = lightboxIdx + dir;
    if (next < 0 || next >= currentImages.length) return;
    lightboxIdx = next;
    updateLightboxImage();
}

function closeLightbox() {
    lightbox.classList.remove('active');
    lightboxImg.src = '';
}

// ── Event bindings ────────────────────────────────────────────
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

galleryPrev.addEventListener('click', () => {
    galleryOffset = Math.max(0, galleryOffset - 1);
    updateGalleryPos();
});

galleryNext.addEventListener('click', () => {
    galleryOffset = Math.min(currentImages.length - GALLERY_VISIBLE, galleryOffset + 1);
    updateGalleryPos();
});

lightboxOvl.addEventListener('click', closeLightbox);
lightboxX.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => lightboxNavigate(-1));
lightboxNext.addEventListener('click', () => lightboxNavigate(1));

window.addEventListener('keydown', e => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape')       closeLightbox();
        else if (e.key === 'ArrowLeft')  lightboxNavigate(-1);
        else if (e.key === 'ArrowRight') lightboxNavigate(1);
    } else if (modal.classList.contains('active')) {
        if (e.key === 'Escape') closeModal();
    }
});

// Nav scroll state
const nav = document.querySelector('.fixed-nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks   = document.querySelector('.nav-links');
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// ── Utils ─────────────────────────────────────────────────────
function initials(name) {
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

// ── Init ──────────────────────────────────────────────────────
renderCards();
