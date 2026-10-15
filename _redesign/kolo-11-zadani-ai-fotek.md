# Kolo 11 – zapojení tří AI obrázků (větev `v2-ai-foto`)

**Zdroje:** `scratchpad/ai-zdroje/`, vše 1536 × 1024 PNG, **needitovat**. Všechny výstupy patří do `v2/assets/img/`. Postup a kódování zůstává jako v kole 7 (`imgtools/encode.mjs`).

**Rozbor zdrojů** (měřeno `shot/r11-analyse.mjs`):

| Obrázek | Co ukazuje | Pro text |
|---|---|---|
| `ai-1-tkanina-detail` | Levá třetina téměř černá (okraj `#010307`). Kontrast textu `#c5cdda` je v pásu x 0–45 % ≥ 8,8 : 1 bez překryvu. | V pásu x 45–62 % nahoře jen 3,3 : 1 – tam je překryv nutný. |
| `ai-5-role-tkanin` | Plný záběr rolí, bez volného místa. | Žádný text na fotce. |
| `ai-6-latka-zahyby` | Světlý; látka vpravo, prázdné světlé pozadí vlevo. | Žádný text na fotce. |

---

## Pravidla pro AI obrázky (platí pro R11-01 až R11-05)

- **Účel:** obrázky jsou **ilustrační atmosféra**.
- **Bez popisků a podpisů.** Nesmějí stát vedle tvrzení typu „naše výroba“ nebo „naše tkaniny na obrázku“.
- **`alt=""`** (dekorativní), stejně jako u ostatních fotek. Neutrální popis by čtečkám nic nepřinesl a obrázek by zbytečně prezentoval jako obsah.
- **Komentář do HTML** u každého z nich: `<!-- ilustrační obrázek (AI), nejde o fotografii z výroby -->`.
- **Barvy:** obrázky už jsou v paletě značky (navy, grafit, modrá, šedá), proto zůstávají v **přirozených barvách**, bez duotónu. Duotón by smazal modré akcenty, které ladí s webem.
- **Jedno použití na obrázek:** každý AI obrázek je na webu jako fotka jen jednou. Výjimkou jsou nevýrazné textury hlaviček (R11-04) a sdílecí obrázek (R11-05).

---

## R11-01 · P1 · Domů – hero z `ai-1-tkanina-detail`

**Proč:** levá třetina je připravená pro nadpis a vazba je ostrá. Zdroj má 1 536 px místo dosavadních 1 200 px.

**Výstupy:**

| Soubor | Výřez ze zdroje | Cílová velikost | Použití |
|---|---|---|---|
| `hero-ai-1536` | celý `0,0–1536,1024` | 1536 × 1024 | desktop |
| `hero-ai-1200` | celý `0,0–1536,1024` | 1200 × 800 | desktop |
| `hero-ai-960` | celý `0,0–1536,1024` | 960 × 640 | desktop |
| `hero-ai-m-768` | na výšku `x 380–1148`, `y 0–1024` | 768 × 1024 | mobil < 768 px |
| `hero-ai-m-540` | na výšku `x 380–1148`, `y 0–1024` | 540 × 720 | mobil < 768 px |

- **Kódování:** AVIF + WebP. WebP q60, AVIF podle SSIM jako v kole 7.
- **Rozpočet:** AVIF 1536 ≤ 90 kB, 1200 ≤ 60 kB, 960 ≤ 40 kB, mobil 768 ≤ 60 kB.

**Markup:** `<picture>`:
1. `<source media="(max-width: 767px)" type="image/avif" srcset="…m-540.avif 540w, …m-768.avif 768w" sizes="100vw">`;
2. totéž jako WebP;
3. desktop AVIF (`960w, 1200w, 1536w`, `sizes="(min-width:1536px) 1536px, 100vw"`);
4. `<img>` s WebP, `width="1536" height="1024"`, `alt=""`, `fetchpriority="high"`, `decoding="async"`.

