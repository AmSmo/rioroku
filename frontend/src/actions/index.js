export const changeActive = active => {
    
    return{
        type: "CHANGE_ACTIVE",
        payload: {active}
    }
}

export const currentClock = time => {
    return({
        type: "CURRENT_CLOCK",
        payload: {time}
    })
}

export const resetClock = time => {
    return{
        type: "RESET_CLOCK",
        payload: {time : 0}
    }
}