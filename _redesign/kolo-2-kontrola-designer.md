# Kolo 2 – kontrola implementace a nové připomínky

Podklady: `reviews/round-1-impl.md`, screenshoty implementátora (`shots/r1-impl/`), moje nové screenshoty
`shots/r2-review/` (všech 7 stránek desktop + mobil s `-full`, dále `vp-*` pro 320 / 768 / 1024 / 1920 px,
`menu-open-390.png`, `focus-*.png`, `form-*.png`) a skripty `shot/r2-review.mjs`, `shot/r2-focus2.mjs`.
Formulář jsem testoval jen s podvrženou odpovědí FormSubmit (`page.route`), nic se neodeslalo.

**Shrnutí:** obrovský posun. Web teď působí jako věcný a důvěryhodný B2B výrobce: fakta jsou nad ohybem,
služby, proces, materiály a použití jdou rychle přečíst, CTA a telefon jsou stále po ruce, formulář je
vzorový (inline validace, stavy, fokus, správně spojené checkboxy). Konzole je čistá, `noindex` je na všech
stránkách, skrytá pole formuláře jsou beze změny a nic nepřetéká od 320 do 1920 px. Zbývají jen věci
„druhého řádu“: nerovnoměrný faktový pás, dvojí CTA a jedna sporná věta na Materiálech, nevyvážené O nás,
příliš dlouhý mobil a pohodlí tabulky na telefonu.

---

## 1. Ověření bodů R1

| Bod | Stav | Poznámka |
|---|---|---|
| R1-01 Základ CSS | ✅ splněno | Tokeny, komponenty i rytmus sekcí sedí na všech stránkách. Žádné wixové hodnoty ani `br.d`. |
| R1-02 Hlavička a menu | ✅ splněno | Sticky hlavička na všech šířkách. Overlay menu: `inert`, Tab zůstává v hlavičce, Esc vrací fokus na burger. Telefon je na mobilu na jeden tap. |
| R1-03 Hero + fakta | ⚠️ částečně | Obsah, CTA a čitelnost jsou výborné. Faktový pás má nestejné sloupce (304/165/253/195 px) a na 1024 px se „PES · PA · / PP · bavlna“ láme na 2 řádky → R2-01. |
| R1-04 Domů – Služby | ✅ splněno | 5 karet, široká karta laseru s výřezem, kotvy fungují. |
| R1-05 Domů – Použití | ✅ splněno | Tmavá sekce bez fotky, 8 dlaždic, kontrast v pořádku. |
| R1-06 Loga | ✅ splněno | Klidný pás hned pod hero, 2 × 2 na mobilu, bez hover efektu. |
| R1-07 Proces | ✅ splněno | Vodorovně na desktopu, svisle na mobilu, bez lhůt. |
| R1-08 Služby | ✅ splněno | Boxy Parametry, kotvové štítky, laser jako 5. služba, proces a CTA. |
| R1-09 Materiály | ⚠️ částečně | Tabulka i karty jsou z původních dat. Věta „Nejlepší hodnota v řádku je zvýrazněná“ je ale zavádějící (R2-02) a na mobilu je tabulka nepohodlná (R2-06). |
| R1-10 Laserové řezání | ✅ splněno | Dělená hlavička, opravená věta, 4 výhody, materiály, CTA. Ikony – viz odpověď 2 a R2-08. |
| R1-11 Kontakt + formulář | ✅ splněno | Ověřeno: prázdné odeslání → fokus na e-mail s inline chybou; „Odesílám…“; chybový box s odkazy; úspěch s fokusem na nadpis; payload `"Služba":"Tkaní na zakázku, Laserové řezání"`; hidden pole beze změny. |
| R1-12 Kontrast přes fotky | ✅ splněno | Vizuálně OK na všech šířkách; měření implementátora (min. 5,25 : 1) odpovídá tomu, co vidím. |
| R1-13 Čeština | ✅ splněno | Větná velká písmena, malé „vy“, „Bohemia Textil“, nezlomitelné mezery, „od roku 1997“. Drobnosti → R2-12. |
| R1-14 Přístupnost | ✅ splněno | Fokus je viditelný všude (karty celou kartou, logo, patička). Osnova nadpisů logická, dotykové cíle ≥ 44 px. axe/Lighthouse nikdo nespustil – doporučuji před nasazením. |
| R1-15 CTA pás | ✅ splněno | Na Ochraně soukromí ale odebrat (odpověď 4). |
| R1-16 O nás | ⚠️ částečně | Obsah správný, ale krátký text vlevo a vysoká karta „V kostce“ vpravo nechávají velkou prázdnou plochu (R2-04). |
| R1-17 Patička | ✅ splněno | 4 sloupce, Laserové řezání doplněné, správný rok. Drobné doladění → R2-10. |
| R1-18 Hlavička podstránek | ✅ splněno | Jednotná `.page-head` na všech podstránkách. |
| R1-19 Obrázky a výkon | ✅ splněno | `<img>` se `srcset`, hero `fetchpriority`, bez `position: fixed`; řešení pro 1 200px zdroj na 1 920 px vypadá dobře. |
| R1-20 SEO | ✅ splněno | Titulky, `og:*`, JSON-LD s `foundingDate`, křížové odkazy. |
| R1-21 Pohyb | ✅ splněno | Zjemněný reveal, bez zoomu, `reduced-motion` respektován. |
| R1-22 Ochrana soukromí | ✅ splněno | Čitelný text v 760 px, H2 skutečně jako nadpisy. |
| R1-23 Mobil | ⚠️ částečně | Bez přetečení od 320 px, H1 2–3 řádky. Domů má ale na 390 px **8 504 px** (21 obrazovek; originál 4 119 px) → R2-05. |
| R1-24 Písma | ✅ splněno | Výřez latin-ext na češtinu a slovenštinu; 66 kB preloadu je přiměřené. |
| R1-25 Kontakt extra | ✅ splněno | Mapa, vCard (jen údaje z webu), tisk. |
| R1-26 Mikrointerakce | ✅ splněno | Šipky, `aria-current`, `::selection`. `text-wrap: balance` u odstavců → R2-11. |

