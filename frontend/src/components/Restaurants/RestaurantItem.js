import { NavLink } from "react-router-dom";
import "./RestaurantItem.css";
import RestaurantImageLoading from "../LoadingPhotoAnimation/RestaurantImageLoading";
import { fetchReviews } from "../../store/reviews";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useCallback } from "react";

const RestaurantItem = ({ restaurant, id }) => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews);
  const numberOfReviews = useMemo(() => {
    return Object.values(reviews).filter(
      (review) => review.restaurantId === restaurant.id
    ).length;
  }, [reviews, restaurant.id]);

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch, restaurant.id]);

  const handleItemClick = useCallback(() => {
    window.scrollTo(0, 0);
  }, []);

  const timesBooked = useMemo(() => {
    return Math.floor(Math.random() * (74 - 12 + 1) + 12);
  }, []);

  return (
    <div className="restaurant-wrapper" id={id} onClick={handleItemClick}>
      <NavLink className="restaurant-link" to={`/restaurants/${restaurant.id}`}>
        <RestaurantImageLoading src={restaurant.photoUrl} />
        <div className="restaurant-content">
          <h3>{restaurant.name}</h3>
          <div className="stars-reviews">
            <div className="restaurant-card-stars"></div>
            {numberOfReviews === 1 ? (
              <span className="review-count">{numberOfReviews} review</span>
            ) : (
              <span className="review-count">{numberOfReviews} reviews</span>
            )}
          </div>
          <div className="cuisine-price-location">
            <span className="name-price-neighbourhood">
              {restaurant.cuisines.split(",")[0]}
            </span>
            <span
              className="name-price-neighbourhood"
              style={{ marginLeft: "4px" }}
            >
              {restaurant.cost === "$30 and under" && (
                <span className="dark-gray-dollar">
                  $$<span className="light-gray-dollar">$$</span>
                </span>
              )}
              {restaurant.cost === "$31 to $50" && (
                <span className="dark-gray-dollar">
                  $$$<span className="light-gray-dollar">$</span>
                </span>
              )}
              {restaurant.cost === "$50 and over" && (
                <span className="dark-gray-dollar">$$$$</span>
              )}
            </span>
            <span className="name-price-neighbourhood">
              {restaurant.neighborhood}
            </span>
          </div>
          <div className="times-booked-card">
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
              Booked {timesBooked} times today
            </span>
          </div>
          <div style={{padding: "8px 0"}}>
            <button className="find-next-available">
              Find next available
            </button>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default RestaurantItem;
