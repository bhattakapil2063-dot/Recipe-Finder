import { Link } from "react-router-dom";

export default function RecipeCard({ meal, isFavorite, onToggleFavorite }) {
  const details = [meal.strCategory, meal.strArea].filter(Boolean).join(", ");

  return (
    <article className="card">
      <Link to={`/recipe/${meal.idMeal}`} className="card-link">
        <img src={meal.strMealThumb} alt={meal.strMeal} loading="lazy" />
        <div className="card-body">
          <h3>{meal.strMeal}</h3>
          {details && <p>{details}</p>}
        </div>
      </Link>
      <button
        className={`fav-btn ${isFavorite ? "fav-active" : ""}`}
        aria-pressed={isFavorite}
        onClick={() => onToggleFavorite(meal)}
      >
        {isFavorite ? "Saved" : "Save"}
      </button>
    </article>
  );
}
