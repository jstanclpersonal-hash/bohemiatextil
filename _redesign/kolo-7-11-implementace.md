# Kolo 7 – implementace (větev `v2-fixes-snovani`)

Udělal jsem R7-01 až R7-05 i optimalizaci obrázků. Odchylky od zadání jsou v bodě 4.

Dodržel jsem pravidla kola:
- měnil jsem jen soubory ve `v2/` a s gitem jsem nepracoval;
- `v2/porovnani.html` je nedotčený (čas změny 14:07, build ho nezapisuje);
- stránky generuje `scratchpad/build/build.mjs`;
- žádný nový fakt jsem nepřidal;
- FormSubmit (`action`, `data-endpoint`, skrytá pole, `_next` = `/v2/kontakt?odeslano=1`, `_honey`) i `noindex` jsou beze změny;
- `sharp` 0.33.5 je nainstalovaný jen ve `scratchpad/imgtools/`, ne v repu.

## 1. Stav bodů

| Bod | Stav | Co jsem udělal |
|---|---|---|
| R7-01 Snování | hotovo, 1 odchylka | **Diagram `dia-snovani`** má dva pohledy. **Zepředu:** čela, čepy, návin, 13 navinutých nití (`m t`), 13 přicházejících nití shora (`a t`, každá zvlášť, kreslí se současně shora dolů), vodicí lišta a kóta šíře. **Z boku:** čelo r 90 (`fill-opacity .55`), návin r 54, vrstvy r 44 a 34, hřídel r 22, náboj r 8, osa a pás nití po tečně `M316 20V160A54 54 0 0 0 370 214` s tahem 3. Má i šipku otáčení r 70 a kótu průměru. Pohledy spojují čárkované spojnice. Kóty jsou v HTML, štítky „zepředu“ / „z boku“ také (bod 4.3). Na mobilu má diagram max. 360 px. **Spot `spot-snovani`** je pohled zepředu se 9 nitěmi shora přes vodič a šipkou otáčení. **Symbol `sym-snovani`** je pohled z boku: kotouč, návin, hřídel a pás shora. Výskyty: Domů (karta i mobil), Služby (nadpis i diagram). |
| R7-02 Vzorníky | hotovo, 1 odchylka | `sw-pes/pa/pp/cotton` jsou látka na ramínku: háček, tyčka, látka s přehybem a vlnitým lemem, 3 měkké záhyby, 4 vlnité útky a visačka. Akcent: PES útek y 34, PA útek y 74, PP záhyb x 34, bavlna záhyb x 64. Text PES/PA/PP je HTML (`aria-hidden`, 11 px) a na mobilu je skrytý. Bavlna má na štítku tobolku. Velikost štítku viz bod 4.2. |
| R7-03 „Domů“ v menu | hotovo | „Domů“ je první v hlavičce i v patičce, `aria-current` je na Domů. Hamburger platí do 1023 px (CSS i JS `matchMedia('(min-width: 1024px)')`). Na 1024–1199 px: padding odkazů 8 px, mezera telefon ↔ CTA 12 px. Mezeru menu → telefon jsem dorovnal na 32 px (`margin-right` 20 px pro 1024–1199, 16 px od 1200). Měření je v bodě 3. |
| R7-04 Fotka O nás | hotovo, 1 odchylka | Výřezy z `assets/img/hero.webp` (jen čtení), tónování a umístění přesně podle zadání (podrobnosti pod tabulkou). Úklid: `kontakt-duo-lt-640/1024.webp` jsem smazal, `kontakt-duo-1024` zůstává pro Kontakt. Kvalitu WebP jsem nastavil na q75 místo q80 (bod 4.4). |
| R7-05 Tkaní | hotovo | `spot-tkani` a `sym-tkani` mají rovnou osnovu přes celou výšku. Útek (akcent) je jedna serpentina s otočkami r 8 (spot) a r 5 (symbol). Na kříženích zůstala mezera podle pravidla. Piktogram kroku „Snování a tkaní“ používá `sym-tkani`, takže se změnil s ním. |
| Optimalizace obrázků | hotovo | Podrobnosti jsou v bodě 2. |

Podrobnosti k R7-04:
- **Výřezy:**
  - 4 : 3 (x 300–1020, y 180–720) → `onas-twill-720` a `-480`;
  - 16 : 9 (x 260–1060, y 230–680) → `onas-twill-16x9-720` (720 × 405);
  - nic se nezvětšuje.
- **Tónování:** jas L, úrovně 0,05 / 0,95, gama 1,0, přechod `#0b1220 → #5c6680 → #eef1f6`. Vazba je čitelná i ve stínech (výřez 1 : 1 jsem kontroloval).
- **Desktop:** 4 : 3, max. 440 px, zarovnání vpravo, `rx 12`, rámeček 1 px `rgba(255,255,255,.08)`, `object-position 50% 45%`, `fetchpriority="high"`.
- **Mobil:** `<source media>` s výřezem 16 : 9, max. výška 220 px, `object-position 55% 45%`.
- **Motiv:** `weave-mark` zůstal za fotkou.

## 2. Optimalizace obrázků

