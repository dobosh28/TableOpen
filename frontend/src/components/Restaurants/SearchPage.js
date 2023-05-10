import React, { useEffect, useCallback } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "./SearchBar";
import StarRatings from "react-star-ratings";
import { fetchReviews } from "../../store/reviews";
import { getRestaurants, fetchRestaurants } from "../../store/restaurants";
import "./SearchPage.css";
import { useState } from "react";
// import { format } from "date-fns";

const SearchPage = () => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const cuisine = searchParams.get("cuisine");
  const neighborhood = searchParams.get("neighborhood");
  const restaurants = useSelector(getRestaurants);
  const dispatch = useDispatch();
  const [reservationTime, setReservationTime] = useState("");

  const parseQuery = (query) => {
    const queryObj = {};
    query
      .substring(1)
      .split("&")
      .forEach((pair) => {
        const [key, value] = pair.split("=");
        queryObj[key] = value;
      });
    return queryObj;
  };

  const { date, time, partySize } = parseQuery(location.search);

  const handleTimeClick = (time, restaurantId) => {
    if (!reservationTime) setReservationTime(time);
    history.push({
      pathname: `/restaurants/${restaurantId}/`,
      state: {
        selectedTime: time,
      },
    });

    window.scrollTo(0, 200);
  };

  const suggestedTimes = [
    { time: "18:30", formattedTime: "6:30 PM" },
    { time: "18:45", formattedTime: "6:45 PM" },
    { time: "19:00", formattedTime: "7:00 PM" },
    { time: "19:15", formattedTime: "7:15 PM" },
    { time: "19:30", formattedTime: "7:30 PM" },
  ];

  const handleItemClick = useCallback(() => {
    window.scrollTo(0, 115);
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

  console.log("date value:", date);

  return (
    <main
      style={{
        outline: "0",
        display: "block",
        borderTop: ".0625rem solid #f1f2f4",
      }}
    >
      <header className="search-page-header">
        <SearchBar
          restaurants={restaurants}
          initialDate={new Date(date)}
          initialTime={time}
          initialPartySize={parseInt(partySize, 10)}
        />
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
                  <div className="search-page-restaurant-times-booked">
                    <span className="times-booked-card-inner">
                      <span>
                        <svg viewBox="0 0 24 24" focusable="false">
                          <g fill="none" fillRule="evenodd">
                            <path
                              d="M15.5,5 C15.2239,5 15,5.223846 15,5.5 L15,6.5 C15,6.77615 15.2239,7 15.5,7 L17.5858,7 L14,10.58578 L12.70711,9.29291 L12.35355,8.93933 C12.15829,8.74408 11.84171,8.74408 11.64645,8.93933 L11.29289,9.29291 L5,15.5858 L5,7 L11.5,7 C11.77614,7 12,6.77615 12,6.5 L12,5.5 C12,5.22385 11.77614,5 11.5,5 L5,5 C3.89543,5 3,5.89542 3,7 L3,17 C3,18.1046 3.89543,19 5,19 L19,19 C20.1046,19 21,18.1046 21,17 L21,14.5 C21,14.2238 20.7761,14 20.5,14 L19.5,14 C19.2239,14 19,14.2238 19,14.5 L19,17 L6.4142,17 L12,11.41422 L13.2929,12.70709 L13.6464,13.06067 C13.8417,13.25592 14.1583,13.25592 14.3536,13.06067 L14.7071,12.70709 L19,8.41422 L19,10.5 C19,10.77615 19.2239,11 19.5,11 L20.5,11 C20.7761,11 21,10.77615 21,10.5 L21,6 L21,5.5 C21,5.223846 20.7761,5 20.5,5 L20,5 L15.5,5 Z"
                              fill="#2d333f"
                            ></path>
                          </g>
                        </svg>
                      </span>
                      Booked {Math.floor(Math.random() * (44 - 12 + 1) + 12)}{" "}
                      times today
                    </span>
                  </div>
                  <ul className="suggested-times">
                    {suggestedTimes.map(({ time, formattedTime }) => (
                      <li
                        key={time}
                        className="suggested-time"
                        onClick={() => handleTimeClick(time, restaurant.id)}
                      >
                        {formattedTime}
                      </li>
                    ))}
                  </ul>
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
};

export default SearchPage;
