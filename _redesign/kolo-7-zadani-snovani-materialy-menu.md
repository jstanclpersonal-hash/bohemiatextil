# Kolo 7 – zadání úprav podle majitele (větev `v2-fixes-snovani`)

Pravidla jsou stejná jako dosud:
- práce jen ve `v2/` přes `build.mjs`;
- styl „Tkaná linka“: tah 2, kulaté konce, jeden akcent, paleta `--ill-*`, žádný text v SVG;
- kreslené grafiky si nechávají `pathLength="1"` a `.draw` a tah kompenzuje `--k`;
- žádné nové fakty.

Preview server na :4321 v tuto chvíli neběží, proto jsem rozměry hlavičky měřil přes `file://` (`shot/r7-header2.mjs`).

---

## R7-01 · P1 · Snování: technicky správná kresba osnovního válu (všechny výskyty)

**Kde:**
- `build/svg/spot-snovani.svg`: karta služby na Domů (desktop);
- `build/svg/dia-snovani.svg`: Služby `#snovani`;
- `sym-snovani` ve `illustrations.svg`: mobilní karta na Domů a nadpis bloku na Službách;
- případně piktogram kroku procesu, pokud ho používá.

Po úpravě vyhledat `snovani` ve všech `v2/*.html` a v `build/`.

**Co je špatně:** čela jsou správně vlevo a vpravo (osa vodorovně). Nitě ale vedou vodorovně podél osy a vstupují do válu bokem přes čelo. Navinutá vrstva je kreslená vodorovnými čarami, tedy také podél osy.

**Jak to má být:** nitě jsou kolmé na osu. Arch stovek rovnoběžných nití přichází **tečně shora** a navíjí se po obvodu přes celou šíři mezi čely.
- **Pohled zepředu** (osa vodorovně): přicházející nitě jsou **svislé** čáry shora. Navinuté nitě na válu jsou také **svislé** čáry, protože vedou kolem obvodu.
- **Pohled z boku** (podél osy): čelo je kruh, na něm je soustředný návin a nitě přicházejí jako pás po tečně.

### a) Diagram Služby – `dia-snovani.svg`, viewBox `0 0 480 300`
Technický výkres se dvěma pohledy vedle sebe. Výšky čel jsou sladěné, aby pohledy „promítaly“ jeden do druhého.

**Pohled zepředu** (levá část, x 20–260):

| Prvek | Geometrie | Třída |
|---|---|---|
| Čela | obdélníky `x 40–50` a `x 220–230`, `y 70–250`, `rx 4` | `F fill` + `o draw` |
| Čepy osy | `M24 160H40` a `M230 160H246` | `o` |
| Návin | obdélník `x 50–220`, `y 106–214` | `F2 fill`, horní a spodní hrana `o` |
| Navinuté nitě | svislé čáry `x = 62, 74, …, 208` (13 čar), `y 106–214` | `m t` |
| **Přicházející nitě (akcent)** | svislé čáry na stejných `x`, **od `y 20` dolů do `y 106`** (směr cesty shora dolů, aby kreslení „sjíždělo“ na vál) | `a t draw acc` |
| Vodič nití (volitelné, doporučuji) | vodorovná lišta `x 54–216`, `y 44–50`, `rx 3`; nitě přes ni vedou s mezerou 3 jednotky podle pravidla křížení | `o` + `F2` |
| Kóta šíře | čára `M50 278H220`, vynášecí čáry `x 50` a `x 220` z `y 254` do `y 284` (vnitřní líce čel = šíře válu), koncové tečky `r 2,5` | `k` / `MF` |

Popisek „90–200 cm“ je HTML, na středu kóty (`x 135`) s přerušením čáry.

**Pohled z boku** (pravá část, střed `(370, 160)`):

