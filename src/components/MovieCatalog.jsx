import React, { useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux'; 
import { useNavigate } from 'react-router-dom'; 
import { fetchMovies } from '../features/movieSlice'; // Ensure you're importing the correct action

const MovieCatalog = ({ status, error }) => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const navigate = useNavigate();  

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  // Log the movies data whenever it changes
  useEffect(() => {
    console.log('Movies data:', movies);
  }, [movies]);

  const handleMovieClick = (movie) => {
    navigate(`/movie/${movie.id}`); 
  };

  return (
    <div className="movie-catalog">      
      {status === 'loading' && <p>Loading movies...</p>}
      {status === 'failed' && <p>Error: {error}</p>}

      <ul>
        {movies && movies.length > 0 ? (
          movies.map((movie, index) => (
            <li key={movie.id || index} onClick={() => handleMovieClick(movie)}>  
              <h2>{movie.title}</h2>
              <p>Release Date: {movie.release_date}</p>
              <p>{movie.overview}</p>
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />
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
