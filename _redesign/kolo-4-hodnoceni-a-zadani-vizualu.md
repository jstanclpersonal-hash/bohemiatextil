# Kolo 4 – srovnání originálu a v2, plán vizuálů a decentního pohybu

Podklady:
- čerstvé screenshoty obou verzí: `shots/r4-review/v1/` (originál `/`) a `shots/r4-review/v2/` (`/v2/`),
  všechny stránky na desktopu i mobilu, dlaždice + `-full`;
- zdrojové fotky v `assets/img/` (kořen repa);
- CSS a JS v `v2/`.

Pozor na čtení `-full` screenshotů originálu: fixní pozadí („parallax“) se ve full-page snímku nevykreslí,
pásy „Co nabízíme“ a „Použití“ tam vypadají jako prázdné tmavé plochy. Skutečný vzhled ukazují dlaždice
`index-desktop-03/04.png`.

Zpětná vazba majitele (doslova): „Chybí mi na stránce nějaké vizuály“, „je škoda, že teď je stránka méně animovaná –
bral bych tam trochu více decentních animací – nic přehnaného, ale aby to bylo takové mild“ a „Případně můžeš využít
nějakou ikonografiku nebo vlastní vectory pokud by to bylo vhodné“. Má pravdu a níže to bez obalu přiznávám.

---

## A) Nezávislé hodnocení: originál × v2

Hodnotím jako externí auditor, ne jako autor zadání v2.

| Aspekt | Originál | Zdůvodnění (originál) | v2 | Zdůvodnění (v2) |
|---|---|---|---|---|
| Vizuální dojem / atraktivita | **6** | Silná atmosféra: velké fotky přes celou šíři, tmavé „prémiové“ ladění. Působí ale jako šablona Wixu (bílé „záložky“, nesourodé plochy, nečitelný text přes fotky). | **6** | Nad ohybem výborné (hero, fakta, loga). Pod ním ale následuje šestkrát stejný vzorec „štítek – nadpis – mřížka světlých karet“. Působí sterilně, jako šablona pro SaaS, a chybí mu textilní charakter. |
| Vizuální bohatost (obrázky, ilustrace) | **6** | Na Domů 4 fotopásy (hero, laser, záhyby látky ×2) a fotka na pozadí Kontaktu. Podstránky jsou ale holé tmavé mřížky a ilustrace žádné. | **4** | Zbyl jen hero, malý výřez laseru a textura v hlavičkách. Pásy „Co nabízíme“ a „Použití“ zmizely bez náhrady. Jediná „grafika“ jsou ikony 24 px. **Tady v2 proti originálu ztratila.** |
| Typografie | **3** | Anglický Title Case, tenké řezy, zarovnání do bloku, ruční zalomení. | **8** | Jasná škála a správná čeština. Nadpisy H2 jsou ale všude stejně velké, chybí typografický „moment“ mimo hero. |
| Barvy a kontrast | **4** | Výrazná tmavá identita, ale bílý text na světlých fotkách má místy ~2 : 1. | **8** | AA všude. Od druhé obrazovky ale převládá šedobílá a navy s modrou se rozmělnily jen na akcenty. |
| Rozvržení a rytmus sekcí | **4** | Wixové pevné hodnoty, mimostředové bloky, prázdná místa. | **6** | Rozestupy a mřížka jsou čisté, ale rytmus je monotónní. Chybí střídání typů sekcí (fotopás, dělená sekce s obrázkem, seznam, diagram) a Domů je dlouhá řada karet. |
| Navigace a IA | **5** | Srozumitelné menu, ale nelepivá hlavička a v patičce chybí Laser. | **9** | Lepivá hlavička, kotvy, křížové odkazy, logické pořadí sekcí. |
| Přehlednost | **4** | Fakta schovaná v odstavcích, materiály jako 4 nesrovnatelné seznamy. | **9** | Parametry v boxech, srovnávací tabulka, krátké karty. |
| Informační hodnota | **3** | Slogany místo faktů. | **7** | Všechna dostupná fakta jsou vidět. Chybí vysvětlení pojmů (osnova, útek, osnovní vál) a vizuální podání parametrů. Strop tvoří obsah od majitele. |
| Důvěryhodnost | **4** | Loga odběratelů ano. Proti tomu stojí rozpor 25 let × 1997, „© 2024“, fotka s vodoznakem DALL·E a dvojí název firmy. | **6** | Konzistentní a profesionální. Pořád ale bez jediné skutečné fotky firmy a obecné obrázky působí trochu jako z fotobanky nebo AI. |
| Konverze (cesta k poptávce) | **4** | CTA jen nahoře a v patičce, slabý formulář, telefon schovaný. | **9** | CTA i telefon stále po ruce, vzorový formulář, CTA pás na konci stránek. |
| Mobil | **5** | Bez přetečení, ale H1 na 5 řádků a nečitelný text přes fotky. | **8** | Čisté a rychlé. Stránky jsou ale dlouhé a vizuálně jednotvárné (seznam za seznamem). |
| Přístupnost | **4** | Neviditelný fokus polí, menu bez focus trapu, nečitelný kontrast. | **8** | Fokus, `inert`, inline chyby. Stále chybí ověření axe/Lighthouse v reálném prohlížeči. |
| Výkon a technické SEO | **6** | Lehký web, ale hero jako CSS pozadí a fixní pozadí zpomalují. | **9** | `srcset`, výřez písem, titulky, malé přenosy. |
| Čeština a texty | **3** | Title Case, překlepy, smíšené „Vy/vy“. | **8** | Správně a konzistentně. Texty jsou ale suché a obrat „od vývoje … přes … až po …“ se na webu opakuje asi pětkrát. |
| Pohyb a animace | **6** | Scroll-reveal se staggerem, parallax fixních pozadí, zoom hero, „vytahující se“ modré linky. Živé, místy až divadelní (0,9 s, 36 px). | **4** | Jen 12px odhalení hlaviček sekcí a karet a jemný hover na kartách. Pohyb je skoro nepostřehnutelný, chybí parallax i práce s obrázky a web působí staticky. **Tady v2 proti originálu ztratila.** |

