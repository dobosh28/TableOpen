import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { receiveReservation, updateReservation, getReservation, fetchReservation } from "../../../store/reservations";
import "./ReservationModifyPage.css";

const ReservationModifyPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { reservationId } = useParams();
  const reservation = useSelector(getReservation(reservationId));
  const [errors, setErrors] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [partySize, setPartySize] = useState("");
  const [occasion, setOccasion] = useState("");

  // debugger;

  useEffect(() => {
    dispatch(fetchReservation(reservationId));
  }, [dispatch, reservationId]);

  
  useEffect(() => {
    if (reservation) {
      setDate(reservation.date);
      setTime(reservation.time);
      setPartySize(reservation.partySize);
      setOccasion(reservation.occasion);
    }
  }, [reservation]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: reservationId,
      date,
      time,
      partySize,
      occasion,
    };

    const updatedReservation = await dispatch(updateReservation(payload));
    dispatch(receiveReservation(updatedReservation));
    history.push(`/reservations/${reservationId}/confirmation`);
  };

  return (
    <div className="reservation-modify-page-container">
      <div className="reservation-modify-page-form-container">
        <form onSubmit={handleSubmit}>
          <div className="reservation-modify-page-form-header">
            <h1>Modify Reservation</h1>
          </div>
          <div className="reservation-modify-page-form-inputs">
            <div className="reservation-modify-page-form-inputs-left">
              <div className="reservation-modify-page-form-inputs-left-date">
                <label>Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="reservation-modify-page-form-inputs-left-time">
                <label>Time</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>
            <div className="reservation-modify-page-form-inputs-right">
              <div className="reservation-modify-page-form-inputs-right-party-size">
                <label>Party Size</label>
                <input
                  type="number"
                  value={partySize}
                  onChange={(e) => setPartySize(e.target.value)}
                />
              </div>
              <div className="reservation-modify-page-form-inputs-right-occasion">
                <label>Occasion</label>
                <input
                  type="text"
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="reservation-modify-page-form-buttons">
            <button type="submit">Modify Reservation</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReservationModifyPage;