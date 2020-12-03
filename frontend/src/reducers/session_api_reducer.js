import {
    RECEIVE_CURRENT_USER,
    RECEIVE_USER_LOGOUT,
    RECEIVE_USER_SIGN_IN,
    UPDATE_NEXT_EVENT,
    SET_ADMIN_STATUS
} from '../actions/session_actions';

const initialState = {
    isAuthenticated: false,
    user: {},
    
};

export default function session(state = initialState, action) {
    switch (action.type) {
        case UPDATE_NEXT_EVENT:
            return {...state, eventInfo: action.eventInfo}
        case SET_ADMIN_STATUS:
            return ({...state,
            user: {...state.user, admin: action.payload.admin, username: action.payload.username}})
        case RECEIVE_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !!action.payload.currentUser,
                user: action.payload.user,
                isSignedIn: true
            };
        case RECEIVE_USER_LOGOUT:
            return {
                isAuthenticated: false,
                user: undefined
            };
        case RECEIVE_USER_SIGN_IN:
            
            return {
                ...state,
                isSignedIn: true
            }
        default:
            return state;
    }
}