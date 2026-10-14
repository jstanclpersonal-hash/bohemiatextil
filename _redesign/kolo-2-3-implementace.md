# Kolo 2 – implementace (v2)

Udělal jsem všechny body R2-01 až R2-12, tvoje odpovědi na otázky z kola 1 a zbývající části R1-03, R1-09, R1-16 a R1-23.
Stránky dál generuje `scratchpad/build/build.mjs`; výstupem jsou statické soubory `v2/*.html`.
Nové fakty jsem nepřidal. `_next` (`/v2/kontakt?odeslano=1`), `noindex`, endpointy i skrytá pole formuláře jsou beze změny.
Mimo `v2/` jsem nic neměnil a s gitem jsem nepracoval.

## 1. Stav bodů R2

| Bod | Stav | Co jsem udělal |
|---|---|---|
| R2-01 Faktový pás | hotovo | První fakt je teď „4 materiály“ s popiskem „PES · PA · PP · bavlna“. Kolem teček jsou nezlomitelné mezery a popisek se vůbec neláme (`white-space: nowrap`). Mřížka má 4 stejné sloupce od 1024 px, 2 sloupce od 360 do 1023 px a pod 360 px jeden. Položky jsou zarovnané nahoru (`align-items: start`) a všechny hodnoty mají stejnou velikost `clamp(1.375rem, .75rem + 2vw, 2.5rem)`, tedy 22 px na mobilu, 32 px na 1024 px a 40 px od 1440 px. Skript kontroluje přetečení hodnot ve sloupci a srovnání výšek v řádku na 8 šířkách: žádný nález. Na 1024 px se „90–200 cm“ vejde (rezerva asi 36 px). Laserová lišta používá stejnou velikost hodnot; texty „Bez kontaktu“ a „Složité tvary“ se smějí zalomit (`fact__value--wrap`). |
| R2-02 Popisek tabulky | hotovo | Nový text: „Vlastnosti materiálů vedle sebe. Štítkem jsou označené vlastnosti, ve kterých materiál vyniká.“ Štítky zůstaly jen u „nejvyšší“ a „nejlepší“. |
| R2-03 Dvojí výzva na Materiálech | hotovo | Box „Nevíte, který materiál zvolit?“ zůstal a dál vede na `sluzby#vyvoj`. CTA pás má výchozí variantu „Máte poptávku?“. Variantu `materialy` jsem z generátoru odstranil. |
| R2-04 O nás – dvousloupec | hotovo | V kartě „V kostce“ je od 768 px štítek a hodnota na jednom řádku (grid `8.5rem 1fr`, řádky 12 px nad i pod); karta má teď 505 px. Pod odstavce jsem přidal `<blockquote class="pull-quote">` s textem „Dodací termíny jsou pro nás svaté a pro jejich dodržení děláme maximum.“: Montserrat 600 20–24 px, modrý pruh vlevo, dekorativní uvozovky jako SVG s `aria-hidden` a bez připsání osobě. Hodnotová karta má teď jen „Pro jejich dodržení děláme maximum.“. Karta „V kostce“ má `align-self: start`. Na 1440 i 1920 px končí levý sloupec s citátem asi 90 px nad spodní hranou karty (dříve zůstávalo asi 350 px prázdné plochy). |
| R2-05 Mobil – délka | hotovo | Na 390 px je **Domů 6 477 px** (cíl ≤ 6 500) a **Služby 4 180 px** (cíl ≤ 4 200). Všechny změny platí jen pod 768 px; tabulka výšek je v bodě 3. Co jsem udělal: <br>• Karty služeb, hodnot a výhod laseru mají ikonu 40 px vlevo od nadpisu (grid), padding 20 px a mezeru 12 px. U odkazových karet zůstala jen šipka vpravo od nadpisu a text „Více o …“ je skrytý (`display: none`; je to `aria-hidden` a název nese odkaz v nadpisu). <br>• Obrázek v kartě laseru je 16 : 9 s max. výškou 160 px. <br>• „Proč Bohemia Textil“ a hodnoty na O nás jsou jedna bílá karta se seznamem odděleným linkami. Totéž jsem udělal u karet materiálů a u dlaždic Použití (tmavá karta, řádky 56 px; dlaždice „Máte jiné použití?“ si nechala modrý rámeček a 56px cíl). <br>• Patička: tlačítko je pryč (R2-10), „Stránky“ jsou ve 2 sloupcích, logo má 128 px, IČ a DIČ jsou na jednom řádku, neodkazové řádky mají 32 px a odkazy dál 44 px. <br>• Menší rozestupy: `--section-pad` má minimum 48 px místo 56 px, `--head-gap` 24 px; menší jsou i odsazení bloků služeb, boxů Parametry (na mobilu dt a dd vedle sebe, dlouhý seznam materiálů laseru pod sebou), kroků procesu (kroužek 36 px), CTA pásu (40 px) a pásu log (32 px). <br>• Perex procesu jsem zkrátil na „Od první poptávky až po doručení hotového produktu do vaší společnosti.“. <br>Dotykové cíle zůstaly ≥ 44 px. |
| R2-06 Tabulka na telefonu | hotovo | Pod 768 px: tabulka má šířku 37,5rem s pevnými sloupci 7,5rem, první sloupec má 14 px / 1.35, buňky padding 10/12 px a výšku 44 px a hodnoty 15 px. Řádek „Další vlastnosti“ je na mobilu skrytý (`.compare__extra`). Na desktopu zůstává, aby nezmizel fakt „příjemný na omak“; ten jsem navíc doplnil jako štítek do karty Bavlna na Materiálech, takže ho mobil nepřijde. Pomlčky mají barvu `rgba(90,100,120,.6)` na všech šířkách a text „neuvádíme“ pro čtečky zůstal. Na 390 px jsou teď vidět dva celé sloupce hodnot (Polyester, Polyamid) místo 1,3. |
| R2-07 Ochrana soukromí bez CTA | hotovo | CTA pás je pryč, sekce končí běžným odsazením. |
| R2-08 Ikony laseru, „190 cm“ | hotovo | Čtyři ikony jsem překreslil do tahové sady (24 px, tah 1.75, zakulacené konce): `resize` (diagonální šipky), `scissors` (nůžky místo štítu), `pencil`, `recycle`. Původní plné ikony jsem ze spritu odstranil. První karta je teď „Větší kusy materiálu“ s textem ze zadání, takže „190 cm“ už v nadpisu není. |
| R2-09 Boxy s pruhem | hotovo | Pruh je `::before` (`left: 0; top: 16px; bottom: 16px; width: 4px; radius 2px`) u `.params`, `.facts-card`, `.tip-card`, `.help-box` a u nového citátu (tam po celé výšce). Boxy mají běžný rámeček 1 px `--line`. Seznam s fajfkami v „Co do poptávky napsat“ má `padding-left: 0` a ikony začínají na levé hraně nadpisu. |
| R2-10 Zdvojené CTA | hotovo | Tlačítko v patičce je pryč (věta zůstala). Na Kontaktu vede tlačítko v hlavičce i v mobilním menu na `#poptavka` (id karty formuláře, skok respektuje sticky hlavičku). Jediný rozdíl hlaviček mezi stránkami je tak `aria-current` a tento odkaz. Řádky v patičce mají při `(pointer: fine)` 36 px a při dotyku 44 px. |
| R2-11 Zalamování | hotovo, s poznámkou | `text-wrap: balance` mají jen `h1–h3`, eyebrow a hodnota faktu. Odstavce, `li` a `dd` mají `pretty`. Ověřil jsem to i v prohlížeči: odstavce v kartách měly i v kole 1 `pretty`, ne `balance`. Úzké řádky typu „Setkáte se u nás / s přátelským přístupem / a vstřícným jednáním.“ dělají nezlomitelné mezery po jednopísmenných předložkách a spojkách („u&nbsp;nás“, „s&nbsp;přátelským“, „a&nbsp;vstřícným“) v úzkých kartách 4sloupcové mřížky. `pretty` navíc mění zalomení jen ve dvou odstavcích (kvůli osiřelému poslednímu slovu) a počet řádků se nemění. Na mobilu je teď mřížka seznamem přes celou šířku, takže se tam to nevyskytuje. |
| R2-12 Drobnosti | hotovo | „Sídlo“ jsem změnil na „Adresa“. Z perexu služeb na Domů jsem vypustil „– vše na jednom místě“. Nápověda u množství má „je&nbsp;500&nbsp;m“. Laser: eyebrow „Služby“ zůstal a drobečková navigace není. |

