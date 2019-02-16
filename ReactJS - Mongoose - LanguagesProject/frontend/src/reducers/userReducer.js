import { GET_USERS, REGISTER_USER, DELETE_USER, USERS_LOADING } from '../actions/types';

const initialState = {
    users: []
};

export default function(state = initialState, action) { 
    switch (action.type) {
        case GET_USERS:
            return {
                ...state, 
                users: action.payload
            };
        case REGISTER_USER:
            return {
                ...state,
                users: [action.payload, ...state.users]
            }
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user.id != action.payload)
            }
        case USERS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}