**Shrnutí:** v2 je výrazně lepší ve všem, co je „pod kapotou“ (fakta, čitelnost, konverze, přístupnost, výkon, jazyk).
Na úkor toho ztratila **vizuální atmosféru a pohyb**, které originál měl. Oprava je realistická: vrátit fotky jako pásy
(tentokrát s textem na plných panelech), přidat vlastní vektorový ilustrační systém s textilním motivem
a zavést decentní pohybový systém. Nic z toho nesmí rozbít dosažené kvality.

---

## B) Návrhy vylepšení (aspekty, kde má v2 < 8)

### Vizuální dojem / atraktivita (6 → cíl 8)
1. **Hned:**
   - Vrátit 2–3 fotopásy přes celou šíři (laser, záhyby látky) s textem na plném navy panelu.
   - Do Domů zařadit dělenou sekci „fotka + text“.
   - Zavést vlastní ilustrace (tkaní, osnovní vál, řezná dráha laseru, použití) a motiv z loga.
   - Přidat decentní pohyb (R4-13 až R4-17).
2. **Jen majitel:** skutečné fotografie výroby (stavy, snovací stroj, laser, role tkanin, detail vazby) a krátké video bez zvuku.

### Vizuální bohatost (4 → cíl 7–8)
1. **Hned:**
   - Využít všech 5 původních fotek (u `kontakt.webp` jen výřez bez vodoznaku), sjednocených do navy duotónu (R4-02).
   - Vytvořit ilustrační systém „Tkaná linka“ (R4-01):
     - 5 ilustrací služeb;
     - 4 technické diagramy;
     - 8 ilustrací použití;
     - 4 vzorníky materiálů;
     - piktogramy 48 px.
   - Přidat dekorativní tkaný motiv z loga (R4-03).
2. **Jen majitel:** vlastní fotky a vzorky tkanin (nafocené role, vzorník), fotka Ing. Štancla, případně fotky aplikací u zákazníků (se souhlasem).

### Rozvržení a rytmus sekcí (6 → cíl 8)
1. **Hned:**
   - Na Domů střídat typy sekcí v pořadí: tmavý hero → loga → světlé ilustrované karty → **fotopás** → proces s kreslenou linkou →
     vzorníky materiálů → **tmavá sekce s fotopodkladem** → **dělená sekce s fotkou** → modrý CTA pás.
   - Na Službách cikcak: ilustrace střídavě vpravo a vlevo.
   - Každá podstránka dostane aspoň jeden vizuální „kotevní“ prvek.
2. **Jen majitel:** nic.

### Informační hodnota (7 → cíl 8)
1. **Hned:**
   - Diagramy, které vizuálně podají **existující** fakta: osnovní vál s kótami „šíře 90–200 cm“ a „Ø čel do 800 mm“,
     řezná plocha laseru „do 190 cm“ a princip tkaní s popisky „osnova“ a „útek“.
   - Vysvětlení obecných textilních pojmů je obecná znalost, ne tvrzení o firmě, takže je smí obsahovat popisek diagramu.
2. **Jen majitel:** šíře tkanin, plošné hmotnosti, vazby, počet stavů, kapacity, typické lhůty, formáty pro laser a technické listy ke stažení.

### Důvěryhodnost (6 → cíl 7)
1. **Hned:**
   - Jednotné barevné podání obecných fotek (navy duotón), aby působily jako záměrná atmosféra značky, ne jako fotobanka.
   - Žádné popisky, které by naznačovaly „náš stroj“ nebo „naše hala“.
   - Ilustrace jasně čitelné jako ilustrace.
   - Konzistence detailů (stejný styl ikon všude).
2. **Jen majitel:** skutečné fotky (největší přínos), souhlas s uvedením log odběratelů, certifikáty, krátké reference a e-mail na vlastní doméně.

### Pohyb a animace (4 → cíl 8)
1. **Hned:**
   - Pohybový systém s tokeny (R4-13): odhalování se staggerem, pomalý zoom hero, parallax fotopásů (CSS scroll-driven),
     mikrointerakce, kreslení linky procesu a tahů ilustrací, count-up čísel a jemné zobrazení log.
   - Vše vypnuté při `prefers-reduced-motion`.
2. **Jen majitel:** případně krátká smyčka videa ze skutečné výroby místo statického hero (bez zvuku, s plakátem, vypnutá při omezeném pohybu).

---

## C) Specifikace pro implementátora

### Společné zásady (platí pro všechny body R4)
- **Pravdivost:**
  - Žádné nové fakty, čísla ani tvrzení.
  - Ilustrace jsou schematické a obecné: bez loga firmy na strojích, bez fotorealismu, bez čísel mimo existující fakta.
  - Fotky jsou atmosféra: `alt=""` (dekorativní), nikdy popisek typu „náš stroj“ nebo „naše výroba“.
  - Žádné nové AI ani stock fotky.
- **Kontrast:**
  - Běžný text nikdy přímo na světlé fotce, vždy na plném panelu (`--navy-900` / `--navy-800` / bílá).
  - Jediná výjimka je hlavička sekce na fotopodkladu s překryvem ≥ 0,86. Tam změřit nejsvětlejší pixel pod textem: ≥ 7 : 1 pro nadpis, ≥ 4,5 : 1 pro text.
