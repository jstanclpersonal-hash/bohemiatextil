# Kolo 12 – kontrola R11 (tři AI obrázky)

**Podklady:**
- sekce „Kolo 11“ v `reviews/round-7-impl.md`;
- `shots/r11-impl/`;
- moje snímky `shots/r12-review/`: Domů, Materiály a O nás na 320 / 390 / 768 / 1024 / 1440 / 1920 / 2560 px;
- regrese v `checks/`.

## Ověření

| Bod | Stav | Poznámka |
|---|---|---|
| R11-01 Hero Domů | ✅ | **Fotka:** silná, ostrá a v barvách značky. **Široké obrazovky (1920, 2560 px):** fotka se nezvětšuje, zůstává ukotvená vpravo a levý okraj plynule přechází do černé, bez viditelného švu. **Mobil (320 / 390 px):** výřez na výšku nese vazbu za textem a text je čitelný. Načítá se správná varianta (`hero-ai-m-768` mobil, `-960` / `-1200` / `-1536` desktop), `alt=""`. |
| R11-02 Materiály | ✅ | Role v dělené hlavičce jsou silný a výmluvný obraz. Na mobilu je fotka 16 : 9 pod perexem. |
| R11-03 O nás | ✅ | Světlé záhyby na tmavé hlavičce působí klidně a kvalitně. Duplicita kepru zmizela. |
| R11-04 Textura hlaviček | ✅ | Ve v2 nezůstal žádný odkaz na starý hero (`hero-1200/800`, `onas-twill`, `head-texture-640`). |
| R11-05 `og.jpg` | ✅ | Čitelný, v barvách značky, text v tmavé levé části, fakta odpovídají webu. |
| Pravdivost | ✅ | Bez popisků, `alt=""`. Komentář „ilustrační obrázek (AI)“ je u všech použití. Vedle obrázků nestojí žádné tvrzení o „naší výrobě“. |
| Regrese | ✅ | 320–2560 px bez přetečení a bez chyb v konzoli. Omezený pohyb: 0 animací, 0 skrytých textů. Bez JS vše vidět. Text procesu je vidět hned. „Jiné“ funguje na všech šířkách. |

## Odchylky – schváleno
1. **Svislý překryv na 768–1023 px:** správné rozhodnutí. Fotka je v tomto pásmu tlumenější, ale perex je čitelný; 0,8 : 1 by bylo nepřijatelné.
2. **Perex do 50 % šířky od 1024 px:** v pořádku. Řádky mají příjemnou délku a text nezasahuje do světlé části fotky.
3. **`og.jpg` v q78 (86,5 kB):** v pořádku, rozpočet má přednost a text je ostrý.
4. **Varianty 480w a AVIF q46 u Materiálů a O nás:** v pořádku.

## Povinné opravy
Žádné.

## Pro nasazení (seznam orchestrátora)
- `og:image` a `_next` přepnout z `/v2/` na kořen.
- Ověřit `Content-Type: image/avif` na GitHub Pages.
- Majitel může zvážit krátkou poznámku o AI ilustracích v Ochraně soukromí (volitelné, z kola 11).

VERDIKT: SCHVÁLENO
