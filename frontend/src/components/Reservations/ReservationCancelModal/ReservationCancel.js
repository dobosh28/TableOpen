import { useDispatch } from "react-redux";
import { deleteReservation } from "../../../store/reservations";
import "./ReservationCancel.css";

const ReservationCancel = ({ reservation }) => {
  const dispatch = useDispatch();

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(deleteReservation(reservation.id));
  };

  return (
    <div className="reservation-cancel">
      <h1>Are you sure you want to cancel this reservation?</h1>
      <button className="cancel-button" onClick={handleDelete}>
        Cancel
      </button>
    </div>
  );
}

export default ReservationCancel;