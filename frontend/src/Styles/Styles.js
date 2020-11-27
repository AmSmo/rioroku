import styled from 'styled-components'

export const UserListContainer = styled.ul`
    list-style-type: none;
    padding-left: 0px; 
    background: rgba(235, 230, 230, 0.9);
    height: 200px;
    overflow-y: scroll;
    width: 200px;
    margin-left: 20px;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
`

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

export const ChannelContainer = styled.div`
    bottom:0;
    position:fixed;
    display: flexbox;
    height: 200px;
    flex-wrap: wrap;
    background: grey;
    width: 100vw;
`

export const HelpQueue = styled.div`
    position: fixed;
    right: 0;
    width: 240px;
    border: 1px solid lightgrey;
    height: 500px;
    overflow-y: scroll;
    z-index:10;
`

export const InteriorQueue = styled.div`
    margin-right: 0px;
`