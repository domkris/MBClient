import React from 'react';
import {useState, useEffect} from 'react';

import {Socket} from '../../../Services/Socket'; 
import io from 'socket.io-client';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Message from './Message/Message';
import Transaction from './Transaction/Transaction';
import { ServerUrl } from '../../../Services/ServerUrl';

const History = () => {

    var username = sessionStorage.getItem("userData").split(',')[1]; 
    var game = sessionStorage.getItem("game");
    var gameAmount = sessionStorage.getItem("game").split(",")[2];
    if(game){
        game = game.split(',')[1];  
    } 
    const [welcomeMessage, setWelcomeMessage] = useState("");
    const [gameMessages, setGameMessages] = useState([]);
    const [usersInGame, setUsersInGame] = useState([]);

    useEffect(()=>{
        // separate chats to rooms/games
        Socket.emit("joinRoom", {username, game, gameAmount});

        Socket.on("welcomeMessage", (message) => {
            setWelcomeMessage(message);
        });
        
        return () => {
            Socket.off("welcomeMessage");
        }
    }, []);

    useEffect(()=>{
        Socket.on("usersInGame", (data) => {
            setUsersInGame(data.users);
        });
        return () => {
            Socket.off("usersInGame");
        }
    }, [usersInGame]);

    useEffect(()=>{
            Socket.on("chat", (newChatMessage) => {
                setGameMessages([...gameMessages, newChatMessage]);
            });
            Socket.on("fromBankTransaction", (newFromBankTransaction) => {
                setGameMessages([...gameMessages, newFromBankTransaction]);
            });
            Socket.on("toBankTransaction", (newToBankTransaction) => {
                setGameMessages([...gameMessages, newToBankTransaction]);
            });
            Socket.on("transaction", (newTransaction) => {
                setGameMessages([...gameMessages, newTransaction]);
            });
            Socket.on("gameMessage", (gameMessage) => {
                setGameMessages([...gameMessages, gameMessage]);
            });    
        
        return () => {
            Socket.off("chat");
            Socket.off("fromBankTransaction");
            Socket.off("toBankTransaction");
            Socket.off("transaction");
            Socket.off("gameMessage");
        }
    },[gameMessages, usersInGame]);

    return(
    <div>
        <Container>
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
                        }else if(gameMessage.type === "toBankTransaction"){
                            return(<Transaction key={i} message={gameMessage}></Transaction>);
                        }else if(gameMessage.type === "fromBankTransaction"){
                            return(<Transaction key={i} message={gameMessage}></Transaction>);
                        }else if(gameMessage.type === "chat"){
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
export default History;