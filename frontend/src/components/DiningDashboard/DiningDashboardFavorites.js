import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviews, fetchReviews } from "../../store/reviews";
import {
  getFavorites,
  fetchFavorites,
  deleteFavorite,
} from "../../store/favorites";
import { getRestaurants, fetchRestaurants } from "../../store/restaurants";
import { NavLink } from "react-router-dom";
import StarRatings from "react-star-ratings";
import "./DiningDashboardFavorites.css";

const DiningDashboardFavorites = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const restaurants = useSelector(getRestaurants);
  const favoritesData = useSelector(getFavorites);
  const reviews = useSelector(getReviews);

  const savedRestaurants = restaurants.filter((restaurant) => {
    return favoritesData.some(
      (favorite) =>
        favorite.restaurantId === restaurant.id &&
        favorite.userId === sessionUser.id
    );
  });

  const savedRestaurantIds = savedRestaurants.map((restaurant) => {
    return restaurant.id;
  });

  const savedRestaurantReviews = reviews.filter((review) => {
    return savedRestaurantIds.includes(review.restaurantId);
  });

  function findFavoriteId(favoritesData, restaurantId) {
    const favorite = favoritesData.find(
      (favorite) => favorite.restaurantId === restaurantId
    );
    return favorite ? favorite.id : null;
  }

  const handleRemoveFromSaved = (restaurant) => {
    const favoriteId = findFavoriteId(favoritesData, restaurant.id);
    if (favoriteId) {
      dispatch(deleteFavorite(favoriteId));
    }
  };

  useEffect(() => {
    dispatch(fetchFavorites());
    dispatch(fetchRestaurants());
    dispatch(fetchReviews());
  }, [dispatch]);

  const handleItemClick = useCallback(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="dining-dashboard-right">
      <div className="dining-dashboard-favorites">
        <h2>Saved Restaurants</h2>
      </div>
      {savedRestaurants.length > 0 ? (
        <div className="content-block">
          {savedRestaurants.map((restaurant) => {
            let restaurantAvgReviewRating = 0;
            let restaurantReviews = savedRestaurantReviews.filter(
              (review) => review.restaurantId === restaurant.id
            );
            if (restaurantReviews.length > 0) {
              restaurantAvgReviewRating = restaurantReviews.reduce(
                (acc, review) => {
                  return (
                    acc +
                    review.food +
                    review.service +
                    review.ambience +
                    review.value
                  );
                },
                0
              );

              restaurantAvgReviewRating =
                restaurantAvgReviewRating / (restaurantReviews.length * 4);
            }
            return (
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
                      onClick={() => handleRemoveFromSaved(restaurant)}
                    >
                      <img
                        src="https://www.opentable.com/my/NewContent/img/bookmark-filled.svg"
                        alt=""
                        style={{
                          verticalAlign: "middle",
                          display: "inline-block",
                        }}
                      />
                      <span style={{ marginLeft: "3px" }}>
                        Remove from saved restaurants
                      </span>
                    </div>
                    {restaurantAvgReviewRating >= 0 ? (
                      <div
                        className="saved-restaurant-rating"
                        style={{ height: "16px" }}
                      >
                        <StarRatings
                          rating={restaurantAvgReviewRating}
                          starRatedColor="rgb(242, 175, 119)"
                          numberOfStars={5}
                          starDimension="17px"
                          starSpacing="0px"
                          style={{ height: "1rem" }}
                        />
                      </div>
                    ) : null}
                    <div className="saved-restaurant-cuisine-neighborhood">
                      {restaurant.cuisines.split(",")[0]} |{" "}
                      {restaurant.neighborhood}
                    </div>
                    <div className="favorite-book">
                      <NavLink to={`/restaurants/${restaurant.id}`}>
                        <button onClick={handleItemClick}>Reserve Now</button>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
