import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchRestaurant } from "../../store/restaurants";
import { fetchReviews } from "../../store/reviews";
import "./RestaurantPage.css";
import ReviewsShow from "../Reviews/ReviewShow";
import ReservationForm from "../Reservations/ReservationForm/ReservationForm";

const RestaurantPage = () => {
  const dispatch = useDispatch();
  const { restaurantId } = useParams();
  const restaurant = useSelector((state) => state.restaurants[restaurantId]);
  const reviewsFromState = useSelector((state) => state.reviews);

  const reviews = Object.values(reviewsFromState).filter(
    (review) => review.restaurantId === parseInt(restaurantId)
  );
  // console.log(reviews);

  useEffect(() => {
    dispatch(fetchRestaurant(restaurantId));
    dispatch(fetchReviews());
  }, [dispatch, restaurantId]);

  if (!restaurant) return null;

  return (
    <>
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
                    <button className="nav-button">Reviews</button>
                  </li>
                </ol>
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
                    What
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
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantPage;
