import * as APIUtil from '../util/session_api_util';
import jwt_decode from 'jwt-decode';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_USER_SIGN_IN = "RECEIVE_USER_SIGN_IN";

export const logoutUser = () => ({
    type: RECEIVE_USER_LOGOUT
});

export const logout = () => dispatch => {
    console.log("potato")
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






export const login = user => dispatch => {
    console.log("disp")
    APIUtil.login(user).then(res => {
    
        console.log("RESP", res)
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        APIUtil.setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(receiveCurrentUser(decoded, user))
    })
        .catch(err => {
            console.log("err!!")
            dispatch(receiveErrors(err.response.data));
        })
    }