| Prvek | Geometrie | Třída |
|---|---|---|
| Čelo | kruh `r 90` (`y 70–250`, stejně jako čela zepředu) | `F` s `fill-opacity: .55` (průsvitné čelo je ilustrační konvence, aby byl vidět návin) + `o` |
| Návin | kruh `r 54` (`y 106–214`, stejně jako návin zepředu) | `F2 fill` + `o` |
| Vrstvy návinu | kruhy `r 44` a `r 34` | `m` |
| Hřídel | kruh `r 22` (`o`), náboj `r 8` (`o`), osa `r 2,5` | `MF` |
| **Pás nití (akcent)** | svislá čára `x 316` (= 370 − 54, tečna levé strany návinu) od `y 20` do `y 160`, pak navazující oblouk po návinu `A54 54 0 0 0 370 214` (proti směru hodinových ručiček dolů) | `a draw acc`, `stroke-width: 3` (pás, ne jedna nit) |
| Šipka otáčení | oblouk `r 70` vpravo nahoře (asi od 300° do 20°), proti směru hodinových ručiček, hrot 6 jednotek | `m` |
| Kóta průměru | čára `M280 278H460`, vynášecí čáry `x 280` a `x 460` z `y 164` do `y 284`, koncové tečky | `k` / `MF` |

Popisek „Ø do 800 mm“ je HTML na středu (`x 370`).

**Doplňky:**
- **Spojnice pohledů** (volitelné, pěkný „výkresový“ detail): tenké čárkované čáry `k` (`stroke-dasharray: 4 4`) z horní a spodní hrany čel (`y 70` a `y 250`) od `x 234` do `x 280`.
- **Popisek** `<figcaption>`: „Osnovní vál zepředu a z boku: šíře 90–200 cm, průměr čel do 800 mm.“ Volitelně pod pohledy HTML štítky „zepředu“ / „z boku“ (14 px, `--slate-600`).
- **Mobil:** diagram na plnou šířku obsahu (max. 360 px), ne 256 px; při 343 px se oba popisky kót vejdou. Služby se tím prodlouží asi o 60 px, což je v pořádku.

### b) Spot Domů – `spot-snovani.svg`, viewBox `0 0 160 112`
Pohled zepředu, nitě shora přes vodič.

| Prvek | Geometrie | Třída |
|---|---|---|
| Čela | `x 30–38` a `x 122–130`, `y 40–104`, `rx 3` | `F` + `o` |
| Čepy | `M18 72H30`, `M130 72H142` | `o` |
| Návin | `x 38–122`, `y 54–90` | `F2` + `o` |
| Navinuté nitě | svislé `x = 46, 54, …, 110` (9 čar), `y 54–90` | `m` |
| Vodič | lišta `x 40–120`, `y 22–27`, `rx 2,5`; nitě ji kříží s mezerou 3 jednotky (podpisový detail z loga) | `o` |
| **Přicházející nitě (akcent)** | stejná `x`, `y 6–54`, kreslené shora dolů | `a draw acc` |
| Šipka otáčení | `M146 60A14 14 0 0 1 146 86`, hrot dole | `m` |

### c) Symbol – `sym-snovani`, viewBox `0 0 48 48`
Pohled z boku, nejvýš 5 cest:
1. čelo: kruh `cx 27 cy 28 r 17` (`of`);
2. návin: kruh `r 11` (`o`);
3. hřídel: kruh `r 4,5` (`o`) a osa `r 1,5` (`MF`);
4. **pás nití (akcent):** `M16 3V28A11 11 0 0 0 27 39` (svisle shora po tečně a obloukem na návin), `stroke-width 2`.

V 40 px musí být jasně čitelný „kotouč + páska shora“. Ověřit výřezem 1 : 1 a 2×.

### Akceptace R7-01
- 2× výřezy všech tří kreseb (desktop i mobil).
- Kreslení: akcentní nitě se kreslí shora dolů.
- Omezený pohyb: vše nakreslené.
- Kóty „90–200 cm“ a „Ø do 800 mm“ jsou HTML a nepřekrývají kresbu.

---

## R7-02 · P1 · Ikony materiálů: z „papíru“ na látku – „vzorník na ramínku“

**Kde:** `sw-pes`, `sw-pa`, `sw-pp` a `sw-cotton` (Domů – karty materiálů a Materiály, desktop 96 px v okně 120 px, mobil 48 px).

**Proč ramínko:** látkové vzorníky se v textilu běžně prezentují zavěšené přes tyčku ramínka. Přehyb přes tyč, měkké záhyby a vlnitý dolní okraj okamžitě čtou jako tkanina. Rovný obdélník čte jako papír.

**Geometrie** (viewBox `0 0 96 96`, bez natočení):

