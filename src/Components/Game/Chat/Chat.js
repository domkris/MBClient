import React from 'react';
import './Chat.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useState} from 'react';
import {Socket} from '../../../Services/Socket'

const Chat = () => {

    var username = sessionStorage.getItem("userData").split(',')[1];
    const [chatMessage, setChatMessage] = useState("");

    var sendChatMessage = (e) =>{
        if(chatMessage){
            if(chatMessage.trim()){
                Socket.emit("chat", {username: username, text: chatMessage});
            }
            
        }
        setChatMessage("");
        e.preventDefault();
    }

    var change = e => {
        setChatMessage(e.target.value);
    }
    return (
        <div>
            <Form className="chatDiv" onSubmit={(e) => {e.preventDefault()}}>  
                <Form.Group controlId="formBasicChat" id="formChat">
                    <Form.Control type="text" placeholder="Type to chat.." minLength="1" maxLength="100" autoComplete="off" onChange= {change} value={chatMessage}/>
                </Form.Group>
                <Button variant="outline-secondary" id="buttonChat" onClick={(e) => sendChatMessage(e)}>
                    Send
                </Button>
            </Form>
        </div>
    );
}

export default Chat;

// line 27  added onSubmit to prevendDefault cos of on "Enter" wab page would be refreshed