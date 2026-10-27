/* ===================================================================
   OM.BITES — script.js
   Los precios, packs y valores nutricionales viven en datos.js.
   =================================================================== */
const D = window.OMBITES;

// ─── Formato ───
const fmtS = n => 'S/ ' + (Number.isInteger(n) ? n : n.toFixed(2));
const fmtN = (n, u) => (Number.isInteger(n) ? n : n.toFixed(1)) + (u ? ' ' + u : '');
const redondea = n => Math.floor(n + 0.5);

// ─── Precios: todo elemento con data-precio / data-pack / data-caja se llena desde datos.js ───
document.querySelectorAll('[data-precio]').forEach(el => { const v = D.precios[el.dataset.precio]; if (v != null) el.textContent = fmtS(v); });
document.querySelectorAll('[data-pack]').forEach(el => { const v = D.packs3[el.dataset.pack]; if (v != null) el.textContent = fmtS(v); });
document.querySelectorAll('[data-caja]').forEach(el => { const c = D.cajas.find(c => c.id === el.dataset.caja); if (c) el.textContent = fmtS(c.precio); });
document.querySelectorAll('[data-caja-unit]').forEach(el => { const c = D.cajas.find(c => c.id === el.dataset.cajaUnit); if (c) el.textContent = fmtS(Math.round(c.precio / 6 * 100) / 100) + ' por bite'; });

// ─── Tablas nutricionales (con selector Barra · Bite · 100 g) ───
const FILAS = [
    ['Grasa total', 'grasa', 'g'],
    ['Grasas saturadas', 'sat', 'g', 'sub'],
    ['Grasas trans', 'trans', 'g', 'sub'],
    ['Colesterol', 'col', 'mg'],
    ['Sodio', 'sod', 'mg'],
    ['Total carbohidratos', 'carb', 'g'],
    ['Fibra dietaria', 'fibra', 'g', 'sub'],
    ['Azúcares', 'azuc', 'g', 'sub'],
    ['Proteína', 'prot', 'g', 'prot-row']
];

function pintaNutricion(host) {
    const n = D.nutricion[host.dataset.nutri];
    if (!n) return;
    const esShanti = n.tipo === 'shanti';
    const vistas = (host.dataset.views || 'porc,bite,p100').split(',').filter(v => n[v]);
    const nombre = { porc: esShanti ? 'Porción' : 'Barra', bite: 'Bite', p100: '100 g' };
    const leyenda = {
        porc: `Por ${esShanti ? 'porción' : 'barra'} · ${n.porcion} g aprox.`,
        bite: 'Por bite · valores referenciales',
        p100: 'Por 100 g'
    };
    host.innerHTML = '';

    let seg = null;
    if (vistas.length > 1) {
        seg = document.createElement('div');
        seg.className = 'nutri-seg';
        seg.setAttribute('role', 'group');
        seg.setAttribute('aria-label', 'Ver valores por');
        host.appendChild(seg);
    }
    const cuerpo = document.createElement('div');
    host.appendChild(cuerpo);

    function muestra(v) {
        const d = n[v];
        if (seg) seg.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', b.dataset.v === v));
        cuerpo.innerHTML =
            `<p class="nutri-ref">${leyenda[v]}</p>` +
            `<div class="nutri-highlight"><div class="nutri-cal"><span class="nutri-big">${d.kcal}</span>&nbsp;kcal</div>` +
            `<div class="nutri-prot-badge">${redondea(d.prot)}G<br><small>PROTEÍNA</small></div></div>` +
            `<table class="nutri-table nutri-table--2"><tbody>` +
            FILAS.map(([t, k, u, cls]) => `<tr${cls ? ` class="${cls}"` : ''}><td>${cls === 'prot-row' ? `<strong>${t}</strong>` : t}</td><td class="val">${cls === 'prot-row' ? `<strong>${fmtN(d[k], u)}</strong>` : fmtN(d[k], u)}</td></tr>`).join('') +
            `</tbody></table>`;
    }
    if (seg) {
        vistas.forEach(v => {
            const b = document.createElement('button');
            b.type = 'button'; b.dataset.v = v; b.textContent = nombre[v];
            b.addEventListener('click', () => muestra(v));
            seg.appendChild(b);
        });
    }
    muestra(vistas[0]);
}
document.querySelectorAll('[data-nutri]').forEach(pintaNutricion);