Žádné regrese (↩️) jsem nenašel. Z původního webu se neztratil žádný fakt.

---

## 2. Odpovědi na otevřené otázky implementátora

1. **Velikost čísel ve faktech.** Na mobilu 22 px jako minimum **schvaluji**, jeden sloupec pod 360 px také.
   Problém je jinde: `repeat(4, auto)` dává na desktopu nestejné sloupce a na 1024 px se první položka láme. Řešení v R2-01:
   převést první fakt na číslo („4 materiály“), sloupce `repeat(4, 1fr)` a zarovnat položky nahoru.
2. **Ikony výhod laseru.** Ano, překreslit do tahové sady (24 px, `stroke-width: 1.75`, zakulacené konce), ať jsou na webu
   jen jedny ikony. Štít s hvězdou u „Čistý řez bez roztřepených okrajů“ významově nesedí – nahradit ikonou řezu
   (nůžky, případně rovná čára s paprskem). Šipky „šíře“, tužku a recyklaci ponechat jako motiv, jen překreslit. Priorita P3 (R2-08).
3. **Křížek místo samostatného tlačítka.** **Schvaluji.** Hlavička jako horní řádek overlaye je čisté řešení a fokus se chová správně.
   Volitelně (P3) při otevření přepnout `aria-label` z „Menu“ na „Zavřít menu“; `aria-expanded` ale stav ohlašuje už teď.
4. **CTA pás na Ochraně soukromí** – **odebrat.** Je to právní stránka a výzva „Máte poptávku?“ hned pod textem o zpracování údajů
   působí nepatřičně. Kontakty jsou v patičce. Pravidlo z R1-15 tímto upřesňuji: „všechny stránky kromě Kontaktu a Ochrany soukromí“.
5. **Menší horní odsazení na Kontaktu** – **schvaluji.** Formulář je díky tomu výš, a to je na cílové stránce správně. Zaveďte ho jako
   token (např. `--section-pad-tight`), ne jako jednorázovou výjimku.
6. **Kontrola tónu nové mikrocopy:**
   - „…vše na jednom místě“ – v pořádku (fráze „na jednom místě“ je i v originále), ale je na webu dvakrát za sebou
     (perex Služeb na Domů i perex hlavičky Služeb). Na Domů ocas „– vše na jednom místě“ vynechte (R2-12).
   - „každý materiál má jiné přednosti“, „Vše zajistíme od vývoje tkaniny až po doručení…“, „Proč řezat laserem“,
     „Na čem nám záleží“, „Přímý kontakt“, „Co do poptávky napsat“ – **OK**, věcné a bez nových tvrzení.
   - Fakta laseru „Bez kontaktu – laser se textilie přímo nedotýká“ a „Složité tvary – i jemné detaily a vzory“ – **OK**, obojí je
     přímo z původního textu.
   - „Česká výroba od roku 1997 – Navazujeme na dlouholetou tradici výroby tkanin v Česku.“ – **OK**.
   - `<abbr title>` u PES/PA/PP – **OK**.
   - **Nepřijatelné:** „Nejlepší hodnota v řádku je zvýrazněná.“ (Materiály) – viz R2-02.
   - **Upravit:** „Sídlo“ v kartě „V kostce“ – viz R2-12.
