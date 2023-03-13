const RECEIVE_RESERVATIONS = "reservations/RECEIVE_RESERVATIONS";
const RECEIVE_RESERVATION = "reservations/RECEIVE_RESERVATION";
const REMOVE_RESERVATION = "reservations/REMOVE_RESERVATION";

const receiveReservations = (reservations) => ({
  type: RECEIVE_RESERVATIONS,
  reservations,
});

const receiveReservation = (reservation) => ({
  type: RECEIVE_RESERVATION,
  reservation,
});

const removeReservation = (reservationId) => ({
  type: REMOVE_RESERVATION,
  reservationId,
});

export const getReservations = (state) => {
  return state.reservations ? Object.values(state.reservations) : [];
};

export const getReservation = (id) => (state) => {
  return state.reservations ? state.reservations[id] : null;
};

export const fetchReservations = () => async (dispatch) => {
  const response = await fetch("/api/reservations");

  if (response.ok) {
    const reservations = await response.json();
    dispatch(receiveReservations(reservations));
  }
};

export const fetchReservation = (reservationId) => async (dispatch) => {
  const response = await fetch(`/api/reservations/${reservationId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(receiveReservation(data.reservation));
  }
};

export const createReservation = (reservation) => async (dispatch) => {
  const response = await fetch("/api/reservations", {
    method: "POST",
    body: JSON.stringify(reservation),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(receiveReservation(data.reservation));
  }
};

export const updateReservation = (reservation) => async (dispatch) => {
  const response = await fetch(`/api/reservations/${reservation.id}`, {
    method: "PUT",
    body: JSON.stringify(reservation),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(receiveReservation(data.reservation));
  }
};

export const deleteReservation = (reservationId) => async (dispatch) => {
  const response = await fetch(`/api/reservations/${reservationId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(removeReservation(reservationId));
  }
};

