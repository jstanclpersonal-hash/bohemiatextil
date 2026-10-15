# Bohemia Textil – web

Statická kopie webu www.bohemiatextil.cz (původně na Wixu). Čisté HTML + CSS, žádný build, hostováno zdarma na GitHub Pages.

## Struktura

| Soubor | Stránka |
| --- | --- |
| `index.html` | Domů |
| `sluzby.html` | Služby |
| `laserove-rezani.html` | Laserové řezání |
| `materialy.html` | Materiály |
| `o-nas.html` | O nás |
| `kontakt.html` | Kontakt (formulář) |
| `ochrana-soukromi.html` | Ochrana soukromí |
| `o-nás.html`, `služby.html`, … | přesměrování ze starých Wix adres |
| `assets/css/style.css` | veškerý vzhled |
| `assets/js/site.js` | mobilní menu + odeslání formuláře |

Hlavička a patička jsou v každém HTML souboru zvlášť – při změně (např. telefonu) je potřeba upravit všech 7 stránek.

## Návrh v2 (redesign)

Ve složce `v2/` je nová verze webu, vzniklá ve třech kolech: designér udělal audit, vývojář úpravy zapracoval,
designér je zkontroloval a dal další zpětnou vazbu. Původní web v kořeni repozitáře zůstává beze změny kvůli srovnání.

- Nová verze: `/v2/`, srovnání obou verzí vedle sebe: `/v2/porovnani`.
- `v2/` má vlastní `assets/` (nové CSS, JS, ikony, zmenšené obrázky). Hlavička a patička jsou opět v každé stránce zvlášť.
- Stránky v2 mají `noindex` a `robots.txt` má `Disallow: /v2/`, aby návrh nekonkuroval původnímu webu ve vyhledávačích.
- Zápisy z jednotlivých kol (audit, kontroly, seznam obsahu k doplnění od majitele) jsou ve složce `_redesign/`
  (složky s podtržítkem GitHub Pages nepublikuje).

Až bude v2 schválená k nasazení:
1. Přesunout obsah `v2/` do kořene místo původních stránek (kromě `porovnani.html`).
2. Odstranit `<meta name="robots" content="noindex">` ze všech stránek a řádek `Disallow: /v2/` z `robots.txt`.
3. V `kontakt.html` změnit skryté pole `_next` na `https://www.bohemiatextil.cz/kontakt?odeslano=1`.
4. Ve všech stránkách změnit `og:image` z `…/v2/assets/img/og.jpg` na `…/assets/img/og.jpg`.
5. Zkontrolovat `sitemap.xml` a přesměrování ze starých Wix adres.
6. Projet stránky nástroji axe a Lighthouse v Chromu a v DevTools ověřit, že se obrázky `.avif` posílají jako `image/avif`.

Vizuály v2: vlastní vektorové ilustrace (`v2/assets/img/illustrations.svg` a inline SVG ve stránkách) a fotky
z původního webu v tmavomodrém tónu. Animace jsou jen v CSS/JS bez knihoven a při systémovém „omezit pohyb“ se vypnou.

## Animace

Obsah plynule najíždí při scrollování. Animuje se každý prvek s atributem `data-reveal`
(`data-reveal="fade"` = jen prolnutí, `data-reveal="left"` = zleva) a všichni přímí potomci
prvku s `data-stagger` (najíždějí postupně jeden po druhém). Nový blok tedy stačí označit
atributem. Lidé se zapnutým „omezit pohyb" v systému animace neuvidí.

## Kontaktní formulář

Formulář posílá zprávy přes službu [FormSubmit](https://formsubmit.co) na `vaclav.stancl@tiscali.cz` (adresa je v `kontakt.html`, atributy `action` a `data-endpoint`).
Po prvním odeslání přijde na tuto adresu e-mail s odkazem **Activate Form** – je potřeba na něj jednou kliknout, teprve pak se zprávy začnou doručovat.

## Lokální náhled

```bash
npx serve .
```

## Nasazení

Každý push do větve `main` se automaticky publikuje na GitHub Pages.

## Přesměrování domény (Forpsi)

Doména `bohemiatextil.cz` je registrovaná u Forpsi, DNS teď směřuje na Wix (`ns8/ns9.wixdns.net`).

1. V administraci Forpsi vrátit DNS servery na Forpsi.
2. Nastavit záznamy:
   - `A` pro `bohemiatextil.cz` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` pro `www` → `jstanclpersonal-hash.github.io.`
3. V GitHubu (Settings → Pages) nastavit Custom domain `www.bohemiatextil.cz` a zapnout Enforce HTTPS.
4. Až nový web na doméně běží, zrušit Wix Premium.
