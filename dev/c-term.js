// ── Briques « terminal » partagées : animations + vues compétences ─────────
import { PROJECTS, EXPERIENCES, CERTS, SKILLS, SNIPPETS } from './c-data.js';

export const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
export const sleep = ms => new Promise(r => setTimeout(r, ms));
export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

// ── Animations ────────────────────────────────────────────────────────────

// Tape un texte caractère par caractère. Renvoie une promesse.
export async function typeInto(el, text, speed = 22) {
    if (reduced) { el.textContent = text; return; }
    el.textContent = '';
    for (const ch of text) { el.textContent += ch; await sleep(speed); }
}

// Effet « décodage » : caractères aléatoires qui se figent de gauche à droite
const GLYPHS = '█▓▒░#$%&@<>/\\|=+*01ABCDEFXZ';
export function scramble(el, final = el.textContent, duration = 650) {
    if (reduced) { el.textContent = final; return; }
    const start = performance.now();
    const tick = now => {
        const p = Math.min(1, (now - start) / duration);
        const fixed = Math.floor(p * final.length);
        el.textContent = final.slice(0, fixed) + [...final.slice(fixed)]
            .map(c => c === ' ' ? ' ' : GLYPHS[Math.random() * GLYPHS.length | 0]).join('');
        if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
}

// Déclenche cb(el) la première fois que l'élément devient visible, puis l'oublie.
// Les éléments qui apparaissent dans le même lot reçoivent leur rang (pour l'effet cascade).
// Filet de sécurité : si l'observateur ne répond jamais, tout est joué après 1,5 s.
function onceVisible(els, cb) {
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) { els.forEach((el, i) => cb(el, i)); return; }
    const pending = new Set(els);
    let answered = false;
    const io = new IntersectionObserver(entries => {
        answered = true;
        entries.filter(e => e.isIntersecting && pending.has(e.target))
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
            .forEach((e, i) => { pending.delete(e.target); io.unobserve(e.target); cb(e.target, i); });
    }, { threshold: 0.15 });
    els.forEach(el => io.observe(el));
    setTimeout(() => { if (!answered) { io.disconnect(); [...pending].forEach((el, i) => cb(el, i)); } }, 1500);
}

// Affichage ligne par ligne : chaque bloc se « déroule » de gauche à droite,
// uniquement quand il entre à l'écran, et une seule fois.
export function printLines(container, { step = 32, max = 900 } = {}) {
    if (reduced) return;
    const units = [...container.children].flatMap(c =>
        c.matches('table') ? [...c.querySelectorAll('tr')] :
        c.matches('ul, .lines') ? [...c.children] : [c]);
    const cells = u => u.matches('tr') ? [...u.children] : [u];
    units.forEach(u => cells(u).forEach(t => { t.classList.remove('pr'); t.classList.add('pr-wait'); }));
    onceVisible(units, (u, i) => cells(u).forEach(t => {
        t.style.animationDelay = Math.min(i * step, max) + 'ms';
        t.classList.replace('pr-wait', 'pr');
    }));
}

