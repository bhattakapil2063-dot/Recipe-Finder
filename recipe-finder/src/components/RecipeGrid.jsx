import RecipeCard from "./RecipeCard";

export default function RecipeGrid({ meals, isFavorite, onToggleFavorite }) {
  return (
    <div className="grid">
      {meals.map((meal) => (
        <RecipeCard
          key={meal.idMeal}
          meal={meal}
          isFavorite={isFavorite(meal.idMeal)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
