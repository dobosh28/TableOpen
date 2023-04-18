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

  const reviewsAmount = reviews.length;

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
              <div className="rating-stars">stars to be implemented</div>
              <div className="total-reviews">
                <span className="general-info-span">
                  <svg viewBox="0 0 24 24" focusable="false">
                    <g fill="none" fillRule="evenodd">
                      <path
                        d="M19,4 L5,4 C3.8954305,4 3,4.8954305 3,6 L3,15 C3,16.1045695 3.8954305,17 5,17 L11,17 L15.36,20.63 C15.6583354,20.8784924 16.0735425,20.9318337 16.4250008,20.7668198 C16.776459,20.6018059 17.0006314,20.2482681 17,19.86 L17,17 L19,17 C20.1045695,17 21,16.1045695 21,15 L21,6 C21,4.8954305 20.1045695,4 19,4 Z M19,15 L15,15 L15,17.73 L11.72,15 L5,15 L5,6 L19,6 L19,15 Z"
                        fill="#2d333f"
                      ></path>
                    </g>
                  </svg>
                </span>
                <span className="general-info-span-2">
                  {reviewsAmount === 1
                    ? "1 review"
                    : reviewsAmount + " reviews"}
                </span>
              </div>
              <div className="cost">
                <span className="general-info-span">
                  <svg viewBox="0 0 24 24" focusable="false">
                    <g fill="none" fillRule="evenodd">
                      <path
                        d="M20,15 L20,9 L18.5,9 C18.2238576,9 18,8.77614237 18,8.5 L18,7 L6,7 L6,8.5 C6,8.77614237 5.77614237,9 5.5,9 L4,9 L4,15 L5.5,15 C5.77614237,15 6,15.2238576 6,15.5 L6,17 L18,17 L18,15.5 C18,15.2238576 18.2238576,15 18.5,15 L20,15 Z M4,5 L20,5 C21.1045695,5 22,5.8954305 22,7 L22,17 C22,18.1045695 21.1045695,19 20,19 L4,19 C2.8954305,19 2,18.1045695 2,17 L2,7 C2,5.8954305 2.8954305,5 4,5 Z M12,10 C13.1045695,10 14,10.8954305 14,12 C14,13.1045695 13.1045695,14 12,14 C10.8954305,14 10,13.1045695 10,12 C10,10.8954305 10.8954305,10 12,10 Z"
                        fill="#2d333f"
                      ></path>
                    </g>
                  </svg>
                </span>
                <span className="general-info-span-2">{restaurant.cost}</span>
              </div>
              <div className="cuisine">
                <span className="general-info-span">
                  <svg viewBox="0 0 24 24" focusable="false">
                    <g fill="none" fillRule="evenodd">
                      <path
                        d="M11,2 C12.1045695,2 13,2.8954305 13,4 L13,11 C13,12.1045695 12.1045695,13 11,13 L10,13 L10,21 C10,21.5522847 9.55228475,22 9,22 L8,22 C7.44771525,22 7,21.5522847 7,21 L7,13 L6,13 C4.8954305,13 4,12.1045695 4,11 L4,4 C4,2.8954305 4.8954305,2 6,2 L11,2 Z M11,11 L11,4 L10,4 L10,8.5 C10,8.77614237 9.77614237,9 9.5,9 C9.22385763,9 9,8.77614237 9,8.5 L9,4 L8,4 L8,8.5 C8,8.77614237 7.77614237,9 7.5,9 C7.22385763,9 7,8.77614237 7,8.5 L7,4 L6,4 L6,11 L11,11 Z M19.45,2 C19.7537566,2 20,2.24624339 20,2.55 L20,21 C20,21.5522847 19.5522847,22 19,22 L18,22 C17.4477153,22 17,21.5522847 17,21 L17,17 L16,17 C14.8954305,17 14,16.1045695 14,15 L14,7.45 C14,4.44004811 16.4400481,2 19.45,2 Z M16,15 L18,15 L18,4.32 C16.7823465,4.88673047 16.0026709,6.10692278 16,7.45 L16,15 Z"
                        fill="#2d333f"
                      ></path>
                    </g>
                  </svg>
                </span>
                <span className="general-info-span-2">
                  {restaurant.cuisines.split(",")[0]}
                </span>
              </div>
            </div>
            <div className="restaurant-top-tags">
              <span className="top-tags">Top Tags:</span>
              <ul className="top-tags-list">
                <li className="top-tags-list-item" style={{ width: "202.21" }}>
                  <p>Good For Special Occasions</p>
                </li>
                <li className="top-tags-list-item" style={{ width: "154.69" }}>
                  <p>Neighborhood Gem</p>
                </li>
                <li className="top-tags-list-item" style={{ width: "138.15" }}>
                  <p>Good for Groups</p>
                </li>
              </ul>
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
