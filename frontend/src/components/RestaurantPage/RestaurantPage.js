import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchRestaurant } from "../../store/restaurants";
import "./RestaurantPage.css";

const RestaurantPage = () => {
  const dispatch = useDispatch();
  const { restaurantId } = useParams();
  const restaurant = useSelector((state) => state.restaurants[restaurantId]);

  useEffect(() => {
    dispatch(fetchRestaurant(restaurantId));
  }, [dispatch, restaurantId]);

  if (!restaurant) return null;
  
  return (
    <>
      <div className="restaurant-page-main-container">
        <div className="restaurant-page-banner">
          <img className="restaurant-page-banner-image" src="https://via.placeholder.com/1600x460" alt="" />
          <button className="save-this-restaurant-button">
            <div className="save-restaurant-text-logo-container">
              <img src="https://cdn.otstatic.com/cfe/11/images/ic_bookmark-f6a8ce.svg" alt="" />
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
              <div className="restaurant-overview-header">
                <div className="rating-stars">
                  to be implemented
                </div>
                <div className="reviews">
                  reviews
                </div>
                <div className="cost">
                  cost
                </div>
                <div className="cuisine">
                  <span>icon</span>
                  <span>{restaurant.cuisines.split(',')[0]}</span>
                </div>
              </div>
              <div className="restaurant-top-tags">
                <span className="top-tags-text">Top Tags:</span>
                <ul className="top-tags-ul">
                  <li className="top-tags-li">Lively</li>
                  <li className="top-tags-li">Good for Groups</li>
                  <li className="top-tags-li">Neighborhood Gem</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantPage;
