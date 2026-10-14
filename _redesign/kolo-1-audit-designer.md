# Kolo 1 – designérský audit webu Bohemia Textil (v2 = původní stav)

Podklady: zdrojový kód všech 7 stránek v `v2/`, `style.css`, `site.js`, screenshoty `shots/v1/` a vlastní kontroly
v `shots/r1-review/` (320 / 768 / 1024 / 1920 px, otevřené mobilní menu, fokus ve formuláři, měření kontrastu).
Skripty: `shot/r1-audit.mjs`, `shot/r1-imgcontrast.mjs`, `shot/r1-tablet.mjs`.

---

## 1. Celkový dojem

Web působí moderně a „tmavě technicky“, ale je to převzatá šablona z Wixu: hodně atmosféry, málo informací.
Návštěvník z nákupu nebo vývoje se na první obrazovce dozví jen to, že jde o „spolehlivého výrobce technických
tkanin“. Klíčová fakta, podle kterých se rozhoduje (materiály, minimální zakázka 500 m, šíře snování 90–200 cm,
laser do 190 cm, od roku 1997, návazné služby), jsou rozházená po podstránkách, často v kartách s ručními
zalomeními `<br>` a velkými prázdnými plochami. Typografie trpí anglickým Title Case, překlepy („Pro Váš“,
„v česku“) a nekonzistencí („Bohemia Textil“ × „Bohemia Textile“, „Vy“ × „vy“, „25 let“ × „1997“).
Bílý text na světlých fotkách má v místech kontrast kolem 2 : 1. Konverzní cesta existuje (tlačítko „Chci Poptat“),
ale formulář je minimalistický, tlačítko pro odeslání je tmavé (sekundární) a telefon se na stránce Kontakt
objeví až v patičce. Fotky jsou obecné (část vypadá jako AI generovaná, `kontakt.webp` má v rohu vodoznak DALL·E),
takže důvěru zatím drží hlavně 4 loga odběratelů.

Potenciál je velký: faktů je na webu dost na přehledný, věcný B2B web. Chybí struktura, hierarchie a konzistence.

### Hodnocení (1–10)

| Oblast | Skóre | Hlavní důvod |
|---|---|---|
| Vizuální design a hierarchie | 5 | Pěkná atmosféra, ale šablonovité, nízká informační hustota, slogany místo obsahu |
| Typografie | 4 | Title Case, tenké nadpisy 400, zarovnání do bloku, ruční `<br>`, nekonzistentní velikosti |
| Barvy a kontrast | 4 | Text přes světlé fotky ~2 : 1, hover tlačítka 3,24 : 1, 4 různé tmavé odstíny bez systému |
| Layout a rozestupy | 4 | „Magická“ čísla z Wixu (233 px, 323 px…), mimostředové bloky, prázdné boxy |
| Navigace a IA | 5 | Jasné menu, ale nelepivá hlavička, v patičce chybí Laserové řezání, žádné křížové odkazy |
| Přehlednost / scannability | 4 | Fakta schovaná v odstavcích, materiály jako 4 nesrovnatelné seznamy |
| Informační hodnota | 3 | Nákupčí nezjistí rychle co, z čeho, v jakých šířích/množstvích a jak poptat |
| Důvěryhodnost | 4 | Loga OK; chybí reálné fotky, rozpor 25 let / 1997, © 2024, dvojí název firmy |
| Konverzní cesta | 4 | CTA jen nahoře a v patičce, slabý formulář, telefon na Kontaktu skrytý v patičce |
| Mobil | 5 | Bez přetečení i na 320 px, ale H1 na 5 řádků, kontrast přes fotky, malé odkazy v patičce |
| Přístupnost | 5 | Skip link, labely, `lang`, reduced motion OK; neviditelný fokus polí, menu bez focus trapu, nadpisy |
| Výkon a technické SEO | 6 | Lehký statický web; hero jako CSS pozadí (pozdní LCP), `position: fixed` pozadí, titulky „Domů \| …“ |
| Mikrocopy a čeština | 3 | Title Case, překlepy, chybné čárky, smíšené „Vy/vy“, „Email“, chybí nezlomitelné mezery |

---

## 2. Směr redesignu

**Princip:** „Fakta napřed.“ Věcný, přehledný B2B web, který během 10 sekund řekne: *vyrábíme technické tkaniny
na zakázku z PES/PA/PP/bavlny, od 500 m, s vlastním snováním, vývojem, úpravami a laserovým řezáním do 190 cm,
od roku 1997 – poptejte nás.* Atmosféra zůstává (tmavá navy hlavička, hero, patička, modrý akcent, modré
svislé „pruhy“ jako značkový motiv), ale obsahově husté části (služby, materiály, formulář) přejdou na světlé
plochy kvůli čitelnosti. Rytmus: **tmavá → světlá → bílá → tmavá → modrá CTA → tmavá patička**.

### 2.1 Paleta (CSS custom properties na `:root`)

| Token | Hex | Použití | Kontrast |
|---|---|---|---|
| `--navy-950` | `#00060f` | hlavička, hero, patička (současné `--bg`) | bílá 20,3 : 1 |
| `--navy-900` | `#0b1220` | tmavé sekce (loga, použití) | bílá 18,7 : 1 |
| `--navy-800` | `#151d2c` | karty na tmavém pozadí (nahrazuje šedofialové `#242834`) | bílá 16,9 : 1 |
| `--blue-500` | `#3a6afd` | **značková modrá** – pozadí primárních tlačítek, akcentní pruhy, ikony | bílá na ní 4,51 : 1 |
| `--blue-600` | `#2f5ae8` | hover primárního tlačítka, odkazy a eyebrow na světlém, pozadí CTA pásu | 5,6 : 1 na bílé |
| `--blue-300` | `#8fb0ff` | odkazy, eyebrow a fokus na tmavém | 9,5 : 1 na navy-950 |
| `--blue-50` | `#eef3ff` | podklad ikon a štítků na světlém | – |
| `--ink` | `#0b1220` | text na světlém | 17,3 : 1 na `#f4f6fa` |
| `--slate-600` | `#5a6478` | sekundární text na světlém | 5,5 : 1 na `#f4f6fa` |
| `--slate-300` | `#9aa4b8` | sekundární text na tmavém | 8,1 : 1 / 6,7 : 1 na navy-800 |
| `--text-on-dark` | `#c5cdda` | běžný text v tmavých kartách | 10,5 : 1 na navy-800 |
| `--surface` | `#f4f6fa` | světlé sekce | – |
| `--white` | `#ffffff` | karty, formulář | – |
| `--line` | `#dde2ec` | dekorativní linky a rámečky karet na světlém (ne pro ovládací prvky) | – |
| `--field-border` | `#7c8699` | rámeček inputů, selectů, checkboxů | 3,7 : 1 na bílé |
| `--line-dark` | `rgba(255,255,255,.10)` | linky na tmavém | – |
| `--error` | `#b42318` | chyby formuláře | 6,6 : 1 na bílé |
| `--success` | `#1e7f4f` | potvrzení odeslání | 5,0 : 1 na bílé |

Pravidla: modrou `#3a6afd` **nikdy** nezesvětlovat na hover (dnešní `#6188ff` dává s bílým textem jen 3,24 : 1);
hover = `--blue-600`. Modrý text na tmavých kartách jen jako `--blue-300`. `#242323` a `#242834` zrušit.

### 2.2 Typografie (Montserrat = nadpisy, Figtree = text; obě self-hosted, variabilní 400–700)

