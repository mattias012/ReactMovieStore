import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const tmdbApiKey = 'a986d7821a9ea8443749e7e796735aa3'; // Replace with your actual TMDB API key
const tmdbBaseUrl = 'https://api.themoviedb.org/3';

// Fetch superhero movies using the Discover endpoint
export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const response = await axios.get(`${tmdbBaseUrl}/discover/movie`, {
    params: {
      api_key: tmdbApiKey,
      with_keywords: '9715', // Keyword ID for "superhero"
    },
  });
  return response.data.results;
});

export const fetchMovieById = createAsyncThunk(
  'movies/fetchMovieById',
  async (movieId, { getState }) => {
    const state = getState();
    const cachedMovie = state.movies.movieDetails[movieId];
    if (cachedMovie) {
      return cachedMovie;
    } else {
      const response = await axios.get(`${tmdbBaseUrl}/movie/${movieId}`, {
        params: {
          api_key: tmdbApiKey,
          append_to_response:
            'credits,images,videos,reviews,keywords,similar,recommendations,release_dates,external_ids,translations',
        },
      });
      return response.data;
    }
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    cart: [],
    movieDetails: {},
    status: 'idle',
    error: null,
    selectedMovie: null,
    searchTerm: '', // Moved searchTerm here
  },
  reducers: {
    setSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    addMovieToCart: (state, action) => {
      const exists = state.cart.find((item) => item.id === action.payload.id);
      
      if (exists) {
        exists.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeMovieFromCart: (state, action) => {
      const movieToRemove = state.cart.find(movie => movie.id === action.payload.id);
      if (movieToRemove) {
        if (movieToRemove.quantity > 1) {
          movieToRemove.quantity -= 1;
        } else {
          state.cart = state.cart.filter(movie => movie.id !== action.payload.id); 
        }
      }
    },
    
    clearCart: (state) => {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchMovieById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedMovie = action.payload;
        state.movieDetails[action.payload.id] = action.payload;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  setSelectedMovie,
  setSearchTerm,
  addMovieToCart,
  removeMovieFromCart,
  clearCart,
} = movieSlice.actions;

export default movieSlice.reducer;
