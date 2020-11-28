import React, { useState, useEffect } from 'react'
import {UserListContainer} from '../Styles/Styles'

function UserList(props) {
    
    let filteredUsers
    if (props.users){
    if (props.control){
        filteredUsers = props.users.filter(user => {
            if(user){
                user.startsWith("control")}})
    }else{
        filteredUsers = props.users.filter(user => {
            if(user){
                return !user.startsWith("control") && user !== "undefined"}})
    }}
    const renderUsers = (filteredUsers)=>{
        return filteredUsers.map((user,idx) =>{
            let color = idx % 2 === 0 ? "lightgrey" : "whitesmoke"
            return <li style={{textAlign: "left", background: color, width: "100%" }}key={idx}>{user}</li>
        })
    }
    return (
        <UserListContainer style={
            !props.control?     {position: "fixed",
            left: "0",
            top: "28px"}: null}>
            <h3>{props.roomId}</h3>
            {props.users ?
            renderUsers(filteredUsers)
            :
            <p>No Users Found</p>
}
        </UserListContainer>        
    )
}

export default UserList

