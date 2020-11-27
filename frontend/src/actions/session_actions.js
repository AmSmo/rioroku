import * as APIUtil from '../util/session_api_util';
import jwt_decode from 'jwt-decode';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_USER_SIGN_IN = "RECEIVE_USER_SIGN_IN";
export const UPDATE_NEXT_EVENT = "UPDATE_NEXT_EVENT";
export const SET_ADMIN_STATUS = "SET_ADMIN_STATUS"
export const logoutUser = () => ({
    type: RECEIVE_USER_LOGOUT
});

export const admin = (admin, username) => ({
    type: SET_ADMIN_STATUS,
    payload: {admin, username}
})
export const logout = () => dispatch => {
    
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('username')
    APIUtil.setAuthToken(false)
    dispatch(logoutUser())
};

export const receiveCurrentUser = (currentUser, user) => ({
    type: RECEIVE_CURRENT_USER,
    payload: {currentUser, user}
});

export const receiveUserSignIn = () => ({
    type: RECEIVE_USER_SIGN_IN
});

export const receiveErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});


export const setNextEvent = (eventInfo) => ({
    type: UPDATE_NEXT_EVENT,
    eventInfo
})


export const nextEvent = () => dispatch => {
    APIUtil.getEvents().then(resp=> { 
        console.log("in get", resp)
        dispatch(setNextEvent(resp.data.events[0]))
    }).catch(err => {
        console.log("err in get", err)
        dispatch(receiveErrors(err.response));
    })
}



export const login = user => dispatch => {
    APIUtil.login(user).then(resp => {
        user.admin = resp.data.user.admin
        const { token } = resp.data;
        localStorage.setItem('jwtToken', token);
        APIUtil.setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(receiveCurrentUser(decoded, user))
    })
        .catch(err => {
            return dispatch(receiveErrors(err.response.data));
        })
    }