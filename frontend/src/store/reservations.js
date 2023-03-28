import csrfFetch from "./csrf";

const RECEIVE_RESERVATIONS = "reservations/RECEIVE_RESERVATIONS";
const RECEIVE_RESERVATION = "reservations/RECEIVE_RESERVATION";
const REMOVE_RESERVATION = "reservations/REMOVE_RESERVATION";

const receiveReservations = (reservations) => ({
  type: RECEIVE_RESERVATIONS,
  reservations,
});

export const receiveReservation = (reservation) => ({
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
  const response = await csrfFetch("/api/reservations");

  if (response.ok) {
    const reservations = await response.json();
    dispatch(receiveReservations(reservations));
    return reservations;
  }
};

export const fetchReservation = (reservationId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reservations/${reservationId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(receiveReservation(data.reservation));
    return data.reservation;
  }
};

export const createReservation = (reservation) => async (dispatch) => {
  const response = await csrfFetch("/api/reservations", {
    method: "POST",
    body: JSON.stringify(reservation),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(receiveReservation(data.reservation));
    return data.reservation;
  }
};

export const updateReservation = (reservation) => async (dispatch) => {
  const response = await csrfFetch(`/api/reservations/${reservation.id}`, {
    method: "PUT",
    body: JSON.stringify(reservation),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(receiveReservation(data.reservation));
    return data.reservation;
  }
};

export const deleteReservation = (reservationId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reservations/${reservationId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(removeReservation(reservationId));
  }
};

const reservationsReducer = (state = {}, action) => {
  const newState = { ...state };

  switch (action.type) {
    case RECEIVE_RESERVATIONS:
      return { ...newState, ...action.reservations };
    case RECEIVE_RESERVATION:
      newState[action.reservation.id] = action.reservation;
      return newState;
    case REMOVE_RESERVATION:
      delete newState[action.reservationId];
      return newState;
    default:
      return state;
  }
};

export default reservationsReducer;