// ─── Arma tu pedido ───
const cant = {};                       // id → cantidad
D.items.forEach(it => { cant[it.id] = 0; });

(function () {
    const lista = document.getElementById('builderList');
    if (!lista) return;
    const lineas = document.getElementById('summaryLines');
    const totalEl = document.getElementById('builderTotal');
    const hintEl = document.getElementById('summaryHint');
    const sendBtn = document.getElementById('builderSend');
    const MAX = 20;

    // Lista agrupada (Barras · Línea Shanti · Cajas Bites)
    let grupo = '';
    D.items.forEach(it => {
        if (it.grupo !== grupo) {
            grupo = it.grupo;
            const h = document.createElement('h4');
            h.className = 'builder-group'; h.textContent = grupo;
            lista.appendChild(h);
        }
        const esCaja = it.id.startsWith('caja-');
        const precio = esCaja
            ? `${fmtS(D.cajas.find(c => c.id === it.id).precio)} · 6 bites`
            : `${fmtS(D.precios[it.id])} · pack x3 ${fmtS(D.packs3[it.id])}`;
        const row = document.createElement('div');
        row.className = 'builder-item'; row.dataset.id = it.id;
        row.innerHTML =
            `<img class="builder-thumb" loading="lazy" src="${it.img}" alt="">` +
            `<div class="builder-info"><span class="builder-name">${it.nombre}</span><span class="builder-price">${precio}</span></div>` +
            `<div class="builder-stepper">` +
            `<button class="step-btn" data-act="minus" aria-label="Quitar ${it.nombre}">−</button>` +
            `<span class="step-qty" aria-live="polite">0</span>` +
            `<button class="step-btn" data-act="plus" aria-label="Agregar ${it.nombre}">+</button></div>`;
        row.querySelectorAll('.step-btn').forEach(b => b.addEventListener('click', () => {
            cant[it.id] = Math.max(0, Math.min(MAX, cant[it.id] + (b.dataset.act === 'plus' ? 1 : -1)));
            pinta();
        }));
        lista.appendChild(row);
    });

    // Precio de una línea: cada 3 del MISMO sabor = pack x3
    function linea(it, q) {
        if (it.id.startsWith('caja-')) return { precio: q * D.cajas.find(c => c.id === it.id).precio, ahorro: 0, packs: 0 };
        const unit = D.precios[it.id], pack = D.packs3[it.id];
        const packs = Math.floor(q / 3);
        const precio = packs * pack + (q % 3) * unit;
        return { precio, ahorro: q * unit - precio, packs };
    }

    function pinta() {
        let total = 0, ahorro = 0, barras = 0, sabores = 0, hayCaja = false;
        const elegidos = [];
        D.items.forEach(it => {
            const q = cant[it.id];
            const row = lista.querySelector(`.builder-item[data-id="${it.id}"]`);
            row.querySelector('.step-qty').textContent = q;
            row.classList.toggle('active', q > 0);
            if (!q) return;
            const l = linea(it, q);
            total += l.precio; ahorro += l.ahorro;
            if (it.id.startsWith('caja-')) hayCaja = true; else { barras += q; sabores++; }
            elegidos.push({ it, q, l });
        });
        lineas.innerHTML = elegidos.length
            ? elegidos.map(({ it, q, l }) => `<li><span>${q} × ${it.nombre}${l.packs ? ` <small>(${l.packs} pack${l.packs > 1 ? 's' : ''} x3)</small>` : ''}</span><span>${fmtS(l.precio)}</span></li>`).join('')
            : '<li class="summary-empty">Aún no agregaste nada 👀</li>';
        totalEl.textContent = fmtS(total);
        if (ahorro > 0) { hintEl.hidden = false; hintEl.textContent = `🎉 Pack x3 aplicado: ahorras ${fmtS(ahorro)}.`; }
        else if (sabores > 1 && barras >= 3) { hintEl.hidden = false; hintEl.textContent = '💡 Si mezclas sabores te confirmamos por WhatsApp si aplica precio de pack. 3 del mismo sabor = pack x3.'; }
        else { hintEl.hidden = true; }
        sendBtn.disabled = elegidos.length === 0;
        sendBtn.dataset.total = total;
        sendBtn.dataset.caja = hayCaja ? '1' : '';
    }

    sendBtn.addEventListener('click', () => {
        const elegidos = D.items.filter(it => cant[it.id] > 0);
        if (!elegidos.length) return;
        const txt = elegidos.map(it => {
            const l = linea(it, cant[it.id]);
            return `• ${cant[it.id]} ${it.nombre}${l.packs ? ` (incluye ${l.packs} pack x3)` : ''}`;
        }).join('\n');
        const val = id => (document.getElementById(id)?.value || '').trim();
        const name = val('ordName'), addr = val('ordAddr'), phone = val('ordPhone');
        let datos = '';
        if (name) datos += `\nNombre: ${name}`;
        if (addr) datos += `\nDirección/Distrito: ${addr}`;
        if (phone) datos += `\nNúmero: ${phone}`;
        const cajaNota = sendBtn.dataset.caja ? '\n\nPara la caja de Bites, ¿con qué sabores la armamos? 🍫' : '';
        const text = `¡Hola OM.BITES! 😋 Quiero armar este pedido:\n${txt}\n\nTotal aprox. ${fmtS(+sendBtn.dataset.total)} (sin delivery).${datos}${cajaNota}\n\n¿Me confirmas disponibilidad, el precio final y el delivery? 🙌`;
        window.open(`https://api.whatsapp.com/send/?phone=${D.whatsapp}&text=${encodeURIComponent(text)}`, '_blank');
        const prev = sendBtn.innerHTML;
        sendBtn.innerHTML = '✓ Pedido abierto en WhatsApp';
        sendBtn.disabled = true;
        setTimeout(() => { sendBtn.innerHTML = prev; sendBtn.disabled = false; }, 2200);
    });

    // Botones "Lo quiero" / "Agregar" de las tarjetas: suman 1 al armador
    document.querySelectorAll('[data-add]').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.add;
            if (!(id in cant)) return;
            cant[id] = Math.min(MAX, cant[id] + 1);
            pinta();
            const prev = btn.innerHTML;
            btn.innerHTML = '✓ Agregado';
            btn.classList.add('is-added');
            setTimeout(() => { btn.innerHTML = prev; btn.classList.remove('is-added'); }, 1600);
            document.getElementById('armar').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    pinta();
})();