| Token | Velikost | Řádkování | Řez |
|---|---|---|---|
| `--fs-display` (H1 Domů) | `clamp(2.25rem, 1.5rem + 3.2vw, 4rem)` (36→64 px) | 1.08 | Montserrat 600, `letter-spacing: -0.015em`, max ~20ch |
| `--fs-h1` (H1 podstránek) | `clamp(2rem, 1.6rem + 1.8vw, 3rem)` (32→48 px) | 1.15 | Montserrat 600 |
| `--fs-h2` | `clamp(1.625rem, 1.35rem + 1.2vw, 2.25rem)` (26→36 px) | 1.2 | Montserrat 600 |
| `--fs-h3` | `1.25rem` (20 px) | 1.3 | Montserrat 600 |
| `--fs-stat` (čísla ve faktech) | `clamp(1.75rem, 1.4rem + 1.2vw, 2.5rem)` | 1.1 | Montserrat 600, `font-variant-numeric: tabular-nums` |
| `--fs-lead` | `clamp(1.0625rem, 1rem + .4vw, 1.25rem)` (17→20 px) | 1.55 | Figtree 400 |
| `--fs-body` | `1.0625rem` (17 px; pod 480 px 16 px) | 1.6 | Figtree 400 |
| `--fs-small` | `.875rem` (14 px) | 1.5 | Figtree 400/500 |
| `--fs-eyebrow` | `.8125rem` (13 px) | 1.2 | Montserrat 700, VELKÁ PÍSMENA, `letter-spacing: .08em` |

- Nadpisy `text-wrap: balance`, odstavce max. `65ch`, **žádné** `text-align: justify`.
- Zrušit všechna `<br class="d">` v textech; zalamovat šířkou kontejneru.
- Tučnost: nadpisy 600 (dnešní 400 působí křehce), štítky 700, text 400, tlačítka 600.

### 2.3 Mřížka a rozestupy

- Základní jednotka 8 px; škála `4, 8, 12, 16, 24, 32, 48, 64, 96, 128`.
- Kontejner `max-width: 1200px; padding-inline: clamp(16px, 4vw, 40px)`; úzký textový kontejner `760px`.
- Mřížka: CSS grid, 12 sloupců ≥ 1024 px; gap 32 px (desktop) / 24 px (tablet) / 16 px (mobil).
- Breakpointy: 480 / 768 / 1024 / 1280 px.
- Sekce: `padding-block: clamp(56px, 7vw, 112px)`; hlavička sekce → obsah 40 px (mobil 28 px).
- Radius: karty a panely 12 px, inputy 8 px, štítky 6 px, tlačítka 999 px (pilulka zůstává jako rys značky).
- Všechny dnešní pevné hodnoty (`padding-left: 233px`, `102px`, `min-height: 623px`, `padding-bottom: 323px`…) nahradit tokeny.

### 2.4 Komponenty

- **Hlavička (všechny stránky):** sticky, výška 72 px (mobil 64 px), pozadí `rgba(0,6,15,.94)` + `backdrop-filter: blur(8px)`,
  spodní linka `--line-dark`. Logo 168 × 55 px (mobil 128 × 42 px, vlevo – ne na středu). Odkazy Figtree 500 15–16 px,
  bílé 85 %, hover 100 %, aktivní stránka bílá + 2px modrá linka pod textem (`aria-current`). Vpravo telefon
  (ikona + „+420 603 216 998“, viditelný ≥ 1280 px) a primární tlačítko „Nezávazná poptávka“ (výška 44 px).
- **Tlačítka:** výška 48 px (v hero 56 px), `padding: 0 24px`, žádná pevná šířka, Figtree 600 16 px, volitelná ikona 18 px s mezerou 8 px.
  - primární: `--blue-500` → hover `--blue-600`, bílý text;
  - sekundární na tmavém: průhledné, rámeček 1.5 px `rgba(255,255,255,.4)`, hover pozadí `rgba(255,255,255,.08)`;
  - sekundární na světlém: rámeček 1.5 px `--ink` 25 %, text `--ink`;
  - textový odkaz se šipkou „→“ (např. „Více o službách →“);
  - na modrém CTA pásu: bílé tlačítko s textem `--ink`.
  - Fokus: `outline: 2px solid` (`--blue-300` na tmavém, `--blue-600` na světlém), `outline-offset: 3px`. Hover bez posunu nahoru.
- **Hlavička sekce:** eyebrow (modrý pruh 4 × 16 px + text VELKÝMI, `--blue-600`/`--blue-300`) → 12 px → H2 → 16 px → perex (max 60ch, `--slate-600`).
  Nahrazuje dnešní bílé „záložky“ (`.tab`), které působí jako ouška karet prohlížeče a rozbíjejí rytmus.
- **Karta (světlá):** bílá, rámeček 1 px `--line`, radius 12 px, padding 28 px (mobil 22 px), stín `0 1px 2px rgba(11,18,32,.04)`.
  Odkazová karta: celá klikatelná (roztažený odkaz `::after { inset: 0 }`), hover rámeček `--blue-600`, stín `0 8px 24px -12px rgba(11,18,32,.25)`,
  `translateY(-2px)`; fokus viditelný na celé kartě (`:focus-within`). Ikona v dlaždici 48 × 48 (`--blue-50`, ikona `--blue-600`).
- **Karta (tmavá):** `--navy-800`, rámeček `--line-dark`, text `--text-on-dark`, ikona v dlaždici `rgba(58,106,253,.16)` + `--blue-300`.
- **Faktová dlaždice:** svislý modrý pruh 4 px vlevo (pokračování dnešního motivu) + číslo `--fs-stat` + popisek 14 px `--slate-300`/`--slate-600`.
- **Štítek (chip):** výška 28 px, `padding: 0 10px`, radius 6 px, `--blue-50` + text `#1d3fb8` (na tmavém `rgba(143,176,255,.12)` + `#c5d5ff`).
- **Tabulka:** hlavička `--ink` na `--surface`, řádky 52 px, linky `--line`, první sloupec tučný, zvýraznění „nejvyšší/nejlepší“ štítkem.
- **CTA pás:** pozadí `--blue-600`, H2 bílý, perex bílý, bílé tlačítko + telefon/e-mail jako bílé odkazy. Na všech stránkách kromě Kontaktu.
- **Formulář:** viz R1-11.
- **Patička:** viz R1-17.
- **Ikony:** vlastní inline SVG, 24 px, `stroke-width: 1.75`, `stroke: currentColor`, zakulacené konce; jedna sada pro služby a použití.

### 2.5 Obrázky

- Všechny dostupné fotky jsou obecné textury / ilustrace (laser i `nabizime`/`pouziti` působí jako AI, `kontakt.webp` má vodoznak DALL·E vpravo dole).
  Používat je **jen jako atmosféru**, nikdy jako „důkaz“ (žádné popisky typu „náš stroj“).
- Text přes fotku vždy na překryvu: `linear-gradient(90deg, rgba(0,6,15,.92) 0%, rgba(0,6,15,.78) 45%, rgba(0,6,15,.35) 100%)`
  (na mobilu svislý gradient s min. 0.8 v oblasti textu). Cíl: ≥ 4,5 : 1 v nejsvětlejším místě pod textem.
- Zrušit „parallax“ (`position: fixed` pozadí) – trhá scrollování a na mobilu se stejně vypíná.
- Hero a obrázek na stránce Laser jako `<img>` (ne CSS pozadí) s `width/height`, `object-fit: cover`, dekorativní `alt=""`;
  hero `fetchpriority="high"`, ostatní `loading="lazy"`. Připravit varianty 800/1600 px ve WebP (`srcset`).
- `kontakt.webp` nepoužívat (nebo oříznout spodních ~30 px s vodoznakem). `nabizime.webp` a `pouziti.webp` nanejvýš jako texturu s opacitou 10–15 % na tmavé sekci.
- Loga odběratelů jsou světlá na průhledném pozadí → patří na tmavý pás (`--navy-900`), jednotná výška ~40 px, opacita .85, bez zvětšování na hover.

### 2.6 Pohyb

- Scroll reveal ponechat, ale zjemnit: posun 12 px, 450 ms, `ease-out`, stagger 60 ms, max. 4 prvky; jen hlavičky sekcí a karty.
- Zrušit `hero-zoom` a animaci celé hlavičky. Hover tlačítek bez `translateY`. `prefers-reduced-motion` zachovat.

