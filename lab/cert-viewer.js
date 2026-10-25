// Visionneuse de certifications partagée : tout élément [data-cert="chemin"] ouvre
// l'image (PNG Kaggle) ou le PDF (DataCamp) dans une modale. Échap ou clic dehors pour fermer.
const modal = document.createElement('div');
modal.className = 'cv-modal';
modal.innerHTML = `<div class="cv-box"><button class="cv-x" aria-label="Fermer">×</button><div class="cv-media"></div></div>`;

const style = document.createElement('style');
style.textContent = `
    .cv-modal{position:fixed;inset:0;z-index:99998;background:rgba(0,0,0,.72);backdrop-filter:blur(6px);display:none;
        align-items:center;justify-content:center;padding:24px}
    .cv-modal.on{display:flex}
    .cv-box{position:relative;max-width:min(1000px,100%);width:100%;max-height:90vh;background:#fff;border-radius:12px;overflow:hidden;
        box-shadow:0 30px 80px rgba(0,0,0,.5)}
    .cv-media img{display:block;width:100%;height:auto;max-height:90vh;object-fit:contain;background:#fff}
    .cv-media iframe{display:block;width:100%;height:80vh;border:0}
    .cv-x{position:absolute;top:8px;right:8px;width:36px;height:36px;border-radius:50%;border:0;background:rgba(0,0,0,.7);color:#fff;
        font:400 22px/1 system-ui;cursor:pointer;z-index:1}
`;
document.head.appendChild(style);
document.body.appendChild(modal);

const media = modal.querySelector('.cv-media');

export function openCert(file) {
    media.innerHTML = file.endsWith('.pdf')
        ? `<iframe src="${file}" title="Certification"></iframe>`
        : `<img src="${file}" alt="Certification">`;
    modal.classList.add('on');
}

function close() {
    modal.classList.remove('on');
    media.innerHTML = '';
}

modal.addEventListener('click', e => { if (e.target === modal || e.target.closest('.cv-x')) close(); });
addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
document.addEventListener('click', e => {
    const el = e.target.closest('[data-cert]');
    if (!el) return;
    e.preventDefault();
    openCert(el.dataset.cert);
});
