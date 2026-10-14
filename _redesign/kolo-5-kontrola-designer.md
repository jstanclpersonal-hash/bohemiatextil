# Kolo 5 – kontrola vizuálů a pohybu (větev `v2-visuals`)

**Podklady:** `reviews/round-4-impl.md`, screenshoty implementátora `shots/r4-impl/` a moje nové `shots/r5-review/`:
- všech 7 stránek desktop + mobil s `-full`;
- `checks/zoom-*` – ilustrace v 2× zvětšení;
- `checks/motion-*` – snímky uprostřed animací (hero, karty služeb, proces, bod laseru);
- `checks/reduce-*` a `checks/nojs-*`;
- `checks/vp-*` pro 320 / 768 / 1024 / 1920;
- `checks/jine-*` pro 320–1920;
- `checks/why-*`.

**Skripty** (v `shot/`): `r5-review.mjs`, `r5-parallax.mjs`, `r5-why768.mjs`. Formulář jen s podvrženou odpovědí, nic se neodeslalo.

**Naměřeno:**
- **Omezený pohyb:** 0 běžících animací, 0 skrytých textů, 0 nedokreslených cest (Domů, Služby, Laser).
- **Bez JS:** 0 skrytých textů a ilustrace nakreslené. Běží jen čistě CSS animace hero a parallaxu, což je v pořádku.
- **Parallax fotopásu laseru:** posun −27 → +27 px během průjezdu pásu obrazovkou (při `scale(1.14)`), mimo pás stojí. Opravdu decentní.
- **Proces:** všechny texty kroků jsou plně viditelné až **1,74 s** po vjetí sekce do obrazovky (viz R5-02).
- **„Jiné“:** nápověda „Napište nám prosím do popisu poptávky, o co jde.“ se zobrazí na 320, 768, 1024 i 1920 px.
- **Celkově:** 0 chyb v konzoli, 0 vodorovného přetečení.
- **Artefakt screenshotu:** prázdná plocha nad panelem „od roku 1997“ ve full-page snímku na 768 px je jen líné načítání. Po doscrollování se fotka načte (`why-768.png`).

**Celkový dojem:** tohle je kolo, které web posunulo nejvíc.
- Domů má rytmus: tmavý hero → loga → ilustrované karty → fotopás laseru → proces → vzorníky → tmavé Použití s ilustracemi → dělená sekce s fotkou → modrý CTA pás.
- Diagramy na Službách a Laseru působí jako **technické výkresy, ne klipart**. Jsou přesné, střídmé a s kótami. To je přesně tón, který výrobci technických tkanin sedí.
- Pohyb je skutečně „mild“.
- Zbývají dvě věcné vady (vzorníky připomínají čip; proces zdržuje text) a pár drobností v kresbě.

---

## 1. Ověření bodů R4

