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
    box-shadow: 3px 3px 20px black;
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
    box-shadow: 3px 3px 4px black;
    z-index: 6;
    cursor: pointer;
`
export const OpenHelp = styled.button`
    background: red;
    width: 60px;
    border-radius: 80px;
    border: 0.5px solid whitesmoke;
    height:28px;
    font-family: monospace;
    color:white;
    font-size: 12px;
    font-weight: 400;
    box-shadow: 1px 2px grey;
    cursor: pointer;
    margin-right: 10px;
`

export const UserNeeds = styled.li`
    list-style:none;
    text-align: left;
    word-break: break-word;
`



export const BottomRight = styled.div`
    position: fixed;
    right: 10px;
    bottom: 0px;
    z-index: 4;
`

export const HelpArea = styled.div`
    border: 1px solid black;
    border-radius: 10px;
    text-align: center;
    justify-content: center;
    padding: 10px;
    z-index: 5;
    position: static;
    background: whitesmoke;
    box-shadow: 3px 3px 4px black;

`
export const SendMessageButton = styled.button`
    text-align: center;
    background: rgb(97, 97, 247);
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
        background:rgb(80, 80, 249);
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
    box-shadow: 1px 1px 1px lightslategray;
    margin: 8px;

`
export const CenterMap = styled.div`


  
`

export const BlueBackground = styled.div`
  background: #4287f5;
  height: 100vh;
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
    border: 3px solid lightgrey;
    height: 500px;
    overflow-y: scroll;
    z-index:10;
    box-shadow: 2px 2px 2px grey;
    border-bottom-left-radius: 15px;
    
`

export const InteriorQueue = styled.div`
    margin-right: 0px;
`
