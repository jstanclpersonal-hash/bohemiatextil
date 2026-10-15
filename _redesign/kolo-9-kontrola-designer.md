# Kolo 9 – kontrola kola 8

**Podklady:**
- sekce „Kolo 8“ v `reviews/round-7-impl.md`;
- `shots/r8-impl/` (`compare-*`, `symtest-*`, `swtest`, `swatches-*`);
- moje nové screenshoty `shots/r9-review/`:
  - Domů, Materiály a Služby (desktop + mobil);
  - `swatches-desktop.png` (2×) a `swatches-mobile.png` (3×);
  - `sym-snovani-*.png`.

## 1. Ověření

| Bod | Stav | Poznámka |
|---|---|---|
| R8-01 Vzorníky | ❌ | Šátek zvednutý za střed **nečte jednoznačně jako látka**. Ostrý vrchol, rozbíhavé „žebra“ a cípy do špiček působí jako **stan, deštník, medúza nebo kápě**. Neznámý člověk by do vteřiny „látka“ neřekl. Na mobilu je navíc **prázdný obdélník visačky** (text je skrytý, štítek zůstal), což vypadá jako chyba. Tobolka na visačce bavlny vypadá jako domeček. |
| R8-02 `sym-snovani` | ✅ | Pohled zepředu (čela, návin, 3 nitě shora) je ve 32–48 px čitelný jako cívka/vál. Ve 24 px trochu připomíná činku, na webu se ale používá jen ve 40–48 px. **Pravidlo:** nepoužívat pod 32 px. |
| R8-03 `sym-tkani` | ✅ | Čte jako tkanina a útek se otáčí jen jednou vpravo. Ve všech velikostech je to čisté. |
| R8-04 Motiv na O nás (mobil) | ✅ | Motiv už nekříží perex a vykukuje jen nad fotkou. |
| Regrese | ✅ | Implementátor ověřil šířky 320–1920, omezený pohyb, provoz bez JS a „Jiné“. Moje namátkové snímky Domů, Materiálů a Služeb jsou bez nových problémů. |

## 2. Povinná oprava

### R9-01 · P1 · Vzorník jako **role látky** (klasický textilní piktogram)

Role tkaniny s volně odvinutým koncem je nejrozšířenější a nejsnáze rozpoznatelný symbol textilu. U výrobce tkanin je to navíc přesně jeho produkt (tkanina se expeduje v rolích).

**Co odliší látku od podobných motivů:**
- **Ne papírová role:** čelo role se spirálou vrstev (silná látka má viditelné vrstvy) a pruh, který vede po roli i po odvinutém konci.
- **Ne roleta:** odvinutý konec nevisí rovně, ale **láme se a rozlévá dopředu** s měkkým vlnitým okrajem.

**Výjimka ze stylu:** u tohoto motivu je povolená **mírná perspektiva válce** (eliptické čelo). Ve 2D se role nedá jednoznačně nakreslit. Ostatní pravidla „Tkané linky“ platí: tah 2, kulaté konce, paleta `--ill-*`, jeden akcent, žádný text v SVG.

**Geometrie** (viewBox `0 0 96 96`, pořadí vrstev odspodu):

| # | Prvek | Cesta / tvar | Třída |
|---|---|---|---|
| 1 | Odvinutý konec (svislá část + rozlití dopředu s vlnitým okrajem) | `M18 36H80C81 46 81 54 84 60C88 66 92 74 90 80C84 84 80 78 74 82C68 87 62 79 56 83C50 88 44 79 38 83C32 87 26 79 20 82C14 85 8 82 8 78C8 70 14 64 17 58C18 50 18 44 18 36Z` | `of2` |
| 2 | Stín v ohybu (plocha za lomem) | `M17 58C34 63 64 63 84 60C86 64 88 68 89 72C70 70 30 70 11 72C13 66 15 62 17 58Z` | `--ill-fill`, `opacity .8`, bez obrysu |
| 3 | Lom látky | `M17 58C34 63 64 63 84 60` | `o` |
| 4 | Náznak útku jen u okraje (1–2 jemné vlnité linky souběžné s okrajem) | `M14 75C24 77 34 74 44 77S66 74 86 76` | `m` |
| 5 | Tělo role (osa vodorovně, vzdálené čelo jako eliptický oblouk) | `M16 14H80A6 13 0 0 1 80 40H16Z` | `of` (`--ill-fill`) |
| 6 | Lesk role | `M24 20H76` | `m` |
| 7 | Přední čelo role | `ellipse cx 16 cy 27 rx 6 ry 13` | `of2` |
| 8 | Spirála vrstev v čele | `M15 27a1 2.2 0 1 1 2 0a2 4.3 0 1 1 -4 0a3 6.5 0 1 1 6 0a4 8.7 0 1 1 -8 0` | `m` |
| 9 | **Akcent = tkaný pruh** vedoucí po roli a dál po odvinuté látce (rozbíhá se k okraji) | PES `M30 14V58C29 66 27 74 26 81`; PA `M44 14V60C44 67 43 75 42 83`; PP `M58 14V60C58 67 59 75 60 83`; bavlna `M51 14V60C51 67 51 75 51 84` | `a` |
| 10 | Všitá etiketa (jen desktop) | obdélník `x 64–90`, `y 64–76`, `rx 1.5`, natočený `rotate(-4 77 70)` (`of2`); stehy: krátké čárky `M66 67V73M88 67V73` (`m`) | |

**Etiketa:**
- Text **PES / PA / PP / CO** je HTML (`aria-hidden`, 11 px, na středu etikety).
- „CO“ je standardní značka bavlny na textilních etiketách a nahrazuje tobolku, která četla jako domeček.
- Akcentní pruhy (x 26–60 u okraje) etiketu nekříží.

**Mobil (48 px):**
- **Etiketa se nekreslí vůbec** (skrýt celou skupinu, např. `--sw-tag: 0` stejně jako `--sw-detail`), nikdy prázdný rámeček.
- Skrýt i prvky 2 a 4.
- Zůstává role se spirálou, odvinutý konec s lomem a akcentní pruh.

**Desktop:** vzorník 96 px v okně 120 px, na středu.

**Akceptace:**
1. 2× výřezy všech 4 vzorníků na desktopu i mobilu a sestava „kolo 8 vs kolo 9“.
2. **Slepý test:** výřez jednoho vzorníku (bez nadpisu, 96 a 48 px) ukázat aspoň dvěma lidem, kteří web neznají, nebo orchestrátorovi bez kontextu. Odpověď musí být „látka / role látky / textil“.
3. Pokud by výsledek přesto četl jako papírová role, zvýraznit dvě věci: vlnitý okraj (větší amplituda, 4 → 6) a rozbíhání pruhu u okraje.

## 3. Verdikt
R9-01 je poslední otevřený bod a zároveň přímá výtka majitele. Všechno ostatní je hotové a v pořádku.

VERDIKT: DALŠÍ KOLO
