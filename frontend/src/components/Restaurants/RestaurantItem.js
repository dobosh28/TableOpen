import React from "react";
import { Link } from "react-router-dom";
import "./RestaurantItem.css";
import RestaurantImageLoading from "../LoadingPhotoAnimation/RestaurantImageLoading";

const RestaurantItem = ({ restaurant }) => {
  return (
    <div className="restaurant-wrapper">
      <Link className="restaurant-link" to={`/restaurants/${restaurant.id}`}>
      <RestaurantImageLoading src={restaurant.photoUrl} />
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
