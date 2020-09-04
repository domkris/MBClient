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
        Socket.emit("chat", {username: username, text: chatMessage});
        setChatMessage("");
    }

    var change = e => {
        setChatMessage(e.target.value);
        console.log(e.target.value);
    }
    return (
        <div>
            <Form className="chatDiv">
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