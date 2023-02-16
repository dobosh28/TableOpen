const ADD_USER = 'users/ADD_USER';
const ADD_USERS = 'users/ADD_USERS';

const addUser = (user) => ({
    type: ADD_USER,
    user
});

const addUsers = (users) => ({
    type: ADD_USERS,
    users
});

function usersReducer(state = {}, action) {
    Object.freeze(state);
    switch (action.type) {
        case ADD_USER:
            const user = action.user;
            return { ...state, [user.id]: user };
        case ADD_USERS:
            const users = action.users;
            return { ...state, ...users };
        default:
            return state;
    }
}

export default usersReducer;