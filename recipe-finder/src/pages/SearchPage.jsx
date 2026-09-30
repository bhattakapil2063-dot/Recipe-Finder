import { useEffect, useRef, useState } from "react";
import {
  filterByCategory,
  getCategories,
  searchByIngredient,
  searchByName,
} from "../api/mealApi";
import SearchBar from "../components/SearchBar";
import RecipeGrid from "../components/RecipeGrid";
import Spinner from "../components/Spinner";

const PAGE_SIZE = 12;

export default function SearchPage({ isFavorite, onToggleFavorite }) {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState("name");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [meals, setMeals] = useState([]);
  const [status, setStatus] = useState("idle");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const latestRequest = useRef(0);

  useEffect(() => {
    let ignore = false;
    getCategories()
      .then((list) => {
        if (!ignore) setCategories(list.map((item) => item.strCategory));
      })
      .catch(() => {
        if (!ignore) setCategories([]);
      });
    return () => {
      ignore = true;
    };
  }, []);

  const runSearch = async (fetcher) => {
    const requestId = ++latestRequest.current;
    setStatus("loading");
    setVisibleCount(PAGE_SIZE);
    try {
      const results = await fetcher();
      if (requestId !== latestRequest.current) return;
      setMeals(results);
      setStatus("success");
    } catch {
      if (requestId !== latestRequest.current) return;
      setStatus("error");
    }
  };

  const handleSearch = () => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setCategory("");
    runSearch(() =>
      mode === "name" ? searchByName(trimmed) : searchByIngredient(trimmed)
    );
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setCategory(value);
    if (!value) return;
    setQuery("");
    runSearch(() => filterByCategory(value));
  };

  return (
    <section>
      <h1>Find a recipe</h1>
      <SearchBar
        query={query}
        mode={mode}
        onQueryChange={setQuery}
        onModeChange={setMode}
        onSubmit={handleSearch}
      />

      <label className="category-filter">
        Or browse a category
        <select value={category} onChange={handleCategoryChange}>
          <option value="">Choose a category</option>
          {categories.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </label>

      {status === "idle" && (
        <p className="message">Search for a dish or ingredient to get started.</p>
      )}
      {status === "loading" && <Spinner />}
      {status === "error" && (
        <p className="message message-error" role="alert">
          Could not load recipes. Check your connection and try again.
        </p>
      )}
      {status === "success" && meals.length === 0 && (
        <p className="message">No recipes found. Try a different search.</p>
      )}
      {status === "success" && meals.length > 0 && (
        <>
          <RecipeGrid
            meals={meals.slice(0, visibleCount)}
            isFavorite={isFavorite}
            onToggleFavorite={onToggleFavorite}
          />
          {visibleCount < meals.length && (
            <button
              className="btn-secondary load-more"
              onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            >
              Load more
            </button>
          )}
        </>
      )}
    </section>
  );
}
