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
`

export const HelpArea = styled.div`
border: 1px solid black;
border-radius: 10px 10px 0 0;
text-align: center;
justify-content: center;
padding: 10px;
z-index:10;
position: static;
background: whitesmoke;

`
export const SendMessageButton = styled.button`
    background: blue;
    width: 120px;
    border-radius: 80px;
    border: 0.5px solid whitesmoke;
    height:30px;
    font-family: monospace;
    color:white;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 2px 4px #888888;
    &:hover{
        background:red
    }
`
export const MessageContainer = styled.div`
    z-index:10;
    max-height: 200px;
    width: 210px;
    overflow-y: scroll;
    word-break: break-word;
    background: white;
    border-radius: 5px;
`
export const ChatMessageContainer = styled.div`
    z-index:10;
    max-height: 200px;
    width: 210px;
    height: 400px;
    background: white;
    overflow-y: scroll;
    word-break: break-word;
    background: white;
`
export const MessageLine = styled.li`

    list-style: none;
    text-align: left;
`