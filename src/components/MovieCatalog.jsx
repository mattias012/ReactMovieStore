import { useSelector } from 'react-redux';
import './styles/MovieCatalog.css';
import { useNavigate } from 'react-router-dom';


const MovieCatalog = ({ status, error }) => {
  //Get movies and search from redux here
  const movies = useSelector((state) => state.movies.movies);
  const searchTerm = useSelector((state) => state.movies.searchTerm);
  const navigate = useNavigate();

  const handleMovieClick = (movie) => {
    navigate(`/movie/${movie.imdbID}`);
  };

  // Filtrera filmer baserat på sökordet
  const filteredMovies = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="movie-catalog">
      {status === 'loading' && <p>Loading movies...</p>}
      {status === 'failed' && <p>Error: {error}</p>}

      <ul>
        {filteredMovies && filteredMovies.length > 0 ? (
          filteredMovies.map((movie, index) => (
            <li key={movie.imdbID} onClick={() => handleMovieClick(movie)}>
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
