# Kolo 4 – implementace: vizuály, decentní pohyb a volba „Jiné“

Udělal jsem všechny body P1 a P2 (R4-01 až R4-17, R4-21, R4-22) a všechny P3 (R4-18 až R4-20). Výjimky a odchylky jsou v tabulce a v bodě 5.
Mimo `v2/` jsem nic neměnil, s gitem jsem nepracoval a `v2/porovnani.html` jsem nechal být.
Stránky dál generuje `scratchpad/build/build.mjs`.
Žádný nový fakt jsem nepřidal:
- diagramy ukazují jen údaje z webu (90–200 cm, do 800 mm, do 190 cm) a obecné pojmy (osnova, útek);
- fotky mají `alt=""` a nemají popisky;
- FormSubmit (`action`, `data-endpoint`, skrytá pole, `_next` = `/v2/kontakt?odeslano=1`) i `noindex` zůstaly beze změny.

## 1. Stav bodů

| Bod | Stav | Co jsem udělal |
|---|---|---|
| R4-01 Ilustrační systém | hotovo, s odchylkami | Všech 41 grafik jsem nakreslil ručně jako SVG z generátoru `scratchpad/r4/illus.py` (seznam v bodě 2). Pravidla stylu: tah 2 (nitě v diagramech 1,5, kóty 1), kulaté konce, `rx` 2–4, čisté 2D. Křížení nití je kreslené jako v logu: spodní nit má mezeru 3 jednotky kolem horní. Každá grafika má jeden modrý akcent a v SVG není žádný text. Barvy jdou jen přes `--ill-line/-muted/-fill/-fill-2/-accent` a mají světlou i tmavou variantu. Piktogramy, vzorníky a statické spoty jsou ve spritu `assets/img/illustrations.svg` (11,7 kB). Kreslené spoty a diagramy jsou vložené inline s `pathLength="1"`, `.draw` a `.fill`. Grafiky mají `aria-hidden` a `focusable="false"`; informativní diagramy jsou `<figure>` s `<figcaption>`. Odchylky: (a) `non-scaling-stroke` platí jen tam, kde se nekreslí (bod 5.1); (b) ilustrace použití mají viewBox 80 × 80 místo 160 × 112, protože se zobrazují jako čtverec 72 / 40 px. |
| R4-02 Fotky | hotovo | Z kořenového `assets/img/` (jen čtení) jsem vygeneroval navy duotón přesně podle postupu: jas L, úrovně 0,04 / 0,96, gama 1,1 a přechod `#00060f` → `#2a3858` → `#dbe4f7`, WebP q72. Laser zůstal v přirozených barvách. Výřezy podle tabulky, `kontakt.webp` jen y 0–768. Vodoznak jsem zkontroloval zvětšením pravého dolního rohu zdroje i výsledku: ve výsledku po něm není stopa. Velikosti: varianty 1600 mají 15–62 kB, varianty 800 mají 6–44 kB. Všechny fotky jsou `<img>` s `width/height`, `srcset`, `sizes`, `loading="lazy"` a `object-position` podle zadání. |
| R4-03 Motiv „tkaná mřížka“ | hotovo | Symbol `weave-mark`: 5 svislých nití v serpentině se smyčkami, 5 vodorovných a mezery v kříženích. Umístění: hlavičky všech podstránek (400 px, `--blue-300` .12; mobil 220 px .08), CTA pás (320 px, bílá .10, na mobilu skrytý) a patička (240 px vlevo dole, .05, na mobilu skrytý). Vzor plátnové vazby (buňka 24 px, bílá .04) je pod faktovým pásem; místo `<pattern>` je to CSS data-URI. Kontrast textu nad motivem jsem změřil (bod 3). |
| R4-04 Domů – služby + fotopás | hotovo | 4 karty mají okno ilustrace 136 px (`--blue-50`) se spotem 160 × 112. Mřížka 4 / 2 / 1 se lomí na 1200 a 768 px. Na mobilu je spot 56 px vlevo od nadpisu. „Přehled služeb →“ je v hlavičce sekce, na desktopu vpravo. Fotopás laseru je podle zadání: výška `clamp(380px, 38vw, 540px)`, překryv a panel `--navy-900` (max. 520 px, padding 40). Na mobilu je fotka 16 : 10 → 16 : 9 (kvůli délce) a panel ji překrývá o −32 px. |
| R4-05 Použití | hotovo | Podklad `pouziti-duo` s překryvem .86 a parallaxem. Na desktopu jsou dlaždice 4 × 2 (min. 168 px, ilustrace 72 px nahoře), na tabletu 2 sloupce. Mobil zůstal jako seznam v jedné kartě, jen se spotem 40 px. Poslední dlaždice má otazník z nitě. |
| R4-06 Proč Bohemia Textil | hotovo | Dělená sekce 5 + 7: fotka 1 : 1 a panel „od roku 1997 / vyrábíme technické tkaniny“ přes pravý dolní roh (−24 px). Vpravo seznam 4 hodnot s piktogramy 48 px a linkami. Na mobilu je fotka 16 : 9 a panel přesahuje spodní hranu o 24 px. |
| R4-07 Služby – diagramy | hotovo | Tkaní, Snování, Vývoj a Laser mají diagram v cikcaku (vpravo / vlevo / vpravo / vlevo). Box Parametry je pod textem a popisky diagramů jsou podle zadání. Kóty jsou HTML popisky, legenda (osnova / útek, konstrukce · …) je HTML. Návazné služby mají karty s piktogramem 48 px, mřížka 4 / 2 / 2. Na mobilu je diagram hned pod nadpisem. Navíc jsem odebral box „Co navrhneme“: stejné tři položky stály v textu, v popisku diagramu i v boxu. Viz bod 5.4. |
| R4-08 Fotopás „O nic se nestarejte“ | hotovo | Fotopás `nabizime-duo` (výška `clamp(300px, 30vw, 440px)`, parallax) se stejným panelem. Původní věta je rozdělená na H2 „O nic se nestarejte“ a odstavec. Odkaz „Jak spolupráce probíhá ↓“ vede na `#postup`. Eyebrow je „Vše z jedné ruky“, název hodnoty z webu. |
| R4-09 Laser | hotovo | „Proč řezat laserem“ je dělená sekce 5 + 7: diagram řezné dráhy (sticky, `top: 104px`) a vedle seznam 4 výhod s piktogramy. Karty materiálů mají piktogram 48 px: cívka, tobolka, list, pláty. Fotka v hlavičce zůstala. |
| R4-10 Materiály | hotovo | Hlavička má texturu `pouziti-duo-800` (.18, maska zleva) a motiv. Karty mají vzorník v okně 120 px (vzorek 88 px, štítek PES / PA / PP jako HTML, u bavlny tobolka v SVG). Na mobilu je vzorek 48 px vlevo od názvu. Box „Nevíte…“ má spot vazebního papíru 96 px, na mobilu skrytý. |
| R4-11 O nás | hotovo | Dělená hlavička s `kontakt-duo` 4 : 3 a motiv částečně za fotkou. Na mobilu je fotka pod perexem, max. 220 px. Hodnoty mají piktogramy 48 px. |
| R4-12 Kontakt | hotovo | Textura hlavičky `kontakt-duo-1024` (.28, maska zprava) a motiv. Karta „Co do poptávky napsat“ má spot „technický list s fajfkami“ 96 px, na mobilu skrytý. |
| R4-13 Pohybový základ | hotovo | Tokeny `--ease-out`, `--ease-in-out`, `--dur-1` až `--dur-4` a `--stagger` jsou v `:root`. Odhalení: 16 px, 600 ms, stagger 80 ms, max. 6 kroků (400 ms); fotky v dělených sekcích `scale(1.04) → 1` za 900 ms; panely 24 px, 700 ms, zpoždění 150 ms. IntersectionObserver má `threshold .15`, `rootMargin -8%` a spouští jen jednou. Co je vidět při načtení, ukáže se bez animace. Pojistka 3 s; bez JS i v tisku je vše vidět. |
| R4-14 Hero a parallax | hotovo (volitelná část ne) | `hero-settle` (1.06 → 1, 1 600 ms, jednou, text se nehýbe). Parallax fotopásů a podkladu Použití je přes CSS `animation-timeline: view()` přesně podle zadání: jen od 768 px, s podporou prohlížeče a bez omezeného pohybu. Kontejnery fotek mají `overflow: clip` (`hidden` by vytvořil posuvný kontejner a `view()` by nesledoval stránku). Volitelný posun hero při scrollu jsem vynechal (bod 5.6). |
| R4-15 Mikrointerakce | hotovo | Jen pro `(hover: hover) and (pointer: fine)`. Barvy se mění vždy, pohyb jen bez omezeného pohybu. Šipka tlačítek +3 px, `:active` `scale(.98)`. Karty −3 px se stínem; spot −2 px a akcent `--blue-600`. Textové odkazy plynule ztlustí podtržení. Navigace má podtržení `scaleX` od středu (220 ms). Dlaždice použití mají `#1b2437`, řádky tabulky `--surface`. Ikona telefonu se jednou zhoupne (±8°). |
| R4-16 Kreslení linky procesu | hotovo | Na desktopu je jedna linka `.steps::before` se `scaleX` 1 200 ms. Kroužky naskakují se zpožděním `100 ms + i × 180 ms`, text o 80 ms později. Na mobilu jsou svislé spojnice `scaleY`. Spouští se při 30% viditelnosti. |
| R4-17 Kreslení ilustrací + bod laseru | hotovo | `.draw` se kreslí 1 200 ms, akcent o 300 ms později, výplně `.fill` naběhnou po 600 ms. Čárkované řezy jsou odhalované maskou, takže zůstanou čárkované. Bod laseru jede po křivce přes `offset-path` 2 400 ms a pak zmizí. Výchozí stav je nakresleno: skrytí zapíná jen `html.js-draw`. Piktogramy se nekreslí. |
| R4-18 Count-up | hotovo | 500 m, 190 cm a 90–200 cm (obě čísla); „4 materiály“ zůstává. 900 ms, easeOutCubic, start při 50% viditelnosti, při načtení po 300 ms. Před startem se nastaví `min-width`, takže nic neposkočí. Číslo má `aria-hidden` a vedle je `visually-hidden` s konečnou hodnotou. |
| R4-19 Loga | hotovo | Průhlednost 0 → .85, 500 ms, stagger 80 ms, spouští se při 20% viditelnosti. |
| R4-20 Lesk motivu | hotovo | CTA pás: maskovaný přechod přes kopii motivu (.10 → asi .28), 2 400 ms, jednou. Je to `transform` na obdélníku v masce, ne posun masky. Motiv v hlavičkách jednou najede `translateX(16px) → 0` a z průhlednosti. |
| R4-21 Volba „Jiné“ | hotovo | Poslední checkbox `name="Služba" value="Jiné"` (6 voleb = 3 plné řádky). Pod skupinou je nápověda `#sluzba-jine-hint` s ikonou šipky dolů. Je v oblasti `aria-live="polite"` a checkbox na ni ukazuje přes `aria-describedby`. Klik na „popisu poptávky“ přesune fokus do textového pole. Popis poptávky povinný není. Bez JS se nápověda nezobrazí. |
| R4-22 Kontroly | hotovo | Výsledky v bodě 3. |

