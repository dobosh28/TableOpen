import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFavorites,
  fetchFavorites,
  deleteFavorite,
} from "../../store/favorites";
import { getRestaurants, fetchRestaurants } from "../../store/restaurants";
import { NavLink } from "react-router-dom";
import "./DiningDashboardFavorites.css";

const DiningDashboardFavorites = () => {
  const dispatch = useDispatch();
  const restaurants = useSelector(getRestaurants);
  const favoritesData = useSelector(getFavorites);

  const savedRestaurants = restaurants.filter((restaurant) => {
    return favoritesData.some(
      (favorite) => favorite.restaurantId === restaurant.id
    );
  });

  console.log("favoritesData:", favoritesData);
  console.log("Saved Restaurants:", savedRestaurants);

  function findFavoriteId(favoritesData, savedRestaurants) {
    for (let i = 0; i < favoritesData.length; i++) {
      const favorite = favoritesData[i];
      for (let j = 0; j < savedRestaurants.length; j++) {
        const savedRestaurant = savedRestaurants[j];
        if (favorite.restaurantId === savedRestaurant.id) {
          return favorite.id;
        }
      }
    }
    return null;
  }

  useEffect(() => {
    dispatch(fetchFavorites());
    dispatch(fetchRestaurants());
  }, [dispatch]);

  return (
    <div className="dining-dashboard-right">
      <div className="dining-dashboard-favorites">
        <h2>Saved Restaurants</h2>
      </div>
      {savedRestaurants.length > 0 ? (
        <div className="content-block">
          {savedRestaurants.map((restaurant) => (
            <div className="saved-restaurant-card" key={restaurant.id}>
              <div className="rest-row with-image rest-row-info">
                <div className="rest-row-info">
                  <NavLink
                    to={`/restaurants/${restaurant.id}`}
                    className="rest-row-image"
                  >
                    <img src={restaurant.photoUrl} alt="" />
                  </NavLink>
                  <NavLink
                    to={`/restaurants/${restaurant.id}`}
                    className="saved-restaurant-name"
                  >
                    {restaurant.name}
                  </NavLink>
                  <div
                    className="remove-from-saved"
                    onClick={() =>
                      dispatch(
                        deleteFavorite(
                          findFavoriteId(favoritesData, savedRestaurants)
                        )
                      )
                    }
                  >
                    <img
                      src="https://www.opentable.com/my/NewContent/img/bookmark-filled.svg"
                      alt=""
                      style={{marginRight: "3px"}}
                    />
                    Remove from saved restaurants
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="you-have-no-saved-restaurants">
          <span>You have no favorite restaurants to show on this list.</span>
        </div>
      )}
    </div>
  );
};

export default DiningDashboardFavorites;
