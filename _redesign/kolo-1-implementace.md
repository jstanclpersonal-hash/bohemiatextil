# Kolo 1 – implementace (v2)

Implementoval jsem všechny body P1 a P2 (R1-01 … R1-23) a všechny P3 (R1-24 … R1-26). Nic jsem nevymýšlel:
každý fakt na webu pochází z původních 7 stránek. Nová je jen mikrocopy bez faktického obsahu (perexy sekcí,
názvy sekcí apod.), seznam je v bodě 5. Mimo `v2/` jsem nic neměnil a s gitem jsem nepracoval (jen `git status` pro kontrolu).

## 1. Stav jednotlivých bodů

| Bod | Stav | Co jsem udělal / proč ne |
|---|---|---|
| R1-01 Základ CSS | hotovo | `style.css` jsem napsal znovu od nuly (12 oddílů). Barvy, typografie, rozestupy, radiusy a stíny jdou přes tokeny z kap. 2. Žádné wixové pevné hodnoty, žádné `br.d`. Komponenty `.btn--primary/--ghost/--secondary/--on-blue`, `.section--light/--white/--dark`, `.section-head`, `.eyebrow`, `.card`, `.card--link`, `.fact`, `.chip`, `.cta-band`, `.page-head`. `color-scheme: dark light` na `:root`, světlé sekce mají `light`. |
| R1-02 Hlavička a menu | hotovo | Sticky hlavička 72/64 px, `rgba(0,6,15,.94)` + blur (na `::before`, aby fixní overlay nebyl uzavřený v hlavičce). ≥ 1280: logo · menu · telefon s číslem · CTA. 961–1279: telefon jen jako ikona 44 × 44. ≤ 960: logo vlevo, telefon a burger 44 × 44. Overlay: horní řádek tvoří samotná hlavička a burger se mění v křížek. Odkazy Montserrat 600 22 px, řádky 56 px, aktivní stránka má modrý pruh vlevo, pod nimi CTA na plnou šířku, telefon a e-mail. Při otevření dostanou `main`, patička a skip link `inert`, stránka se zamkne proti scrollu. Esc zavírá a vrací fokus na burger, klik na odkaz menu zavře. „Domů“ je jen v mobilním menu. `scroll-padding-top: 88px`. Bez JS se menu na mobilu zobrazí jako zalomený řádek odkazů. |
| R1-03 Hero + fakta | hotovo | Obsah podle IA 3.1: eyebrow „Český výrobce od roku 1997“, H1 „Technické tkaniny na zakázku“, perex, „Nezávazně poptat“ + „Přehled služeb“, „nebo zavolejte …“. Hero obrázek je `<img fetchpriority="high">` (srcset 800/1200). Faktový pás se 4 položkami (text přesně podle zadání) je v dolní části hero. Fakta začínají nad ohybem na 1440 × 900 (od y = 640), na 1280 × 720 (od y = 629) i na 390 × 844. „25 let“ už nikde není. |
| R1-04 Domů – Služby | hotovo | Světlá sekce „Co pro vás zajistíme“ s 5 odkazovými kartami. Mřížka 12 sloupců: 3 × 4, pak laser 8 sloupců s výřezem `laser-640.webp` (240 px) a „Návazné služby“ 4 sloupce. 768–1023 jsou 2 sloupce (laser přes celou šířku, `dense`), < 768 jeden sloupec. Karty vedou na kotvy `sluzby#…`, laser na `laserove-rezani`. Staré sekce „Laser“ a „Co nabízíme“ jsem odstranil. |
| R1-05 Domů – Použití | hotovo | Tmavá sekce `--navy-900` **bez fotky** (textura je volitelná a pod kartami by stejně nebyla vidět), 8 dlaždic s vlastními ikonami: 4/2/1 sloupce (≥ 1024 / ≥ 480 / < 480). 8. dlaždice má modrý rámeček a odkaz na `kontakt`. Text „V automobilovém průmyslu“ jsem zkrátil na „Automobilový průmysl“. |
| R1-06 Loga odběratelů | hotovo | Tmavý pás hned pod hero a stejná komponenta na O nás. Popisek „Naše tkaniny využívají například“, loga vysoká 40 px, `opacity .85`, bez hoveru. Jsou 2 × 2 na mobilu a 4 v řadě od 768 px, alt texty zůstaly. Loga jsem přeuložil na výšku 88 px (2×), dohromady 39 kB místo 83 kB. |
| R1-07 Jak spolupráce probíhá | hotovo | `<ol>` s 5 kroky (texty podle R1-07, bez lhůt), na desktopu vodorovně s kroužky 40 px a spojnicí, na mobilu svisle s linkou vlevo. Je na Domů i na Službách. Názvy kroků jsem převzal z R1-07 („Úpravy“, „Doprava“), ne z IA. |
| R1-08 Služby | hotovo | Tmavá hlavička s kotvovými štítky (44 px). Bloky `#tkani`, `#snovani`, `#vyvoj`, `#laser`, `#navazne`, mřížka 7 + 5. Boxy „Parametry“ jsou `<dl>` (popisek 14 px, hodnota Montserrat 20 px). Laserové řezání jsem přidal jako 5. službu. Návazné služby jsou 4 položky s ikonami. Na konci je proces a CTA pás. Překlep „Váš“ je opravený. |
| R1-09 Materiály | hotovo | 4 karty se štítky (4 / 2 ≥ 600 / 1 sloupec). Srovnávací `<table>` má `<caption>`, `th scope` a `table-layout: fixed`. Obsah je jen z původních seznamů; „nejvyšší/nejlepší“ zvýrazňuje štítek a „—“ má pro čtečky text „neuvádíme“. Pod 768 px je tabulka ve `.table-scroll` (`role="region"`, `tabindex="0"`) s lepivým prvním sloupcem, stínem vpravo a nápovědou. Prázdné `<li>` je pryč. Dále box „Nevíte, který materiál zvolit?“ → `sluzby#vyvoj` a CTA pás „Potřebujete poradit s výběrem materiálu?“. |
| R1-10 Laserové řezání | hotovo | Dělená hlavička s `laser-1067/640.webp` (4 : 3, `alt=""`), tlačítky „Nezávazná poptávka“ + „Zavolat +420 …“ (na mobilu jen „Zavolat“) a lištou tří faktů. Následuje 4 výhody v mřížce 2 × 2 (opravená věta „…nevzniká na materiálu mechanické poškození, jako jsou roztřepené okraje, a řez je vždy přesný“), 4 karty materiálů („Další materiály“ jako štítky), odkaz na Služby a CTA pás „Potřebujete něco vyřezat?“. |
| R1-11 Kontakt + formulář | hotovo | Světlá sekce bez fotky, formulář 7/12 a kontakty 5/12. Na mobilu je pořadí rychlá tlačítka → formulář → kontakt. Pole mají label nad polem, výšku 48 px, rámeček `#7c8699`, fokus 2px `--blue-600`, štítek „povinné“, nápovědy přes `aria-describedby`. Nová pole: checkboxy „Služba“, select „Materiál“ a „Množství“. Tlačítko je primární „Odeslat poptávku“. JS přidá `novalidate` a validuje inline (`aria-invalid`, chyba pod polem, fokus na první chybné pole, kontrola po opuštění vyplněného pole a průběžně u chybného). Stavy: odesílání (disabled + „Odesílám…“ + stavová hláška), chyba (červený box s klikatelným e-mailem a telefonem, `role="alert"`), úspěch (panel ✓, fokus na nadpis, `role="status"`; platí i pro `?odeslano=1`). **Oprava více hodnot:** `data[key] = key in data ? data[key] + ', ' + value : value`. `action`, `data-endpoint`, `_subject`, `_template`, `_captcha`, `_next`, `_honey` a `email` (required) jsou beze změny. |
| R1-12 Kontrast přes fotky | hotovo | Text přes fotku je jen v hero a v hlavičkách podstránek, vždy na překryvu. Na hero ≥ 1024 je hustší gradient a text drží levých 62 %. Pod 1024 px je svislý překryv 0,82–0,94. Nejsvětlejší pixel pod textem jsem změřil skriptem (bod 3): nejhorší hodnota je 5,25 : 1 (perex na 1024 px), jinak 5,4–17 : 1. |
| R1-13 Čeština | hotovo | Všude větná velká písmena, malé „vy/vás/váš“, „Bohemia Textil“ (title, og, patička), „e-mail“, „565 01“, „od roku 1997“. Opravil jsem „v Česku“, „my jsme na ni navázali“, čárku před „přes“ (i v meta description) a „maximum“ místo „absolutní maximum“. Nezlomitelné mezery jsou u čísel s jednotkou, u telefonu, „Ing.&nbsp;Václav“ a u jednopísmenných předložek a spojek v nadpisech, perexech i textu (automatická kontrola nenašla žádnou zbývající). Rozsah je „90–200 cm“. Právní text na stránce Ochrana soukromí jsem nechal doslova. |
| R1-14 Přístupnost | hotovo | Jednotný `:focus-visible` (`--blue-300` na tmavém, `--blue-600` na světlém, bílá na CTA pásu). Odkazové karty mají fokus na celé kartě (`:has`). Osnova nadpisů: 1× H1, sekce H2, karty H3, fakta jsou `<li>`. Cíle v patičce a menu mají ≥ 44 px. Skip link je ve stylu webu, `tel:` odkazy s ikonou mají `aria-label="Zavolat +420 603 216 998"`. axe ani Lighthouse lokálně k dispozici nejsou, ověřoval jsem vlastním skriptem (bod 3). |
| R1-15 CTA pás | hotovo | Komponenta `.cta-band` (`--blue-600`, 2 sloupce ≥ 1024) je na všech stránkách kromě Kontaktu, včetně Ochrany soukromí, protože pravidlo zní „všechny kromě Kontaktu“. Varianty: Laser „Potřebujete něco vyřezat?“ a Materiály „Potřebujete poradit s výběrem materiálu?“. |
| R1-16 O nás | hotovo | Hlavička podle IA 3.5. Dva krátké odstavce vlevo zarovnané doleva, karta „V kostce“ jako `<dl>` s modrým pruhem, 3 hodnotové karty, loga a CTA pás. |
| R1-17 Patička | hotovo | 4 sloupce ≥ 1024, 2 × 2 na tabletu, 1 sloupec na mobilu, vše zarovnané vlevo. Obsah: logo + věta + CTA; Kontakt (`<address>` s ikonami); Stránky (včetně Laserového řezání, s `aria-current`); Fakturační údaje. Spodní lišta „© 2026 Bohemia Textil · Ing. Václav Štancl“ (`data-year`, staticky 2026) + „Ochrana soukromí“. |
| R1-18 Hlavička podstránek | hotovo | `.page-head`: eyebrow + H1 `--fs-h1` + perex `--slate-300`, padding 64/56 (mobil 40/40). Má jemnou texturu `hero-800.webp` (14 %, s maskou), na Kontaktu bez textury, na Laseru dělená s fotkou. |
| R1-19 Obrázky a výkon | hotovo s výhradou | Hero a laser jsou `<img>` s `width/height`, `srcset`, `sizes`, hero má `fetchpriority="high"`, ostatní `loading="lazy" decoding="async"`. `.bg--fixed` jsem zrušil. **Varianta 1600w neexistuje:** zdroj `hero.webp` má jen 1200 px, proto 800w/1200w a od 1200 px je fotka přišpendlená vpravo (šíře 1200 px) s maskou doleva, takže se nikdy nezvětšuje. Nepoužité obrázky jsem smazal. Lighthouse lokálně není, změřil jsem Playwrightem (4G, CPU 4×): CLS 0–0,002, LCP 1,1–1,6 s, přenos Domů 181 kB (mobil) / 229 kB (desktop). |
| R1-20 SEO a odkazy | hotovo | Titulky a `og:title` přesně podle zadání, `og:site_name` „Bohemia Textil“, JSON-LD doplněný o `"foundingDate": "1997"`. Křížové odkazy: Služby → Materiály a Laser, Materiály → `sluzby#vyvoj`, Laser → Služby, všechny → Kontakt. `noindex` a canonical zůstaly. |
| R1-21 Pohyb | hotovo | Reveal: posun 12 px, 450 ms ease-out, rozestup 60 ms, max. 4 kroky, jen hlavičky sekcí a karty. Hero, hlavička a zoom se neanimují. Pojistka zůstala: bez JS a po 4 s je vše vidět. `prefers-reduced-motion` vypíná vše. Hover tlačítek je bez posunu. |
| R1-22 Ochrana soukromí | hotovo | `.page-head` a tělo v 760 px (zarovnané s levou hranou hlavičky). H2 mají `--fs-h3` s odstupem 40/12 px, odstavce 17 px / 1.6, odrážky v `--blue-500` s mezerou 8 px. Text je beze změny. |
| R1-23 Mobil | hotovo | H1 Domů má na 390 px 2 řádky a na 320 px 3. Tlačítka v hero, v hlavičkách a ve formuláři jsou na mobilu na plnou šířku, loga 2 × 2, karty mají ikonu nahoře, patička je vlevo. Na 320, 360, 390, 768, 1024, 1280, 1440 a 1920 px u všech 7 stránek není vodorovný scroll. Nejmenší text má 13 px: eyebrow a štítky sekcí podle tokenu `--fs-eyebrow`. Ostatní text má ≥ 14 px. |
| R1-24 Písma | hotovo | `*-latin-ext` jsem nahradil výřezem jen na znaky češtiny a slovenštiny: `montserrat-cs.woff2` má 5 kB místo 89 kB a `figtree-cs.woff2` 4 kB místo 24 kB. Zůstal variabilní řez 400–700, `unicode-range` je upravený. Preloaduji všechny 4 soubory (66 kB). Ostatní znaky latin-ext (např. polské) by se vykreslily systémovým písmem. |
| R1-25 Kontakt – extra | hotovo | Přidal jsem „Zobrazit na mapě“ (mapy.cz, nový panel, `rel="noopener"`, hláška „otevře se v novém okně“ pro čtečky), `v2/bohemia-textil.vcf` („Uložit kontakt do telefonu“, jen údaje z patičky) a `@media print` (bez hlavičky, patičky, CTA a formuláře, černý text, tabulka bez posuvu; ověřeno na Materiálech a Kontaktu). |
| R1-26 Mikrointerakce | hotovo | Šipka na odkazových kartách a odkazech se šipkou se na hover posune o 4 px, `aria-current` je v menu i v patičce, `text-wrap: pretty/balance`, `::selection` v `--blue-500`, favicon a `theme-color #00060f` beze změny. |

