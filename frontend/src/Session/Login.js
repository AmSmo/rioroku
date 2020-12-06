import React, { useState, useEffect } from 'react';
import * as APIUtil from '../util/session_api_util'
import UserInfo from './UserInfo'
import { connect } from 'react-redux';
import { login, nextEvent } from '../actions/session_actions';
import {CenterMap} from '../Styles/Styles'
import styled from 'styled-components'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'
import {FlipClock} from './FlipClock'

function Login(props) {
    const [ticketId, setTicketId] = useState("")
    const [errors, setErrors] = useState({})
    const [ticketFound, setTicketFound] = useState(false)
    const [tempUserInfo, setTempUserInfo] = useState({})    
    const [doorsOpen, setDoorsOpen] = useState(true )
    if (props.isAuthenticated === true) {
        props.history.push('/')
    }
    
    useEffect(()=>{
        props.nextEvent()
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        let ticket = e.target.ticketId.value
        signup(ticket);

    }
    const signup = ticketId => {
        APIUtil.signup({ ticketId, eventId: props.eventInfo[0].id, doorsOpen}).then((e) => {
            if (e.data.error) {
                setErrors({ errors: e.data.error })

            } else {
                setErrors({})
                setTempUserInfo(e.data.user)
                setTicketFound(true)
            }
        }
        )
            .catch(err => setErrors(err.response.data)
            )
    }

    const renderErrors = () => {
        return (
            <>
                {Object.keys(errors).length !== 0 ?
                    <>
                        {Object.keys(errors).map((error, i) => (

                            <div warning style={{margin: "0"}}key={`error-${i}`}>
                                {errors[error]}
                            </div>
                        ))}
                    </>
                    :
                    <div>
                        This Can Be Found Under the QR Code on your Eventbrite ticket
                    </div>
                }
            </>
        );
    }
    const showing = (currentEvent)=> {
        setDoorsOpen(currentEvent)
    }

    return (
        <Background>
            <CenterMap>
            <img alt="Rio Records Logo" src='https://images.squarespace-cdn.com/content/v1/5f5babb127bb8735b1ce9ff4/1600834661082-OH0426281Z7QIKY1UR0I/ke17ZwdGBToddI8pDm48kAeNX5A_q12pJ8eKMLVAD7MUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYwL8IeDg6_3B-BRuF4nNrNcQkVuAT7tdErd0wQFEGFSnKbS1XvxpUT8-e_Xpf2ysg0RoPUcD1NnvYm2_Hxgrz_LeDzQPo0UR-MzglQPIBDezw/Rio+Records+2.png' style={{margin: "30px 0", filter: 'invert(.7)', height:"80px" }} />
            </CenterMap>
            { props.eventInfo ?
                
                <FlipClock next={props.eventInfo} showing={showing}/>
                
            :
                <Segment style={{height: "170px", margin: "auto", width:"600px"}}>
                    <Dimmer active>
                        <Loader indeterminate>Checking Schedule</Loader>
                    </Dimmer>
                </Segment>
}           

            
            <>
            {ticketFound ?
            <div style={record}>
            <TicketForm>
                    <div style={{ padding: "20px 0" }}>
                                You get to choose. <br></br>
                            Enter what you would like to be called during this experience?
                    </div>
                <UserInfo info={tempUserInfo} login={props.login} isAuthenticated={props.isAuthenticated}/>
            </TicketForm>
                </div>
                :
                <form onSubmit={handleSubmit} className="rotate-center" style={record}>
                    <TicketForm>
                        
                        <br />
                        
                        <input type="text"
                            value={ticketId}
                            name="ticketId"
                            onChange={(e) => setTicketId(e.target.value)}
                            placeholder="Ticket Id"
                        />
                        <input className="submit" type="submit" value="Submit" />
                        
                        {renderErrors()}
                        
                    </TicketForm>
                </form>
            }
            </>
        </Background>
    );
}


const mapStateToProps = (state) => {
    return {
        signedIn: state.api.isSignedIn,
        errors: state.errors.session,
        eventInfo: state.api.eventInfo
    };
};

const mapDispatchToProps = (dispatch) => {
    
    return {
        login: user => {
            return dispatch(login(user))},
        nextEvent: ()=> {
            return dispatch(nextEvent())
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);


const Background= styled.div`
    background: url('https://images.squarespace-cdn.com/content/v1/5f5babb127bb8735b1ce9ff4/1600841353451-S1O9EJ52ZOH6OPEI4PUX/ke17ZwdGBToddI8pDm48kCiMFTcZBGji0W88cIICJysUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYwL8IeDg6_3B-BRuF4nNrNcQkVuAT7tdErd0wQFEGFSnBQ3wFkNBVy7lZy9hvHlJuMyXjX7fiW1znkD-CsoKCeUK1nzmHInNPsAcKIA5dmCwA/Orange+Threads.png') black;
    display: block;
    background-position: center;
    background-repeat: repeat-x;
    background-color: currentcolor;
    
`

const TicketForm = styled.div`
    position: relative;
    margin: 10vh auto;
    text-align:center;
    background: rgba(255,255,255,0.7);
    width: 200px;
    height:220px;
    border-radius: 10px;
    box-shadow: 5px 5px 10px black;
`


const record = { 
    background: `url('/assets/Record.png')`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "auto",
    zIndex: "4",
    height: "500px" }

