# Kolo 8 – kontrola kola 7 (větev `v2-fixes-snovani`)

Podklady: `reviews/round-7-impl.md`, `shots/r7-impl/` (+ `zoom/`) a moje nové `shots/r8-review/`:
- všech 7 stránek desktop + mobil s `-full`;
- `checks/`: hlavička na 1024 / 1100 / 1199 / 1280 / 1440 px, O nás 1440 a 390, omezený pohyb, bez JS, 320 / 768 / 1024 / 1920 a „Jiné“.

Skripty v `shot/`: `r8-review.mjs`, `r8-misc.mjs`.

## 1. Ověření

| Bod | Stav | Poznámka |
|---|---|---|
| R7-01 Snování – diagram | ✅ | Technicky správně a čitelně. Zepředu jdou nitě shora přes vodič na vál a navinuté nitě jsou svislé. Z boku pás po tečně navazuje na návin, směr otáčení sedí (proti směru hodinových ručiček) a kóty jsou na správných místech. Výborná práce. |
| R7-01 Snování – spot Domů | ✅ | Jasné a správné. |
| R7-01 Snování – symbol `sym-snovani` | ⚠️ | V 40–48 px čte jako **terč** s modrou čárkou. Vál v něm nikdo nepozná (R8-02). |
| R7-02 Vzorníky | ❌ | Lepší než „papír“, ale pořád nečtou jako látka (R8-01). Na desktopu svislé boky se čtvercovou mřížkou působí jako **sprchový závěs nebo síťka**, na mobilu (48 px) jako **drátěný koš**. Text „PES“ navíc koliduje s dírkou visačky. |
| R7-03 „Domů“ v menu | ✅ | Hlavička je na jednom řádku na 1024 / 1100 / 1199 / 1280 / 1440 px. Logo → menu má ≥ 65 px, menu → telefon 32 px, telefon → CTA 12 / 16 px. `aria-current` je na Domů a „Domů“ je i v patičce (s `aria-current`). Do 1023 px platí hamburger. |
| R7-04 Fotka O nás | ✅ | Kepr ve světlé studené šedé jasně říká „tkanina“, je ostrý a nezvětšený. Na mobilu je výřez 16 : 9 se správným AVIF. Drobnost s motivem viz R8-04. |
| R7-05 Tkaní | ✅ | Útek se teď otáčí na krajích, osnova je rovná a provázání je správné. K malému symbolu viz R8-03. |
| Optimalizace obrázků | ✅ | `<picture>` s AVIF + WebP, `img` s `width` / `height`, správné `sizes`. Domů se zlehčil z 315 na 202 kB a mobilní LCP je o 24 % lepší. |
| **Regrese** | ✅ | Bez přetečení na 320–1920 px. Omezený pohyb: 0 animací, 0 skrytých textů. Bez JS je vše vidět. Text procesu je vidět hned. „Jiné“ funguje na všech šířkách. Nenašel jsem žádné nové fakty. |

## 2. Odpovědi

**Odchylky:**
1. **Vodič „před“ nitěmi** – schvaluji. Čte se lépe a technicky je to také možné (nitě procházejí hřebenem).
2. **Větší visačka 30 × 16** – schvaluji. Kolizi textu s dírkou ale řeší nový vzorník v R8-01.
3. **Štítky „zepředu“ / „z boku“ nahoře** – schvaluji.
4. **q75 u kepru** – schvaluji.

**Otázky:**
1. **Loga na paletě 128 barev, bezeztrátově** – potvrzuji. Ve screenshotech nevidím rozdíl a úspora je znatelná.
2. **`Content-Type` u AVIF** – GitHub Pages posílá `image/avif`. Ověření jednoho obrázku v DevTools po nasazení dejte na seznam orchestrátora.
3. **Relativní cesty v SVG** – nedělat. 1–2 kB po gzipu nestojí za riziko pro kreslení.
4. **Zvětšený hero na mobilu pod překryvem** – v pořádku, ponechat.

## 3. Povinné opravy

### R8-01 · P1 · Vzorníky materiálů musí jednoznačně číst jako látka

**Proč:** majitel výslovně řekl, že dnešní ikony vypadají jako papír. Svislé rovné boky, vodorovná tyčka a čtvercová mřížka čtou jako závěs, síťka nebo koš.

**Řešení – „látka zavěšená za jeden bod“:** kus tkaniny držený uprostřed nahoře. Z bodu se rozbíhají měkké záhyby, dole je vlnitý lem.

**Zakázáno:** mřížka, rovné svislé boky, vodorovná tyčka.

**Geometrie** (viewBox `0 0 96 96`, bez natočení):

