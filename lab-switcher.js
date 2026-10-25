// Barre de navigation entre les maquettes de test.
// Injectée en bas de chaque maquette, à supprimer une fois les designs choisis.
const GROUPS = [
    { id: 'dev',  label: 'Dev',   pages: [['a', 'Terminal'], ['b', 'IDE']] },
    { id: 'data', label: 'Data',  pages: [['a', 'Notebook']] },
    { id: 'x',    label: 'Innov', pages: [['b', 'Canvas'], ['c', 'Physique']] },
];

const path = location.pathname;
const href = (g, p) => `/${g}/${p}.html`;

const bar = document.createElement('nav');
bar.className = 'lab-bar';
bar.setAttribute('aria-label', 'Maquettes');
bar.innerHTML = GROUPS.map(g => `
    <div class="lab-g"><b>${g.label}</b>${g.pages.map(([p, name]) =>
        `<a href="${href(g.id, p)}" class="${path === href(g.id, p) ? 'on' : ''}" title="${g.label} · ${name}">${p.toUpperCase()}</a>`).join('')}</div>`).join('');

const style = document.createElement('style');
style.textContent = `
    .lab-bar{position:fixed;left:50%;bottom:12px;transform:translateX(-50%);z-index:99999;display:flex;gap:4px;padding:4px;
        background:rgba(18,18,18,.9);backdrop-filter:blur(10px);border-radius:12px;font:600 11px/1 system-ui,sans-serif;
        box-shadow:0 8px 30px rgba(0,0,0,.3);max-width:calc(100vw - 24px);overflow-x:auto;scrollbar-width:none}
    .lab-g{display:flex;align-items:center;gap:1px;padding:0 4px;border-left:1px solid rgba(255,255,255,.12)}
    .lab-g:first-child{border-left:0}
    .lab-g b{color:#888;font-weight:600;margin-right:4px;text-transform:uppercase;letter-spacing:.05em;font-size:10px}
    .lab-bar a{color:#ccc;text-decoration:none;padding:7px 8px;border-radius:7px}
    .lab-bar a:hover{background:rgba(255,255,255,.12);color:#fff}
    .lab-bar a.on{background:#fff;color:#111}
`;
document.head.appendChild(style);
document.body.appendChild(bar);