## 2. Vytvořené grafiky (41)

Kresby generuje `scratchpad/r4/illus.py`. Inline grafiky jsou v `scratchpad/build/svg/`, ostatní ve spritu `v2/assets/img/illustrations.svg`.

- **Spoty služeb (160 × 112, kreslené, inline):**
  - `spot-tkani`: osnova jako serpentina se smyčkami, útek jako akcent, plátnové provázání;
  - `spot-snovani`: vál zboku se dvěma čely, vstupující nitě jako akcent a navinuté vrstvy; čelo má mezery tam, kde přes něj vedou nitě;
  - `spot-vyvoj`: vazební papír 8 × 6, kepr jako akcent, tužka;
  - `spot-navazne`: pruh látky mezi válci, kapka jako akcent, dvě jiskry;
  - `spot-laser`: list látky, čárkovaná řezná křivka jako akcent, hlava s paprskem. Je hotový, ale zatím ho nic nepoužívá, protože laser je na Domů fotopás místo karty.
- **Diagramy (480 × 300, kreslené, inline, max. 6,8 kB):**
  - `dia-tkani`: plátnová vazba 6 × 6 z pásků, útek jako akcent;
  - `dia-snovani`: vál s kótami šíře a průměru čela;
  - `dia-vyvoj`: rozvrh 12 × 8 s keprem, tužka;
  - `dia-laser-s` a `dia-laser-l` (stejná kresba s jinými id masky): pás látky, tři čárkované tvary, hlava laseru, kóta „do 190 cm“, bod laseru.
