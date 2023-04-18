import csrfFetch from "./csrf";

const RECEIVE_RESTAURANTS = 'restaurants/RECEIVE_RESTAURANTS';
const RECEIVE_RESTAURANT = 'restaurants/RECEIVE_RESTAURANT';

const receiveRestaurants = (restaurants) => ({
    type: RECEIVE_RESTAURANTS,
    restaurants
});

const receiveRestaurant = (restaurant) => ({
    type: RECEIVE_RESTAURANT,
    restaurant
});

export const getRestaurants = (state) => {
    return state.restaurants ? Object.values(state.restaurants) : [];
};

export const getRestaurant = (id) => (state) => {
    return state.restaurants? state.restaurants[id] : null;
};

export const fetchRestaurants = () => async (dispatch) => {
    const response = await csrfFetch('/api/restaurants');
    
    if (response.ok) {
        const restaurants = await response.json();
        dispatch(receiveRestaurants(restaurants));
        return restaurants;
    }
};

export const fetchRestaurant = (restaurantId) => async (dispatch) => {
    const response = await csrfFetch(`/api/restaurants/${restaurantId}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(receiveRestaurant(data.restaurant));
        return data.restaurant;
    }
};

const restaurantsReducer = (state = {}, action) => {
    const newState = { ...state };

    switch(action.type) {
        case RECEIVE_RESTAURANTS:
            return { ...newState, ...action.restaurants };
        case RECEIVE_RESTAURANT:
            newState[action.restaurant.id] = action.restaurant;
            return newState;
        default:
            return state;
    }
};

export default restaurantsReducer;
