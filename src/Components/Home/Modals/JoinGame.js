import React from 'react';
import {useState, useEffect} from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const JoinGame = (props) => {
    const [gameName, setGameName] = useState("");
    const [gamePassword, setGamePassword] = useState("");
    const [showJoinGameModal, setShowJoinGameModal] = useState(false);
    const [showErrorName, setShowErrorName] = useState(false);
    const [showErrorPassword, setShowErrorPassword] = useState(false);

    const handleJoinGameModalClose = () => {
        setShowJoinGameModal(false);
        setShowErrorName(false);
        setShowErrorPassword(false);
    }

    var change = (e) => {
        if(e.target.name === "gameName"){
            setGameName(e.target.value);
            setShowErrorName(false);
        }
        if(e.target.name === "gamePassword"){
            setGamePassword(e.target.value);
            setShowErrorPassword(false);
        }
    }
    const joinGame = () => {
        if(gameName && gamePassword){ 
            var data = {gameName : gameName, gamePassword: gamePassword}
            var apiUrl = "https://monopolbank.herokuapp.com/games/joinGame";
            fetch(apiUrl, {
                method: 'POST', // or 'PUT'
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if(!data.success)
                {
                    alert("wrong game name or password");
                    // ovdi ogromna greska... upises id vrati se citav objekt ! na temelju samo id-a vrati i id i sifru
                }else {
                    sessionStorage.setItem("game", data.gameData[0]._id + "," + data.gameData[0].name + "," + data.gameData[0].amount);
                    handleJoinGameModalClose();
                    props.handleRedirect(true);
                }
            });   
        }else{
            if(!gameName){
                setShowErrorName(true);
            }
            if(!gamePassword){
                setShowErrorPassword(true);
            }
        }

    }
    useEffect(() => {
        setShowJoinGameModal(props.showModal)
      },[props.showModal]);

      return(
        <div>
            <Modal show={showJoinGameModal} onHide={handleJoinGameModalClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formGameName">
                            <Form.Label>Game name</Form.Label>
                            <Form.Control required name="gameName" type="text" placeholder="Game name.." onChange={change}/>
                            {showErrorName ? 
                            <div style={{color: "red"}}>
                                Game name is required
                            </div> : null}
                        </Form.Group>
                        <Form.Group controlId="formGamePassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="gamePassword" type="password" placeholder="Password" onChange={change}/>
                            {showErrorPassword ? 
                            <div style={{color: "red"}}>
                                Password is required
                            </div> : null}
                        </Form.Group>
                    </Form>  
                </Modal.Body>
                <Modal.Footer>
                <Button variant="outline-dark" onClick={handleJoinGameModalClose}>
                    Close
                </Button>
                <Button variant="outline-primary" onClick={joinGame}>
                    Join Game
                </Button>
                </Modal.Footer>
            </Modal>
            
        </div>);
}
export default JoinGame;