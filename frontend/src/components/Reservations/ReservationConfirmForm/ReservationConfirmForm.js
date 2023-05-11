import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createReservation } from "../../../store/reservations";
import { useLocation, useHistory } from "react-router-dom";
import { logout } from "../../../store/session";
import { receiveReservation } from "../../../store/reservations";
import "./ReservationConfirmForm.css";

const ReservationConfirmForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { restaurant, current_user } = location.state;
  const [error, setError] = useState({});

  const [reservationData, setReservationData] = useState({
    party_size: 2,
    date: "",
    time: "",
    user_id: "",
    restaurant_id: restaurant.id,
    email: current_user.email,
    phone_number: "",
    special_request: "",
    occasion: "",
  });

  useEffect(() => {
    if (!location.state) {
      history.push("/");
      window.location.reload();
    } else {
      const { party_size, date, time } = location.state;
      setReservationData((prevState) => ({
        ...prevState,
        party_size: party_size,
        date: date,
        time: time,
        user_id: current_user.id,
      }));
    }
    window.scrollTo(0, 0);
  }, [current_user, history, location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newError = {};
    if (reservationData.phone_number.length === 0) {
      newError.phone_number = "Phone number is required.";
    } else if (
      reservationData.phone_number.length < 10 ||
      reservationData.phone_number.length > 10 ||
      !/^\d+$/.test(reservationData.phone_number)
    ) {
      newError.phone_number = "Your phone number format is invalid.";
    }

    if (Object.keys(newError).length > 0) {
      setError(newError);
      return;
    }

    const reservation = {
      ...reservationData,
    };
    const newReservation = await dispatch(createReservation(reservation));
    dispatch(receiveReservation(newReservation));
    history.push(`/reservations/${newReservation.id}/confirmation`);
  };

  const update = (field) => {
    return (e) => {
      setReservationData((prevState) => ({
        ...prevState,
        [field]: e.target.value,
      }));

      setError((prevState) => {
        const newError = { ...prevState };

        if (e.target.value.length === 0) {
          newError[field] = `${
            field.charAt(0).toUpperCase() + field.slice(1).replace("_", " ")
          } is required.`;
        } else if (
          e.target.value.length < 10 ||
          e.target.value.length > 10 ||
          !/^\d+$/.test(e.target.value)
        ) {
          newError[field] = `Your ${field.replace(
            "_",
            " "
          )} format is invalid.`;
        } else {
          delete newError[field];
        }

        return newError;
      });
    };
  };

  const convertTime = (timeString) => {
    if (timeString === "") {
      return "";
    }

    const hour = parseInt(timeString.slice(0, 2));
    const minute = timeString.slice(3, 5);
    const meridian = hour >= 12 ? "PM" : "AM";
    const newHour = hour % 12 || 12;

    return `${newHour}:${minute} ${meridian}`;
  };

  const routeToRestaurant = () => {
    history.push(`/restaurants/${restaurant.id}`);
  };

  const handleLogout = () => {
    dispatch(logout());
    history.push(`/restaurants/${restaurant.id}`);
  };

  const formatDate = (dateString) => {
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <main className="main">
      <div className="contents">
        <div className="inner-contents">
          <div className="inner-inner-contents">
            <section className="form-section">
              <h1 className="almost-done">You're almost done!</h1>
              <div className="photo-time-date-size">
                <div className="restaurant-photo-div">
                  <img
                    src={restaurant.photoUrl}
                    className="restaurant-photo"
                    alt=""
                  />
                </div>
                <div className="name-date-time-size">
                  <div
                    onClick={routeToRestaurant}
                    className="route-to-restaurant"
                  >
                    <h2 className="restaurant-name-res">{restaurant.name}</h2>
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
                          <p>{formatDate(reservationData.date)}</p>
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
                          <p>{convertTime(reservationData.time)}</p>
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
                          <p>{reservationData.party_size} people</p>
                        </div>
                      </li>
                      <li className="seating-list-item">
                        <div className="seating-icon-text">
                          <span>
                            <svg
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              focusable="false"
                            >
                              <g fill="#2d333f" fillRule="evenodd">
                                <path d="M17,9 L7,9 L7,11 L17,11 L17,9 Z M19,9 L19,18 C19,18.5522847 18.5522847,19 18,19 C17.4477153,19 17,18.5522847 17,18 L17,13 L7,13 L7,18 C7,18.5522847 6.55228475,19 6,19 C5.44771525,19 5,18.5522847 5,18 L5,9 L3,9 C2.44771525,9 2,8.55228475 2,8 L2,6 C2,5.44771525 2.44771525,5 3,5 L21,5 C21.5522847,5 22,5.44771525 22,6 L22,8 C22,8.55228475 21.5522847,9 21,9 L19,9 Z" />
                              </g>
                            </svg>
                          </span>
                          <p>Indoor • Standard</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <h2 className="diner-details">Diner details</h2>
              <div className="current-diner">
                {current_user.firstName} {current_user.lastName} (
                <span
                  className="not-user"
                  onClick={handleLogout}
                  style={{ color: "#da3743" }}
                >
                  Not {current_user.firstName}?
                </span>
                )
              </div>
              <form
                className="reservation-confirm-form"
                onSubmit={handleSubmit}
                autoComplete="on"
              >
                <div className="form-inputs">
                  <div className="form-inputs__phone">
                    <div className="phone-div">
                      <input
                        className={
                          error.phone_number
                            ? "error-phone-input"
                            : "phone-input"
                        }
                        type="text"
                        placeholder="Phone number"
                        onChange={update("phone_number")}
                      />
                    </div>
                    {error.phone_number && (
                      <p
                        style={{
                          color: "#931b23",
                          display: "inline-block",
                          marginLeft: "8px",
                          marginTop: "4px",
                          fontSize: "13px",
                          fontWeight: "500",
                        }}
                      >
                        {error.phone_number}
                      </p>
                    )}
                  </div>
                  <div className="form-inputs__email">
                    <div className="email-div">
                      <input
                        className="email-input"
                        value={current_user.email}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                <div className="form-inputs">
                  <div className="form-inputs__occasion">
                    <div className="occasion-div">
                      <select
                        className="occasion-select"
                        onChange={update("occasion")}
                      >
                        <option value="default" className="default-option">
                          Select an occasion (optional)
                        </option>
                        <option value="Birthday">Birthday</option>
                        <option value="Anniversary">Anniversary</option>
                        <option value="Date">Date night</option>
                        <option value="Business">Business Meal</option>
                        <option value="Celebration">Celebration</option>
                      </select>
                      <span className="dropdown-arrow">
                        <svg
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          focusable="false"
                        >
                          <g fill="#2d333f" fillRule="evenodd">
                            <path
                              d="M11,11 L11,14.5 C11,14.7761424 10.7761424,15 10.5,15 L9.5,15 C9.22385763,15 9,14.7761424 9,14.5 L9,10.5 L9,9.5 C9,9.22385763 9.22385763,9 9.5,9 L14.5,9 C14.7761424,9 15,9.22385763 15,9.5 L15,10.5 C15,10.7761424 14.7761424,11 14.5,11 L11,11 Z"
                              transform="translate(12.000000, 12.000000) rotate(-135.000000) translate(-12.000000, -12.000000)"
                            ></path>
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div className="form-inputs__special-request">
                    <div className="special-request-div">
                      <textarea
                        placeholder="Add a special request (optional)"
                        onChange={update("special_request")}
                      />
                    </div>
                  </div>
                </div>
                <input
                  type="submit"
                  value="Complete reservation"
                  className="submit-reservation"
                />
              </form>
              <div className="confirmation-statement">
                By clicking “Complete reservation” you agree to the{" "}
                <span className="table-open-span">TableOpen Terms of Use</span>{" "}
                and <span className="table-open-span">Privacy Policy</span>.
                Standard text message rates may apply. You may opt out of
                receiving text messages at any time.
              </div>
            </section>
            <div className="dining-info">
              <aside className="booking-policies-section">
                <h1 className="what-to-know">What to know before you go</h1>
                <section className="what-to-know-info">
                  <h1 className="important-info">
                    Important dining information
                  </h1>
                  <p className="important-info-text">
                    We have a 20 minute grace period. Please call us if you are
                    running later than 20 minutes after your reservation time.
                    <br />
                    <br />
                    We may contact you about this reservation, so please ensure
                    your email and phone number are up to date.
                    <br />
                    <br />
                    Your table will be reserved for 1 hour 30 minutes for
                    parties of up to 2; and 2 hours for parties of 3+.
                  </p>
                </section>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ReservationConfirmForm;
