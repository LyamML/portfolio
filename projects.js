// ── Project data ─────────────────────────────────────────────
// Add screenshot paths to `images` once available.
// thumbnail: path to the card preview image (e.g. './projects/menucash/thumb.png')
const PROJECTS = [
    {
        id: 'menucash',
        name: 'Menu Cash',
        badge: 'MVP',
        freelance: true,
        description: "SaaS d'audit de menu IA. Uploadez une photo de votre menu, obtenez un audit gratuit (score, erreurs, estimation des pertes de revenus), puis payez pour recevoir un plan de restructuration complet.",
        url: 'https://menucash.lyamml.fr',
        thumbnail: null,
        images: [],
        tags: ['Node.js', 'Express.js', 'GPT-4.1-mini', 'Stripe', 'Supabase', 'PostgreSQL', 'HTML/CSS/JS', 'Docker', 'Coolify', 'VPS'],
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
                        ${proj.badge ? `<span class="proj-card-badge">${proj.badge}</span>` : ''}
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

    // Single card → full width
    if (PROJECTS.length === 1) {
        grid.querySelector('.proj-card').classList.add('proj-card-wide');
    }
}

// ── Modal open/close ──────────────────────────────────────────
function openModal(proj) {
    detailBadge.innerHTML = [
        proj.badge    ? `<span class="proj-details-badge">${proj.badge}</span>` : '',
        proj.freelance ? `<span class="proj-details-badge proj-badge-freelance">FREELANCE</span>` : '',
    ].join('');
    detailBadge.style.display = (proj.badge || proj.freelance) ? 'flex' : 'none';
    detailName.textContent  = proj.name;
    detailDesc.textContent  = proj.description;
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

    setThumbWidths();
    updateGalleryPos();
}

function setThumbWidths() {
    const wrapper = galleryTrack.parentElement;
    if (!wrapper || currentImages.length === 0) return;
    const gap   = 6;
    const count = Math.min(GALLERY_VISIBLE, currentImages.length);
    const w     = (wrapper.offsetWidth - gap * (count - 1)) / count;
    galleryTrack.querySelectorAll('.gallery-thumb').forEach(img => {
        img.style.width = `${w}px`;
    });
}

function updateGalleryPos() {
    const wrapper = galleryTrack.parentElement;
    if (!wrapper || currentImages.length === 0) return;
    const gap   = 6;
    const count = Math.min(GALLERY_VISIBLE, currentImages.length);
    const w     = (wrapper.offsetWidth - gap * (count - 1)) / count;
    galleryTrack.style.transform = `translateX(${-galleryOffset * (w + gap)}px)`;

    galleryPrev.disabled = galleryOffset === 0;
    galleryNext.disabled = galleryOffset >= currentImages.length - GALLERY_VISIBLE;
}

// ── Lightbox ──────────────────────────────────────────────────
function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add('active');
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

window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        if (lightbox.classList.contains('active')) closeLightbox();
        else if (modal.classList.contains('active')) closeModal();
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
