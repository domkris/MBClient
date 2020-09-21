import React from 'react';
import {useState} from 'react';
import {ServerUrl} from '../../../Services/ServerUrl';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import {fetchJoinGameData} from '../../../Utils/utils';

const JoinGame = (props) => {
    const [gameName, setGameName] = useState("");
    const [gamePassword, setGamePassword] = useState("");
    const [showErrorName, setShowErrorName] = useState(false);
    const [showErrorPassword, setShowErrorPassword] = useState(false);

    const handleJoinGameModalClose = () => {
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
            fetchJoinGameData({gameName : gameName, gamePassword: gamePassword})
            .then((data) => {
                if(!data.success)
                {
                    alert("wrong game name or password");
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

      return(
        <div>
            <Modal {...props}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formGameName">
                            <Form.Label>Game name</Form.Label>
                            <Form.Control required name="gameName" type="text" placeholder="Game name.." onChange={change} autoComplete="off"/>
                            {showErrorName ? 
                            <div style={{color: "red"}}>
                                Game name is required
                            </div> : null}
                        </Form.Group>
                        <Form.Group controlId="formGamePassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="gamePassword" type="password" placeholder="Password" onChange={change} autoComplete="off"/>
                            {showErrorPassword ? 
                            <div style={{color: "red"}}>
                                Password is required
                            </div> : null}
                        </Form.Group>
                    </Form>  
                </Modal.Body>
                <Modal.Footer>
                <Button variant="outline-dark" onClick={props.onHide}>
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