| Prvek | Cesta / tvar | Třída |
|---|---|---|
| Háček | `M48 13C48 9 47 5 51 4C55 3 56 8 53 9` | `o` |
| Tyčka | obdélník `x 18–78`, `y 13–19`, `rx 3` | `of2` |
| Látka (přední vrstva přes tyčku) | `M20 17C20 12 76 12 76 17C80 40 74 60 78 84C70 90 62 80 54 86C46 92 38 80 30 86C26 89 22 86 18 84C22 60 16 40 20 17Z` (přehyb nahoře, mírně vyboulené boky, **vlnitý lem dole**) | `of2` |
| Záhyby (měkké) | `M34 21C32 40 36 60 32 86`, `M50 21C52 44 48 64 52 89`, `M64 21C62 42 66 62 62 85` | `m` |
| Vazba (náznak útku) | 4 vlnité vodorovné linky sledující záhyby, např. `M22 34C30 32 38 36 46 34S62 32 76 34` (a obdobně `y 48`, `62`, `74`), končí 2 jednotky od okraje látky (nebo `clipPath` tvarem látky) | `m` |
| **Akcent** – jediná rozlišovací nit | PES: útek `y 34`; PA: útek `y 74`; PP: záhyb `x ≈ 34`; bavlna: záhyb `x ≈ 64` | `a` |
| Visačka | provázek `M74 19L80 26` (`m`); štítek `x 72–94`, `y 26–38`, `rx 2` (`of2`); dírka `circle 75.5 32 r 1.2` (`o`) | |

**Text na visačce:**
- PES / PA / PP zůstává HTML s `aria-hidden` na pozici štítku, nově **11–12 px** (dnes 10 px).
- Bavlna: na štítku tobolka místo textu (stávající tvar, zmenšený do štítku).
- Na mobilu (48 px) je text visačky skrytý (`display: none`), tvar štítku zůstává. Název materiálu nese nadpis.

**Zakázáno:** rovné hrany látky, ostré rohy látky, pravidelná řada čárek (připomíná čip).

**Akceptace:** 2× výřezy všech 4 vzorníků na desktopu i mobilu, vedle sebe se starou verzí. Ze 3 kroků vzdálenosti musí čtenář říct „látka“, ne „papír“.

---

## R7-03 · P1 · Navigace: „Domů“ jako první položka (hlavička i patička)

**Hlavička (desktop):** „Domů“ jako první `<li>` hlavního menu na všech stránkách, `href="./"`, na Domů `aria-current="page"`. Dnes je položka jen v mobilním menu, takže sjednotit: jedna položka viditelná všude.

**Naměřené místo** (logo končí na `x 208`, mezera = začátek menu − konec loga; „Domů“ zabere asi 66–74 px):

| Šířka | Mezera dnes | Po přidání „Domů“ |
|---|---|---|
| 961 px | 46 px | **kolize (asi −20 px)** |
| 1024 px | 105 px | asi 35 px – těsné |
| 1100 px | 181 px | v pořádku |
| 1280 px (telefon s číslem) | 176 px | asi 100 px – v pořádku |

**Řešení:**
1. **Hamburger do 1023 px** (dnes do 960 px). Desktopové menu začíná od 1024 px. Upravit breakpoint v CSS i v JS (`matchMedia('(min-width: 1024px)')` pro zavírání menu).
2. **1024–1199 px:** padding odkazů menu 8 px (dnes 10). Mezera mezi telefonem a CTA 12 px. Telefon zůstává jen jako ikona 44 × 44 (jako dnes).
3. **≥ 1280 px:** beze změny (telefon s číslem).
4. **Kontrola:** minimální mezera logo → menu a menu → telefon je ≥ 32 px na každé šířce 1024–1440 px (měřit skriptem) a nic se nezalomí do dvou řádků.

**Mobilní menu:** „Domů“ už je první. Ponechat a doplnit `aria-current` na Domů (pokud chybí).

**Patička „Stránky“:** přidat „Domů“ jako první položku (`aria-current` na Domů). Na mobilu jsou 2 sloupce, takže 6 položek dá 3 plné řádky. Délka stránek se nezmění.

---

## R7-04 · P1 · O nás: jiná fotka v hlavičce

