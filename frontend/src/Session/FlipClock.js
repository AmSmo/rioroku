import React, {useEffect, useState} from 'react'
import styled from "styled-components"
import './clock.scss'
import { Dimmer, Loader, Segment, Transition } from 'semantic-ui-react'

const Card = ({ position, digit }) => {
    return (
        <div className={position}>
            <span>{digit}</span>
        </div>
    );
};

const FlipUnitContainer = ({ digit, unit }) => {

    if (digit < 10) {
        digit = `0${digit}`;
    }
   

    return (
        <>
        <div className={'flipUnitContainer'}>
            <Card
                position={'upperCard'}
                digit={digit}
            />
            <Card
                position={'lowerCard'}
                digit={digit}
            />
                <NextShow style={{fontWeight: '400', fontSize: "22px"}}>{unit}</NextShow>
            
        </div>
        </>
    );
};

function FlipClock(props){
    const [timeleft, setTimeleft] = useState(0)
    const [days, setDays] = useState(0)
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)
    let [loaded, setLoaded] = useState(false)
    let [clock, setClock] = useState(false)
    let [next, setNext] = useState(props.next[0].date)
    let [current, setCurrent] = useState(0)
    
    useEffect(()=>{
        let timer = setInterval(
            () => updateTime(),
            60
        )
        return () => { clearInterval(timer)}

    })

    const updateTime = () => {

        let countDownDate = new Date(next)
        let now = new Date().getTime();
        let updatedTimeLeft = countDownDate - now;
        setTimeleft(updatedTimeLeft)
        let currentDays = Math.floor((updatedTimeLeft % (1000 * 60 * 60 * 24 * 7) / (1000 * 60 * 60 * 24)));
        let currentHours = Math.floor((updatedTimeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let currentMinutes = Math.floor((updatedTimeLeft % (1000 * 60 * 60)) / (1000 * 60));
        let currentSeconds = Math.floor((updatedTimeLeft % (1000 * 60)) / 1000);
        if (currentDays === 0 && currentHours === 0 && currentMinutes < 15){
            props.showing(true)
        }
        if (updatedTimeLeft < 0) {
            currentSeconds = Math.abs(currentSeconds)
            if (currentSeconds === 60) {
                currentSeconds = 0
            }
            currentMinutes = Math.abs(currentMinutes) - 1
            if (currentMinutes === 60) {
                currentMinutes = 0
            }
            currentHours = Math.abs(currentHours) - 1
            if (currentHours >= 1) {
                console.log("curr",current ,props.next)
                let idx = current + 1
                setCurrent(idx)
                return setNext(props.next[idx].date)
            }else{
                props.showing(true)
            }
        }
    
        if (days !== currentDays) {
                setDays(currentDays)  
        }
        if (hours !== currentHours) {
            setHours(currentHours)
            
        };
        if (minutes !== currentMinutes) {
                setMinutes(currentMinutes)
                
        };
       
        if (seconds !== currentSeconds) {
            
                setSeconds(currentSeconds)
                
            
        }
        
    }
    return (
        <>
            {clock ? null : setTimeout(() => setLoaded(true),40 )}
            <Transition visible={clock} animation='scale' duration={100}  >
                <ClockContainer>
                    {timeleft > 0 ?
                        <>
                            <NextShow>
                                The Next Show Starts In
                </NextShow>
                            <div className={'flipClock'}>

                                <FlipUnitContainer
                                    unit={'days'}
                                    digit={days}
                    
                                />

                                <FlipUnitContainer
                                    unit={'hours'}
                                    digit={hours}
                                    
                                />
                                <FlipUnitContainer
                                    unit={'minutes'}
                                    digit={minutes}
                                    
                                />
                                <FlipUnitContainer
                                    unit={'seconds'}
                                    digit={seconds}
                                    
                                />
                            </div>
                        </>
                        :
                        <>
                            <NextShow>The Show Started </NextShow>
                            <div className={'flipClock'}>
                                <FlipUnitContainer
                                    unit={'hours'}
                                    digit={hours}
                                    
                                />
                                <FlipUnitContainer
                                    unit={'minutes'}
                                    digit={minutes}
                                    
                                />
                                <FlipUnitContainer
                                    unit={'seconds'}
                                    digit={seconds}

                                />
                            </div>
                            <NextShow>ago</NextShow>
                        </>
                    }
                </ClockContainer>
            </Transition>


            <Transition visible={!loaded} animation='scale' duration={400} onHide={() => setClock(true)}>
                <Segment style={{ height: "170px", margin: "auto", width: "600px" }}>
                    <Dimmer active>
                        <Loader indeterminate>Checking Schedule</Loader>
                    </Dimmer>
                </Segment>
            </Transition>
        </>

    )

}

const NextShow = styled.div`
    margin:auto;
    text-align:center;
    font-size:32px;
    color: orange;
    font-weight: 600;
    display: block;
`
const ClockContainer = styled.div`
    margin: auto;
    display: block;
`


export {FlipClock}