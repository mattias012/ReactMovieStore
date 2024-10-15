import React, { useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux'; 
import { useNavigate } from 'react-router-dom'; 
import { fetchMovies } from '../features/movieSlice'; 
import './styles/MovieCatalog.css';

const MovieCatalog = () => {
  // Get movies and search term from Redux store
  const movies = useSelector((state) => state.movies.movies);
  const searchTerm = useSelector((state) => state.movies.searchTerm);
  const status = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  // Filter movies based on the search term
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMovieClick = (movie) => {
    navigate(`/movie/${movie.id}`); 
  };

  return (
    <div className="movie-catalog">
      {status === 'loading' && <p>Loading movies...</p>}
      {status === 'failed' && <p>Error: {error}</p>}

      <ul>
        {filteredMovies && filteredMovies.length > 0 ? (

          filteredMovies.map((movie) => (
            <li key={movie.id} onClick={() => handleMovieClick(movie)}>  
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />
                 <h2>{movie.title}</h2>
              <p>Release Date: {movie.release_date}</p>
              <p>{movie.overview}</p>
              ) : (
                <p>No image available</p>
              )}

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