### Postup
1. `masters.py` vyrobí bezeztrátové PNG předlohy ze zdrojů v kořeni repa. Zpracování je stejné jako v kolech 1–5. Kontrola: průměrný rozdíl proti dnešním souborům je 0,00.
2. `encode.mjs` předlohy kóduje (`sharp`):
   - **WebP:** kvalitu jsem volil podle viditelnosti a ověřil výřezem 1 : 1 a vykreslením stránky s předlohou.
   - **AVIF:** skript bere nejnižší kvalitu, jejíž SSIM je ≥ SSIM WebP.
   - AVIF vzniká, jen když ušetří ≥ 15 %. Prošly všechny fotky.
3. `logos.mjs` (nad rámec zadání, bod 5):
   - loga klientů a logo webu převádí na paletu 128 barev (bez ditheru) a bezeztrátový WebP;
   - rozdíl proti předloze je menší než u dosavadních ztrátových souborů.

### Soubory

| Soubor | Dřív | WebP (q) | AVIF (q) | AVIF vs WebP |
|---|---|---|---|---|
| hero-1200 | 84,3 kB | 73,0 (50) | 41,9 (39) | −43 % |
| hero-800 | 44,1 | 38,9 (50) | 22,9 (41) | −41 % |
| laser-band-800 / 1600 / 1920 | 6,4 / 14,7 / 22,6 | 6,4 / 14,4 / 18,7 (70) | 2,8 / 4,6 / 13,6 | −56 / −68 / −27 % |
| nabizime-duo-800 / 1600 | 16,4 / 62,1 | 14,7 / 56,1 (65) | 9,7 / 36,6 (46) | −35 % |
| nabizime-duo-sq-560 / 800 | 23,8 / 44,1 | 23,3 / 43,5 (70) | 16,9 / 33,8 (49) | −28 / −22 % |
| pouziti-duo-800 / 1600 | 11,9 / 43,3 | 9,1 / 30,2 (50) | 5,6 / 18,5 (43) | −38 / −39 % |
| kontakt-duo-1024 | 17,3 | 10,9 (50) | 6,5 (44) | −40 % |
| laser-640 / 1067 | 7,3 / 13,2 | 7,3 / 13,4 (72) | 3,2 / 7,3 | −56 / −46 % |
| onas-twill-480 / 720 / 16x9-720 | nové | 29,8 / 58,3 / 48,6 (75) | 21,6 / 48,8 / 33,6 | −28 / −16 / −31 % |
| head-texture-640 (nové, místo hero-800 v hlavičce Služeb a Ochrany) | 44,1 | 23,4 (40) | 12,7 (36) | −45 % |
| loga klientů ×4 | 37,4 | 13,5 (paleta, bezeztrátově) | – | – |
| logo.webp | 9,8 | 3,6 (paleta, bezeztrátově) | – | – |
| og.jpg (mozjpeg q86) | 85,7 | – | – | 70,4 kB ≤ 80 ✓ |

### Kvalita WebP podle viditelnosti
- **q40:** podklad hlavičky (průhlednost .14). Šířka 640 místo 800; rozdíl ve vykreslení je průměrně 0,4 úrovně z 255.
- **q50:**
  - hero pod překryvem .82–.94;
  - Použití pod překryvem .86;
  - Kontakt jako podklad .28.
- **q65–72:** viditelné fotopásy a fotky.
- **q75:** kepr O nás.

### Další úpravy
- **`<picture>`:** AVIF a WebP fallback dostaly hero, oba fotopásy, podklad Použití, dělená sekce, hlavička Laseru a O nás. `picture { display: contents }` nechává rozložení na `<img>`, takže selektory a parallax se nezměnily.
- **CSS pozadí:** používají `image-set()` s `type()`. Před nimi zůstává čistá WebP deklarace jako záloha.
- **Atribut `sizes`:** opravil jsem tři místa (výpočet podle mřížky):
  - dělená sekce: `(min-width:1280px) 473px, (min-width:1024px) calc(41.67vw - 60px), (min-width:400px) 92vw, calc(100vw - 32px)`;
  - hlavička Laseru: 480 px / `calc(41.67vw - 53px)`;
  - O nás: 440 px od 1184 px.
- **Kontrola `sizes`:** audit (`shot/r7-sizes.mjs`) prošel 7 stránek × 18 šířek (320–1920). Bere zdroj, který prohlížeč skutečně vybere. Výsledek: **0 neshod** (tolerance 8 % nebo 24 px).
- **SVG:**
  - generátor zaokrouhluje na 1 desetinné místo a výstup minifikuje (bez komentářů, mezer mezi značkami a nadbytečných nul v `d`);
  - `icons.svg` je bez komentářů a odsazení;
  - velikosti:
    - sprite 15 379 → 15 089 B (gzip 3 702 → 3 485);
    - ikony 2 996 → 2 780 B (gzip 789 → 685);
    - inline SVG 29 418 → 29 342 B (generátor už byl kompaktní).
- **Vzhled SVG:** stránky jsem vykreslil před minifikací a po ní a porovnal po pixelech:
  - rozdíly jsou jen v antialiasingu na ≤ 62 px na stránku;
  - ve výřezech 3× nejsou vidět.