// ─── Acordeón de ingredientes y nutrición · navegación ───
function toggleAccordion(btn) {
    const panel = btn.nextElementSibling;
    const isOpen = panel.classList.contains('open');
    document.querySelectorAll('.nutri-panel.open').forEach(p => p.classList.remove('open'));
    document.querySelectorAll('.btn-accordion.active').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-expanded', 'false');
        b.querySelector('span').textContent = b.dataset.label || 'Ver ingredientes y nutrición';
    });
    if (!isOpen) {
        const span = btn.querySelector('span');
        if (!btn.dataset.label) btn.dataset.label = span.textContent;
        panel.classList.add('open');
        btn.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
        span.textContent = btn.dataset.label.replace(/^Ver/, 'Ocultar');
    }
}

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    navToggle.classList.toggle('active');
});
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
    });
});

// ── Ritual OM 555 (modal interactivo) ──
(function () {
    const modal = document.getElementById('ritualModal');
    const openBtn = document.getElementById('openRitual');
    if (!modal || !openBtn) return;
    const steps = [...modal.querySelectorAll('.rstep')];
    const dots = [...modal.querySelectorAll('.rdot')];
    const prevBtn = modal.querySelector('.ritual-prev');
    const nextBtn = modal.querySelector('.ritual-next');
    const max = steps.length;
    let cur = 1;

    const fmt = s => Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');

    function resetTimers() {
        modal.querySelectorAll('.rtimer').forEach(t => {
            if (t._tick) { clearInterval(t._tick); t._tick = null; }
            t.querySelector('.rtimer-display').textContent = fmt(+t.dataset.seconds);
            t.querySelector('.rtimer-btn').textContent = t.dataset.label;
        });
    }
    function show(n) {
        cur = Math.max(1, Math.min(max, n));
        steps.forEach(s => s.classList.toggle('active', +s.dataset.step === cur));
        dots.forEach(d => d.classList.toggle('active', +d.dataset.step === cur));
        prevBtn.disabled = cur === 1;
        nextBtn.textContent = cur === max ? '¡Listo! ✓' : 'Siguiente →';
    }
    function open() { modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; show(1); modal.querySelector('.ritual-close').focus(); }
    function close() { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; resetTimers(); openBtn.focus(); }

    openBtn.addEventListener('click', open);
    modal.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', close));
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) close(); });
    prevBtn.addEventListener('click', () => show(cur - 1));
    nextBtn.addEventListener('click', () => { cur === max ? close() : show(cur + 1); });
    dots.forEach(d => d.addEventListener('click', () => show(+d.dataset.step)));

    modal.querySelectorAll('.rtimer').forEach(t => {
        const total = +t.dataset.seconds;
        const disp = t.querySelector('.rtimer-display');
        const btn = t.querySelector('.rtimer-btn');
        t.dataset.label = btn.textContent;
        btn.addEventListener('click', () => {
            // Si ya está contando o terminó → reiniciar a estado inicial
            if (t._tick) { clearInterval(t._tick); t._tick = null; disp.textContent = fmt(total); btn.textContent = t.dataset.label; return; }
            // Arrancar cuenta regresiva REAL basada en el reloj del sistema
            const start = Date.now();
            btn.textContent = 'Detener ✕';
            disp.textContent = fmt(total);
            t._tick = setInterval(() => {
                const remaining = total - Math.floor((Date.now() - start) / 1000);
                if (remaining <= 0) {
                    clearInterval(t._tick); t._tick = null;
                    disp.textContent = '¡Lista! 😋';
                    btn.textContent = 'Repetir';
                    if (navigator.vibrate) navigator.vibrate(200);
                } else {
                    disp.textContent = fmt(remaining);
                }
            }, 250);
        });
    });
})();