| Bod | Stav | Poznámka |
|---|---|---|
| R4-01 Ilustrační systém | ⚠️ částečně | Styl je jednotný: tah, kulaté konce, jeden akcent, paleta `--ill-*`. Diagramy a ilustrace služeb jsou výborné. Vzorníky materiálů ale čtou jako mikročip (R5-01). Malé formy spotů jsou na mobilu přehuštěné a vedle nich přežívají staré ikony (R5-03). |
| R4-02 Fotky | ✅ splněno | Duotón sjednotil atmosféru a teplý nádech `nabizime` zmizel. Výřez `kontakt` je bez vodoznaku a laser zůstal barevný jako jediný barevný akcent. Velikosti jsou malé, `srcset` je správně. |
| R4-03 Motiv tkané mřížky | ✅ splněno | Je decentní a na CTA pásu a v hlavičkách funguje. Drobnost na O nás a Laseru viz R5-06. |
| R4-04 Domů – služby + fotopás | ✅ splněno | Karty s okny ilustrací jsou nejsilnější nová partie. Panel fotopásu je plně neprůhledný. |
| R4-05 Použití | ✅ splněno | Fotopodklad s překryvem je čitelný. Dvě ilustrace jsou slabší (R5-05). |
| R4-06 Proč Bohemia Textil | ✅ splněno | Dělená sekce s panelem „od roku 1997“ vypadá dobře na desktopu i mobilu. |
| R4-07 Služby – diagramy | ✅ splněno | Cikcak funguje. Diagramy tkaní, snování a laseru jsou věcně správné. Popisky mají drobnosti (R5-04). |
| R4-08 Fotopás „O nic se nestarejte“ | ✅ splněno | Vrací majiteli jeho oblíbený pás, tentokrát čitelně. |
| R4-09 Laser | ✅ splněno | Sticky diagram s výhodami a bod laseru po křivce působí elegantně a nepřeháněně. |
| R4-10 Materiály | ⚠️ částečně | Hlavička s texturou a motivem je OK. Vzorníky viz R5-01. |
| R4-11 O nás | ✅ splněno | Fotka v hlavičce je ale velmi tmavá a málo „mluví“ (R5-06). |
| R4-12 Kontakt | ✅ splněno | |
| R4-13 Pohybový základ | ✅ splněno | Tokeny, stagger 80 ms, posun 16 px, jen jednou. Pojistky fungují. |
| R4-14 Hero a parallax | ✅ splněno | `hero-settle` je jemný, parallax ±27 px jen od 768 px. Vynechání posunu hero schvaluji (zdroj má jen 1 200 px). |
| R4-15 Mikrointerakce | ✅ splněno | |
| R4-16 Kreslení linky procesu | ⚠️ částečně | Linka a kroužky jsou pěkné, ale text čeká na linku až 1,74 s (R5-02). |
| R4-17 Kreslení ilustrací + bod laseru | ✅ splněno | Kreslí se od 768 px. Mobil je statický, viz odpověď 1. |
| R4-18 Count-up | ✅ splněno | Bez posunu layoutu, čtečky dostanou konečnou hodnotu. |
| R4-19 Loga | ✅ splněno | |
| R4-20 Lesk motivu | ✅ splněno | Jednorázový a sotva postřehnutelný. Tak je to správně. |
| R4-21 „Jiné“ | ✅ splněno | Nápověda, odkaz s přesunem fokusu, `aria-live`, payload `"Tkaní na zakázku, Jiné"`. |
| R4-22 Akceptační kontroly | ✅ splněno | Ověřil jsem namátkově (omezený pohyb, bez JS, šířky, kontrast hlavičky Použití, konzole). Délky na mobilu: Domů 7 055 px a Služby 5 395 px, obojí v limitu. |

**Pravdivost:** v pořádku.
- Diagramy ukazují jen čísla z webu:
  - šíře osnovních válů 90–200 cm je kótovaná mezi čely válu (správně);
  - „do 800 mm“ je kótované přes výšku čela, tedy průměr čela (správně);
  - laser „do 190 cm“ je kótovaný jako šíře pásu látky (správně).
- Legendy používají jen obecné pojmy (osnova, útek). Fotky nemají popisky ani alt a nic netvrdí o vlastní výrobě.
- Panel „od roku 1997 / vyrábíme technické tkaniny“ odpovídá textu O nás.

---

## 2. Odpovědi na otázky implementátora

1. **Kreslení jen od 768 px, na mobilu statické ilustrace** – **schvaluji.** Na mobilu jsou ilustrace malé a kreslení by bylo spíš rušivé než přínosné. Řešení `non-scaling-stroke` jen u nekreslených grafik je rozumné.
   Podmínka: tah kreslených grafik nesmí na žádné šířce ≥ 768 px klesnout pod 1,5 px ani přesáhnout 2,5 px. Na 768–1023 px diagram ověřte.
2. **Úpravy Služeb na mobilu** – **schvaluji všechny čtyři:**
   - legendy jsou na mobilu skryté jen vizuálně;
   - diagram má šířku 256 px a je čitelný: kóty „90–200 cm“ a „do 800 mm“ jsou na 390 px dobře vidět;
   - kotvy jsou v posuvném řádku;
   - box „Co navrhneme“ je odebraný.

   Jediná výhrada: posuvný řádek kotev nemá náznak, že pokračuje doprava. Viz R5-07.
3. **Nepoužitý spot „Laserové řezání“** – **ve fotopásu ho nepoužívat**, fotka laseru je tam silnější.
   Využijte jeho zjednodušenou verzi jako symbol laseru v sadě malých symbolů (R5-03), například v nadpisu bloku „Laserové řezání“ na Službách. Pokud ho nevyužijete, z buildu ho odstraňte a nenechávejte mrtvý kód.
4. **Text kroků procesu čeká na linku** – **ano, ukazujte text hned.** Animujte jen linku a kroužky. Text kroku smí nanejvýš jednou krátce naběhnout (opacity + 8 px, 300 ms, stagger 60 ms, celkem ≤ 600 ms) bez vazby na postup linky. Podrobně v R5-02.

---

## 3. Nové připomínky