- **Smazané soubory:** `kontakt-duo-lt-640.webp` a `kontakt-duo-lt-1024.webp`. Nic jiného nebylo bez odkazu (kontrola zahrnuje i `porovnani.html`).

### Bajty obrázků na stránku
Měřeno po proscrollování celé stránky, bez cache. Desktop 1440 × 900, mobil 390 × 844 @2×. Číslo v závorce je WebP záloha pro prohlížeče bez AVIF, dopočtená z velikostí souborů.

| Stránka | Desktop před | Desktop po | Mobil před | Mobil po |
|---|---|---|---|---|
| Domů | 220,7 kB | **106,1** (165,1) | 161,1 | **89,3** (122,2) |
| Služby | 121,8 | **58,5** (88,6) | 76,1 | **31,5** (47,2) |
| Laserové řezání | 22,7 | **12,1** (16,2) | 28,6 | **16,1** (22,2) |
| Materiály | 27,3 | **14,5** (18,0) | 27,3 | **14,5** (18,0) |
| O nás | 63,3 | **45,0** (53,2) | 83,2 | **57,0** (72,0) |
| Kontakt | 32,6 | **15,3** (19,7) | 32,6 | **15,3** (19,7) |
| Ochrana soukromí | 59,4 | **21,6** (32,2) | 59,4 | **21,6** (32,2) |

Celkový přenos Domů klesl z 315,5 na 201,5 kB (desktop) a z 255,9 na 184,6 kB (mobil).

O nás je i přes novou fotku lehčí. Pomohla loga, protože kepr je přirozeně „těžší“ než dřívější hladký duotón.

Složka `v2/assets/img` naopak narostla z 615 na 939 kB, protože v repu jsou oba formáty.

## 3. Ověření

- **Snímky:** všech 7 stránek, desktop i mobil, dlaždice i celé stránky v `shots/r7-impl/`. Služby jsem nasnímal znovu po posunu štítků.
- **Výřezy 2×** jsou v `shots/r7-impl/zoom/`:
  - `spot-tkani`, `spot-snovani`, `dia-snovani` a `dia-snovani-320`;
  - `sym-*-heading`;
  - vzorníky na desktopu i mobilu;
  - karty na mobilu, `snovani-mobile` a `steps-desktop`.

  Kritický pohled:
  - **dia-snovani:** nitě shora na vál jsou zřetelné, boční pohled čte jako „kotouč + pás po tečně“;
  - **symboly:** v 40 px jsou čitelné;
  - **vzorníky:** čtou jako látka;
  - **štítek „zepředu“:** se na desktopu křížil s první nití; opravil jsem to (bod 4.3).
- **Hlavička** (`checks/header-*.png`, `shot/r7-header.mjs`):

  | Šířka | Logo → menu | Menu → telefon | Telefon → CTA | 1 řádek |
  |---|---|---|---|---|
  | 1024 | 75 px | 32 px | 12 px | ano |
  | 1100 | 151 | 32 | 12 | ano |
  | 1199 | 250 | 32 | 12 | ano |
  | 1200 | 223 | 32 | 16 | ano |
  | 1280 | 110 | 32 | 16 | ano |
  | 1440 | 110 | 32 | 16 | ano |
  | 1920 | 110 | 32 | 16 | ano |

  Při 961 a 1023 px je hamburger a nic nepřetéká.
- **Akceptace** (`shot/r7-impl-check.mjs`, výstup v `checks/`):
  - 320 / 390 / 768 / 1024 / 1440 / 1920 px: konzole čistá, žádná 404, žádné vodorovné přetečení, 1× H1, `noindex` i `aria-hidden` u grafik v pořádku;
  - omezený pohyb: 0 animací, 0 transformací, vše nakreslené;
  - bez JS: obsah viditelný, grafiky nakreslené, formulář nativní;
  - formulář „Jiné“: nápověda, `aria-describedby`, Tab a payload jsou v pořádku; s podvrženou odpovědí, nic se neodeslalo.
- **Kreslení** (`shot/r7-drawcheck.mjs`, `checks/draw-*.png`):
  - všechny akcentní cesty začínají nahoře: diagram y 20 → 106 a pás 20 → 214, spot snování 6 → 54, útek tkaní 36 → 84;
  - po 450 ms jsou v půlce, na konci mají offset 0 a třídu `is-drawn`;
  - bez chyb.
- **Tahy** (`r5-stroke.mjs`, 768–1920 px): 1,5–2 px.
- **Výška Služeb na mobilu:** 5 424 px (dřív 5 375; +49 px kvůli širšímu diagramu, schválené).
- **LCP Domů** (pomalé 4G + CPU 4×, medián 6 běhů):

  | Varianta | Mobil | Desktop |
  |---|---|---|
  | AVIF (dnes) | 1 240 ms | 1 636 ms |
  | Nové WebP | 1 588 ms | 1 608 ms |
  | Staré WebP | 1 632 ms | 1 632 ms |

  Na mobilu je to −24 %, na desktopu beze změny v rámci rozptylu. Staré soubory byly kvůli férovému měření dočasně ve `v2/assets/img/_r6tmp/`; po měření jsem složku smazal.
- **CLS:** 0–0,0005.

## 4. Odchylky od zadání

