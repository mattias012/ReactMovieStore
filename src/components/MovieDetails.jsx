import React, { useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchMovieById } from '../features/movieSlice'; 
import './styles/MovieDetails.css';

const MovieDetails = () => {
  const { imdbID } = useParams(); 
  const navigate = useNavigate();  
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movies.selectedMovie); 
  const status = useSelector((state) => state.movies.status);
  console.log("Movie details from Redux: ", movie);

  useEffect(() => {
    if (!movie || movie.imdbID !== imdbID) {
      dispatch(fetchMovieById(imdbID)); 
    }
  }, [imdbID, movie, dispatch]);
  console.log("Detailed Movie details from API: ", movie);


  if (!movie) {
    return <div>Movie not found.</div>; 
  }

  const runtime = movie.Runtime ? movie.Runtime.replace(' min', '') : "Unknown";
  const hours = runtime !== "Unknown" ? Math.floor(runtime / 60) : "N/A";
  const minutes = runtime !== "Unknown" ? runtime % 60 : "N/A";

  const genres = movie.Genre ? movie.Genre.split(', ') : ['Unknown Genre'];

  return (
    <div className="movie-details">
      <button className="back-button" onClick={() => navigate(-1)}> 
        Back
      </button>
      <div className="movie-poster">
        <img
          src={movie.Poster}
          alt={`${movie.Title} poster`}
        />
      </div>
      <div className="movie-info">
        <h1>{movie.Title}</h1>
        <p className="movie-meta">
          <span>{movie.Rated}</span> • <span>{hours}h {minutes}m</span> • <span>{movie.Year}</span>
        </p>
        <p className="movie-price">Price: $15.99 USD</p>
        <div className="movie-rating-container">
          {/*<div className="movie-rating">
            {movie.imdbRating}
          </div>
          <span className="rating-label">Rating</span>*/}
          <button className="add-to-cart">
            <img src="https://cdn-icons-png.flaticon.com/512/263/263142.png" alt="cart icon" className="cart-icon" /> Add to cart
          </button>
        </div>
        <div className="movie-genre">
          {genres.map((g, index) => (
            <span key={index} className="genre-tag">{g}</span>
          ))}
        </div>
        <h2>Overview</h2>
        <p>{movie.Plot}</p>
        {/*<div className="movie-credits">
          <div className="credit-item">
            <p><strong>{movie.Director}</strong></p>
            <p className="role">Director</p>
          </div>
          <div className="credit-item">
            <p><strong>{movie.Writer}</strong></p>
            <p className="role">Writer</p>
          </div>
        </div>*/}
        
      </div>
    </div>
  );
};

export default MovieDetails;
