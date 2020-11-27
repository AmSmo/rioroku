import styled from 'styled-components'


export const HelpButton = styled.button`
    background: red;
    position:absolute;
    width: 80px;
    border-radius: 80px;
    border: 0.5px solid whitesmoke;
    height:28px;
    font-family: monospace;
    color:white;
    font-size: 18px;
    font-weight: 600;
    box-shadow: 1px 2px grey;
    cursor: pointer;
`

export const HelpArea = styled.div`
border: 1px solid black;
border-radius: 10px 10px 0 0;
text-align: center;
justify-content: center;
padding: 10px;
z-index: 5;
position: static;
background: whitesmoke;

`
export const SendMessageButton = styled.button`
    text-align: center;
    background: blue;
    display:block;
    width: 120px;
    border-radius: 80px;
    border: 0.5px solid whitesmoke;
    height:30px;
    font-family: monospace;
    color:white;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 2px 4px #888888;
    margin:auto;
    cursor: pointer;
    &:hover{
        background:red
    }
`
export const HelpMessageContainer = styled.div`
    z-index:10;
    width: 210px;
    overflow-y: scroll;
    word-break: break-word;
    background: white;
    border-radius: 5px;
`

export const ChatMessageContainer = styled.div`
    z-index:10;
    width: 210px;
    min-height: 320px;
    height:52.5vh;
    max-height: 530px;
    
    background: white;
    overflow-y: scroll;
    word-break: break-word;
    background: white;
    
`


export const Vertical = styled.div`
    transform: rotate(-90deg);
    font-family: "Montserrat";
    font-weight: 800;
    font-size: 25px;
    position: absolute;
    right: -18px;
    top: 50%;
    background: none;
    z-index:0;
    transition: 2s;
    display: block;
    width: 100px;
    padding-right: 0;
`