**Volba: těsný výřez `hero.webp` (makro keprové vazby)**, ne ilustrace.
- Majitel výslovně chce fotku.
- Vazba je jediný dostupný obraz, který říká „výroba tkanin“: je vidět struktura nití.
- Ostatní zdroje už jinde výrazně zaznívají: `nabizime` (pás na Službách a sekce „Proč“ na Domů), `pouziti` (Použití, hlavička Materiálů), `laser` (Domů a Laser), `kontakt` (Kontakt).
- `hero.webp` je sice v hero na Domů, ale tam celý, silně ztmavený a jako pozadí. Těsný detail ve světlé přirozené šedé působí jako jiný obraz.
- Mapa s Chocní by nic nového neřekla, adresa je v kartě „V kostce“.

**Výřez:**
- Zdroj `assets/img/hero.webp` (1200 × 800, jen čtení).
- Ohnisko je ostrý hřbet záhybu, kde je kepr nejčitelnější: obdélník 4 : 3 `x 300–1020`, `y 180–720` (720 × 540).
- Výstupy:
  - `onas-twill-720.webp` (720 × 540, q 80);
  - `onas-twill-480.webp` (480 × 360);
  - `onas-twill-16x9-720.webp` (výřez `x 260–1060`, `y 230–680`, zmenšený na 720 × 405) pro mobil.
- **Nezvětšovat** nad zdrojové rozlišení. Kvůli tomu na desktopu omezit šířku fotky v hlavičce na max. **440 CSS px**.

**Zpracování** („přirozená šedá s lehce studeným nádechem“, ne těžký navy duotón):
1. jas L;
2. úrovně: černý bod 0,05, bílý bod 0,95, gama 1,0;
3. přechod `#0b1220` (0) → `#5c6680` (0,5) → `#eef1f6` (1).

Výsledek musí mít čitelnou vazbu i ve stínech; zkontrolovat 1 : 1.

**Umístění:**
- Desktop: stejná dělená hlavička jako dnes, fotka vpravo (4 : 3, `rx 12`, rámeček 1 px `rgba(255,255,255,.08)`, `object-position: 50% 45%`), `alt=""`, `loading="lazy"` není nutné (je nad ohybem; použít `fetchpriority="high"`).
- Mobil: fotka pod perexem, 16 : 9 (`onas-twill-16x9-720`), max. výška 220 px, `object-position: 55% 45%`.
- Motiv `weave-mark` za fotkou ponechat.

**Úklid:** `kontakt-duo-lt-640/1024.webp` odstranit, pokud je nic jiného nepoužívá. `kontakt-duo-1024` zůstává pro Kontakt.

---

## R7-05 · P2 · Kontrola technické správnosti ostatních kreseb

Prošel jsem zdrojové SVG:

| Kresba | Verdikt |
|---|---|
| `dia-tkani` | ✅ Plátnová vazba je správně: sousední osnovní nitě se střídají nad a pod, útek také. |
| `dia-vyvoj` | ✅ Vazební rozvrh 2/2 kepru je správný. |
| `pic-spool` | ✅ Svislá cívka s vodorovným návinem je správně (nit kolmo na osu). |
| `spot-navazne` | ✅ Pás látky mezi dvěma válci zboku je správně. |
| `dia-laser` | ✅ Smíšená projekce (hlava zboku nad pásem shora) je přijatelná ilustrační konvence; kóta šíře je správně. |
| **`spot-tkani` a `sym-tkani`** | ⚠️ **Technicky nepřesné.** Smyčky (U-oblouky) jsou na **osnově** nahoře a dole, ale v tkanině osnova vede podélně bez otáčení. Na kraji (krajce) se otáčí **útek**. Tvar je převzatý z loga. |

**Oprava `spot-tkani` a `sym-tkani`:**
- Osnova jako rovné svislé čáry, které vybíhají za tkaninu nahoru i dolů (bez oblouků).
- **Útek (akcent)** jako jedna souvislá serpentina, která se na levém a pravém kraji otáčí obloukem `r 8` (spot) / `r 5` (symbol).
- Provázání a mezery 3 jednotky podle pravidla křížení zůstávají.
- Totéž platí pro piktogram kroku „Snování a tkaní“, pokud používá `sym-tkani`.

Logo se nemění: je to značka, ne technická kresba.

---

**Akceptace celého kola:**
- screenshoty `shots/r7-impl/` (Domů, Služby, Materiály, O nás; desktop i mobil);
- 2× výřezy nových kreseb;
- hlavička na 1024 / 1100 / 1280 / 1440 px včetně měření mezer;
- regrese: omezený pohyb, bez JS, 320 px, formulář „Jiné“;
- žádné nové fakty.
