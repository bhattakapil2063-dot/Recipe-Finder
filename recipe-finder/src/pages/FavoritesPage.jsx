import { Link } from "react-router-dom";
import RecipeGrid from "../components/RecipeGrid";

export default function FavoritesPage({ favorites, isFavorite, onToggleFavorite }) {
  return (
    <section>
      <h1>Your favorites</h1>
      {favorites.length === 0 ? (
        <p className="message">
          You have not saved any recipes yet. <Link to="/">Find one to save.</Link>
        </p>
      ) : (
        <RecipeGrid
          meals={favorites}
          isFavorite={isFavorite}
          onToggleFavorite={onToggleFavorite}
        />
      )}
    </section>
  );
}
