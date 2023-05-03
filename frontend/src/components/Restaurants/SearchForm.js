// components/Search.js
import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { getRestaurants } from "../../store/restaurants";
import { useHistory } from "react-router-dom";
import "./SearchForm.css";

const Search = () => {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState("");
  const restaurants = useSelector(getRestaurants);

  const categories = useMemo(() => {
    if (!searchValue)
      return { cuisines: [], neighborhoods: [], restaurants: [] };
    const cuisinesSet = new Set();
    const neighborhoodsSet = new Set();
    const filteredRestaurants = [];

    restaurants.forEach((restaurant) => {
      const { name, cuisines, neighborhood } = restaurant;

      if (cuisines.toLowerCase().includes(searchValue.toLowerCase())) {
        cuisinesSet.add(cuisines);
      }

      if (neighborhood.toLowerCase().includes(searchValue.toLowerCase())) {
        neighborhoodsSet.add(neighborhood);
      }

      if (name.toLowerCase().includes(searchValue.toLowerCase())) {
        filteredRestaurants.push(restaurant);
      }
    });

    return {
      cuisines: Array.from(cuisinesSet),
      neighborhoods: Array.from(neighborhoodsSet),
      restaurants: filteredRestaurants,
    };
  }, [searchValue, restaurants]);

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const routeToFilteredRestaurants = (event, filterType, filterValue) => {
    event.stopPropagation();
    history.push(`/restaurants?${filterType}=${filterValue}`);
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Location, Restaurant, or Cuisine"
        value={searchValue}
        onChange={handleChange}
      />
      <div className="search-results">
        {searchValue && (
          <>
            <div className="category">
              <strong>Cuisines:</strong>
              {categories.cuisines.map((cuisine) => (
                <button
                  key={cuisine}
                  className="search-result"
                  onClick={(event) =>
                    routeToFilteredRestaurants(event, "cuisine", cuisine)
                  }
                >
                  {cuisine}
                </button>
              ))}
            </div>
            <div className="category">
              <strong>Neighborhoods:</strong>
              {categories.neighborhoods.map((neighborhood) => (
                <button
                  key={neighborhood}
                  className="search-result"
                  onClick={(event) =>
                    routeToFilteredRestaurants(
                      event,
                      "neighborhood",
                      neighborhood
                    )
                  }
                >
                  {neighborhood}
                </button>
              ))}
            </div>
            <div className="category">
              <strong>Restaurants:</strong>
              {categories.restaurants.map((restaurant) => (
                <button
                  key={restaurant.id}
                  className="search-result"
                  onClick={(event) =>
                    routeToFilteredRestaurants(
                      event,
                      "restaurant",
                      restaurant.id
                    )
                  }
                >
                  {restaurant.name}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
