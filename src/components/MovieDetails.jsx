import React, { useEffect, useRef } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'; 
import { fetchMovieById, addMovieToCart } from '../features/movieSlice'; 
import './styles/MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();  
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movies.selectedMovie); 
  const status = useSelector((state) => state.movies.status);

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (!movie || movie.id !== Number(id)) {
      dispatch(fetchMovieById(id)); 
    }
  }, [id, dispatch, movie]);

  if (status === 'loading') {
    return <div>Loading movie details...</div>;
  }

  if (!movie) {
    return <div>Movie not found.</div>; 
  }

  const backdropPath = movie.images?.backdrops?.[0]?.file_path
    ? `https://image.tmdb.org/t/p/original${movie.images.backdrops[0].file_path}`
    : null;

  const runtime = movie.runtime || "Unknown";
  const hours = runtime !== "Unknown" ? Math.floor(runtime / 60) : "N/A";
  const minutes = runtime !== "Unknown" ? runtime % 60 : "N/A";

  const genres = movie.genres ? movie.genres.map((g) => g.name) : ['Unknown Genre'];

  let director = 'Unknown Director';
  let directorImage = null;
  let writer = 'Unknown Writer';
  let writerImage = null;

  if (movie.credits?.crew) {
    const crew = movie.credits.crew;
    const directorData = crew.find(member => member.job === 'Director');
    const writerData = crew.find(member => ['Writer', 'Screenplay', 'Author'].includes(member.job));

    if (directorData) {
      director = directorData.name;
      directorImage = directorData.profile_path
        ? `https://image.tmdb.org/t/p/w200${directorData.profile_path}`
        : null;
    }

    if (writerData) {
      writer = writerData.name;
      writerImage = writerData.profile_path
        ? `https://image.tmdb.org/t/p/w200${writerData.profile_path}`
        : null;
    }
  }

  const handleAddToCart = () => {
    const movieData = {
      id: movie.id, 
      Title: movie.title,
      Year: movie.release_date.substring(0, 4),
      Poster: movie.poster_path
        ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
        : 'N/A',
      Price: 15.99 
    };
    
    dispatch(addMovieToCart(movieData)); 
  };

  const cast = movie.credits?.cast?.slice(0, 10) || []; 

  const logos = movie.images?.logos?.slice(0, 1) || [];

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 240; 
      scrollContainerRef.current.scrollBy({ left: direction === 'right' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
    }
  };

  const releaseYear = movie.release_date ? movie.release_date.substring(0, 4) : 'Unknown Year';

  return (
    <div className="movie-details-container">
      {backdropPath && (
        <div
          className="movie-backdrop"
          style={{ backgroundImage: `url(${backdropPath})` }}
        >
          <div className="backdrop-fade"></div>
        </div>
      )}

      {movie.production_companies && movie.production_companies.length > 0 && (
        <div className="production-logos">
          <ul>
          {movie.production_companies.slice(0, 4).map((company) => (
              <li key={company.id}>
                {company.logo_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                    alt={company.name}
                    className="company-logo"
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {logos.length > 0 && (
        <div className="movie-logo-container">
          <img
            src={`https://image.tmdb.org/t/p/original${logos[0].file_path}`}
            alt="Movie Logo"
            className="movie-logo"
          />
        </div>
      )}
      {movie.homepage && (
            <p className="movie-homepage">
              <a href={movie.homepage} target="_blank" rel="noopener noreferrer">
                {movie.homepage}
              </a>
            </p>
          )}
        
      <div className="movie-details">
        <button className="back-button" onClick={() => navigate(-1)}>
          Back
        </button>

        <div className="movie-left-container">
          <div className="movie-info">
            <h1>{movie.title}</h1>
            <p className="movie-meta">
              <span>{releaseYear}</span> • <span>{hours}h {minutes}m</span>
            </p>

            <div className="overview-and-cart-container">
            <div className="movie-overview">
              <p className='movie-overview-p'>{movie.overview}</p>
              {movie.budget && (
                <p className="movie-budget">Budget: ${movie.budget.toLocaleString()}</p>
              )}
            </div>
            <div className="movie-add-to-cart-section">
    <p className="movie-price">$15.99</p> 
    <button className="add-to-cart" onClick={handleAddToCart}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
        alt="cart icon"
        className="cart-icon"
      />
      Add to cart
    </button>
  </div>
</div>

            
            <div className="movie-genre">
              {genres.map((g, index) => (
                <span key={index} className="genre-tag">{g}</span>
              ))}
            </div>
            <div className="movie-cast">
              <div className="cast-carousel-container">
                <button className="carousel-arrow left" onClick={() => handleScroll('left')}>
                  &#8249;
                </button>
                <div className="cast-carousel" ref={scrollContainerRef}>
                  {director && (
                    <div key="director" className="actor-item">
                      <img
                        src={directorImage || 'https://via.placeholder.com/200x300?text=No+Image'}
                        alt={director}
                        className="actor-image"
                      />
                      <div className="actor-details">
                        <strong>{director}</strong> <em>(Director)</em>
                      </div>
                    </div>
                  )}
                  {writer && (
                    <div key="writer" className="actor-item">
                      <img
                        src={writerImage || 'https://via.placeholder.com/200x300?text=No+Image'}
                        alt={writer}
                        className="actor-image"
                      />
                      <div className="actor-details">
                        <strong>{writer}</strong> <em>(Writer)</em>
                      </div>
                    </div>
                  )}
                  {cast.map((actor) => (
                    <div key={actor.id} className="actor-item">
                      <img
                        src={
                          actor.profile_path
                            ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                            : 'https://via.placeholder.com/200x300?text=No+Image'
                        }
                        alt={actor.name}
                        className="actor-image"
                      />
                      <div className="actor-details">
                        <strong>{actor.name}</strong> as <em>{actor.character || 'Unknown Character'}</em>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="carousel-arrow right" onClick={() => handleScroll('right')}>
                  &#8250;
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right-side container (poster and trailer) */}
        <div className="movie-poster-and-cart-container">
  <div className="movie-trailer">
    {movie.videos && movie.videos.results.length > 0 ? (
      movie.videos.results
        .filter((video) => video.site === 'YouTube')
        .slice(0, 1)
        .map((video) => (
          <div key={video.id}>
            <iframe
              width="410"
              height="225"
              src={`https://www.youtube.com/embed/${video.key}`}
              title={video.name}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        ))
    ) : (
      <div className="trailer-placeholder">
          </div>
          )}
        </div>
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
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
