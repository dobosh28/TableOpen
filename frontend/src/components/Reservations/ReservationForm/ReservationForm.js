import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Modal } from "../../../context/Modal";
import LoginForm from "../../LoginFormModal/LoginForm";
import { useLocation, useHistory } from "react-router-dom";

import "./ReservationForm.css";

const ReservationForm = () => {
  const { restaurantId } = useParams();
  const restaurant = useSelector((state) => state.restaurants[restaurantId]);
  const sessionUser = useSelector((state) => state.session.user);

  const history = useHistory();
  const location = useLocation();
  const params = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const [partySize, setPartySize] = useState(2);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState("19:30");

  const [displayTime, setDisplayTime] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const openModal = useCallback(() => {
    history.push(`/restaurants/${restaurantId}?Modal=open`);
    setShowModal(true);
  }, [history, restaurantId]);

  const closeModal = useCallback(() => {
    history.replace(`/restaurants/${restaurantId}`);
  }, [history, restaurantId]);

  const handleClick = useCallback(
    (e) => {
      e.preventDefault();
      if (!sessionUser) {
        openModal();
      } else {
        setDisplayTime(true);
      }
    },
    [sessionUser, openModal]
  );

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

  useEffect(() => {
    if (params.get("Modal") === "open") {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [params]);

  useEffect(() => {
    if (sessionUser) {
      closeModal();
    }
  }, [sessionUser, closeModal]);

  const convertTime = (timeString) => {
    const hour = parseInt(timeString.slice(0, 2));
    const minute = timeString.slice(3, 5);
    const meridian = hour >= 12 ? "PM" : "AM";
    const newHour = hour % 12 || 12;

    return `${newHour}:${minute} ${meridian}`;
  };

  const timesBooked = useMemo(() => {
    return Math.floor(Math.random() * (74 - 12 + 1) + 12);
  }, []);

  return (
    <article className="reservation-form-container">
      <h2 className="make-a-reservation">Make a reservation</h2>
      <div className="reservation-form">
        <div className="party-size-picker">
          <label htmlFor="party-size" className="party-size-label">
            Party Size
          </label>
          <div className="party-size-select-holder">
            <select
              className="party-size-select"
              defaultValue="2"
              onChange={update("partySize")}
            >
              {[...Array(20)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1} {i === 0 ? "person" : "people"}
                </option>
              ))}
            </select>
            <span className="party-size-span">
              <svg viewBox="0 0 24 24" focusable="false">
                <g fill="none" fillRule="evenodd">
                  <path
                    d="M11,11 L11,14.5 C11,14.7761424 10.7761424,15 10.5,15 L9.5,15 C9.22385763,15 9,14.7761424 9,14.5 L9,10.5 L9,9.5 C9,9.22385763 9.22385763,9 9.5,9 L14.5,9 C14.7761424,9 15,9.22385763 15,9.5 L15,10.5 C15,10.7761424 14.7761424,11 14.5,11 L11,11 Z"
                    fill="#2d333f"
                    transform="translate(12.000000, 12.000000) rotate(-135.000000) translate(-12.000000, -12.000000)"
                  ></path>
                </g>
              </svg>
            </span>
          </div>
        </div>
        <hr className="hr-1" />
        <div className="date-time-tags">
          <label>Date</label>
          <label>Time</label>
        </div>
        <div className="date-time">
          <div className="res-date">
            <input
              id="date-input"
              className="reservation-input-date"
              value={date}
              min={date}
              type="date"
              onChange={update("date")}
            />
          </div>
          <div className="res-time">
            <input
              className="reservation-input-time"
              type="time"
              value={time}
              onChange={update("time")}
            />
          </div>
        </div>
        <div className="hr-hr">
          <hr className="hr-2" />
          <hr className="hr-3" />
        </div>
        <div className="find-time">
          {displayTime ? (
            <Link
              to={{
                pathname: "/reservation/details",
                state: {
                  party_size: partySize,
                  date: date,
                  time: time,
                  restaurant: restaurant,
                  current_user: sessionUser,
                },
              }}
            >
              <input
                className="reservation-input-submit-2"
                type="submit"
                value={convertTime(time)}
              />
            </Link>
          ) : (
            <input
              className="reservation-input-submit-2"
              type="submit"
              value="Find a table"
              onClick={handleClick}
            />
          )}
        </div>
        <section className="times-booked">
          <span className="times-booked-span">
            <span>
              <svg viewBox="0 0 24 24" focusable="false">
                <g fill="none" fillRule="evenodd">
                  <path
                    d="M15.5,5 C15.2239,5 15,5.223846 15,5.5 L15,6.5 C15,6.77615 15.2239,7 15.5,7 L17.5858,7 L14,10.58578 L12.70711,9.29291 L12.35355,8.93933 C12.15829,8.74408 11.84171,8.74408 11.64645,8.93933 L11.29289,9.29291 L5,15.5858 L5,7 L11.5,7 C11.77614,7 12,6.77615 12,6.5 L12,5.5 C12,5.22385 11.77614,5 11.5,5 L5,5 C3.89543,5 3,5.89542 3,7 L3,17 C3,18.1046 3.89543,19 5,19 L19,19 C20.1046,19 21,18.1046 21,17 L21,14.5 C21,14.2238 20.7761,14 20.5,14 L19.5,14 C19.2239,14 19,14.2238 19,14.5 L19,17 L6.4142,17 L12,11.41422 L13.2929,12.70709 L13.6464,13.06067 C13.8417,13.25592 14.1583,13.25592 14.3536,13.06067 L14.7071,12.70709 L19,8.41422 L19,10.5 C19,10.77615 19.2239,11 19.5,11 L20.5,11 C20.7761,11 21,10.77615 21,10.5 L21,6 L21,5.5 C21,5.223846 20.7761,5 20.5,5 L20,5 L15.5,5 Z"
                    fill="#2d333f"
                    fillRule="nonzero"
                  />
                </g>
              </svg>
            </span>
            Booked {timesBooked} times today
          </span>
        </section>
        {showModal && (
          <Modal onClose={closeModal} className="auth-modal">
            <LoginForm />
          </Modal>
        )}
      </div>
    </article>
  );
};

export default ReservationForm;
