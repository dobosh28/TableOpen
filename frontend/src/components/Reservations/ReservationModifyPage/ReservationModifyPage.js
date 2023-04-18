import { useState, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurant, fetchRestaurant } from "../../../store/restaurants";
import {
  updateReservation,
  getReservation,
  fetchReservation,
} from "../../../store/reservations";
import "./ReservationModifyPage.css";

const ReservationModifyPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { reservationId } = useParams();
  const reservation = useSelector(getReservation(reservationId)) || {};
  const { restaurantId } = reservation;
  const restaurant = useSelector(getRestaurant(restaurantId));
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [partySize, setPartySize] = useState(reservation.partySize);
  const [displayTime, setDisplayTime] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const time = date.toLocaleTimeString("en-US", {
      timeZone: "UTC",
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
    });
    return time;
  };

  useEffect(() => {
    dispatch(fetchReservation(reservationId)).then((reservation) => {
      setDate(reservation.date);
      setTime(formatTime(reservation.time));
      setPartySize(reservation.partySize);
    });
  }, [dispatch, reservationId]);

  useEffect(() => {
    if (restaurantId) {
      dispatch(fetchRestaurant(restaurantId));
    }
  }, [dispatch, restaurantId]);

  const update = (field) => {
    return (e) => {
      switch (field) {
        case "partySize":
          setPartySize(e.target.value);
          break;
        case "date":
          setDate(e.target.value);
          break;
        case "time":
          setTime(e.target.value);
          break;
        default:
          break;
      }
    };
  };

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

  const convertTime = (timeString) => {
    const hour = parseInt(timeString.slice(0, 2));
    const minute = timeString.slice(3, 5);
    const meridian = hour >= 12 ? "PM" : "AM";
    const newHour = hour % 12 || 12;

    return `${newHour}:${minute} ${meridian}`;
  };

  const routeToRestaurant = () => {
    history.push(`/restaurants/${restaurantId}`);
  };

  const changeTime = (timeString) => {
    const hour = parseInt(timeString.slice(0, 2));
    const minute = timeString.slice(3, 5);
    const meridian = hour >= 12 ? "PM" : "AM";
    const newHour = hour % 12 || 12;

    return `${newHour}:${minute} ${meridian}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formSubmitted) {
      setDisplayTime(true);
      setFormSubmitted(true);
      return;
    }

    const reservation = {
      id: reservationId,
      date,
      time,
      party_size: partySize,
    };

    dispatch(updateReservation(reservation)).then(() => {
      history.push(`/reservations/${reservationId}/confirmation`);
    });
  };

  return (
    <main>
      <div
        style={{
          background: "#fff",
          height: "100%",
          maxWidth: "100%",
          padding: "32px 0 5rem",
        }}
      >
        <div
          style={{
            margin: "0 auto",
            maxWidth: "61rem",
          }}
        >
          <main style={{ maxWidth: "38.75rem" }}>
            <h2
              style={{
                margin: "0 0 16px",
                fontSize: "15px",
                lineHeight: "1.5rem",
                fontWeight: "600",
                color: "#2d333f",
              }}
            >
              Your current reservation
            </h2>
            <div className="photo-time-date-size" style={{ color: "#2d333f" }}>
              <div className="restaurant-photo-div">
                <img
                  src={restaurant?.photoUrl}
                  className="restaurant-photo"
                  alt=""
                />
              </div>
              <div className="name-date-time-size">
                <div
                  onClick={routeToRestaurant}
                  className="route-to-restaurant"
                >
                  <h2 className="restaurant-name-res">{restaurant?.name}</h2>
                </div>
                <div className="date-time-size">
                  <ul className="dts-list">
                    <li className="date-list-item">
                      <div className="date-icon-text">
                        <span>
                          <svg
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            focusable="false"
                          >
                            <g fill="#2d333f" fillRule="evenodd">
                              <path d="M17,5 L19,5 C20.1045695,5 21,5.8954305 21,7 L21,19 C21,20.1045695 20.1045695,21 19,21 L5,21 C3.8954305,21 3,20.1045695 3,19 L3,7 C3,5.8954305 3.8954305,5 5,5 L7,5 L7,4 C7,3.44771525 7.44771525,3 8,3 C8.55228475,3 9,3.44771525 9,4 L9,5 L15,5 L15,4 C15,3.44771525 15.4477153,3 16,3 C16.5522847,3 17,3.44771525 17,4 L17,5 Z M19,9 L19,7 L5,7 L5,9 L19,9 Z M19,11 L5,11 L5,19 L19,19 L19,11 Z" />
                            </g>
                          </svg>
                        </span>
                        <p>{formatDate(reservation.date)}</p>
                      </div>
                    </li>
                    <li className="time-list-item">
                      <div className="time-icon-text">
                        <span>
                          <svg
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            focusable="false"
                          >
                            <g fill="#2d333f" fillRule="evenodd">
                              <path d="M13,11 L14.5,11 C14.7761424,11 15,11.2238576 15,11.5 L15,12.5 C15,12.7761424 14.7761424,13 14.5,13 L12.5,13 L11.5,13 C11.2238576,13 11,12.7761424 11,12.5 L11,7.5 C11,7.22385763 11.2238576,7 11.5,7 L12.5,7 C12.7761424,7 13,7.22385763 13,7.5 L13,11 Z M12,21 C7.02943725,21 3,16.9705627 3,12 C3,7.02943725 7.02943725,3 12,3 C16.9705627,3 21,7.02943725 21,12 C21,16.9705627 16.9705627,21 12,21 Z M12,19 C15.8659932,19 19,15.8659932 19,12 C19,8.13400675 15.8659932,5 12,5 C8.13400675,5 5,8.13400675 5,12 C5,15.8659932 8.13400675,19 12,19 Z" />
                            </g>
                          </svg>
                        </span>
                        <p>{convertTime(formatTime(reservation.time))}</p>
                      </div>
                    </li>
                    <li className="size-list-item">
                      <div className="size-icon-text">
                        <span>
                          <svg
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            focusable="false"
                          >
                            <g fill="2d333f" fillRule="evenodd">
                              <path d="M14.5734892,12.2877361 C17.0042328,12.8819383 18.7345621,14.3964534 19.7644773,16.8312813 C19.9208947,17.2010684 20.0014914,17.5984917 20.0014914,18 C20.0014914,19.6568477 18.658351,20.9999882 17.0015032,20.9999882 L6.99926923,21 C6.59776067,21 6.2003371,20.9194033 5.83054967,20.7629859 C4.3045986,20.1175199 3.59082441,18.3572386 4.23628386,16.8312848 C5.26612228,14.3966359 6.99627139,12.8821638 9.42673118,12.2878687 C7.97272602,11.4134027 7,9.82029752 7,8 C7,5.23857625 9.23857625,3 12,3 C14.7614237,3 17,5.23857625 17,8 C17,9.82020554 16.0273723,11.4132417 14.5734892,12.2877361 Z M12,5 C10.3431458,5 9,6.34314575 9,8 C9,9.65685425 10.3431458,11 12,11 C13.6568542,11 15,9.65685425 15,8 C15,6.34314575 13.6568542,5 12,5 Z M17.9429826,17.6856919 C17.1294316,15.228564 15.1485327,14 12.000286,14 C8.85208947,14 6.87106303,15.2285248 6.05720667,17.6855743 L6.05721876,17.6855783 C5.88356446,18.2098444 6.16779141,18.7756206 6.69205743,18.9492749 C6.79348438,18.9828708 6.89964014,18.9999945 7.00648636,18.9999945 L16.99371,18.9999469 C17.5459684,18.9999469 17.9936623,18.552253 17.9936623,17.9999945 C17.9936623,17.8931928 17.9765523,17.7870807 17.9429826,17.6856919 Z" />
                            </g>
                          </svg>
                        </span>
                        <p>{reservation.partySize} people (Standard seating)</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <hr className="reservation-modify-hr" />
            <form>
              <h3
                style={{
                  margin: "16px 0 8px",
                  fontSize: "15px",
                  lineHeight: "1.5rem",
                  fontWeight: "400",
                  color: "#2d333f",
                }}
              >
                Modify your reservation
              </h3>
              <div className="modify-reservation-inputs-and-button">
                <div className="modify-reservation-inputs">
                  <div className="modify-reservation-inputs-date-time">
                    <div className="modify-reservation-inputs-date">
                      <div style={{ height: "3rem", position: "relative" }}>
                        <div className="inner-inner-date-div">
                          <div className="inner-inner-inner-date-div">
                            <input
                              type="date"
                              min={new Date().toISOString().split("T")[0]}
                              value={date}
                              onChange={update("date")}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modify-reservation-inputs-date">
                      <div style={{ height: "3rem", position: "relative" }}>
                        <div className="inner-inner-date-div">
                          <div className="inner-inner-inner-date-div">
                            {!displayTime ? (
                              <input
                                type="time"
                                value={time}
                                onChange={update("time")}
                              />
                            ) : (
                              <input
                                type="time"
                                value={time}
                                onChange={update("time")}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modify-reservation-inputs-party-size">
                    <div style={{ height: "3rem", position: "relative" }}>
                      <div className="inner-inner-date-div">
                        <div className="inner-inner-inner-date-div">
                          <select
                            defaultValue={partySize}
                            onChange={update("partySize")}
                          >
                            {[...Array(20)].map((_, i) => (
                              <option key={i} value={i + 1}>
                                {i + 1} {i === 0 ? "person" : "people"}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modify-reservation-button">
                  <div className="modify-reservation-button-inner">
                    {!formSubmitted && (
                      <input
                        className="submit-modify-reservation"
                        type="submit"
                        value="Find a new table"
                        onClick={handleSubmit}
                      />
                    )}
                    {formSubmitted && (
                      <input
                        className="submit-modify-reservation"
                        type="submit"
                        value={changeTime(time)}
                        onClick={handleSubmit}
                      />
                    )}
                  </div>
                </div>
              </div>
            </form>
          </main>
        </div>
      </div>
    </main>
  );
};

export default ReservationModifyPage;
