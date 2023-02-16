import csrfFetch from './csrf';

const RECEIVE_REVIEWS = 'reviews/RECEIVE_REVIEWS';
const RECEIVE_REVIEW = 'reviews/RECEIVE_REVIEW';
const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW';

const receiveReviews = (reviews) => ({
    type: RECEIVE_REVIEWS,
    reviews
});

const receiveReview = (review) => ({
    type: RECEIVE_REVIEW,
    review
});

const removeReview = (reviewId) => ({
    type: REMOVE_REVIEW,
    reviewId
});

export const getReviews = restaurantId => (state) => {
    return Object.values(state.reviews)
        .filter(review => review.restaurantId === restaurantId)
        .map(review => ({
            ...review
        })
    )

   
}

export const getReview = (reviewId) => (state) => state.reviews ? state.reviews[reviewId] : null; 

export const fetchReviews = () => async (dispatch) => {
    const response = await fetch('/api/reviews');

    if (response.ok) {
        const reviews = await response.json();
        dispatch(receiveReviews(reviews));
    }
}

export const fetchReview = (reviewId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`);

    if (response.ok) {
        const review = await response.json();
        dispatch(receiveReview(review));
    }
}

export const createReview = (review) => async (dispatch) => {
    const response = await csrfFetch('/api/reviews', {
        method: 'POST',
        body: JSON.stringify(review)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(receiveReview(data.review));
    }
    return response;
}

export const updateReview = (review) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${review.id}`, {
        method: 'PUT',
        body: JSON.stringify(review)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(receiveReview(data.review));
    }
    return response;
}

export const deleteReview = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(removeReview(reviewId));
    }
    return response;
}

const reviewsReducer = (state = {}, action) => {
    const newState = { ...state };

    switch(action.type) {
        case RECEIVE_REVIEWS:
            return { ...newState, ...action.reviews };
        case RECEIVE_REVIEW:
            newState[action.review.id] = action.review;
            return newState;
        case REMOVE_REVIEW:
            delete newState[action.reviewId];
            return newState;
        default:
            return state;
    }
}

export default reviewsReducer;