**Široké obrazovky (> 1536 px):** obrázek se **nezvětšuje**.
- Obal fotky je ukotvený vpravo: `width: min(100%, 1536px); margin-left: auto`.
- Plocha vlevo od něj má barvu `#010307`, tedy barvu levého okraje zdroje.
- Levých 12 % fotky se rozpouští maskou: `mask-image: linear-gradient(90deg, transparent 0, #000 12%)`. Maska platí jen od 1537 px; pod tím by nic nedělala.
- Nahradí to dosavadní řešení s 1 200 px.

**Ořez:**

| Šířka | `object-fit` | `object-position` | Záměr |
|---|---|---|---|
| ≥ 1024 px | `cover` | `70% 40%` | Hřbet záhybu zůstává v pravé polovině. |
| 768–1023 px | `cover` | `75% 40%` | |
| < 768 px | `cover` (výřez na výšku) | `50% 30%` | |

**Překryv** (nahrazuje dosavadní):
- **≥ 768 px:** `linear-gradient(90deg, rgba(1,3,7,.60) 0%, rgba(1,3,7,.50) 45%, rgba(1,3,7,.30) 60%, rgba(1,3,7,0) 75%)`. Levá část je tmavá už sama, takže je překryv lehčí než dnes a fotka víc „svítí“.
- **< 768 px:** svisle `linear-gradient(180deg, rgba(1,3,7,.88) 0%, rgba(1,3,7,.80) 65%, rgba(1,3,7,.55) 100%)`.
- **Kontrast (povinně měřit):** nejsvětlejší pixel pod každým textem hero (eyebrow, H1, perex, „nebo zavolejte…“).
  - Šířky 390, 768, 1024, 1280, 1440 a 1920 px.
  - Perex a menší text ≥ 4,5 : 1, H1 ≥ 4,5 : 1.
  - Pokud některá šířka nevyjde, zvyšte hodnotu v pásu 45–60 % o 0,1, ne celkově.

**Beze změny zůstává:** `hero-settle` (1.06 → 1, jednou), faktový pás pod hero, žádný parallax hero.

**LCP:** A/B měření stejným skriptem jako v kole 7 (`r7-lcp-ab.mjs`, 6 běhů, pomalé 4G + CPU 4×). Nový hero nesmí zhoršit LCP Domů o víc než 10 % proti dnešku (mobil 1 240 ms, desktop 1 636 ms).

## R11-02 · P1 · Materiály – dělená hlavička s `ai-5-role-tkanin`

**Proč:** role v různých barvách vizuálně říkají „různé materiály“, a to je přesně téma stránky.

**Rozvržení:** stejná dělená hlavička jako u Laseru a O nás: text vlevo, fotka vpravo. Dosavadní textura `pouziti-duo-800` z hlavičky Materiálů odpadá. Motiv `weave-mark` zůstává za fotkou jako na O nás.

**Výstupy:**

| Soubor | Výřez ze zdroje | Cílová velikost |
|---|---|---|
| `materialy-role-960` | 4 : 3, `x 120–1485`, `y 0–1024` | 960 × 720 |
| `materialy-role-640` | 4 : 3, `x 120–1485`, `y 0–1024` | 640 × 480 |
| `materialy-role-m-768` | 16 : 9, `x 0–1536`, `y 100–964` (mobil) | 768 × 432 |

- **Kódování:** WebP q72 + AVIF.
- **Rozpočet:** 960 ≤ 70 kB AVIF.

**Zobrazení:**
- Desktop: 4 : 3, max. 440 CSS px, `rx 12`, rámeček 1 px `rgba(255,255,255,.08)`, `object-position: 55% 50%`. Fotka je nad ohybem, proto `fetchpriority="high"` a ne `lazy`.
- Mobil (< 1024 px): pod perexem, 16 : 9, max. výška 220 px, `object-position: 50% 45%`.
- `alt=""`.

**Pozor na sousedství:** perex „Vyrábíme tkaniny z polyesteru…“ je obecné tvrzení z webu a smí zůstat. Nepřidávat nic jako „na obrázku naše…“.

