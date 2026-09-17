# ✦ Laugh Nexus

> A cyber-anime random joke generator powered by an external API.

![Laugh Nexus](https://img.shields.io/badge/LAUGH-NEXUS-ff4fc4?style=for-the-badge&labelColor=090b18)
![API](https://img.shields.io/badge/API-JokeAPI-51e6ff?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-f4df69?style=for-the-badge)

Laugh Nexus pulls fresh jokes from [JokeAPI](https://jokeapi.dev/) and presents them in a neon anime-inspired interface. It is a lightweight, dependency-free frontend that runs directly in the browser.

## Features

- Random jokes from an external API using `fetch`
- Single-line and two-part jokes
- Category filters: Any, Programming, Misc, Dark, Pun, Spooky, and Christmas
- Safe mode with offensive-content blacklist flags
- Copy jokes to the clipboard
- Save favorite jokes locally
- Keyboard shortcut: press `Enter` to generate
- Loading state and friendly API error handling
- Responsive neon UI with transmission counter
- No build step or API key required

## Run locally

```bash
git clone https://github.com/sifatyt20c-lang/anime-character-generator.git
cd anime-character-generator
python3 -m http.server 8080
```

Open `http://localhost:8080` in your browser. You can also open `index.html` directly, although a local server is recommended for consistent browser behavior.

## API integration

The app requests jokes from:

```text
https://v2.jokeapi.dev/joke/{category}?type=single,twopart&safe-mode
```

The browser's `fetch` API handles the request, while the UI checks both HTTP failures and JokeAPI's JSON `error` field. Jokes are escaped before rendering to prevent API-provided text from becoming HTML.

## Project files

- `index.html` — accessible application structure
- `style.css` — responsive neon visual system
- `script.js` — API calls, filtering, favorites, clipboard, and state

## License

MIT. Joke content is provided by JokeAPI under its own terms.
