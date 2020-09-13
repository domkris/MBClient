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
import './History.css';
const History = () => {

    const HistoryContainerRef = React.createRef();
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
            var date = new Date();
            message.time = date.getHours() + ":" + date.getMinutes();
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
                var date = new Date();
                newChatMessage.time = date.getHours() + ":" + date.getMinutes();
                setGameMessages([...gameMessages, newChatMessage]);
            });
            Socket.on("fromBankTransaction", (newFromBankTransaction) => {
                var date = new Date();
                newFromBankTransaction.time = date.getHours() + ":" + date.getMinutes();
                setGameMessages([...gameMessages, newFromBankTransaction]);
            });
            Socket.on("toBankTransaction", (newToBankTransaction) => {
                var date = new Date();
                newToBankTransaction.time = date.getHours() + ":" + date.getMinutes();
                setGameMessages([...gameMessages, newToBankTransaction]);
            });
            Socket.on("transaction", (newTransaction) => {
                var date = new Date();
                newTransaction.time = date.getHours() + ":" + date.getMinutes();
                setGameMessages([...gameMessages, newTransaction]);
            });
            Socket.on("gameMessage", (gameMessage) => {
                var date = new Date();
                gameMessage.time = date.getHours() + ":" + date.getMinutes();
                setGameMessages([...gameMessages, gameMessage]);
            });
            handleScroll();
        
        return () => {
            Socket.off("chat");
            Socket.off("fromBankTransaction");
            Socket.off("toBankTransaction");
            Socket.off("transaction");
            Socket.off("gameMessage");
        }
    },[gameMessages, usersInGame]);

    const handleScroll = () => {
        const scrollHeight = HistoryContainerRef.current.scrollHeight;
        const height = HistoryContainerRef.current.clientHeight;
        const maxScrollTop = scrollHeight - height;

        HistoryContainerRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }

    return(
    <div>
        <Container className="HistoryContainer" ref={HistoryContainerRef}>
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