import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getRestaurants } from "../../store/restaurants";
import "./SearchBar.css";

function SearchBar() {
  const history = useHistory();
  const restaurants = useSelector(getRestaurants);
  const [searchInput, setSearchInput] = useState("");

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const restaurantNeighborhoods = restaurants.reduce((acc, cur) => {
    if (!acc.includes(cur.neighborhood)) {
      acc.push(cur.neighborhood);
    }
    return acc;
  }, []);

  const neighborhoods = restaurantNeighborhoods.filter((location) =>
    location.toLowerCase().includes(searchInput.toLowerCase())
  );

  const restaurantCuisines = restaurants.reduce((acc, cur) => {
    if (!acc.includes(cur.cuisines)) {
      acc.push(cur.cuisines);
    }
    return acc;
  }, []);

  const cuisines = restaurantCuisines.filter((cuisine) =>
    cuisine.toLowerCase().includes(searchInput.toLowerCase())
  );

  const closeSearchResults = () => setSearchInput("");

  useEffect(() => {
    if (!searchInput) return;
    const listener = () => closeSearchResults();
    window.addEventListener("click", listener);
    return () => window.removeEventListener("click", listener);
  }, [searchInput]);

  const routeToRestaurantProfile = (restaurantId) => {
    history.push(`/restaurants/${restaurantId}`);
  };

  const routeToCuisines = () => {
    history.push({
      pathname: "/restaurants",
      search: `?cuisine=${searchInput}`,
    });
  };

  const routeToNeighborhoods = () => {
    history.push({
      pathname: "/restaurants",
      search: `?neighborhood=${searchInput}`,
    });
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar-search-container">
        <input
          className="search-bar-search-input"
          type="search"
          placeholder="Location, Restaurant, or Cuisine"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <div>
        <button className="search-bar-search-button">Let's go</button>
      </div>
      {searchInput && (
        <div className="search-bar-search-results-container">
          <div className="search-bar-search-text-container">
            <div className="search-bar-search-text">
              Search : "<strong>{searchInput}</strong>"
            </div>
          </div>
          {neighborhoods.length > 0 && (
            <div className="search-bar-locations-container">
              <div className="search-bar-locations-text-container">
                <div className="search-bar-locations-text">Locations</div>
              </div>
              <div className="search-bar-locations-results-container">
                {neighborhoods.map((neighborhood) => (
                  <div
                    key={neighborhood}
                    className="search-bar-locations-results"
                    onClick={routeToNeighborhoods}
                  >
                    <div className="search-bar-locations-results-text">
                      {neighborhood}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {cuisines.length > 0 && (
            <div className="search-bar-cuisines-container">
              <div className="search-bar-cuisines-text-container">
                <div className="search-bar-cuisines-text">Cuisines</div>
              </div>
              <div className="search-bar-cuisines-results-container">
                {cuisines.map((cuisine) => (
                  <div key={cuisine} className="search-bar-cuisines-results">
                    <div className="search-bar-cuisines-results-text" onClick={routeToCuisines}>
                      {cuisine}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {filteredRestaurants.length > 0 && (
            <div className="search-bar-restaurants-container">
              <div className="search-bar-restaurants-text-container">
                <div className="search-bar-restaurants-text">Restaurants</div>
              </div>
              <div className="search-bar-restaurants-results-container">
                {filteredRestaurants.map((restaurant) => (
                  <div
                    key={restaurant.id}
                    className="search-bar-restaurants-results"
                    onClick={() => routeToRestaurantProfile(restaurant.id)}
                  >
                    <div className="search-bar-restaurants-results-text">
                      {restaurant.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
