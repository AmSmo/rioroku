const initialState = {
    active: "",
    info: {}, time: 0
}

export default function (state = initialState, action) {
    switch (action.type){
        case "CHANGE_ACTIVE":
            return ({...state, active: action.payload.active})
        case "CURRENT_CLOCK":
            return {...state, time: action.payload.time}
        case "RESET_CLOCK":
            return {...state, time: action.payload.time}
        default:
            return state
        }
        
}