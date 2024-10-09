import { useSelector } from 'react-redux';

const MovieCatalog = ({ status, error }) => {
  // Retrieve movies from the Redux store
  const movies = useSelector((state) => state.movies.movies);

  // Render the UI based on the state
  return (
    <div className="movie-catalog">      
      {/* Display loading message when movies are being fetched */}
      {status === 'loading' && <p>Loading movies...</p>}

      {/* Display error message if the fetch request failed */}
      {status === 'failed' && <p>Error: {error}</p>}

      {/* Render the list of movies when data is successfully fetched */}
      <ul>
        {movies && movies.length > 0 ? (
          movies.map((movie, index) => (
            <li key={index}>
              <h2>{movie.Title}</h2>
              <p>Year: {movie.Year}</p>
              <p>Type: {movie.Type}</p>
              <img src={movie.Poster} alt={movie.Title} />
            </li>
          ))
        ) : (
          <p>No movies found</p>
        )}
      </ul>
    </div>
  );
};

export default MovieCatalog;