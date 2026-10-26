// Строительные блоки кадров «Селлер с нуля» (9:16, 1080×1920).
// Каждая функция возвращает HTML-строку. Анимация — через data-d (задержка появления, сек)
// и data-count (счётчик числа); всё это оживляет renderAt() в player.html.

const C = {
  ink: '#1F1F1F', green: '#2E6B57', red: '#C8463D', yellow: '#D9A21B',
  hood: '#7B4BB7', hoodDark: '#6A3EA3', anya: '#3E6E8E', anyaHair: '#8A5A3B',
};

const fmt = (n) => Math.round(n).toLocaleString('ru-RU').replace(/ /g, ' ');

// ---------- персонажи ----------

function face(emotion) {
  const eyes = {
    neutral: '<circle cx="62" cy="80" r="7"/><circle cx="108" cy="80" r="7"/>',
    shocked: '<circle cx="62" cy="76" r="11" fill="#fff" stroke="#222" stroke-width="4"/><circle cx="62" cy="76" r="5"/>' +
             '<circle cx="108" cy="76" r="11" fill="#fff" stroke="#222" stroke-width="4"/><circle cx="108" cy="76" r="5"/>',
  };
  const e = eyes[emotion] || eyes.neutral;
  const mouth = {
    neutral: '<path d="M70 114 L100 114"/>',
    smile: '<path d="M68 110 Q85 124 102 110"/>',
    happy: '<path d="M64 106 Q85 134 106 106 Z" fill="#fff"/>',
    worried: '<path d="M70 118 Q85 108 100 118"/>',
    angry: '<path d="M70 118 Q85 108 100 118"/>',
    shocked: '<ellipse cx="85" cy="118" rx="10" ry="13" fill="#fff"/>',
  }[emotion] || '<path d="M70 114 L100 114"/>';
  const brows = {
    worried: '<path d="M50 56 L72 50 M98 50 L120 56"/>',
    angry: '<path d="M50 52 L74 62 M96 62 L120 52"/>',
    shocked: '<path d="M48 48 L74 46 M96 46 L122 48"/>',
  }[emotion] || '';
  return `<g class="eyes" fill="#222">${e}</g>
    <g fill="none" stroke="#222" stroke-width="5" stroke-linecap="round">${mouth}${brows}</g>`;
}

function prop(p) {
  if (p === 'phone') return '<rect x="150" y="270" width="44" height="78" rx="8" fill="#2B2B2B" stroke="#222" stroke-width="4"/><rect x="156" y="278" width="32" height="56" rx="3" fill="#8FB3D9"/>';
  if (p === 'notepad') return '<rect x="140" y="250" width="70" height="92" rx="4" fill="#fff" stroke="#222" stroke-width="4"/><path d="M152 274 H198 M152 292 H198 M152 310 H186" stroke="#999" stroke-width="4"/>';
  if (p === 'box') return '<rect x="30" y="230" width="110" height="90" fill="#C9A77A" stroke="#222" stroke-width="5"/><path d="M85 230 V320" stroke="#222" stroke-width="4"/>';
  return '';
}

// x — центр персонажа по горизонтали, ground — где стоят ноги.
function hero({ x = 300, ground = 1500, s = 1.25, emotion = 'neutral', p = '', d = 0, flip = false } = {}) {
  const tx = x - 85 * s, ty = ground - 552 * s;
  const fl = flip ? `translate(${170 * s},0) scale(-1,1)` : '';
  return `<g class="a" data-d="${d}" transform="translate(${tx},${ty}) ${fl} scale(${s})">
    <line x1="62" y1="330" x2="54" y2="540" stroke="#1E2A3A" stroke-width="16" stroke-linecap="round"/>
    <line x1="108" y1="330" x2="116" y2="540" stroke="#1E2A3A" stroke-width="16" stroke-linecap="round"/>
    <ellipse cx="48" cy="546" rx="26" ry="10" fill="#222"/><ellipse cx="122" cy="546" rx="26" ry="10" fill="#222"/>
    <path d="M22 175 Q10 120 50 140 L120 140 Q160 120 148 175 Z" fill="${C.hoodDark}" stroke="#222" stroke-width="5" stroke-linejoin="round"/>
    <path d="M20 170 Q85 140 150 170 L160 340 L10 340 Z" fill="${C.hood}" stroke="#222" stroke-width="5" stroke-linejoin="round"/>
    <rect x="45" y="262" width="80" height="44" rx="8" fill="${C.hoodDark}" stroke="#222" stroke-width="4"/>
    <circle cx="0" cy="330" r="14" fill="#fff" stroke="#222" stroke-width="4"/>
    <circle cx="170" cy="330" r="14" fill="#fff" stroke="#222" stroke-width="4"/>
    ${prop(p)}
    <circle cx="85" cy="80" r="82" fill="#fff" stroke="#222" stroke-width="6"/>
    ${face(emotion)}
  </g>`;
}