- **Výkon a stabilita:**
  - Animovat jen `transform`, `opacity` a `stroke-dashoffset`.
  - Žádné knihovny; přidané JS ≤ 4 kB nekomprimovaně.
  - CLS ≤ 0,02; LCP (hero) se nesmí zhoršit o víc než 10 %.
- **Bez JS i s `prefers-reduced-motion: reduce`:** veškerý obsah viditelný hned, ilustrace plně nakreslené, čísla v konečné hodnotě, žádný parallax.
- **Úpravy mimo `v2/` jsou zakázané.** Zdrojové fotky čti z `assets/img/` v kořeni a výstupy ukládej do `v2/assets/img/`.

---

### C.1 Vizuální systém

#### R4-01 · P1 · Ilustrační systém „Tkaná linka“ (vlastní vektory a ikonografie)
Jeden konzistentní styl pro všechny nové grafiky. Je odvozený z loga: svislé nitě se smyčkami a vodorovné nitě s přerušením v křížení.

**Úrovně a rozměry**

| Úroveň | Použití | viewBox / zobrazení | Tah | Detail |
|---|---|---|---|---|
| Ikona (stávající) | UI: menu, kontakty, štítky | 24 × 24 / 18–24 px | 1,75 | ≤ 6 cest, jen obrys |
| Piktogram (nové) | návazné služby, hodnoty, materiály laseru | 48 × 48 / 48 px (mobil 40) | 2 | ≤ 10 cest, 1 výplň |
| Spot ilustrace (nové) | karty služeb, dlaždice použití, vzorníky | 160 × 112 / 120–160 px šířky (dlaždice použití 64–80 px) | 2 | ≤ 30 cest, 2 výplně + 1 akcent |
| Diagram (nové) | Služby, Laser – technické schéma s kótami | 480 × 300 / max. 480 px šířky (mobil 100 %, max. výška 200 px) | 2 obrys, 1,5 nitě, 1 kóty | ≤ 80 prvků |

**Pravidla kresby**
- Tah se při zvětšení nemění (`vector-effect: non-scaling-stroke`). Konce i spoje jsou kulaté (`stroke-linecap/linejoin: round`).
- Rohy obdélníků mají `rx` 2–4. Ostré jsou jen kótovací značky.
- Pohled je čistě 2D (zepředu, zboku nebo shora): **bez izometrie, stínů, přechodů a fotorealistických textur**.
  Jediná povolená textura je vzor vazby (síť nití).
- Křížení nití se kreslí jako v logu: horní nit je souvislá a spodní má v místě křížení mezeru 3 jednotky.
  To je podpisový detail celého systému.
- Každá ilustrace má **právě jeden akcentní prvek** v modré: útek, řeznou dráhu, navinuté nitě nebo popruh. Akcent vede oko k podstatě.
- **Žádný text uvnitř SVG.** Popisky a kóty jsou v HTML (`<figure>` / `<figcaption>`, nebo absolutně umístěné `<span>` v mřížce),
  takže jsou čitelné pro čtečky a dobře se škálují.

**Paleta přes CSS proměnné** (SVG používá jen `var(--ill-*)` a `currentColor`)

| Proměnná | Na světlém | Na tmavém |
|---|---|---|
| `--ill-line` (obrys) | `#0b1220` | `#c5cdda` |
| `--ill-muted` (vedlejší linky, kóty) | `#9aa4b8` | `rgba(255,255,255,.35)` |
| `--ill-fill` (hlavní výplň) | `#eef3ff` | `rgba(58,106,253,.14)` |
| `--ill-fill-2` (druhá výplň) | `#ffffff` | `#151d2c` |
| `--ill-accent` | `#3a6afd` | `#8fb0ff` |

Pozadí ilustrace v kartě je `--blue-50` (na světlém) nebo `rgba(58,106,253,.10)` (na tmavém) s radiusem `--radius-card`.

**Soubory a přístupnost**
- Piktogramy a spoty, které se neanimují, patří do spritu `assets/img/illustrations.svg` (`<symbol>`, vkládat přes `<use>`).
- Animované spoty a diagramy vkládat **inline**: kvůli kreslení tahem je potřeba přístup k cestám.
- Velikost: piktogram ≤ 3 kB, spot ≤ 8 kB, diagram ≤ 15 kB.
- Dekorativní grafika má `aria-hidden="true"` a `focusable="false"`.
- Informativní diagram je `<figure>` s `<figcaption>`, která obsah řekne slovy (viz R4-07).
- Cesty, které se mají kreslit, nesou `pathLength="1"` a třídu `draw`. Výplně mají třídu `fill`.

**Seznam grafik (obsah kresby)**
- **Služby (spot 160 × 112):**
  - *Tkaní:* 5 svislých nití osnovy (`--ill-line`) a 4 vodorovné nitě útku (`--ill-accent`) v plátnovém provázání nad a pod, se smyčkami na koncích jako v logu.
  - *Snování:* osnovní vál zboku (válec mezi dvěma kruhovými čely), zleva na něj přicházejí rovnoběžné nitě (akcent), na válu je několik navinutých vrstev.
  - *Vývoj tkaniny:* vazební papír (mřížka 8 × 6) s vyplněnými čtverečky v diagonále kepru (akcent) a vedle něj tužka.
  - *Laserové řezání:* list látky shora s čárkovanou uzavřenou křivkou řezu (akcent) a zjednodušená kuželová hlava laseru s paprskem nad bodem křivky.
  - *Návazné služby:* pruh látky procházející mezi dvěma válci, nad ním kapka (akcent = kapka) a vpravo dvě drobné jiskry (zjasnění).
