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
    state.restaurants ? Object.values(state.restaurants) : [];
};

export const getRestaurant = (id) => (state) => {
    state.restaurants? state.restaurants[id] : null;
};

export const fetchRestaurants = () => async (dispatch) => {
    const response = await fetch('/api/restaurants');
    
    if (response.ok) {
        const restaurants = await response.json();
        dispatch(receiveRestaurants(restaurants));
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