**Další odpovědi z kola 2:** Burger při otevření mění `aria-label` z „Menu“ na „Zavřít menu“ a zpět (ověřeno). Horní odsazení
Kontaktu je teď token `--section-pad-tight: clamp(32px, 4vw, 56px)` použitý přes `.section--tight-top`, místo jednorázové
třídy `.contact-section`.

## 2. Zbývající části bodů R1

| Bod | Stav |
|---|---|
| R1-03 Hero + fakta | hotovo přes R2-01 (stejné sloupce, žádné lámání za tečkou, hodnoty v řádku na stejné výšce i na mobilu). Kontrast hero beze změny: min. 5,23 : 1 (perex na 1024 px). |
| R1-09 Materiály | hotovo přes R2-02, R2-03 a R2-06. |
| R1-16 O nás | hotovo přes R2-04. |
| R1-23 Mobil | hotovo přes R2-05: cíle splněné, bez přetečení od 320 px, cíle ≥ 44 px. |

## 3. Výšky stránek na mobilu 390 px (R2-05)

| Stránka | Kolo 1 | Kolo 2 | Rozdíl |
|---|---|---|---|
| Domů | 8 504 px | **6 477 px** | −2 027 (−24 %) |
| Služby | 5 234 px | **4 180 px** | −1 054 (−20 %) |
| Laserové řezání | 4 668 px | 3 966 px | −702 |
| Materiály | 3 993 px | 3 192 px | −801 |
| O nás | 4 027 px | 3 577 px | −450 |
| Kontakt | 3 685 px | 3 314 px | −371 |
| Ochrana soukromí | 3 124 px | 2 373 px | −751 (bez CTA pásu) |