## 2. Soubory (vše v `v2/`)

**Změněné:** `index.html`, `sluzby.html`, `laserove-rezani.html`, `materialy.html`, `o-nas.html`, `kontakt.html`,
`ochrana-soukromi.html`, `assets/css/style.css` (přepsaný), `assets/js/site.js` (přepsaný, 157 řádků, bez závislostí),
`assets/img/skoda.webp`, `bernard.webp`, `gumotex.webp`, `bedimex.webp` (přeuložené na výšku 88 px).

**Přidané:** `assets/img/icons.svg` (sprite: 30 vlastních tahových ikon 24 px + 4 původní ikony výhod laseru),
`assets/img/hero-1200.webp` (86 kB) a `hero-800.webp` (45 kB), oba z `hero.webp`; `assets/img/laser-1067.webp` (13 kB) a
`laser-640.webp` (7 kB), oba výřez 4 : 3 z `laser.webp`; `assets/img/logo.webp` (400 px, 10 kB, z `logo.png`);
`assets/fonts/montserrat-cs.woff2`, `assets/fonts/figtree-cs.woff2`; `bohemia-textil.vcf`.

**Smazané:** `assets/img/hero.webp`, `laser.webp`, `kontakt.webp` (vodoznak), `nabizime.webp`, `pouziti.webp`, `logo.png`,
`assets/fonts/montserrat-latin-ext.woff2`, `figtree-latin-ext.woff2`.
`og.jpg` jsem **ponechal**: odkazuje na něj `og:image` absolutní adresou a po povýšení v2 do kořene bude potřeba.

