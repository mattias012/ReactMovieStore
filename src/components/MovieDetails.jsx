import './styles/MovieDetails.css';

const MovieDetails = ({ title, ageLimit, duration, year, price, rating, genre, description, director, novel }) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  return (
    <div className="movie-details">
      <div className="movie-poster">
        <img
          src="https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMGUtY2UxYWVkNGY2ZjljXkEyXkFqcGc@._V1_.jpg"
          alt={`${title} poster`}
        />
      </div>
      <div className="movie-info">
        <h1>{title}</h1>
        <p className="movie-meta">
          <span>{ageLimit}</span> • <span>{hours}h {minutes}m</span> • <span>{year}</span>
        </p>
        <p className="movie-price">{price} USD</p>
        <div className="movie-rating-container">
          <div className="movie-rating">
            {rating}
          </div>
          <span className="rating-label">Rating</span> 
          <button className="add-to-cart">
            <img src="https://cdn-icons-png.flaticon.com/512/263/263142.png" alt="cart icon" className="cart-icon" /> Add to cart</button>
        </div>
        <div className="movie-genre">
          {genre.map((g, index) => (
            <span key={index} className="genre-tag">{g}</span>
          ))}
        </div>
        <h2>Overview</h2>
        <p>{description}</p>        
        <div className="movie-credits">
          <div className="credit-item">
            <p><strong>{director}</strong></p>
            <p className="role">Director, Screenplay</p>
          </div>
          <div className="credit-item">
            <p><strong>{novel}</strong></p>
            <p className="role">Novel</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