- **Diagramy (480 × 300, s HTML popisky):**
  - *Princip tkaní:* zvětšené plátnové provázání 6 × 6 s popisky „osnova (podélné nitě)“ a „útek (příčné nitě)“.
  - *Osnovní vál:* pohled zboku s kótami přes šíři „90–200 cm“ a přes průměr čela „do 800 mm“.
    Kóty jsou tenké linky 1 px `--ill-muted` s kulatými značkami na koncích.
  - *Vazební rozvrh:* mřížka 12 × 8 s keprem; popisek „konstrukce · materiálové složení · finální úpravy“ (slova z textu).
  - *Řezná dráha:* pás látky s kótou šíře „do 190 cm“, tři různé vyřezávané tvary (kruh, obdélník se zaoblením a volný tvar) a hlava laseru.
- **Použití (spot, zobrazení 64–80 px, na tmavém):**
  1. auto zboku s akcentem na sedačce;
  2. filtrační vložka se sítí a šipkami toku (akcent šipky);
  3. slunečník s akcentem na okraji stříšky;
  4. řez vrstvami: tkaný podklad + vrstva nánosu (akcent) + váleček;
  5. roll-up stojan s banerem (akcent baner);
  6. batoh (akcent popruh);
  7. malířský stojan s plátnem (akcent plátno);
  8. nit, která se stáčí do otazníku (akcent), pro dlaždici „Máte jiné použití?“.
- **Piktogramy 48 px:**
  - návazné služby: doprava (nákladní auto), optické zjasnění (slunce či jiskra), barvení (kapka), zátěry a nánosy (váleček s vrstvou);
  - hodnoty: kalendář s fajfkou, bubliny, propojené uzly, jednoduchá továrna se šikmými střechami (pro „Česká výroba od roku 1997“; v SVG žádný text ani letopočet);
  - materiály laseru: cívka (syntetické), bavlníková tobolka (přírodní), přeložený list (papír a karton), vrstvené pláty (další materiály).
- **Vzorníky materiálů (spot, R4-10):** čtvercový vzorek látky s roztřepeným spodním okrajem (6 krátkých tahů) a vzorem vazby uvnitř.
  Uprostřed je bílý štítek se zkratkou **PES / PA / PP**; u bavlny je místo zkratky piktogram bavlníkové tobolky
  (web zkratku bavlny neuvádí). Všechny vzorníky mají stejnou vazbu, liší se jen akcentní nití, aby to nevypadalo jako tvrzení o vzhledu materiálu.

#### R4-02 · P1 · Fotografie: výřezy, jednotné barevné podání a pravidla
- **Jednotné podání (navy duotón).** Ze zdrojů v `assets/img/` předgenerovat varianty: v Node přes Playwright a canvas, stejně jako dosavadní výřezy.
  Postup:
  1. jas L = 0,2126 R + 0,7152 G + 0,0722 B;
  2. úrovně: černý bod 0,04, bílý bod 0,96, gama 1,1;
  3. mapování na přechod `#00060f` (0) → `#2a3858` (0,5) → `#dbe4f7` (1);
  4. export WebP, kvalita 72.

  Výsledek sjednotí obecné fotky do jedné „značkové“ atmosféry a odstraní teplý nádech u `nabizime.webp`.
  **`laser.webp` zůstává v přirozených barvách:** červený paprsek je jediný barevný akcent webu. Jen se mírně ztmaví překryvem (viz R4-04).
- **Výřezy a soubory:**

| Zdroj | Výstup | Výřez | Kde |
|---|---|---|---|
| `laser.webp` 1920×800 | `laser-band-800.webp`, `laser-band-1600.webp` | celý, bez výřezu | Domů – fotopás laseru |
| `nabizime.webp` 1920×800 | `nabizime-duo-800.webp`, `nabizime-duo-1600.webp` | celý (2,4 : 1) | Služby – fotopás |
| `nabizime.webp` | `nabizime-duo-sq-560.webp`, `nabizime-duo-sq-800.webp` | čtverec 800×800, střed x = 960 | Domů – Proč Bohemia Textil |
| `pouziti.webp` 1920×800 | `pouziti-duo-800.webp`, `pouziti-duo-1600.webp` | celý | Domů – podklad Použití; Materiály – textura hlavičky |
| `kontakt.webp` 1024×1024 | `kontakt-duo-640.webp`, `kontakt-duo-1024.webp` | **jen horní část 1024×768 (y 0–768)**; vodoznak DALL·E je v pravém dolním rohu (y ≈ 1000–1024) a výřez ho spolehlivě odstraní. Výsledek zkontrolovat očima. | O nás – dělená hlavička; Kontakt – textura hlavičky |

- **Velikost:** varianty 1600 px ≤ 140 kB, 800 px ≤ 60 kB. Vždy `<img>` s `width`, `height`, `srcset` a `sizes`, `loading="lazy" decoding="async"` (kromě hero) a `alt=""`.
- **Ořez a ohnisko** přes `object-fit: cover` a `object-position`: laser `50% 62%` (bod řezu), nabizime `40% 50%`, pouziti `50% 45%`, kontakt `30% 40%`.
- **Text na fotce:** jen na plném panelu. Výjimka (hlavička sekce na podkladu s překryvem ≥ 0,86) viz zásady výše.