### 2.7 Tón a jazykové konvence

- Věcný, sebevědomý, konkrétní. Čísla a fakta první, přívlastky až potom. Krátké věty. Žádné prázdné slogany
  („Spolehlivost je u nás na prvním místě“, „O nic se nestarejte“).
- **Oslovení: malé „vy/vás/váš“** všude (web není dopis konkrétní osobě; dnes je to napůl).
- **Název firmy: „Bohemia Textil“** (logo, doména, JSON-LD). „Bohemia Textile“ zrušit všude včetně `<title>`, `og:site_name` a patičky.
- **Velká písmena: větná** – „Laserové řezání textilií“, „O nás“, „Co pro vás můžeme udělat“.
- Číslo a jednotka nezlomitelnou mezerou (`500&nbsp;m`, `190&nbsp;cm`, `800&nbsp;mm`); rozsahy pomlčkou bez mezer (`90–200&nbsp;cm`);
  nezlomitelná mezera po jednopísmenných předložkách a spojkách (k, s, v, z, o, u, a, i) v nadpisech a perexech;
  telefon `+420&nbsp;603&nbsp;216&nbsp;998`; PSČ `565&nbsp;01`; uvozovky „ “; výpustka „…“; „e-mail“ (ne „Email“).
- Slovník CTA (jednotně na všech stránkách):
  - primární: **„Nezávazná poptávka“** (vede na `kontakt`), v hero může být „Nezávazně poptat“;
  - odeslání formuláře: **„Odeslat poptávku“**;
  - telefon: **„Zavolat +420 603 216 998“** (na mobilu ikona + „Zavolat“);
  - sekundární: „Přehled služeb“, „Porovnat materiály“, „Více o laserovém řezání“.

---

## 3. Informační architektura

Pouze fakta, která na webu už jsou. Každá stránka končí CTA pásem (kromě Kontaktu) a v patičce jsou kontakty.

### 3.1 Domů (`index`)

1. **Hero (tmavé, `hero.webp` s překryvem)**
   - eyebrow: „Český výrobce od roku 1997“
   - H1: **„Technické tkaniny na zakázku“**
   - perex: „Vyrábíme tkaniny z polyesteru, polyamidu, polypropylenu a bavlny. Zajistíme vše od vývoje a prototypu
     přes snování a tkaní až po barvení, další úpravy, laserové řezání a dopravu.“
   - tlačítka: „Nezávazně poptat“ (primární) + „Přehled služeb“ (sekundární); pod nimi odkaz „nebo zavolejte +420 603 216 998“.
2. **Faktový pás (4 dlaždice, spodní část hero nebo hned pod ním):**
   „PES · PA · PP · bavlna – materiály tkanin“ · „500 m – minimální zakázka tkaní“ · „90–200 cm – šíře osnovních válů“ · „190 cm – max. šíře pro laserové řezání“.
   (Popisky formulovat přesně takto, aby nevznikl dojem jiných parametrů – např. 90–200 cm není šíře tkaniny, ale osnovních válů.)
3. **Odběratelé (tmavý pás):** „Naše tkaniny využívají například“ + 4 loga.
4. **Služby (světlá sekce)** – eyebrow „Služby“, H2 „Co pro vás zajistíme“, 5 odkazových karet:
   Tkaní („Zakázková výroba technických tkanin, minimální zakázka 500 m.“) · Snování („Snování osnov na našem snovacím stroji, osnovní vály šíře 90–200 cm.“) ·
   Vývoj tkaniny („Navrhneme konstrukci, materiálové složení i finální úpravy nové tkaniny.“) ·
   Laserové řezání (širší karta s výřezem `laser.webp`: „Přesný řez bez roztřepených okrajů, textilie do šíře 190 cm.“ → `laserove-rezani`) ·
   Návazné služby („Barvení, optické zjasnění, zátěry a nánosy, doprava.“). Pod mřížkou „Přehled služeb →“.
   Tím se ruší samostatné sekce „Laserové řezání textilií“ a „Co nabízíme“ (jejich obsah je v kartách).
5. **Jak spolupráce probíhá (bílá sekce), 5 kroků:** Poptávka → Vývoj tkaniny (je-li potřeba) → Snování a tkaní → Úpravy a laserové řezání → Doprava k vám (texty viz R1-07).
6. **Materiály (světlá sekce):** 4 kompaktní karty (název + 2–3 štítky, viz R1-09) + „Porovnat materiály →“.
7. **Kde se naše tkaniny používají (tmavá sekce):** 7 dlaždic s ikonami + 8. dlaždice „Máte jiné použití? Zeptejte se nás →“ (`kontakt`).
8. **Proč Bohemia Textil (bílá):** 3–4 hodnoty z O nás (termíny, přístup, vše z jedné ruky, česká výroba od 1997) + „Více o nás →“.
9. **CTA pás**, 10. patička.

### 3.2 Služby (`sluzby`)

1. Hlavička stránky (tmavá, kompaktní): eyebrow „Služby“, H1 „Co pro vás můžeme udělat“, perex „Tkaní na zakázku, snování osnov,
   vývoj nových tkanin, laserové řezání a návazné úpravy – vše na jednom místě.“; pod tím kotvy-štítky na sekce.
2. Bloky služeb (světlá; `id="tkani"`, `"snovani"`, `"vyvoj"`, `"laser"`, `"navazne"`), každý: ikona + H2 + odstavec vlevo, box „Parametry“ (`<dl>`) vpravo:
   - **Tkaní:** „Výroba tkanin je naší hlavní činností. Věnujeme se převážně zakázkové výrobě.“ – Parametry: Minimální zakázka 500 m · Materiály PES, PA, PP, bavlna (odkaz na Materiály).
   - **Snování:** „Nabízíme snování osnov na našem snovacím stroji.“ – Parametry: Šíře osnovních válů 90–200 cm · Průměr čel osnovních válů do 800 mm.
   - **Vývoj tkaniny:** „Pokud potřebujete zcela nový typ tkaniny, navrhneme konstrukci, materiálové složení i finální úpravy.“
   - **Laserové řezání:** 1–2 věty + „Šíře textilie do 190 cm“ + „Více o laserovém řezání →“.
   - **Návazné služby:** „Dále pro vás zajistíme:“ + 4 štítky/ikonové položky Doprava · Optické zjasnění · Barvení · Zátěry a nánosy.
3. Jak spolupráce probíhá (stejná komponenta jako na Domů).
4. CTA pás.

### 3.3 Laserové řezání (`laserove-rezani`)

1. Hlavička stránky dělená: vlevo eyebrow „Služby“, H1 „Laserové řezání textilií“, perex „Laserem řežeme textilie do šíře 190 cm –
   přesně, čistě a bez roztřepených okrajů. Zvládneme i složité tvary a jemné detaily.“, tlačítka „Nezávazná poptávka“ + telefon;
   vpravo `laser.webp` (radius 12 px, `object-fit: cover`, poměr 4 : 3, `alt=""`).
2. Faktová lišta: „190 cm – max. šíře textilie“ · „bez kontaktu s materiálem“ · „složité tvary i jemné detaily“.
3. Výhody (4 karty, stávající ikony): Šíře textilie do 190 cm · Čistý řez bez roztřepených okrajů (sloučit dnešní šedý box + „Bezpečnost a šetrnost“) ·
   Složité tvary a personalizace · Méně odpadu a úspora energie.
4. Jaké materiály řežeme (4 karty): Syntetické textilie · Přírodní textilie · Papír a karton · Další materiály (seznam jako štítky).
5. CTA pás: „Potřebujete něco vyřezat? Popište nám materiál a tvar, rádi vám pomůžeme najít ideální řešení.“

### 3.4 Materiály (`materialy`)