- **Ilustrace použití (80 × 80, tmavá paleta, kreslené, inline):** auto se sedačkou jako akcent, filtr se šipkami toku, slunečník s okrajem stříšky, vrstvy s nánosem a válečkem, roll-up s banerem, batoh s popruhem, stojan s plátnem, otazník z nitě.
- **Piktogramy 48 px (sprite, statické, s `non-scaling-stroke`):**
  - návazné služby: truck, spark, drop, roller;
  - hodnoty: calendar, bubbles, nodes, factory;
  - materiály laseru: spool, cotton, sheet, plates;
  - výhody laseru: width, cut, shapes, recycle.
- **Vzorníky (88 × 88, sprite):** `sw-pes`, `sw-pa`, `sw-pp`, `sw-cotton`. Všechny mají stejnou vazbu a liší se jen akcentní nití; štítek PES / PA / PP je HTML.
- **Statické spoty 96 (sprite):** `spot-sheet` (technický list s fajfkami), `spot-paper` (vazební papír).
- **Motiv:** `weave-mark` (200 × 200) a vzor vazby 24 px (CSS).
- **Úklid:** ze `icons.svg` jsem smazal 20 ikon nahrazených piktogramy a ilustracemi, aby byla na webu jen jedna sada (4,3 kB místo 9,4 kB). Nepoužité soubory nezůstaly; kontrola odkazů nenašla nic chybějícího ani nepoužitého.

