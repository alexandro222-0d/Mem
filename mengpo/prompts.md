# Промпты для картинок (GPT Image / Midjourney)

## Как сохранить единый стиль
1. Сначала сгенерируй **листы персонажей** (CHAR_*). Выбери удачный вариант каждого.
2. Каждый следующий кадр генерируй, **прикладывая лист персонажа как референс** («use the attached character exactly»).
3. Фоны делай **без персонажей**, персонажей отдельно на однотонном фоне. Потом собираем слоями, как в примере, и двигаем их.
4. Формат 9:16 (1080×1920).
5. Иероглифы генераторы часто искажают: делай колпаки и таблички **без текста**, надписи добавим при монтаже.

## STYLE (вставлять в начало каждого промпта)
```
Flat vector 2D illustration, simple geometric shapes, no outlines, minimal soft shading,
limited dark palette: ink black, deep slate blue, cinnabar red accents, pale teal fog,
Chinese underworld (Diyu) mood, clean modern explainer-animation style, vertical 9:16, no text.
```

## Персонажи (полный рост, анфас, однотонный тёмный фон)
**CHAR_LAN**
```
STYLE + young Chinese woman, 23, pale skin, black hair in a simple low bun with one red hairpin,
pale blue hanfu robe, a thin red thread tied on her left wrist, calm sad eyes, full body, front view,
plain dark slate background. Character sheet: front, side, back, and 3 facial expressions (calm, fear, determination).
```
**CHAR_WHITE** (Белый Учан)
```
STYLE + very tall thin ghost official in long white robe, extremely tall white conical hat,
paper-white face with a wide frozen smile, long red tongue hanging down to his chest,
holding a white paper fan, eerie but stylish, full body, plain dark background.
```
**CHAR_BLACK** (Чёрный Учан)
```
STYLE + very tall broad ghost official in long black robe, extremely tall black conical hat,
dark grey stern face, eyes half closed, holding an iron chain with a shackle, full body, plain dark background.
```
**CHAR_MENGPO**
```
STYLE + kind old Chinese woman, grey hair in a bun, wrinkled gentle face, plain brown robe and apron,
holding a wooden ladle and a small clay bowl of steaming soup, standing behind a big iron pot with teal steam.
Her shadow on the ground has the silhouette of a young slender girl. Full body, plain dark background.
```
**CHAR_KING1** (царь Циньгуан)
```
STYLE + stern underworld judge king in red and black imperial official robes, black official hat with long side flaps,
long black beard, seated behind a massive dark wooden desk with a brush and seal, front view, plain dark background.
```

## Фоны (без персонажей)
**BG_BRIDGE**
```
STYLE + narrow stone arch bridge over a dark red river at night, thick teal mist,
a small wooden stall with an iron pot and rows of clay bowls at the foot of the bridge, red paper lanterns. Empty, no people.
```
**BG_HOUSE**
```
STYLE + interior of a small traditional Chinese house at night, rain on a lattice window,
one red paper lantern glowing on the windowsill, wooden table, warm dim light. Empty, no people.
```
**BG_DOOR**
```
STYLE + open wooden door of a traditional Chinese house at night, seen from inside, rain outside, dark doorway, low door frame. Empty.
```
**BG_ROAD**
```
STYLE + endless misty road in the underworld, yellowish fog, scattered paper joss money on the ground,
long line of faint grey human silhouettes walking away into the fog. Vertical composition.
```
**BG_GATE**
```
STYLE + giant black gate of the underworld (Ghost Gate Pass), massive doors, blank plaque above,
chains, red lanterns, mist; far behind the gate a tiny column of steam rises. No people.
```
**BG_COURT1**
```
STYLE + vast dark underworld courtroom, red pillars, judge's high platform with a massive desk,
a huge round bronze mirror on a carved stand to the side, incense smoke. No people.
```

## Предметы и крупные планы
**PROP_THREAD**: `STYLE + close-up of a woman's pale wrist with a thin red thread tied around it, dark background.`
**PROP_BOOK**: `STYLE + close-up of an old open Chinese book with vertical columns of ink writing, one name crossed out with a fresh black ink stroke, a drop of ink dripping. No readable text.`
**PROP_CHAIN**: `STYLE + close-up of an iron shackle and chain closing around a pale wrist with a red thread.`
**PROP_TABLET**: `STYLE + vertical dark stone tablet with a red square seal at the top, blank surface, faint mist around it, centered.`
**PROP_MIRROR**: `STYLE + huge round bronze mirror on a carved dark wood stand, its surface glowing faint teal, centered.`
**MIRROR_HAND**: `STYLE + inside a round bronze mirror frame: a man's hand holding a calligraphy brush, crossing out a line in a book, a red thread tied on his wrist.`

## Серия 2 — новые картинки
**CHAR_SCRIBE** (писарь Цуй)
```
STYLE + thin nervous underworld scribe in dark grey official robe, small round spectacles, ink-stained fingers,
holding a large open book half covering his face, hunched posture, full body, plain dark background.
```
**PROP_KNOTS**: `STYLE + extreme close-up of a pale wrist with a thin red thread tied around it, seven small knots along the thread, dark background.` (сделай также версии с 6, 5, 4… узелками, а для серии 2 отдельный кадр, где один узелок наполовину развязан)
**BG_FESTIVAL**
```
STYLE + Lantern Festival at night, thousands of glowing paper lanterns floating over a calm river,
warm gold and red light, small stone bridge, dreamy soft atmosphere. No people.
```
**LAN_YOUNG**: `STYLE + the same girl as CHAR_LAN but 17 years old, festive light pink hanfu, holding a paper lantern, smiling.` (прикладывай CHAR_LAN как референс)
**WEI_MEMORY**
```
STYLE + young Chinese man in dark green robe seen from behind / three-quarter back view, face not visible,
reaching up and catching a floating paper lantern, red thread on his wrist, warm festival light.
```
**MEMORY_BURN**: `STYLE + the Lantern Festival scene inside a round bronze mirror frame, the image burning away from the edges like paper, glowing ember edges, ash floating.`
**BG_CORRIDOR**: `STYLE + long dark underworld corridor with red pillars and hanging paper lanterns, mist on the floor, vanishing point in the center. No people.`
