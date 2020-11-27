import React from 'react'
import styled from "styled-components"
import './clock.scss'
import { Dimmer, Loader, Segment, Transition } from 'semantic-ui-react'
const AnimatedCard = ({ animation, digit }) => {
    
    return (
        <div className={`flipCard ${animation}`}>
            <span>{digit}</span>
        </div>
    );
};

// function component
const StaticCard = ({ position, digit }) => {
    return (
        <div className={position}>
            <span>{digit}</span>
        </div>
    );
};

// function component
const FlipUnitContainer = ({ digit, shuffle, unit }) => {

    // assign digit values
    let currentDigit = digit;
    let previousDigit = digit - 1;

    // to prevent a negative value
    if (unit !== 'hours') {
        previousDigit = previousDigit === -1
            ? 59
            : previousDigit;
    } else {
        previousDigit = previousDigit === -1
            ? 23
            : previousDigit;
    }

    // add zero
    if (currentDigit < 10) {
        currentDigit = `0${currentDigit}`;
    }
    if (previousDigit < 10) {
        previousDigit = `0${previousDigit}`;
    }

    // shuffle digits
    const digit1 = shuffle
        ? previousDigit
        : currentDigit;
    const digit2 = !shuffle
        ? previousDigit
        : currentDigit;

    // shuffle animations
    const animation1 = shuffle
        ? 'fold'
        : 'unfold';
    const animation2 = !shuffle
        ? 'fold'
        : 'unfold';

    return (
        <>
        <div className={'flipUnitContainer'}>
            <StaticCard
                position={'upperCard'}
                digit={currentDigit}
            />
            <StaticCard
                position={'lowerCard'}
                digit={previousDigit}
            />
            <AnimatedCard
                digit={digit1}
                animation={animation1}
            />
            <AnimatedCard
                digit={digit2}
                animation={animation2}
            />
            <div>
                <NextShow style={{fontWeight: '400', fontSize: "22px"}}>{unit}</NextShow>
            </div>
        </div>
        </>
    );
};

// class component
class FlipClock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            timeleft: 0,
            hours: 0,
            hoursShuffle: true,
            minutes: 0,
            minutesShuffle: true,
            days: 0,
            daysShuffle: true,
            seconds: 0,
            secondsShuffle: true,
            loaded:false,
            clock:false
        };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.updateTime(),
            50
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    updateTime() {
        // let countDownDate = new Date(2020, 10, 29, 8, 0, 0)
        let countDownDate = new Date(this.props.next)
        let now = new Date().getTime();
        let timeleft = countDownDate - now;
        this.setState({timeleft})
        let days = Math.floor((timeleft % (1000 * 60 * 60 * 24 * 7)   / (1000 * 60 * 60 * 24)));
        let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60)); 
        let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
        if (timeleft < 0 ){
            seconds = Math.abs(seconds) 
            if(seconds === 60 ){
                seconds = 0
            }
            minutes = Math.abs(minutes) -1
            if(minutes === 60){
                minutes = 0
            }
            hours = Math.abs(hours) -1
        }
        if (days !== this.state.days) {
            const daysShuffle = !this.state.daysShuffle;
            this.setState({
                days,
                daysShuffle
            });
        }
        if (hours !== this.state.hours) {
            const hoursShuffle = !this.state.hoursShuffle;
            this.setState({
                hours,
                hoursShuffle
            });
        }
        // on minute chanage, update minutes and shuffle state
        if (minutes !== this.state.minutes) {
            const minutesShuffle = !this.state.minutesShuffle;
            this.setState({
                minutes,
                minutesShuffle
            });
        }
        // on second chanage, update seconds and shuffle state
        if (seconds !== this.state.seconds) {
            const secondsShuffle = !this.state.secondsShuffle;
            this.setState({
                seconds,
                secondsShuffle
            });
        }
    }

    render() {

        const {
            days,
            daysShuffle,
            hours,
            minutes,
            seconds,
            hoursShuffle,
            minutesShuffle,
            secondsShuffle,
            loaded,
            clock
        } = this.state;
        setTimeout(() => this.setState({loaded:true}), 100)
        return (
            <>
                <Transition visible = { clock } animation = 'scale' duration = { 400} >
            <ClockContainer>
                { this.state.timeleft > 0 ? 
                <>
                <NextShow>
                            The Next Show Starts In
                </NextShow>
                <div className={'flipClock'}>
                    
                            <FlipUnitContainer
                        unit={'days'}
                        digit={days}
                        shuffle={daysShuffle}
                        header={"Days"}
                    />
                
                    <FlipUnitContainer
                        unit={'hours'}
                        digit={hours}
                        shuffle={hoursShuffle}
                    />
                <FlipUnitContainer
                    unit={'minutes'}
                    digit={minutes}
                    shuffle={minutesShuffle}
                />
                <FlipUnitContainer
                    unit={'seconds'}
                    digit={seconds}
                    shuffle={secondsShuffle}
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
                    shuffle={hoursShuffle}
                />
                <FlipUnitContainer
                    unit={'minutes'}
                    digit={minutes}
                    shuffle={minutesShuffle}
                />
                <FlipUnitContainer
                    unit={'seconds'}
                    digit={seconds}
                    shuffle={secondsShuffle}
                />
                </div>
                <NextShow>ago</NextShow>
                </>
            }
            </ClockContainer>
            </Transition>
        
            
              <Transition visible={!loaded} animation='scale' duration={400} onHide={()=> this.setState({clock:true})}>
              <Segment style={{ height: "170px", margin: "auto", width: "600px" }}>
                  <Dimmer active>
                      <Loader indeterminate>Checking Schedule</Loader>
                  </Dimmer>
              </Segment>
                </Transition>
                </>
            
    )
    
}}
const NextShow = styled.div`
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