1. **R7-01, vodič nití:** lišta je kreslená plně a nitě jsou pod ní přerušené (mezera 3), tedy lišta je „před“ nitěmi. Při opačném pořadí (nitě přes lištu, lišta přerušená) vypadala lišta ve 40–100 px jako čárkovaná.
2. **R7-02, visačka:** štítek má 30 × 16 jednotek (`x 66–96`, `y 26–42`) místo 22 × 12 a dírku nahoře uprostřed (81, 29). Do 22 jednotek se „PES“ v 11 px nevešlo vedle dírky. Provázek vede `M75 19L81 27`.
3. **R7-01, štítky „zepředu“ / „z boku“:** jsou nahoře nad konci nití (`top: 0`, posun −30 % / na mobilu −50 %), ne pod pohledy. Pod pohledy jsou kóty a nevešly by se tam. Měřená mezera k nitím je 5 px při 320 px, 8 px při 390 a 10 px a více od 768 px.
4. **R7-04, kvalita:** `onas-twill-720.webp` má q75 (58 kB) místo q80 (68 kB). Ve výřezu 1 : 1 jsem mezi q75 a q80 nenašel rozdíl (SSIM 0,983 a 0,989). Při q80 by AVIF neušetřil 15 % a nevznikl by. Pokud chceš q80, je to jedna hodnota v `imgtools/encode.mjs`.

## 5. Otevřené otázky

1. **Loga klientů a logo webu** jsem převedl na paletu a bezeztrátový WebP (−30 kB na Domů a O nás). Zadání to výslovně nežádalo, ale spadá to pod „optimalizaci obrázků“. Vzhled se nezměnil: odchylka proti předloze je menší než dřív. Prosím o potvrzení.
2. **Lokální server neposílá u `.avif` `Content-Type`.** Prohlížeč obrázky přesto zobrazí a měření jsem kvůli tomu počítal podle přípony. GitHub Pages posílá `image/avif`, ale po nasazení stojí za to ověřit jednu stránku v DevTools.
3. **SVG** by šlo zmenšit ještě o zhruba 15–20 % převodem cest na relativní příkazy. Po gzipu by to bylo jen asi 1–2 kB na stránku, a protože hrozí rozbití kreslení (`pathLength`, nulové segmenty s kulatým koncem), nedělal jsem to.
4. **Hero na mobilu** při `object-fit: cover` a vysoké hlavičce zobrazuje obrázek zvětšený (`sizes` odpovídá šířce prvku, jak zadání chce). Pod překryvem .86 to není vidět. Jen pro úplnost.

## Soubory a skripty
- **Generátory (scratchpad):** `imgtools/masters.py`, `imgtools/encode.mjs`, `imgtools/logos.mjs`, `imgtools/evalq.mjs`, `imgtools/cmp.mjs`, `r4/illus.py` (zálohy `illus.r5.bak` a `illus.r7pre-min.bak`).
- **Zálohy obrázků z kola 6:** `imgtools/backup-r6/`.
- **Kontroly (`shot/`):** `r7-sizes.mjs`, `r7-imgbytes.mjs` (výsledky `r4/r7-imgbytes-before.txt` a `-after.txt`), `r7-svgdiff.mjs`, `r7-rendercmp.mjs`, `r7-rendercrop.mjs`, `r7-header.mjs`, `r7-zoom.mjs`, `r7-zoom1.mjs`, `r7-drawcheck.mjs`, `r7-impl-check.mjs`, `r7-perf.mjs`, `r7-lcp-ab.mjs`.

---

# Kolo 8 – implementace (R8-01 až R8-04)

Pravidla zůstala stejná: měnil jsem jen `v2/` (sprite `illustrations.svg` z `r4/illus.py` a `style.css`), stránky přes `build.mjs`, s gitem jsem nepracoval a `porovnani.html` je nedotčený. Výřezy jsou v `shots/r8-impl/`.

## Stav bodů

| Bod | Stav | Co jsem udělal |
|---|---|---|
| R8-01 Vzorníky | hotovo, s odchylkou | **Šátek zvednutý za jeden bod:** kroužek, nařasené „hrdlo“, boky se rozevírají, dole visí cípy do špiček a lem se mezi nimi zvedá v měkkých obloucích. Tři hlavní záhyby vedou z bodu k lemu, na desktopu je navíc vedlejší záhyb a úzké stínové klíny podél záhybů (`--ill-fill`). Mřížka, tyčka ani rovné boky nejsou. **Akcent:** PES levý záhyb, PA prostřední, PP pravý, bavlna prostřední + tobolka na visačce. **Mobil (48 px):** stínování a vedlejší záhyb se skryjí přes `--sw-detail: 0` (vlastní vlastnost projde do `<use>`); zůstane silueta, 3 záhyby a visačka. **Visačka:** dírka vlevo, text vpravo od ní (HTML, 11 px, na mobilu skrytý). Vůle textu „PES“: 1,8 px k dírce, 1,9 px k pravému okraji, 1,5 px nahoře i dole (měřeno `shot/r8-tag.mjs`). |
| R8-02 `sym-snovani` | hotovo | Pohled zepředu: dvě čela, návin se 3 navinutými nitěmi, 3 nitě shora (akcent), 5 cest. Odchylka: čepy jsou zkrácené z 5 na 3 jednotky, protože s dlouhými četl symbol ve 24–32 px jako činka. Platí všude, kde je `sym-snovani`: nadpis Snování na Službách a mobilní karta na Domů. |
| R8-03 `sym-tkani` | hotovo | 3 rovné osnovy, 2 řady útku spojené jednou otočkou vpravo r 6, levé konce volné, mezery na kříženích. Odchylka: osnova je na x 12/22/32 (místo 14/24/34) a mezera útku 4 (místo 4,5). Jinak by u otočky zbyly 1,5jednotkové pahýly, které v malé velikosti četly jako čárky. Kompozice je teď na středu (x 4–46). Změnil se s ním i piktogram kroku „Snování a tkaní“. |
| R8-04 Motiv na O nás | hotovo | V jednom sloupci (< 1024 px) má motiv `top: -32px`. Kresba začíná 11 px pod perexem (14 px při 768–1023) a přesahuje jen ~20 px nad horní hranu fotky. Laser se tím také posunul, ale tam se nic nekřížilo ani předtím. Desktop je beze změny. |

