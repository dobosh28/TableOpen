import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getRestaurants } from "../../store/restaurants";
import "./SearchBar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const SearchBar = ({ initialDate, initialTime, initialPartySize }) => {
  const history = useHistory();
  const restaurants = useSelector(getRestaurants);
  const [searchInput, setSearchInput] = useState("");

  const [date, setDate] = useState(initialDate || new Date());
  const [time, setTime] = useState(initialTime || "19:00");
  const [partySize, setPartySize] = useState(initialPartySize || 2);

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const restaurantNeighborhoods = (acc, neighborhood) => {
    if (!acc.includes(neighborhood)) {
      acc.push(neighborhood);
    }
    return acc;
  };

  const neighborhoods = restaurants.reduce((acc, cur) => {
    const filteredNeighborhoods = cur.neighborhood
      .split(", ")
      .filter((neighborhood) =>
        neighborhood.toLowerCase().includes(searchInput.toLowerCase())
      );

    return filteredNeighborhoods.reduce(restaurantNeighborhoods, acc);
  }, []);

  const restaurantCuisines = (acc, cuisine) => {
    if (!acc.includes(cuisine)) {
      acc.push(cuisine);
    }
    return acc;
  };

  const cuisines = restaurants.reduce((acc, cur) => {
    const filteredCuisines = cur.cuisines
      .split(", ")
      .filter((cuisine) =>
        cuisine.toLowerCase().includes(searchInput.toLowerCase())
      );

    return filteredCuisines.reduce(restaurantCuisines, acc);
  }, []);

  const closeSearchResults = () => setSearchInput("");

  useEffect(() => {
    if (!searchInput) return;
    const listener = () => closeSearchResults();
    window.addEventListener("click", listener);
    return () => window.removeEventListener("click", listener);
  }, [searchInput]);

  const routeToRestaurantPage = (restaurantId) => {
    history.push(`/restaurants/${restaurantId}`);
  };

  const routeToNeighborhoods = (event, neighborhood) => {
    event.stopPropagation();

    history.push({
      pathname: "/restaurants",
      search: `?date=${format(
        date,
        "yyyy-MM-dd"
      )}&time=${time}&partySize=${partySize}&neighborhood=${neighborhood}`,
    });
  };

  const routeToCuisines = () => {
    history.push({
      pathname: "/restaurants",
      search: `?date=${format(
        date,
        "yyyy-MM-dd"
      )}&time=${time}&partySize=${partySize}&cuisine=${cuisines}`,
    });
  };

  const letsGo = () => {
    history.push({
      pathname: "/restaurants",
      search: `?date=${format(
        date,
        "yyyy-MM-dd"
      )}&time=${time}&partySize=${partySize}`,
    });
  };

  const suggestedTimes = [
    { time: "18:30", formattedTime: "6:30 PM" },
    { time: "18:45", formattedTime: "6:45 PM" },
    { time: "19:00", formattedTime: "7:00 PM" },
    { time: "19:15", formattedTime: "7:15 PM" },
    { time: "19:30", formattedTime: "7:30 PM" },
    { time: "19:45", formattedTime: "7:45 PM" },
    { time: "20:00", formattedTime: "8:00 PM" },
    { time: "20:15", formattedTime: "8:15 PM" },
    { time: "20:30", formattedTime: "8:30 PM" },
    { time: "20:45", formattedTime: "8:45 PM" },
    { time: "21:00", formattedTime: "9:00 PM" },
    { time: "21:15", formattedTime: "9:15 PM" },
    { time: "21:30", formattedTime: "9:30 PM" },
    { time: "21:45", formattedTime: "9:45 PM" },
    { time: "22:00", formattedTime: "10:00 PM" },
  ];

  return (
    <div>
      <div className="date-time-party-search">
        <div className="main-page-date-time-party">
          <div className="main-page-date-time">
            <div className="main-page-date">
              <div className="main-page-date-inner">
                <div className="main-page-date-inner-2">
                  <div className="main-page-date-inner-3">
                    <div className="main-page-date-inner-4">
                      <span>
                        <svg viewBox="0 0 24 24" focusable="false">
                          <g fill="none" fillRule="evenodd">
                            <path
                              d="M17,5 L19,5 C20.1045695,5 21,5.8954305 21,7 L21,19 C21,20.1045695 20.1045695,21 19,21 L5,21 C3.8954305,21 3,20.1045695 3,19 L3,7 C3,5.8954305 3.8954305,5 5,5 L7,5 L7,4 C7,3.44771525 7.44771525,3 8,3 C8.55228475,3 9,3.44771525 9,4 L9,5 L15,5 L15,4 C15,3.44771525 15.4477153,3 16,3 C16.5522847,3 17,3.44771525 17,4 L17,5 Z M19,9 L19,7 L5,7 L5,9 L19,9 Z M19,11 L5,11 L5,19 L19,19 L19,11 Z"
                              fill="#2d333f"
                            ></path>
                          </g>
                        </svg>
                      </span>
                      <div className="date-input-holder">
                        <DatePicker
                          selected={date}
                          onChange={(date) => setDate(date)}
                          dateFormat="MMMM d, yyyy"
                          minDate={new Date()}
                        />
                      </div>
                      <span>
                        <svg viewBox="0 0 24 24" focusable="false">
                          <g fill="none" fillRule="evenodd">
                            <path
                              d="M11,11 L11,14.5 C11,14.7761424 10.7761424,15 10.5,15 L9.5,15 C9.22385763,15 9,14.7761424 9,14.5 L9,10.5 L9,9.5 C9,9.22385763 9.22385763,9 9.5,9 L14.5,9 C14.7761424,9 15,9.22385763 15,9.5 L15,10.5 C15,10.7761424 14.7761424,11 14.5,11 L11,11 Z"
                              transform="translate(12.000000, 12.000000) rotate(-135.000000) translate(-12.000000, -12.000000)"
                              fill="#2d333f"
                            ></path>
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="main-page-time">
              <div className="main-page-time-inner">
                <div className="main-page-time-inner-2">
                  <div className="main-page-time-inner-3">
                    <span>
                      <svg viewBox="0 0 24 24" focusable="false">
                        <g fill="none" fillRule="evenodd">
                          <path
                            d="M13,11 L14.5,11 C14.7761424,11 15,11.2238576 15,11.5 L15,12.5 C15,12.7761424 14.7761424,13 14.5,13 L12.5,13 L11.5,13 C11.2238576,13 11,12.7761424 11,12.5 L11,7.5 C11,7.22385763 11.2238576,7 11.5,7 L12.5,7 C12.7761424,7 13,7.22385763 13,7.5 L13,11 Z M12,21 C7.02943725,21 3,16.9705627 3,12 C3,7.02943725 7.02943725,3 12,3 C16.9705627,3 21,7.02943725 21,12 C21,16.9705627 16.9705627,21 12,21 Z M12,19 C15.8659932,19 19,15.8659932 19,12 C19,8.13400675 15.8659932,5 12,5 C8.13400675,5 5,8.13400675 5,12 C5,15.8659932 8.13400675,19 12,19 Z"
                            fill="#2d333f"
                          />
                        </g>
                      </svg>
                    </span>
                    <div className="time-input-holder">
                      <select
                        className="search-bar-time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                      >
                        {suggestedTimes.map(({ time, formattedTime }) => (
                          <option key={formattedTime} value={time}>
                            {formattedTime}
                          </option>
                        ))}
                      </select>
                    </div>
                    <span className="svg-span">
                      <svg viewBox="0 0 24 24" focusable="false">
                        <g fill="none" fillRule="evenodd">
                          <path
                            d="M11,11 L11,14.5 C11,14.7761424 10.7761424,15 10.5,15 L9.5,15 C9.22385763,15 9,14.7761424 9,14.5 L9,10.5 L9,9.5 C9,9.22385763 9.22385763,9 9.5,9 L14.5,9 C14.7761424,9 15,9.22385763 15,9.5 L15,10.5 C15,10.7761424 14.7761424,11 14.5,11 L11,11 Z"
                            transform="translate(12.000000, 12.000000) rotate(-135.000000) translate(-12.000000, -12.000000)"
                            fill="#2d333f"
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-page-party">
            <div className="main-page-party-inner">
              <div className="main-page-party-inner-2">
                <div className="main-page-party-inner-3">
                  <span>
                    <svg viewBox="0 0 24 24" focusable="false">
                      <g fill="none" fillRule="evenodd">
                        <path
                          d="M14.5734892,12.2877361 C17.0042328,12.8819383 18.7345621,14.3964534 19.7644773,16.8312813 C19.9208947,17.2010684 20.0014914,17.5984917 20.0014914,18 C20.0014914,19.6568477 18.658351,20.9999882 17.0015032,20.9999882 L6.99926923,21 C6.59776067,21 6.2003371,20.9194033 5.83054967,20.7629859 C4.3045986,20.1175199 3.59082441,18.3572386 4.23628386,16.8312848 C5.26612228,14.3966359 6.99627139,12.8821638 9.42673118,12.2878687 C7.97272602,11.4134027 7,9.82029752 7,8 C7,5.23857625 9.23857625,3 12,3 C14.7614237,3 17,5.23857625 17,8 C17,9.82020554 16.0273723,11.4132417 14.5734892,12.2877361 Z M12,5 C10.3431458,5 9,6.34314575 9,8 C9,9.65685425 10.3431458,11 12,11 C13.6568542,11 15,9.65685425 15,8 C15,6.34314575 13.6568542,5 12,5 Z M17.9429826,17.6856919 C17.1294316,15.228564 15.1485327,14 12.000286,14 C8.85208947,14 6.87106303,15.2285248 6.05720667,17.6855743 L6.05721876,17.6855783 C5.88356446,18.2098444 6.16779141,18.7756206 6.69205743,18.9492749 C6.79348438,18.9828708 6.89964014,18.9999945 7.00648636,18.9999945 L16.99371,18.9999469 C17.5459684,18.9999469 17.9936623,18.552253 17.9936623,17.9999945 C17.9936623,17.8931928 17.9765523,17.7870807 17.9429826,17.6856919 Z"
                          fill="#2d333f"
                        />
                      </g>
                    </svg>
                  </span>
                  <select
                    className="search-bar-party-size"
                    value={partySize}
                    onChange={(e) => setPartySize(parseInt(e.target.value))}
                  >
                    {[...Array(20)].map((_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1} {i === 0 ? "person" : "people"}
                      </option>
                    ))}
                  </select>
                  <span className="svg-span">
                    <svg viewBox="0 0 24 24" focusable="false">
                      <g fill="none" fillRule="evenodd">
                        <path
                          d="M11,11 L11,14.5 C11,14.7761424 10.7761424,15 10.5,15 L9.5,15 C9.22385763,15 9,14.7761424 9,14.5 L9,10.5 L9,9.5 C9,9.22385763 9.22385763,9 9.5,9 L14.5,9 C14.7761424,9 15,9.22385763 15,9.5 L15,10.5 C15,10.7761424 14.7761424,11 14.5,11 L11,11 Z"
                          transform="translate(12.000000, 12.000000) rotate(-135.000000) translate(-12.000000, -12.000000)"
                          fill="#2d333f"
                        ></path>
                      </g>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="filter-bar-button">
          <div className="filter-bar">
            <div className="filter-bar-inner">
              <span>
                <svg viewBox="0 0 24 24" focusable="false">
                  <g fill="none" fillRule="evenodd">
                    <path
                      d="M13,15.9291111 L13,21.5 C13,21.7761424 12.7761424,22 12.5,22 L11.5,22 C11.2238576,22 11,21.7761424 11,21.5 L11,15.9291111 C7.60770586,15.4438815 5,12.5264719 5,9 C5,5.13400675 8.13400675,2 12,2 C15.8659932,2 19,5.13400675 19,9 C19,12.5264719 16.3922941,15.4438815 13,15.9291111 Z M12,4 C9.23857625,4 7,6.23857625 7,9 C7,11.7614237 9.23857625,14 12,14 C14.7614237,14 17,11.7614237 17,9 C17,6.23857625 14.7614237,4 12,4 Z"
                      fill="#2d333f"
                      fillRule="nonzero"
                      transform="translate(12.000000, 12.000000) rotate(-45.000000) translate(-12.000000, -12.000000)"
                    ></path>
                  </g>
                </svg>
              </span>
              <input
                type="search"
                placeholder="Location, Restaurant, or Cuisine"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              {searchInput && (
                <div className="filter-bar-results-container">
                  <div className="filter-bar-search-input">
                    <div className="filter-bar-search-input-text">
                      Search : "
                      <strong style={{ fontWeight: "600" }}>
                        {searchInput}
                      </strong>
                      "
                    </div>
                  </div>
                  {neighborhoods.length > 0 && (
                    <>
                      <h4 className="filter-bar-locations-title">
                        <span>
                          <svg viewBox="0 0 24 24" focusable="false">
                            <g fill="none" fillRule="evenodd">
                              <path
                                d="M12,2 C16.418278,2 20,5.581722 20,10 C20,12.8133333 17.5666667,16.59 12.7,21.33 C12.3111565,21.7111429 11.6888435,21.7111429 11.3,21.33 C6.43333333,16.59 4,12.8133333 4,10 C4,5.581722 7.581722,2 12,2 Z M12,4 C8.6862915,4 6,6.6862915 6,10 C6,11.21 6.8,14 12,19.21 C17.2,14 18,11.21 18,10 C18,6.6862915 15.3137085,4 12,4 Z M12,7 C13.6568542,7 15,8.34314575 15,10 C15,11.6568542 13.6568542,13 12,13 C10.3431458,13 9,11.6568542 9,10 C9,8.34314575 10.3431458,7 12,7 Z M12,9 C11.4477153,9 11,9.44771525 11,10 C11,10.5522847 11.4477153,11 12,11 C12.5522847,11 13,10.5522847 13,10 C13,9.44771525 12.5522847,9 12,9 Z"
                                fill="#6f737b"
                              ></path>
                            </g>
                          </svg>
                        </span>
                        Locations
                      </h4>
                      <div style={{ boxSizing: "border-box" }}>
                        {neighborhoods.map((neighborhood) => (
                          <div
                            key={neighborhood}
                            className="filter-bar-neighborhood-results"
                            onClick={(event) =>
                              routeToNeighborhoods(event, neighborhood)
                            }
                          >
                            <div>{neighborhood}</div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  {cuisines.length > 0 && (
                    <>
                      <h4 className="filter-bar-cuisine-title">
                        <span>
                          <svg viewBox="0 0 24 24" focusable="false">
                            <g fill="none" fillRule="evenodd">
                              <path
                                d="M11,2 C12.1045695,2 13,2.8954305 13,4 L13,11 C13,12.1045695 12.1045695,13 11,13 L10,13 L10,21 C10,21.5522847 9.55228475,22 9,22 L8,22 C7.44771525,22 7,21.5522847 7,21 L7,13 L6,13 C4.8954305,13 4,12.1045695 4,11 L4,4 C4,2.8954305 4.8954305,2 6,2 L11,2 Z M11,11 L11,4 L10,4 L10,8.5 C10,8.77614237 9.77614237,9 9.5,9 C9.22385763,9 9,8.77614237 9,8.5 L9,4 L8,4 L8,8.5 C8,8.77614237 7.77614237,9 7.5,9 C7.22385763,9 7,8.77614237 7,8.5 L7,4 L6,4 L6,11 L11,11 Z M19.45,2 C19.7537566,2 20,2.24624339 20,2.55 L20,21 C20,21.5522847 19.5522847,22 19,22 L18,22 C17.4477153,22 17,21.5522847 17,21 L17,17 L16,17 C14.8954305,17 14,16.1045695 14,15 L14,7.45 C14,4.44004811 16.4400481,2 19.45,2 Z M16,15 L18,15 L18,4.32 C16.7823465,4.88673047 16.0026709,6.10692278 16,7.45 L16,15 Z"
                                fill="#6f737b"
                              ></path>
                            </g>
                          </svg>
                        </span>
                        Cuisines
                      </h4>
                      <div style={{ boxSizing: "border-box" }}>
                        {cuisines.map((cuisine) => (
                          <div
                            key={cuisine}
                            className="filter-bar-cuisine-results"
                            onClick={(event) => routeToCuisines(event, cuisine)}
                          >
                            <div>{cuisine}</div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  {filteredRestaurants.length > 0 && (
                    <>
                      <h4 className="filter-bar-restaurant-title">
                        <span>
                          <svg viewBox="0 0 24 24" focusable="false">
                            <g fill="none" fillRule="evenodd">
                              <path
                                d="M18.0000588,11.0000589 C17.19236,11.0000589 16.5093616,10.8826668 16.0000588,10.628298 C15.490756,10.8826668 14.8077576,11.0000589 14.0000588,11.0000589 C13.19236,11.0000589 12.5093616,10.8826668 12.0000588,10.628298 C11.490756,10.8826668 10.8077576,11.0000589 10.0000588,11.0000589 C9.19236008,11.0000589 8.50936163,10.8826668 8.00005885,10.628298 C7.49075607,10.8826668 6.80775762,11.0000589 6.00005885,11.0000589 L6.00005885,19.0000589 L9.00005885,19.0000589 L9.00005885,14.0000589 C9.00005885,13.4477742 9.4477741,13.0000589 10.0000588,13.0000589 L14.0000588,13.0000589 C14.2762012,13.0000589 14.5262012,13.1119877 14.7071656,13.2929521 C14.88813,13.4739165 15.0000588,13.7239165 15.0000588,14.0000589 L15.0000588,19.0000589 L18.0000588,19.0000589 L18.0000588,11.0000589 Z M20.0000588,10.3914955 L20.0000588,19.0000589 C20.5523435,19.0000589 21.0000588,19.4477742 21.0000588,20.0000589 C21.0000588,20.5523436 20.5523435,21.0000589 20.0000588,21.0000589 L4.00005885,21.0000589 C3.4477741,21.0000589 3.00005885,20.5523436 3.00005885,20.0000589 C3.00005885,19.4477742 3.4477741,19.0000589 4.00005885,19.0000589 L4.00005885,10.3914955 C3.35613923,9.88193386 3.00256538,9.06829843 3.00007213,8.01132401 C2.99752223,7.79860227 3.06254976,7.5834043 3.20005885,7.40005885 C3.20203465,7.39733116 3.20407054,7.39464918 3.20611961,7.39197784 L6.1930761,3.40936919 C6.37504315,3.16119191 6.66873368,3.00005885 7.00005885,3.00005885 C7.00393758,2.99999732 7.00781697,3.00001683 7.01169677,3.00005885 L16.9884209,3.00005885 C16.9923007,3.00001683 16.9961801,2.99999732 17.0000588,3.00000029 C17.331384,3.00005885 17.6250745,3.16119191 17.8070416,3.40936919 L20.793998,7.39197784 C20.7960471,7.39464918 20.798083,7.39733116 20.8001056,7.40002368 C20.9375679,7.5834043 21.0025954,7.79860227 21.0000455,8.01132401 C20.9975523,9.06829843 20.6439784,9.88193386 20.0000588,10.3914955 Z M18.9843865,8.31249581 L16.5000588,5.00005885 L7.50005885,5.00005885 L5.01573113,8.31249581 C5.07765899,8.84141613 5.33522328,9.00005885 6.00005885,9.00005885 C6.48257118,9.00005885 6.82391647,8.94971548 7.00770123,8.87581773 C7.06887633,8.38216145 7.48984517,8.00005885 8.00005885,8.00005885 C8.51027253,8.00005885 8.93124137,8.38216145 8.99241647,8.87581773 C9.17620123,8.94971548 9.51754652,9.00005885 10.0000588,9.00005885 C10.4825711,9.00005885 10.8239164,8.94971548 11.0077012,8.87581773 C11.0688925,8.38214668 11.489855,8.00005885 12.0000588,8.00005885 C12.5102725,8.00005885 12.9312413,8.38216145 12.9924164,8.87581773 C13.1762012,8.94971548 13.5175465,9.00005885 14.0000588,9.00005885 C14.4825711,9.00005885 14.8239164,8.94971548 15.0077012,8.87581773 C15.0688763,8.38216145 15.4898451,8.00005885 16.0000588,8.00005885 C16.5102725,8.00005885 16.9312413,8.38216145 16.9924164,8.87581773 C17.1762012,8.94971548 17.5175465,9.00005885 18.0000588,9.00005885 C18.6648944,9.00005885 18.9224587,8.84141613 18.9843865,8.31249581 Z M11.0000588,19.0000589 L13.0000588,19.0000589 L13.0000588,15.0000589 L11.0000588,15.0000589 L11.0000588,19.0000589 Z"
                                fill="#6f737b"
                              ></path>
                            </g>
                          </svg>
                        </span>
                        Restaurants
                      </h4>
                      <div style={{ boxSizing: "border-box" }}>
                        {filteredRestaurants.map((restaurant) => (
                          <div
                            key={restaurant.id}
                            className="filter-bar-restaurant-results"
                            onClick={() => {
                              routeToRestaurantPage(restaurant.id);
                            }}
                          >
                            <div>{restaurant.name}</div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="filter-button">
            <button onClick={letsGo}>Let's go</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
