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
            stars and reviews to be implemented
          </div>
          <div className="cuisine-price-location">
            <span className="cuisines">{restaurant.cuisines.split(',')[0]}</span>
          </div>
          <div className="times-booked-outer">
            <span className="times-booked-inner">
              <span className="booked-logo-container">
                
              </span>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RestaurantItem;