1. Hlavička: eyebrow „Materiály“, H1 „Z jakých materiálů tkáme“, perex „Vyrábíme tkaniny z polyesteru, polyamidu, polypropylenu a bavlny.
   Přehled vlastností vám pomůže vybrat vhodný materiál.“
2. 4 karty materiálů se štítky (rychlý přehled; na mobilu hlavní forma).
3. Srovnávací tabulka vlastností (viz R1-09).
4. Box „Nevíte, který materiál zvolit? Navrhneme materiálové složení i konstrukci tkaniny na míru.“ + tlačítko.
5. CTA pás.

### 3.5 O nás (`o-nas`)

1. Hlavička: eyebrow „O nás“, H1 „Navazujeme na tradici české výroby tkanin“, perex „Od roku 1997 si budujeme pověst spolehlivého dodavatele kvalitního zboží.“
2. Dvousloupec: vlevo text (2 krátké odstavce z dnešního obsahu, opravená čeština), vpravo karta „V kostce“
   (Od roku 1997 · Sídlo: Skořenice 134, 565 01 Choceň · Materiály: polyester, polyamid, polypropylen, bavlna ·
   Služby: vývoj, snování, tkaní, úpravy, laserové řezání, doprava · Kontakt: Ing. Václav Štancl, telefon, e-mail · IČ, DIČ).
3. Hodnoty (3 karty): „Dodací termíny dodržujeme“ („Dodací termíny jsou pro nás svaté a pro jejich dodržení děláme maximum.“) ·
   „Přátelský přístup“ („Setkáte se u nás s přátelským přístupem a vstřícným jednáním.“) · „Vše z jedné ruky“ („Od vývoje tkaniny přes finální úpravy až po dopravu.“).
4. Loga odběratelů. 5. CTA pás.

### 3.6 Kontakt (`kontakt`)

1. Hlavička: H1 „Kontakt a poptávka“, perex „Napište nám, co potřebujete vyrobit, nebo zavolejte. V blízké době se vám ozveme.“
   Na mobilu hned pod perexem dvě tlačítka vedle sebe: „Zavolat“ (`tel:`) a „Napsat e-mail“ (`mailto:`).
2. Dvousloupec (světlá sekce): vlevo (7/12) formulář v bílé kartě; vpravo (5/12) kontaktní karta (osoba, telefon velkým písmem, e-mail, adresa,
   IČ/DIČ) a pod ní box „Co do poptávky napsat“ (materiál, použití, šíře, množství – u tkaní min. 500 m, požadované úpravy, termín).
   Na mobilu pořadí: rychlá tlačítka → formulář → kontaktní karta.
3. Bez CTA pásu a bez fotografie na pozadí.

### 3.7 Ochrana soukromí (`ochrana-soukromi`)

Jen layout: hlavička stránky (H1 stejného stylu jako ostatní podstránky, ne 56 px na střed), text v úzkém kontejneru 760 px,
H2 skutečně jako nadpisy (dnes `font: inherit` → vypadají jako běžný text), seznam s odsazením, normální rozestupy. Obsah beze změn (viz seznam pro majitele).

---

## 4. Seznam úprav

### R1-01 · P1 · Globálně – nový základ CSS (tokeny, mřížka, typografie)
- **Problém:** `style.css` je „věrná kopie Wixu“ – desítky pevných hodnot (`padding: 99px 0 75px 233px`, `margin-top: 106px`,
  `min-height: 623px`, `padding-bottom: 323px`), 4 nesourodé tmavé barvy, nadpisy řezem 400, `<br class="d">` v textech.
- **Proč:** bez systému nevznikne konzistentní vzhled napříč 7 stránkami a každá další úprava bude „na pixel“.
- **Doporučení:** přepsat CSS na tokeny z kap. 2 (barvy, `--fs-*`, `--space-*`, `--radius-*`, kontejner, breakpointy),
  komponenty jako třídy (`.btn`, `.btn--primary/--secondary/--on-dark/--on-blue`, `.section`, `.section--dark/--light/--white`,
  `.section-head`, `.eyebrow`, `.card`, `.card--link`, `.fact`, `.chip`, `.cta-band`, `.page-head`). Smazat všechna `br.d`.
  Přidat `:root { color-scheme: dark light }` a pro světlé sekce `color-scheme: light` (nativní prvky formuláře).
- **Hotovo, když:** v CSS nejsou pevné „wixové“ odsazení, všechny barvy jdou přes proměnné a stránky mají stejný vertikální rytmus.

### R1-02 · P1 · Všechny stránky – hlavička a mobilní menu
- **Problém:** hlavička je `position: absolute` – po odscrollování zmizí i s tlačítkem poptávky (na stránce Domů je 3 900 px dlouhá).
  Na mobilu je logo na středu a vpravo burger, telefon nikde. Otevřené menu nemá focus trap: Tab po „Chci Poptat“ odchází do
  skryté stránky (ověřeno: burger → hero tlačítka → patička). Menu neobsahuje telefon ani e-mail. „O Nás“ v Title Case.
- **Proč:** B2B návštěvník čte dlouho a CTA/telefon musí mít stále po ruce; nedostupné menu z klávesnice je chyba WCAG 2.4.3.
- **Doporučení:**
  - sticky hlavička dle 2.4, na podstránkách bez `padding-top` hacků (`.page { padding-top }` nahradit normálním tokem);
    `html { scroll-padding-top: 88px }` kvůli kotvám.
  - Desktop ≥ 1280: logo · menu (Služby, Laserové řezání, Materiály, O nás, Kontakt; „Domů“ v desktopu skrýt – logo vede domů) · telefon · „Nezávazná poptávka“.
    961–1279: telefon jen ikonou (44 × 44, `aria-label="Zavolat +420 603 216 998"`).
  - ≤ 960: logo vlevo, vpravo ikona telefonu (44 × 44, `tel:`) a burger (44 × 44).
  - Overlay menu: horní řádek shodný s hlavičkou (logo + zavírací křížek na místě burgeru), odkazy zarovnané vlevo, Montserrat 600 22 px,
    řádky 56 px s linkami `--line-dark`, aktivní stránka s modrým pruhem vlevo; dole tlačítko „Nezávazná poptávka“ (plná šířka),
    pod ním telefon a e-mail s ikonami. Při otevření: `inert` na `main`, `footer` a ostatní prvky hlavičky (nebo cyklení Tabu uvnitř menu),
    zámek scrollu (už je), Esc zavírá (už je), po zavření fokus zpět na burger (už je), klik na odkaz menu zavírá.
- **Hotovo, když:** při scrollu je hlavička stále viditelná, Tab v otevřeném menu neopustí overlay, na mobilu je telefon na jeden tap.

### R1-03 · P1 · Domů – hero a faktový pás
- **Problém:** H1 „Jsme Váš Spolehlivý Výrobce Technických Tkanin“ (Title Case, obecné, na mobilu 5 řádků), perex bez tečky a s chybnou čárkou,
  4 „features“ jsou slogany bez informace („Přes dodací termíny u nás nejede vlak“) a rozpor „už 25 let“ × 1997. Hero má `min-height: 1059px`,
  takže faktový pás je na 1440 × 900 pod ohybem. Bílý perex přes fotku má v nejsvětlejších místech ~3 : 1.
- **Proč:** první obrazovka rozhoduje, zda nákupčí zůstane; musí vidět co, z čeho, kolik a jak poptat.
- **Doporučení:** obsah podle IA 3.1 (body 1–2). Layout desktop: `min-height: clamp(560px, 78vh, 760px)`, text v levých 7 sloupcích,
  překryv dle 2.5, faktový pás jako 4 sloupce na `--navy-900` hned pod textem (viditelný na 1440 × 900 i 1280 × 720).
  Mobil: H1 36–40 px (max 3 řádky), perex 17 px, tlačítka pod sebou na plnou šířku, telefonní odkaz pod nimi, fakta 2 × 2.
  Hero obrázek jako `<img fetchpriority="high">` (R1-19). Fakta: „PES · PA · PP · bavlna / materiály tkanin“, „500 m / minimální zakázka tkaní“,
  „90–200 cm / šíře osnovních válů“, „190 cm / max. šíře pro laserové řezání“ (rok 1997 nese eyebrow nad H1).