// Barres de progression ASCII : <span data-bar="0.9" data-width="20"></span>
// Elles se remplissent quand elles deviennent visibles, une seule fois.
export function bars(container, { duration = 900 } = {}) {
    const els = [...container.querySelectorAll('[data-bar]')];
    const drawer = el => {
        const width = +(el.dataset.width || 20);
        return r => {
            const n = Math.round(r * width);
            el.innerHTML = `[<b>${'#'.repeat(n)}</b><i>${'-'.repeat(width - n)}</i>] ${String(Math.round(r * 100)).padStart(3)}%`;
        };
    };
    if (reduced) return els.forEach(el => drawer(el)(+el.dataset.bar));
    els.forEach(el => drawer(el)(0));
    onceVisible(els, (el, i) => {
        const draw = drawer(el), ratio = +el.dataset.bar;
        // Laisse la ligne se dérouler avant de remplir la barre
        const t0 = performance.now() + 250 + i * 150;
        const tick = now => {
            const p = Math.max(0, Math.min(1, (now - t0) / duration));
            draw(ratio * (1 - Math.pow(1 - p, 3)));
            if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    });
}

// Spinner braille ; renvoie une fonction d'arrêt
const FRAMES = '⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏';
export function spinner(el, label = '') {
    let i = 0;
    const id = setInterval(() => { el.textContent = `${FRAMES[i++ % FRAMES.length]} ${label}`; }, 80);
    el.textContent = `${FRAMES[0]} ${label}`;
    return () => clearInterval(id);
}

// Séquence de démarrage façon systemd. Passable au clavier / clic.
export const BOOT_LINES = [
    ['', '[    0.000000] lyam-os 2026.10 — tty1'],
    ['ok', 'Montage de /home/lyam'],
    ['ok', 'Chargement des modules : fullstack, ia, data'],
    ['ok', 'Démarrage de kenavhome-alternance.service'],
    ['ok', 'Démarrage de malt-freelance.service'],
    ['ok', 'Connexion à epsi-rennes (bachelor-3-cda)'],
    ['wait', "master-ia-data.service — en attente d'une entreprise (sept. 2027)"],
    ['ok', 'Portfolio prêt.'],
];
export async function boot(target, { lines = BOOT_LINES, speed = 120 } = {}) {
    let skip = false;
    const stop = () => { skip = true; };
    addEventListener('keydown', stop, { once: true });
    addEventListener('pointerdown', stop, { once: true });
    target.innerHTML = `<div class="boot"></div><p class="boot-skip">appuyez sur une touche pour passer</p>`;
    const box = target.querySelector('.boot');
    for (const [kind, text] of lines) {
        if (skip) break;
        const tag = kind === 'ok' ? '<span class="s">[  OK  ]</span> ' : kind === 'wait' ? '<span class="n">[ WAIT ]</span> ' : '';
        box.insertAdjacentHTML('beforeend', `<div>${tag}${esc(text)}</div>`);
        await sleep(reduced ? 0 : speed);
    }
    if (!skip) {
        box.insertAdjacentHTML('beforeend', `<div style="margin-top:12px">lyam-portfolio login: <span class="lg"></span></div>`);
        await typeInto(box.querySelector('.lg'), 'visiteur', 60);
        await sleep(350);
    }
    removeEventListener('keydown', stop);
    removeEventListener('pointerdown', stop);
}

// ── Données dérivées ──────────────────────────────────────────────────────

const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\.js\b/g, '').replace(/[^a-z0-9]/g, '');
const slug = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/&/g, 'et').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const SOURCES = [
    ...PROJECTS.map(p => ({ label: p.id, kind: 'projet', terms: p.tags })),
    ...EXPERIENCES.filter(e => e.tags.length).map(e => ({ label: slug(e.org), kind: 'exp', terms: e.tags })),
    ...CERTS.flatMap(g => g.items.map(c => ({ label: `${g.provider.toLowerCase()}:${slug(c.name).replace('machine-learning', 'ml').replace('working-with-the-', '')}`, kind: 'cert', terms: [c.name, ...c.topics] }))),
];
// Où une compétence a été utilisée ou validée (tags des projets, expériences, notions des certifs)
export function usedIn(skill) {
    const k = norm(skill);
    return SOURCES.filter(s => s.terms.some(t => {
        const n = norm(t);
        return n === k || (k.length >= 4 && (n.includes(k) || (n.length >= 4 && k.includes(n))));
    }));
}
const proofHtml = list => list.length
    ? `<span class="c">→</span> ${list.map(s => `<span class="src-${s.kind}">${s.label}</span>`).join('<span class="c">, </span>')}`
    : '';


