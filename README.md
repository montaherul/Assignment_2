# 🎬 MovieExplorer

A responsive **Movie Explorer Application** built with **React** and the free **TVMaze API**. Browse, search, and view detailed information about your favorite movies and TV shows.

## ✨ Features

- **Home Page** — Sticky navbar, hero banner with CTA, feature highlights, and footer.
- **Movie Listing Page** — Live search by title via the TVMaze `GET /search/shows` endpoint, plus full catalog browsing via `GET /shows`.
- **Movie Cards** — Responsive CSS Grid with poster, title, release year, ⭐ rating, and a **See Details** button.
- **Details Modal** — Backdrop image, title, rating, release date, genres, summary, language, type, and status. Closable via the ✕ button, backdrop click, or `Esc` key.

## 🛠️ Tech Stack

- JavaScript + React (Vite)
- React Router (`react-router-dom`)
- CSS (fully responsive, no framework)
- Data: [TVMaze API](https://www.tvmaze.com/api)

## 📦 Getting Started

```bash
npm install
npm run dev      # start dev server
npm run build    # production build
npm run preview  # preview production build
npm run lint     # run linter
```

## 🚀 Deployment

The app is fully static and can be deployed to **Vercel**, **Netlify**, or **GitHub Pages** by building the `dist/` folder:

```bash
npm run build
```

## 📁 Project Structure

```
src/
  api/
    tvmaze.js      # TVMaze API helpers
  hooks/
    useDebouncedValue.js  # debounce hook for the search box
  components/
    Navbar.jsx     # Sticky navigation bar
    Footer.jsx     # Footer with links + attribution
    Poster.jsx     # Poster image with fallback handling
    MovieCard.jsx  # Movie card component
    MovieModal.jsx # Details dialog
    SkeletonCard.jsx # Loading placeholder
  pages/
    HomePage.jsx   # Landing page (hero + trending + steps)
    MoviesPage.jsx # Search + browse page
  App.jsx          # Routes
  App.css          # Component styles
  index.css        # Global tokens and base styles
```

## 📡 API Endpoints Used

| Purpose        | Endpoint                         |
| -------------- | -------------------------------- |
| Browse all     | `GET https://api.tvmaze.com/shows` |
| Search by title| `GET https://api.tvmaze.com/search/shows?q=:query` |

## 📱 Responsive Design

- **Mobile:** single/compact column grid, stacked elements, touch-friendly buttons.
- **Desktop:** fluid 4+ column grid with optimized spacing.

## 📄 License

© 2026 MovieExplorer. Educational assignment project.