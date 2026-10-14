# Kolo 6 – závěrečná kontrola oprav z kola 5

**Podklady:**
- poznámky implementátora: sekce „Kolo 5“ v `reviews/round-4-impl.md`;
- jeho screenshoty: `shots/r5-impl/` (včetně `zoom/`);
- moje nové screenshoty: `shots/r6-review/`, tj. všech 7 stránek desktop + mobil s `-full` a v `checks/` zvětšeniny ilustrací, snímky pohybu, omezený pohyb, bez JS, šířky 320 / 768 / 1024 / 1920 a „Jiné“;
- skripty: `shot/r6-review.mjs` a `shot/r6-misc.mjs`.

## 1. Ověření

| Bod | Stav | Poznámka |
|---|---|---|
| R5-01 Vzorníky | ✅ | Teď čtou jednoznačně jako vzorek látky: vroubkovaný okraj, zahnutý roh, visací štítek, natočení −6°. Asociace s čipem zmizela, na desktopu i mobilu. |
| R5-02 Text procesu | ✅ | Texty kroků jsou vidět hned (naměřeno: 1 ms po vjetí sekce, dříve 1 740 ms). Animuje se jen linka a kroužky. |
| R5-03 Malé symboly služeb | ✅ | Kompaktní symboly jsou čitelné v 40 px a jsou stejné na Domů (mobil) i v nadpisech Služeb. Staré ikony služeb zmizely. |
| R5-04 Diagramy | ✅ | Popisky „do 800 mm“ a „do 190 cm“ leží vpravo od kótovací čáry a obrys se nepřerušuje. Zdvojené legendy jsou pryč. |
| R5-05 Ilustrace použití | ✅ | Plátno s krajinou i roll-up s praporkem jsou výmluvné a ve stylu sady. |
| R5-06 Hlavičky O nás a Laser | ✅ | Světlejší duotón ukazuje záhyby a motiv už nekončí u okraje okna. Vykukuje jen nad horní hranou fotky, což je přijatelné. |
| R5-07 Kotvy na mobilu | ✅ | Pravý okraj řádku se ztrácí, takže je jasné, že řádek pokračuje (`sluzby-anchors-390.png`). |
| Piktogramy kroků | ✅ | Jsou od 768 px a ve stylu sady, proces už není čistě textový. |
| Nový `og.jpg` | ✅ | 1200 × 630, čitelný i jako malý náhled. Logo, H1 i fakta (PES · PA · PP · bavlna · od 500 m · laser do 190 cm) odpovídají webu. `og:image:width/height` jsou doplněné. |
| Fotopás laseru 1920 | ✅ | `srcset` 800 / 1600 / 1920 w, bez zvětšování zdroje. |
| ARES | ✅ | Odkaz „ověřit v ARES“ je u IČ v patičce a v kartě „V kostce“, s `target="_blank" rel="noopener"` a textem pro čtečky. URL ověřil orchestrátor. |

**Regrese:**
- **Šířky:** na 320 / 768 / 1024 / 1920 px nic vodorovně nepřetéká.
- **Omezený pohyb:** 0 animací, 0 skrytých textů, vše nakreslené.
- **Bez JS:** 0 skrytých textů a ilustrace nakreslené. Běží jen čistě CSS hero a parallax.
- **„Jiné“:** nápověda se zobrazí na všech šířkách.
- **Parallax:** stále ±27 px.
- **Délky na 390 px:** Domů 7 089 px a Služby 5 375 px.
- **Pravdivost:** žádný nový fakt.

## 2. Povinné opravy (P1/P2)

Žádné.

## 3. Odpovědi na otevřené otázky

1. **Piktogramy kroků na mobilu** – **ano, přidejte je** (32 px vlevo od nadpisu kroku). Limit 5 400 px byl orientační. Těch zhruba 40 px navíc stojí za to, aby proces vypadal na všech zařízeních stejně.
2. **OG obrázek** – **nechte variantu s fakty.** Fakta jsou pravdivá a v náhledu při sdílení říkají víc než samotný nadpis.
3. **`og:image` a `_next` při nasazení** – patří na seznam orchestrátora (viz níže).