// ── Coloration syntaxique minimale ────────────────────────────────────────
const TOK = /(#[^\n]*|\/\/[^\n]*)|("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`[^`]*`)|\b(def|return|import|from|as|for|in|if|else|const|let|await|async|function|new|print|FROM|RUN|COPY|WORKDIR|EXPOSE|CMD|AS)\b|\b(\d+(?:\.\d+)?)\b/g;
export function highlight(code, lang) {
    let out = '', last = 0, m;
    TOK.lastIndex = 0;
    while ((m = TOK.exec(code))) {
        out += esc(code.slice(last, m.index));
        const [t, com, str, kw, num] = m;
        // « # » n'est un commentaire qu'en Python / Dockerfile
        if (com && com.startsWith('#') && !['py', 'docker'].includes(lang)) { out += esc(t); }
        else out += `<span class="${com ? 'hl-c' : str ? 'hl-s' : kw ? 'hl-k' : 'hl-n'}">${esc(t)}</span>`;
        last = m.index + t.length;
    }
    return out + esc(code.slice(last));
}

// ── Vues compétences ──────────────────────────────────────────────────────

// V1 · tree + grep : dossiers dépliables, filtre en direct, preuve d'usage
export function skillsTree(root, { open = SKILLS.filter(s => s.focus).map(s => s.id) } = {}) {
    const total = SKILLS.reduce((n, s) => n + s.items.length, 0);
    root.innerHTML = `
      <div class="grep"><span class="s">$</span> grep -ri <input type="text" spellcheck="false" placeholder="python, xgboost, docker…" aria-label="Filtrer les compétences"> skills/ <span class="c grep-n"></span></div>
      <div class="tree-out"></div>
      <p class="c legend">→ où c'est prouvé : <span class="src-projet">projet</span> · <span class="src-exp">expérience</span> · <span class="src-cert">certification</span></p>`;
    const out = root.querySelector('.tree-out'), input = root.querySelector('input'), count = root.querySelector('.grep-n');
    const state = new Set(open);
    const draw = (q = '') => {
        const re = q ? new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') : null;
        let hits = 0;
        const fams = SKILLS.map((s, fi) => {
            const items = s.items.filter(t => !re || re.test(t));
            hits += items.length;
            if (re && !items.length) return '';
            const isOpen = re || state.has(s.id);
            const last = fi === SKILLS.length - 1;
            const lines = isOpen ? items.map((t, i) => {
                const lead = (last ? '    ' : '│   ') + (i === items.length - 1 ? '└── ' : '├── ');
                const name = re ? esc(t).replace(re, m => `<mark>${m}</mark>`) : esc(t);
                return `<div class="leaf"><span class="t">${lead}</span><span class="nm">${name}</span>${proofHtml(usedIn(t))}</div>`;
            }).join('') : '';
            return `<div class="fam"><button class="dir${s.focus ? ' focus' : ''}" data-id="${s.id}" aria-expanded="${!!isOpen}"><span class="t">${last ? '└── ' : '├── '}</span>${isOpen ? '▾' : '▸'} ${slug(s.name)}/ <span class="c">(${s.items.length})</span>${s.focus ? ' <span class="n">★</span>' : ''}</button>${lines}</div>`;
        }).join('');
        out.innerHTML = `<div class="c">skills/</div>${fams}`;
        count.textContent = re ? `— ${hits} résultat${hits > 1 ? 's' : ''}` : `— ${total} outils, ${SKILLS.length} familles · ★ priorité IA & Data`;
    };
    out.addEventListener('click', e => {
        const b = e.target.closest('.dir');
        if (!b || input.value) return;
        state.has(b.dataset.id) ? state.delete(b.dataset.id) : state.add(b.dataset.id);
        draw();
    });
    input.addEventListener('input', () => draw(input.value.trim()));
    draw();
    return { filter: q => { input.value = q; draw(q); } };
}

// V2 · commandes par famille : chaque bouton « exécute » une commande, l'historique s'empile
export function skillsCommands(root) {
    root.innerHTML = `<div class="cmds">${SKILLS.map(s => `<button data-id="${s.id}">skills --${s.id}</button>`).join('')}<button data-id="all">skills --all</button></div><div class="hist"></div>`;
    const hist = root.querySelector('.hist');
    const block = s => `<div class="lines"><div class="c">${esc(s.what)}</div>${s.items.map(t => `<div class="col-row"><span class="nm">${esc(t)}</span>${proofHtml(usedIn(t))}</div>`).join('')}</div>`;
    root.querySelector('.cmds').addEventListener('click', async e => {
        const b = e.target.closest('button');
        if (!b) return;
        const list = b.dataset.id === 'all' ? SKILLS : SKILLS.filter(s => s.id === b.dataset.id);
        const entry = document.createElement('div');
        entry.className = 'hist-entry';
        entry.innerHTML = `<div><span class="s">$</span> <span class="typed"></span></div>`;
        hist.prepend(entry);
        await typeInto(entry.querySelector('.typed'), `skills --${b.dataset.id}`, 18);
        entry.insertAdjacentHTML('beforeend', list.map(s => `<div class="n" style="margin-top:6px">${s.name.toUpperCase()}</div>${block(s)}`).join(''));
        printLines(entry, { step: 22 });
    });
    root.querySelector('.cmds button').click();
}

// V3 · extraits de code dépliables (cat fichier)
export function skillsSnippets(root) {
    root.innerHTML = SKILLS.map(s => {
        const sn = SNIPPETS.find(x => x.family === s.id);
        return `<details class="snip"${s.id === 'ml' ? ' open' : ''}>
          <summary><span class="s">$</span> cat ${sn ? sn.file : `${slug(s.name)}/README`} <span class="c">— ${s.name}${s.focus ? ' ★' : ''}</span></summary>
          ${sn ? `<pre class="code">${highlight(sn.code, sn.lang)}</pre>${sn.note ? `<p class="c">// ${sn.note}</p>` : ''}` : ''}
          <p class="c snip-tools">outils : ${s.items.map(esc).join(' · ')}</p>
        </details>`;
    }).join('') + `<p class="c" style="margin-top:12px">// extraits illustratifs : ils montrent le style de code, ce ne sont pas des copies des projets (sauf le Dockerfile).</p>`;
}

// V4 · tableau façon htop, triable par colonne
export function skillsHtop(root) {
    const rows = SKILLS.flatMap(s => s.items.map(t => ({ fam: s.name, tool: t, proof: usedIn(t), focus: !!s.focus })));
    let key = 'proof', dir = -1;
    const draw = () => {
        const sorted = [...rows].sort((a, b) => {
            const va = key === 'proof' ? a.proof.length : a[key], vb = key === 'proof' ? b.proof.length : b[key];
            return (va > vb ? 1 : va < vb ? -1 : 0) * dir;
        });
        const max = Math.max(...rows.map(r => r.proof.length), 1);
        const th = (k, l) => `<th><button data-k="${k}">${l}${key === k ? (dir > 0 ? ' ▲' : ' ▼') : ''}</button></th>`;
        root.innerHTML = `<p class="c">${rows.length} outils · cliquez sur une colonne pour trier</p>
        <table class="htop"><tr>${th('tool', 'OUTIL')}${th('fam', 'FAMILLE')}${th('proof', 'PREUVES')}<th>OÙ</th></tr>
        ${sorted.map(r => `<tr><td class="nm">${esc(r.tool)}</td><td class="${r.focus ? 'n' : 'c'}">${esc(r.fam)}</td>
          <td><span class="hbar">${'|'.repeat(Math.round(r.proof.length / max * 12)).padEnd(12, ' ')}</span> ${r.proof.length}</td>
          <td>${r.proof.map(s => `<span class="src-${s.kind}">${s.label}</span>`).join(' ')}</td></tr>`).join('')}</table>`;
    };
    root.addEventListener('click', e => {
        const b = e.target.closest('th button');
        if (!b) return;
        dir = key === b.dataset.k ? -dir : (b.dataset.k === 'proof' ? -1 : 1);
        key = b.dataset.k;
        draw();
    });
    draw();
}

// Styles communs à ces briques (s'appuient sur les variables du thème)
export const TERM_CSS = `
.pr-wait { visibility: hidden; } /* pas de clip-path ici : il fausserait la détection de visibilité */
.pr { animation: pr .32s steps(14, end) both; }
@keyframes pr { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0 0 0); } }
.boot { color: var(--dim); font-size: 13px; }
.boot div { white-space: pre-wrap; }
.boot-skip { color: var(--faint); font-size: 12px; margin-top: 18px; }
[data-bar] { white-space: pre; }
[data-bar] b { color: var(--amber); font-weight: 400; }
[data-bar] i { color: var(--faint); font-style: normal; }
mark { background: var(--amber); color: var(--bg); }
.src-projet { color: var(--green); } .src-exp { color: var(--cyan); } .src-cert { color: var(--amber); }
.grep { display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 8px; margin-bottom: 14px; }
.grep input { all: unset; border-bottom: 1px dashed var(--amber); min-width: 190px; color: var(--fg); caret-color: var(--amber); }
.grep input::placeholder { color: var(--faint); }
.tree-out .t { color: var(--faint); white-space: pre; }
.dir { all: unset; cursor: pointer; display: block; white-space: pre; }
.dir:hover { color: var(--amber); }
.dir:focus-visible { outline: 1px dashed var(--amber); }
.dir.focus { font-weight: 700; }
.leaf { white-space: pre-wrap; padding-left: 0; }
.leaf .nm, .col-row .nm { color: var(--fg); margin-right: 10px; }
.legend { margin-top: 14px; font-size: 12px; }
.cmds { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
.cmds button { all: unset; cursor: pointer; border: 1px solid var(--faint); padding: 3px 10px; color: var(--green); }
.cmds button:hover, .cmds button:focus-visible { border-color: var(--green); background: color-mix(in srgb, var(--green) 10%, transparent); }
.hist-entry { padding: 10px 0 14px; border-bottom: 1px dashed var(--faint); }
.col-row { padding-left: 2ch; }
.snip { border: 1px solid var(--faint); margin-bottom: 8px; }
.snip summary { cursor: pointer; padding: 6px 12px; list-style: none; }
.snip summary::-webkit-details-marker { display: none; }
.snip summary::before { content: '▸ '; color: var(--amber); }
.snip[open] summary::before { content: '▾ '; }
.snip summary:hover { background: color-mix(in srgb, var(--amber) 8%, transparent); }
.snip .code { margin: 0; padding: 12px 14px; border-top: 1px solid var(--faint); overflow-x: auto; font-size: 13px; line-height: 1.55; background: color-mix(in srgb, var(--bg) 60%, transparent); }
.snip > p { padding: 0 14px 10px; }
.snip-tools { padding-top: 8px !important; font-size: 12.5px; }
.hl-c { color: var(--dim); font-style: italic; } .hl-s { color: var(--green); } .hl-k { color: var(--red); } .hl-n { color: var(--amber); }
.htop th button { all: unset; cursor: pointer; color: var(--bg); }
.htop th { background: var(--green); color: var(--bg); padding: 2px 10px 2px 4px; }
.htop td { padding: 3px 10px 3px 4px; border-bottom: 0; }
.htop tr:hover td { background: color-mix(in srgb, var(--amber) 9%, transparent); }
.htop .hbar { color: var(--green); white-space: pre; }
`;