- **Hotovo, když:** na 1440 × 900 i 390 × 844 je nad ohybem H1, perex, primární CTA a aspoň začátek faktového pásu; nikde „25 let“.

### R1-04 · P1 · Domů – sekce Služby místo „Laserové řezání textilií“ + „Co nabízíme“
- **Problém:** dvě sekce s fotkou na celou šířku nesou jednu větu a jedno tlačítko; „O nic se nestarejte…“ ve 40 px přes světlou fotku
  (kontrast ve světlejších 15 % plochy ~2,2 : 1). Služby nejsou na úvodu vyjmenované vůbec (snování, vývoj, úpravy chybí).
- **Proč:** přehled služeb je hlavní navigační uzel webu; dnes vede jen tlačítko „Služby“.
- **Doporučení:** jedna světlá sekce „Co pro vás zajistíme“ s 5 odkazovými kartami (texty v IA 3.1 bod 4).
  Mřížka ≥ 1024: řada 1 Tkaní, Snování, Vývoj tkaniny (3 × 4 sloupce); řada 2 Laserové řezání (8 sloupců, vlevo výřez `laser.webp`
  240 px široký, vpravo text) + Návazné služby (4 sloupce). 768–1023: 2 sloupce. < 768: 1 sloupec. Karty Tkaní/Snování/Vývoj/Návazné
  vedou na kotvy `sluzby#tkani` atd., Laser na `laserove-rezani`.

### R1-05 · P1 · Domů – „Kde se naše tkaniny používají“
- **Problém:** cenný seznam 7 použití je bílým textem přes světlou fotku (kontrast ~2,3–2,7 : 1 ve světlých místech, desktop i mobil),
  nadpis „Naše Tkaniny Se Používají“ v záložce na šedém pruhu `#242323`, který s ničím nesouvisí.
- **Proč:** použití je pro nákupčího nejrychlejší „poznávací znamení“ („ano, to je pro nás“).
- **Doporučení:** tmavá sekce `--navy-900` (fotka nanejvýš jako textura 10–15 %), eyebrow „Použití“, H2 „Kde se naše tkaniny používají“.
  8 dlaždic (tmavé karty, ikona 24 px + text 16–17 px, výška min. 96 px), 4 sloupce ≥ 1024, 2 sloupce 480–1023, 1 sloupec < 480:
  „Automobilový průmysl“ (dnes „V automotivu“) · „Filtrace plynů a kapalin“ · „Slunečníky“ · „Podkladové tkaniny pro zátěry a nánosy“ ·
  „Reklamní stánky a banery“ · „Batohy, brašny a zavazadla“ · „Malířská plátna“ · 8. dlaždice modře orámovaná „Máte jiné použití? Zeptejte se nás →“ (`kontakt`).

### R1-06 · P1 · Domů + O nás – loga odběratelů
- **Problém:** nadpis „Naše Tkaniny u Společností“ (neobratné, Title Case), bílá záložka, loga se na hover zvětšují (působí jako odkazy).
- **Proč:** jediný silný důkaz důvěryhodnosti na webu – má být hned pod hero a klidný.
- **Doporučení:** tmavý pás hned pod faktovým pásem; vlevo/nahoře malý popisek (eyebrow) „Naše tkaniny využívají například“, loga v řadě
  (4 sloupce ≥ 768, 2 × 2 na mobilu, ne 4 pod sebou po 110 px), výška 36–44 px, `opacity: .85`, bez hover efektu, bez rámečkové mřížky.
  Alt texty zachovat. Stejnou komponentu zopakovat na O nás.

### R1-07 · P1 · Domů + Služby – „Jak spolupráce probíhá“
- **Problém:** web nikde neříká, jak zakázka probíhá, i když to z obsahu vyplývá („od vývoje tkaniny, přes snování, tkaní, finální úpravy až po doručení“).
- **Proč:** snižuje nejistotu před první poptávkou a ukazuje rozsah „vše z jedné ruky“.
- **Doporučení:** 5 kroků vodorovně (≥ 1024; číslo v kroužku 40 px `--blue-500`, spojnice 2 px `--line`), na mobilu svisle s linkou vlevo:
  1. **Poptávka** – „Popíšete nám, jakou tkaninu potřebujete – telefonem, e-mailem nebo formulářem.“
  2. **Vývoj tkaniny** – „U zcela nového typu tkaniny navrhneme konstrukci, materiálové složení i finální úpravy.“
  3. **Snování a tkaní** – „Osnovy připravíme na našem snovacím stroji a tkaninu utkáme.“
  4. **Úpravy** – „Zajistíme barvení, optické zjasnění, zátěry a nánosy nebo laserové řezání.“
  5. **Doprava** – „Hotový produkt doručíme přímo do vaší společnosti.“
  Žádné lhůty ani počty dní (nejsou podložené).

### R1-08 · P1 · Služby – přestavba stránky
- **Problém:** H1 „Co Pro **Váš** Můžeme Udělat“ (překlep, má být „vás“), 4 karty s textem lámaným `<br>`, klíčová čísla ztracená v textu,
  laserové řezání na stránce Služby úplně chybí, žádné CTA, pod kartami 323 px prázdna.
- **Proč:** Služby jsou nejnavštěvovanější podstránka B2B webu; parametry musí jít přečíst očima během pár sekund.
- **Doporučení:** struktura dle IA 3.2. Blok služby: grid 7 + 5 sloupců; vpravo box „Parametry“ (`<dl>`, `--surface`, radius 12, popisek 14 px `--slate-600`,
  hodnota Montserrat 600 20 px). Návazné služby jako 4 položky s ikonami. Nad bloky „kotvové štítky“ (odkazy na `#tkani` …).
  Přidat Laserové řezání jako 5. službu. Na konec proces (R1-07) a CTA pás.

### R1-09 · P1 · Materiály – srovnávací tabulka
- **Problém:** 4 svislé seznamy v kartách s bílou záložkou; vlastnosti jsou ve stejném pořadí jen zčásti, takže je nelze porovnat;
  u polypropylenu je prázdné `<li></li>` (čtečka ohlásí prázdnou položku); text 14 px tučně velkými písmeny je těžko čitelný; žádné CTA.
- **Proč:** volba materiálu je typická otázka nákupčího/technologa; srovnání je přesně to, co od této stránky čeká.
- **Doporučení:**
  1. Karty materiálů (4 sloupce ≥ 1024, 2 ≥ 600, 1 pod tím): název (H2/H3) + štítky:
     Polyester – „vysoká pevnost“, „odolnost vůči kyselinám“, „levnější materiál“; Polyamid – „nejvyšší životnost“, „odolnost vůči zásadám“,
     „vysoká odolnost vůči slunečnímu záření“; Polypropylen – „nejlepší odolnost vůči kyselinám i zásadám“, „nízká hmotnost“, „levnější materiál“;
     Bavlna – „přírodní materiál“, „vysoká savost“, „snadné barvení“.
  2. Tabulka (`<table>` s `<caption>`, `<th scope>`), řádky = vlastnosti, sloupce = materiály; obsah **jen** z dnešních seznamů:

     | Vlastnost | Polyester | Polyamid | Polypropylen | Bavlna |
     |---|---|---|---|---|
     | Pevnost | vysoká | vysoká | vysoká | — |
     | Životnost | vysoká | **nejvyšší** | vysoká | — |
     | Mačkavost | nízká | nízká | nízká | — |
     | Chemická odolnost | vůči kyselinám | vůči zásadám | **nejlepší – vůči kyselinám i zásadám** | — |
     | Tepelná vodivost | nízká | vysoká | — | nízká |
     | Hmotnost | vyšší | vyšší | nízká | — |
     | Odolnost vůči slunečnímu záření | — | vysoká | — | — |
     | Cena | levnější | dražší | levnější | — |
     | Další vlastnosti | — | — | — | přírodní materiál, příjemný na omak, vysoká savost, snadné barvení |

     Poznámka pod tabulkou (14 px): „— = údaj neuvádíme. S výběrem materiálu vám rádi poradíme.“
     Zvýraznění „nejvyšší/nejlepší“ štítkem. Na < 768 px obal `<div class="table-scroll" role="region" aria-label="Srovnání materiálů" tabindex="0">`
     s `overflow-x: auto`, sticky prvním sloupcem, stínem na pravé hraně a nápovědou „Tabulku lze posunout do strany →“.
  3. Box „Nevíte, který materiál zvolit?“ + CTA pás (IA 3.4).

