import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../features/movieSlice';  // Import setSearchTerm action
import { useNavigate, useLocation } from 'react-router-dom';  // Import useNavigate and useLocation

import './styles/SearchBar.css';

function SearchBar() {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.movies.searchTerm);  //Get search term from Redux
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);  //Local state to manage input value
  const navigate = useNavigate();  //Use navigate to redirect the user
  const location = useLocation();  //Get the current route location

  const handleSearch = () => {
    //Dispatch the search term to Redux when search button is clicked or Enter is pressed
    dispatch(setSearchTerm(localSearchTerm));

    //If we are not on the MovieCatalog page, navigate to it
    if (location.pathname !== "/") {
      navigate('/');  //Navigate to the MovieCatalog page
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();  //trigger search when Enter key is pressed
    }
  };

  return (
    <div className="search-bar">
      <div className="background-searchbar-title">
        <p>With great power comes - React Movie Store</p>
        
      <div className="search-input">
        <input
          type="text"
          placeholder="Search for a movie"
          value={localSearchTerm}  //Bind input to local state
          onChange={(e) => {
            setLocalSearchTerm(e.target.value);  //Update local search term on typing
            dispatch(setSearchTerm(e.target.value));  //Dispatch search term to Redux in real-time
          }}
          onKeyPress={handleKeyPress}  //Trigger search on Enter key press
        />
        <button className="search-button" onClick={handleSearch}>🔍</button> 
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