## 3. Výsledky kontrol R4-22

Skripty jsou ve `scratchpad/shot/`: `r4-impl-check.mjs`, `r4-contrast.mjs`, `r4-motion-sample.mjs`, `r4-weight.mjs` a `r1-impl-perf.mjs` (výkon měřený stejně jako v kole 1).

1. **Screenshoty:** `shots/r4-impl/` obsahuje všech 7 stránek na desktopu i mobilu (dlaždice + `-full`), `checks/` šířky 320, 768, 1024 a 1920 a snímky animací. Prošel jsem je i ve 2× zvětšení. Vodorovný posuvník není nikde: 6 šířek × 7 stránek dává 0 px přetečení.
2. **Kontrast** (nejsvětlejší pixel pod textem):
   - nadpis Použití na fotopodkladu: **13,6 : 1**, eyebrow 6,6 : 1;
   - perexy podstránek s texturami a motivem: min. **4,77 : 1** (Služby, 1024 px), Materiály 5,22, Kontakt 6,34;
   - hero: min. 5,23 : 1;
   - texty fotopásů jsou na plném panelu `--navy-900`.
3. **Omezený pohyb (emulace `reduce`):** na všech 7 stránkách 0 běžících animací a 0 transformovaných prvků. Ilustrace jsou nakreslené, výplně viditelné, čísla konečná a fotky statické.
4. **Bez JS:** všechen obsah je vidět, ilustrace nakreslené, čísla konečná a formulář se odesílá nativně (`novalidate` = false, nápověda „Jiné“ skrytá).
5. **Výkon:**
   - CLS je 0–0,0005;
   - LCP Domů (medián 7 běhů, pomalé 4G + CPU 4×): mobil **1 636 ms** (kolo 1: 1 560 ms, +4,9 %), desktop **1 608 ms** (kolo 1: 1 572 ms, +2,3 %); rozptyl mezi běhy na tomto stroji je ±20 %;
   - Domů po proscrollování celé stránky: desktop **315 kB**, mobil **255 kB**;
   - přidané JS: **+2 040 B** (site.js 8,8 kB);
   - 0 chyb v konzoli.