| Prvek | Cesta / tvar | Třída |
|---|---|---|
| Kroužek závěsu | `circle cx 48 cy 8 r 3.5` | `o` |
| Látka (zvon s vlnitým lemem) | `M48 13C43 18 34 30 27 45C21 58 15 70 10 82C16 86 22 80 28 85C34 90 40 82 46 87C52 92 58 82 64 87C70 91 76 82 82 85C85 86 87 85 86 82C81 70 75 58 69 45C62 30 53 18 48 13Z` | `of2` |
| Stínování záhybů (měkké plochy bez obrysu) | `M48 17C45 36 40 58 31 85C35 86 38 85 41 86C44 60 46 38 48 17Z` a `M48 17C49 38 51 60 54 87C57 86 60 85 62 86C57 60 52 38 48 17Z` | `--ill-fill` |
| Hlavní záhyby (z bodu dolů) | `M48 15C44 34 38 56 29 84`, `M48 15C48 36 47 60 47 86`, `M48 15C52 36 58 60 65 86` | `m` |
| Vedlejší záhyby u lemu | `M22 66C21 72 20 77 19 83`, `M74 66C75 72 76 77 77 83` | `m` |
| **Akcent** = jediná rozlišovací čára | PES: levý hlavní záhyb; PA: prostřední; PP: pravý; bavlna: prostřední + tobolka na visačce | `a` |
| Visačka | provázek `M51 8C60 9 66 13 70 19` (`m`); štítek `x 66–96`, `y 19–35`, `rx 2` (`of2`); **dírka vlevo** `circle 70 27 r 1.3` (`o`) | |

**Text visačky:**
- PES / PA / PP zůstává HTML (`aria-hidden`, 11 px), **vpravo od dírky** (x 74–94), svisle na střed štítku. Na mobilu skrytý.
- Bavlna: tobolka vpravo od dírky.

**Prezentace:**
- Desktop: vzorník 88–96 px ve 120px okně.
- Mobil: 48 px.
- Na mobilu zjednodušit: vypustit vedlejší záhyby a stínování, ponechat siluetu, 3 záhyby a visačku.

**Akceptace:**
- 2× výřezy všech 4 vzorníků na desktopu (96 px) i mobilu (48 px).
- Sestava vedle sebe se současnou verzí.
- Kontrolní otázka: „je to kus látky?“ – ano bez váhání v obou velikostech.

### R8-02 · P2 · `sym-snovani`: pohled zepředu místo „terče“

**Proč:** v malých velikostech (24–48 px) se soustředné kruhy čtou jako terč. Silueta cívky zepředu (dvě čela, mezi nimi návin, nitě shora) je čitelná okamžitě a odpovídá spotu i diagramu.

**Geometrie** (viewBox `0 0 48 48`, ≤ 5 cest, tah 2):
1. Čela: `M10 14A2 2 0 0 1 12 16V40A2 2 0 0 1 8 40V16A2 2 0 0 1 10 14Z` a stejné na `x 38` (`of`).
2. Návin: obdélník `x 12–36`, `y 21–35` (`of2`).
3. Navinuté nitě: `M18 21V35M24 21V35M30 21V35` (`m`).
4. **Přicházející nitě (akcent):** `M18 4V21M24 4V21M30 4V21` (`a`).
5. Čepy: `M3 28H8M40 28H45` (`o`).

**Kde:**
- nadpis bloku „Snování“ na Službách;
- mobilní karta na Domů;
- všude jinde, kde je `sym-snovani`.

Boční pohled zůstává jen v diagramu. Akceptace: 1 : 1 výřezy ve 24, 32, 40 a 48 px.

### R8-03 · P3 · `sym-tkani` v malé velikosti
- **Problém:** ve 40 px tvoří otočky útku na krajích tvary připomínající písmena („d“, „P“).
- **Úprava:**
  - 3 rovné osnovní nitě (`x 14 / 24 / 34`, `y 6–42`);
  - 2 řady útku (`y 18` a `y 30`) spojené **jednou** otočkou vpravo (`r 6`);
  - levé konce útku volně vybíhají;
  - mezery na kříženích podle pravidla.

### R8-04 · P3 · O nás na mobilu – motiv za perexem
- **Problém:** na 390 px kříží motiv `weave-mark` poslední řádek perexu.
- **Úprava:** na mobilu posunout motiv tak, aby začínal až pod perexem a přesahoval jen horní hranu fotky. Případně ho pod 768 px skrýt.

## 4. Verdikt
R8-01 je přímá výtka majitele a dnešní stav ji ještě neřeší. R8-02 je drobná, ale viditelná oprava.

VERDIKT: DALŠÍ KOLO
