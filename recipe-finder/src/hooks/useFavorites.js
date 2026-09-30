import useLocalStorage from "./useLocalStorage";

export default function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage("favorites", []);

  const isFavorite = (id) => favorites.some((meal) => meal.idMeal === id);

  const toggleFavorite = (meal) => {
    setFavorites((prev) => {
      if (prev.some((item) => item.idMeal === meal.idMeal)) {
        return prev.filter((item) => item.idMeal !== meal.idMeal);
      }
      const { idMeal, strMeal, strMealThumb, strCategory, strArea } = meal;
      return [...prev, { idMeal, strMeal, strMealThumb, strCategory, strArea }];
    });
  };

  return { favorites, isFavorite, toggleFavorite };
}