// ── Club: tarjeta de sellos jugable ──
(function () {
    const card = document.querySelector('.club-card');
    const wrap = document.getElementById('clubStickers');
    if (!card || !wrap) return;
    const slots = [...wrap.querySelectorAll('.sticker:not(.reward)')];
    const reward = wrap.querySelector('.sticker.reward');
    const fill = document.getElementById('clubFill');
    const status = document.getElementById('clubStatus');
    const total = slots.length;
    let done = false;

    function burst() {
        const colors = ['#7A1A1A', '#F5D272', '#9B2020', '#E8D730'];
        for (let i = 0; i < 42; i++) {
            const b = document.createElement('span');
            b.className = 'confetti-bit';
            b.style.left = '50%'; b.style.top = '42%';
            b.style.background = colors[i % colors.length];
            b.style.setProperty('--dx', (Math.random() * 2 - 1) * 230 + 'px');
            b.style.setProperty('--dy', -(Math.random() * 190 + 120) + 'px');
            b.style.setProperty('--rot', (Math.random() * 720 - 360) + 'deg');
            b.style.animationDelay = (Math.random() * 0.15) + 's';
            card.appendChild(b);
            setTimeout(() => b.remove(), 1700);
        }
    }
    function update() {
        const n = slots.filter(s => s.classList.contains('stamped')).length;
        if (fill) fill.style.width = (n / total * 100) + '%';
        if (n >= total) {
            reward.classList.remove('locked'); reward.classList.add('unlocked');
            if (status) status.innerHTML = '¡Lo lograste! Tu 8vo pack <strong>va por la casa</strong> 🎉';
            if (!done) { done = true; burst(); if (navigator.vibrate) navigator.vibrate([60, 40, 120]); }
        } else {
            reward.classList.add('locked'); reward.classList.remove('unlocked');
            if (status) status.textContent = `👆 Toca los sellos: te ${total - n === 1 ? 'falta' : 'faltan'} ${total - n} para tu pack gratis 🎁`;
        }
    }
    slots.forEach(s => {
        s.addEventListener('click', () => {
            if (s.classList.contains('stamped')) return;
            s.classList.add('stamped', 'just');
            if (navigator.vibrate) navigator.vibrate(30);
            setTimeout(() => s.classList.remove('just'), 460);
            update();
        });
    });
    reward.addEventListener('click', () => {
        if (!done) return;
        slots.forEach(s => s.classList.remove('stamped'));
        done = false; update();
    });
    update();
})();

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