**Pomůcka mimo repo:** `scratchpad/build/build.mjs` skládá 7 stránek ze sdílené hlavičky a patičky a z `build/pages/*.html`.
Díky tomu je hlavička i patička na všech stránkách byte po bytu stejná, liší se jen `aria-current` (ověřeno skriptem).
Výstup je čisté statické HTML a lze ho dál upravovat i ručně. Pozor: při dalším spuštění generátoru by se ruční úpravy přepsaly.

## 3. Co jsem ověřil a jak

- **Screenshoty** všech 7 stránek (desktop i mobil, dlaždice + `-full`): `shots/r1-impl/*.png`. Mezikroky jsou v `pass1–3/`
  a kontroly v `checks/`. Všechny jsem prošel očima a opravil, co nesedělo: zalomení „90–200 cm“, odrážky u kotev,
  šedý text chyb ve formuláři, přetečení tabulky na mobilu (absolutně umístěné skryté popisky v buňkách), zarovnání
  textu na Ochraně soukromí, kontrast perexu v hero na 1024 px.
- **`shot/r1-impl-check.mjs`** (Playwright):
  - Konzole, stav HTTP, přetečení, duplicitní `id`, počet H1, `alt`, `noindex` a malé písmo na 8 šířkách × 7 stránek: 0 chyb, 0 varování, žádný 404, nikde přetečení.
  - Hlavička na 320, 768, 961, 1024, 1280 a 1920 px, sticky po scrollu (top = 0), skok na kotvu `sluzby#vyvoj` (88 px pod hlavičkou).
  - Mobilní menu: `aria-expanded` a `inert`, Tab cyklí jen v hlavičce a overlay (pak opouští dokument do prohlížeče), Esc vrátí fokus na burger, klik na odkaz naviguje.
  - Formulář s **mockovaným `fetch`** (požadavky na formsubmit.co zachycené, nic se neodeslalo): prázdný e-mail, neplatný e-mail po opuštění pole, oprava, stav odesílání, chyba serveru, úspěch, `?odeslano=1`, nezměněná skrytá pole. Payload obsahuje `"Služba":"Tkaní na zakázku, Laserové řezání"`.
  - Bez JS: menu viditelné, nativní `required` zůstal.
  - Reveal s povoleným pohybem: po proscrollování nic nezůstane skryté.