7. **Textura sekce Použití** – nepotřebujeme, vynechání je správně.
8. **Komentáře `DOPLNIT`** – v pořádku, na stránce se nic nezobrazuje.
9. **Výřez písem** – v pořádku. Typografické znaky („“ – … nezlomitelná mezera) jsou v latin podmnožině, takže se nic nerozbije.
   Riziko u jmen s ł/ő přijímám.

---

## 3. Nové připomínky

### R2-01 · P2 · Domů – faktový pás (sloupce a typ hodnot)
- **Problém:** první položka „PES · PA · PP · bavlna“ je text, ostatní jsou čísla. Na desktopu to vede k nestejným sloupcům
  (304/165/253/195 px), takže svislé pruhy nejsou v rytmu. Na 1024 px se láme „PES · PA · / PP · bavlna“ (tečka na konci řádku)
  a na mobilu nejsou čísla ve dvojicích na stejné výšce (`190 cm` je výš než `90–200 cm`).
- **Proč:** faktový pás je druhá nejdůležitější věc na webu; má působit klidně a přesně, jako technický list.
- **Doporučení:** první fakt přepsat na hodnotu **„4 materiály“** a popisek **„PES · PA · PP · bavlna“** (fakt z webu: 4 materiály).
  Mřížka `grid-template-columns: repeat(4, minmax(0, 1fr))` (≥ 1024), `repeat(2, …)` (360–1023), 1 sloupec pod 360.
  `align-items: start`, všechny hodnoty stejná velikost (`--fs-stat`, na mobilu min. 22 px), popisky max. 2 řádky.
  Mezi „PES · PA · PP · bavlna“ dát nezlomitelné mezery kolem teček, ať se nikdy neláme za tečkou.

### R2-02 · P2 · Materiály – zavádějící popisek tabulky
- **Problém:** perex „Vlastnosti materiálů vedle sebe. Nejlepší hodnota v řádku je zvýrazněná.“ tvrdí víc, než říkají data.
  Zvýrazněné jsou jen 2 buňky převzaté z textu („nejvyšší“, „nejlepší“). V řádcích Hmotnost či Cena by čtenář „nejlepší hodnotu“
  čekal také (např. nízká hmotnost PP), ale zvýrazněná není.
- **Proč:** jde o interpretaci, kterou majitel neuvedl (pravidlo pravdivosti). Technik tomu bude věřit doslova.
- **Doporučení:** text nahradit větou **„Vlastnosti materiálů vedle sebe. Štítkem jsou označené vlastnosti, ve kterých materiál vyniká.“**
  Štítky ponechat jen na „nejvyšší“ a „nejlepší“.

### R2-03 · P2 · Materiály – dvě stejné výzvy za sebou
- **Problém:** box „Nevíte, který materiál zvolit? Navrhneme materiálové složení i konstrukci tkaniny na míru.“ a hned pod ním
  CTA pás „Potřebujete poradit s výběrem materiálu? … Navrhneme vhodné materiálové složení i konstrukci tkaniny.“ říkají totéž.
- **Proč:** opakování působí neučesaně a ředí sílu hlavní výzvy.
- **Doporučení:** box ponechat (vede na `sluzby#vyvoj` – užitečná křížová cesta). CTA pás na Materiálech vrátit na výchozí variantu
  „Máte poptávku?“ se standardním perexem.

### R2-04 · P2 · O nás – nevyvážený dvousloupec
- **Problém:** na 1440 i 1920 px končí text vlevo zhruba na polovině výšky karty „V kostce“. Pod textem zůstává ~350 px prázdné plochy,
  karta je dlouhá (6 položek pod sebou, štítek nad hodnotou).
