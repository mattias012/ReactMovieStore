import { useSelector } from 'react-redux';
import './styles/MovieCatalog.css';

const MovieCatalog = ({ status, error }) => {
  // Retrieve movies from the Redux store
  const movies = useSelector((state) => state.movies.movies);

  // Render the UI based on the state
  return (
    <div className="movie-catalog">
      {status === 'loading' && <p>Loading movies...</p>}
      {status === 'failed' && <p>Error: {error}</p>}

      <ul>
        {movies && movies.length > 0 ? (
          movies.map((movie, index) => (
            <li key={index}>
              <img src={movie.Poster} alt={movie.Title} />
              <h2>{movie.Title}</h2>
              <p>{movie.Year}</p>
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