- **`shot/r1-impl-contrast.mjs`**: skryje text, vyfotí pozadí a změří nejsvětlejší pixel pod každým textem přes fotku (výsledky v R1-12).
- **`shot/r1-impl-focus.mjs`**: projde Domů Tabem a vyfotí fokus (`checks/focus-*.png`). Všechny prvky mají 2px obrys, karty obrys celé karty.
- **`shot/r1-impl-perf.mjs`**: CLS, LCP a přenesená data při omezené síti (R1-19). **`shot/r1-impl-print.mjs`**: náhled tisku.
- **HTML očima a skriptem:** kontrola párování tagů (0 chyb, nic neuzavřeného), unikátní `id`, žádné zbylé šablonové značky.

## 4. Otevřené otázky a problémy pro designéra

1. **Velikost čísel ve faktech:** na mobilu jsem šel pod `--fs-stat` (min. 22 px místo 28 px), aby se „90–200 cm“ vešlo
   do mřížky 2 × 2 už od 360 px; pod 360 px jsou fakta v jednom sloupci. Na desktopu mají sloupce šířku podle obsahu
   (`repeat(4, auto)`), protože „PES · PA · PP · bavlna“ (menší, textový řez) se do čtvrtiny nevešlo. Prosím o posouzení.
2. **Ikony výhod laseru** jsou původní plné ikony („stávající ikony“) a stylem se liší od nové tahové sady. Mám je překreslit do sady?
3. **Mobilní overlay:** zavírací křížek je tentýž burger (mění se animací), ne samostatné tlačítko v overlayi.
   Hlavička zůstává jako horní řádek overlaye.
