import React from "react";
import { useSelector } from "react-redux";
import { getRestaurants } from "../../store/restaurants";

function SearchPage({ location }) {
  const searchParams = new URLSearchParams(location.search);
  const cuisine = searchParams.get("cuisine");
  const neighborhood = searchParams.get("neighborhood");
  const restaurants = useSelector(getRestaurants);

  const filteredRestaurants = restaurants.filter((restaurant) => {
    if (cuisine) {
      return restaurant.cuisines.toLowerCase().includes(cuisine.toLowerCase());
    } else if (neighborhood) {
      return restaurant.neighborhood
        .toLowerCase()
        .includes(neighborhood.toLowerCase());
    }
    return false;
  });

  return (
    <div className="search-page-container">
      <div className="search-page-results-container">
        {filteredRestaurants.length > 0 ? (
          <ul className="search-page-results-list">
            {filteredRestaurants.map((restaurant) => (
              <li key={restaurant.id}>
                <h3>{restaurant.name}</h3>
              </li>
            ))}
          </ul>
        ) : (
          <p>No restaurants found</p>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
