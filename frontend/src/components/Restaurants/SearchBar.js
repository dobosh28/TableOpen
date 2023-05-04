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
            <div className="main-page-time">
              <div className="main-page-time-inner">
                <div className="main-page-time-inner-2">
                  <div className="main-page-time-inner-3">
                    <span>
                      <svg viewBox="0 0 24 24" focusable="false">
                        <g fill="none" fillRule="evenodd">
                          <path
                            d="M13,11 L14.5,11 C14.7761424,11 15,11.2238576 15,11.5 L15,12.5 C15,12.7761424 14.7761424,13 14.5,13 L12.5,13 L11.5,13 C11.2238576,13 11,12.7761424 11,12.5 L11,7.5 C11,7.22385763 11.2238576,7 11.5,7 L12.5,7 C12.7761424,7 13,7.22385763 13,7.5 L13,11 Z M12,21 C7.02943725,21 3,16.9705627 3,12 C3,7.02943725 7.02943725,3 12,3 C16.9705627,3 21,7.02943725 21,12 C21,16.9705627 16.9705627,21 12,21 Z M12,19 C15.8659932,19 19,15.8659932 19,12 C19,8.13400675 15.8659932,5 12,5 C8.13400675,5 5,8.13400675 5,12 C5,15.8659932 8.13400675,19 12,19 Z"
                            fill="#2d333f"
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-page-party">
            <div className="main-page-party-inner"></div>
          </div>
        </div>
        <div className="filter-bar-button">
          <div className="filter-bar">
            <div className="filter-bar-inner">
              <span>
                <svg viewBox="0 0 24 24" focusable="false">
                  <g fill="none" fillRule="evenodd">
                    <path
                      d="M13,15.9291111 L13,21.5 C13,21.7761424 12.7761424,22 12.5,22 L11.5,22 C11.2238576,22 11,21.7761424 11,21.5 L11,15.9291111 C7.60770586,15.4438815 5,12.5264719 5,9 C5,5.13400675 8.13400675,2 12,2 C15.8659932,2 19,5.13400675 19,9 C19,12.5264719 16.3922941,15.4438815 13,15.9291111 Z M12,4 C9.23857625,4 7,6.23857625 7,9 C7,11.7614237 9.23857625,14 12,14 C14.7614237,14 17,11.7614237 17,9 C17,6.23857625 14.7614237,4 12,4 Z"
                      fill="#2d333f"
                      fillRule="nonzero"
                      transform="translate(12.000000, 12.000000) rotate(-45.000000) translate(-12.000000, -12.000000)"
                    ></path>
                  </g>
                </svg>
              </span>
              <input
                type="search"
                placeholder="Location, Restaurant, or Cuisine"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          </div>
          <div className="filter-button">
            <button onClick={letsGo}>Let's go</button>
          </div>
        </div>
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
  );
}

export default SearchBar;