4. **CTA pás na Ochraně soukromí** – nechat, nebo odebrat?
5. **Kontakt:** horní odsazení sekce s formulářem jsem zmenšil (32–56 px), aby byl formulář výš. Odchylka od rytmu `--section-pad`.
6. **Nová mikrocopy bez faktů** – prosím o kontrolu tónu: perex služeb na Domů („…vše na jednom místě“), „každý materiál má jiné
   přednosti“, „Vše zajistíme od vývoje tkaniny až po doručení…“, „Proč řezat laserem“, „Na čem nám záleží“, „Přímý kontakt“,
   „Co do poptávky napsat“, fakta laseru „Bez kontaktu – laser se textilie přímo nedotýká“ a „Složité tvary – i jemné
   detaily a vzory“, 4. karta Proč my „Česká výroba od roku 1997 – Navazujeme na dlouholetou tradici výroby tkanin v Česku“.
   V parametrech Tkaní jsem použil zkratky PES/PA/PP s `<abbr title>`.
7. **Textura sekce Použití** (pouziti/nabizime 10–15 %) vynechána – obrázky smazány. Pokud ji chceš, vygeneruji malou variantu.
8. Komentáře `<!-- DOPLNIT: … -->` jsou u tabulky materiálů (chybějící hodnoty), na O nás (fotky) a na Ochraně soukromí
   (právní revize). Na stránce se nic z toho nezobrazuje.
9. Výřez písem pro latin-ext jsem vytvořil přes fontTools a vestavěné brotli z Node (bez instalace balíčků). Pokud se na webu
   objeví jiné znaky než česko-slovenské (např. jména se znaky ł, ő), vykreslí se systémovým písmem.