### R5-01 · P2 · Vzorníky materiálů vypadají jako mikročip (Domů, Materiály, mobil)
- **Problém:** čtverec s mřížkou, uprostřed zaoblený rámeček s nápisem PES / PA / PP a dole řada pravidelných svislých čárek na vodorovné lince. V 1 : 1 to čte jako integrovaný obvod s nožičkami, ne jako vzorek látky. Na mobilu (48 px) ještě víc.
  U bavlny vypadá tobolka v rámečku jako ikona domečku.
- **Proč:** je to první obrázek, který zákazník u materiálů vidí. Mylná asociace s elektronikou podkopává jinak velmi profesionální ilustrační jazyk.
- **Doporučení:**
  - **Okraj:** vzorek kreslit jako kus látky s **cikcak okrajem po vroubkovacích nůžkách** (klasický textilní vzorník) na pravé a spodní straně, místo řady čárek. Žádná vodorovná linka pod okrajem.
  - **Tvar:** levý horní roh zahnutý (trojúhelník ve `--ill-fill-2`). Celý vzorek otočit o −6°, aby nepůsobil jako technická součástka.
  - **Vazba uvnitř:** ponechat, ale řidší (buňka asi 8 jednotek místo dnešních asi 5). Akcentní nit nechat jako jediný rozdíl mezi materiály.
  - **Štítek PES / PA / PP:** vyjmout z vnitřku vzorku a dát ho jako malý visací štítek (obdélník se zaobleným rohem a dírkou, provázek 1 px) přes pravý horní roh. Text dál v HTML.
  - **Bavlna:** místo tobolky v rámečku dejte štítek bez textu s malou tobolkou, nebo štítek „CO“ jen jako vizuální značku s `aria-hidden` (v textu karty zůstává „Bavlna“). Preferuji tobolku bez rámečku.
  - **Ověření:** přiložit 1 : 1 výřez všech 4 vzorníků na světlé (120 px okno) i v mobilní formě (48 px).

### R5-02 · P2 · Proces: text kroků se zobrazuje až s linkou (až 1,74 s)
- **Problém:** krok 5 je čitelný až 1,74 s po vjetí sekce do obrazovky (`motion-steps-600.png` ukazuje kroky 3–5 ještě prázdné). Čtenář, který rychle scrolluje, vidí na chvíli prázdnou sekci. Porušuje to i vlastní pravidlo „žádný pohyb u textu, který se čte“.
- **Doporučení:**
  - Nadpisy a texty kroků jsou vidět hned; nejvýš sdílí běžné odhalení sekce (16 px, 600 ms, stagger 60 ms, celkem ≤ 600 ms).
  - Linka (1 200 ms) a kroužky (`scale .6 → 1` se zpožděním po linkou) zůstávají jako ozdoba.
  - Kroužky musí mít výchozí velikost a místo v layoutu i během animace, aby se text pod nimi neposouval.

### R5-03 · P3 · Malé formy symbolů služeb a souběh dvou sad
- **Problém:**
  - Spoty služeb zmenšené na 56 px (mobilní karty na Domů) jsou přehuštěné. Vývoj tkaniny je „zrnitý čtverec“, Tkaní hustá modrá síť.
  - Na Službách mají nadpisy bloků ještě staré ikony 24 px (šrafovaný čtverec, žárovka atd.). Stejná služba má tak na webu dva různé symboly.
- **Doporučení:**
  - Nakreslit **kompaktní varianty** 5 symbolů služeb ve stylu piktogramů (viewBox 48, tah 2, ≤ 10 cest, 1 akcent):
    - Tkaní: 3 svislé a 3 vodorovné nitě s křížením;
    - Snování: vál se 3 nitěmi;
    - Vývoj: mřížka 4 × 3 s diagonálou a tužkou;
    - Laser: hlava s paprskem a čárkovaný oblouk (ze spotu laseru);
    - Návazné služby: kapka nad válečkem.
  - Použít je v mobilních kartách na Domů, v nadpisech bloků na Službách a volitelně v kotvových štítcích. Staré ikony služeb ze `icons.svg` odstranit.

### R5-04 · P3 · Diagramy: umístění kót a zdvojené popisky
- **Kóty:**
  - Laser: popisek „do 190 cm“ leží na pravé hraně pásu látky a bílé pozadí popisku obrys přerušuje. Dejte popisek **vpravo od kótovací čáry**, svisle na střed, stejně jako v technickém výkresu.
  - Snování: popisek „do 800 mm“ je mezi čelem a kótovací čarou, hned vedle osy válu, takže čte jako popisek osy. Přesuňte ho vpravo od kótovací čáry.
