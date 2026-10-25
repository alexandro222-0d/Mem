// «Не пей суп» — общие рисунки и сцены (плоский вектор, стиль 2: живой фон)
(function () {
  let _seed = 11;
  const rnd = () => { _seed = (_seed * 16807) % 2147483647; return (_seed - 1) / 2147483646; };
  const R = (a, b) => a + rnd() * (b - a);

  const DEFS = `
<defs>
  <linearGradient id="gSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1119"/><stop offset=".55" stop-color="#16202e"/><stop offset="1" stop-color="#1d2a33"/></linearGradient>
  <linearGradient id="gRiver" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a161c"/><stop offset="1" stop-color="#22050a"/></linearGradient>
  <linearGradient id="gRoom" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#121722"/><stop offset="1" stop-color="#1f1a1c"/></linearGradient>
  <linearGradient id="gWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a1210"/><stop offset="1" stop-color="#2e1d16"/></linearGradient>
  <linearGradient id="gNight" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d1a26"/><stop offset="1" stop-color="#1c3140"/></linearGradient>
  <linearGradient id="gRoad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3d3a2a"/><stop offset="1" stop-color="#141410"/></linearGradient>
  <linearGradient id="gFogY" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5c5636"/><stop offset="1" stop-color="#151611"/></linearGradient>
  <linearGradient id="gCourt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#160c0c"/><stop offset="1" stop-color="#2a1210"/></linearGradient>
  <linearGradient id="gPage" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d9c9a3"/><stop offset=".5" stop-color="#efe2c0"/><stop offset="1" stop-color="#d4c39b"/></linearGradient>
  <linearGradient id="gWood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a2f1f"/><stop offset="1" stop-color="#2c1b12"/></linearGradient>
  <radialGradient id="gLant" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ff6a3d" stop-opacity=".55"/><stop offset="1" stop-color="#ff6a3d" stop-opacity="0"/></radialGradient>
  <radialGradient id="gTeal" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#7fd6c8" stop-opacity=".35"/><stop offset="1" stop-color="#7fd6c8" stop-opacity="0"/></radialGradient>
  <radialGradient id="gTealHot" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#bff5ec" stop-opacity=".9"/><stop offset=".6" stop-color="#5fb8ac" stop-opacity=".5"/><stop offset="1" stop-color="#1d4a46" stop-opacity="0"/></radialGradient>
  <radialGradient id="gWarm" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffb26b" stop-opacity=".45"/><stop offset="1" stop-color="#ffb26b" stop-opacity="0"/></radialGradient>
  <radialGradient id="gRedGlow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ff2b3a" stop-opacity=".9"/><stop offset="1" stop-color="#ff2b3a" stop-opacity="0"/></radialGradient>
  <radialGradient id="gMirror" cx=".45" cy=".4" r=".6"><stop offset="0" stop-color="#3d7d78"/><stop offset="1" stop-color="#0f2524"/></radialGradient>
  <filter id="blur30" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="30"/></filter>
  <filter id="blur14" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="14"/></filter>
  <filter id="blur8" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="8"/></filter>
</defs>`;

  // ---------- персонажи и предметы ----------
  const lantern = (id, x, y, s) => `
<g transform="translate(${x} ${y}) scale(${s})"><g id="${id}" class="lant">
  <line x1="0" y1="-90" x2="0" y2="0" stroke="#2a1a12" stroke-width="4"/>
  <circle class="lglow" cx="0" cy="40" r="130" fill="url(#gLant)"/>
  <rect x="-12" y="-6" width="24" height="10" fill="#2a1a12"/>
  <rect x="-34" y="2" width="68" height="78" rx="28" fill="#c4262e"/>
  <rect x="-34" y="2" width="68" height="78" rx="28" fill="none" stroke="#8e1a20" stroke-width="3"/>
  <line x1="-20" y1="12" x2="-20" y2="72" stroke="#8e1a20" stroke-width="3"/><line x1="20" y1="12" x2="20" y2="72" stroke="#8e1a20" stroke-width="3"/>
  <rect x="-12" y="78" width="24" height="10" fill="#2a1a12"/>
  <line x1="0" y1="88" x2="0" y2="118" stroke="#d9a03a" stroke-width="4"/>
</g></g>`;

  const mengpo = (p, eyesOpen) => `
<g id="${p}-mp">
  <path d="M-150,0 L-96,-370 Q0,-410 96,-370 L150,0 Z" fill="#5b3a29"/>
  <path d="M-150,0 L-96,-370 Q-40,-392 -20,-388 L-40,0 Z" fill="#4c3022"/>
  <path d="M-72,-6 L-58,-300 L58,-300 L72,-6 Z" fill="#7a5640"/>
  <rect x="-62" y="-312" width="124" height="20" rx="8" fill="#3b261b"/>
  <rect x="-24" y="-410" width="48" height="40" fill="#e3c4a6"/>
  <g id="${p}-head">
    <circle cx="0" cy="-458" r="64" fill="#e9cfb4"/>
    <path d="M-64,-470 Q-60,-540 0,-540 Q60,-540 64,-470 Q40,-505 0,-505 Q-40,-505 -64,-470 Z" fill="#b9b4ad"/>
    <circle cx="0" cy="-552" r="32" fill="#a9a39b"/>
    <rect x="-4" y="-600" width="8" height="40" rx="3" fill="#6b4a32"/>
    <g id="${p}-eyesC" opacity="${eyesOpen ? 0 : 1}"><path d="M-34,-458 Q-24,-448 -14,-458" stroke="#3a2a22" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M14,-458 Q24,-448 34,-458" stroke="#3a2a22" stroke-width="5" fill="none" stroke-linecap="round"/></g>
    <g id="${p}-eyesO" opacity="${eyesOpen ? 1 : 0}"><ellipse cx="-24" cy="-458" rx="9" ry="7" fill="#fff"/><ellipse cx="24" cy="-458" rx="9" ry="7" fill="#fff"/>
      <circle cx="-24" cy="-458" r="4.5" fill="#1d1a18"/><circle cx="24" cy="-458" r="4.5" fill="#1d1a18"/></g>
    <path d="M-40,-476 L-14,-472 M14,-472 L40,-476" stroke="#9c958e" stroke-width="5" stroke-linecap="round"/>
    <circle cx="-36" cy="-432" r="9" fill="#e7a99a" opacity=".6"/><circle cx="36" cy="-432" r="9" fill="#e7a99a" opacity=".6"/>
    <path d="M-12,-422 Q0,-414 12,-422" stroke="#7a3b32" stroke-width="5" fill="none" stroke-linecap="round"/>
  </g>
</g>`;

  const pot = (p) => `
<g id="${p}-pot">
  <ellipse cx="0" cy="-8" rx="150" ry="22" fill="#000" opacity=".35"/>
  <path d="M-150,-150 Q-150,-10 0,-10 Q150,-10 150,-150 Z" fill="#23272d"/>
  <path d="M-150,-150 Q-150,-10 0,-10 Q-60,-40 -90,-150 Z" fill="#1a1d22"/>
  <ellipse cx="0" cy="-150" rx="150" ry="30" fill="#30353c"/>
  <ellipse cx="0" cy="-148" rx="128" ry="22" fill="#c9a36a"/>
  <ellipse cx="-30" cy="-152" rx="50" ry="8" fill="#e6c48a" opacity=".7"/>
  <rect x="-170" y="-150" width="22" height="16" rx="5" fill="#30353c"/><rect x="148" y="-150" width="22" height="16" rx="5" fill="#30353c"/>
</g>`;

  const steam = (p, n, x0, y0, w, h) => {
    let s = "";
    for (let i = 0; i < n; i++) {
      const x = x0 + (i - (n - 1) / 2) * (w / n);
      s += `<path id="${p}-st${i}" d="M${x},${y0} q-26,-${h * 0.25} 0,-${h * 0.5} q26,-${h * 0.25} 0,-${h * 0.5}" stroke="#bfeee6" stroke-width="16" stroke-linecap="round" fill="none" opacity="0" filter="url(#blur8)"/>`;
    }
    return s;
  };

  const lanBack = (p) => `
<g id="${p}-lan">
  <path d="M-240,0 L-150,-760 Q0,-812 150,-760 L240,0 Z" fill="#7fa3bb"/>
  <path d="M-240,0 L-150,-760 Q-90,-790 -60,-792 L-90,0 Z" fill="#6c90a8"/>
  <path d="M-20,-760 L-30,0 M60,-700 L80,0" stroke="#6a8ea6" stroke-width="6"/>
  <rect x="-156" y="-560" width="312" height="34" rx="8" fill="#5f8299"/><path d="M-10,-545 l-30,90 M10,-545 l30,90" stroke="#5f8299" stroke-width="14" stroke-linecap="round"/>
  <rect x="-30" y="-850" width="60" height="70" fill="#e3c4a6"/>
  <g id="${p}-armR"><path d="M150,-760 Q200,-700 205,-400 L150,-396 Q150,-640 120,-740 Z" fill="#7fa3bb"/><circle cx="182" cy="-372" r="26" fill="#e9cfb4"/></g>
  <g id="${p}-head">
    <circle cx="0" cy="-920" r="96" fill="#111216"/>
    <path d="M-80,-960 Q-40,-1000 20,-990" stroke="#2a2b33" stroke-width="8" fill="none" stroke-linecap="round"/>
    <circle cx="0" cy="-1022" r="56" fill="#111216"/>
    <line x1="-78" y1="-1050" x2="82" y2="-996" stroke="#d22d2d" stroke-width="9" stroke-linecap="round"/>
    <circle cx="86" cy="-994" r="12" fill="#f2c14e"/>
  </g>
  <g id="${p}-armL">
    <path d="M-150,-760 Q-200,-700 -205,-400 L-150,-396 Q-150,-640 -120,-740 Z" fill="#7fa3bb"/>
    <circle cx="-182" cy="-372" r="26" fill="#e9cfb4"/>
    <circle id="${p}-tglow" cx="-180" cy="-402" r="46" fill="url(#gRedGlow)" opacity=".5"/>
    <path d="M-206,-404 Q-180,-394 -154,-404" stroke="#ff2b3a" stroke-width="7" fill="none" stroke-linecap="round"/>
  </g>
</g>`;

  // Лань анфас, по пояс (origin = низ кадра по центру торса)
  const lanFront = (p, mood) => {
    const eyes = {
      smile: `<path d="M-52,-640 Q-38,-626 -24,-640" stroke="#1b1716" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M24,-640 Q38,-626 52,-640" stroke="#1b1716" stroke-width="7" fill="none" stroke-linecap="round"/>`,
      fear: `<ellipse cx="-38" cy="-640" rx="20" ry="17" fill="#fff"/><ellipse cx="38" cy="-640" rx="20" ry="17" fill="#fff"/><circle id="${p}-pl" cx="-38" cy="-640" r="6" fill="#1b1716"/><circle id="${p}-pr" cx="38" cy="-640" r="6" fill="#1b1716"/>`,
      calm: `<ellipse cx="-38" cy="-640" rx="15" ry="13" fill="#fff"/><ellipse cx="38" cy="-640" rx="15" ry="13" fill="#fff"/><circle id="${p}-pl" cx="-36" cy="-638" r="9" fill="#1b1716"/><circle id="${p}-pr" cx="40" cy="-638" r="9" fill="#1b1716"/>`,
    }[mood === "turn" ? "calm" : mood];
    const brows = mood === "fear" ? `<path d="M-62,-676 Q-40,-690 -18,-680 M18,-680 Q40,-690 62,-676" stroke="#1b1716" stroke-width="6" fill="none" stroke-linecap="round"/>`
      : `<path d="M-60,-668 Q-40,-676 -20,-670 M20,-670 Q40,-676 60,-668" stroke="#1b1716" stroke-width="6" fill="none" stroke-linecap="round"/>`;
    const mouth = mood === "smile" ? `<path d="M-26,-584 Q0,-562 26,-584" stroke="#8a3434" stroke-width="7" fill="none" stroke-linecap="round"/>`
      : mood === "fear" ? `<ellipse cx="0" cy="-578" rx="13" ry="16" fill="#5a2020"/>` : `<path d="M-16,-580 L16,-580" stroke="#8a3434" stroke-width="7" stroke-linecap="round"/>`;
    return `
<g id="${p}-lanF">
  <path d="M-330,0 Q-320,-330 -150,-420 L150,-420 Q320,-330 330,0 Z" fill="#7fa3bb"/>
  <path d="M-110,-420 L0,-260 L110,-420 Z" fill="#e8eef2"/><path d="M-110,-420 L0,-260 L-30,-420 Z" fill="#c9d5dd"/>
  <path d="M-150,-420 L0,-200 L150,-420" stroke="#5f8299" stroke-width="14" fill="none"/>
  <rect x="-38" y="-520" width="76" height="110" fill="#dfc0a2"/>
  <g id="${p}-head">
    <path d="M-150,-640 Q-160,-460 -110,-380 L-60,-470 Z M150,-640 Q160,-460 110,-380 L60,-470 Z" fill="#111216"/>
    <ellipse cx="0" cy="-620" rx="112" ry="128" fill="#e9cfb4"/>
    <path d="M-118,-640 Q-120,-770 0,-772 Q120,-770 118,-640 Q90,-720 10,-716 Q-60,-716 -118,-640 Z" fill="#111216"/>
    <circle cx="0" cy="-800" r="62" fill="#111216"/>
    <line x1="-84" y1="-830" x2="88" y2="-776" stroke="#d22d2d" stroke-width="10" stroke-linecap="round"/><circle cx="92" cy="-774" r="13" fill="#f2c14e"/>
    <g id="${p}-eyes">${eyes}</g>${brows}
    <circle cx="-62" cy="-600" r="14" fill="#e7a99a" opacity=".5"/><circle cx="62" cy="-600" r="14" fill="#e7a99a" opacity=".5"/>
    ${mouth}
  </g>
</g>`;
  };

  // Учан (origin = ноги). white=true -> Белый
  const uchan = (p, white) => {
    const robe = white ? "#e9e7e2" : "#17181c", robe2 = white ? "#cfccc5" : "#0e0f12";
    const face = white ? "#f6f4ef" : "#4a4d55", hat = white ? "#f1efe9" : "#121316", hat2 = white ? "#d9d6cf" : "#0a0b0d";
    const eyes = white ? `<path d="M-40,-1000 Q-28,-1014 -16,-1000 M16,-1000 Q28,-1014 40,-1000" stroke="#111" stroke-width="7" fill="none" stroke-linecap="round"/>`
      : `<path d="M-42,-998 L-14,-994 M14,-994 L42,-998" stroke="#0b0b0c" stroke-width="7" stroke-linecap="round"/>`;
    const mouth = white ? `<path d="M-46,-962 Q0,-918 46,-962 Z" fill="#3a0d10"/><g id="${p}-tongue"><rect x="-14" y="-950" width="28" height="200" rx="14" fill="#d1323b"/><path d="M-14,-760 L0,-730 L14,-760 Z" fill="#d1323b"/></g>`
      : `<path d="M-28,-952 L28,-952" stroke="#0b0b0c" stroke-width="8" stroke-linecap="round"/>`;
    const hand = white ? `<g id="${p}-fan" transform="translate(150 -560)"><path d="M0,0 L-90,-110 Q0,-150 90,-110 Z" fill="#f4f2ec" stroke="#cfccc5" stroke-width="4"/><circle cx="0" cy="0" r="16" fill="${face}"/></g>`
      : `<g id="${p}-chainH"><circle cx="150" cy="-520" r="18" fill="${face}"/><path d="M150,-500 q-20,60 0,120 q20,60 0,120 q-20,60 0,120" stroke="#6d7178" stroke-width="12" fill="none" stroke-dasharray="22 8"/></g>`;
    return `
<g id="${p}">
  <path d="M-200,0 L-130,-880 Q0,-920 130,-880 L200,0 Z" fill="${robe}"/>
  <path d="M-200,0 L-130,-880 Q-70,-900 -40,-902 L-70,0 Z" fill="${robe2}"/>
  <path d="M-130,-880 Q-200,-760 -170,-520 L-120,-520 Z M130,-880 Q200,-760 170,-520 L120,-520 Z" fill="${robe2}"/>
  <rect x="-130" y="-640" width="260" height="30" fill="${white ? "#bdb9b1" : "#2a2c31"}"/>
  <rect x="-30" y="-940" width="60" height="70" fill="${face}"/>
  <g id="${p}-head">
    <ellipse cx="0" cy="-990" rx="78" ry="88" fill="${face}"/>
    ${eyes}${mouth}
    <g id="${p}-hat"><path d="M-82,-1050 L-40,-1560 L40,-1560 L82,-1050 Z" fill="${hat}"/><path d="M-82,-1050 L-40,-1560 L-10,-1560 L-30,-1050 Z" fill="${hat2}"/>
      <rect x="-92" y="-1062" width="184" height="26" rx="8" fill="${hat2}"/></g>
  </g>
  ${hand}
</g>`;
  };

  const king = (p) => `
<g id="${p}">
  <path d="M-260,0 L-200,-520 Q0,-570 200,-520 L260,0 Z" fill="#8e1f23"/>
  <path d="M-260,0 L-200,-520 Q-120,-546 -80,-548 L-120,0 Z" fill="#6f171a"/>
  <path d="M-90,-540 L0,-380 L90,-540" stroke="#d9a03a" stroke-width="16" fill="none"/>
  <rect x="-34" y="-610" width="68" height="80" fill="#c99a7a"/>
  <g id="${p}-head">
    <ellipse cx="0" cy="-660" rx="88" ry="98" fill="#d8a888"/>
    <path d="M-60,-650 L-20,-644 M20,-644 L60,-650" stroke="#1a1010" stroke-width="10" stroke-linecap="round"/>
    <path d="M-66,-680 L-18,-672 M18,-672 L66,-680" stroke="#1a1010" stroke-width="12" stroke-linecap="round"/>
    <path d="M-70,-610 Q0,-560 70,-610 L60,-440 Q0,-400 -60,-440 Z" fill="#141010"/>
    <path d="M-100,-730 L-90,-790 L90,-790 L100,-730 Z" fill="#141010"/><rect x="-200" y="-774" width="400" height="22" rx="10" fill="#141010"/>
  </g>
</g>`;

  const knotsThread = (p, n, x, y, w) => {
    let s = `<path d="M${x},${y} L${x + w},${y + 6}" stroke="#ff2b3a" stroke-width="9" stroke-linecap="round"/>`;
    for (let i = 0; i < n; i++) s += `<circle id="${p}-k${i}" cx="${x + 30 + i * (w - 60) / (n - 1)}" cy="${y + 3 + i * 6 / n}" r="13" fill="#ff3a48"/>`;
    return s;
  };

  const tag = (x, y, text, color) => `<g class="tag" transform="translate(${x} ${y})"><g class="tagIn">
  <rect x="0" y="-34" width="${text.length * 21 + 44}" height="58" rx="14" fill="rgba(10,12,18,.82)" stroke="${color || "#f2c14e"}" stroke-width="3"/>
  <text x="22" y="5" font-family="Inter" font-weight="800" font-size="30" fill="${color || "#f2c14e"}" letter-spacing="2">${text}</text></g></g>`;

  const dust = (p, n, y0, y1, col) => {
    let s = `<g id="${p}-dust">`;
    for (let i = 0; i < n; i++) s += `<circle class="dd" cx="${R(0, 1080).toFixed(0)}" cy="${R(y0, y1).toFixed(0)}" r="${R(2, 5).toFixed(1)}" fill="${col || "#ffd9a8"}" opacity="${R(0.15, 0.55).toFixed(2)}"/>`;
    return s + "</g>";
  };
  const flow = (p, n, y0, y1) => {
    let s = `<g id="${p}-flow">`;
    for (let i = 0; i < n; i++) s += `<rect x="${R(-160, 1240).toFixed(0)}" y="${R(y0, y1).toFixed(0)}" width="${R(60, 220).toFixed(0)}" height="5" rx="3" fill="#ff7a6a" opacity="${R(0.15, 0.4).toFixed(2)}"/>`;
    return s + "</g>";
  };
  const rain = (p, n, x0, x1, y0, y1) => {
    let s = `<g id="${p}-rain" stroke="#9fc3d6" stroke-width="3" opacity=".45">`;
    for (let i = 0; i < n; i++) { const x = R(x0, x1), y = R(y0 - 400, y1); s += `<line x1="${x.toFixed(0)}" y1="${y.toFixed(0)}" x2="${(x - 14).toFixed(0)}" y2="${(y + 60).toFixed(0)}"/>`; }
    return s + "</g>";
  };

  // ---------- сцены: (p, opt) -> {bg, mid, fg} ----------
  const S = {};
  const A = {};

  S.bridgeWide = (p, o) => ({
    bg: `<rect width="1080" height="1920" fill="url(#gSky)"/><circle cx="540" cy="820" r="420" fill="url(#gTeal)"/>
      <path d="M0,980 L140,820 L260,900 L420,760 L560,880 L700,780 L860,900 L1080,800 L1080,1200 L0,1200 Z" fill="#141c28"/>
      <path d="M0,1040 L200,930 L380,1000 L560,920 L760,1010 L940,940 L1080,990 L1080,1200 L0,1200 Z" fill="#101722"/>
      <rect x="0" y="1170" width="1080" height="750" fill="url(#gRiver)"/>${flow(p, 26, 1200, 1900)}
      <g id="${p}-fog1" filter="url(#blur30)" opacity=".55"><ellipse cx="300" cy="1060" rx="420" ry="60" fill="#5d7f82"/><ellipse cx="900" cy="1100" rx="380" ry="50" fill="#5d7f82"/></g>`,
    mid: `<path d="M-60,1150 Q540,1050 1140,1150 L1140,1330 L900,1330 Q540,1010 180,1330 L-60,1330 Z" fill="#2b3039"/>
      <path d="M-60,1112 Q540,1012 1140,1112 L1140,1152 Q540,1052 -60,1152 Z" fill="#3a404b"/>
      <path d="M-60,1040 Q540,940 1140,1040" stroke="#4a515d" stroke-width="12" fill="none"/>
      ${Array.from({ length: 13 }, (_, i) => { const x = -60 + i * 100, t = (x + 60) / 1200, y = (1 - t) * (1 - t) * 1112 + 2 * (1 - t) * t * 1012 + t * t * 1112; return `<rect x="${x - 7}" y="${(y - 72).toFixed(0)}" width="14" height="74" fill="#4a515d"/>`; }).join("")}
      <path d="M-20,250 Q540,330 1100,250" stroke="#1b1410" stroke-width="4" fill="none"/>
      ${lantern(p + "-l1", 110, 268, 1)}${lantern(p + "-l2", 330, 300, 1.05)}${lantern(p + "-l3", 750, 300, 1.05)}${lantern(p + "-l4", 970, 268, 1)}
      <g transform="translate(860 1080)"><rect x="-100" y="-90" width="200" height="14" fill="#5a3a26"/><rect x="-90" y="-76" width="12" height="76" fill="#4a2f1f"/><rect x="78" y="-76" width="12" height="76" fill="#4a2f1f"/>
      <g fill="#b8865a"><path d="M-86,-90 l8,-22 h28 l8,22z"/><path d="M-36,-90 l8,-22 h28 l8,22z"/><path d="M14,-90 l8,-22 h28 l8,22z"/><path d="M-62,-112 l8,-22 h28 l8,22z"/><path d="M-12,-112 l8,-22 h28 l8,22z"/></g></g>`,
    fg: `<g transform="translate(600 1066) scale(.82)">${mengpo(p)}</g><g transform="translate(600 1088) scale(.82)">${pot(p)}</g>
      ${steam(p, 5, 600, 950, 230, 260)}
      <g id="${p}-fog2" filter="url(#blur30)" opacity=".5"><ellipse cx="200" cy="1250" rx="360" ry="70" fill="#7a9a9a"/><ellipse cx="880" cy="1290" rx="340" ry="60" fill="#7a9a9a"/></g>
      ${dust(p, 40, 600, 1800)}`,
  });
  A.bridgeWide = (tl, p, st, d, o) => {
    flowAnim(tl, p, st, d, -220); steamLoop(tl, p, 5, st, d, 90); fogAnim(tl, p, st, d);
    tl.fromTo(`#${p}-head`, { rotation: 0 }, { rotation: 3, svgOrigin: "0 -405", duration: d, ease: "sine.inOut" }, st);
    if (o.far) tl.fromTo(`#${p}-cam`, { scale: 1.25, y: 120 }, { scale: 1.05, y: 0, duration: d, ease: "power1.out" }, st);
  };

  S.mpClose = (p, o) => ({
    bg: `<rect width="1080" height="1920" fill="url(#gWall)"/><rect x="0" y="380" width="1080" height="26" fill="#140d0b"/><rect x="0" y="1420" width="1080" height="500" fill="#120c0a"/>
      <rect x="120" y="0" width="34" height="1420" fill="#140d0b"/><rect x="930" y="0" width="34" height="1420" fill="#140d0b"/>
      <circle id="${p}-warm" cx="180" cy="520" r="520" fill="url(#gWarm)"/>
      <g id="${p}-shadow" opacity="${o.eyes ? 0.6 : 0}" transform="translate(820 1420)"><path d="M-80,0 L-50,-520 Q0,-545 50,-520 L80,0 Z" fill="#070505"/>
      <rect x="-16" y="-575" width="32" height="40" fill="#070505"/><circle cx="0" cy="-615" r="50" fill="#070505"/><circle cx="0" cy="-680" r="30" fill="#070505"/></g>`,
    mid: lantern(p + "-l1", 180, 330, 1.6),
    fg: `<g transform="translate(470 1560) scale(1.75)">${mengpo(p, o.eyes)}</g>
      <g transform="translate(540 1330)"><g id="${p}-bowl">
      <path d="M-170,-150 Q-210,-150 -230,-110 L-200,-60" stroke="#e3c4a6" stroke-width="54" stroke-linecap="round" fill="none"/>
      <path d="M170,-150 Q210,-150 230,-110 L200,-60" stroke="#e3c4a6" stroke-width="54" stroke-linecap="round" fill="none"/>
      <path d="M-210,-150 Q-200,40 0,40 Q200,40 210,-150 Z" fill="#b8865a"/><path d="M-210,-150 Q-200,40 0,40 Q-110,10 -150,-150 Z" fill="#9a6e47"/>
      <ellipse cx="0" cy="-150" rx="210" ry="40" fill="#8a5f3c"/><ellipse cx="0" cy="-146" rx="186" ry="30" fill="#d7b07a"/><ellipse cx="-50" cy="-152" rx="70" ry="9" fill="#f0d29e" opacity=".8"/></g></g>
      ${steam(p, 4, 540, 1170, 260, 420)}${dust(p, 30, 300, 1600)}`,
  });
  A.mpClose = (tl, p, st, d, o) => {
    steamLoop(tl, p, 4, st, d, 140);
    tl.fromTo(`#${p}-head`, { rotation: -2 }, { rotation: 3, svgOrigin: "0 -405", duration: d, ease: "sine.inOut" }, st);
    tl.fromTo(`#${p}-bowl`, { y: o.push ? 0 : 50 }, { y: o.push ? -60 : -20, scale: o.push ? 1.18 : 1, transformOrigin: "50% 50%", duration: d, ease: "power2.out" }, st);
    if (!o.eyes && !o.push) tl.to(`#${p}-shadow`, { opacity: 0.6, duration: 0.6 }, st + d * 0.55);
    if (o.eyes) tl.fromTo(`#${p}-cam`, { scale: 1 }, { scale: 1.15, transformOrigin: "50% 30%", duration: d, ease: "power1.in" }, st);
  };

  S.lanBridge = (p, o) => ({
    bg: `<rect width="1080" height="1920" fill="url(#gSky)"/><circle cx="540" cy="900" r="520" fill="url(#gTeal)"/><rect x="0" y="980" width="1080" height="940" fill="url(#gRiver)"/>${flow(p, 22, 1000, 1900)}`,
    mid: `<path d="M470,980 L610,980 L1000,1920 L80,1920 Z" fill="#3a404b"/><path d="M470,980 L80,1920 L20,1920 L455,980 Z" fill="#2b3039"/><path d="M610,980 L1000,1920 L1060,1920 L625,980 Z" fill="#2b3039"/>
      <path d="M455,930 L20,1700" stroke="#4a515d" stroke-width="14"/><path d="M625,930 L1060,1700" stroke="#4a515d" stroke-width="14"/>
      ${lantern(p + "-l1", 300, 700, .8)}${lantern(p + "-l2", 780, 700, .8)}
      <g transform="translate(540 985) scale(.3)">${mengpo(p)}</g><g transform="translate(540 992) scale(.3)">${pot(p)}</g>${steam(p, 3, 540, 945, 70, 90)}
      <g filter="url(#blur30)" opacity=".5"><ellipse cx="540" cy="1000" rx="520" ry="50" fill="#6d8f8f"/></g>`,
    fg: `<g transform="translate(540 2050) scale(1.05)">${lanBack(p)}</g>${dust(p, 30, 500, 1800, "#ffb0a0")}`,
  });
  A.lanBridge = (tl, p, st, d, o) => {
    flowAnim(tl, p, st, d, 160); steamLoop(tl, p, 3, st, d, 30);
    tl.fromTo(`#${p}-head`, { x: 0, rotation: 0 }, { x: -10, rotation: -4, svgOrigin: "0 -800", duration: 0.8, ease: "sine.inOut" }, st);
    if (o.refuse) {
      const h = st + 0.55;
      tl.fromTo(`#${p}-armL`, { rotation: 0, svgOrigin: "-150 -760" }, { rotation: 50, svgOrigin: "-150 -760", duration: 0.4, ease: "back.out(1.6)" }, h);
      tl.fromTo(`#${p}-tglow`, { opacity: 0.5, scale: 1 }, { opacity: 1, scale: 1.7, transformOrigin: "50% 50%", duration: 0.4 }, h);
      punch(tl, p, h);
    }
  };

  S.titleCard = (p) => ({
    bg: `<rect width="1080" height="1920" fill="#06070a"/><circle cx="540" cy="900" r="600" fill="url(#gLant)" opacity=".35"/>`,
    mid: ``,
    fg: `<g id="${p}-tt" text-anchor="middle"><text x="540" y="840" font-family="TitleSerif" font-weight="700" font-size="140" fill="#f2c14e">НЕ ПЕЙ СУП</text>
      <rect x="290" y="890" width="500" height="3" fill="#f2c14e" opacity=".6"/>
      <text x="540" y="970" font-family="TitleSerif" font-weight="700" font-size="50" fill="#f4efe6" letter-spacing="9">ЧАСТЬ 1 · СУП</text></g>`,
  });
  A.titleCard = (tl, p, st, d) => { tl.fromTo(`#${p}-tt`, { opacity: 0, scale: 1.12 }, { opacity: 1, scale: 1, transformOrigin: "50% 50%", duration: 0.9, ease: "power3.out" }, st); };

  const room = (p) => `<rect width="1080" height="1920" fill="url(#gRoom)"/>
    <rect x="300" y="420" width="480" height="640" fill="url(#gNight)"/>${rain(p, 60, 300, 780, 420, 1060)}
    <g stroke="#2a1d16" stroke-width="16" fill="none"><rect x="300" y="420" width="480" height="640"/><line x1="540" y1="420" x2="540" y2="1060"/><line x1="300" y1="633" x2="780" y2="633"/><line x1="300" y1="846" x2="780" y2="846"/>
    <line x1="420" y1="420" x2="420" y2="1060" stroke-width="7"/><line x1="660" y1="420" x2="660" y2="1060" stroke-width="7"/></g>
    <rect x="270" y="1060" width="540" height="40" fill="#3a271b"/><rect x="0" y="1500" width="1080" height="420" fill="#17110f"/>`;

  S.house = (p, o) => ({
    bg: room(p),
    mid: `${lantern(p + "-l1", 720, 1000, 1.1)}<circle id="${p}-glow" cx="720" cy="1040" r="420" fill="url(#gWarm)"/>`,
    fg: `<g transform="translate(470 1950) scale(${o.close ? 0.95 : 0.78})">${lanBack(p)}</g>${dust(p, 25, 400, 1700)}`,
  });
  A.house = (tl, p, st, d, o) => {
    rainAnim(tl, p, st, d);
    tl.fromTo(`#${p}-head`, { rotation: -2 }, { rotation: 2, svgOrigin: "0 -800", duration: d, ease: "sine.inOut" }, st);
    flicker(tl, `#${p}-glow`, st, d, 0.75, 1);
  };

  S.soupTable = (p) => ({
    bg: `<rect width="1080" height="1920" fill="#120d0c"/><circle cx="760" cy="600" r="520" fill="url(#gWarm)"/>`,
    mid: `<path d="M-40,1000 L1120,1000 L1120,1920 L-40,1920 Z" fill="url(#gWood)"/><path d="M-40,1000 L1120,1000" stroke="#5c3d28" stroke-width="10"/>
      ${Array.from({ length: 7 }, (_, i) => `<path d="M-40,${1080 + i * 120} Q540,${1060 + i * 120} 1120,${1090 + i * 120}" stroke="#3a2618" stroke-width="4" fill="none"/>`).join("")}`,
    fg: `<g transform="translate(540 1300)"><ellipse cx="0" cy="120" rx="330" ry="60" fill="#000" opacity=".35"/>
      <path d="M-300,0 Q-280,190 0,190 Q280,190 300,0 Z" fill="#e8e1d4"/><path d="M-300,0 Q-280,190 0,190 Q-160,150 -210,0 Z" fill="#cfc6b6"/>
      <ellipse cx="0" cy="0" rx="300" ry="62" fill="#d8d0c2"/><ellipse cx="0" cy="6" rx="270" ry="48" fill="#c79a5a"/>
      ${[[-120, 0], [0, 14], [110, -4], [-40, -20], [60, 24]].map(([x, y]) => `<g transform="translate(${x} ${y})"><ellipse rx="48" ry="16" fill="#efe3c8"/><ellipse cx="-16" rx="7" ry="3" fill="#c79a5a"/><ellipse cx="2" cy="-5" rx="7" ry="3" fill="#c79a5a"/><ellipse cx="18" cy="2" rx="7" ry="3" fill="#c79a5a"/></g>`).join("")}
      <rect x="230" y="-140" width="14" height="300" rx="6" fill="#6b3d26" transform="rotate(28)"/><rect x="260" y="-140" width="14" height="300" rx="6" fill="#6b3d26" transform="rotate(32)"/></g>
      ${steam(p, 4, 540, 1240, 360, 360)}${tag(120, 820, "СУП ИЗ ЛОТОСА")}${dust(p, 20, 300, 1300)}`,
  });
  A.soupTable = (tl, p, st, d) => { steamLoop(tl, p, 4, st, d, 120); tagIn(tl, p, st + 0.4); };

  const wrist = (p, n, fist) => `
    <path d="M-200,1650 L400,1180 L520,1330 L-40,1920 Z" fill="#7fa3bb"/><path d="M-200,1650 L400,1180 L430,1230 L-120,1720 Z" fill="#6c90a8"/>
    <g id="${p}-hand"><path d="M400,1180 Q520,1080 640,1110 Q760,1140 780,1220 Q${fist ? "700,1330 600,1350" : "820,1300 700,1330"} Q560,1360 520,1330 Z" fill="#e9cfb4"/>
    ${fist ? `<path d="M640,1150 Q720,1170 740,1230 M610,1190 Q690,1210 700,1270" stroke="#c9a68a" stroke-width="6" fill="none"/>` : `<path d="M700,1140 Q800,1120 880,1160 M720,1190 Q830,1190 900,1230 M700,1250 Q800,1270 860,1300" stroke="#e9cfb4" stroke-width="34" stroke-linecap="round" fill="none"/>`}</g>
    <circle id="${p}-tglow" cx="420" cy="1260" r="140" fill="url(#gRedGlow)" opacity=".45"/>
    <g transform="translate(330 1300) rotate(-38)"><g id="${p}-knots">${knotsThread(p, n, -40, -40, 230)}</g></g>`;

  S.thread = (p, o) => ({
    bg: `<rect width="1080" height="1920" fill="#14121a"/><circle cx="540" cy="900" r="700" fill="url(#gWarm)" opacity=".5"/>`,
    mid: ``,
    fg: `${wrist(p, 7, o.fist)}${o.close || o.fist ? "" : tag(90, 760, "7 УЗЕЛКОВ", "#ff5a63")}${dust(p, 20, 300, 1500)}`,
  });
  A.thread = (tl, p, st, d, o) => {
    tl.fromTo(`#${p}-tglow`, { opacity: 0.35 }, { opacity: 0.8, duration: d / 2, yoyo: true, repeat: 1, ease: "sine.inOut" }, st);
    tl.fromTo(`#${p}-knots circle`, { scale: 0.6, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.3, stagger: 0.07, ease: "back.out(3)" }, st + 0.2);
    if (!o.close && !o.fist) tagIn(tl, p, st + 0.8);
    if (o.close) tl.fromTo(`#${p}-cam`, { scale: 1 }, { scale: 1.3, transformOrigin: "40% 68%", duration: d, ease: "sine.inOut" }, st);
    if (o.fist) tl.fromTo(`#${p}-hand`, { scale: 1.06 }, { scale: 1, transformOrigin: "60% 60%", duration: 0.3, ease: "power3.out" }, st + 0.3);
  };

  S.door = (p) => ({
    bg: `<rect width="1080" height="1920" fill="#0f0c0b"/><rect x="0" y="1560" width="1080" height="360" fill="#17110f"/>`,
    mid: `<g id="${p}-door"><rect x="240" y="300" width="600" height="1260" fill="#3b2619"/>
      <g stroke="#2a1a11" stroke-width="12" fill="none"><rect x="300" y="360" width="480" height="520"/><rect x="300" y="940" width="480" height="560"/>
      <line x1="540" y1="360" x2="540" y2="880"/><line x1="300" y1="620" x2="780" y2="620"/></g>
      <circle cx="770" cy="930" r="18" fill="#a07a3a"/></g>
      <rect x="240" y="1556" width="600" height="10" fill="#9fc3d6" opacity=".7" filter="url(#blur8)"/>
      <rect x="200" y="270" width="680" height="34" fill="#22160f"/><rect x="200" y="270" width="40" height="1300" fill="#22160f"/><rect x="840" y="270" width="40" height="1300" fill="#22160f"/>`,
    fg: `<circle cx="540" cy="1560" r="380" fill="url(#gTeal)" opacity=".4"/>`,
  });
  A.door = (tl, p, st) => { [0.15, 0.5, 0.85].forEach((t) => { tl.to(`#${p}-door`, { x: 9, duration: 0.04 }, st + t); tl.to(`#${p}-door`, { x: 0, duration: 0.1 }, st + t + 0.04); tl.to(`#${p}-cam`, { scale: 1.03, duration: 0.04 }, st + t); tl.to(`#${p}-cam`, { scale: 1, duration: 0.15 }, st + t + 0.04); }); };

  S.lanFront = (p, o) => ({
    bg: `<rect width="1080" height="1920" fill="url(#gRoom)"/><circle cx="${o.mood === "smile" ? 760 : 540}" cy="700" r="600" fill="url(${o.mood === "smile" ? "#gWarm" : "#gTeal"})"/>`,
    mid: o.mood === "smile" ? lantern(p + "-l1", 860, 420, 1.2) : ``,
    fg: `<g transform="translate(540 1980) scale(1.25)">${lanFront(p, o.mood)}</g>${dust(p, 20, 300, 1500)}`,
  });
  A.lanFront = (tl, p, st, d, o) => {
    tl.fromTo(`#${p}-head`, { rotation: -1.5 }, { rotation: 1.5, svgOrigin: "0 -500", duration: d, ease: "sine.inOut" }, st);
    if (o.mood === "fear") { tl.fromTo([`#${p}-pl`, `#${p}-pr`], { x: 0 }, { x: -5, duration: 0.15, yoyo: true, repeat: Math.max(1, Math.floor(d / 0.3)), ease: "none" }, st); tl.fromTo(`#${p}-cam`, { scale: 1 }, { scale: 1.12, transformOrigin: "50% 40%", duration: d, ease: "power1.in" }, st); }
    if (o.mood === "turn") { tl.fromTo(`#${p}-head`, { x: 0 }, { x: -50, rotation: -8, svgOrigin: "0 -500", duration: 0.5, ease: "power3.out" }, st + 0.2); tl.to([`#${p}-pl`, `#${p}-pr`], { x: -14, duration: 0.2 }, st + 0.2); }
    if (o.mood === "smile") tl.fromTo(`#${p}-cam`, { scale: 1.06 }, { scale: 1, duration: d, ease: "sine.out" }, st);
  };

  S.uchanyDoor = (p, o) => ({
    bg: `<rect width="1080" height="1920" fill="url(#gNight)"/>${rain(p, 90, 0, 1080, 0, 1600)}<rect x="0" y="1500" width="1080" height="420" fill="#0b141c"/>`,
    mid: `<g transform="translate(430 1560) scale(.8)"><g id="${p}-w">${uchan(p + "-W", true)}</g></g><g transform="translate(660 1560) scale(.8)"><g id="${p}-b">${uchan(p + "-B", false)}</g></g>`,
    fg: `<path fill-rule="evenodd" d="M0,0 H1080 V1920 H0 Z M240,620 H840 V1560 H240 Z" fill="#100c0b"/>
      <rect x="220" y="590" width="640" height="34" fill="#22160f"/><rect x="220" y="590" width="34" height="980" fill="#22160f"/><rect x="826" y="590" width="34" height="980" fill="#22160f"/>
      <rect x="0" y="1560" width="1080" height="360" fill="#17110f"/><circle cx="540" cy="1600" r="420" fill="url(#gTeal)" opacity=".3"/>`,
  });
  A.uchanyDoor = (tl, p, st, d, o) => {
    rainAnim(tl, p, st, d);
    tl.fromTo(`#${p}-W-head`, { rotation: 0 }, { rotation: 4, svgOrigin: "0 -940", duration: d, ease: "sine.inOut" }, st);
    if (!o.close && !o.hats) tl.fromTo([`#${p}-w`, `#${p}-b`], { opacity: 0 }, { opacity: 1, duration: 0.6, stagger: 0.2 }, st);
    if (o.close) tl.fromTo(`#${p}-cam`, { scale: 1.1 }, { scale: 1.2, transformOrigin: "50% 45%", duration: d, ease: "none" }, st);
    if (o.hats) tl.fromTo(`#${p}-cam`, { scale: 1.25 }, { scale: 1.4, transformOrigin: "50% 33%", duration: d, ease: "sine.inOut" }, st);
  };

  S.whiteClose = (p, o) => ({
    bg: `<rect width="1080" height="1920" fill="url(#gNight)"/>${rain(p, 70, 0, 1080, 0, 1920)}`,
    mid: `<g transform="translate(540 2880) scale(1.95)"><g id="${p}-wc">${uchan(p + "-W", true)}</g></g>`,
    fg: `${o.hat ? tag(150, 330, "«УВИДИШЬ МЕНЯ — РАЗБОГАТЕЕШЬ»") : ""}<circle cx="540" cy="900" r="700" fill="url(#gTeal)" opacity=".25"/>`,
  });
  A.whiteClose = (tl, p, st, d, o) => {
    rainAnim(tl, p, st, d);
    tl.fromTo(`#${p}-W-head`, { rotation: -2 }, { rotation: 3, svgOrigin: "0 -940", duration: d, ease: "sine.inOut" }, st);
    tl.fromTo(`#${p}-W-tongue`, { scaleY: 0.95 }, { scaleY: 1.06, transformOrigin: "50% 0%", duration: d / 2, yoyo: true, repeat: 1, ease: "sine.inOut" }, st);
    if (o.hat) { tl.fromTo(`#${p}-cam`, { y: 300, scale: 1.0 }, { y: 360, scale: 1.05, duration: d, ease: "sine.inOut" }, st); tagIn(tl, p, st + 0.6); }
    if (o.push) { tl.fromTo(`#${p}-cam`, { scale: 1 }, { scale: 1.35, transformOrigin: "50% 40%", duration: d, ease: "power2.in" }, st); }
  };

  S.book = (p, o) => {
    let cols = "";
    for (let pg = 0; pg < 2; pg++) for (let c = 0; c < 6; c++) {
      const x = (pg ? 600 : 170) + c * 58, hot = pg === 1 && c === 2;
      for (let k = 0; k < 9; k++) { const y = 760 + k * 70; cols += `<rect x="${x}" y="${y}" width="${hot ? 26 : 22}" height="${(R(26, 48)).toFixed(0)}" rx="5" fill="${hot ? "#1b1414" : "#3a3128"}" opacity="${hot ? 1 : 0.75}"/>`; }
    }
    return {
      bg: `<rect width="1080" height="1920" fill="#0f0d0c"/><circle cx="540" cy="1000" r="760" fill="url(#gTeal)" opacity=".35"/>`,
      mid: `<g transform="translate(0 0)"><path d="M120,700 Q330,660 530,700 L530,1460 Q330,1420 120,1460 Z" fill="url(#gPage)"/><path d="M550,700 Q750,660 960,700 L960,1460 Q750,1420 550,1460 Z" fill="url(#gPage)"/>
        <rect x="528" y="690" width="24" height="780" fill="#5a4630"/>${cols}
        <rect x="700" y="740" width="70" height="660" rx="8" fill="#e5383b" opacity=".15"/>
        <g id="${p}-strike"><rect x="726" y="740" width="18" height="660" rx="8" fill="#0b0b0b"/></g>
        <g id="${p}-drop"><path d="M735,1400 q-14,30 0,44 q14,-14 0,-44 Z" fill="#0b0b0b"/></g></g>`,
      fg: `${tag(560, 600, "ЛАНЬ", "#ff5a63")}${dust(p, 15, 400, 1500, "#bff5ec")}`,
    };
  };
  A.book = (tl, p, st, d, o) => {
    tl.set(`#${p}-drop`, { opacity: 0 }, st);
    if (!o.close && !o.drip) tl.fromTo(`#${p}-strike`, { scaleY: 0 }, { scaleY: 1, transformOrigin: "50% 0%", duration: 0.01 }, st);
    if (o.close) { tagIn(tl, p, st + 0.2); tl.fromTo(`#${p}-cam`, { scale: 1.2 }, { scale: 1.45, transformOrigin: "68% 50%", duration: d, ease: "sine.inOut" }, st); }
    if (o.drip) { tl.fromTo(`#${p}-cam`, { scale: 1.9 }, { scale: 2.1, transformOrigin: "68% 74%", duration: d, ease: "none" }, st); tl.fromTo(`#${p}-drop`, { opacity: 1, y: 0, scaleY: 1 }, { y: 70, scaleY: 1.4, transformOrigin: "50% 0%", duration: d * 0.8, ease: "power2.in" }, st + 0.2); }
  };

  S.chain = (p, o) => ({
    bg: `<rect width="1080" height="1920" fill="#101218"/><circle cx="540" cy="1100" r="700" fill="url(#gTeal)" opacity=".3"/>`,
    mid: ``,
    fg: `${wrist(p, 7, false)}
      <g transform="translate(470 1250) rotate(-38)"><g id="${p}-cuff"><rect x="-70" y="-60" width="140" height="120" rx="22" fill="#4b4f57" stroke="#2a2d33" stroke-width="10"/><rect x="-70" y="-14" width="140" height="28" fill="#5d626b"/></g></g>
      <g id="${p}-links"><path d="M560,1160 Q800,${o.taut ? "1000" : "1160"} 1180,${o.taut ? "860" : "1100"}" stroke="#6d7178" stroke-width="22" fill="none" stroke-dasharray="40 14"/></g>`,
  });
  A.chain = (tl, p, st, d, o) => {
    if (!o.taut) { tl.fromTo(`#${p}-cuff`, { y: -500, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: "power4.in" }, st + 0.2); tl.fromTo(`#${p}-links`, { opacity: 0 }, { opacity: 1, duration: 0.2 }, st + 0.5); punch(tl, p, st + 0.55); }
    else { tl.fromTo(`#${p}-links`, { x: 30 }, { x: 0, duration: 0.25, ease: "power4.out" }, st + 0.1); [6, -5, 3, 0].forEach((x, i) => tl.to(`#${p}-cam`, { x, duration: 0.05 }, st + 0.15 + i * 0.05)); }
  };

  S.body = (p) => ({
    bg: room(p),
    mid: `${lantern(p + "-l1", 720, 1000, 1.1)}<circle cx="720" cy="1040" r="420" fill="url(#gWarm)" opacity=".7"/>`,
    fg: `<g transform="translate(860 1650) rotate(-90) scale(.55)"><g opacity=".95">${lanBack(p)}</g></g>
      <rect x="0" y="0" width="1080" height="1920" fill="#1d4a6a" opacity=".22"/>${dust(p, 20, 600, 1800, "#bff5ec")}`,
  });
  A.body = (tl, p, st, d) => { rainAnim(tl, p, st, d); tl.fromTo(`#${p}-cam`, { scale: 1 }, { scale: 1.18, transformOrigin: "50% 80%", duration: d, ease: "sine.in" }, st); };

  const shadows = (p, n) => {
    let s = `<g id="${p}-sh">`;
    for (let i = 0; i < n; i++) { const t = i / n, y = 1500 - t * 560, sc = 1 - t * 0.82, x = 540 + (i % 2 ? 1 : -1) * (30 + (i % 5) * 26) * sc;
      s += `<g transform="translate(${x.toFixed(0)} ${y.toFixed(0)}) scale(${sc.toFixed(2)})" opacity="${(0.75 - t * 0.5).toFixed(2)}"><path d="M-40,0 L-26,-180 Q0,-190 26,-180 L40,0 Z" fill="#8a8a80"/><circle cx="0" cy="-210" r="26" fill="#8a8a80"/></g>`; }
    return s + "</g>";
  };
  S.road = (p, o) => {
    let money = "";
    for (let i = 0; i < 34; i++) money += `<rect class="mn" x="${R(0, 1080).toFixed(0)}" y="${R(200, 1900).toFixed(0)}" width="34" height="34" fill="#d9c27a" opacity="${R(0.35, 0.8).toFixed(2)}" transform="rotate(${R(-40, 40).toFixed(0)})"/>`;
    return {
      bg: `<rect width="1080" height="1920" fill="url(#gFogY)"/><path d="M500,900 L580,900 L1080,1920 L0,1920 Z" fill="url(#gRoad)"/>`,
      mid: `${o.silent ? "" : shadows(p, 18)}<g filter="url(#blur30)" opacity="${o.dark ? 0.5 : 0.7}"><ellipse cx="540" cy="930" rx="600" ry="120" fill="#8c8458"/><ellipse id="${p}-fogA" cx="200" cy="1300" rx="400" ry="90" fill="#7a7552"/></g>`,
      fg: `<g id="${p}-money">${money}</g>${o.dark ? `<rect width="1080" height="1920" fill="#000" opacity=".35"/>` : ""}${o.silent ? `<g filter="url(#blur30)" opacity=".8"><ellipse cx="540" cy="1100" rx="700" ry="300" fill="#6d6a4a"/></g>` : ""}`,
    };
  };
  A.road = (tl, p, st, d, o) => {
    tl.fromTo(`#${p}-money`, { y: -60 }, { y: 140, duration: d, ease: "none" }, st);
    if (!o.silent) tl.fromTo(`#${p}-sh`, { y: 0, scale: 1 }, { y: -40, scale: 0.97, transformOrigin: "50% 50%", duration: d, ease: "none" }, st);
    tl.fromTo(`#${p}-cam`, { scale: 1 }, { scale: o.close ? 1.2 : 1.08, transformOrigin: "50% 50%", duration: d, ease: "none" }, st);
  };

  S.tablet = (p, o) => ({
    bg: `<rect width="1080" height="1920" fill="#0d0f12"/><circle cx="540" cy="900" r="650" fill="url(#gTeal)" opacity=".5"/>`,
    mid: `<g filter="url(#blur30)" opacity=".5"><ellipse cx="540" cy="1420" rx="560" ry="120" fill="#4d6a6a"/></g>`,
    fg: `<g id="${p}-tab"><path d="M300,1400 L300,560 Q540,430 780,560 L780,1400 Z" fill="#3a3f47"/><path d="M300,1400 L300,560 Q400,505 460,490 L420,1400 Z" fill="#30343b"/>
      <rect x="490" y="560" width="100" height="100" rx="8" fill="#b3242b"/><rect x="510" y="580" width="60" height="60" rx="4" fill="none" stroke="#e8c9a0" stroke-width="5"/>
      <text x="540" y="760" text-anchor="middle" font-family="TitleSerif" font-weight="700" font-size="46" fill="#cfd5dc" letter-spacing="6">ПРАВИЛО ${o.n}</text>
      ${o.rule ? o.rule.split(" ").reduce((acc, w) => { const L = acc[acc.length - 1]; if ((L + " " + w).trim().length > 11) acc.push(w); else acc[acc.length - 1] = (L + " " + w).trim(); return acc; }, [""]).map((l, i) => `<text class="rl" x="540" y="${880 + i * 82}" text-anchor="middle" font-family="TitleSerif" font-weight="700" font-size="64" fill="#ff5a63">${l}</text>`).join("") : ""}</g>`,
  });
  A.tablet = (tl, p, st, d, o) => {
    tl.fromTo(`#${p}-tab`, { scale: 1.08, opacity: 0.4 }, { scale: 1, opacity: 1, transformOrigin: "50% 60%", duration: 0.5, ease: "power3.out" }, st);
    if (o.rule) tl.fromTo(`#${p} .rl`, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.25 }, st + 0.3);
  };

  S.lanRoad = (p, o) => ({
    bg: `<rect width="1080" height="1920" fill="url(#gFogY)"/><path d="M500,900 L580,900 L1080,1920 L0,1920 Z" fill="url(#gRoad)"/>`,
    mid: `<g transform="translate(560 1080) scale(.42)">${uchan(p + "-B", false)}</g>
      <path d="M520,1180 Q500,1420 470,1500" stroke="#6d7178" stroke-width="8" fill="none" stroke-dasharray="16 6"/>
      <g filter="url(#blur30)" opacity=".6"><ellipse cx="540" cy="960" rx="600" ry="110" fill="#8c8458"/></g>`,
    fg: `<g transform="translate(470 2150) scale(${o.close ? 1.0 : 0.8})">${lanBack(p)}</g>
      <g id="${p}-echo" fill="none" stroke="#f2c14e" stroke-width="6" opacity="0">${[0, 1, 2].map((i) => `<circle cx="540" cy="2000" r="${200 + i * 140}"/>`).join("")}</g>`,
  });
  A.lanRoad = (tl, p, st, d, o) => {
    if (o.call) { tl.fromTo(`#${p}-echo`, { opacity: 0.8, scale: 0.6 }, { opacity: 0, scale: 1.4, transformOrigin: "540px 2000px", duration: 1.2, ease: "power2.out" }, st + 0.6); }
    if (!o.stop) tl.fromTo(`#${p}-lan`, { y: 0 }, { y: -10, duration: 0.35, yoyo: true, repeat: Math.floor(d / 0.35), ease: "sine.inOut" }, st);
    tl.fromTo(`#${p}-head`, { rotation: 0 }, { rotation: o.stop ? 6 : 2, svgOrigin: "0 -800", duration: d, ease: "sine.inOut" }, st);
    if (o.close) tl.fromTo(`#${p}-cam`, { scale: 1 }, { scale: 1.12, transformOrigin: "45% 50%", duration: d, ease: "none" }, st);
  };

  S.blackBack = (p) => ({
    bg: `<rect width="1080" height="1920" fill="url(#gFogY)"/><path d="M500,900 L580,900 L1080,1920 L0,1920 Z" fill="url(#gRoad)"/>`,
    mid: `<g transform="translate(540 2350) scale(1.45)"><g id="${p}-bk"><path d="M-200,0 L-130,-880 Q0,-920 130,-880 L200,0 Z" fill="#17181c"/>
      <ellipse cx="0" cy="-990" rx="78" ry="88" fill="#0d0e11"/><path d="M-82,-1050 L-40,-1560 L40,-1560 L82,-1050 Z" fill="#121316"/><rect x="-92" y="-1062" width="184" height="26" rx="8" fill="#0a0b0d"/>
      <path d="M150,-520 q-20,60 0,120 q20,60 0,120 q-20,60 0,120 q20,60 0,140" stroke="#6d7178" stroke-width="12" fill="none" stroke-dasharray="22 8"/></g></g>`,
    fg: `<g filter="url(#blur30)" opacity=".6"><ellipse cx="540" cy="1700" rx="700" ry="160" fill="#6d6a4a"/></g>`,
  });
  A.blackBack = (tl, p, st, d) => { tl.fromTo(`#${p}-cam`, { scale: 1.06 }, { scale: 1, duration: d, ease: "sine.out" }, st); };

  S.gate = (p, o) => ({
    bg: `<rect width="1080" height="1920" fill="url(#gSky)"/><circle cx="540" cy="1000" r="500" fill="url(#gTeal)"/>
      <rect x="520" y="${o.far ? 600 : 700}" width="40" height="420" fill="#bfeee6" opacity=".25" filter="url(#blur14)"/>`,
    mid: `<g id="${p}-gL"><rect x="120" y="520" width="420" height="1100" fill="#121418"/><g stroke="#1e2128" stroke-width="10">${[0, 1, 2, 3, 4].map((i) => `<line x1="120" y1="${640 + i * 200}" x2="540" y2="${640 + i * 200}"/>`).join("")}</g></g>
      <g id="${p}-gR"><rect x="540" y="520" width="420" height="1100" fill="#15171c"/><g stroke="#1e2128" stroke-width="10">${[0, 1, 2, 3, 4].map((i) => `<line x1="540" y1="${640 + i * 200}" x2="960" y2="${640 + i * 200}"/>`).join("")}</g></g>
      <rect x="80" y="420" width="920" height="110" fill="#0c0d10"/><rect x="380" y="440" width="320" height="70" fill="#3a1416" stroke="#d9a03a" stroke-width="4"/>
      <rect x="60" y="420" width="70" height="1220" fill="#0c0d10"/><rect x="950" y="420" width="70" height="1220" fill="#0c0d10"/>
      ${lantern(p + "-l1", 200, 560, 1)}${lantern(p + "-l2", 880, 560, 1)}<rect x="0" y="1620" width="1080" height="300" fill="#0b0c10"/>`,
    fg: `<g filter="url(#blur30)" opacity=".55"><ellipse id="${p}-fogA" cx="400" cy="1600" rx="520" ry="110" fill="#5d7f82"/></g>${dust(p, 25, 500, 1800, "#bff5ec")}`,
  });
  A.gate = (tl, p, st, d, o) => {
    if (!o.far) { tl.fromTo(`#${p}-gL`, { x: 0 }, { x: -60, duration: d, ease: "sine.inOut" }, st); tl.fromTo(`#${p}-gR`, { x: 0 }, { x: 60, duration: d, ease: "sine.inOut" }, st); }
    else { tl.set([`#${p}-gL`, `#${p}-gR`], { x: (i) => (i ? 60 : -60) }, st); tl.fromTo(`#${p}-cam`, { scale: 1 }, { scale: 1.5, transformOrigin: "50% 45%", duration: d, ease: "power1.in" }, st); }
  };

  S.court = (p) => ({
    bg: `<rect width="1080" height="1920" fill="url(#gCourt)"/>${[90, 330, 750, 990].map((x) => `<rect x="${x - 30}" y="0" width="60" height="1500" fill="#6b1518"/>`).join("")}
      <circle cx="540" cy="700" r="560" fill="url(#gLant)" opacity=".8"/>`,
    mid: `<g transform="translate(540 1220) scale(1.05)">${king(p + "-K")}</g>
      <rect x="140" y="1180" width="800" height="300" fill="#2c1b12"/><rect x="120" y="1160" width="840" height="40" fill="#4a2f1f"/>
      <rect x="760" y="1110" width="90" height="60" rx="8" fill="#b3242b"/><rect x="250" y="1120" width="130" height="40" fill="#efe2c0"/>`,
    fg: `<g id="${p}-smoke" filter="url(#blur14)" opacity=".4"><path d="M180,1150 q-30,-120 0,-240 q30,-120 0,-240" stroke="#c9c3b8" stroke-width="24" fill="none"/><path d="M900,1150 q30,-120 0,-240 q-30,-120 0,-240" stroke="#c9c3b8" stroke-width="24" fill="none"/></g>
      <rect x="0" y="1480" width="1080" height="440" fill="#120a09"/>${dust(p, 20, 400, 1500)}`,
  });
  A.court = (tl, p, st, d) => { tl.fromTo(`#${p}-smoke`, { y: 20, opacity: 0.25 }, { y: -60, opacity: 0.5, duration: d, ease: "none" }, st); tl.fromTo(`#${p}-cam`, { scale: 1.15 }, { scale: 1, duration: 0.8, ease: "power3.out" }, st); };

  S.mirror = (p, o) => ({
    bg: `<rect width="1080" height="1920" fill="url(#gCourt)"/><circle cx="540" cy="820" r="620" fill="url(#gTeal)" opacity=".7"/>`,
    mid: `<rect x="500" y="1160" width="80" height="360" fill="#3a2618"/><path d="M380,1520 L700,1520 L660,1460 L420,1460 Z" fill="#4a2f1f"/>
      <circle cx="540" cy="820" r="380" fill="#8a6a3a"/><circle cx="540" cy="820" r="350" fill="#b08a4a"/><circle cx="540" cy="820" r="320" fill="url(#gMirror)"/>
      <circle id="${p}-sh" cx="540" cy="820" r="320" fill="url(#gTealHot)" opacity="${o.glow || o.choice ? 0.7 : 0.25}"/>
      <path d="M330,640 Q400,560 500,540" stroke="#d9fff8" stroke-width="16" stroke-linecap="round" fill="none" opacity=".35"/>
      ${o.choice ? `<g opacity=".5"><path d="M480,830 L640,830" stroke="#0b0b0b" stroke-width="14"/><rect x="430" y="720" width="190" height="230" rx="10" fill="#efe2c0" opacity=".35"/></g>` : ""}`,
    fg: `${o.lan ? `<g transform="translate(540 2350) scale(1.0)">${lanBack(p)}</g>` : ""}${o.choice ? `<g transform="translate(0 -150)">${choiceCards(p)}</g>` : ""}${dust(p, 20, 300, 1500, "#bff5ec")}`,
  });
  const choiceCards = (p) => `<g id="${p}-cA"><rect x="70" y="1180" width="430" height="120" rx="24" fill="rgba(10,12,18,.88)" stroke="#f2c14e" stroke-width="4"/><text x="285" y="1258" text-anchor="middle" font-family="Inter" font-weight="800" font-size="46" fill="#f2c14e">👁 СМОТРЕТЬ</text></g>
    <g id="${p}-cB"><rect x="580" y="1180" width="430" height="120" rx="24" fill="rgba(10,12,18,.88)" stroke="#e5383b" stroke-width="4"/><text x="795" y="1258" text-anchor="middle" font-family="Inter" font-weight="800" font-size="40" fill="#ff5a63">ОТВЕРНУТЬСЯ</text></g>`;
  A.mirror = (tl, p, st, d, o) => {
    tl.fromTo(`#${p}-sh`, { opacity: o.glow ? 0.3 : 0.2 }, { opacity: o.glow ? 0.85 : 0.4, duration: d, ease: "sine.inOut" }, st);
    if (o.lan) tl.fromTo(`#${p}-cam`, { scale: 1 }, { scale: 1.1, transformOrigin: "50% 45%", duration: d, ease: "none" }, st);
    if (o.choice) { tl.fromTo(`#${p}-cA`, { x: -500 }, { x: 0, duration: 0.45, ease: "back.out(1.4)" }, st + 0.2); tl.fromTo(`#${p}-cB`, { x: 500 }, { x: 0, duration: 0.45, ease: "back.out(1.4)" }, st + 0.45); }
  };

  S.mirrorHand = (p, o) => ({
    bg: `<rect width="1080" height="1920" fill="#0b1414"/>`,
    mid: `<circle cx="540" cy="900" r="520" fill="url(#gMirror)"/>
      <g id="${p}-scene"><path d="M180,1150 L900,1150 L960,1400 L120,1400 Z" fill="#efe2c0" opacity=".85"/>
      ${Array.from({ length: 9 }, (_, i) => `<rect x="${230 + i * 70}" y="1180" width="22" height="180" rx="6" fill="#3a3128" opacity=".7"/>`).join("")}
      <g id="${p}-arm"><path d="M1100,600 L760,960 L860,1060 L1180,760 Z" fill="#2f4a36"/><path d="M760,960 Q700,1000 690,1060 Q720,1110 780,1100 L860,1060 Z" fill="#e3c4a6"/>
      <rect x="600" y="900" width="16" height="230" rx="6" fill="#5a3a26" transform="rotate(-30 608 1015)"/></g>
      <g id="${p}-strike"><rect x="440" y="1180" width="26" height="180" rx="6" fill="#0b0b0b"/></g></g>
      <circle cx="540" cy="900" r="520" fill="none" stroke="#b08a4a" stroke-width="60"/>`,
    fg: `<g id="${p}-fogM" filter="url(#blur30)" opacity="${o.blur ? 0 : 0}"><circle cx="540" cy="900" r="420" fill="#a9d8d0"/></g>`,
  });
  A.mirrorHand = (tl, p, st, d, o) => {
    if (!o.blur) { tl.fromTo(`#${p}-arm`, { x: 60, y: -40 }, { x: -20, y: 20, duration: d, ease: "sine.inOut" }, st); tl.fromTo(`#${p}-strike`, { scaleY: 0 }, { scaleY: 1, transformOrigin: "50% 0%", duration: d * 0.7, ease: "power1.inOut" }, st + 0.3); }
    else { tl.set(`#${p}-strike`, { scaleY: 1 }, st); tl.fromTo(`#${p}-fogM`, { opacity: 0 }, { opacity: 0.85, duration: d * 0.8, ease: "power1.in" }, st); }
    tl.fromTo(`#${p}-cam`, { scale: 1 }, { scale: 1.12, transformOrigin: "60% 55%", duration: d, ease: "none" }, st);
  };

  S.endCard = (p) => ({
    bg: `<rect width="1080" height="1920" fill="#07080b"/><circle cx="540" cy="820" r="620" fill="url(#gTeal)" opacity=".35"/>`,
    mid: `<g text-anchor="middle"><text x="540" y="560" font-family="TitleSerif" font-weight="700" font-size="84" fill="#f2c14e">ПРОДОЛЖЕНИЕ</text><text x="540" y="660" font-family="TitleSerif" font-weight="700" font-size="84" fill="#f2c14e">СЛЕДУЕТ</text>
      <rect x="290" y="700" width="500" height="3" fill="#f2c14e" opacity=".6"/>
      <text x="540" y="780" font-family="TitleSerif" font-weight="700" font-size="44" fill="#f4efe6" letter-spacing="6">СЕРИЯ 2 · ЗЕРКАЛО</text></g>
      ${choiceCards(p).replace(/y="1180"/g, 'y="900"').replace(/y="1258"/g, 'y="978"')}
      <g text-anchor="middle" font-family="Inter" font-weight="700" fill="#f4efe6"><text x="540" y="1130" font-size="38">Комментарий с наибольшим</text><text x="540" y="1180" font-size="38">числом лайков решит,</text><text x="540" y="1230" font-size="38">что сделает Лань</text></g>`,
    fg: `<g id="${p}-search"><rect x="190" y="1330" width="700" height="96" rx="48" fill="#fff"/><circle cx="252" cy="1378" r="18" fill="none" stroke="#111" stroke-width="6"/><line x1="265" y1="1391" x2="282" y2="1408" stroke="#111" stroke-width="6" stroke-linecap="round"/>
      <text x="310" y="1392" font-family="Inter" font-weight="800" font-size="40" fill="#111">@mertvograd</text></g>`,
  });
  A.endCard = (tl, p, st, d) => {
    tl.fromTo(`#${p}-cA`, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, transformOrigin: "50% 50%", duration: 0.4, ease: "back.out(2)" }, st + 0.3);
    tl.fromTo(`#${p}-cB`, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, transformOrigin: "50% 50%", duration: 0.4, ease: "back.out(2)" }, st + 0.45);
    tl.fromTo(`#${p}-search`, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" }, st + 0.9);
  };

  // ---------- анимационные помощники ----------
  function steamLoop(tl, p, n, st, d, rise) {
    for (let i = 0; i < n; i++) for (let t = st + i * 0.33; t < st + d; t += 1.5) {
      tl.fromTo(`#${p}-st${i}`, { y: 0, opacity: 0 }, { y: -rise, opacity: 0.55, duration: 0.75, ease: "sine.out" }, t);
      tl.to(`#${p}-st${i}`, { y: -rise * 1.9, opacity: 0, duration: 0.75, ease: "sine.in" }, t + 0.75);
    }
  }
  function flowAnim(tl, p, st, d, dx) { tl.fromTo(`#${p}-flow`, { x: 0 }, { x: dx * d / 4, duration: d, ease: "none" }, st); }
  function fogAnim(tl, p, st, d) { tl.fromTo(`#${p}-fog1`, { x: -30 }, { x: 40, duration: d, ease: "none" }, st); tl.fromTo(`#${p}-fog2`, { x: 40 }, { x: -60, duration: d, ease: "none" }, st); }
  function rainAnim(tl, p, st, d) { tl.fromTo(`#${p}-rain`, { y: 0 }, { y: 420 * d, x: -100 * d, duration: d, ease: "none" }, st); }
  function flicker(tl, sel, st, d, a, b) { for (let t = 0, k = 0; t < d; t += 0.23 + (k % 3) * 0.07, k++) tl.set(sel, { opacity: a + ((k * 37) % 100) / 100 * (b - a) }, st + t); }
  function tagIn(tl, p, t) { tl.fromTo(`#${p} .tagIn`, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, transformOrigin: "0% 50%", duration: 0.35, ease: "back.out(2.2)" }, t); }
  function punch(tl, p, t) {
    tl.to(`#${p}-cam`, { scale: "+=0.07", duration: 0.16, ease: "power4.out" }, t);
    [7, -6, 4, -3, 0].forEach((x, i) => tl.to(`#${p}-cam`, { x, duration: 0.05, ease: "none" }, t + 0.02 + i * 0.05));
    tl.fromTo("#flash", { opacity: 0.32 }, { opacity: 0, duration: 0.45, ease: "power2.out", immediateRender: false }, t);
  }

  function lanternAnim(tl, p, st, d) {
    document.querySelectorAll(`#${p} .lant`).forEach((el, i) => {
      const amp = 3 + (i % 3);
      for (let t = 0, k = 0; t < d; t += 1.6, k++) tl.to(el, { rotation: k % 2 ? -amp : amp, transformOrigin: "50% 0%", duration: 1.6, ease: "sine.inOut" }, st + t);
      const g = el.querySelector(".lglow");
      for (let t = 0, k = 0; t < d; t += 0.3 + (k % 4) * 0.06, k++) tl.set(g, { opacity: 0.65 + (((k + i) * 29) % 35) / 100 }, st + t);
    });
  }
  function dustAnim(tl, p, st, d) {
    document.querySelectorAll(`#${p} .dd`).forEach((el, i) => tl.fromTo(el, { y: 0, x: 0 }, { y: -40 - (i % 5) * 20, x: ((i % 3) - 1) * 24, duration: d, ease: "none" }, st));
  }

  // ---------- сборка серии ----------
  window.buildEpisode = function (DATA) {
    const tl = gsap.timeline({ paused: true });
    DATA.shots.forEach((sh, i) => {
      const p = `s${i}`, o = sh.opt || {};
      const sc = S[sh.scene](p, o);
      ["bg", "mid", "fg"].forEach((L) => { document.getElementById(`${p}-${L}`).innerHTML = DEFS + sc[L]; });
      const st = sh.start, d = sh.dur;
      // параллакс слоёв + въезд камеры
      tl.fromTo(`#${p}-L-bg`, { scale: 1 }, { scale: 1.04, duration: d, ease: "none" }, st);
      tl.fromTo(`#${p}-L-mid`, { scale: 1 }, { scale: 1.07, duration: d, ease: "none" }, st);
      tl.fromTo(`#${p}-L-fg`, { scale: 1, x: 0 }, { scale: 1.11, x: -12, duration: d, ease: "none" }, st);
      tl.fromTo(`#${p}-in`, { scale: 1.12 }, { scale: 1, duration: 0.3, ease: "power4.out" }, st);
      if (i > 0) tl.fromTo("#flash", { opacity: 0.12 }, { opacity: 0, duration: 0.25, ease: "power2.out", immediateRender: false }, st);
      lanternAnim(tl, p, st, d); dustAnim(tl, p, st, d);
      A[sh.scene](tl, p, st, d, o);
    });

    // субтитры кусками по 2–3 слова
    const subs = document.getElementById("subs");
    let ci = 0;
    DATA.lines.forEach((ln, li) => {
      if (DATA.shots[li].scene === "titleCard" || DATA.shots[li].scene === "endCard") return;
      const chunks = []; let cur = [];
      ln.words.forEach((w, k) => { cur.push(w); const punct = /[.,!?»:…]$/.test(w.w); if (cur.length >= 3 || (punct && cur.length >= 1 && k < ln.words.length - 1 && cur.length >= 2) || k === ln.words.length - 1) { chunks.push(cur); cur = []; } });
      chunks.forEach((ch, k) => {
        const id = `c${ci++}`;
        const end = k < chunks.length - 1 ? chunks[k + 1][0].s : ln.end + 0.25;
        subs.insertAdjacentHTML("beforeend", `<div class="line" id="${id}">${ch.map((w, j) => `<span class="w" id="${id}w${j}" style="color:${w.c === "R" ? "var(--red)" : w.c === "Y" ? "var(--gold)" : "#fff"}">${w.w}</span>`).join("")}</div>`);
        tl.set(`#${id}`, { opacity: 1 }, ch[0].s - 0.02);
        ch.forEach((w, j) => tl.fromTo(`#${id}w${j}`, { opacity: 0, scale: 0.6, y: 18 }, { opacity: 1, scale: 1, y: 0, duration: 0.2, ease: "back.out(2.5)" }, w.s));
        tl.set(`#${id}`, { opacity: 0 }, end);
      });
    });

    // HUD
    tl.fromTo("#hud .plaque", { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: "back.out(2)", stagger: 0.1 }, 0.2);
    if (DATA.courtAt) { tl.set("#court0", { opacity: 0 }, DATA.courtAt); tl.fromTo("#court1", { opacity: 1, scale: 1.7 }, { scale: 1, duration: 0.35, ease: "back.out(2)", immediateRender: false }, DATA.courtAt); }
    DATA.hudHide.forEach(([a, b]) => { tl.set("#hud", { opacity: 0 }, a); tl.set("#hud", { opacity: 1 }, b); });

    // зерно
    for (let t = 0, k = 1; t < DATA.total; t += 1 / 12, k++) tl.set("#turb", { attr: { seed: k } }, t);
    tl.set({}, {}, DATA.total);
    window.__timelines = window.__timelines || {};
    window.__timelines["main"] = tl;
    tl.seek(0);
  };
})();