### R1-10 · P1 · Laserové řezání – přestavba stránky
- **Problém:** stránka nemá jediný obrázek (`laser.webp` se používá jen na Domů), úvod je obecná definice laseru v zarovnání do bloku,
  šedý box tučného centrovaného textu je těžko čitelný a obsahuje gramatickou chybu („nevznikají … mechanické poškození“),
  výhody s textem 16 px v úzkém sloupci, bílý CTA box na celou šířku „vyskočí“ ze stránky. Hlavní parametr (190 cm) je až uprostřed.
- **Proč:** laser je samostatná služba s vlastním publikem (i mimo tkaniny: papír, kůže, plexi, dýhy); stránka musí rychle prodat parametr a vést k poptávce.
- **Doporučení:** struktura dle IA 3.3. Oprava věty: „Na rozdíl od tradičních metod nevzniká na materiálu mechanické poškození, jako jsou roztřepené okraje, a řez je vždy přesný.“
  Výhody jako 4 karty v mřížce 2 × 2 (ikona v dlaždici 48 px, H3, text 17 px). Materiály jako 4 karty; „Další materiály“ jako štítky
  (Kůže a koženka · Filc a plsť · Akryláty a plexisklo · Dřevěné dýhy). Bílý `.cta-box` nahradit CTA pásem.

### R1-11 · P1 · Kontakt – stránka a formulář
- **Problém:**
  - Telefon a e-mail na stránce nejsou (jen věta „Nebo využijte kontaktních informací níže v patičce“ – bílý text přes fotku, místy ~1,8 : 1).
  - Pole 210 px široká jen se spodní linkou; fokus = změna barvy 1px linky (`outline: none`) → prakticky neviditelný (WCAG 2.4.7).
  - Label „Zanechte nám zprávu...“ (tři tečky, funguje jako placeholder), „Email *“ bez vysvětlení hvězdičky, „Jméno“.
  - Tlačítko „Odeslat“ je tmavé (sekundární vzhled) – hlavní konverzní akce webu.
  - Chybová hláška je nativní bublina prohlížeče (v anglickém prohlížeči anglicky), žádná inline chyba.
  - Formulář nevede k užitečné poptávce (chybí materiál, služba, množství).
- **Proč:** tohle je cílová stránka celého webu; každé tření tady stojí poptávky.
- **Doporučení:**
  - Layout dle IA 3.6, světlá sekce bez fotky.
  - Pole (každé s `name`, label nad polem 14 px 600, výška 48 px, rámeček 1 px `#7c8699` – 3,7 : 1 na bílé, WCAG 1.4.11 – radius 8, fokus `outline: 2px solid var(--blue-600); outline-offset: 1px`):
    1. „Jméno a příjmení“ (`name="Jméno"`, `autocomplete="name"`) | „Společnost“ (`name="Společnost"`, `autocomplete="organization"`)
    2. „E-mail“ + značka „povinné“ (`name="email"`, `type="email"`, `required`, `autocomplete="email"`) | „Telefon“ (`name="Telefon"`, `type="tel"`)
    3. `<fieldset>` „Co poptáváte“ – checkboxy `name="Služba"`: Tkaní na zakázku · Vývoj nové tkaniny · Snování · Laserové řezání · Návazné služby (barvení, úpravy, doprava)
    4. „Materiál“ `<select name="Materiál">`: Vyberte… / Polyester / Polyamid / Polypropylen / Bavlna / Jiný nebo zatím nevím | „Přibližné množství“ (`name="Množství"`, nápověda „Např. 1 500 m. Minimální zakázka tkaní je 500 m.“)
    5. „Popis poptávky“ (`name="Zpráva"`, `rows="6"`, `resize: vertical`, nápověda „Použití tkaniny, požadovaná šíře, úpravy, termín… Čím více víme, tím přesněji odpovíme.“)
    6. Pod tlačítkem 14 px: „Údaje použijeme pouze k vyřízení vaší poptávky. Více v [zásadách ochrany soukromí](ochrana-soukromi).“
  - Nápovědy přes `aria-describedby`. Úvodní řádek formuláře: „Pole označená jako povinná je nutné vyplnit.“
  - Tlačítko **primární** „Odeslat poptávku“ (na mobilu plná šířka). Stavy: odesílání – disabled + „Odesílám…“; úspěch – formulář nahradit panelem
    (ikona ✓ `--success`, H2 „Děkujeme, zpráva byla odeslána.“, text „V blízké době se vám ozveme. Pokud spěcháte, zavolejte na +420 603 216 998.“,
    `role="status"`, fokus na nadpis panelu); chyba – box `--error` s textem „Zprávu se nepodařilo odeslat. Napište nám prosím na
    [vaclav.stancl@tiscali.cz](mailto:…) nebo zavolejte na +420 603 216 998.“ (odkazy klikatelné).
  - Validace: `novalidate` na formuláři + vlastní kontrola v JS; u e-mailu inline chyba pod polem „Zadejte prosím platný e-mail, abychom vám mohli odpovědět.“,
    `aria-invalid="true"`, fokus na první chybné pole. (Bez JS zůstává nativní `required` – `novalidate` přidávat až skriptem.)
  - **JS oprava nutná kvůli checkboxům:** dnešní `data[key] = value` přepíše více hodnot stejného jména. Použít
    `data[key] = key in data ? data[key] + ', ' + value : value;`
  - Zachovat beze změny: `action`, `data-endpoint`, `_subject`, `_template`, `_captcha`, `_next`, `_honey`, návrat `?odeslano=1` (zobrazit úspěšný panel).

### R1-12 · P1 · Globálně – text přes fotografie (kontrast)
- **Problém (naměřeno ze screenshotů, bílý text vs. pozadí):** Co nabízíme – světlejších 15 % plochy 2,2–2,3 : 1; Použití 2,3–2,7 : 1;
  laser (mobil) 2,7 : 1; poznámka pod formulářem 1,8 : 1 v nejsvětlejších místech; perex hero ~3 : 1.
- **Proč:** WCAG 1.4.3 (4,5 : 1 pro běžný text); na slunci/na levném monitoru je text nečitelný.
- **Doporučení:** pravidla z 2.5: text přes fotku jen v hero/hlavičkách stránek a vždy na gradientu; žádný běžný text přes světlé fotky
  (`nabizime`, `pouziti`). Ověřit vzorkováním nejsvětlejšího místa pod textem (≥ 4,5 : 1).

