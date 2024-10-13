import React, { useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux'; 
import { useNavigate } from 'react-router-dom'; 
import { fetchMovies } from '../features/movieSlice'; 
import './styles/MovieCatalog.css';

const MovieCatalog = ({ status, error }) => {
  //Get movies and search from redux here
  const movies = useSelector((state) => state.movies.movies);
  const searchTerm = useSelector((state) => state.movies.searchTerm);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  // Filtrera filmer baserat på sökordet
  const filteredMovies = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

        {filteredMovies && filteredMovies.length > 0 ? (
          filteredMovies.map((movie, index) => (
            <li key={movie.imdbID} onClick={() => handleMovieClick(movie)}>
              <h2>{movie.Title}</h2>
              <p>Year: {movie.Year}</p>
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
