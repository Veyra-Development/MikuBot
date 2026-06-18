<div align="center">

# 💙 MikuBot

### Discord Bot z Anime Klimatem i Real NSFW

[![Discord.js](https://img.shields.io/badge/discord.js-v14-blue.svg)](https://discord.js.org/)
[![Node.js](https://img.shields.io/badge/node.js-16.9.0+-brightgreen.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

*Bot Discord dostarczający wysokiej jakości treści anime z konachan.com oraz realne media NSFW dzięki zaawansowanemu systemowi API redundancy*

</div>

---

## ✨ Funkcje

- 🎨 **14 kategorii Anime NSFW** - Bogate i różnorodne treści anime z Konachan.
- 👤 **11 kategorii Real NSFW** - Realne grafiki, gify i wideo (Solo, Pair, Ass, Anal, Pussy, Boobs, Sex, Cum, GIF, Random, Other).
- 🔄 **Redundancja API** - Automatyczny system fallback dla realnych kategorii (NekoBot -> Eporner -> wbudowany fallback statyczny).
- ⚡ **Pamięć podręczna (Cache)** - System pamięci Map + TTL (5 min), zapewniający błyskawiczne odpowiedzi i mniejsze obciążenie API.
- ⏳ **User Cooldown** - Blokada spamu (3-5 sekund) zabezpieczająca bota przed przeciążeniem.
- 🖼️ **Wiele formatów** - Obrazy (JPG, PNG, WEBP), GIF-y i wideo (WEBM, MP4).
- 💾 **Funkcja zapisywania** - Wygodne wysyłanie wyświetlonej grafiki/wideo na prywatną wiadomość użytkownika (DM).
- 🔒 **Bezpieczeństwo** - Automatyczna weryfikacja kanałów NSFW (`channel.nsfw === true`).

---

## 📦 Instalacja

### Wymagania
- Node.js 16.9.0 lub nowszy
- npm (instaluje się z Node.js)

### Kroki

```bash
# 1. Sklonuj repozytorium
git clone https://github.com/twoj-username/MikuBot.git
cd MikuBot

# 2. Zainstaluj zależności
npm install

# 3. Skonfiguruj bota (patrz poniżej)
```

---

## ⚙️ Konfiguracja

### 1. Utwórz Discord Bot

1. Odwiedź [Discord Developer Portal](https://discord.com/developers/applications)
2. Kliknij **"New Application"** → **"Bot"** → **"Add Bot"**
3. Skopiuj **Token** i **Application ID**

### 2. Utwórz config.json

```json
{
  "token": "TWÓJ_TOKEN_BOTA",
  "clientId": "TWOJE_CLIENT_ID"
}
```

> ⚠️ **Nie udostępniaj tokena publicznie!**

### 3. Zaproś bota na serwer

W Discord Developer Portal → **OAuth2** → **URL Generator**:

**Scopes:** `bot`, `applications.commands`  
**Permissions:** `Send Messages`, `Embed Links`, `Use Slash Commands`

Użyj wygenerowanego URL, aby dodać bota na serwer.

---

## 🚀 Uruchomienie

```bash
npm start
```

Powinieneś zobaczyć:
```
✅ Komendy slash zarejestrowane!
✨ MikuBot#1234 jest online!
```

---

## 📝 Komendy

### `/nsfw <category>`

Pobiera losową grafikę anime lub realne media z wybranej kategorii. Działa wyłącznie na kanałach NSFW.

#### 🌸 Kategorie Anime (14):
| Emoji | Kategoria | Opis |
|-------|-----------|------|
| 🍑 | **Ass** | Grafiki skupione na pośladkach anime |
| 💕 | **Pussy** | Treści erotyczne anime |
| 🍆 | **Anal** | Sceny analne anime |
| ❤️ | **Sex** | Sceny erotyczne/seksualne anime |
| 💦 | **Cum** | Grafiki z wytryskami anime |
| ⛓️ | **Bondage** | Treści BDSM i krępowania anime |
| 🎄 | **Christmas** | Świąteczne grafiki erotyczne anime |
| 🐙 | **Tentacles** | Grafiki z mackami |
| 🎮 | **Genshin Impact** | Postacie z Genshin Impact (5000+ grafik) |
| 💜 | **Futanari** | Postacie futanari |
| 🗡️ | **Arknights** | Postacie z Arknights (2900+ grafik) |
| 🍌 | **Dildo** | Postacie z zabawkami erotycznymi |
| ✋ | **Masturbation** | Sceny samogwałtu |
| 🥒 | **Penis** | Grafiki z penisami |

#### 👤 Kategorie Realne (11):
| Emoji | Kategoria | Opis |
|-------|-----------|------|
| 👤 | **Real: Solo** | Realne zdjęcia erotyczne solo |
| 👥 | **Real: Pair** | Realne zdjęcia erotyczne par/scen grupowych |
| 🍑 | **Real: Ass** | Pośladki / realne zdjęcia |
| 🍆 | **Real: Anal** | Sceny analne |
| 💕 | **Real: Pussy** | Waginy / zbliżenia erotyczne |
| 🍒 | **Real: Boobs** | Realne piersi / biusty |
| ❤️ | **Real: Sex** | Klasyczne sceny zbliżeń erotycznych |
| 💦 | **Real: Cum** | Realny wytrysk / cumshots |
| 🎞️ | **Real: GIF** | Animowane ruchome gify erotyczne |
| 🎲 | **Real: Random** | Losowo wybrane realne zdjęcie |
| 🌀 | **Real: Other** | Pozostałe kategorie BDSM / fetysze |

**Przykład:** `/nsfw category:real.ass`

---

## 🐛 Rozwiązywanie Problemów

| Problem | Rozwiązanie |
|---------|-------------|
| Bot nie odpowiada | Sprawdź uprawnienia: `Send Messages`, `Embed Links` |
| "Missing Access" | Upewnij się, że bot może pisać w kanale |
| "Invalid Token" | Zregeneruj token w Discord Developer Portal |
| "Ta komenda może być używana tylko..." | Użyj komendy na kanale z włączoną opcją NSFW |
| Zwolnij! Musisz odczekać... | Komenda posiada 4-sekundowy cooldown na użytkownika |

---

## 🛠️ Technologie

- **[Node.js](https://nodejs.org/)** - Środowisko uruchomieniowe JavaScript
- **[Discord.js v14](https://discord.js.org/)** - Biblioteka do integracji z Discord API
- **[Axios](https://axios-http.com/)** - Klient zapytań HTTP
- **[Konachan.com API](https://konachan.com/)** - Źródło treści anime
- **[NekoBot API](https://nekobot.xyz/)** - Główne źródło treści Real NSFW
- **[Eporner API](https://www.eporner.com/)** - Zapasowe źródło treści Real NSFW

---

## 📁 Struktura Projektu

```
MikuBot/
├── bot.js                  # Główny plik bota (komendy, eventy, konfiguracja Discord.js)
├── realMediaService.js     # Moduł obsługujący zapytania Real NSFW, cache i fallback
├── config.json             # Konfiguracja (token, clientId)
├── package.json            # Zależności i skrypty npm
├── README.md               # Dokumentacja projektu
└── opis.md                 # Opis dla użytkowników
```

---

## 🤝 Współpraca

1. Wykonaj Fork projektu
2. Stwórz nową gałąź (`git checkout -b feature/NowaFunkcja`)
3. Zatwierdź zmiany (`git commit -m 'Dodaj nową funkcję'`)
4. Wyślij na repozytorium (`git push origin feature/NowaFunkcja`)
5. Otwórz Pull Request

---

## 📄 Licencja

Projekt dystrybuowany na licencji **MIT**. Zobacz [LICENSE](LICENSE) dla szczegółów.

---

## 👤 Autor

**UhcWolfe**

- 💬 Discord: [Veyra Development](https://dc.veyradev.com/)

---

## 📞 Wsparcie

- 🐛 [Zgłoś problem](https://github.com/twoj-username/MikuBot/issues)
- 💡 [Zaproponuj funkcję](https://github.com/twoj-username/MikuBot/issues/new)
- 💬 [Dołącz na Discord](https://dc.veyradev.com/)

---

<div align="center">

Made with 💙 by **UhcWolfe** | [Veyra Development](https://dc.veyradev.com/)

*Jeśli projekt Ci się podoba, zostaw ⭐*

</div>
