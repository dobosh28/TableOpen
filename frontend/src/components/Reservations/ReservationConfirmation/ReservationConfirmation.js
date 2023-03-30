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
    const options = { weekday: "short", month: "short", day: "numeric", timeZone: "UTC" };
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
                </section>
              </section>
              <div className="curr-user-info">
                <aside>
                  <div className="profile-header">
                    <div className="curr-user-name">
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
                      <h2>
                        {sessionUser.firstName} {sessionUser.lastName}
                      </h2>
                    </div>
                    <div className="curr-user-joined">
                      Joined in {joinedDate(sessionUser.createdAt.slice(0, 10))}
                    </div>
                    <div className="curr-user-location">
                      <span>
                        <FontAwesomeIcon
                          icon={faLocationDot}
                          style={{
                            color: "#2d333f",
                            width: "18px",
                            height: "18px",
                            lineHeight: "24px",
                          }}
                        />
                      </span>
                      New York Area
                    </div>
                    {numReviews > 0 && (
                      <div className="curr-user-reviews">
                        <span>
                          <FontAwesomeIcon
                            icon={faMessage}
                            style={{
                              color: "#2d333f",
                              width: "18px",
                              height: "18px",
                              lineHeight: "24px",
                              transform: "scaleX(-1)",
                            }}
                          />
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