6. **Délka na 390 px:** Domů **7 055 px** (≤ 7 400), Služby **5 395 px** (≤ 5 400). Ostatní: Laser 4 109, Materiály 3 310, O nás 3 822, Kontakt 3 364 a Ochrana soukromí 2 373 px.
7. **Pravdivost:** nové texty jsou jen tyto:
   - panel laseru ze zadání;
   - věta „O nic se nestarejte…“ z originálu;
   - eyebrow „Vše z jedné ruky“, název hodnoty z webu;
   - panel „od roku 1997 / vyrábíme technické tkaniny“;
   - popisky diagramů ze zadání;
   - legendy „osnova (podélné nitě)“, „útek (příčné nitě)“ a „konstrukce · materiálové složení · finální úpravy“;
   - nápověda „Jiné“ ze zadání.

   Fotky nemají popisky a výřez `kontakt` je bez vodoznaku.
8. **Klávesnice:** nové prvky mají viditelný fokus (tlačítko ve fotopásu má 2px `--blue-300`). Tab jde z „Jiné“ na odkaz v nápovědě a pak na „Materiál“. Dekorace nejsou fokusovatelné a všechny `svg.ill` / `svg.pic` jsou pod `aria-hidden`.
9. **Pohyb opravdu běží** (Playwright, pohyb zapnutý):
   - po 250 ms má hero `scale(1.027)` a animaci `hero-settle:running`;
   - count-up: `0 m → 27 → 248 → 375 → 450 → 489 → 499 → 500 m` (vzorky po 150 ms), uprostřed `491 m | 88–197 cm | 187 cm`;
   - spoty se kreslí: po 550 ms je `stroke-dashoffset` ≈ 0,08 a výplně ještě skryté;
   - linka procesu je po 500 ms na `scaleX(.5)` a kroužky `1, 1, .94, 0, 0`, na konci všechny 1;
   - parallax: `translateY` se mění se scrollem (−19 → −7 → +5 → +17 px);
   - lesk CTA běží a bod laseru je po 1,9 s na 42–50 % dráhy.

   Snímky uprostřed animací: `checks/anim-01…05.png`.
10. **Formulář (podvržená odpověď, nic se neodeslalo):** nápověda se zobrazí po zaškrtnutí a schová po odškrtnutí, klik na odkaz přesune fokus do `f-message`. Payload obsahuje `"Služba":"Tkaní na zakázku, Jiné"`, úspěšný stav funguje a skrytá pole i endpointy jsou beze změny.

## 4. Soubory

Mimo `v2/` jsem nic neměnil.

- **Změněné:**
  - stránky: všech 7 `v2/*.html` (vygenerované);
  - styly a skripty: `assets/css/style.css` (ilustrační paleta, fotopásy, dělené sekce, diagramy, mobilní formy, pohybový systém), `assets/js/site.js` (pohyb, count-up, „Jiné“);
  - ikony: `assets/img/icons.svg` (smazáno 20 symbolů, přidán `arrow-down`).
- **Přidané:**
  - sprite `assets/img/illustrations.svg`;
  - fotky: `laser-band-800/1600.webp`, `nabizime-duo-800/1600.webp`, `nabizime-duo-sq-560/800.webp`, `pouziti-duo-800/1600.webp`, `kontakt-duo-640/1024.webp`.
