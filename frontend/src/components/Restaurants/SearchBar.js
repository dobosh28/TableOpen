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

  const neighborhoods = restaurantNeighborhoods.filter((neighborhood) =>
    neighborhood.toLowerCase().includes(searchInput.toLowerCase())
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

  const routeToNeighborhoods = (event, neighborhood) => {
    // Prevent event propagation
    event.stopPropagation();

    history.push({
      pathname: "/restaurants",
      search: `?neighborhood=${neighborhood}`,
    });
  };

  const letsGo = () => {
    history.push({
      pathname: "/restaurants",
    });
  };

  return (
    <>
      <div>
        <div className="date-time-party-search">
          <div className="main-page-date-time-party">
            <div className="main-page-date-time">
              <div className="main-page-date">
                <div className="main-page-date-inner">
                  <div className="main-page-date-inner-2">
                    <div className="main-page-date-inner-3">
                      <div className="main-page-date-inner-4">
                        <span>
                          <svg viewBox="0 0 24 24" focusable="false">
                            <g fill="none" fillRule="evenodd">
                              <path
                                d="M17,5 L19,5 C20.1045695,5 21,5.8954305 21,7 L21,19 C21,20.1045695 20.1045695,21 19,21 L5,21 C3.8954305,21 3,20.1045695 3,19 L3,7 C3,5.8954305 3.8954305,5 5,5 L7,5 L7,4 C7,3.44771525 7.44771525,3 8,3 C8.55228475,3 9,3.44771525 9,4 L9,5 L15,5 L15,4 C15,3.44771525 15.4477153,3 16,3 C16.5522847,3 17,3.44771525 17,4 L17,5 Z M19,9 L19,7 L5,7 L5,9 L19,9 Z M19,11 L5,11 L5,19 L19,19 L19,11 Z"
                                fill="#2d333f"
                              ></path>
                            </g>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
          <button className="search-bar-search-button" onClick={letsGo}>
            Let's go
          </button>
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
                      onClick={(event) =>
                        routeToNeighborhoods(event, neighborhood)
                      }
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
                      <div
                        className="search-bar-cuisines-results-text"
                        onClick={routeToCuisines}
                      >
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
    </>
  );
}

export default SearchBar;
