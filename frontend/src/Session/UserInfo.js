import React, {useState, useEffect} from 'react';

function UserInfo(props){
    let user = props.info
    let randomName = props.info.username || ((props.info.fullName) + " "+ props.info.ticketId.slice(-4))
    let [username, setUsername] = useState(randomName)

    const handleChange = (e) =>{
        setUsername(e.target.value)
    }

    
    
    const handleSubmit = (e) =>{
        e.preventDefault()
        let userObj = {
            ticketId: user.ticketId,
            username: username,
            fullName: user.fullName,
            email: user.email,
            admin: user.admin
        }
        
        props.login(userObj)
    }
    
        return (
            <>
            <form onSubmit={handleSubmit}>
                <input type="text" value= {username} onChange={handleChange}/>
                <input className="submit" type="submit" value="Join the Fun!" />
            </form>
            
              </>  
        );
    
}

export default UserInfo;

