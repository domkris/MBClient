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

    return(
    <div>
        <Container id="gameChat">
            <Row>
                <Col>
                    <Message message={welcomeMessage}></Message>
                    {gameMessages.map(gameMessage => (
                        <Message message={gameMessage}></Message>
                    ))}
                </Col>
            </Row>
        </Container>
    </div>
    );

}
export default Chat;