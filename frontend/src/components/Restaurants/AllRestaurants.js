import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRestaurants, fetchRestaurants } from "../../store/restaurants";
import RestaurantItem from "./RestaurantItem";
import "./AllRestaurants.css";

const LandingPageRestaurants = () => {
  const dispatch = useDispatch();
  const restaurants = useSelector(getRestaurants);

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  return (
    <>
      <header className="search-section">
        <div className="search-section-inner">
          <h1 className="search-section-prompt">
            Find your table for any occasion
          </h1>
          <span className="search-section-subtext"></span>
        </div>
      </header>
      <section className="restaurants-outer-container">
        <div className="restaurants-inner-container">
          <section className="location-outer-banner">
            <div className="location-inner-banner">
              <div className="location">
                <span className="location-text">
                  It looks like you're in New York. Not correct?
                </span>
                <div className="current-location-text-logo">
                  <div className="current-location-logo">
                    <img
                      src="https://cdn.otstatic.com/cfe/11/images/ic_location_detection_red-3d558b.svg"
                      alt=""
                    />
                  </div>
                  <div className="current-location-text">
                    Get current location
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="restaurant-item-wrapper">
            <header className="restaurants-header">
              <div className="header-div">
                <h2>All Restaurants</h2>
              </div>
            </header>
            <div className="restaurants-items">
              {restaurants.map((restaurant, i) => (
                <RestaurantItem key={i} restaurant={restaurant} id={`restaurant-${i}`} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPageRestaurants;
