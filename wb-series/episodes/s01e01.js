// Серия 1 · «Ниша». Текст строк = озвучка (совпадает со scripts/s01e01.md).

const bars = () => {
  const cols = Array.from({ length: 26 }, (_, i) => {
    const h = i < 6 ? 620 - i * 60 : Math.max(14, 80 - i * 3);
    return `<rect class="a" data-d="${0.2 + i * 0.03}" x="${90 + i * 35}" y="${1300 - h}" width="26" height="${h}" fill="${i < 6 ? '#2E6B57' : '#B9AE9C'}"/>`;
  }).join('');
  return `<div class="full"><svg class="bg" width="1080" height="1920">
      ${cols}<line x1="70" y1="1300" x2="1010" y2="1300" stroke="#333" stroke-width="5"/>
    </svg>
    <div class="center" style="justify-content:flex-start;padding-top:330px">
      <div class="pill a">ЗАКАЗЫ ПО КАРТОЧКАМ</div>
      <div class="sub a" data-d="0.4" style="margin-top:0">первые 40 забирают почти всё</div>
    </div>
    <div class="a" data-d="1.1" style="position:absolute;left:640px;top:1150px;font-size:40px;font-weight:700;color:#777">остальные 4 000 →</div>
  </div>`;
};

const searchList = () => {
  const row = (i, mine) => `<div class="a" data-d="${mine ? 1.2 : 0.15 + i * 0.08}" style="display:flex;align-items:center;gap:26px;background:#fff;border:4px solid ${mine ? '#7B4BB7' : '#ccc'};border-radius:18px;padding:18px 26px;margin:12px 0;width:900px">
      <div style="width:90px;height:90px;border-radius:12px;background:${mine ? '#E4D8F3' : '#E6E1D8'}"></div>
      <div style="flex:1;text-align:left;font-size:40px;font-weight:700">${mine ? 'Твоя карточка' : 'Чехол iPhone 16'}<br>
        <span style="font-size:32px;color:${mine ? '#C8463D' : '#2E6B57'}">${mine ? '★ 0 отзывов' : `★ 4.${8 - (i % 3)} · ${fmt(12000 - i * 1700)} отзывов`}</span></div>
    </div>`;
  return `<div class="full"><div class="center">
      ${[0, 1, 2, 3].map(i => row(i, false)).join('')}
      <div class="a" data-d="0.8" style="font-size:80px;color:#999;line-height:.6;margin:20px 0">⋮</div>
      <div class="badge a" data-d="1.0" style="position:static;transform:none;margin-bottom:10px">стр. 100</div>
      ${row(9, true)}
    </div></div>`;
};

