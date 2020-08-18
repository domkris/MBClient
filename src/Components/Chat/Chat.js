import React from 'react';
import {useState, useEffect} from 'react';

import {Socket} from '../../Services/Socket'; 
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Message from '../Message/Message';
import './Chat.css';

const Chat = () => {

    var username = sessionStorage.getItem("userData").split(',')[1]; 
    var game = sessionStorage.getItem("game");
    var gameAmount = sessionStorage.getItem("game").split(",")[2];
    if(game){
        game = game.split(',')[1];  
    } 
    const [connected, setConnected] = useState(false);
    const [welcomeMessage, setWelcomeMessage] = useState("");
    const [gameMessages, setGameMessages] = useState([]);
    const [usersInGame, setUsersInGame] = useState([]);

    useEffect(()=>{

        // separate chats to rooms/games
        Socket.emit("joinRoom", {username, game, gameAmount});

        Socket.on("welcomeMessage", (message) => {
            setWelcomeMessage(message);
            setConnected(true)
        });

        Socket.on("message", (message) => {
            console.log(message);
        });
    }, []);

    useEffect(() => {
        Socket.on("gameMessage", (gameMessage) => {
            setGameMessages([...gameMessages, gameMessage]);
        });
    // stavljas ovaj [] jer tada ga samo zelis koristit, kad se gameMessages minjaju    
    },[gameMessages]);

    useEffect(() => {
        Socket.on("usersInGame", (data) => {
            setUsersInGame(data.users);
        }); 
    },[usersInGame]);

    
    const submit = (event) => {
        console.log(event.target.elements.money);
        var gameMessage = event.target.elements.formMessage.value;
        var money = event.target.elements.money.options;
        var selectedIndex = money.selectedIndex;
        var sendToUser = money[selectedIndex].value;  
        event.target.elements.formMessage.value = null;
        event.target.elements.formMessage.focus();
        event.preventDefault();

        // emit message to the server
        Socket.emit("gameMessage",{username: username, text: gameMessage, otherUser: sendToUser});
    }
    return(
    <div>
        <Container id="gameChat">
            <Row>
                <Col>
                    <Message message={welcomeMessage}></Message>
                    {gameMessages.map(gameMessage => (
                        <Toast>
                        <Toast.Header>
                            <strong className="mr-auto">{gameMessage.text}<img src="https://image.flaticon.com/icons/svg/138/138281.svg"/></strong>
                            <strong>{gameMessage.username} <img src="https://image.flaticon.com/icons/svg/1635/1635581.svg"/> {gameMessage.otherUser}  </strong>
                        </Toast.Header>
                        </Toast>
                    ))}
                </Col>
            </Row>
        </Container>
        <br></br>
        <Form onSubmit={submit}>
            <Row>
                <Col xs="6">
                    <Row>
                        <Col>
                            <Form.Group controlId="formMessage">
                                <Form.Control required name="gameMessage" type="text" pattern="[0-9]*"placeholder="Type amounth of money..." />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="money">
                                <Form.Control required as="select" placeholder="send to">
                                    <option disabled={true}></option>
                                    {usersInGame.map(users => (
                                        <option>{users.username}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row> 
                </Col>
                <Col xs="3">
                    <Button id="sendMoneyButton" variant="outline-primary" type="submit">
                         Send <img src="https://image.flaticon.com/icons/svg/138/138281.svg"/>
                    </Button>
                </Col>
            </Row>
        </Form>
    </div>
    );

}
export default Chat;