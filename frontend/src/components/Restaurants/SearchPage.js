import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRestaurants, fetchRestaurants } from "../../store/restaurants";
import SearchBar from "./SearchBar";
import "./SearchPage.css";

function SearchPage({ location }) {
  const searchParams = new URLSearchParams(location.search);
  const cuisine = searchParams.get("cuisine");
  const neighborhood = searchParams.get("neighborhood");
  const restaurants = useSelector(getRestaurants);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRestaurants());
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
                <div className="search-page-restaurant-photo">
                  <img src={restaurant.photoUrl} alt="" />
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
