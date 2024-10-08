
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//import axios, http library to handle http requests easier
import axios from 'axios';

//Define the base URL for the OMDB API
const apiUrl = 'http://www.omdbapi.com/?s=batman&&plot=full&apikey=8eec2a77&page=1';

// Define an async thunk for fetching movies from the API
// createAsyncThunk allows us to create asynchronous Redux actions more easy
export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  //Axios GET request to fetch movies from the API
  const response = await axios.get(apiUrl);
  return response.data.Search; //Return the list of movies from the response
});

//Create a movie slice using createSlice
//This will define our initial state and the reducers to handle state changes
const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [], //store movies here
    status: 'idle', //Status of the API request ('idle', 'loading', 'succeeded', 'failed')
    error: null, //In case of failure, stores error messages from api req.
  },
  reducers: {},
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
      });
  },
});

//Export the reducer to include it in the store
export default movieSlice.reducer;