## Iterace vzorníku (R8-01)
Varianty jsou v `r4/swtest.py`, náhled `shots/r8-impl/swtest.png`.

| Varianta | Jak četla |
|---|---|
| A – geometrie ze zadání doslova | Kužel s rovnými boky a záhyby jako tyče: stan nebo čepice. |
| B / C / F – zvon s vlnitým lemem (+ nařasení, rub látky v lemu) | Sukně, zvon nebo medúza. Detaily rubu nejsou v 96 px vidět. |
| D – hladký kužel | Stan. |
| **E → H – šátek zvednutý za střed s cípy dole** | **Jednoznačně kus látky** v 96 i 48 px. Cípy visící do špiček jsou signál, který papír, stan ani zvon nemají. |

U H jsem stínování nejdřív kreslil jako celé boční plochy (G). Splývaly ale s podkladem okna, protože ten má stejný tón, a obrys pak vypadal tenčí. Proto jsou z toho úzké klíny podél záhybů a obrys látky se kreslí ještě jednou navrch.

Kontrolní otázka „je to kus látky?“: ano, v obou velikostech.

## Ověření
- **Výřezy (`shots/r8-impl/`):**
  - `compare-2x.png` a `compare-1x.png`: kolo 7 vedle kola 8; vzorníky 96 a 48 px; symboly v 24 / 32 / 40 / 48 px na modrém i bílém podkladu;
  - `swatches-desktop.png`, `swatches-mobile.png`, `zoom-pes-desktop-mobile.png`;
  - `home-cards-mobile.png`, `sym-*-heading*.png`, `steps-desktop.png`;
  - `symtest-*.png`: varianty čepů a útku.
- **Snímky stránek:** Domů, Materiály, Služby a O nás, desktop i mobil (`*-desktop-*.png`, `*-mobile-*.png`, `-full`).
- **Kontroly (`checks/`):**
  - konzole a 404: 7 stránek × 320 / 390 / 768 / 1024 / 1440 / 1920 px bez chyb a bez vodorovného přetečení;
  - omezený pohyb: 0 animací, vše nakreslené;
  - bez JS: vše vidět;
  - formulář „Jiné“: v pořádku (s podvrženou odpovědí).
- **Kreslení:** spoty i diagram snování se dál kreslí shora dolů a končí s `is-drawn` a offsetem 0, bez chyb. Vzorníky a symboly jsou statický sprite a nekreslí se, stejně jako dosud.
- **Sprite:** 15 089 → 16 436 B (gzip 3 485 → 3 560 B), protože vzorník má víc ploch.

---

# Kolo 9 – implementace (R9-01 + pravidlo pro `sym-snovani`)

Pravidla zůstala stejná. Měnil jsem jen `v2/`:
- sprite `illustrations.svg` z `r4/illus.py`;
- `style.css`;
- v `build/pages/index.html` a `materialy.html` přibyl štítek „CO“ u bavlny.

Stránky jdou přes `build.mjs`, s gitem jsem nepracoval a `porovnani.html` je nedotčený. Výstupy jsou v `shots/r9-impl/`.

## R9-01 – vzorník jako role látky

**Výsledek:**
- **Role:** dlouhá štíhlá role látky v perspektivě; osa ubíhá doprava nahoru o 18°, přední čelo je elipsa se spirálou vrstev.
- **Splývající konec:** z role splývá látka s vlnícími se boky, měkkým záhybem a lemem ze tří velkých vln (amplituda 6).
- **Akcent:** tkaný pruh obíhá roli (oblouk po plášti) a pokračuje po splývající látce až k lemu. Poloha pruhu se liší podle materiálu (PES 0,66 / PA 0,735 / CO 0,81 / PP 0,885 délky role).
- **Desktop – etiketa:** etiketa 32 × 14 se stehy je všitá vlevo dole na látce a natočená −18° stejně jako látka.
  - Text PES / PA / PP / CO je HTML v 11 px.
  - Vůle textu ke stehům je 1,5 px a text je na středu (měřeno `shot/r9-tag.mjs`).
  - „CO“ nahradilo tobolku.
