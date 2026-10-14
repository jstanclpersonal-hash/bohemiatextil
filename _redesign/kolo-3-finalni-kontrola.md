# Kolo 3 – závěrečná kontrola redesignu

Podklady: `reviews/round-2-impl.md`, screenshoty implementátora (`shots/r2-impl/`) a moje nové screenshoty
`shots/r3-review/`: všech 7 stránek na desktopu i mobilu s `-full`, dále `vp-*` pro 320 / 768 / 1024 / 1920 px,
`menu-open-390.png`, `focus-*.png`, `form-*.png` a `laser-card-390.png`.
Skripty jsou v `shot/`: `r3-review.mjs` (stejné kontroly jako v kole 2) a `r3-cards.mjs`.
Formulář jsem testoval jen s podvrženou odpovědí FormSubmit, nic se neodeslalo.

**Výsledek kontrol:**
- **Technika:**
  - Všech 7 stránek vrací HTTP 200 a nemá chyby v konzoli ani v síti.
  - Na 320, 768, 1024 a 1920 px nic nepřetéká do strany.
  - Každá stránka má jednu H1 a `noindex`.
- **Ovládání:**
  - Mobilní menu: Tab zůstává v hlavičce a Esc vrací fokus na burger. `aria-label` se přepíná mezi „Zavřít menu“ a „Menu“.
  - Fokus je viditelný na všech prvcích.
  - CTA v hlavičce vede na stránce Kontakt na `#poptavka`.
  - CTA pás chybí jen na Kontaktu a Ochraně soukromí, jak má.
- **Formulář:**
  - Prázdné odeslání skočí na pole e-mail a ukáže inline chybu.
  - Ověřil jsem stavy „Odesílám…“, chyba a úspěch (fokus na nadpis).
  - Payload obsahuje `"Služba":"Tkaní na zakázku, Laserové řezání"`.
  - Skrytá pole, `_next` a endpoint jsou beze změny.
- **Pravdivost:**
  - Viditelný text jsem porovnal s kolem 2. Nové jsou jen „4 materiály“ (web uvádí právě 4), „Adresa“, „Větší kusy materiálu“ (přeformulovaný původní text), štítek „příjemný na omak“ (z původní stránky Materiály) a zkrácené věty z původního obsahu.
  - Žádné vymyšlené tvrzení jsem nenašel.

---

## 1. Ověření bodů R2 a zbytků z R1

| Bod | Stav | Poznámka |
|---|---|---|
| R2-01 Faktový pás | ✅ splněno | Čtyři stejné sloupce od 1024 px, 2 × 2 na tabletu i mobilu. Hodnoty jsou na stejné výšce a „PES · PA · PP · bavlna“ se nikde neláme. Na 1024 px „90–200 cm“ s rezervou vejde. |
| R2-02 Popisek tabulky | ✅ splněno | Nový text odpovídá datům. |
| R2-03 Dvojí výzva | ✅ splněno | Box „Nevíte, který materiál zvolit?“ zůstal, pod ním je standardní CTA pás. |
| R2-04 O nás | ✅ splněno | Citát vyplnil levý sloupec a karta „V kostce“ je kompaktní. Stránka je vyvážená na 1440 i 1920 px. |
| R2-05 Délka na mobilu | ✅ splněno | Domů má 6 477 px a Služby 4 180 px (ověřeno). Rytmus zůstal čitelný. |
| R2-06 Tabulka na telefonu | ✅ splněno | Vidět jsou 2 celé sloupce hodnot, pomlčky jsou tišší. Řádek „Další vlastnosti“ viz otázka 3. |
| R2-07 Ochrana soukromí bez CTA | ✅ splněno | |
| R2-08 Ikony laseru, „190 cm“ | ✅ splněno | Ikony jsou v jednotné tahové sadě, nůžky sedí k „čistému řezu“ a nadpis „Větší kusy materiálu“ je dobrý. |
| R2-09 Boxy s pruhem | ✅ splněno | Pruh se v rozích neohýbá, fajfky jsou zarovnané s nadpisem. |
| R2-10 Zdvojené CTA | ✅ splněno | V patičce už tlačítko není, na Kontaktu vede CTA na `#poptavka`, řádky patičky mají 36 / 44 px. |
| R2-11 Zalamování | ✅ splněno | Vysvětlení s nezlomitelnými mezerami v úzkých kartách beru, na mobilu se problém už nevyskytuje. |
| R2-12 Drobnosti | ✅ splněno | |
| R1-03 Hero + fakta | ✅ splněno | Přes R2-01. |
| R1-09 Materiály | ✅ splněno | Přes R2-02, R2-03 a R2-06. |
| R1-16 O nás | ✅ splněno | Přes R2-04. |
| R1-23 Mobil | ✅ splněno | Přes R2-05. Bez přetečení od 320 px, dotykové cíle ≥ 44 px. |