#### R4-03 · P2 · Dekorativní motiv „tkaná mřížka“ z loga
- **Motiv:**
  - 5 svislých nití spojených do serpentiny (U-smyčky střídavě nahoře a dole, jako v logu) a 5 vodorovných nití.
  - Křížení s mezerou podle R4-01.
  - viewBox 200 × 200, tah 2, kulaté konce.
  - Jeden inline `<symbol id="weave-mark">` ve spritu.
- **Vzor vazby:** `<pattern>` plátnové vazby s buňkou 24 px a tahem 1. Slouží jako jemný podklad.
- **Umístění (vždy `aria-hidden`, `pointer-events: none`, za obsahem):**
  - Hlavičky podstránek: motiv 360–420 px, vpravo, přesahuje pravou hranu o ~20 %, `--blue-300` s průhledností 0,12. Na mobilu 220 px a průhlednost 0,08.
  - CTA pás: motiv 320 px vpravo, bílá s průhledností 0,10. Na mobilu skrýt.
  - Faktový pás na Domů: vzor vazby, bílá s průhledností 0,04.
  - Patička: motiv 240 px vlevo dole, bílá s průhledností 0,05. Na mobilu skrýt.
- **Kontrast:** motiv nikdy nesmí ležet pod textem s průhledností vyšší než uvedená. Text kontrolovat měřením.

---

### C.2 Umístění vizuálů po stránkách

#### R4-04 · P1 · Domů – ilustrované karty služeb + fotopás „Laserové řezání“
- **Karty služeb:**
  - 4 karty (Tkaní, Snování, Vývoj tkaniny, Návazné služby) v mřížce 4 sloupce (≥ 1200 px), 2 × 2 (768–1199) a 1 sloupec (< 768).
  - Desktop a tablet: nahoře „okno“ ilustrace 100 % × 136 px (`--blue-50`, radius nahoře 12), spot zarovnaný na střed; pod ním nadpis, text a šipka.
  - Mobil: spot 56 px místo dlaždice s ikonou vlevo od nadpisu (výška karty se nezvětší).
  - Odkaz „Přehled služeb →“ přesunout do hlavičky sekce, na desktopu zarovnat vpravo k nadpisu.
- **Fotopás laseru** hned pod mřížkou (patří do stejné sekce):
  - Plná šíře, výška `clamp(380px, 38vw, 540px)`, `laser-band-*.webp`, `object-position: 50% 62%`.
  - Na fotce lehký překryv `linear-gradient(90deg, rgba(0,6,15,.55) 0%, rgba(0,6,15,.15) 60%, rgba(0,6,15,0) 100%)`.
  - Panel vlevo v kontejneru, svisle na střed: `--navy-900`, plný, radius 12, padding 40, max. šířka 520 px.
  - Obsah panelu (vše z existujících textů):
    - eyebrow „Laserové řezání“;
    - H2 „Přesný řez bez roztřepených okrajů“;
    - text „Laserem řežeme textilie do šíře 190 cm. Zvládneme i složité tvary a jemné detaily.“;
    - tlačítko „Více o laserovém řezání →“ (sekundární na tmavém).
  - Mobil < 768: fotka 16 : 10 nahoře (`object-position: 55% 70%`), panel pod ní přes celou šíři s překryvem `margin-top: -32px` (karta přes fotku).
- Tím se laser vrací jako samostatný „moment“ jako v originálu, ale čitelně.

#### R4-05 · P1 · Domů – Použití: ilustrované dlaždice a fotopodklad
- **Podklad sekce:** `pouziti-duo-*.webp`, `object-fit: cover`, přes něj plný překryv `rgba(11,18,32,.86)` a parallax podle R4-14. Změřit kontrast hlavičky (≥ 7 : 1).
- **Dlaždice (desktop ≥ 1024):**
  - 4 sloupce × 2 řádky, výška min. 168 px, `--navy-800` plně neprůhledné, radius 12, padding 24;
  - nahoře spot ilustrace použití 72 × 72 (na tmavé paletě), pod ní text 17 px.
  - Na tabletu 2 sloupce.
- **Mobil:** stávající seznam v jedné kartě zůstává (schválený vzor), jen ikona 24 px se mění na spot 40 px.
- 8. dlaždice „Máte jiné použití? Zeptejte se nás →“ má ilustraci otazníku z nitě a modrý rámeček (beze změny).

#### R4-06 · P2 · Domů – „Proč Bohemia Textil“ jako dělená sekce s fotkou
- **Desktop ≥ 1024, mřížka 5 + 7 sloupců.** Vlevo `nabizime-duo-sq-*.webp` 1 : 1, radius 12.
  Přes pravý dolní roh fotky přesahuje panel `--navy-900` (radius 12, padding 24, posun −24 px dovnitř).
  V panelu je „od roku 1997“ (Montserrat 600, `--fs-stat`, bílá) a pod tím „vyrábíme technické tkaniny“ (14 px, `--text-on-dark`).
- **Vpravo** jsou 4 hodnoty jako seznam s piktogramy 48 px (R4-01), mezi položkami linky `--line`, bez rámečků karet.
- **Mobil:** fotka 16 : 9, panel přesahuje spodní hranu o 24 px a pod ním je seznam.

#### R4-07 · P1 · Služby – diagramy u bloků (cikcak) a piktogramy návazných služeb
- **Bloky Tkaní, Snování, Vývoj tkaniny a Laserové řezání dostanou diagram** (R4-01) v pravém nebo levém sloupci, střídavě (cikcak):
  - Tkaní: diagram vpravo;
  - Snování: vlevo;
  - Vývoj: vpravo;
  - Laser: vlevo.
  - Box „Parametry“ se přesune pod text v textovém sloupci.
