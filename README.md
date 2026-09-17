# ◈ Chrono Nexus

> A neon anime-inspired digital clock for the whole planet.

![Chrono Nexus](https://img.shields.io/badge/CHRONO-NEXUS-ff4fc4?style=for-the-badge&labelColor=080b18)
![Vanilla JS](https://img.shields.io/badge/JavaScript-Vanilla-f7df1e?style=for-the-badge&logo=javascript&logoColor=111)
![License](https://img.shields.io/badge/license-MIT-57e5ff?style=for-the-badge)

Chrono Nexus is a zero-dependency world clock dashboard with a cyberpunk anime aesthetic. It uses the browser's native `Intl.DateTimeFormat` API, so daylight-saving changes and time-zone offsets stay accurate automatically.

## Features

- Live clocks that update every second
- Tokyo, New York, London, and Sydney included by default
- Add and remove locations from the network
- Search through cities and IANA time zones
- One-click 12-hour / 24-hour formatting
- Light/dark theme toggle
- Persistent locations and format preference with `localStorage`
- Responsive glassmorphism UI with neon animations
- No build step, backend, or API key required

## Launch locally

```bash
git clone https://github.com/sifatyt20c-lang/anime-character-generator.git
cd anime-character-generator
```

Open `index.html` in a browser, or run any static server:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Advanced function

The dashboard uses the IANA time-zone database built into modern browsers through `Intl.DateTimeFormat`. This means each clock calculates its own local time and UTC offset independently rather than applying a fragile fixed-hour offset. The same approach correctly handles daylight-saving transitions.

## Customize

Add more locations to the `zoneNames` object in `script.js`. Any valid IANA time zone such as `Europe/Berlin` or `America/Chicago` will work.

## License

MIT © Chrono Nexus contributors