Žádné regrese.

---

## 2. Odpovědi na otázky implementátora

1. **Minimum `--section-pad` 48 px pod 800 px** – **schvaluji.** Sekce se na mobilu oddělují i střídáním barev pozadí
   (tmavá / světlá / bílá / modrá), takže 48 px stačí a stránka působí kompaktně, ne natěsnaně.
2. **Jedna karta se seznamem na mobilu (Použití, Materiály, hodnoty)** – **schvaluji, včetně tmavého seznamu Použití.**
   Řádky 56 px s ikonou v dlaždici se dobře čtou a poslední položka „Máte jiné použití? Zeptejte se nás“ s modrým rámečkem
   je jasně odlišená jako výzva. U Materiálů dělí linky karty čistě. Je to konzistentní vzor a zkrátil stránku bez ztráty obsahu.
3. **Řádek „Další vlastnosti“ na desktopu** – **ano, odstranit i na desktopu.** Teď, když má karta Bavlna všechny 4 vlastnosti
   (včetně „příjemný na omak“), je řádek duplicitní. Zbytečně přidává 3 prázdné buňky a liší se od mobilu. Tabulka má srovnávat;
   vlastnosti, které má jen jeden materiál, patří do jeho karty. Fakt „příjemný na omak“ tím nezmizí. Tabulka tak bude na všech šířkách stejná.
   Odstranit stačí jen tento řádek: řádek „Tepelná vodivost“ s hodnotou „nízká“ u bavlny zůstane. (Nezávazné, viz R3-02.)
4. **axe/Lighthouse** – beru na vědomí. Je to úkol k nasazení, ne k tomuto kolu (viz poznámka na konci).

---

## 3. Nové připomínky

Žádné P1 ani P2. Dvě drobnosti P3, které **neblokují schválení**; implementátor je může udělat v rámci úklidu:

### R3-01 · P3 · Domů a Služby (mobil < 768 px) – zarovnání karty laseru
- **Problém:** v mřížce služeb na Domů je obsah karty „Laserové řezání“ na mobilu odsazený o 20 px víc než u ostatních karet
  (nadpis na x = 109 px místo 89 px na 390 px i 320 px). Obrázek je navíc zanořený do vnitřního okraje. Ikony a nadpisy pěti karet
  proto netvoří jednu svislou linii (`shots/r3-review/laser-card-390.png`).
- **Doporučení:** pod 768 px dát textové části karty laseru stejný padding jako ostatním kartám (20 px). Obrázek buď roztáhnout
  přes celou šíři karty nahoře (radius jen horním rohům, stejně jako na desktopu, kde je obrázek u levé hrany), nebo ho odsadit stejně jako text.

### R3-02 · P3 · Materiály – odstranit řádek „Další vlastnosti“ i na desktopu
- Viz odpověď 3. Odstraněním se stejně sjednotí tabulka na všech šířkách.

---

## 4. Závěrečné hodnocení