### R1-13 · P1 · Globálně – čeština, typografie a konzistence názvů
- **Problém a oprava (minimálně tyto):**
  - Title Case všude → větná velká písmena: „Jsme Váš Spolehlivý…“, „Naše Tkaniny u Společností“, „Přesnost a Rychlost na Jednom Místě“, „Co Nabízíme“,
    „Naše Tkaniny Se Používají“, „Vývoj Tkaniny“, „Návazné Služby“, „Nabízíme Tkaniny z Těchto Materiálů“, „Kdo Jsme“, „Kontaktujte Nás“, „O Nás“, „Chci Poptat“.
  - „Co Pro **Váš** Můžeme Udělat“ → „Co pro vás můžeme udělat“.
  - „Výroba tkanin má v **česku** dlouholetou tradici a my na ni v roce 1997 navázali.“ → „Výroba tkanin má v Česku dlouholetou tradici a my jsme na ni v roce 1997 navázali.“
  - „od prototypu**,** přes řezání…“ (hero i meta description) a „vše od vývoje tkaniny**,** přes snování…“ → bez čárky před „přes“ (vazba od–přes–až po).
  - „nevznikají na materiálu mechanické poškození, jako jsou roztřepené okraje a řez…“ → viz R1-10.
  - „už 25 let“ → „od roku 1997“ (nikde nepočítat roky).
  - „Vy/Vás/Váš“ → malými písmeny všude (dnes Domů/Služby/O nás velkými, Laser malými).
  - „Email“ → „E-mail“; „Zanechte nám zprávu...“ → „Popis poptávky“; „Děkujeme za Váš zájem, v blízké době se Vám ozveme zpět“ → viz R1-11.
  - „V automotivu“ → „V automobilovém průmyslu“.
  - Název: „Bohemia Textile“ → „Bohemia Textil“ (titulky, `og:site_name`, patička).
  - PSČ „56501“ → „565 01“; „©Bohemia Textile 2024“ → viz R1-17.
  - Nezlomitelné mezery: čísla s jednotkami, telefon, „Ing.&nbsp;Václav“, jednopísmenné předložky/spojky v nadpisech a perexech
    (např. „Bezpečnost a šetrnost k&nbsp;materiálu“ se dnes láme za „k“).
  - Rozsahy pomlčkou: „90–200 cm“ místo „od 90 do 200 cm“ v parametrech (v běžné větě „od 90 do 200 cm“ smí zůstat).
- **Proč:** chyby v nadpisech podkopávají dojem preciznosti, který výrobce technických tkanin potřebuje.

### R1-14 · P1 · Globálně – přístupnost a stavy
- **Problém:** neviditelný fokus polí formuláře; hover tlačítka 3,24 : 1; slogany „Spolehlivost“ ap. jako `<h2>` (nadpisová osnova Domů:
  H1 → 4× H2 sloganů → H2 sekcí); prázdné `<li>`; odkazy v patičce na mobilu 19 px vysoké; skip link fontem Helvetica a barvou `#116dff` mimo systém.
- **Doporučení:**
  - Jednotný `:focus-visible` pro všechny interaktivní prvky (2.4), včetně karet, polí a odkazů v patičce.
  - Nadpisová osnova: jedna H1; sekce H2; karty H3; prvky faktového pásu nejsou nadpisy (`<dl>` nebo `<p>`); „Kontakt/Menu“ v patičce mohou zůstat H2.
  - Dotykové cíle ≥ 44 px (odkazy v patičce a v mobilním menu `min-height: 44px; display: flex; align-items: center`).
  - Skip link ve stylu webu (Figtree, `--navy-950` text na bílé, radius 8, viditelný při fokusu).
  - Odkazy otevírající `tel:`/`mailto:` s ikonou mají přístupný název („Zavolat +420 603 216 998“).
  - Ověřit axe/Lighthouse: 0 chyb kontrastu, 0 chybějících labelů.

### R1-15 · P1 · Všechny stránky (kromě Kontaktu) – CTA pás na konci obsahu
- **Problém:** Služby, Materiály a O nás končí bez výzvy k akci (jen tlačítko v patičce), Laser má bílý box mimo styl.
- **Doporučení:** komponenta `.cta-band` (`--blue-600`, padding 64/48 px, obsah ve 2 sloupcích ≥ 1024): vlevo H2 „Máte poptávku?“ +
  perex „Napište nám, jakou tkaninu potřebujete – materiál, použití, šíři a množství. Rádi vám pomůžeme najít ideální řešení.“;
  vpravo bílé tlačítko „Nezávazná poptávka“ a pod ním bílé odkazy „+420 603 216 998“ a „vaclav.stancl@tiscali.cz“.
  Na stránce Laser lze H2 upravit na „Potřebujete něco vyřezat?“, na Materiálech „Potřebujete poradit s výběrem materiálu?“.

### R1-16 · P2 · O nás – přestavba
- **Problém:** jediný šedý box s textem do bloku (řeky mezer), prázdných ~130 px uvnitř boxu, žádná fakta, fotky, loga ani CTA.
- **Doporučení:** struktura dle IA 3.5; text vlevo max 65ch, `text-align: left`; karta „V kostce“ jako `<dl>` na `--surface` s modrým pruhem;
  3 hodnotové karty; loga (R1-06); CTA pás. Věty zkrátit, „absolutní maximum“ → „maximum“.

### R1-17 · P2 · Všechny stránky – patička
- **Problém:** obsah posunutý doprava (`padding-left: 233px`), chybí odkaz na Laserové řezání, „©Bohemia Textile 2024“, „56501“, na mobilu vše na střed a malé cíle.
- **Doporučení:** `--navy-950`, 4 sloupce ≥ 1024 (2 × 2 na tabletu, 1 sloupec na mobilu, zarovnáno vlevo):
  1. logo + „Český výrobce technických tkanin od roku 1997.“ + tlačítko „Nezávazná poptávka“;
  2. „Kontakt“: Ing. Václav Štancl, telefon, e-mail, Skořenice 134, 565 01 Choceň;
  3. „Stránky“: Služby, Laserové řezání, Materiály, O nás, Kontakt;
  4. „Fakturační údaje“: IČ 64250938, DIČ CZ6710060258.
  Spodní lišta (linka `--line-dark`, 14 px `--slate-300`): „© 2026 Bohemia Textil · Ing. Václav Štancl“ vlevo, „Ochrana soukromí“ vpravo.
  Rok lze doplňovat skriptem (`<span data-year>2026</span>`), statická hodnota musí být správná i bez JS.

### R1-18 · P2 · Podstránky – jednotná hlavička stránky (`.page-head`)
- **Problém:** každá podstránka začíná jinak (H1 odsazený o 102 px, o 149 px, na střed 56 px…), pod H1 nic nebo obecná definice.
- **Doporučení:** komponenta na `--navy-950`: eyebrow (sekce) + H1 (`--fs-h1`) + perex (`--fs-lead`, max 60ch, `--slate-300`) + volitelně tlačítka nebo
  obrázek vpravo (Laser). Padding 64 px nahoře / 56 px dole (mobil 40/40). Volitelně jemná textura `hero.webp` s opacitou 8 %.
  Texty perexů viz IA 3.2–3.7.

### R1-19 · P2 · Obrázky a výkon
- **Problém:** hero je CSS pozadí (prohlížeč ho najde pozdě → horší LCP), `position: fixed` pozadí (repaint při scrollu), `hero.webp` má jen 1 200 px
  a na 1 920 px se zvětšuje, `kontakt.webp` (148 kB) s vodoznakem, `nabizime.webp` 132 kB jen jako pozadí.
- **Doporučení:** `<img>` s `width/height`, `srcset` 800w/1600w WebP (z existujících souborů), `sizes`, `fetchpriority="high"` pro hero, ostatní `loading="lazy" decoding="async"`;
  zrušit `.bg--fixed`; hero zobrazovat max. do 1 600 px šířky nebo s jemným rozmazáním/překryvem, aby nebylo vidět změkčení;
  nepoužité obrázky v `v2/` neodkazovat. Cíl: Lighthouse mobil Performance ≥ 90, CLS < 0,05, žádné chyby v konzoli.

