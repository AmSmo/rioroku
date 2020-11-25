import { combineReducers } from 'redux';
import errors from './session_error_reducer'
import api from './session_api_reducer'
import game from './gameReducer'
const RootReducer = combineReducers({
    errors, api, game
});

export default RootReducer;