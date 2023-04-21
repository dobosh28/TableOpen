import csrfFetch from "./csrf";

const RECEIVE_FAVORITES = "favorites/RECEIVE_FAVORITES";
const RECEIVE_FAVORITE = "favorites/RECEIVE_FAVORITE";
const REMOVE_FAVORITE = "favorites/REMOVE_FAVORITE";

const receiveFavorites = (favorites) => ({
  type: RECEIVE_FAVORITES,
  favorites,
});

export const receiveFavorite = (favorite) => ({
  type: RECEIVE_FAVORITE,
  favorite,
});

const removeFavorite = (favoriteId) => ({
  type: REMOVE_FAVORITE,
  favoriteId,
});

export const getFavorites = (state) => {
  return state.favorites ? Object.values(state.favorites) : [];
};

export const getFavorite = (id) => (state) => {
  return state.favorites ? state.favorites[id] : null;
};

export const fetchFavorites = () => async (dispatch) => {
  const response = await csrfFetch("/api/favorites");

  if (response.ok) {
    const favorites = await response.json();
    dispatch(receiveFavorites(favorites));
    return favorites;
  }
};

export const fetchFavorite = (favoriteId) => async (dispatch) => {
  const response = await csrfFetch(`/api/favorites/${favoriteId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(receiveFavorite(data.favorite));
    return data.favorite;
  }
};

export const createFavorite = (favorite) => async (dispatch) => {
  const response = await csrfFetch(`/api/favorites`, {
    method: "POST",
    body: JSON.stringify(favorite),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(receiveFavorite(data.favorite));
    return data.favorite;
  }
};

export const deleteFavorite = (favoriteId) => async (dispatch) => {
  const response = await csrfFetch(`/api/favorites/${favoriteId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(removeFavorite(favoriteId));
  }
};

const favoritesReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_FAVORITES: {
      const newState = {};
      action.favorites.forEach((favorite) => {
        newState[favorite.id] = favorite;
      });
      return newState;
    }
    case RECEIVE_FAVORITE: {
      const newState = { ...state };
      newState[action.favorite.id] = action.favorite;
      return newState;
    }
    case REMOVE_FAVORITE: {
      const newState = { ...state };
      delete newState[action.favoriteId];
      return newState;
    }
    default:
      return state;
  }
}

export default favoritesReducer;