### R1-20 · P2 · Technické SEO a provázání
- **Problém:** titulky „Domů | Bohemia Textile“ apod., nekonzistentní název, chybějící vnitřní odkazy mezi Službami, Materiály a Laserem.
- **Doporučení:**
  - `<title>`: Domů „Bohemia Textil – výrobce technických tkanin na zakázku, Choceň“; Služby „Služby – tkaní, snování a vývoj tkanin | Bohemia Textil“;
    Laser „Laserové řezání textilií do šíře 190 cm | Bohemia Textil“; Materiály „Materiály tkanin – polyester, polyamid, polypropylen, bavlna | Bohemia Textil“;
    O nás „O nás – výroba tkanin od roku 1997 | Bohemia Textil“; Kontakt „Kontakt a poptávka | Bohemia Textil“; Ochrana „Ochrana osobních údajů | Bohemia Textil“.
    `og:title` shodně, `og:site_name` „Bohemia Textil“. V meta description opravit čárku před „přes“.
  - JSON-LD (jen na Domů): doplnit `"foundingDate": "1997"`, `name` ponechat „Bohemia Textil“; nic dalšího nepřidávat (např. `areaServed` není podložené).
  - Křížové odkazy: Služby → Materiály a Laser; Materiály → Vývoj tkaniny (`sluzby#vyvoj`); Laser → Služby; všechny → Kontakt.
  - `noindex` a canonical ponechat dle briefu.

### R1-21 · P2 · Pohyb a animace
- **Problém:** 0,9 s posun 36 px u každého prvku, zoom hero 2,4 s, animace hlavičky – na B2B webu zbytečně „divadelní“, obsah se při rychlém scrollu objevuje pozdě.
- **Doporučení:** dle 2.6. Zachovat bezpečný fallback (obsah viditelný bez JS a po 4 s), `prefers-reduced-motion` bez animací.

### R1-22 · P2 · Ochrana soukromí – čitelnost
- **Problém:** H1 56 px na střed, H2 vypadají jako běžný text (`font: inherit`), mezery 50 px mezi odstavci, seznam bez rytmu.
- **Doporučení:** `.page-head` (R1-18), tělo v kontejneru 760 px, H2 `--fs-h3` Montserrat 600 s odstupem 40 px nad / 12 px pod,
  odstavce 17 px / 1.6, seznam s odrážkami `--blue-500` a mezerou 8 px mezi položkami. Text beze změny.

### R1-23 · P2 · Mobil – detailní ladění
- **Problém:** H1 na 390 px 5 řádků, tlačítka v hero pod sebou 135 px široká, loga 4 × 110 px pod sebou, karty s levým odsazením 56 px pro pruh, patička na střed.
- **Doporučení:** dodržet velikosti z 2.2 (mobilní minima), tlačítka v hero a formuláři na plnou šířku, loga 2 × 2, karty s ikonou nahoře místo odsazení zleva,
  patička vlevo. Otestovat 320, 360, 390, 768 px: žádné vodorovné scrollování (dnes OK – nezhoršit), žádný text menší než 14 px.

### R1-24 · P3 · Písma
- **Problém:** preloadují se jen `*-latin.woff2`, ale čeština potřebuje hned i `*-latin-ext` (ř, č, ě, ů…) – ty se načtou až později a mohou způsobit přeblik.
- **Doporučení:** ověřit ve waterfallu; preloadovat soubory skutečně použité nad ohybem (pravděpodobně Montserrat latin + latin-ext a Figtree latin + latin-ext)
  nebo preload zrušit. Pokud je k dispozici `pyftsubset`, lze Montserrat latin-ext (89 kB) zmenšit na znaky češtiny.

### R1-25 · P3 · Kontakt – drobnosti navíc
- **Doporučení:** odkaz „Zobrazit na mapě“ (`https://mapy.cz/zakladni?q=Sko%C5%99enice%20134%2C%20Choce%C5%88`, `rel="noopener"`, nový panel) u adresy;
  statický soubor `bohemia-textil.vcf` („Uložit kontakt“) s údaji z patičky; tisková šablona (`@media print`) pro Materiály a Kontakt (bez hlavičky/patičky, černý text).

### R1-26 · P3 · Mikrointerakce a detaily
- **Doporučení:** odkazové karty se šipkou, která se na hover posune o 4 px; aktivní položka menu i v patičce (`aria-current`); `text-wrap: pretty` u perexů;
  `::selection` v `--blue-500`/bílá; favicon a `theme-color` ponechat (`#00060f`).

---

## 5. Obsah k doplnění od majitele

Bez tohoto obsahu zůstane web „čistě textový“. Implementátor může nechat `<!-- DOPLNIT: … -->`, ale nic nevymýšlí.

1. **Skutečné fotografie** (nejvyšší přínos pro důvěryhodnost): výrobní hala, tkalcovské stavy, snovací stroj, laserový řezací stroj při práci,
   role a detaily vlastních tkanin, zátěry/úpravy, expedice, budova, portrét Ing. Štancla. Ideálně na šířku ≥ 2 000 px, několik detailů na čtverec.
   Potvrdit licence/původ dnešních obrázků (`hero.webp`, `laser.webp`, `nabizime.webp`, `pouziti.webp`, `kontakt.webp` s vodoznakem DALL·E).
2. **Parametry tkaní:** maximální šíře tkaniny, rozsah plošných hmotností (g/m²), vazby, typy a jemnosti přízí, počet a typ stavů, kapacita, typické dodací lhůty, barevné možnosti.
3. **Laserové řezání:** maximální délka/formát, tloušťky materiálů, přijímané podklady (DXF, PDF, AI…), minimální zakázka, zda řežete i materiál dodaný zákazníkem, cena/kalkulace.
4. **Návazné služby:** jaké zátěry a nánosy (např. typ), barvení (rozsah odstínů), optické zjasnění – co lze specifikovat; doprava (oblast, způsob).
5. **Doplnění tabulky materiálů:** chybějící hodnoty (tepelná vodivost PP, pevnost/životnost/hmotnost/cena bavlny, UV odolnost PES a PP); případně další materiály.
6. **Reference:** potvrzení, že loga Škoda, Bernard, Gumotex a Bedimex lze uvádět (souhlas) a jsou aktuální; případně krátké případové studie nebo citace s povolením.
7. **Certifikace a doklady kvality:** ISO, zkušební protokoly, technické/bezpečnostní listy (PDF ke stažení), vzorníky.
8. **Firemní údaje:** právní forma a zápis (živnostenský rejstřík), role Ing. Štancla (majitel/jednatel), další kontaktní osoby, kdy je k zastižení telefon, zda lze přijet osobně, provozní doba.
9. **Ochrana osobních údajů (právní revize):** nadpis „Jak shromažďujeme informace?“ nesedí na obsah (účely), „Proč…“ popisuje způsob; text zmiňuje měřicí nástroje,
   propagační zprávy a obchodní partnery, což neodpovídá současnosti (web bez cookies a analytiky); chybí identifikace správce, právní základ, doba uložení a práva subjektu údajů (čl. 13 GDPR).
10. **E-mail na doméně** (např. `poptavky@bohemiatextil.cz` přes Forpsi) – `@tiscali.cz` působí méně profesionálně; formulář by pak šel i na nový e-mail (nutná nová aktivace FormSubmit).
11. **Jazykové verze** (EN/DE) – pokud jsou zahraniční odběratelé; rozhodnutí majitele.
12. **Silná stránka firmy jednou větou** – čím se liší od konkurence (rychlost, malé série, vývoj…), aby šlo nahradit obecné „spolehlivý výrobce“ konkrétním tvrzením.

---

## 6. Co budu v kole 2 kontrolovat

Screenshoty všech 7 stránek (desktop + mobil) a navíc: hlavička při scrollu, otevřené menu + Tab, fokus ve formuláři a stavy formuláře
(odesílání/chyba/úspěch – s blokovaným požadavkem na FormSubmit), 320 px, kontrast textu přes fotky, nadpisová osnova, konzole bez chyb,
`noindex` na všech stránkách, zachované skryté pole formuláře a žádný vymyšlený fakt (porovnám s výčtem faktů v tomto dokumentu).
