import { useSelector, useDispatch } from 'react-redux'; 
import { useNavigate } from 'react-router-dom'; 
import { setSelectedMovie } from '../features/movieSlice';

const MovieCatalog = ({ status, error }) => {
  // Get movies from redux
  const movies = useSelector((state) => state.movies.movies);

  const dispatch = useDispatch();  
  const navigate = useNavigate();  

  const handleMovieClick = (movie) => {
    navigate(`/movie/${movie.imdbID}`); 
  };

  return (
    <div className="movie-catalog">      
      {status === 'loading' && <p>Loading movies...</p>}
      {status === 'failed' && <p>Error: {error}</p>}

      <ul>
        {movies && movies.length > 0 ? (
         
          movies.map((movie, index) => (
            <li key={index} onClick={() => handleMovieClick(movie)}>  

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