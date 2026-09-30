const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

async function request(path) {
  const response = await fetch(`${BASE_URL}/${path}`);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const data = await response.json();
  return data.meals || [];
}

export const searchByName = (name) =>
  request(`search.php?s=${encodeURIComponent(name)}`);

export const searchByIngredient = (ingredient) =>
  request(`filter.php?i=${encodeURIComponent(ingredient)}`);

export const filterByCategory = (category) =>
  request(`filter.php?c=${encodeURIComponent(category)}`);

export const getCategories = () => request("list.php?c=list");

export async function getMealById(id) {
  const meals = await request(`lookup.php?i=${encodeURIComponent(id)}`);
  return meals[0] || null;
}
