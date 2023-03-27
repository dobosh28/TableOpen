import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReservation, getReservations, fetchReservation } from '../../../store/reservations';
import { useParams } from 'react-router-dom';

const ReservationConfirmation = () => {
  const dispatch = useDispatch();
  const { reservationId } = useParams();
  const reservation = useSelector(getReservation(reservationId));
  const currentUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(fetchReservation(reservationId));
  }, [dispatch, reservationId]);

  const formatDate = (dateString) => {
    const options = { weekday: "short", month: "short", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  return (
  <div>
    <h1>Reservation Confirmation</h1>
    {reservation ? (
      <div>
        <h2>Party size: {reservation.partySize}</h2>
        <h2>Date: {formatDate(reservation.date)}</h2>
        <h2>Time: {reservation.time}</h2>
      </div>
    ) : (
      <div>Loading...</div>
    )}
  </div>
);

}

export default ReservationConfirmation;