| Oblast | Kolo 1 | Kolo 2 | Kolo 3 | Poznámka |
|---|---|---|---|---|
| Vizuální design a hierarchie | 5 | 8 | 9 | Jednotný systém, klidný rytmus sekcí |
| Typografie | 4 | 8 | 9 | Čistá škála, dobré zalamování |
| Barvy a kontrast | 4 | 9 | 9 | AA všude, kde jsem měřil |
| Layout a rozestupy | 4 | 8 | 9 | Fakta a O nás vyřešené; zbývá drobnost R3-01 |
| Navigace a IA | 5 | 9 | 9 | |
| Přehlednost / scannability | 4 | 8 | 9 | Parametry, tabulka, seznamy na mobilu |
| Informační hodnota | 3 | 7 | 7 | Maximum z dostupných faktů; víc dodá jen majitel |
| Důvěryhodnost | 4 | 6 | 7 | Profesionální a konzistentní; skutečné fotky by ji dále zvýšily |
| Konverzní cesta | 4 | 9 | 9 | |
| Mobil | 5 | 7 | 9 | O ~24 % kratší, přehledné seznamy |
| Přístupnost | 5 | 8 | 8 | Ještě chybí běh axe/Lighthouse v reálném prohlížeči |
| Výkon a technické SEO | 6 | 9 | 9 | |
| Mikrocopy a čeština | 3 | 8 | 9 | |

VERDIKT: SCHVÁLENO

---

## 5. Volitelně později (neblokuje)

- R3-01 a R3-02 výše (drobné doladění, ~15 minut práce).
- Před nasazením spustit axe a Lighthouse v reálném Chrome (mobil i desktop) a opravit případné nálezy.
- Při povýšení `v2/` do kořene:
  - `_next` → `https://www.bohemiatextil.cz/kontakt?odeslano=1`;
  - odstranit `noindex`;
  - z `robots.txt` odstranit `Disallow: /v2/`;
  - zkontrolovat `sitemap.xml`.
  - Upozornění: `build.mjs` při novém spuštění přepíše ruční úpravy HTML. Buď ho přenést do repozitáře, nebo dál upravovat jen statické soubory.
- Až majitel dodá obsah ze seznamu „Obsah k doplnění od majitele“ (kolo 1, kap. 5): skutečné fotky výroby, parametry tkaní
  a laseru a chybějící hodnoty tabulky. Fotky patří do hero, do karty laseru a na O nás (místo citátu nebo vedle něj).
- Právní revize textu Ochrany soukromí (správce, právní základ, doba uložení, práva subjektu údajů).
- E-mail na vlastní doméně místo `@tiscali.cz`.

---

## 6. Shrnutí pro majitele

- **Hned je jasné, co vyrábíte.** První obrazovka říká „Technické tkaniny na zakázku“ a hned pod ní stojí hlavní fakta:
  4 materiály, minimální zakázka 500 m, šíře osnovních válů 90–200 cm a laserové řezání do 190 cm.
  Původní web tu měl jen obecné slogany.
- **Poptat je snazší.** Tlačítko „Nezávazná poptávka“ a telefon jsou stále nahoře na obrazovce, i když návštěvník posouvá stránku.
  Na mobilu stačí jedno ťuknutí a volá vám. Každá stránka končí výzvou k poptávce s telefonem a e-mailem.
- **Formulář vede k užitečné poptávce.** Zákazník rovnou zaškrtne službu a vybere materiál a množství. Formulář mu poradí, co ještě napsat,
  upozorní ho na chybu v e-mailu a jasně potvrdí odeslání. Zprávy vám dál chodí na stejný e-mail.
- **Materiály jdou porovnat.** Místo čtyř samostatných seznamů je přehledná tabulka vlastností vedle sebe, která funguje i na telefonu.
- **Služby a postup jsou srozumitelné.** Každá služba má své parametry na jednom místě. Nová sekce „Jak spolupráce probíhá“ ukazuje
  cestu od poptávky po dodání. Laserové řezání je teď vidět i na stránce Služby.
- **Čeština a jednotnost.** Opravili jsme překlepy a velká písmena v nadpisech. Název firmy je všude stejně („Bohemia Textil“)
  a rozpor „25 let“ × „od roku 1997“ nahradil údaj „od roku 1997“.
- **Web je čitelný a rychlý.** Texty už nejsou na světlých fotkách, kde se špatně četly. Stránky se rychle načítají
  a dobře se ovládají na telefonu i klávesnicí. Fotka s vodoznakem DALL·E je pryč.
- **Co by web ještě posílilo:** skutečné fotografie vaší výroby a strojů, a pokud je máte, další technické parametry
  (např. šíře tkanin a plošné hmotnosti). Nic z toho jsme si nevymýšleli, proto na webu zatím nejsou.
