# Kolo 10 – závěrečná kontrola R9-01 (vzorníky jako role látky)

**Podklady:**
- sekce „Kolo 9“ v `reviews/round-7-impl.md`;
- `shots/r9-impl/` (`compare-*`, `blind-*`, `iter/`);
- moje snímky v `shots/r10-review/`:
  - Materiály a sekce Materiály na Domů, desktop 1440 a mobil 390 px, vždy v kontextu stránky i jako výřez;
  - regrese v `checks/`.

## Ověření

| Bod | Stav | Poznámka |
|---|---|---|
| R9-01 Vzorníky | ✅ | **Desktop (96 px):** jednoznačně role látky. Dlouhá štíhlá role se spirálou vrstev, látka splývá v měkkých záhybech do vlnitého lemu a modrý pruh vede přes roli i látku. Všitá etiketa PES / PA / PP / CO je čitelná a „CO“ nahradilo tobolku, která četla jako domeček. **Mobil (48 px):** v kontextu karty, hned vedle názvu materiálu, čte jako role látky. Etiketa se nekreslí, takže žádný prázdný rámeček. |
| Odchylky od zadání | ✅ schváleno | Natočení osy o 18°, splývání místo rozlití a etiketa 32 × 14 natočená s látkou jsou dobře zdůvodněné iteracemi: čelní pohled četl jako sukně nebo muffin, krátká role jako toaletní papír. Výsledek je lepší než moje doslovné zadání. |
| Regrese | ✅ | Materiály i Domů bez přetečení a bez chyb v konzole na desktopu i mobilu. Omezený pohyb: 0 animací, 0 skrytých textů. Bez JS je vše vidět a nakreslené. Text procesu je vidět hned. „Jiné“ funguje na 320 / 768 / 1024 / 1920 px. |

## Povinné opravy
Žádné.

## Volitelně později
U 48 px nelze úplně vyloučit čtení „papírová utěrka“. Název materiálu je ale přímo vedle ikony, takže to nevadí. Pokud by to někomu vadilo, stačí na mobilu zvětšit vlny lemu (amplituda 6 → 8).

VERDIKT: SCHVÁLENO