## R11-03 · P1 · O nás – `ai-6-latka-zahyby` místo kepru ze starého hero

**Proč:** web by jinak ukazoval dvě různá makra kepru (hero na Domů a O nás). Měkké světlé záhyby jsou klidný a „kvalitní“ obraz, který se k textu o tradici hodí. Na tmavé hlavičce působí jako světlé okno.

**Výstupy:**

| Soubor | Výřez ze zdroje | Cílová velikost | Poznámka |
|---|---|---|---|
| `onas-latka-960` | 4 : 3, `x 576–1536`, `y 160–880` | 960 × 720 | 1 : 1, bez zvětšení |
| `onas-latka-640` | 4 : 3, `x 576–1536`, `y 160–880` | 640 × 480 | |
| `onas-latka-m-768` | 16 : 9, `x 416–1536`, `y 300–930` (mobil) | 768 × 432 | |

- **Kódování:** WebP q72 + AVIF.
- **Zobrazení:** stejné jako dnes (desktop 4 : 3, max. 440 px, `object-position: 50% 50%`; mobil 16 : 9, max. výška 220 px). `alt=""`, `fetchpriority="high"`.
- **Úklid:** smazat `onas-twill-*` (WebP i AVIF), pokud je nic jiného nepoužívá.

## R11-04 · P2 · Textura hlaviček z `ai-1` (úplné vyřazení starého `hero.webp` z v2)

**Dnes:** `head-texture-640` (Služby, Ochrana soukromí) vzniká ze starého `hero.webp`.

**Nově:**
- Výřez `ai-1` `x 700–1536`, `y 100–660` → `head-texture-ai-640` (640 × 428), WebP q40 + AVIF.
- Průhlednost a maska stejné jako dnes (.14).

**Smazat:**
- `hero-1200/800` a `head-texture-640` (WebP i AVIF);
- v2 pak nebude obsahovat nic ze starého hero.

Kořenový `assets/img/hero.webp` (původní web) **neměnit**.

## R11-05 · P2 · Nový `og.jpg` z `ai-1`

- **Podklad:** zdroj zmenšený na šířku 1200 (1200 × 800), výřez `y 85–715` → 1200 × 630.
- **Obsah:** text v levé tmavé třetině, stejný jako dnes (logo, eyebrow, H1, fakta). Bez dalšího překryvu, levá část je tmavá sama; kontrast textu ověřit.
- **Formát:** mozjpeg q86, ≤ 90 kB.
- `og:image` dál míří na `/v2/…` a při nasazení se změní (je na seznamu orchestrátora).

## R11-06 · P1 · Akceptace

1. **Screenshoty `shots/r11-impl/`:**
   - Domů, Materiály, O nás, Služby a Ochrana soukromí;
   - desktop 1440 a 1920 px (hero s maskou vlevo), tablet 768 a 1024 px, mobil 390 a 320 px.
2. **Kontrast hero** podle R11-01, tabulka hodnot.
3. **LCP A/B** podle R11-01 a velikosti souborů proti rozpočtům.
4. **Bajty obrázků na stránku** před a po (`r7-imgbytes.mjs`). Domů se smí zvětšit nejvýš o 30 kB (AVIF).
5. **Kontrola odkazů:**
   - žádný odkaz na smazané soubory;
   - žádný nepoužitý soubor;
   - `porovnani.html` nedotčený.
6. **Regrese:**
   - omezený pohyb, bez JS;
   - 320–1920 px bez vodorovného přetečení;
   - „Jiné“;
   - konzole čistá;
   - CLS ≤ 0,02.

**Volitelně (rozhodnutí majitele, ne implementátora):** krátká poznámka v Ochraně soukromí nebo v patičce, např. „Ilustrační obrázky na webu byly vytvořeny s pomocí AI.“ Právně u obecných obrázků látek nutná není, ale je to poctivé gesto. Na seznam pro majitele.
