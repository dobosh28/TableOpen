import React from "react";
import { useSelector } from "react-redux";
import { getRestaurants } from "../../store/restaurants";

const FilteredRestaurants = ({ cuisine, neighborhood }) => {
  const restaurants = useSelector(getRestaurants);

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const cuisinesArray = restaurant.cuisines.split(",");

    const matchesCuisine = cuisinesArray.some((cuisineName) => {
      return cuisineName.trim().toLowerCase().includes(cuisine.toLowerCase());
    });

    return (
      matchesCuisine &&
      restaurant.neighborhood.toLowerCase().includes(neighborhood.toLowerCase())
    );
  });

  return (
    <div>
      <h2>Filtered Restaurants</h2>
      {filteredRestaurants.map((restaurant) => (
        <div key={restaurant.id}>
          <h3>{restaurant.name}</h3>
          <p>Cuisines: {restaurant.cuisines}</p>
          <p>Neighborhood: {restaurant.neighborhood}</p>
        </div>
      ))}
    </div>
  );
};

export default FilteredRestaurants;