- **Diagram** je `<figure>` na `--surface`, radius 12, padding 24, poměr ~16 : 10, s `<figcaption>` (14 px, `--slate-600`):
  - Tkaní: „Princip tkaní: osnova (podélné nitě) a útek (příčné nitě).“
  - Snování: „Osnovní vál: šíře 90–200 cm, průměr čel do 800 mm.“ (kóty v diagramu jako HTML popisky)
  - Vývoj: „Navrhneme konstrukci, materiálové složení i finální úpravy.“
  - Laser: „Řezání textilií do šíře 190 cm.“
- **Mobil:** diagram hned pod nadpisem bloku, max. výška 200 px, potom text a parametry.
- **Návazné služby:** 4 položky jako karty s piktogramem 48 px nad názvem. Mřížka 4 / 2 / 2 sloupce.

#### R4-08 · P2 · Služby – fotopás „O nic se nestarejte“
- **Umístění:** mezi bloky služeb a „Jak spolupráce probíhá“.
- **Fotopás:** `nabizime-duo-*.webp`, plná šíře, výška `clamp(300px, 30vw, 440px)`, parallax podle R4-14.
- **Panel:** stejná komponenta jako v R4-04. Text je původní věta z originálu (opravená čeština, malé „vy“):
  „O nic se nestarejte. Zajistíme pro vás vše od vývoje tkaniny přes snování, tkaní a finální úpravy až po doručení produktu přímo do vaší společnosti.“
  Pod ním odkaz „Jak spolupráce probíhá ↓“ na `#postup` (sekci procesu na Službách doplnit `id="postup"`).
- Je to vstřícný krok k majiteli: vrací jeho oblíbený pás z originálu.

#### R4-09 · P2 · Laserové řezání – diagram řezné dráhy a piktogramy materiálů
- **„Proč řezat laserem“** jako dělená sekce 5 + 7:
  - vlevo diagram „Řezná dráha“ (R4-01), na desktopu `position: sticky; top: 104px`;
  - vpravo 4 výhody jako seznam s piktogramy 48 px.
  - Na mobilu je diagram nad seznamem.
- **„Jaké materiály řežeme“:** karty dostanou piktogram 48 px nad nadpisem (cívka, bavlníková tobolka, přeložený list, vrstvené pláty).
- **Fotka v hlavičce** zůstává. Bez popisku, `alt=""`.

#### R4-10 · P2 · Materiály – vzorníky a textura hlavičky
- **Hlavička:** textura `pouziti-duo-800.webp` místo `hero-800` (průhlednost 0,18, maska zleva) a motiv R4-03 vpravo.
- **Karty materiálů:**
  - Desktop: nahoře vzorník (R4-01), 100 % × 120 px na `--blue-50`, vzorek 88 × 88 na střed.
  - Mobil (seznam v jedné kartě): vzorek 48 px vlevo od názvu.
- **Box „Nevíte, který materiál zvolit?“:** vlevo spot „vazební papír“ 96 px (na mobilu skrytý).

#### R4-11 · P2 · O nás – dělená hlavička s fotkou
- **Hlavička** ve stejné variantě jako Laser (text vlevo, obrázek vpravo):
  - obrázek `kontakt-duo-*.webp` 4 : 3, radius 12;
  - motiv R4-03 částečně za obrázkem.
  - Mobil: obrázek pod perexem, max. výška 220 px.
- **Zbytek stránky** beze změny (citát, „V kostce“, hodnoty). Hodnoty dostanou piktogramy 48 px místo ikon v dlaždici.

#### R4-12 · P3 · Kontakt – atmosféra hlavičky a ilustrace tipu
- **Hlavička:** textura `kontakt-duo-1024.webp` (průhlednost 0,28, maska zprava doleva), jako v originálu, jen bez vodoznaku a čitelněji.
- **Karta „Co do poptávky napsat“:** nahoře spot 96 px „technický list s fajfkami“ (akcent = fajfky). Na mobilu skrytý.

---

### C.3 Pohybový systém („mild“)

#### R4-13 · P1 · Základ: tokeny, odhalování se staggerem a pojistky
- **Tokeny (`:root`):**
  - `--ease-out: cubic-bezier(.22, 1, .36, 1)`, `--ease-in-out: cubic-bezier(.65, 0, .35, 1)`;
  - `--dur-1: 160ms` (barvy), `--dur-2: 280ms` (hover pohyb), `--dur-3: 600ms` (odhalení), `--dur-4: 1200ms` (kreslení);
  - `--stagger: 80ms`, max. 6 kroků (strop 400 ms).
- **Odhalení:**

| Prvek | Pohyb |
|---|---|
| hlavička sekce | `opacity 0→1`, `translateY(16px)→0`, 600 ms ease-out |
| karty a položky v mřížce | totéž se staggerem 80 ms v pořadí DOM |
| fotky v dělených sekcích | `opacity 0→1` + `scale(1.04)→1` uvnitř `overflow: hidden`, 900 ms |
| panely přes fotopás | `translateY(24px)→0`, 700 ms, zpoždění 150 ms |

- **Spouštění:**
  - IntersectionObserver s `threshold: .15`, `rootMargin: '0px 0px -8% 0px'`, jen jednou.
  - Prvky viditelné už při načtení se zobrazí **bez animace**.
  - Na pozici a velikost prvků se nesahá, takže nevzniká posun layoutu.
- **Pojistky:**
  - Třída `js-reveal` jen bez omezeného pohybu (jako dnes).
  - Časová pojistka 3 s odstraní skrytí.
  - Bez JS je vše vidět.
  - Pro tisk vše viditelné (už je).