Měřeno skriptem `shot/r2-heights.mjs` (390 × 844, dotyková emulace `pointer: coarse`, takže patička je počítaná se 44px řádky).
Rozpad Domů po sekcích (px): hlavička 64, hero 743, loga 219, služby 1 252, proces 764, materiály 841, použití 702,
proč 758, CTA 393, patička 740.

## 4. Soubory

**Změněné (v2):** všech 7 `*.html` (vygenerované), `assets/css/style.css`, `assets/js/site.js` (`aria-label` burgeru),
`assets/img/icons.svg` (odstraněno `adv-width`, `adv-shield`, `adv-pen`, `adv-cycle`; přidáno `resize`, `scissors`,
`pencil`, `recycle` a dekorativní `quote`).
Žádné soubory jsem nepřidal ani nesmazal.
**Zdroje generátoru (scratchpad):** `build/build.mjs` (CTA v patičce, `#poptavka` na Kontaktu, odstraněná varianta CTA),
`build/pages/*.html`.
**Nové kontrolní skripty:** `shot/r2-impl-check.mjs` (navíc kontrola přetečení a zarovnání faktů, `href` CTA v hlavičce,
přítomnost CTA pásu a `aria-label` burgeru) a `shot/r2-heights.mjs`.

## 5. Ověření

