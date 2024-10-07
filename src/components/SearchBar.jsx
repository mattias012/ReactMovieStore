
function SearchBar() {
  return (
    <div className="search-bar">
      <h1>Welcome.</h1>
      <p>Millions of movies, TV shows to discover</p>
      <div className="search-input">
        <input type="text" placeholder="Search for a movie" />
        <button className="search-button">🔍</button>
      </div>
    </div>
  );
}

export default SearchBar;
