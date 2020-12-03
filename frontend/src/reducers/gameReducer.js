import { CHOOSE_TRACK } from '../actions/session_actions'

const initialState = {
    active: "",
    info: { track: "" }, time: 0
}

export default function (state = initialState, action) {
    switch (action.type) {
        case "CHANGE_ACTIVE":
            return ({ ...state, active: action.payload.active })
        case CHOOSE_TRACK:
            console.log(action, "GAME")
            return ({ ...state, info: { ...state.info, track: action.payload } })
        case "CURRENT_CLOCK":
            return { ...state, time: action.payload.time }
        case "RESET_CLOCK":
            return { ...state, time: action.payload.time }
        default:
            return state
    }

}