- **Proč:** stránka O nás má působit sebejistě a úplně; prázdný sloupec vypadá jako chybějící obsah (fotka, kterou zatím nemáme).
- **Doporučení:**
  1. V kartě „V kostce“ dát od 768 px štítek a hodnotu na jeden řádek (`dl` jako grid `8.5rem 1fr`, řádky 12 px nad/pod).
     Karta se tím zkrátí asi o 40 %.
  2. Do levého sloupce pod oba odstavce přidat zvýrazněný citát z původního textu jako `<blockquote>`
     (Montserrat 600, 22–24 px, modrý pruh vlevo, bez uvozovek v textu, uvozovky jako dekorace):
     „Dodací termíny jsou pro nás svaté a pro jejich dodržení děláme maximum.“ – **bez připsání osobě**.
     Hodnotovou kartu „Dodací termíny dodržujeme“ pod tím pak zkrátit na nadpis + „Pro jejich dodržení děláme maximum.“,
     ať se věta neopakuje doslova.
  3. Kartu „V kostce“ ponechat `align-self: start`.

### R2-05 · P2 · Mobil – délka a hustota stránek
- **Problém:** Domů má na 390 px 8 504 px, Služby 5 234 px. Hlavní příčiny: karty s ikonou nad nadpisem (~240 CSS px na kartu),
  obrázek laseru v kartě ~180 px, čtyři karty „Proč Bohemia Textil“ a patička s 13 řádky po 44 px pod sebou.
- **Proč:** na telefonu se k CTA pásu a kontaktům dostane jen málokdo. Hustší layout zlepší přehled bez ztráty obsahu.
- **Doporučení (jen < 768 px):**
  - Karty služeb, hodnot a výhod laseru: ikona 40 px **vlevo od nadpisu** (flex, gap 12 px), padding 20 px, mezera mezi kartami 12 px.
  - Karta laseru: obrázek v poměru 16 : 9, max. 160 px výšky.
  - „Proč Bohemia Textil“: místo karet seznam se 4 položkami (ikona + tučný nadpis + 1 řádek textu) v jedné bílé kartě s linkami.
  - Patička: „Stránky“ ve 2 sloupcích. Logo + věta + CTA zkrátit (CTA v patičce viz R2-10).
  - Cíl: Domů ≤ 6 500 px a Služby ≤ 4 200 px na 390 px, při zachování cílů ≥ 44 px.

### R2-06 · P2 · Materiály – tabulka na telefonu
- **Problém:** na 390 px zabírá lepivý první sloupec ~40 % šířky (150 px), vidět je jen sloupec Polyester a kousek Polyamidu.
  Buňky mají velký padding a řádek „Další vlastnosti“ je kvůli dlouhému textu u bavlny vysoký ~190 px s prázdnými buňkami.
  Pomlčky „—“ mají stejnou barvu jako hodnoty, takže sloupec Bavlna vizuálně „křičí“ prázdnotou.
- **Proč:** srovnání je hlavní užitek stránky; na mobilu má jít posouvat a číst bez námahy.
- **Doporučení (< 768 px):**
  - první sloupec `width: 7.5rem`, text 14 px / 1.35 (dlouhé názvy se zalomí), ostatní sloupce `min-width: 7.5rem`;
  - padding buněk 10/12 px, hodnoty 15 px;
  - řádek „Další vlastnosti“ z tabulky vyjmout (bavlna má tyto vlastnosti ve své kartě nad tabulkou);
  - pomlčky barvou `--slate-600` na 60 % (vizuálně tišší; textová alternativa „neuvádíme“ zůstává).

### R2-07 · P3 · Ochrana soukromí – bez CTA pásu
- **Doporučení:** odebrat `.cta-band` z `ochrana-soukromi` (viz odpověď 4). Mezi posledním odstavcem a patičkou nechat běžné spodní odsazení sekce.

### R2-08 · P3 · Laserové řezání – ikony a opakování „190 cm“
- **Problém:** 4 ikony výhod mají jiný styl než zbytek sady a štít s hvězdou nesedí k „čistému řezu“. Údaj „190 cm“ je nad ohybem
  čtyřikrát (perex, faktová lišta, nadpis karty, text karty).
- **Doporučení:** ikony podle odpovědi 2. První kartu výhod přejmenovat na **„Větší kusy materiálu“** s textem
  „Díky šíři do 190 cm můžeme řezat i větší kusy materiálu, aniž bychom museli dělat kompromisy v kvalitě nebo přesnosti.“
  Číslo tak zůstane ve faktové liště a v textu, ale nebude v nadpisu.

### R2-09 · P3 · Boxy s modrým pruhem a odsazení seznamu
- **Problém:** boxy „Parametry“, „Co navrhneme“, „Co do poptávky napsat“, „V kostce“ a „Nevíte, který materiál…“ mají pruh vytvořený
  přes `border-left` + `border-radius`, takže se pruh v rozích ohýbá. Seznam s fajfkami v boxu „Co do poptávky napsat“ je odsazený
  o ~46 px proti nadpisu.
