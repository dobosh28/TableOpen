import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getReservation, fetchReservation } from "../../../store/reservations";
import { getRestaurant, fetchRestaurant } from "../../../store/restaurants";
import { fetchReviews } from "../../../store/reviews";
import ReservationCancel from "../ReservationCancelModal/ReservationCancel";
import { Modal } from "../../../context/Modal";
import "./ReservationConfirmation.css";
import { useLocation } from "react-router-dom";

const ReservationConfirmation = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const sessionUser = useSelector((state) => state.session.user);

  const { reservationId } = useParams();
  const reservation = useSelector(getReservation(reservationId));

  const reservationIsPast = useMemo(() => {
    const now = Date.now();
    const reservationTime = Date.parse(
      reservation?.date + "T" + reservation?.time.slice(11, 19)
    );
    return reservationTime < now;
  }, [reservation]);

  const { restaurantId } = reservation || {};
  const restaurant = useSelector(getRestaurant(restaurantId));

  const reviewsFromState = useSelector((state) => state.reviews);
  const numReviews = Object.values(reviewsFromState).filter(
    (review) => review.userId === sessionUser.id
  ).length;

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (params.get("Modal") === "open") {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [params]);

  const openModal = () => {
    history.push(`/reservations/${reservationId}/confirmation/?Modal=open`);
  };

  const closeModal = () => {
    history.replace(`/reservations/${reservationId}/confirmation`);
  };

  useEffect(() => {
    dispatch(fetchReviews());
    if (reservationId) {
      dispatch(fetchReservation(reservationId));
    }
  }, [dispatch, reservationId]);

  useEffect(() => {
    if (restaurantId) {
      dispatch(fetchRestaurant(restaurantId));
    }
  }, [dispatch, restaurantId]);

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

  const routeToRestaurant = () => {
    history.push(`/restaurants/${restaurant.id}`);
  };

  const routeToModifyReservation = () => {
    history.push(`/reservations/${reservation.id}/modify`);
  };

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
                          <h2 onClick={routeToRestaurant}>
                            {restaurant?.name}
                          </h2>
                          {reservationIsPast ? (
                            <div className="reservation-confirmed">
                              <span>
                                <svg
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                  focusable="false"
                                >
                                  <g fill="none" fillRule="evenodd">
                                    <path
                                      d="M3.54142 5.74079C3.6587 5.3038 4.05479 5 4.50724 5H20.5535C21.0595 5 21.4858 5.37796 21.5463 5.88033L22.9928 17.8803C23.0271 18.1643 22.938 18.4494 22.7482 18.6634C22.5584 18.8775 22.2861 19 22 19H6.45517C5.96641 19 5.54926 18.6467 5.46881 18.1646L5.16463 16.3418H2.00001C1.68905 16.3418 1.39578 16.1972 1.20653 15.9504C1.01728 15.7037 0.953583 15.3829 1.03419 15.0826L3.54142 5.74079ZM6.99929 15.1853L7.30212 17H20.8722L19.6668 7H5.68826L6.49645 11.8351L6.49906 11.8516L6.99929 15.1853ZM4.27983 10.7051L4.52244 12.1566L4.85033 14.3418H3.30379L4.27983 10.7051Z"
                                      fill="#da3743"
                                    ></path>
                                    <path
                                      d="M8.5 12C8.5 11.4477 8.94772 11 9.5 11L17.2254 11C17.7777 11 18.2254 11.4477 18.2254 12C18.2254 12.5523 17.7777 13 17.2254 13L9.5 13C8.94772 13 8.5 12.5523 8.5 12Z"
                                      fill="#da3743"
                                    ></path>
                                  </g>
                                </svg>
                              </span>
                              <h1>Reservation completed</h1>
                            </div>
                          ) : (
                            <div className="reservation-confirmed">
                              <span>
                                <svg
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                  focusable="false"
                                >
                                  <g fill="none" fillRule="evenodd">
                                    <path
                                      d="M11.0355339,12.863961 L9.62132034,11.4497475 C9.23079605,11.0592232 8.59763107,11.0592232 8.20710678,11.4497475 C7.81658249,11.8402718 7.81658249,12.4734367 8.20710678,12.863961 L10.3284271,14.9852814 C10.5236893,15.1805435 10.7796116,15.2781746 11.0355339,15.2781746 C11.2914562,15.2781746 11.5473785,15.1805435 11.7426407,14.9852814 L15.9852814,10.7426407 C16.3758057,10.3521164 16.3758057,9.71895142 15.9852814,9.32842712 C15.5947571,8.93790283 14.9615921,8.93790283 14.5710678,9.32842712 L11.0355339,12.863961 Z M12,21 C7.02943725,21 3,16.9705627 3,12 C3,7.02943725 7.02943725,3 12,3 C16.9705627,3 21,7.02943725 21,12 C21,16.9705627 16.9705627,21 12,21 Z"
                                      fill="#39a25e"
                                    ></path>
                                  </g>
                                </svg>
                              </span>
                              <h1>Reservation confirmed</h1>
                            </div>
                          )}
                        </div>
                        {reservationIsPast && (
                          <div className="book-again-button">
                            <a href={`/restaurants/${restaurantId}`}>
                              Book again
                            </a>
                          </div>
                        )}
                      </div>
                      <div className="res-confirmation-date-time-party">
                        <div className="party-date-time">
                          <section className="party-section">
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
                            {reservation.partySize}
                          </section>
                          <section className="date-time-section">
                            <span>
                              <svg
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                focusable="false"
                              >
                                <g fill="none" fillRule="evenodd">
                                  <path
                                    d="M17,5 L19,5 C20.1045695,5 21,5.8954305 21,7 L21,19 C21,20.1045695 20.1045695,21 19,21 L5,21 C3.8954305,21 3,20.1045695 3,19 L3,7 C3,5.8954305 3.8954305,5 5,5 L7,5 L7,4 C7,3.44771525 7.44771525,3 8,3 C8.55228475,3 9,3.44771525 9,4 L9,5 L15,5 L15,4 C15,3.44771525 15.4477153,3 16,3 C16.5522847,3 17,3.44771525 17,4 L17,5 Z M19,9 L19,7 L5,7 L5,9 L19,9 Z M19,11 L5,11 L5,19 L19,19 L19,11 Z"
                                    fill="#2d333f"
                                  ></path>
                                </g>
                              </svg>
                            </span>
                            {formatDate(reservation.date)} at{" "}
                            {formatTime(reservation.time)}
                          </section>
                          <section className="seating-section">
                            <span>
                              <svg
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                focusable="false"
                              >
                                <g fill="none" fillRule="evenodd">
                                  <path
                                    d="M17,9 L7,9 L7,11 L17,11 L17,9 Z M19,9 L19,18 C19,18.5522847 18.5522847,19 18,19 C17.4477153,19 17,18.5522847 17,18 L17,13 L7,13 L7,18 C7,18.5522847 6.55228475,19 6,19 C5.44771525,19 5,18.5522847 5,18 L5,9 L3,9 C2.44771525,9 2,8.55228475 2,8 L2,6 C2,5.44771525 2.44771525,5 3,5 L21,5 C21.5522847,5 22,5.44771525 22,6 L22,8 C22,8.55228475 21.5522847,9 21,9 L19,9 Z"
                                    fill="#2d333f"
                                  ></path>
                                </g>
                              </svg>
                            </span>
                            Indoor • Standard
                          </section>
                        </div>
                        {!reservationIsPast && (
                          <div className="cancel-modify-add">
                            <button
                              className="modify-reservation"
                              onClick={routeToModifyReservation}
                            >
                              Modify
                            </button>
                            <button
                              onClick={openModal}
                              className="cancel-reservation"
                            >
                              Cancel
                            </button>
                            {showModal && (
                              <Modal
                                onClose={closeModal}
                                className="res-cancel-modal"
                              >
                                <ReservationCancel reservation={reservation} />
                              </Modal>
                            )}
                            <button className="add-to-calendar">
                              Add to calendar
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {!reservationIsPast ? (
                    <div className="menu-directions-review">
                      <div className="browse-menu">
                        <div className="browse-menu-icon">
                          <span>
                            <svg
                              viewBox="0 0 24 24"
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
                          <div className="browse-menu-text">
                            <h1>Browse menu</h1>
                            <h2>Restaurant's profile</h2>
                          </div>
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
                          <div className="get-directions-text">
                            <h1>Get directions</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="menu-directions-review">
                      <div className="leave-a-review">
                        <div className="review-icon">
                          <span>
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              focusable="false"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4.5 8C4.5 6.34315 5.84315 5 7.5 5H16.5C18.1569 5 19.5 6.34315 19.5 8V14C19.5 15.6569 18.1569 17 16.5 17H7.5C5.84315 17 4.5 15.6569 4.5 14V8ZM7.90909 8.78768H16.0909V10.0502H7.90909V8.78768ZM16.0909 11.3128H7.90909V12.5754H16.0909V11.3128ZM9.86924 20C9.54963 20 9.27273 19.8722 9.27273 19.5197C9.27273 19.0058 9.27273 17 9.27273 17H14.7273C14.7273 17 11.2757 18.9853 10.6364 19.5197C10.4357 19.6874 10.1249 20 9.86924 20Z"
                                fill="#fff"
                              ></path>
                            </svg>
                          </span>
                          <div className="leave-a-review-text">
                            <h1>Rate and review</h1>
                            <h2>Share your experience</h2>
                          </div>
                        </div>
                      </div>
                      <div className="browse-menu">
                        <div className="browse-menu-icon">
                          <span>
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              focusable="false"
                            >
                              <path
                                d="M3 5.00109C3 3.71755 4.1919 2.76626 5.44349 3.05088L11 4.31445V20.9916L4.5565 19.5262C3.64604 19.3192 3 18.5097 3 17.576V5.00109ZM13 21L19.4277 19.5928C20.3457 19.3918 21 18.5788 21 17.6391V5.05679C21 3.77988 19.8197 2.82999 18.5723 3.10306L13 4.32294V21Z"
                                fill="#fff"
                              ></path>
                            </svg>
                          </span>
                          <div className="browse-menu-text">
                            <h1>Browse menu</h1>
                            <h2>Restaurant's profile</h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
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
                    {numReviews >= 0 && (
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
                        {numReviews === 0 || numReviews > 1
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
