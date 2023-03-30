import { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getReservation, fetchReservation } from "../../../store/reservations";
import { getRestaurant, fetchRestaurant } from "../../../store/restaurants";
import { fetchReviews } from "../../../store/reviews";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faMessage, faUser } from "@fortawesome/free-regular-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import menuIcon from "../../../icons/menuIcon.png";
import "./ReservationConfirmation.css";

const ReservationConfirmation = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { reservationId } = useParams();
  const reservation = useSelector(getReservation(reservationId));
  const { restaurantId } = reservation || {};
  const restaurant = useSelector(getRestaurant(restaurantId));
  const reviewsFromState = useSelector((state) => state.reviews);
  const numReviews = Object.values(reviewsFromState).filter(
    (review) => review.userId === sessionUser.id
  ).length;

  useEffect(() => {
    dispatch(fetchReviews());
    dispatch(fetchReservation(reservationId));
    if (restaurantId) {
      dispatch(fetchRestaurant(restaurantId));
    }
  }, [dispatch, reservationId, restaurantId]);

  const formatDate = useCallback((dateString) => {
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  }, []);

  const formatTime = useCallback((timeString) => {
    const date = new Date(timeString);
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "UTC",
    };
    return date.toLocaleTimeString("en-US", options);
  }, []);

  const joinedDate = useCallback((dateString) => {
    const formattedDate = new Date(dateString).toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
    return formattedDate;
  }, []);

  return (
    reservation && (
      <main className="res-confirmation-main">
        <div className="res-confirmation-container">
          <div className="res-confirmation-inner">
            <div className="res-confirmation-holders">
              <section className="res-confirmation-details">
                <section className="res-confirmation-details-inner">
                  <div className="confirmation-details-div">
                    <div className="res-confirmation-restaurant-pic">
                      <img src={restaurant?.photoUrl} alt="" />
                    </div>
                    <div className="res-confirmation-deets">
                      <div className="res-confirmed-and-name">
                        <div className="res-name-and-confirmed">
                          <h2>{restaurant?.name}</h2>
                          <div className="reservation-confirmed">
                            <span>
                              <FontAwesomeIcon
                                icon={faCircleCheck}
                                style={{
                                  color: "#58a064",
                                  width: "18px",
                                  height: "18px",
                                  lineHeight: "24px",
                                }}
                              />
                            </span>
                            <h1>Reservation confirmed</h1>
                          </div>
                        </div>
                      </div>
                      <div className="res-confirmation-date-time-party">
                        <div className="party-date-time">
                          <section className="party-section">
                            <span>
                              <FontAwesomeIcon
                                icon={faUser}
                                style={{
                                  color: "#2d333f",
                                  width: "18px",
                                  height: "18px",
                                  lineHeight: "24px",
                                }}
                                className="fa-user"
                              />
                            </span>
                            {reservation.partySize}
                          </section>
                          <section className="date-time-section">
                            <span>
                              <FontAwesomeIcon
                                icon={faCalendar}
                                style={{
                                  color: "#2d333f",
                                  width: "18px",
                                  height: "18px",
                                  lineHeight: "24px",
                                }}
                                className="fa-calendar"
                              />
                            </span>
                            {formatDate(reservation.date)} at{" "}
                            {formatTime(reservation.time)}
                          </section>
                        </div>
                        <div className="cancel-modify-add">
                          <button className="modify-reservation">Modify</button>
                          <button className="cancel-reservation">Cancel</button>
                          <button className="add-to-calendar">
                            Add to calendar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="menu-directions">
                    <div className="browse-menu">
                      <div className="browse-menu-icon">
                        <span>
                          <svg
                            viewBox="0 0 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            focusable="false"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3 5.00109C3 3.71755 4.1919 2.76626 5.44349 3.05088L11 4.31445V20.9916L4.5565 19.5262C3.64604 19.3192 3 18.5097 3 17.576V5.00109ZM13 21L19.4277 19.5928C20.3457 19.3918 21 18.5788 21 17.6391V5.05679C21 3.77988 19.8197 2.82999 18.5723 3.10306L13 4.32294V21Z"
                              fill="#fff"
                            ></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div className="get-directions">
                      <div className="get-directions-icon">
                        <span>
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            focusable="false"
                          >
                            <path
                              d="M20.9387 4.57022L15.0619 22.1841C14.8534 22.809 14.1773 23.1468 13.5518 22.9385C13.2356 22.8332 12.9779 22.6007 12.8409 22.2972L9.53042 14.9614C9.41001 14.6946 9.19562 14.4814 8.92805 14.3622L1.70817 11.1476C1.10592 10.8795 0.835288 10.1743 1.10369 9.57264C1.24007 9.26691 1.49877 9.03249 1.81662 8.92665L19.4286 3.06153C20.0541 2.85322 20.7302 3.19096 20.9387 3.81588C21.0204 4.0607 21.0204 4.3254 20.9387 4.57022Z"
                              fill="#fff"
                            ></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </section>
              </section>
              <div className="curr-user-info">
                <aside>
                  <div className="profile-header">
                    <div className="curr-user-name">
                      <span>
                        <svg
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          focusable="false"
                        >
                          <g fill="none" fillRule="evenodd">
                            <path
                              d="M14.5734892,12.2877361 C17.0042328,12.8819383 18.7345621,14.3964534 19.7644773,16.8312813 C19.9208947,17.2010684 20.0014914,17.5984917 20.0014914,18 C20.0014914,19.6568477 18.658351,20.9999882 17.0015032,20.9999882 L6.99926923,21 C6.59776067,21 6.2003371,20.9194033 5.83054967,20.7629859 C4.3045986,20.1175199 3.59082441,18.3572386 4.23628386,16.8312848 C5.26612228,14.3966359 6.99627139,12.8821638 9.42673118,12.2878687 C7.97272602,11.4134027 7,9.82029752 7,8 C7,5.23857625 9.23857625,3 12,3 C14.7614237,3 17,5.23857625 17,8 C17,9.82020554 16.0273723,11.4132417 14.5734892,12.2877361 Z M12,5 C10.3431458,5 9,6.34314575 9,8 C9,9.65685425 10.3431458,11 12,11 C13.6568542,11 15,9.65685425 15,8 C15,6.34314575 13.6568542,5 12,5 Z M17.9429826,17.6856919 C17.1294316,15.228564 15.1485327,14 12.000286,14 C8.85208947,14 6.87106303,15.2285248 6.05720667,17.6855743 L6.05721876,17.6855783 C5.88356446,18.2098444 6.16779141,18.7756206 6.69205743,18.9492749 C6.79348438,18.9828708 6.89964014,18.9999945 7.00648636,18.9999945 L16.99371,18.9999469 C17.5459684,18.9999469 17.9936623,18.552253 17.9936623,17.9999945 C17.9936623,17.8931928 17.9765523,17.7870807 17.9429826,17.6856919 Z"
                              fill="#2d333f"
                            ></path>
                          </g>
                        </svg>
                      </span>
                      {sessionUser.firstName} {sessionUser.lastName}
                    </div>
                    <div className="curr-user-joined">
                      Joined in {joinedDate(sessionUser.createdAt.slice(0, 10))}
                    </div>
                    <div className="curr-user-location">
                      <span>
                        <svg
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          focusable="false"
                        >
                          <g fill="none" fillRule="evenodd">
                            <path
                              d="M12,2 C16.418278,2 20,5.581722 20,10 C20,12.8133333 17.5666667,16.59 12.7,21.33 C12.3111565,21.7111429 11.6888435,21.7111429 11.3,21.33 C6.43333333,16.59 4,12.8133333 4,10 C4,5.581722 7.581722,2 12,2 Z M12,4 C8.6862915,4 6,6.6862915 6,10 C6,11.21 6.8,14 12,19.21 C17.2,14 18,11.21 18,10 C18,6.6862915 15.3137085,4 12,4 Z M12,7 C13.6568542,7 15,8.34314575 15,10 C15,11.6568542 13.6568542,13 12,13 C10.3431458,13 9,11.6568542 9,10 C9,8.34314575 10.3431458,7 12,7 Z M12,9 C11.4477153,9 11,9.44771525 11,10 C11,10.5522847 11.4477153,11 12,11 C12.5522847,11 13,10.5522847 13,10 C13,9.44771525 12.5522847,9 12,9 Z"
                              fill="#2d333f"
                            ></path>
                          </g>
                        </svg>
                      </span>
                      New York Area
                    </div>
                    {numReviews > 0 && (
                      <div className="curr-user-reviews">
                        <span>
                          <svg
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            focusable="false"
                          >
                            <g fill="none" fillRule="evenodd">
                              <path
                                d="M19,4 L5,4 C3.8954305,4 3,4.8954305 3,6 L3,15 C3,16.1045695 3.8954305,17 5,17 L11,17 L15.36,20.63 C15.6583354,20.8784924 16.0735425,20.9318337 16.4250008,20.7668198 C16.776459,20.6018059 17.0006314,20.2482681 17,19.86 L17,17 L19,17 C20.1045695,17 21,16.1045695 21,15 L21,6 C21,4.8954305 20.1045695,4 19,4 Z M19,15 L15,15 L15,17.73 L11.72,15 L5,15 L5,6 L19,6 L19,15 Z"
                                fill="#2d333f"
                                fillRule="nonzero"
                              ></path>
                            </g>
                          </svg>
                        </span>
                        {numReviews > 1
                          ? `${numReviews} reviews`
                          : `${numReviews} review`}
                      </div>
                    )}
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  );
};

export default ReservationConfirmation;
