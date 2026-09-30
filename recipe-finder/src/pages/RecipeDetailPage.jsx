import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMealById } from "../api/mealApi";
import Spinner from "../components/Spinner";

function getIngredients(meal) {
  const items = [];
  for (let index = 1; index <= 20; index++) {
    const name = meal[`strIngredient${index}`];
    const measure = meal[`strMeasure${index}`];
    if (name && name.trim()) {
      items.push({ name: name.trim(), measure: (measure || "").trim() });
    }
  }
  return items;
}

export default function RecipeDetailPage({ isFavorite, onToggleFavorite }) {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let ignore = false;
    setStatus("loading");
    getMealById(id)
      .then((result) => {
        if (ignore) return;
        setMeal(result);
        setStatus(result ? "success" : "notFound");
      })
      .catch(() => {
        if (!ignore) setStatus("error");
      });
    return () => {
      ignore = true;
    };
  }, [id]);

  if (status === "loading") return <Spinner />;
  if (status === "error") {
    return (
      <p className="message message-error" role="alert">
        Could not load this recipe. Please try again.
      </p>
    );
  }
  if (status === "notFound") return <p className="message">Recipe not found.</p>;

  const steps = meal.strInstructions.split(/\r?\n/).filter((line) => line.trim());
  const saved = isFavorite(meal.idMeal);

  return (
    <article className="detail">
      <Link to="/" className="back-link">
        Back to search
      </Link>
      <div className="detail-header">
        <img src={meal.strMealThumb} alt={meal.strMeal} />
        <div>
          <h1>{meal.strMeal}</h1>
          <p className="detail-meta">
            {[meal.strCategory, meal.strArea].filter(Boolean).join(", ")}
          </p>
          <button
            className={saved ? "btn-secondary" : "btn-primary"}
            aria-pressed={saved}
            onClick={() => onToggleFavorite(meal)}
          >
            {saved ? "Remove from favorites" : "Save to favorites"}
          </button>
          {meal.strYoutube && (
            <p>
              <a href={meal.strYoutube} target="_blank" rel="noreferrer">
                Watch on YouTube
              </a>
            </p>
          )}
        </div>
      </div>

      <div className="detail-content">
        <section>
          <h2>Ingredients</h2>
          <ul className="ingredients">
            {getIngredients(meal).map((item) => (
              <li key={item.name}>
                <span>{item.name}</span>
                <span>{item.measure}</span>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2>Instructions</h2>
          {steps.map((step, index) => (
            <p key={index}>{step}</p>
          ))}
        </section>
      </div>
    </article>
  );
}