- **Zákazy:**
  - Nic se neanimuje u textu, který čtenář právě čte (žádné animace navázané na scroll u odstavců).
  - Žádný scroll-jacking. `scroll-behavior: smooth` jen pro kotvy (už je).
  - Žádné nekonečné smyčky (WCAG 2.2.2): okolní efekty běží jednou při vstupu do obrazovky.

#### R4-14 · P1 · Fotky v pohybu: pomalý zoom hero a parallax fotopásů
- **Hero:**
  - Obal fotky dostane animaci `hero-settle`: `scale(1.06)→1`, 1 600 ms `--ease-out`, jednou po načtení. Fotka je viditelná od prvního snímku, takže LCP neovlivní.
  - Text hero se **neanimuje**.
  - Volitelně (≥ 1024 px): jemný posun fotky při scrollu přes CSS scroll timeline, `translateY(0)→8%` během odjetí hero (`animation-timeline: scroll(root)`, rozsah 0–100vh).
- **Fotopásy (R4-04, R4-08) a podklad Použití (R4-05):** parallax přes CSS scroll-driven animace, bez JS:
  ```css
  @supports (animation-timeline: view()) {
    @media (prefers-reduced-motion: no-preference) and (min-width: 768px) {
      .band__media img { animation: band-drift linear both; animation-timeline: view(); animation-range: cover 0% cover 100%; }
      @keyframes band-drift { from { transform: translateY(-5%) scale(1.14); } to { transform: translateY(5%) scale(1.14); } }
    }
  }
  ```
  - Zvětšení 1.14 dává rezervu 7 % výšky na každé straně, takže při posunu o ±5 % nikdy nevykoukne okraj.
  - Prohlížeče bez podpory a mobil < 768 px mají statickou fotku.
  - Panel s textem se nehýbe.
- Fixní pozadí (`background-attachment: fixed` / `position: fixed`) **nepoužívat**: na mobilu nefunguje a zatěžuje vykreslování.

#### R4-15 · P1 · Mikrointerakce hover a focus
Jen pro `@media (hover: hover) and (pointer: fine)`. Fokus z klávesnice dostane stejný vizuální stav plus obrys.

| Prvek | Hover / focus |
|---|---|
| Tlačítka | barva pozadí 160 ms; ikona šipky `translateX(3px)` 200 ms; `:active` `scale(.98)` 80 ms; bez zvedání |
| Odkazové karty | `translateY(-3px)` 280 ms `--ease-out`; stín `0 12px 28px -14px rgba(11,18,32,.28)`; rámeček `--blue-600`; spot ilustrace `translateY(-2px)` a akcent `--blue-600`; šipka `translateX(4px)` |
| Textové odkazy | `text-decoration-thickness 1px→2px`, `text-underline-offset 3px→4px`, 160 ms |
| Navigace | podtržení jako `::after` `scaleX(0→1)` od středu, 220 ms; aktivní stránka trvale |
| Dlaždice použití | pozadí `--navy-800 → #1b2437`, akcent ilustrace `--blue-300`, 200 ms, bez pohybu |
| Řádky tabulky materiálů | pozadí `--surface`, 160 ms |
| Telefon v hlavičce | ikona se jednou jemně „zhoupne“ (`rotate ±8°`, 400 ms), jen při hoveru |

#### R4-16 · P2 · Proces: kreslení linky
- Spojnice kroků (`.steps::before`) začíná na `transform: scaleX(0)` (`transform-origin: left`) a jde do `scaleX(1)`, 1 200 ms `--ease-in-out`.
  Spustí se, když je seznam ze 30 % na obrazovce.
- Kroužky s čísly: `opacity 0→1`, `scale(.6)→1`, 320 ms, zpoždění `100ms + i × 180ms`, takže „naskakují“, jak k nim linka dorazí.
  Nadpis a text kroku: `translateY(8px)→0` se stejným zpožděním + 80 ms.
- Na mobilu je linka svislá (`scaleY`, `transform-origin: top`).

#### R4-17 · P2 · Kreslení ilustrací tahem a bod laseru
- **Spoty a diagramy:**
  - Cesty `.draw` mají `stroke-dasharray: 1; stroke-dashoffset: 1` a jdou do `0`, 1 200 ms `--ease-out`.
  - Akcentní cesta kreslí poslední (zpoždění 300 ms).
  - Výplně `.fill` mají `opacity 0→1`, 400 ms se zpožděním 600 ms.
  - Spouští se jednou při vstupu.
  - Výchozí stav (bez JS a s omezeným pohybem) je nakresleno: skrývání zapíná jen třída `js-draw` na `<html>`.
- **Piktogramy a ikony se nekreslí**, aby to nebylo přeplácané.
- **Bod laseru (diagram řezné dráhy):** po dokreslení křivky po ní jednou projede bod (`circle r=3`, `--blue-500`, `filter: drop-shadow(0 0 4px rgba(58,106,253,.6))`).
  Použít `offset-path` se stejnou cestou a `offset-distance 0%→100%`, 2 400 ms `--ease-in-out`, pak bod zmizí (200 ms).

#### R4-18 · P3 · Count-up čísel ve faktovém pásu
- Platí pro „500 m“, „190 cm“ a „90–200 cm“ (obě čísla). „4 materiály“ zůstává statické.
- Animace od 0 do konečné hodnoty, 900 ms, easeOutCubic (`requestAnimationFrame`). Spustí se při 50% viditelnosti pásu, jednou. Viditelné při načtení: start po 300 ms.
- **Bez posunu layoutu:** `font-variant-numeric: tabular-nums` a před startem nastavit `min-width` na šířku konečné hodnoty.
- **Přístupnost:** viditelné číslo má `aria-hidden="true"` a vedle je `<span class="visually-hidden">500 m</span>`. HTML obsahuje konečnou hodnotu, takže bez JS je vše správně.