- **Zdroje (scratchpad):**
  - `build/build.mjs`: zástupné značky `{{svg:}}`, `{{pic:}}`, `{{sw:}}`, `{{spot96:}}`, `{{headmark}}`, motiv a lesk v CTA pásu, motiv v patičce, `js-draw` a pojistka 3 s;
  - `build/pages/*.html` a `build/svg/*.svg`;
  - `r4/illus.py` (grafiky) a `r4/photos.py` (fotky).

## 5. Otevřené otázky a odchylky

1. **`non-scaling-stroke` × kreslení:** v Chromu se při `vector-effect: non-scaling-stroke` přepočítá `stroke-dasharray` do pixelů obrazovky a kreslení přes `pathLength` se rozpadne (ověřeno testem). Řešení:
   - od 768 px se kreslí bez `non-scaling-stroke`; grafiky jsou tam v měřítku asi 1 : 1, diagram na 1 024 px asi 0,82, takže tah vychází 1,6–2 px;
   - na mobilu a ve spritu je `non-scaling-stroke` a nic se nekreslí.

   Je to tak v pořádku?
2. **Spot „Laserové řezání“** je nakreslený, ale zatím nepoužitý. Chceš ho někde, třeba na mobilu místo fotky ve fotopásu?
3. **Krokům procesu** se text zobrazí, až k nim dorazí linka. Poslední krok je celý vidět asi po 1,3 s. Je to podle zadání, ale pro čtenáře to může působit pomaleji. Mám text ukazovat hned a animovat jen kroužky a linku?
4. **Služby na mobilu (cíl ≤ 5 400 px):** abych cíl splnil, udělal jsem toto:
   - legendu diagramů a popisky, které opakují údaje hned pod diagramem, na mobilu jen vizuálně skrývám (čtečky je dál čtou);
   - diagram má na mobilu 256 px šířky, tedy asi 160 px výšky;
   - kotvy služeb jsou v jednom vodorovně posuvném řádku;
   - box „Co navrhneme“ jsem odebral na všech šířkách (trojí opakování).

   Prosím o posouzení.
5. **Duotón** jsem dělal v Pythonu (Pillow) se stejným vzorcem, ne přes Node + canvas. Výsledek je stejný.
6. **Volitelný posun hero při scrollu** jsem vynechal. Fotka má jen 1 200 px a posun o 8 % by bez zvětšení odkryl okraj; se zvětšením by zase přidal neostrost.
7. **Fotopás laseru** má zdroj 1 600 px a na 1 920 px se trochu zvětšuje. Fotka je sama měkká, takže to není znát; případně přidám variantu 1920 ze zdroje (+asi 5 kB).
8. **LCP:** odchylka je v rámci rozptylu měření. Doporučuji ověřit v Lighthouse v reálném Chromu, spolu s axe (úkol před nasazením).

---

# Kolo 5 – oprava vzorníků, text procesu a drobnosti

Udělal jsem obě položky P2 (R5-01 a R5-02), všechny P3 (R5-03 až R5-07) a tvé odpovědi na mé 4 otázky.
Ze seznamu „můžeme sami“ jsem přidal piktogramy kroků procesu, nový OG obrázek, fotopás laseru 1920 a odkaz do ARES.
FAQ jsem podle zadání nepřidal.
Pravidla platí dál: jen `v2/`, build přes `build.mjs`, bez gitu, `porovnani.html` beze změny a žádné nové fakty.
`_next`, `noindex` i FormSubmit jsou beze změny.