function anya({ x = 780, ground = 1500, s = 1.2, emotion = 'neutral', d = 0, p = '' } = {}) {
  const tx = x - 85 * s, ty = ground - 552 * s;
  return `<g class="a" data-d="${d}" transform="translate(${tx},${ty}) scale(${s})">
    <line x1="66" y1="340" x2="60" y2="540" stroke="#1E2A3A" stroke-width="14" stroke-linecap="round"/>
    <line x1="104" y1="340" x2="110" y2="540" stroke="#1E2A3A" stroke-width="14" stroke-linecap="round"/>
    <ellipse cx="54" cy="546" rx="22" ry="9" fill="#222"/><ellipse cx="116" cy="546" rx="22" ry="9" fill="#222"/>
    <path d="M-4 40 Q-6 -20 85 -14 Q176 -20 174 40 L178 200 L-8 200 Z" fill="${C.anyaHair}" stroke="#222" stroke-width="5" stroke-linejoin="round"/>
    <path d="M30 168 Q85 150 140 168 L150 350 L20 350 Z" fill="${C.anya}" stroke="#222" stroke-width="5" stroke-linejoin="round"/>
    <circle cx="16" cy="336" r="13" fill="#fff" stroke="#222" stroke-width="4"/>
    <circle cx="154" cy="336" r="13" fill="#fff" stroke="#222" stroke-width="4"/>
    ${prop(p)}
    <circle cx="85" cy="84" r="78" fill="#fff" stroke="#222" stroke-width="6"/>
    <path d="M10 70 Q20 0 85 4 Q150 0 160 70 Q120 34 85 40 Q50 34 10 70 Z" fill="${C.anyaHair}" stroke="#222" stroke-width="5" stroke-linejoin="round"/>
    <g transform="translate(0,6)">${face(emotion)}</g>
  </g>`;
}

// ---------- фоны ----------

function room(inner, { night = false } = {}) {
  const wall = night ? '#3A3F4A' : '#E9E2D6', floor = night ? '#2E323B' : '#D8CFC0';
  const sky = night ? '#2A3550' : '#BFD3E2', bld = night ? '#3E4A66' : '#9FB4C6', win = night ? '#F2C14E' : '#F2C14E';
  return `<svg class="bg" width="1080" height="1920">
    <rect width="1080" height="1500" fill="${wall}"/><rect y="1500" width="1080" height="420" fill="${floor}"/>
    <line x1="0" y1="1500" x2="1080" y2="1500" stroke="#B9AE9C" stroke-width="4"/>
    <rect x="600" y="330" width="400" height="440" fill="${sky}" stroke="#7E8A93" stroke-width="10"/>
    <g fill="${bld}"><rect x="630" y="520" width="90" height="250"/><rect x="735" y="460" width="110" height="310"/><rect x="860" y="560" width="120" height="210"/></g>
    <g fill="${win}"><rect x="655" y="560" width="18" height="18"/><rect x="770" y="500" width="18" height="18"/><rect x="890" y="600" width="18" height="18"/><rect x="800" y="580" width="18" height="18"/></g>
    <line x1="800" y1="330" x2="800" y2="770" stroke="#7E8A93" stroke-width="8"/>
    ${inner}
  </svg>`;
}

function desk({ x = 470, ground = 1500, laptop = true, d = 0 } = {}) {
  return `<g class="a" data-d="${d}">
    <rect x="${x}" y="${ground - 330}" width="520" height="26" fill="#6B6B6B" stroke="#222" stroke-width="5"/>
    <rect x="${x + 30}" y="${ground - 304}" width="460" height="300" fill="#7A7A7A" stroke="#222" stroke-width="5"/>
    ${laptop ? `<path d="M${x + 170} ${ground - 330} L${x + 200} ${ground - 440} L${x + 380} ${ground - 440} L${x + 410} ${ground - 330} Z" fill="#3B3B3B" stroke="#222" stroke-width="5" stroke-linejoin="round"/>` : ''}
  </g>`;
}

// ---------- текстовые элементы ----------

const label = (text, { x = 60, y = 150, d = 0 } = {}) =>
  `<div class="label a" data-d="${d}" style="left:${x}px;top:${y}px">${text}</div>`;

const badge = (text, { y = 150, d = 0 } = {}) =>
  `<div class="badge a" data-d="${d}" style="top:${y}px">${text}</div>`;

// tail: 'left' | 'right' — в какую сторону смотрит хвостик пузыря
const bubble = (text, { x = 80, y = 520, w = 620, d = 0.2, tail = 'left' } = {}) =>
  `<div class="bubble a tail-${tail}" data-d="${d}" style="left:${x}px;top:${y}px;max-width:${w}px">${text}</div>`;

const thought = (text, { x = 120, y = 560, d = 0.3 } = {}) =>
  `<div class="thought a" data-d="${d}" style="left:${x}px;top:${y}px">${text}<i></i><i></i></div>`;

const scene = (html, opts = {}) => ({ html, ...opts });

// ---------- типовые кадры ----------

