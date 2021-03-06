import axios from 'axios';

export const setAuthToken = token => {
    
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

export const updateChatHistory = (messages) =>{
    return axios.post('/api/chat/update', messages)
}

export const retrieveChatHistory = (roomId) =>{
    return axios.post('/api/chat/retrieve', roomId)
}

export const signup = (userData) => {

    return axios.post('/api/users/register', userData);
};

export const login = (userData) => {
    return axios.post('/api/users/login', userData);
};

export const preAuth = () =>{
    return axios.post('/api/users/current')
}

export const getEvents = () => {
    return axios.get('/api/eventbrite/events')
}

export const getAllEvents = () =>{
    return axios.get('/api/eventbrite/allevents')
}

export const getAttendees = (eventId) =>{  
    return axios.post('/api/eventbrite/attendees', {eventId: eventId})
}
export const lateSeat=(user)=>{
    return axios.post('/api/users/lateSeat', {attendee: user})
}

export const getAllUsers = () =>{
    return axios.get('/api/users/getAllUsers')
}