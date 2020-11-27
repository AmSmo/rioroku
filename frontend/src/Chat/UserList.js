import React, { useState, useEffect } from 'react'
import Chat from './Chat'
import styled from 'styled-components'

function UserList(props) {
    console.log(props)
    let filteredUsers = []
    if (props.control){
        filteredUsers = props.users.filter(user => user.startsWith("control"))
    }else{
        filteredUsers = props.users.filter(user => !user.startsWith("control"))
    }
    const renderUsers = (filteredUsers)=>{
        return filteredUsers.map((user,idx) =>{
            console.log(user)
            return <li key={idx}>{user}</li>
        })
    }
    return (
        <UserListContainer>
            {props.users ?
            renderUsers(filteredUsers)
            :
            <p>No Users Found</p>
}
        </UserListContainer>        
    )
}

export default UserList

const UserListContainer = styled.ul`
    list-style-type: none;
    background: whitesmoke;
    height: 200px;
    overflow-y: scroll;
    width: 300px;

`