- **Doporučení:** pruh jako `::before` (absolutně, `left: 0; top: 16px; bottom: 16px; width: 4px; border-radius: 2px`), box s běžným rámečkem.
  Seznam s fajfkami `padding-left: 0`, ikona zarovnaná s levou hranou nadpisu.

### R2-10 · P3 · Patička a hlavička – zdvojené CTA
- **Problém:** na všech stránkách s CTA pásem následuje hned pod ním v patičce další „Nezávazná poptávka“. Na Kontaktu vedou tlačítko
  v hlavičce i v patičce na stejnou stránku. Na desktopu mají odkazy v patičce řádky 44 px, takže sloupec „Stránky“ je zbytečně vysoký.
- **Doporučení:**
  - tlačítko v patičce odebrat (věta „Český výrobce technických tkanin od roku 1997.“ zůstane);
  - na Kontaktu odkázat CTA v hlavičce na `#poptavka` (id na kartě formuláře);
  - v patičce při `(pointer: fine)` výška řádků 36 px, při dotykovém ovládání 44 px.

### R2-11 · P3 · Zalamování odstavců
- **Problém:** `text-wrap: balance` je i na krátkých odstavcích v kartách („Setkáte se u nás / s přátelským přístupem / a vstřícným jednáním.“
  na Domů, kroky procesu). Řádky jsou proto výrazně užší než karta a text působí useknutě.
- **Doporučení:** `balance` jen pro `h1–h3` a eyebrow; pro `p` použít `text-wrap: pretty`.

### R2-12 · P3 · Drobnosti v textech
- „Sídlo“ v kartě „V kostce“ → **„Adresa“**. „Sídlo“ je právní pojem a původní web uvádí jen adresu.
- Domů, perex sekce Služby: vynechat „– vše na jednom místě“ (fráze je o obrazovku dál znovu v hlavičce Služeb).
- Hint u množství: „Např. 1 500 m. Minimální zakázka tkaní je 500 m.“ se láme jako „…tkaní / je 500 m.“
  Dát nezlomitelnou mezeru „je&nbsp;500&nbsp;m“, případně zkrátit na „Např. 1 500 m (tkaní od 500 m).“.
- Laser, hlavička: eyebrow „Služby“ je v pořádku; drobečková navigace se nepožaduje.

### Poznámka k nasazení (pro orchestrátora, ne bod pro implementátora)
Při povýšení `v2/` do kořene změnit `_next` na `https://www.bohemiatextil.cz/kontakt?odeslano=1`, odstranit `noindex`
a z `robots.txt` řádek `Disallow: /v2/`. Před nasazením spustit Lighthouse/axe na reálném prohlížeči.

---

## 4. Aktualizované hodnocení

| Oblast | Kolo 1 | Kolo 2 | Poznámka |
|---|---|---|---|
| Vizuální design a hierarchie | 5 | 8 | Jasný rytmus tmavá/světlá/modrá, jednotné komponenty |
| Typografie | 4 | 8 | Sjednocená škála, větná velká písmena; drobnosti se zalamováním |
| Barvy a kontrast | 4 | 9 | Bez textu přes světlé fotky, tokeny dodržené |
| Layout a rozestupy | 4 | 8 | Faktový pás a O nás ještě ladit |
| Navigace a IA | 5 | 9 | Sticky hlavička, kotvy, křížové odkazy, logická IA |
| Přehlednost / scannability | 4 | 8 | Parametry a tabulka; mobilní tabulka ladit |
| Informační hodnota | 3 | 7 | Maximum z dostupných faktů; strop je obsah od majitele |
| Důvěryhodnost | 4 | 6 | Profesionální dojem, ale bez reálných fotek a parametrů výroby (závisí na majiteli) |
| Konverzní cesta | 4 | 9 | CTA všude, výborný formulář, telefon na jeden tap |
| Mobil | 5 | 7 | Čisté a bez chyb, ale příliš dlouhé |
| Přístupnost | 5 | 8 | Fokus, `inert`, inline chyby; chybí ještě běh axe/Lighthouse |
| Výkon a technické SEO | 6 | 9 | Lehké, `srcset`, výřez písem, titulky |
| Mikrocopy a čeština | 3 | 8 | Opraveno; drobnosti v R2-12 |

VERDIKT: DALŠÍ KOLO
