import React from "react";
import { Link } from "react-router-dom";
import "./RestaurantItem.css";

const RestaurantItem = ({ restaurant }) => {
  return (
    <div className="restaurant-wrapper">
      <Link className="restaurant-link" to={`/restaurants/${restaurant.id}`}>
        <img src="https://via.placeholder.com/234x132" alt="" className="restaurant-img" />
        <div className="restaurant-content">
          <h3>{restaurant.name}</h3>
          <div className="stars-reviews">

          </div>
          <div className="cuisine-price-location">
            <span className="cuisines">{restaurant.cuisines.split(',')[0]}</span>
          </div>
          
        </div>
      </Link>
    </div>
  );
};

export default RestaurantItem;
