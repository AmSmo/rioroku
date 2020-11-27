import {
    RECEIVE_SESSION_ERRORS,
    RECEIVE_CURRENT_USER,
} from '../actions/session_actions';

const _nullErrors = [];

const SessionErrorsReducer = (state = _nullErrors, action) => {
    
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_SESSION_ERRORS:
            if (action.errors.duplicate){
                return ["Username in use"]
            }else{
            return action.errors;}
        case RECEIVE_CURRENT_USER:
            return _nullErrors;
        default:
            return state;
    }
};

export default SessionErrorsReducer;