| Bod | Stav | Co jsem udělal |
|---|---|---|
| R5-01 Vzorníky | hotovo | Vzorník je teď kus látky 56 × 56 otočený o −6°. Okraje: vpravo a dole cikcak po vroubkovacích nůžkách (bez linky pod ním); levý horní roh je zahnutý a cíp je ve `--ill-fill`. Vazba uvnitř má buňku 8 a jediná akcentní nit odlišuje materiál. Visací štítek se zaobleným rohem, dírkou a provázkem 1 px visí přes pravý horní roh; text PES / PA / PP je v HTML přesně na štítku. Bavlna má místo štítku malou tobolku bez rámečku. Na desktopu má vzorník 96 px v okně 120 px, na mobilu 48 px. Výřezy: `shots/r5-impl/zoom/swatches-desktop.png` a `swatches-mobile.png` (2×). |
| R5-02 Text procesu | hotovo | Nadpisy, texty i piktogramy kroků jsou vidět hned, bez animace. Ověřeno: 0 prvků s průhledností < 1 před vjetím sekce i 150 ms po něm. Animují se jen linka (`scaleX`, 1 200 ms) a kroužky (`scale .6 → 1`). Kroužky mají během animace pořád stejné místo 40 × 40 v layoutu, takže se nic neposouvá. |
| R5-03 Malé symboly služeb | hotovo | Nakreslil jsem 5 kompaktních symbolů (viewBox 48, tah 2, ≤ 5 cest, 1 akcent): `sym-tkani`, `sym-snovani`, `sym-vyvoj` a `sym-laser`; poslední je zjednodušený spot laseru, velký spot jsem z buildu smazal. Navíc `sym-navazne` (kapka nad válečkem). Použití: v mobilních kartách služeb na Domů místo zmenšených spotů (dlaždice 56, symbol 40) a v nadpisech bloků na Službách (48 / 40 px). Staré ikony služeb (`weave`, `warp`, `idea`, `laser`, `finish`) jsem z `icons.svg` odstranil. |
| R5-04 Diagramy | hotovo | Popisky kót „do 800 mm“ a „do 190 cm“ jsou vpravo od kótovací čáry a svisle na středu. Kresby jsem posunul doleva, aby se popisky vešly; přerušování obrysu je pryč. Tkaní má popisek „Princip tkaní – plátnová vazba.“ a u Vývoje jsem odstranil legendu. |
| R5-05 Ilustrace použití | hotovo | „Malířská plátna“: na plátně je krajina se dvěma kopci a sluncem, akcent zůstal na plátně. „Reklamní stánky a banery“: roll-up s horní lištou, kazetou a rozkročenou nohou, velký akcentní kruh na baneru a praporek vedle. |
| R5-06 O nás a Laser – hlavičky | hotovo | Pro O nás je nová světlejší varianta `kontakt-duo-lt-640/1024.webp`: bílý bod 0,90, střed přechodu na 0,4, takže záhyby jsou čitelné. Motiv je u obou dělených hlaviček přesunutý za fotku (`z-index: -1` v izolovaném obalu fotky) a přesahuje jen horní hranu fotky, ne okraj okna. |
| R5-07 Kotvy na mobilu | hotovo | Posuvný řádek má `mask-image: linear-gradient(90deg, #000 85%, transparent)` a `scroll-padding-inline: 16px`. |
| Odpověď 1 – tah kreslených grafik | ověřeno | JS nastaví u každé kreslené SVG `--k` = šířka viewBoxu / vykreslená šířka a tah se tím vyrovná. Naměřený efektivní tah na 768, 900, 1024, 1100, 1280, 1440 a 1920 px: obrysy **2,0 px**, nitě diagramu tkaní 1,5 px (záměrně tenčí). Bez kompenzace by na Laseru na 1 024 px byl jen 1,33 px. |
| Proces – piktogramy kroků | hotovo, jen od 768 px | Kroky mají piktogramy 48 px: obálka (nová `pic-envelope`), vazební papír, tkanina, kapka, auto. Na mobilu jsou skryté, jinak by Služby překročily limit 5 400 px. |
| OG obrázek | hotovo | Nový `v2/assets/img/og.jpg` (1200 × 630, 85 kB). Obsahuje logo, eyebrow „Český výrobce od roku 1997“, H1 „Technické tkaniny na zakázku“, fakta z webu (PES · PA · PP · bavlna · od 500 m · laser do 190 cm), duotón látky z hero a motiv. Vykreslil jsem ho Playwrightem s písmy webu. `og:image` ve v2 míří na `https://www.bohemiatextil.cz/v2/assets/img/og.jpg`, doplnil jsem `og:image:width/height`. **Při povýšení v2 do kořene změnit cestu na `/assets/img/og.jpg`.** |
| Fotopás laseru 1920 | hotovo | Zdroj má 1920 × 800, takže bez zvětšení vznikl `laser-band-1920.webp` (q82, 22 kB) a je v `srcset` (800 / 1600 / 1920 w). |
| ARES | hotovo | V patičce u IČ a v kartě „V kostce“ je odkaz „ověřit v ARES“ na `https://ares.gov.cz/ekonomicke-subjekty?ico=64250938` s `target="_blank" rel="noopener"` a hláškou „(otevře se v novém okně)“ pro čtečky. URL je ta, kterou jsi navrhl; samotnou stránku ARES jsem neotevíral. |

