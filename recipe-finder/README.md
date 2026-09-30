# Recipe Finder

A React app for discovering recipes by dish name or ingredient using the free TheMealDB API. Open any recipe for its full ingredients and instructions, and save your favorites so they are still there next time.

## Features

- Search recipes by dish name or by ingredient
- Responsive card grid with image, title, category and cuisine
- Recipe detail page with ingredients, measurements, instructions and a video link
- Save and remove favorites, persisted with localStorage
- Loading, error and "no results" states
- Filter by category (stretch goal)
- Dedicated Favorites page using React Router (stretch goal)
- "Load more" pagination (stretch goal)

## Technologies

- React 18 (functional components and hooks)
- React Router 6
- Vite
- TheMealDB API (no API key needed)

## Setup

```bash
npm install
npm run dev
```

Open the URL printed in the terminal (usually http://localhost:5173).

## Screenshots

_Add 2-3 screenshots here (search results, recipe detail, favorites page)._

## Live demo

_Add your Vercel / Netlify link here._

## Known limitations

- Ingredient and category searches return only the title and image, so those cards do not show category or cuisine until you open the recipe
- Ingredient search matches one ingredient at a time
- The free API key returns a limited set of recipes
