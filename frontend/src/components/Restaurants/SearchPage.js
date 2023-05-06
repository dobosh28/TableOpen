import React, { useEffect, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "./SearchBar";
import StarRatings from "react-star-ratings";
import { fetchReviews } from "../../store/reviews";
import { getRestaurants, fetchRestaurants } from "../../store/restaurants";
import "./SearchPage.css";

function SearchPage({ location }) {
  const searchParams = new URLSearchParams(location.search);
  const cuisine = searchParams.get("cuisine");
  const neighborhood = searchParams.get("neighborhood");
  const restaurants = useSelector(getRestaurants);
  const dispatch = useDispatch();

  const handleItemClick = useCallback(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleItemClickTwo = useCallback(() => {
    window.scrollTo({
      top: 1000,
    });
  }, []);

  useEffect(() => {
    dispatch(fetchRestaurants());
    dispatch(fetchReviews());
  }, [dispatch]);

  let filteredRestaurants = restaurants;

  if (cuisine || neighborhood) {
    filteredRestaurants = restaurants.filter((restaurant) => {
      if (cuisine) {
        return restaurant.cuisines
          .toLowerCase()
          .includes(cuisine.toLowerCase());
      } else if (neighborhood) {
        return restaurant.neighborhood
          .toLowerCase()
          .includes(neighborhood.toLowerCase());
      }
      return false;
    });
  }
  const reviewsFromState = useSelector((state) => state.reviews);
  console.log(reviewsFromState);

  filteredRestaurants.forEach((restaurant) => {
    const reviews = Object.values(reviewsFromState).filter(
      (review) => review.restaurantId === restaurant.id
    );

    const reviewsAmount = reviews?.length;

    const avgReview = reviews?.reduce((acc, review) => {
      return (
        acc + review.food + review.service + review.ambience + review.value
      );
    }, 0);

    const avgReviewRating = avgReview / (reviewsAmount * 4);

    restaurant.avgReviewRating = avgReviewRating;
  });

  return (
    <main
      style={{
        outline: "0",
        display: "block",
        borderTop: ".0625rem solid #f1f2f4",
      }}
    >
      <header className="search-page-header">
        <SearchBar restaurants={restaurants} />
      </header>
      <div className="search-page-main-div">
        {filteredRestaurants.length > 0 ? (
          <div className="search-page-main-div-inner">
            {filteredRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="search-page-restaurant">
                <NavLink
                  to={`/restaurants/${restaurant.id}`}
                  onClick={handleItemClick}
                >
                  <div className="search-page-restaurant-photo">
                    <img src={restaurant.photoUrl} alt="" />
                  </div>
                </NavLink>
                <div className="search-page-restaurant-info">
                  <div className="search-page-restaurant-name-rating-price">
                    <div
                      style={{
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "space-between",
                        paddingBottom: "4px",
                      }}
                    >
                      <NavLink
                        to={`/restaurants/${restaurant.id}`}
                        style={{ textDecoration: "none" }}
                        onClick={handleItemClick}
                      >
                        <h6 className="restaurant-h6">{restaurant.name}</h6>
                      </NavLink>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        width: "100%",
                      }}
                    >
                      <div
                        style={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        {restaurant.avgReviewRating > 0 ? (
                          <StarRatings
                            className="stars"
                            rating={restaurant.avgReviewRating}
                            starRatedColor="rgb(242, 178, 63)"
                            numberOfStars={5}
                            name="rating"
                            starDimension="19px"
                            starSpacing="1px"
                          />
                        ) : (
                          <StarRatings
                            className="stars"
                            rating={0}
                            starRatedColor="rgb(225, 225, 225)"
                            numberOfStars={5}
                            name="rating"
                            starDimension="19px"
                            starSpacing="1px"
                          />
                        )}
                      </div>
                      {restaurant.avgReviewRating >= 2.5 &&
                        restaurant.avgReviewRating < 3.0 && (
                          <span className="rating-described">Good</span>
                        )}
                      {restaurant.avgReviewRating >= 3.0 &&
                        restaurant.avgReviewRating < 3.6 && (
                          <span className="rating-described">Very Good</span>
                        )}
                      {restaurant.avgReviewRating >= 3.6 &&
                        restaurant.avgReviewRating < 4.0 && (
                          <span className="rating-described">Excellent</span>
                        )}
                      {restaurant.avgReviewRating >= 4.0 &&
                        restaurant.avgReviewRating < 4.3 && (
                          <span className="rating-described">Awesome</span>
                        )}
                      {restaurant.avgReviewRating >= 4.3 && (
                        <span className="rating-described">Exceptional</span>
                      )}
                      <NavLink
                        to={`/restaurants/${restaurant.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <span
                          className="num-of-reviews"
                          onClick={handleItemClickTwo}
                        >
                          (
                          {
                            Object.values(reviewsFromState).filter(
                              (review) => review.restaurantId === restaurant.id
                            ).length
                          }
                          )
                        </span>
                      </NavLink>
                    </div>
                    <div className="price-cuisine-location">
                      <span className="name-price-neighbourhood">
                        {restaurant.cost === "$30 and under" && (
                          <span
                            className="dark-gray-dollar"
                            style={{ fontSize: "15px" }}
                          >
                            $$
                            <span
                              className="light-gray-dollar"
                              style={{ fontSize: "15px" }}
                            >
                              $$
                            </span>
                          </span>
                        )}
                        {restaurant.cost === "$31 to $50" && (
                          <span
                            className="dark-gray-dollar"
                            style={{ fontSize: "15px" }}
                          >
                            $$$
                            <span
                              className="light-gray-dollar"
                              style={{ fontSize: "15px" }}
                            >
                              $
                            </span>
                          </span>
                        )}
                        {restaurant.cost === "$50 and over" && (
                          <span
                            className="dark-gray-dollar"
                            style={{ fontSize: "15px" }}
                          >
                            $$$$
                          </span>
                        )}
                      </span>
                      <span className="name-price-neighbourhood">
                        {restaurant.cuisines.split(",")[0]}
                      </span>
                      <span className="name-price-neighbourhood">
                        {restaurant.neighborhood}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No restaurants found</p>
        )}
      </div>
    </main>
  );
}

export default SearchPage;
