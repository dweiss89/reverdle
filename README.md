# Reverdle

A simple browser-based game for reverse-engineering Wordle guesses. The page in `public/` can be deployed to any static host.

## Running locally

Use a static server, for example with Python:

```bash
cd public
python3 -m http.server 8000
```

Then open `http://localhost:8000/create.html` to build a puzzle or `index.html` with a generated link to play.
