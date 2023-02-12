import React from 'react';
import {Link} from 'react-router-dom';

const RestaurantItem = ({ restaurant }) => {
    return (
       
        <div className="restaurant-wrapper">
            <Link className="restaurant-link" to={`/restaurants/${restaurant.id}`}>
                <img src="https://via.placeholder.com/234x132" alt="" />
            </Link>
            <div className="restaurant-content">
                <Link className="restaurant-link" to={`/restaurants/${restaurant.id}`} />
                <h2>{restaurant.name}</h2>
                <p>{restaurant.cuisines} · {restaurant.neighborhood}</p>
            </div>
        </div>
    );
};

export default RestaurantItem;