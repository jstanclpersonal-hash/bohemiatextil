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
