import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Sidebar from "./components/SideBar";
import "./App.css";
import MovieCatalog from "./components/MovieCatalog";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//Import fetchMovies action from our slice
import { fetchMovies } from "./features/movieSlice";

function App() {
  //Initialize dispatch function to send actions to the Redux store
  const dispatch = useDispatch();

  //Get status and error from the Redux store
  const status = useSelector((state) => state.movies.status); //Select status from state
  const error = useSelector((state) => state.movies.error); //Select error message from state

  //useEffect to dispatch fetchMovies when the component is mounted
  useEffect(() => {
    if (status === "idle") {
      //Dispatch fetchMovies action if status is 'idle'
      dispatch(fetchMovies());
    }
  }, [status, dispatch]);

  return (
    <div className="app-container">
      <Header />

      <div className="search-container">
        <SearchBar />
      </div>

      <div className="main-layout">
        <Sidebar />
        <MovieCatalog status={status} error={error} />
      </div>
    </div>
  );
}

export default App;