## 4. Volitelně později (P3, neblokuje)

- Štítek na vzorníku má písmo 10 px. Je správně `aria-hidden` a název materiálu nese nadpis, takže nevadí, ale na desktopu by snesl 11–12 px.
- Piktogramy kroků i na mobilu (viz odpověď 1).
- Časté dotazy z existujících faktů a vysvětlení pojmu „snování“ (z kola 5).
- Před nasazením spustit axe a Lighthouse v reálném Chromu.
- **Nasazení v2 do kořene:**
  - `og:image` → `/assets/img/og.jpg`;
  - `_next` → `https://www.bohemiatextil.cz/kontakt?odeslano=1`;
  - odstranit `noindex`;
  - z `robots.txt` odstranit `Disallow: /v2/` a aktualizovat `sitemap.xml`;
  - `porovnani.html` nenasazovat do kořene.

## 5. Závěrečné hodnocení

| Aspekt | Původní | v2 kolo 3 | v2 kolo 5 | v2 finál | Zdůvodnění finálního skóre |
|---|---|---|---|---|---|
| Vizuální dojem / atraktivita | 6 | 6 | 8 | **8** | Vlastní textilní vizuální jazyk, střídání fotopásů, ilustrací a tmavých sekcí. Výš to bez skutečných fotek nepůjde. |
| Vizuální bohatost | 6 | 4 | 7 | **7** | 45 vlastních grafik a 5 sjednocených fotek. Chybí ale jakákoli skutečná fotka firmy. |
| Typografie | 3 | 8 | 8 | **8** | Čistá škála, správná čeština, hierarchie drží i kolem ilustrací. |
| Barvy a kontrast | 4 | 8 | 9 | **9** | Navy a modrá nesou identitu a všude je AA. Text na fotkách je jen na plných panelech. |
| Rozvržení a rytmus sekcí | 4 | 6 | 8 | **8** | Domů i Služby mají živý, logický rytmus a žádná sekce není „mrtvá“. |
| Navigace a IA | 5 | 9 | 9 | **9** | Lepivá hlavička, kotvy, křížové odkazy, jasné pořadí. |
| Přehlednost | 4 | 9 | 9 | **9** | Parametry, tabulka a diagramy se dají přečíst během pár sekund. |
| Informační hodnota | 3 | 7 | 7 | **7** | Všechna dostupná fakta jsou vidět a diagramy je zpřehledňují. Chybí parametry, které zná jen majitel. |
| Důvěryhodnost | 4 | 6 | 7 | **7** | Pečlivý, konzistentní a ověřitelný (odkaz do ARES). Brzdí to absence skutečných fotek a referencí. |
| Konverze (cesta k poptávce) | 4 | 9 | 9 | **9** | CTA a telefon všude, vzorový formulář včetně volby „Jiné“. |
| Mobil | 5 | 8 | 8 | **8** | Mobilní formy ilustrací, rozumná délka, posuvník kotev s náznakem pokračování. |
| Přístupnost | 4 | 8 | 8 | **8** | Omezený pohyb a provoz bez JS vzorně, fokus a `inert` v pořádku. Chybí jen externí audit (axe/Lighthouse). |
| Výkon a technické SEO | 6 | 9 | 9 | **9** | Domů 315 / 256 kB, CLS ≈ 0, LCP beze zhoršení, nový OG obrázek. |
| Čeština a texty | 3 | 8 | 8 | **8** | Bez chyb a konzistentní. Obrat „od … přes … až po“ by snesl víc variací. |
| Pohyb a animace | 6 | 4 | 8 | **8** | Ucelený a opravdu decentní systém, který nebrání čtení a při omezeném pohybu se úplně vypne. |

**Shrnutí:** finální v2 je ve všech 15 aspektech lepší než originál nebo stejně dobrý. Vrátila atmosféru a pohyb, které originál měl, a zachovala čitelnost, fakta a konverzní cestu z prvních kol.
Tři aspekty se 7 body (vizuální bohatost, informační hodnota, důvěryhodnost) už posune jen obsah od majitele: skutečné fotky výroby, technické parametry a reference.

VERDIKT: SCHVÁLENO
