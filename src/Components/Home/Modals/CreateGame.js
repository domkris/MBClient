import React from 'react';
import {useState} from 'react';
import {ServerUrl} from '../../../Services/ServerUrl';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import {fetchCreateGameData} from '../../../Utils/utils';
const CreateGame = (props) => {

    var createdBy = sessionStorage.getItem("userData").split(',')[0];
    const [errorMessage, setErrorMessage] = useState("");
    const [gameName, setGameName] = useState("");
    const [gamePassword, setGamePassword] = useState("");
    const [gameAmount, setGameAmount] = useState(0);
    const [showErrorName, setShowErrorName] = useState(false);
    const [showErrorPassword, setShowErrorPassword] = useState(false);
    const [showErrorAmount, setShowErrorAmount] = useState(false);

    const handleCreateGameModalClose = () => {
        setShowErrorName(false);
        setShowErrorPassword(false);
        setShowErrorAmount(false);
    };
    
    const createGame = () => {
        if(gameName && gamePassword && gameAmount){
            fetchCreateGameData({gameName, gamePassword, gameAmount, createdBy})
            .then((data) => {
                if(data.success){
                    sessionStorage.setItem("game", data.gameData._id + "," + data.gameData.name + "," + data.gameData.amount);
                    handleCreateGameModalClose();
                    props.handleRedirect(true);
                }else{
                    setErrorMessage(data.message);
                }
            });
        }else {
            if(!gameName){
                setShowErrorName(true);
            }
            if(!gamePassword){
                setShowErrorPassword(true);
            }
            if(!gameAmount){
                setShowErrorAmount(true);
            }
        }
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
        if(e.target.name === "gameAmount"){
            setGameAmount(e.target.value);
            setShowErrorAmount(false);
        }
    }

    return(
    <div>
        <Modal className="modalCreateGame" {...props}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <Form autoComplete="off">
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
                        <Form.Control name="gamePassword" type="password" placeholder="Password"onChange={change} autoComplete="off"/>
                        {showErrorPassword ? 
                            <div style={{color: "red"}}>
                                Password is required
                            </div> : null}
                    </Form.Group>
                    <Form.Group controlId="formGameAmmount">
                        <Form.Label>Starting amount</Form.Label>
                        <Form.Control required name="gameAmount" type="text" pattern="[0-9]*" placeholder="Amount"onChange={change} autoComplete="off"/>
                        {showErrorAmount ? 
                            <div style={{color: "red"}}>
                                Game amount is required
                            </div> : null}
                    </Form.Group>
                </Form> 
                {errorMessage ? 
                    <div style={{color: "red"}}>
                        {errorMessage}
                    </div> : null
                }  
            </Modal.Body>
            <Modal.Footer>
            <Button variant="outline-dark" onClick={props.onHide}>
                Close
            </Button>
            <Button variant="outline-primary" onClick={createGame}>
                Create
            </Button>
            </Modal.Footer>
        </Modal>
    </div>);
}
export default CreateGame;