import { useSelector, useDispatch } from 'react-redux';
import { addMovieToCart } from '../features/movieSlice';

const MovieCatalog = ({ status, error }) => {
  // Get movies from redux
  const movies = useSelector((state) => state.movies.movies);
  const dispatch = useDispatch();

  return (
    <div className="movie-catalog">      
      {status === 'loading' && <p>Loading movies...</p>}
      {status === 'failed' && <p>Error: {error}</p>}

      <ul>
        {movies && movies.length > 0 ? (
          movies.map((movie) => (
            <li key={movie.imdbID}>
              <h2>{movie.Title}</h2>
              <p>Year: {movie.Year}</p>
              <p>Type: {movie.Type}</p>
              <img src={movie.Poster} alt={movie.Title} />
              <button onClick={() => dispatch(addMovieToCart(movie))}>
                Add to Cart
              </button>
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