**Ověření kola 5**
- **Screenshoty:** `shots/r5-impl/` obsahuje všech 7 stránek na desktopu i mobilu (dlaždice + `-full`), prošel jsem je. Ve `zoom/` jsou 2× výřezy všech překreslených grafik: vzorníky (desktop / mobil), symboly služeb na mobilu, nadpis s symbolem, diagramy snování a laseru (desktop / mobil), použití (desktop / mobil), proces s piktogramy, hlavičky O nás a Laser, posuvník kotev a patička s ARES. Sestava všech nových grafik je v `zoom/preview-all.png`.
- **R4-22 (`shot/r5-impl-check.mjs`):**
  - 6 šířek × 7 stránek: 0 chyb a varování v konzoli, 0 přetečení, 1× H1, `noindex`, ilustrace pod `aria-hidden`;
  - omezený pohyb: 0 animací, 0 transformací, vše nakreslené;
  - bez JS je vše vidět;
  - pohyb: count-up, kreslení, linka, parallax ±13 px na vzorkovaných pozicích, bod laseru;
  - formulář „Jiné“: payload `"Tkaní na zakázku, Jiné"` a fokus.
- **Délky na 390 px:** Domů **7 089** (≤ 7 400), Služby **5 375** (≤ 5 400; kvůli odkazu ARES v patičce jsem zmenšil odsazení bloků služeb na 20 px). Ostatní: Laser 4 143, Materiály 3 344, O nás 3 891, Kontakt 3 399, Ochrana soukromí 2 408 px.
- **Výkon:**
  - CLS ≤ 0,0005;
  - LCP Domů: desktop 1 560–1 648 ms, mobil 1 212–1 300 ms (3 běhy);
  - Domů po proscrollování: desktop 315 kB, mobil 256 kB;
  - JS celkem +2 282 B proti kolu 3 (limit 4 kB).
- **Soubory (vše v `v2/`):**
  - změněné: 7 × HTML, `style.css`, `site.js`, `icons.svg` (−5 ikon služeb), `illustrations.svg` (nové vzorníky, `sym-*`, `pic-envelope`, 15 kB), `og.jpg`;
  - přidané: `kontakt-duo-lt-640/1024.webp`, `laser-band-1920.webp`;
  - smazané: `kontakt-duo-640.webp` (už nepoužitý).

  Zdroje: `scratchpad/r4/illus.py` (záloha stavu kola 4 je `illus.r4.bak`), `photos5.py`, `pages5.py`, `css5.py`; `build/build.mjs` (`{{sym:}}`, `{{ares}}`, `og:image`). Kontrola odkazů na soubory: nic chybějícího ani nepoužitého.

**Otevřené otázky**
1. Piktogramy kroků jsou jen od 768 px. Na mobilu by je šlo dát 32 px vedle nadpisu, ale Služby by pak měly asi 5 415 px. Mám limit takto překročit?
2. OG obrázek ukazuje i fakta (materiály, 500 m, 190 cm). Pokud chceš čistší variantu jen s H1, vygeneruji ji stejným skriptem (`shot/r5-og.mjs`).
3. `og:image` teď míří na `/v2/…` a při nasazení do kořene se musí změnit, podobně jako `_next`. Je to na seznamu orchestrátora.
