import React from 'react';
import {useState, useEffect} from 'react';

import {Socket} from '../../Services/Socket'; 
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Message from '../Message/Message';
import Transaction from '../Transaction/Transaction';
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

    useEffect(() => {
        Socket.on("transaction", (newTransaction) => {
            setGameMessages([...gameMessages, newTransaction]);
        }); 
    },[gameMessages]);

    return(
    <div>
        <Container id="gameChat">
            <Row>
                <Col>
                    <Message message={welcomeMessage}></Message>
                    {gameMessages.map((gameMessage, i) => {
                        if(gameMessage.type === "transaction"){
                            return(<Transaction key={i} message={gameMessage}></Transaction>);
                        }else if (gameMessage.type === "message"){
                            return(<Message key={i} message={gameMessage}></Message>);
                        }else if (gameMessage.type === "userStatus"){
                            return(<Message key={i} message={gameMessage}></Message>);
                        }
                        }
                    )}
                </Col>
            </Row>
        </Container>
    </div>
    );

}
export default Chat;