- **Zdvojené texty na desktopu:**
  - **Tkaní:** legenda „osnova (podélné nitě) / útek (příčné nitě)“ i popisek „Princip tkaní: osnova (podélné nitě) a útek (příčné nitě).“ Popisek zkraťte na „Princip tkaní – plátnová vazba.“ (obecný pojem, popisuje kresbu).
  - **Vývoj:** legenda „konstrukce · materiálové složení · finální úpravy“ i popisek „Navrhneme konstrukci, materiálové složení i finální úpravy.“ Legendu odstraňte a popisek ponechte.

### R5-05 · P3 · Dvě slabší ilustrace použití
- **„Malířská plátna“:** stojan s cikcak čárou na plátně vypadá jako flipchart s grafem, tedy „prezentace“, ne malířství. Na plátno dejte jednoduchou krajinu: dva kopce a kruh slunce. Akcent zůstává na plátně.
- **„Reklamní stánky a banery“:** obdélník s čárami je nejméně výmluvná kresba sady. Kreslete roll-up s horní lištou, rozkročenou nohou a výrazným akcentním tvarem na banneru (velký kruh nebo šipka), případně s malým praporkem vedle.

### R5-06 · P3 · O nás a Laser – hlavička s fotkou a motivem
- **O nás:** fotka `kontakt-duo` je na tmavé hlavičce téměř černá a motiv za ní vykukuje přes pravý okraj, takže působí nahodile.
  - Fotku zesvětlete jen v této variantě (bílý bod 0,90 a přechod do `#dbe4f7` dřív), aby záhyby byly čitelné.
  - Motiv zcela schovejte za fotku, nebo ho posuňte tak, aby přesahoval jen horní hranu fotky. Nesmí končit u okraje okna.
- **Laser:** stejné pravidlo pro motiv za fotkou.

### R5-07 · P3 · Mobil – posuvný řádek kotev na Službách
- Poslední viditelný štítek je useknutý („Lasero…“), ale bez náznaku pokračování.
- Přidejte na pravý okraj masku `mask-image: linear-gradient(90deg, #000 85%, transparent)` a `scroll-padding-inline: 16px`. Aktivní kotvu při scrollu zvýraznění nevyžaduji.

---

## 4. Hodnocení: Původní → v2 (kolo 3) → v2 (kolo 5)

Sloupec „kolo 3“ je moje nezávislé přehodnocení z kola 4, tedy stav v2 před vizuály.

| Aspekt | Původní | v2 kolo 3 | v2 kolo 5 | Zdůvodnění současného skóre |
|---|---|---|---|---|
| Vizuální dojem / atraktivita | 6 | 6 | **8** | Vlastní textilní vizuální jazyk a střídání fotopásů, ilustrací a tmavých sekcí. Web je zapamatovatelný. Strop dávají obecné fotky a vzorníky (R5-01). |
| Vizuální bohatost | 6 | 4 | **7** | 41 vlastních grafik a 5 fotek v jednotném podání. Pořád ale žádná skutečná fotka firmy a fotek je málo na podstránkách. |
| Typografie | 3 | 8 | **8** | Čistá škála, dobré zalamování. Kolem ilustrací drží hierarchii. |
| Barvy a kontrast | 4 | 8 | **9** | Navy a modrá znovu nesou identitu (fotopásy, tmavé Použití) a všude je AA. Text na fotkách je jen na plných panelech. |
| Rozvržení a rytmus sekcí | 4 | 6 | **8** | Domů už není řada karet. Na Službách funguje cikcak a sekce se střídají typem i barvou. |
| Navigace a IA | 5 | 9 | **9** | Beze změny, výborná. |
| Přehlednost | 4 | 9 | **9** | Diagramy přehlednosti pomáhají, nic nepřibylo navíc. |
| Informační hodnota | 3 | 7 | **7** | Diagramy zviditelňují parametry a vysvětlují pojmy. Nákupčí ale pořád nezjistí šíře tkanin, gramáže, vazby, kapacity ani lhůty. |
| Důvěryhodnost | 4 | 6 | **7** | Konzistentní, pečlivý a „technický“ dojem. Bez skutečných fotek výroby a referencí to ale dál nejde. Fotka laseru může působit jako fotobanka. |
| Konverze (cesta k poptávce) | 4 | 9 | **9** | CTA a telefon všude, vzorový formulář a teď i „Jiné“. |
| Mobil | 5 | 8 | **8** | Ilustrace mají mobilní formy a délka je v limitu. Drobnosti: přehuštěné malé symboly, posuvník kotev bez náznaku. |
| Přístupnost | 4 | 8 | **8** | Omezený pohyb i bez JS vzorně. Chybí běh axe a Lighthouse v reálném prohlížeči. |
| Výkon a technické SEO | 6 | 9 | **9** | Domů 315 / 255 kB, CLS ≈ 0, LCP v rozptylu měření, +2 kB JS. |
| Čeština a texty | 3 | 8 | **8** | Bez chyb. Obrat „od … přes … až po“ se na webu stále opakuje asi šestkrát a některé legendy zdvojují popisky. |
| Pohyb a animace | 6 | 4 | **8** | Ucelený, decentní systém: odhalení, jemný zoom hero, parallax ±27 px, kreslení diagramů, count-up a bod laseru. Jedinou chybou je zdržený text procesu (R5-02). |

