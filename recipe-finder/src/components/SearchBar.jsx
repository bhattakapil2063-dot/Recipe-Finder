export default function SearchBar({ query, mode, onQueryChange, onModeChange, onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        aria-label="Search recipes"
        placeholder={
          mode === "name" ? "Search by dish name, e.g. pasta" : "Search by ingredient, e.g. chicken"
        }
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
      />
      <select
        aria-label="Search by"
        value={mode}
        onChange={(event) => onModeChange(event.target.value)}
      >
        <option value="name">Dish name</option>
        <option value="ingredient">Ingredient</option>
      </select>
      <button type="submit" className="btn-primary">
        Search
      </button>
    </form>
  );
}