#### R4-19 · P3 · Loga odběratelů
`opacity 0→.85`, 500 ms, stagger 80 ms, bez pohybu. Spustí se při 20% viditelnosti, jednou.

#### R4-20 · P3 · Motiv a vzor vazby: jednorázový „lesk“
- **CTA pás:** při vstupu jednou přejede přes akcentní nitě motivu lesk (maska s lineárním přechodem posunutá zleva doprava, průhlednost nití 0,10 → 0,28 → 0,10), 2 400 ms.
- **Hlavičky podstránek:** motiv se při načtení jednou posune `translateX(16px)→0` a `opacity 0→.12`, 1 600 ms.
- Žádné nekonečné smyčky. Při omezeném pohybu je motiv statický.

---

### C.4 Formulář

#### R4-21 · P1 · „Co poptáváte“: nová volba „Jiné“
- Přidat poslední zaškrtávací pole `<input type="checkbox" name="Služba" value="Jiné">` s popiskem **„Jiné“**, za „Návazné služby (barvení, úpravy, doprava)“.
  Skupina pak má 6 položek a v mřížce 2 sloupců vyjdou 3 plné řádky.
- **Po zaškrtnutí** se pod skupinou zobrazí nápověda `#sluzba-jine-hint`:
  **„Napište nám prosím do popisu poptávky, o co jde.“**
  - 14 px, `--slate-600`, s ikonou šipky dolů 16 px. „Popisu poptávky“ je odkaz na `#f-message`; klik přesune fokus do textového pole.
  - Implementace: element s `hidden`, JS ho přepíná podle stavu checkboxu. Checkbox „Jiné“ má `aria-describedby="sluzba-jine-hint"`.
    Element je zároveň v oblasti `aria-live="polite"`, aby čtečka zobrazení ohlásila.
  - Popis poptávky **nepřidávat mezi povinná pole**: nezvyšovat tření.
  - Bez JS se nápověda nezobrazí. Formulář funguje dál, jen bez nápovědy.
- **Odeslání** se nemění. Hodnoty se dál spojují čárkou (`"Služba": "Tkaní na zakázku, Jiné"`), FormSubmit, skrytá pole a `email` (required) zůstávají beze změny.
- **Otestovat s podvrženou odpovědí:** payload s „Jiné“, zobrazení a skrytí nápovědy, Tab pořadí.

---

### C.5 Akceptační kritéria

#### R4-22 · P1 · Kontroly před odevzdáním kola
1. **Screenshoty** všech 7 stránek (desktop i mobil) do `shots/r4-impl/` a navíc 320 / 768 / 1024 / 1920 px. Bez vodorovného posuvníku.
2. **Kontrast:** změřit nejsvětlejší pixel pod každým textem na fotopodkladu (Použití, případné hlavičky). Text ≥ 4,5 : 1, nadpisy na fotopodkladu ≥ 7 : 1.
   Texty v panelech fotopásů jsou na plném navy panelu.
3. **Omezený pohyb** (emulace `reduce`): žádné transformace ani animace, jen změny barev. Ilustrace nakreslené, čísla konečná, fotky statické.
4. **Bez JS:** všechen obsah viditelný, ilustrace nakreslené, formulář odešle nativně (bez nápovědy „Jiné“).
5. **Výkon:**
   - CLS ≤ 0,02;
   - LCP Domů nejvýš o 10 % horší než dnes (měřit stejným skriptem jako v kole 1);
   - Domů celkem ≤ 450 kB (desktop) a ≤ 300 kB (mobil, s lazy loadingem);
   - přidané JS ≤ 4 kB;
   - 0 chyb v konzoli.
6. **Délka stránek na 390 px:** Domů ≤ 7 400 px a Služby ≤ 5 400 px. Vizuály mají na mobilu menší formy (spot vedle nadpisu, diagram max. 200 px).
7. **Pravdivost:**
   - žádný nový fakt;
   - popisky diagramů jen z existujících údajů a obecných pojmů (osnova, útek);
   - žádný popisek u fotek;
   - výřez `kontakt.webp` bez stopy vodoznaku (zkontrolovat zvětšením rohu).
8. **Klávesnice:** fokus viditelný na všech nových interaktivních prvcích; fotopásy a dekorace nejsou fokusovatelné.
9. **Konzistence:** všechny nové grafiky ve stylu R4-01 (tah, kulaté konce, jeden akcent, paleta přes `--ill-*`).
   Žádná se nesmí vymykat stylem, např. jinou tloušťkou tahu nebo stínem.

---

### Doporučené pořadí práce
1. R4-02 (fotky) a R4-01 (styl + 5 spotů služeb jako vzor). Pokud implementátor chce kontrolu stylu, pošle mi spoty, než nakreslí zbytek.
2. R4-04, R4-05 a R4-13 až R4-15 (Domů s pohybem): největší viditelný efekt pro majitele.
3. R4-21 (formulář „Jiné“).
4. R4-07, R4-08, R4-09, R4-06, R4-03, R4-16, R4-17.
5. Zbytek P3.

**Očekávané skóre po kole 4:**

| Aspekt | Dnes | Cíl |
|---|---|---|
| Vizuální dojem | 6 | 8 |
| Vizuální bohatost | 4 | 7–8 |
| Rytmus sekcí | 6 | 8 |
| Informační hodnota | 7 | 8 |
| Důvěryhodnost | 6 | 7 |
| Pohyb | 4 | 8 |

Ostatní aspekty beze změny. Nesmí klesnout přístupnost ani výkon.