- **Mobil (48 px):** etiketa ani text se nekreslí vůbec (`--sw-tag: 0`), takže žádný prázdný rámeček. Skrytý je i stín pod rolí a náznak útku (`--sw-detail: 0`). Zůstane role, splývající látka, záhyb a pruh.
- **Použití:** platí všude, kde jsou vzorníky: Materiály a sekce Materiály na Domů, desktop i mobil.

**Iterace** (`iter/`, ikona sama bez textu v 96 a 48 px, 1× i 2×):

| Varianta | Jak četla „za studena“ |
|---|---|
| R1 – zadání doslova (role nahoře, látka visí a rozlévá se dopředu) | Košíček na muffin nebo sukně. Symetrické rozšíření s drobnými vlnkami lemu je „plisé“. |
| R2 / R3 – látka jako lichoběžník pod rolí | Stínidlo lampy, příčné vlnky jako linkovaný papír. |
| R5 – R1 s velkými vlnami a záhyby | Pořád sukně nebo muffin. Problém je čelní pohled, kde látka pod rolí v plné šíři tvoří symetrický „zvon“. |
| R4 / R7 – krátká tlustá role ve 3/4 pohledu, list rovně | Toaletní papír nebo papírová utěrka. |
| **R8 → R9 – dlouhá štíhlá role (balík) ve 3/4, látka splývá v záhybech, velké vlny lemu** | **Role látky.** Poměr délky a průměru odliší balík od toaletního papíru. Měkké boky, záhyb a vlnitý lem odliší látku od papíru a rolety. Pruh přes roli i látku říká „tkanina“. |

**Odchylky od zadání:**
1. Perspektiva je silnější než „mírná“: osa ubíhá o 18° místo vodorovné osy. Ve vodorovném čelním pohledu jsem nenašel tvar, který by nečetl jako sukně nebo stínidlo.
2. Konec se „nerozlévá dopředu po podložce“, ale splývá v záhybech s vlnitým lemem. Rovně nevisí, takže nejde o roletu.
3. Etiketa má 32 × 14 místo 26 × 12, protože „PES“ v 11 px má 23 px. Je vlevo dole a pruhy jsou vpravo, aby je etiketa nikdy nekryla. Je natočená s látkou (−18°), ne o −4°.

**„Slepý test“:** s lidmi, kteří web neznají, ho udělat nemůžu. Nejbližší náhrada:
- ikona sama bez textu: `blind-96.png`, `blind-48.png` a jejich 2× verze, `blind-sheet.png`;
- sestava kolo 7 / 8 / 9: `compare-1x.png`, `compare-2x.png`.

Za studena čtu R9 jako roli látky, v 96 px jistě. V 48 px je to „role s látkou“; papírovou utěrku úplně vyloučit nedokážu, nadpis materiálu ale stojí hned vedle. **Doporučuji, aby orchestrátor nebo dva nezávislí lidé udělali skutečný slepý test na `blind-96.png` a `blind-48.png`.**

## `sym-snovani` – ne pod 32 px
Na všech 7 stránkách (+ `porovnani`) jsem změřil skutečnou velikost na šířkách 320–1920 px (`shot/r9-symsize.mjs`). Symbol se vykresluje jen ve **40 a 48 px**: nadpis Snování na Službách a mobilní karta na Domů. Pod 32 px se nikde nepoužívá, takže úprava nebyla potřeba. Pravidlo jsem zapsal do generátoru u `sym_snovani`.

## Ověření
- **Výřezy ze skutečných stránek:**
  - `pages-swatches-desktop.png` a `pages-swatches-mobile.png` (Materiály);
  - `pages-home-materials-*.png`;
  - `pages-sym-*`, `pages-home-cards-mobile.png`, `pages-steps-desktop.png`.
- **Konzole a 404:** 7 stránek × 390 / 1440 px a × 320 / 768 / 1024 / 1920 px (`checks/`) bez chyb a bez vodorovného přetečení.
- **Omezený pohyb:** 0 animací, vše nakreslené. Bez JS je vše vidět. Formulář „Jiné“ je v pořádku (s podvrženou odpovědí).
- **Kreslení:** diagram a spoty snování a tkaní se dál kreslí shora dolů a končí s `is-drawn` (`r9-drawcheck.mjs`). Vzorníky jsou statický sprite jako dosud.
- **Sprite:** 16 436 → 19 976 B (gzip 3 560 → 4 280 B). Vzorník má hladké křivky a jsou čtyři skoro stejné, gzip to z velké části srovná.

---

# Kolo 11 – implementace (AI obrázky, větev `v2-ai-foto`)

**Pravidla:**
- měnil jsem jen soubory ve `v2/`;
- zdroje v `scratchpad/ai-zdroje/` jsem jen četl;
- stránky jdou přes `build.mjs`;
- s gitem jsem nepracoval a `porovnani.html` je nedotčený (čas změny 10-14 14:07, nemá odkazy na obrázky).

**Skripty:**
- `imgtools/masters-r11.py`: předlohy podle výřezů;
- `imgtools/encode-r11.mjs`: WebP + AVIF;
- `imgtools/og-r11.mjs` a `shot/r11-og.mjs`: sdílecí obrázek;
- kontroly v `shot/r11-*.mjs`.