const EPISODE = {
  id: 's01e01',
  lines: [
    { text: 'Триста тысяч рублей. Всё, что у тебя есть.',
      scene: bigNumber(300000, { sub: 'всё, что у тебя есть' }) },
    { text: 'Ты решил: хватит смотреть, как другие зарабатывают на Вайлдберриз.',
      scene: scene(room(hero({ x: 330, emotion: 'neutral', p: 'phone' })) + bubble('Хватит смотреть.<br>Пора самому.', { x: 90, y: 560, d: 0.6 })) },
    { text: 'Это первый сезон. Ставка — всё, что ты накопил.',
      scene: titleCard('СЕЗОН 1', 'СЕЛЛЕР<br>С НУЛЯ', 'ставка — всё, что ты накопил') },
    { text: 'Проблема первая. Ниша.',
      scene: problemCard(1, 'Ниша', { day: 'СЕЗОН 1 · ДЕНЬ 1' }) },
    { text: 'День первый. Ты открываешь ленту.',
      scene: scene(room(hero({ x: 330, p: 'phone' })) + badge('ДЕНЬ 1', { y: 220 })) },
    { text: 'Чехлы для телефона. Тысячи заказов в день.',
      scene: statCard('Чехлы для телефона', '~40 000', { note: 'заказов в день на всех продавцов' }) },
    { text: 'Закупка — пятьдесят рублей. Продажа — четыреста. Восемь раз!',
      scene: scene(`<div class="full"><div class="center">
          <div class="mega a" style="font-size:130px"><span class="r">50 ₽</span> → <span class="g">400 ₽</span></div>
          <div class="stamp g a pop" data-d="1.4">×8</div></div></div>`, { sfx: 'cash' }) },
    { text: 'Ты уже считаешь, сколько это за месяц.',
      scene: scene(room(hero({ x: 330, emotion: 'happy', p: 'phone' })) + thought('₽ ₽ ₽', { x: 330, y: 520 })) },
    { text: 'Вечером Аня смотрит через плечо.',
      scene: scene(room(hero({ x: 300, emotion: 'smile', p: 'phone' }) + anya({ x: 760, d: 0.3 }), { night: true }) + label('вечер · дома', { y: 220 })) },
    { text: '— Чехлы? А почему их тогда ещё не все продают?',
      scene: scene(room(hero({ x: 300, emotion: 'neutral', p: 'phone' }) + anya({ x: 760, emotion: 'worried' }), { night: true }) +
        bubble('Чехлы? А почему их тогда ещё не все продают?', { x: 330, y: 470, w: 680, tail: 'right', d: 0.1 })) },
    { text: 'Ты открываешь поиск. И считаешь продавцов.',
      scene: scene(room(desk() + hero({ x: 260, emotion: 'neutral' })) + label('ПОИСК: «чехол iPhone 16»', { y: 220 })) },
    { text: 'Больше четырёх тысяч.',
      scene: bigNumber(4000, { color: '#E06A5F', suffix: '+', sub: 'продавцов' }) },
    { text: 'Первые сорок карточек забирают почти все заказы. У каждой — тысячи отзывов.',
      scene: scene(bars()) },
    { text: 'У тебя — ноль отзывов. Твоя карточка будет на сотой странице.',
      scene: scene(searchList()) },
    { text: 'И восемь раз превращаются в другое.',
      scene: bigText('×8 → ?', { dark: true, color: '#fff', size: 170 }) },
    { text: 'Чтобы тебя увидели, нужна реклама. Ставка за тысячу показов — сотни рублей.',
      scene: statCard('Реклама в топе поиска', 'от 300 ₽', { color: 'r', note: 'за 1 000 показов' }) },
    { text: 'Цена чехла падает до двухсот — все демпингуют.',
      scene: scene(`<div class="full"><div class="center">
          <div class="mega a"><span class="strike">400 ₽</span></div>
          <div class="mega r a" data-d="0.8" style="margin-top:40px">200 ₽</div>
          <div class="sub a" data-d="1.2">все демпингуют</div></div></div>`) },
    { text: 'Минус комиссия, логистика, реклама. С одной продажи — почти ноль.',
      scene: calcCard('ОДИН ЧЕХОЛ', [
        ['Цена', '200 ₽'], ['Комиссия WB', '−50 ₽', 'r'], ['Логистика', '−60 ₽', 'r'],
        ['Товар', '−50 ₽', 'r'], ['Реклама', '−30 ₽', 'r'],
      ], { total: ['Остаётся', '≈ 10 ₽', 'r'], stamp: 'ПОЧТИ НОЛЬ', step: 0.3 }) },
    { text: 'День третий. Ты ищешь другое.',
      scene: scene(room(desk() + hero({ x: 260, emotion: 'worried' })) + badge('ДЕНЬ 3', { y: 220 })) },
    { text: 'Товар, который нужен каждый день. Который не красиво, а удобно.',
      scene: calcCard('ЧТО ИЩЕШЬ', [['нужен каждый день', '✓', 'g'], ['не модный', '✓', 'g'], ['не хрупкий', '✓', 'g'], ['мало продавцов', '?', 'y']], { step: 0.45 }) },
    { text: 'Органайзеры для холодильника. Скучно. Зато всего триста продавцов.',
      scene: statCard('Органайзеры для холодильника', '~300', { note: 'продавцов в нише' }) },
    { text: 'Заказов меньше. Но пробиться — реально.',
      scene: calcCard('СРАВНИ', [['Чехлы', '4 000+ продавцов', 'r'], ['Органайзеры', '~300 продавцов', 'g']], { step: 0.5, stamp: 'РЕАЛЬНО', stampColor: 'g' }) },
    { text: 'Модный товар — это очередь из тысяч продавцов. Скучный товар — это свободное место.',
      scene: moral('Модный товар — это очередь из тысяч продавцов.', 'Скучный товар — это свободное место.') },
    { text: 'А что выбрал бы ты? А — чехлы, Б — органайзеры. Пиши в комментариях.',
      scene: choice('Чехлы', 'Органайзеры') },
    { text: 'Селлер с нуля. Каждая продажа чего-то стоит.',
      scene: endCard() },
  ],
};
