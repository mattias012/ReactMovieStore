import React, { useEffect, useState } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams
import { fetchMovieById, addMovieToCart } from '../features/movieSlice'; 
import './styles/MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();  
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movies.selectedMovie); 
  const status = useSelector((state) => state.movies.status);

  // State to track which reviews are expanded
  const [expandedReviews, setExpandedReviews] = useState({});

  useEffect(() => {
    if (!movie || movie.id !== Number(id)) {
      dispatch(fetchMovieById(id)); 
    }
  }, [id, dispatch, movie]);

  // Log the movie data whenever it changes
  useEffect(() => {
    console.log('Movie details data:', movie);
  }, [movie]);

  if (status === 'loading') {
    return <div>Loading movie details...</div>;
  }

  if (!movie) {
    return <div>Movie not found.</div>; 
  }

  // Extract runtime
  const runtime = movie.runtime || "Unknown";
  const hours = runtime !== "Unknown" ? Math.floor(runtime / 60) : "N/A";
  const minutes = runtime !== "Unknown" ? runtime % 60 : "N/A";

  // Extract genres
  const genres = movie.genres ? movie.genres.map((g) => g.name) : ['Unknown Genre'];

  // Extract director and writer from crew
  let director = 'Unknown Director';
  let writer = 'Unknown Writer';

  if (movie.credits && movie.credits.crew) {
    const crew = movie.credits.crew;
    const directorData = crew.find(member => member.job === 'Director');
    const writerData = crew.find(member => member.job === 'Writer' || member.job === 'Screenplay' || member.job === 'Author');

    director = directorData ? directorData.name : director;
    writer = writerData ? writerData.name : writer;
  }

  // Handle adding to cart
  const handleAddToCart = () => {
    dispatch(addMovieToCart(movie));
  };

  // Toggle review expansion
  const toggleReviewExpansion = (reviewId) => {
    setExpandedReviews((prevState) => ({
      ...prevState,
      [reviewId]: !prevState[reviewId],
    }));
  };

  // Extract and display cast (actors)
  const cast = movie.credits && movie.credits.cast ? movie.credits.cast.slice(0, 4) : []; // Limit to 10 actors

  return (
    <div className="movie-details">
      <button className="back-button" onClick={() => navigate(-1)}> 
        Back
      </button>
      <div className="movie-poster">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={`${movie.title} poster`}
          />
        ) : (
          <div>No poster available</div>
        )}
      </div>
      <div className="movie-info">
        <h1>{movie.title}</h1>
        <p className="movie-meta">
          <span>{movie.release_date}</span> • <span>{hours}h {minutes}m</span>
        </p>
        <p className="movie-price">Price: $15.99 USD</p>
        <div className="movie-rating-container">
          <div className="movie-rating">
            {movie.vote_average}
          </div>
          <span className="rating-label">Rating</span>
          <button className="add-to-cart" onClick={handleAddToCart}>
            <img src="https://cdn-icons-png.flaticon.com/512/263/263142.png" alt="cart icon" className="cart-icon" /> Add to cart
          </button>
        </div>
        <div className="movie-genre">
          {genres.map((g, index) => (
            <span key={index} className="genre-tag">{g}</span>
          ))}
        </div>
        <h2>Overview</h2>
        <p>{movie.overview}</p>
        <div className="movie-credits">
          <div className="credit-item">
            <p><strong>{director}</strong></p>
            <p className="role">Director</p>
          </div>
          <div className="credit-item">
            <p><strong>{writer}</strong></p>
            <p className="role">Writer</p>
          </div>
        </div>

        {/* Display Cast */}
        <div className="movie-cast">
          <h2>Cast</h2>
          <ul>
            {cast.map((actor) => (
              <li key={actor.id} className="actor-item">
                <img
                  src={actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : 'https://via.placeholder.com/200x300?text=No+Image'}
                  alt={actor.name}
                  className="actor-image"
                />
                <div className="actor-details">
                  <strong>{actor.name}</strong> as <em>{actor.character || 'Unknown Character'}</em>
                </div>
              </li>
            ))}
          </ul>
        </div>

        

        {/* Display one trailer */}
        {movie.videos && movie.videos.results.length > 0 && (
          <div className="movie-videos">
            <h2>Trailer</h2>
            {movie.videos.results
              .filter((video) => video.site === 'YouTube')
              .slice(0, 1)
              .map((video) => (
                <div key={video.id}>
                  <p>{video.name}</p>
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${video.key}`}
                    title={video.name}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
