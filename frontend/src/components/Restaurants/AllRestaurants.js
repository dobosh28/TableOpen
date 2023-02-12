import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchRestaurants } from "../../store/restaurants";
import RestaurantItem from "./RestaurantItem";
import "./AllRestaurants.css";

const LandingPageRestaurants = () => {
  const dispatch = useDispatch();
  const restaurants = useSelector((state) => Object.values(state.restaurants));

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  return (
    <>
      <section className="restaurants-outer-container">
        <div className="restaurants-inner-container">
          <div className="location-banner">
            <div className="location">
              <p>It looks like you're in New Yok. Not correct?</p>
            </div>
            <div>
              <img
                src="https://cdn.otstatic.com/cfe/11/images/ic_location_detection_red-3d558b.svg"
                className="current-location-arrow"
                alt=""
              />
            </div>
            <div className="get-current-location">Get current location</div>
          </div>
          <div className="restaurant-item-wrapper">
            <div className="restaurants-items">
              {restaurants.map((restaurant, i) => (
                <RestaurantItem key={i} restaurant={restaurant} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPageRestaurants;
