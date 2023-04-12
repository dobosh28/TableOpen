import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchRestaurant } from "../../store/restaurants";
import { fetchReviews } from "../../store/reviews";
import ReviewsShow from "../Reviews/ReviewShow";
import ReservationForm from "../Reservations/ReservationForm/ReservationForm";
import AdditionalInfo from "./AdditionalInfo";
import "./RestaurantPage.css";

const RestaurantPage = () => {
  const dispatch = useDispatch();
  const { restaurantId } = useParams();
  const restaurant = useSelector((state) => state.restaurants[restaurantId]);
  const reviewsFromState = useSelector((state) => state.reviews);

  const reviews = Object.values(reviewsFromState).filter(
    (review) => review.restaurantId === parseInt(restaurantId)
  );

  useEffect(() => {
    dispatch(fetchRestaurant(restaurantId));
    dispatch(fetchReviews());
  }, [dispatch, restaurantId]);

  if (!restaurant) return null;

  const getToReviews = () => {
    window.scrollTo({
      top: 1000,
      behavior: "smooth",
    });
  };

  return (
    <div className="restaurant-page-main-container">
      <div className="restaurant-page-banner">
        <img
          className="restaurant-page-banner-image"
          src={restaurant.photoUrl}
          alt=""
        />
        <button className="save-this-restaurant-button">
          <div className="save-restaurant-text-logo-container">
            <img
              src="https://cdn.otstatic.com/cfe/11/images/ic_bookmark-f6a8ce.svg"
              alt=""
            />
            <div className="save-restaurant-text">Save this restaurant</div>
          </div>
        </button>
      </div>
      <div className="restaurant-page-info">
        <div className="restaurant-page-info-left">
          <section className="tab-container">
            <nav className="tab-container-nav">
              <ol>
                <li className="nav-li-1">
                  <button className="nav-button-1">Overview</button>
                </li>
                <li className="nav-li">
                  <button className="nav-button">Experiences</button>
                </li>
                <li className="nav-li">
                  <button className="nav-button">Photos</button>
                </li>
                <li className="nav-li">
                  <button className="nav-button">Menu</button>
                </li>
                <li className="nav-li">
                  <button className="nav-button" onClick={getToReviews}>
                    Reviews
                  </button>
                </li>
              </ol>
              <div></div>
            </nav>
          </section>
          <section className="restaurant-details">
            <h1 className="restaurant-name">{restaurant.name}</h1>
            <div className="general-info">
              <div className="rating-stars">to be implemented</div>
              <div className="reviews">reviews</div>
              <div className="cost">cost</div>
              <div className="cuisine">
                <span>icon</span>
                <span>{restaurant.cuisines.split(",")[0]}</span>
              </div>
            </div>
            <div className="restaurant-top-tags">
              <div className="top-tags">Top Tags:</div>
              <div className="lively-tag">Lively</div>
              <div className="groups-tag">Good for Groups</div>
              <div className="gem-tag">Neighborhood Gem</div>
            </div>
            <div className="restaurant-description">
              <p className="restaurant-description-text">
                {restaurant.description}
              </p>
            </div>
          </section>
          <section className="reviews-section">
            <header className="reviews-header">
              <div className="reviews-text-div">
                <h2 className="reviews-text">
                  What{" "}
                  {reviews?.length === 1
                    ? " 1 person is "
                    : reviews.length + " people are "}
                  saying
                </h2>
              </div>
            </header>
            <div className="all-reviews-container">
              <ReviewsShow reviews={reviews} />
            </div>
          </section>
        </div>
        <div className="restaurant-page-info-right">
          <div className="reservation-form-takeout-box">
            <ReservationForm />
          </div>
          <section className="additional-info">
            <div>
              <section className="restaurant-address">
                <div>
                  <span style={{ alignItems: "center", display: "flex" }}>
                    <span
                      style={{
                        display: "inline-block",
                        height: "1.5rem",
                        width: "1.5rem",
                        lineHeight: "1",
                        minWidth: "1.5rem",
                      }}
                    >
                      <svg viewBox="0 0 24 24" focusable="false">
                        <g fill="none" fillRule="evenodd">
                          <path
                            d="M12,2 C16.418278,2 20,5.581722 20,10 C20,12.8133333 17.5666667,16.59 12.7,21.33 C12.3111565,21.7111429 11.6888435,21.7111429 11.3,21.33 C6.43333333,16.59 4,12.8133333 4,10 C4,5.581722 7.581722,2 12,2 Z M12,4 C8.6862915,4 6,6.6862915 6,10 C6,11.21 6.8,14 12,19.21 C17.2,14 18,11.21 18,10 C18,6.6862915 15.3137085,4 12,4 Z M12,7 C13.6568542,7 15,8.34314575 15,10 C15,11.6568542 13.6568542,13 12,13 C10.3431458,13 9,11.6568542 9,10 C9,8.34314575 10.3431458,7 12,7 Z M12,9 C11.4477153,9 11,9.44771525 11,10 C11,10.5522847 11.4477153,11 12,11 C12.5522847,11 13,10.5522847 13,10 C13,9.44771525 12.5522847,9 12,9 Z"
                            fill="#2d333f"
                          ></path>
                        </g>
                      </svg>
                    </span>
                    <p>{restaurant.address}</p>
                  </span>
                </div>
              </section>
              <AdditionalInfo restaurant={restaurant} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;
