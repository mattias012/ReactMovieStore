
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//import axios, http library to handle http requests easier
import axios from 'axios';

//Define the base URL for the OMDB API
const apiKey = '8eec2a77';
const baseUrl = `https://www.omdbapi.com/?apikey=${apiKey}`;
// Define an async thunk for fetching movies from the API
// createAsyncThunk allows us to create asynchronous Redux actions more easy
export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  //Axios GET request to fetch movies from the API
  const response = await axios.get(`${baseUrl}&s=batman`);
  return response.data.Search; //Return the list of movies from the response
});

export const fetchMovieById = createAsyncThunk('movies/fetchMovieById', async (imdbID) => {
  const response = await axios.get(`${baseUrl}&i=${imdbID}&plot=full`); 
  console.log("API Response for fetchMovieById: ", response.data);
  return response.data;
});

//Create a movie slice using createSlice
//This will define our initial state and the reducers to handle state changes
const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [], //store movies here
    status: 'idle', //Status of the API request ('idle', 'loading', 'succeeded', 'failed')
    error: null, //In case of failure, stores error messages from api req.
    selectedMovie: null,  // Add selectedMovie to the initial state
  },
  reducers: {
    setSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload; 
    },
  },
    extraReducers: (builder) => {
    //Handle different states of the fetchMovies action
    //extraReducers is a key from redux toolkit to handle async ops.
    builder
      .addCase(fetchMovies.pending, (state) => {
        //When the request is pending, set status to 'loading'
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        //When the request is successful, set status to 'succeeded' and update the movies array
        state.status = 'succeeded';
        state.movies = action.payload; //Store the fetched movies in the state
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        // When the request fails, set status to 'failed' and store the error message
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchMovieById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedMovie = action.payload; 
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

//Export the reducer to include it in the store
export const { setSelectedMovie } = movieSlice.actions;
export default movieSlice.reducer;
