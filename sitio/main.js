// ---------- Datos de proyectos ----------
const PROJECTS = {
  gud: {
    title: 'GÜD',
    sub: 'bebida vegetal',
    tags: ['Dirección de arte', 'Ilustración', 'Motion'],
    text: 'GÜD es una marca mexicana de productos y bebidas de origen vegetal. Su propuesta se centra en ofrecer alternativas accesibles y deliciosas para el día a día, promoviendo una alimentación más consciente sin renunciar al sabor ni a la practicidad.',
    gallery: [
      ['gud-hero.jpg', 'g-12'],
      ['gud-social.jpg', 'g-12'],
      ['quote', 'Como dirección creativa fue muy importante resaltar el espíritu de marca y sus atributos, experimentando desde ilustración, creación de personaje y animación.'],
      ['gud-hotcakes.jpg', 'g-8'],
      ['gud-lifestyle.jpg', 'g-4'],
      ['gud-poster.jpg', 'g-6'],
      ['gud-drink.jpg', 'g-6'],
      ['gud-loteria.jpg', 'g-12'],
      ['gud-almendro.jpg', 'g-5'],
      ['gud-cena.jpg', 'g-7'],
      ['gud-ilustra.jpg', 'g-5'],
      ['gud-naranja.jpg', 'g-7'],
    ],
  },
  smirnoff: {
    title: 'Smirnoff',
    sub: 'El Diablito',
    tags: ['Ilustración', 'Packaging', 'Campaña'],
    text: 'Ilustración para la edición Spicy Tamarind de Smirnoff. Un diablito inspirado en la gráfica popular mexicana y la lotería, que se convierte en personaje, empaque y serie de cartas.',
    gallery: [
      ['smirnoff-main.jpg', 'g-12'],
      ['smirnoff-cartas.jpg', 'g-4'],
      ['smirnoff-botella.jpg', 'g-8'],
    ],
  },
  nodo: {
    title: 'Nodo',
    sub: 'punto de conexión',
    tags: ['Identidad', 'Póster', 'Ilustración'],
    text: 'Identidad y piezas gráficas para Nodo Vol. 1, un encuentro de family meal + DJ set en Juárez, CDMX. Ilustración con textura de grabado, tipografía contrastada y un azul eléctrico como protagonista.',
    gallery: [
      ['nodo-logo.jpg', 'g-6'],
      ['nodo-perro.jpg', 'g-6'],
      ['nodo-poster.jpg', 'g-6'],
      ['nodo-frutero.jpg', 'g-6'],
    ],
  },
  loteria: {
    title: 'Lotería GÜD',
    sub: 'sabores de México',
    tags: ['Ilustración', 'Merchandising', 'Branding'],
    text: 'Una lotería ilustrada para GÜD que reinterpreta los personajes clásicos con los sabores e ingredientes de la marca: El Coco, La Barista, La Chancla, La Soya… una pieza de merch que celebra lo mexicano.',
    gallery: [
      ['gud-loteria.jpg', 'g-12'],
      ['gud-poster.jpg', 'g-6'],
      ['gud-hotcakes.jpg', 'g-6'],
    ],
  },
};
const ORDER = Object.keys(PROJECTS);

// ---------- Nav al hacer scroll ----------
const nav = document.querySelector('.nav');
const hero = document.querySelector('.hero');
const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > hero.offsetHeight - 80);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---------- Menú móvil ----------
const burger = document.querySelector('.nav__burger');
burger.addEventListener('click', () => document.body.classList.toggle('menu-open'));
document.querySelectorAll('.menu a').forEach(a =>
  a.addEventListener('click', () => document.body.classList.remove('menu-open'))
);

// ---------- Formas del hero con el mouse ----------
const shapes = [...document.querySelectorAll('.shape')];
hero.addEventListener('pointermove', e => {
  const x = (e.clientX / window.innerWidth - 0.5);
  const y = (e.clientY / window.innerHeight - 0.5);
  shapes.forEach((s, i) => {
    const d = (i % 3 + 1) * 14;
    s.style.translate = `${x * d}px ${y * d}px`;
  });
});

// ---------- Aparición de tarjetas ----------
const io = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('.card').forEach(c => io.observe(c));

// ---------- Servicios: se iluminan al hacer scroll ----------
const services = [...document.querySelectorAll('.services__list li')];
const activateService = () => {
  const mid = window.innerHeight / 2;
  let best = null, bestD = Infinity;
  services.forEach(li => {
    const r = li.getBoundingClientRect();
    const d = Math.abs(r.top + r.height / 2 - mid);
    if (d < bestD) { bestD = d; best = li; }
  });
  services.forEach(li => li.classList.toggle('is-active', li === best));
};
window.addEventListener('scroll', activateService, { passive: true });
activateService();

