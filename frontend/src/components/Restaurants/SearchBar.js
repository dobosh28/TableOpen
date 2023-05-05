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

  const routeToRestaurantPage = (restaurantId) => {
    history.push(`/restaurants/${restaurantId}`);
  };

  const routeToCuisines = () => {
    history.push({
      pathname: "/restaurants",
      search: `?cuisine=${searchInput}`,
    });
  };

  const routeToNeighborhoods = (event, neighborhood) => {
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
              {searchInput && (
                <div className="filter-bar-results-container">
                  <div className="filter-bar-search-input">
                    <div className="filter-bar-search-input-text">
                      Search : "
                      <strong style={{ fontWeight: "600" }}>
                        {searchInput}
                      </strong>
                      "
                    </div>
                  </div>
                  {neighborhoods.length > 0 && (
                    <>
                      <h4 className="filter-bar-locations-title">
                        <span>
                          <svg viewBox="0 0 24 24" focusable="false">
                            <g fill="none" fillRule="evenodd">
                              <path
                                d="M12,2 C16.418278,2 20,5.581722 20,10 C20,12.8133333 17.5666667,16.59 12.7,21.33 C12.3111565,21.7111429 11.6888435,21.7111429 11.3,21.33 C6.43333333,16.59 4,12.8133333 4,10 C4,5.581722 7.581722,2 12,2 Z M12,4 C8.6862915,4 6,6.6862915 6,10 C6,11.21 6.8,14 12,19.21 C17.2,14 18,11.21 18,10 C18,6.6862915 15.3137085,4 12,4 Z M12,7 C13.6568542,7 15,8.34314575 15,10 C15,11.6568542 13.6568542,13 12,13 C10.3431458,13 9,11.6568542 9,10 C9,8.34314575 10.3431458,7 12,7 Z M12,9 C11.4477153,9 11,9.44771525 11,10 C11,10.5522847 11.4477153,11 12,11 C12.5522847,11 13,10.5522847 13,10 C13,9.44771525 12.5522847,9 12,9 Z"
                                fill="#6f737b"
                              ></path>
                            </g>
                          </svg>
                        </span>
                        Locations
                      </h4>
                      <div style={{ boxSizing: "border-box" }}>
                        {neighborhoods.map((neighborhood) => (
                          <div
                            key={neighborhood}
                            className="filter-bar-neighborhood-results"
                            onClick={(event) =>
                              routeToNeighborhoods(event, neighborhood)
                            }
                          >
                            <div>{neighborhood}</div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  {cuisines.length > 0 && (
                    <>
                      <h4 className="filter-bar-cuisine-title">
                        <span>
                          <svg viewBox="0 0 24 24" focusable="false">
                            <g fill="none" fillRule="evenodd">
                              <path
                                d="M11,2 C12.1045695,2 13,2.8954305 13,4 L13,11 C13,12.1045695 12.1045695,13 11,13 L10,13 L10,21 C10,21.5522847 9.55228475,22 9,22 L8,22 C7.44771525,22 7,21.5522847 7,21 L7,13 L6,13 C4.8954305,13 4,12.1045695 4,11 L4,4 C4,2.8954305 4.8954305,2 6,2 L11,2 Z M11,11 L11,4 L10,4 L10,8.5 C10,8.77614237 9.77614237,9 9.5,9 C9.22385763,9 9,8.77614237 9,8.5 L9,4 L8,4 L8,8.5 C8,8.77614237 7.77614237,9 7.5,9 C7.22385763,9 7,8.77614237 7,8.5 L7,4 L6,4 L6,11 L11,11 Z M19.45,2 C19.7537566,2 20,2.24624339 20,2.55 L20,21 C20,21.5522847 19.5522847,22 19,22 L18,22 C17.4477153,22 17,21.5522847 17,21 L17,17 L16,17 C14.8954305,17 14,16.1045695 14,15 L14,7.45 C14,4.44004811 16.4400481,2 19.45,2 Z M16,15 L18,15 L18,4.32 C16.7823465,4.88673047 16.0026709,6.10692278 16,7.45 L16,15 Z"
                                fill="#6f737b"
                              ></path>
                            </g>
                          </svg>
                        </span>
                        Cuisines
                      </h4>
                      <div style={{ boxSizing: "border-box" }}>
                        {cuisines.map((cuisine) => (
                          <div
                            key={cuisine}
                            className="filter-bar-cuisine-results"
                            onClick={(event) => routeToCuisines(event, cuisine)}
                          >
                            <div>{cuisine}</div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  {filteredRestaurants.length > 0 && (
                    <>
                      <h4 className="filter-bar-restaurant-title">
                        <span>
                          <svg viewBox="0 0 24 24" focusable="false">
                            <g fill="none" fillRule="evenodd">
                              <path
                                d="M 18.0001 11.0001 C 17.1924 11.0001 16.5094 10.8827 16.0001 10.6283 C 15.4908 10.8827 14.8078 11.0001 14.0001 11.0001 C 13.1924 11.0001 12.5094 10.8827 12.0001 10.6283 C 11.4908 10.8827 10.8078 11.0001 10.0001 11.0001 C 9.19236 11.0001 8.50936 10.8827 8.00006 10.6283 C 7.49076 10.8827 6.80776 11.0001 6.00006 11.0001 L 6.00006 19.0001 L 9.00006 19.0001 L 9.00006 14.0001 C 9.00006 13.4478 9.44777 13.0001 10.0001 13.0001 L 14.0001 13.0001 C 14.2762 13.0001 14.5262 13.112 14.7072 13.293 C 14.8881 13.4739 15.0001 13.7239 15.0001 14.0001 L 15.0001 19.0001 L 18.0001 19.0001 L 18.0001 11.0001 Z M 20.0001 10.3915 L 20.0001 19.0001 C 20.5523 19.0001 21.0001 19.4478 21.0001 20.0001 C 21.0001 20.5523 20.5523 21.0001 20.0001 21.0001 L 4.00006 21.0001 C 3.44777 21.0001 3.00006 20.5523 3.00006 20.0001 C 3.00006 19.4478 3.44777 19.0001 4.00006 19.0001 L 4.00006 10.3915 C 3.35614 9.88193 3.00257 9.0683 3.00007 8.01132 C 2.99752 7.7986 3.06255 7.5834 3.20006 7.40006 C 3.20203 7.39733 3.20407 7.39465 3.20612 7.39198 L 6.19308 3.40937 C 6.37504 3.16119 6.66873 3.00006 7.00006 3.00006 C 7.00394 3 7.00782 3.00002 7.0117 3.00006 L 16.9884 3.00006 C 16.9923 3.00002 16.9962 3 17.0001 3 C 17.3314 3.00006 17.6251 3.16119 17.807 3.40937 L 20.794 7.39198 C 20.796 7.39465 20.7981 7.39733 20.8001 7.40002 C 20.9376 7.5834 21.0026 7.7986 21 8.01132 C 20.9976 9.0683 20.644 9.88193 20.0001 10.3915 Z M 18.9844 8.3125 L 16.5001 5.00006 L 7.50006 5.00006 L 5.01573 8.3125 C 5.07766 8.84142 5.33522 9.00006 6.00006 9.00006 C 6.48257 9.00006 6.82392 8.94972 7.0077 8.87582 C 7.06888 8.38216 7.48985 8.00006 8.00006 8.00006 C 8.51027 8.00006 8.93124 8.38216 8.99242 8.87582 C 9.1762 8.94972 9.51755 9.00006 10.0001 9.00006 C 10.4826 9.00006 10.8239 8.94972 11.0077 8.87582 C 11.0689 8.38215 11.4899 8.00006 12.0001 8.00006 C 12.5103 8.00006 12.9312 8.38216 12.9924 8.87582 C 13.1762 8.94972 13.5175 9.00006 14.0001 9.00006 C 14.4826 9.00006 14.8239 8.94972 15.0077 8.87582 C 15.0689 8.38216 15.4898 8.00006 16.0001 8.00006 C 16.5103 8.00006 16.9312 8.38216 16.9924 8.87582 C 17.1762 8.94972 17.5175 9.00006 18.0001 9.00006 C 18.6649 9.00006 18.9225 8.84142 18.9844 8.3125 Z M 11.0001 19.0001 L 13.0001 19.0001 L 13.0001 15.0001 L 11.0001 15.0001 L 11.0001 19.0001 Z"
                                fill="6f737b"
                              ></path>
                            </g>
                          </svg>
                        </span>
                        Restaurants
                      </h4>
                      <div style={{ boxSizing: "border-box" }}>
                        {filteredRestaurants.map((restaurant) => (
                          <div
                            key={restaurant.id}
                            className="filter-bar-restaurant-results"
                            onClick={() => {
                              routeToRestaurantPage(restaurant.id);
                            }}
                          >
                            <div>{restaurant.name}</div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="filter-button">
            <button onClick={letsGo}>Let's go</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