**Výstupy:** `shots/r11-impl/`.

**Pravidla pro AI obrázky:**
- všude `alt=""`, přirozené barvy, bez popisků a bez tvrzení o „naší výrobě“;
- u každého použití je komentář `<!-- ilustrační obrázek (AI), nejde o fotografii z výroby -->`: u fotek v HTML; u textur hlaviček v HTML Služeb a Ochrany a navíc v CSS; u `og:image` v `<head>` všech stránek;
- každý obrázek je jako fotka použitý jednou (hero, Materiály, O nás); textura a `og.jpg` jsou výjimky ze zadání.

## Stav bodů

| Bod | Stav | Co jsem udělal |
|---|---|---|
| R11-01 Hero Domů | hotovo, 1 odchylka | `hero-ai-1536/1200/960` (desktop) a výřez na výšku `hero-ai-m-768/540` (< 768 px přes `<source media>`). **Šíře > 1536 px:** fotka je ukotvená vpravo (`width: min(100%, 1536px)`), nezvětšuje se, plocha vlevo má `#010307` a od 1537 px se levých 12 % rozpouští maskou. **Ořez:** `object-position` 70 % / 40 % (≥ 1024 px), 75 % / 40 % (768–1023 px), 50 % / 30 % (mobil). **Překryv:** ≥ 1024 px vodorovný podle zadání (.60 → .50 při 45 % → .30 při 60 % → 0 při 75 %), < 768 px svislý podle zadání. Odchylka 768–1023 px viz bod 1 níže. `hero-settle` zůstal, parallax hero není. |
| R11-02 Materiály | hotovo | Dělená hlavička jako na Laseru a O nás: text vlevo, `ai-5` vpravo, motiv `weave-mark` za fotkou. **Desktop:** 4 : 3, max. 440 px, rámeček, `55% 50%`. **Mobil:** 16 : 9, max. 220 px, `50% 45%`. `fetchpriority="high"`. Textura `pouziti-duo-800` z hlavičky odpadla (pravidlo `.page-head--pouziti` je pryč); soubor zůstává, protože ho používá sekce Použití na Domů. |
| R11-03 O nás | hotovo | `ai-6` místo kepru: 4 : 3 do 440 px na desktopu, 16 : 9 do 220 px na mobilu, `50% 50%`. `onas-twill-*` (6 souborů) je smazané. |
| R11-04 Textura hlaviček | hotovo | `head-texture-ai-640` (výřez `x 700–1536`, `y 100–660`) má průhlednost .14 a masku jako dřív. **Smazané:** `hero-1200/800` a `head-texture-640` (WebP i AVIF). Ve v2 tak nezůstal nic ze starého `hero.webp`; kořenový `assets/img/hero.webp` je nedotčený. |
| R11-05 `og.jpg` | hotovo, 1 odchylka | Podklad: zdroj zmenšený na 1200 × 800, výřez `y 85–715`. **Text:** logo, eyebrow, H1 a fakta vlevo, bez překryvu (motiv `weave-mark` jsem vynechal). **Kontrast:** eyebrow 9,3 : 1, H1 5,6 : 1, fakta 10,3 : 1. **Velikost:** 86,5 kB; kvalita viz bod 2. |
| R11-06 Akceptace | hotovo | viz níže |

## Odchylky
1. **Hero 768–1023 px.** Text tu zabírá skoro celou šířku, takže vodorovný překryv ze zadání nechal perex nad světlou látkou bez překryvu. Naměřeno 0,77 : 1 při 768 px a 1,7–2,4 : 1 při 1024–1440 px. Zvednutí pásu 45–60 % o 0,1 na tento rozdíl nestačí, proto:
   - **768–1023 px:** zůstává svislý překryv jako na mobilu (fotka je tu tlumenější);
   - **≥ 1024 px:** překryv je přesně podle zadání a perex má `max-width: min(60ch, 80%)`, takže končí do 48–50 % šířky okna, kde je fotka sama tmavá. Nadpis je beze změny.

   Výsledek: perex má všude ≥ 9 : 1.
2. **`og.jpg`.** Zadání „mozjpeg q86 a ≤ 90 kB“ nejde splnit obojí: q86 dává 113 kB kvůli husté textuře. Přednost dostal rozpočet: q78 = 86,5 kB. Text je i ve výřezu 2× ostrý.
3. **Materiály a O nás.**
   - **Varianty 480w navíc:** desktop při DPR 1 zobrazuje 440 px a jinak by stahoval 640w.
   - **AVIF pevně q46:** AVIF podle SSIM by u 960w přesáhl rozpočet (88 / 93 kB). Výřez 2× proti předloze je bez viditelného rozdílu, jen nepatrně zjemněná vazba.
   - **WebP** zůstává q72 podle zadání.

## Velikosti souborů a rozpočty
AVIF kvalita a velikost:

| Soubor | WebP | AVIF | Rozpočet AVIF |
|---|---|---|---|
| hero-ai-1536 | 70,2 kB (q60) | 38,5 kB (q43) | ≤ 90 ✓ |
| hero-ai-1200 | 49,2 | 27,7 (q43) | ≤ 60 ✓ |
| hero-ai-960 | 35,5 | 21,6 (q44) | ≤ 40 ✓ |
| hero-ai-m-768 / 540 | 38,9 / 24,2 | 22,2 / 14,1 (q44) | ≤ 60 ✓ |
| materialy-role-960 / 640 / 480 / m-768 | 121,9 / 51,4 / 26,0 / 61,3 (q72) | 68,0 / 28,7 / 14,6 / 32,6 (q46) | 960 ≤ 70 ✓ |
| onas-latka-960 / 640 / 480 / m-768 | 127,6 / 68,2 / 39,9 / 69,5 (q72) | 73,9 / 42,7 / 25,4 / 43,9 (q46) | – |
| head-texture-ai-640 | 23,1 (q40) | 15,8 (q38) | – |
| og.jpg | – | – | 86,5 kB JPEG ≤ 90 ✓ |

Složka `v2/assets/img` má teď 1,85 MB. Narostla hlavně o WebP zálohy 960w, které stahují jen prohlížeče bez AVIF.

## Kontrast (nejsvětlejší pixel pod každým řádkem textu, `shot/r11-contrast.mjs`)

| Šířka | Eyebrow | H1 | Perex | „nebo zavolejte…“ |
|---|---|---|---|---|
| 390 | 9,45 | 19,75 | 11,92 | 11,93 |
| 768 | 9,45 | 19,33 | 9,03 | 11,65 |
| 1024 | 9,11 | 19,38 | 12,36 | 12,79 |
| 1280 | 9,28 | 19,47 | 12,61 | 12,81 |
| 1440 | 9,27 | 19,52 | 12,61 | 12,75 |
| 1920 | 9,43 | 19,61 | 12,62 | 12,82 |

Hlavičky podstránek na všech šesti šířkách:
- Materiály a O nás mají text vedle fotky: 8,1–20,3 : 1;
- Služby a Ochrana s novou texturou: nejhorší 5,22 : 1 (perex Služeb při 768 px).

## LCP a CLS (pomalé 4G + CPU 4×)
- **Rozhodující je měření střídavě A/B** (`shot/r11-lcp-ab.mjs`, 8 + 8 běhů). Stejná stránka, jen se střídá hero kola 10 a kola 11; soubory kola 10 byly dočasně ve `v2/assets/img/_r10tmp/` a po měření jsem složku smazal.
  - Mobil: 1 082 → 1 046 ms (**−3,3 %**).
  - Desktop: 1 316 → 1 320 ms (**+0,3 %**).
  - Limit +10 % je splněný.
- **Měření po sobě** stejným skriptem jako v kole 7: před 1 000 / 1 200 ms, po 1 316 / 1 364 ms. Rozptyl mezi běhy je tu ale 964–1 392 ms a stroj mezitím „driftoval“, proto platí střídavé A/B.
- **Proti číslům v zadání** (mobil 1 240, desktop 1 636 ms) jsou nové hodnoty v obou měřeních nižší.
- **CLS:** 0–0,0005 na Domů, Materiálech, O nás, Službách i Ochraně (`r11-perf.mjs`), limit 0,02.

## Bajty obrázků na stránku (před → po, kB)

| Stránka | Desktop | Mobil |
|---|---|---|
| Domů | 106,9 → **103,5** | 90,1 → **89,4** |
| Služby | 59,3 → 62,3 | 32,3 → 35,4 |
| Materiály | 15,3 → 24,3 | 15,3 → 42,3 |
| O nás | 45,8 → 49,6 | 57,8 → 68,2 |
| Ochrana soukromí | 22,4 → 25,4 | 22,4 → 25,4 |
| Laser, Kontakt | beze změny | beze změny |

Domů se nezvětšil, limit +30 kB je splněný. Materiály mají novou fotku místo nevýrazné textury.

## Kontroly
- **Odkazy:** žádný odkaz na smazaný soubor, žádný nepoužitý soubor (kontrola zahrnuje i `porovnani.html`). Audit `sizes` (7 stránek × 18 šířek) je bez neshod.
- **Regrese (`checks/`):**
  - 320 / 390 / 768 / 1024 / 1440 / 1920 px: konzole čistá, žádné 404, žádné vodorovné přetečení;
  - omezený pohyb: 0 animací, 0 transformací (`hero-settle` je vypnutý);
  - bez JS je vše vidět;
  - „Jiné“ funguje (s podvrženou odpovědí);
  - kreslení diagramů a spotů beze změny.
- **Snímky:**
  - všech 7 stránek desktop + mobil (`*-desktop-*`, `*-mobile-*`, `-full`);
  - `widths/`: Domů, Materiály, O nás, Služby a Ochrana na 320 / 390 / 768 / 1024 / 1440 / 1920 px (první obrazovka i celá stránka) a hero na 2560 px;
  - `before/`: Domů, Materiály a O nás před změnou.

## Pro majitele (volitelné, neprovedeno)
Krátká poznámka v Ochraně soukromí nebo v patičce, např. „Ilustrační obrázky na webu byly vytvořeny s pomocí AI.“ Je to rozhodnutí majitele, proto jsem ji nepřidal.