// ---------- Panel de proyecto ----------
const panel = document.querySelector('.panel');
const panelInner = panel.querySelector('.panel__inner');
const panelContent = panel.querySelector('.panel__content');

function renderProject(key) {
  const p = PROJECTS[key];
  const next = ORDER[(ORDER.indexOf(key) + 1) % ORDER.length];
  const gallery = p.gallery.map(([src, cls]) =>
    src === 'quote'
      ? `<p class="case__quote">“${cls}”</p>`
      : `<img class="${cls}" src="img/${src}" alt="${p.title}" loading="lazy">`
  ).join('');
  panelContent.innerHTML = `
    <div class="case__head">
      <div>
        <p class="eyebrow" style="color:var(--blue)">Proyecto</p>
        <h2 class="case__title">${p.title}<em>${p.sub}</em></h2>
      </div>
      <div>
        <p class="case__text">${p.text}</p>
        <div class="case__tags">${p.tags.map((t, i) =>
          `<span class="pill ${['pill--lime', 'pill--pink', 'pill--white'][i % 3]}">${t}</span>`).join('')}
        </div>
      </div>
    </div>
    <div class="case__gallery">${gallery}</div>
    <div class="case__next" data-next="${next}">
      <span>Siguiente proyecto</span>
      <strong>${PROJECTS[next].title} <em>${PROJECTS[next].sub}</em> →</strong>
    </div>`;
  panelContent.querySelector('.case__next').addEventListener('click', () => openProject(next));
  panelInner.scrollTop = 0;
}

function openProject(key) {
  renderProject(key);
  panel.classList.add('is-open');
  panel.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
  history.replaceState(null, '', `#${key}`);
}
function closeProject() {
  panel.classList.remove('is-open');
  panel.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
  history.replaceState(null, '', '#proyectos');
}

document.querySelectorAll('.card').forEach(c =>
  c.addEventListener('click', () => openProject(c.dataset.project))
);
panel.querySelector('.panel__close').addEventListener('click', closeProject);
panel.addEventListener('click', e => { if (e.target === panel) closeProject(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeProject(); });

const initial = location.hash.slice(1);
if (PROJECTS[initial]) openProject(initial);

// ---------- Partículas llevadas por el viento (inicio) ----------
(() => {
  const canvas = document.querySelector('.hero__wind');
  if (!canvas || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = canvas.getContext('2d');
  const colors = ['255,255,255', '252,255,130', '255,248,238', '175,197,255'];
  let w, h, dpr, parts = [], running = false, raf = 0, t = 0;

  const make = (anywhere) => ({
    x: anywhere ? Math.random() * w : -10 - Math.random() * 60,
    y: h * (0.25 + Math.random() * 0.75),
    r: 0.6 + Math.random() * 1.8,
    vx: 0.35 + Math.random() * 0.9,
    phase: Math.random() * Math.PI * 2,
    amp: 0.2 + Math.random() * 0.5,
    a: 0.25 + Math.random() * 0.5,
    c: colors[(Math.random() * colors.length) | 0],
    seed: Math.random() < 0.25,          // algunas son "semillitas" alargadas
  });

  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.min(70, Math.round(w / 22));
    parts = Array.from({ length: n }, () => make(true));
  }

  function frame() {
    t += 0.016;
    const gust = 0.8 + Math.sin(t * 0.35) * 0.45 + Math.sin(t * 1.3) * 0.15; // ráfagas suaves
    ctx.clearRect(0, 0, w, h);
    for (const p of parts) {
      p.x += p.vx * gust;
      p.y += Math.sin(t * 1.2 + p.phase) * p.amp - 0.05 * gust;
      if (p.x > w + 20 || p.y < -20) Object.assign(p, make(false));
      ctx.fillStyle = `rgba(${p.c},${p.a})`;
      ctx.beginPath();
      if (p.seed) {
        ctx.ellipse(p.x, p.y, p.r * 2.6, p.r * 0.8, Math.sin(t + p.phase) * 0.6, 0, Math.PI * 2);
      } else {
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      }
      ctx.fill();
    }
    raf = requestAnimationFrame(frame);
  }
  const start = () => { if (!running) { running = true; raf = requestAnimationFrame(frame); } };
  const stop = () => { running = false; cancelAnimationFrame(raf); };

  resize();
  addEventListener('resize', resize);
  new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop())).observe(canvas);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
})();