**Shrnutí:** v2 teď originál převyšuje ve všech 15 aspektech nebo je dorovnává. Pod 8 zůstávají jen tři aspekty: vizuální bohatost, informační hodnota a důvěryhodnost. Všechny tři brzdí hlavně chybějící vlastní obsah majitele.

---

## 5. Návrhy dalších vylepšení (aspekty pod 8)

### Vizuální bohatost (7)
**(a) Můžeme sami:**
1. Opravit vzorníky (R5-01) a malé symboly (R5-03).
2. Ke krokům procesu přidat malé piktogramy 48 px (poptávka = obálka, vývoj = vazební papír, tkaní = síť, úpravy = kapka, doprava = auto). Proces je dnes jediná čistě textová sekce na Domů.
3. Nový **OG obrázek** 1200 × 630 pro sdílení: duotón hero, logo a „Technické tkaniny na zakázku“. Dnes se sdílí starý `og.jpg`.
4. Fotopás laseru vygenerovat i v šíři 1920 px s vyšší kvalitou (asi 40 kB). Je to hlavní fotka webu a dnešních 14,7 kB pro 1 600 px je na hraně.

**(b) Jen majitel** (podle dopadu):
1. Skutečné fotky: tkalcovské stavy, snovací stroj, laser při práci, role tkanin, detail vlastní vazby.
2. Portrét Ing. Štancla.
3. Krátká smyčka videa stavu (5–8 s, bez zvuku).
4. Nafocené vzorky vlastních tkanin pro stránku Materiály.

### Informační hodnota (7)
**(a) Můžeme sami:**
1. Krátké **Časté dotazy** na Kontaktu nebo Službách, složené jen z existujících faktů:
   - minimální zakázka 500 m;
   - z jakých materiálů tkáte;
   - jakou šíři řežete laserem;
   - zajistíte barvení a dopravu;
   - navrhnete novou tkaninu;
   - jak poptat.

   Doplnit JSON-LD `FAQPage` (SEO bonus).
2. Jednovětné vysvětlení „snování“ jako obecného pojmu: „Snování je příprava osnovy – navinutí podélných nití na osnovní vál.“

**(b) Jen majitel** (podle dopadu):
1. Technické parametry tkaní: šíře tkanin, plošné hmotnosti, vazby, příze, kapacita, typické lhůty.
2. Laser: formáty, tloušťky, přijímané podklady, minimální zakázka.
3. Technické listy (PDF) ke stažení.
4. Chybějící hodnoty v tabulce materiálů.

### Důvěryhodnost (7)
**(a) Můžeme sami:**
1. U IČ v patičce a v kartě „V kostce“ přidat odkaz „ověřit v ARES“ (`https://ares.gov.cz/ekonomicke-subjekty?ico=64250938`, nový panel). Je to pravdivý a ověřitelný signál.
2. Sjednotit fotky tak, aby žádná nepůsobila jako „náš stroj“. Laser zůstává atmosférou bez popisku (dnes splněno).

**(b) Jen majitel** (podle dopadu):
1. Skutečné fotky (viz výše).
2. Souhlas s uvedením log a 1–3 krátké reference nebo citace se jménem firmy.
3. Certifikáty a zkušební protokoly.
4. E-mail na vlastní doméně místo `@tiscali.cz`.
5. Právní revize textu Ochrany soukromí.

---

## 6. Verdikt

Zbývají dvě malé položky P2 (R5-01 vzorníky, R5-02 text procesu). Obě se dají opravit za hodinu práce, potom web doporučuji schválit.
P3 položky (R5-03 až R5-07) jsou vítané ve stejném kole, ale schválení neblokují.

VERDIKT: DALŠÍ KOLO
