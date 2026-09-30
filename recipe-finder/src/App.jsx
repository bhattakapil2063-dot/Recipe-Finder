import { Route, Routes } from "react-router-dom";
import useFavorites from "./hooks/useFavorites";
import Navbar from "./components/Navbar";
import SearchPage from "./pages/SearchPage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import FavoritesPage from "./pages/FavoritesPage";

export default function App() {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  return (
    <>
      <Navbar favoriteCount={favorites.length} />
      <main className="container">
        <Routes>
          <Route
            path="/"
            element={
              <SearchPage isFavorite={isFavorite} onToggleFavorite={toggleFavorite} />
            }
          />
          <Route
            path="/recipe/:id"
            element={
              <RecipeDetailPage isFavorite={isFavorite} onToggleFavorite={toggleFavorite} />
            }
          />
          <Route
            path="/favorites"
            element={
              <FavoritesPage
                favorites={favorites}
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
              />
            }
          />
          <Route path="*" element={<p className="message">Page not found.</p>} />
        </Routes>
      </main>
    </>
  );
}
