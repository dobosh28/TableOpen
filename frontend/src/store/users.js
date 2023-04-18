const RECEIVE_USER = 'users/RECEIVE_USER';

const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
});

export const getUser = (id) => async (dispatch) => {
    const res = await fetch(`/api/users/${id}`);
    const user = await res.json();
    dispatch(receiveUser(user));
};


const usersReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_USER:
            return { ...state, [action.user.id]: action.user };
        default:
            return state;
    }
};

export default usersReducer;