const bigNumber = (value, { sub = '', color = '#fff', dark = true, prefix = '', suffix = ' ₽' } = {}) => scene(
  `<div class="full ${dark ? 'dark' : ''}"><div class="center">
     <div class="mega a" style="color:${color}"><span data-count="${value}">${fmt(value)}</span>${suffix}</div>
     ${sub ? `<div class="sub a" data-d="0.5">${sub}</div>` : ''}
   </div></div>`, { sfx: 'click' });

const bigText = (text, { sub = '', color = '#1F1F1F', dark = false, size = 120 } = {}) => scene(
  `<div class="full ${dark ? 'dark' : ''}"><div class="center">
     <div class="mega a" style="color:${color};font-size:${size}px">${text}</div>
     ${sub ? `<div class="sub a" data-d="0.4">${sub}</div>` : ''}
   </div></div>`);

const titleCard = (eyebrow, title, sub) => scene(
  `<div class="full"><div class="center">
     <div class="eyebrow a">${eyebrow}</div>
     <div class="title a" data-d="0.15">${title}</div>
     <div class="sub a" data-d="0.4">${sub}</div>
   </div></div>`);

function budgetBar(value, total, d = 0.5) {
  const pct = Math.max(0, Math.min(100, value / total * 100));
  return `<div class="budget a" data-d="${d}"><small>БЮДЖЕТ</small><b><span data-count="${value}">${fmt(value)}</span> ₽</b>
    <div class="bar"><i style="width:${pct}%"></i></div><small>из ${fmt(total)} ₽</small></div>`;
}

const problemCard = (n, name, { day = '', budget = 300000, total = 300000, icon = 'box' } = {}) => scene(
  `<div class="full"><div class="center" style="padding-bottom:300px">
     ${day ? `<div class="eyebrow a">${day}</div>` : ''}
     <div class="a" data-d="0.1">${icons[icon]}</div>
     <div class="title a" data-d="0.15">ПРОБЛЕМА ${n}</div>
     <div class="sub a" data-d="0.35">${name}</div>
   </div>${budgetBar(budget, total)}</div>`, { sfx: 'click' });

const icons = {
  box: '<svg width="150" height="150" viewBox="0 0 120 120"><rect x="18" y="38" width="84" height="66" rx="6" fill="#C9A77A" stroke="#222" stroke-width="5"/><path d="M18 38 L60 18 L102 38" fill="#B48F60" stroke="#222" stroke-width="5" stroke-linejoin="round"/><line x1="60" y1="38" x2="60" y2="104" stroke="#222" stroke-width="4"/></svg>',
};

// rows: [[подпись, значение, 'g'|'r'|''], ...], total: [подпись, значение, цвет]
const calcCard = (pill, rows, { total = null, stamp = '', stampColor = 'r', step = 0.35 } = {}) => scene(
  `<div class="full"><div class="center">
     <div class="pill a">${pill}</div>
     <div class="rows">
       ${rows.map((r, i) => `<div class="a" data-d="${0.3 + i * step}"><span>${r[0]}</span><span class="${r[2] || ''}">${r[1]}</span></div>`).join('')}
       ${total ? `<div class="tot a" data-d="${0.3 + rows.length * step + 0.2}"><span>${total[0]}</span><span class="${total[2] || ''}">${total[1]}</span></div>` : ''}
     </div>
     ${stamp ? `<div class="stamp ${stampColor} a pop" data-d="${0.5 + rows.length * step + 0.4}">${stamp}</div>` : ''}
   </div></div>`, { sfx: 'click' });

const statCard = (title, value, { color = 'g', note = '' } = {}) => scene(
  `<div class="full"><div class="center">
     <div class="card a">
       <div class="card-t">${title}</div>
       <div class="card-v ${color}">${value}</div>
       ${note ? `<div class="card-n">${note}</div>` : ''}
     </div>
   </div></div>`, { sfx: 'click' });

const moral = (line1, line2) => scene(
  `<div class="full dark"><div class="center" style="padding:0 90px">
     <div class="moral a">${line1}</div>
     ${line2 ? `<div class="moral g a" data-d="0.9">${line2}</div>` : ''}
   </div></div>`);

const choice = (a, b) => scene(
  `<div class="full"><div class="center">
     <div class="eyebrow a">А ЧТО ВЫБРАЛ БЫ ТЫ?</div>
     <div class="choice a" data-d="0.3"><b>А</b><span>${a}</span></div>
     <div class="choice a" data-d="0.6"><b>Б</b><span>${b}</span></div>
     <div class="sub a" data-d="1.0">пиши в комментариях</div>
   </div></div>`);

const endCard = () => scene(
  `<div class="full"><div class="center">
     <div class="title a" style="font-size:118px">СЕЛЛЕР<br>С НУЛЯ</div>
     <div class="sub a" data-d="0.6">Каждая продажа чего-то стоит.</div>
   </div></div>`, { tail: 1.2 });

if (typeof module !== 'undefined') module.exports = {};
