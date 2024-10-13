import React, { useEffect, useState, useRef } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'; 
import axios from 'axios';
import { fetchMovieById, addMovieToCart } from '../features/movieSlice'; 
import './styles/MovieDetails.css';

const tmdbApiKey = 'a986d7821a9ea8443749e7e796735aa3'; 
const tmdbBaseUrl = 'https://api.themoviedb.org/3';

const MovieDetails = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();  
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movies.selectedMovie); 
  const status = useSelector((state) => state.movies.status);

  const [isCollectionExpanded, setIsCollectionExpanded] = useState(false);
  const [collectionMovies, setCollectionMovies] = useState([]);

  // Ref for the scrollable cast container
  const scrollContainerRef = useRef(null);

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

  const backdropPath = movie.images?.backdrops?.[0]?.file_path
    ? `https://image.tmdb.org/t/p/original${movie.images.backdrops[0].file_path}`
    : null;

  // Extract runtime
  const runtime = movie.runtime || "Unknown";
  const hours = runtime !== "Unknown" ? Math.floor(runtime / 60) : "N/A";
  const minutes = runtime !== "Unknown" ? runtime % 60 : "N/A";

  // Extract genres
  const genres = movie.genres ? movie.genres.map((g) => g.name) : ['Unknown Genre'];

  const collection = movie.belongs_to_collection || null;

  // Extract director and writer from crew
  let director = 'Unknown Director';
  let directorImage = null;
  let writer = 'Unknown Writer';
  let writerImage = null;

  if (movie.credits && movie.credits.crew) {
    const crew = movie.credits.crew;
    const directorData = crew.find(member => member.job === 'Director');
    const writerData = crew.find(member => member.job === 'Writer' || member.job === 'Screenplay' || member.job === 'Author');

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

  const externalIds = movie.external_ids || {};

  // Handle adding to cart
  const handleAddToCart = () => {
    dispatch(addMovieToCart(movie));
  };

  // Extract and display cast (actors)
  const cast = movie.credits && movie.credits.cast ? movie.credits.cast.slice(0, 5) : []; 

  const logos = movie.images?.logos ? movie.images.logos.slice(0, 1) : [];

  const recommendations = movie.recommendations?.results || [];

  // Scroll the cast container left or right
  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200; // Amount of pixels to scroll
      scrollContainerRef.current.scrollBy({ left: direction === 'right' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
    }
  };


  // Scroll the recommendations container left or right
const handleRecommendationsScroll = (direction) => {
  const recommendationsContainer = document.getElementById('recommendations-carousel');
  if (recommendationsContainer) {
    const scrollAmount = 200; // Amount of pixels to scroll
    recommendationsContainer.scrollBy({ left: direction === 'right' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
  }
};


 // Handle expanding the collection and fetching collection details
 const handleExpandCollection = async () => {
  setIsCollectionExpanded(!isCollectionExpanded); // Toggle expand/collapse

  if (!isCollectionExpanded && collection) {
    try {
      // Fetch collection details
      const response = await axios.get(`${tmdbBaseUrl}/collection/${collection.id}`, {
        params: {
          api_key: tmdbApiKey,
        },
      });

      // Log collection response
      console.log('Collection details response:', response.data);

      // Set collection movies
      setCollectionMovies(response.data.parts); // `parts` contains the movies in the collection
    } catch (error) {
      console.error('Error fetching collection details:', error);
    }
  }
};

  // Handle clicking on a recommended movie
  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`); // Navigate to the movie details page
  };

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
      <div className="movie-details">
        <button className="back-button" onClick={() => navigate(-1)}>
          Back
        </button>

        {/* Left column for movie details */}
        <div className="movie-info">
          <h1>{movie.title}</h1>
          <p className="movie-meta">
            <span>{movie.release_date}</span> • <span>{hours}h {minutes}m</span>
          </p>

          {/* Display Budget */}
          {movie.budget && (
            <p className="movie-budget">Budget: ${movie.budget.toLocaleString()} USD</p>
          )}

          {/* Display Popularity */}
          {movie.popularity && (
            <p className="movie-popularity">Popularity: {movie.popularity}</p>
          )}

          {/* Display Production Companies */}
          {movie.production_companies && movie.production_companies.length > 0 && (
            <div className="movie-production-companies">
              <ul>
                {movie.production_companies.map((company) => (
                  <li key={company.id}>
                    {company.logo_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                        alt={company.name}
                        className="company-logo"
                      />
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Display Homepage */}
          {movie.homepage && (
            <p className="movie-homepage">
               <a href={movie.homepage} target="_blank" rel="noopener noreferrer">{movie.homepage}</a>
            </p>
          )}

          <p className="movie-price">Price: $15.99 USD</p>
          <div className="movie-rating-container">
            <div className="movie-rating">
              {movie.vote_average}
            </div>
            <button className="add-to-cart" onClick={handleAddToCart}>
              <img src="https://cdn-icons-png.flaticon.com/512/263/263142.png" alt="cart icon" className="cart-icon" /> Add to cart
            </button>
          </div>

          <div className="movie-genre">
            {genres.map((g, index) => (
              <span key={index} className="genre-tag">{g}</span>
            ))}
          </div>
          <div className="movie-overview">
            <p>{movie.overview}</p>
          </div>

          {/* External Links Section */}
          <div className="movie-external-links">
            <h2>Find us on:</h2>
            <ul className="external-links">
              {externalIds.imdb_id && (
                <li>
                  <a href={`https://www.imdb.com/title/${externalIds.imdb_id}`} target="_blank" rel="noopener noreferrer">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg" alt="IMDb" className="external-icon" />
                  </a>
                </li>
              )}
              {externalIds.facebook_id && (
                <li>
                  <a href={`https://www.facebook.com/${externalIds.facebook_id}`} target="_blank" rel="noopener noreferrer">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" className="external-icon" />
                  </a>
                </li>
              )}
              {externalIds.instagram_id && (
                <li>
                  <a href={`https://www.instagram.com/${externalIds.instagram_id}`} target="_blank" rel="noopener noreferrer">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" className="external-icon" />
                  </a>
                </li>
              )}
              {externalIds.twitter_id && (
                <li>
                  <a href={`https://twitter.com/${externalIds.twitter_id}`} target="_blank" rel="noopener noreferrer">
                    <img src="https://upload.wikimedia.org/wikipedia/en/6/60/Twitter_Logo_as_of_2021.svg" alt="Twitter" className="external-icon" />
                  </a>
                </li>
              )}
              {externalIds.wikidata_id && (
                <li>
                  <a href={`https://www.wikidata.org/wiki/${externalIds.wikidata_id}`} target="_blank" rel="noopener noreferrer">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/ff/Wikidata-logo.svg" alt="Wikidata" className="external-icon" />
                  </a>
                </li>
              )}
            </ul>
          </div>

           {/* Display Movie Collection */}
           {collection && (
            <div className="movie-collection">
              <h2 onClick={handleExpandCollection} style={{ cursor: 'pointer' }}>
                Part of the {collection.name} {isCollectionExpanded ? '▲' : '▼'}
              </h2>
              {collection.poster_path && (
                <img 
                  src={`https://image.tmdb.org/t/p/w200${collection.poster_path}`} 
                  alt={`${collection.name} Poster`}
                  className="collection-poster"
                />
              )}
              {isCollectionExpanded && collectionMovies.length > 0 && (
                <div className="collection-movies">
                  {collectionMovies.map((movie) => (
                    <div 
                      key={movie.id} 
                      className="collection-movie-item" 
                      onClick={() => handleMovieClick(movie.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <img 
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
                        alt={movie.title}
                      />
                      <p>{movie.title}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Display Crew (Director and Writer) and Cast */}
          <div className="movie-cast">
            <h2>Director, Writer & Cast</h2>

            <div className="cast-carousel-container">
              <button className="carousel-arrow left" onClick={() => handleScroll('left')}>
                &#8249; {/* Left arrow symbol */}
              </button>

              <div className="cast-carousel" ref={scrollContainerRef}>
                {/* Director */}
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

                {/* Writer */}
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

                {/* Cast */}
                {cast.map((actor) => (
                  <div key={actor.id} className="actor-item">
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
                  </div>
                ))}
              </div>

              <button className="carousel-arrow right" onClick={() => handleScroll('right')}>
                &#8250; {/* Right arrow symbol */}
              </button>
            </div>
          </div>
        </div>

        {/* Right column for trailer and poster */}
        <div className="movie-poster-and-trailer">
          
          {/* Display one trailer */}
          {movie.videos && movie.videos.results.length > 0 && (
            <div className="movie-trailer">
              {movie.videos.results
                .filter((video) => video.site === 'YouTube')
                .slice(0, 1)
                .map((video) => (
                  <div key={video.id}>
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

          {/* Movie Poster */}
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
          {/* Display Movie Logos */}
          {logos.length > 0 && (
            <div className="movie-logos">
              <div className="logos-container">
                {logos.map((logo, index) => (
                  <img
                    key={index}
                    src={`https://image.tmdb.org/t/p/original${logo.file_path}`}
                    alt="Movie Logo"
                    className="movie-logo"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Recommendations Section */}
{recommendations.length > 0 && (
  <div className="movie-recommendations">
    <h2>Recommended Movies</h2>
    <div className="recommendations-carousel-container">
      <button className="carousel-arrow left" onClick={() => handleRecommendationsScroll('left')}>
        &#8249; {/* Left arrow symbol */}
      </button>

      <div id="recommendations-carousel" className="recommendations-carousel">
        {recommendations.slice(0, 5).map((recommendation) => (
          <div 
            key={recommendation.id} 
            className="recommendation-item" 
            onClick={() => handleMovieClick(recommendation.id)} // Navigate on click
            style={{ cursor: 'pointer' }} // Add a pointer cursor
          >
            <img
              src={`https://image.tmdb.org/t/p/w200${recommendation.backdrop_path}`}
              alt={recommendation.title}
            />
            <p>{recommendation.title}</p>
          </div>
        ))}
      </div>

      <button className="carousel-arrow right" onClick={() => handleRecommendationsScroll('right')}>
        &#8250; {/* Right arrow symbol */}
      </button>
    </div>
  </div>
)}


        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