- **Screenshoty:** `shots/r2-impl/` obsahuje všech 7 stránek na desktopu i mobilu jako dlaždice + `-full`; prošel jsem je očima. Náhledové listy jsou v `_review/` a kontroly 320 / 768 / 961 / 1024 / 1280 / 1920 px, menu a formuláře v `checks/`.
- **`r2-impl-check.mjs`:** na 8 šířkách (320–1920 px) × 7 stránek bez chyb a varování v konzoli, bez 404, bez vodorovného přetečení a duplicitních `id`. Všude 1× H1, `noindex`, fakta nepřetékají a hodnoty v řádku jsou na stejné výšce. CTA pás chybí jen na Kontaktu a Ochraně soukromí. Na Kontaktu vede CTA v hlavičce na `#poptavka`.
- **Menu:** `aria-expanded` a `aria-label` se přepínají („Zavřít menu“ / „Menu“), `inert` funguje, Tab neopustí hlavičku, Esc vrací fokus na burger.
- **Formulář (mockovaný fetch, nic se neodeslalo):** prázdný a neplatný e-mail, oprava, „Odesílám…“, chyba serveru, úspěch, `?odeslano=1`. Payload `"Služba":"Tkaní na zakázku, Laserové řezání"`. Skrytá pole a `_next` beze změny.
- **Bez JS:** menu i nativní `required` fungují. **Reveal** se po proscrollování zobrazí celý.
- **Kontrast hero** (`r1-impl-contrast.mjs`): min. 5,23 : 1 na všech šířkách.

## 6. Otevřené otázky

1. Minimum `--section-pad` jsem kvůli cílům R2-05 snížil z 56 na 48 px. Projeví se to jen pod 800 px; od 800 px platí původní hodnoty.
   Pokud chceš 56 px zachovat, Domů by měl asi 6 650 px a Služby asi 4 260 px, tedy nad cílem.
2. Kartové seznamy na mobilu (Použití, Materiály, hodnoty) jsou nový vzor nad rámec zadání R2-05, které jmenovalo jen „Proč“. Bez nich by Domů cíl ≤ 6 500 px nesplnil. Prosím o kontrolu, že takto vypadají dobře, hlavně tmavý seznam Použití.
3. Řádek „Další vlastnosti“ je skrytý jen na mobilu; na desktopu zůstal. Mám ho odstranit všude, když je teď „příjemný na omak“ v kartě Bavlna?
4. axe/Lighthouse dál lokálně nejsou k dispozici. Jak píšeš, je potřeba je spustit před nasazením.

---

# Kolo 3 – drobné opravy po schválení

| Bod | Stav | Co jsem udělal |
|---|---|---|
| R3-01 Karta laseru na mobilu | hotovo | Příčina: mobilní pravidlo `.card { padding: 20px }` se uplatnilo i na `.card--media`, takže obrázek i text dostaly 20 px navíc. Pod 768 px má teď `.card--media` `padding: 0`: obrázek jde přes celou šíři karty nahoře (horní rohy kulatí `overflow: hidden` + radius karty) a text má 20 px jako ostatní karty. Ověřeno měřením na 320 i 390 px: všech 5 nadpisů začíná na x = 89 px a všechny ikony na x = 37 px (dříve laser 109 px). Snímek: `shots/r3-impl/services-grid-390.png`. |
| R3-02 Řádek „Další vlastnosti“ | hotovo | Řádek jsem z tabulky odstranil na všech šířkách a smazal i nepotřebné CSS `.compare__extra`. Tabulka má 8 řádků. Kontrola, že se žádný fakt z původního seznamu Bavlny neztratil: „přírodní materiál“, „příjemný na omak“, „vysoká savost“ a „snadné barvení“ jsou štítky v kartě Bavlna a „nízká tepelná vodivost“ je v řádku Tepelná vodivost. |

**Soubory:** `v2/assets/css/style.css`, `v2/materialy.html` a `v2/index.html` (obojí vygenerované) a zdroj `scratchpad/build/pages/materialy.html`.
**Ověření:** `shots/r3-impl/` obsahuje Domů a Materiály na desktopu i mobilu (dlaždice + `-full`), prošel jsem je očima.
`shot/r3-check.mjs` na 320 / 390 / 768 / 1024 / 1440 / 1920 px nenašel u obou stránek žádnou chybu ani varování v konzoli, žádný 404 ani vodorovné přetečení.
Domů má na mobilu 390 px teď 6 437 px (dříve 6 477 px).
