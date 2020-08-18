import React from 'react';
import {useState, useEffect} from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const CreateGame = (props) => {

    var createdBy = sessionStorage.getItem("userData").split(',')[0];
    const [errorMessage, setErrorMessage] = useState("");
    const [gameName, setGameName] = useState("");
    const [gamePassword, setGamePassword] = useState("");
    const [gameAmount, setGameAmount] = useState(0);
    const [showCreateGameModal, setShowCreateGameModal] = useState(false);
    const [showErrorName, setShowErrorName] = useState(false);
    const [showErrorPassword, setShowErrorPassword] = useState(false);
    const [showErrorAmount, setShowErrorAmount] = useState(false);

    const handleCreateGameModalClose = () => {
        setShowCreateGameModal(false);
        setShowErrorName(false);
        setShowErrorPassword(false);
        setShowErrorAmount(false);
    };
    const handleCreateGameModalShow = () => setShowCreateGameModal(true);
    
    const createGame = () => {
        if(gameName && gamePassword && gameAmount){
            var apiUrl = "http://localhost:3002/games";
            fetch(apiUrl,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({gameName, gamePassword, gameAmount, createdBy})})
            .then((response) => response.json())
            .then((data) => {
                if(data.success){
                    sessionStorage.setItem("game", data.gameData[0]._id + "," + data.gameData[0].name + "," + data.gameData[0].amount);
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
    useEffect(() => {
        setShowCreateGameModal(props.showModal)
        console.log(props.showModal);
      },[props.showModal]);

    return(
    <div>
        <Modal className="modalCreateGame"show={showCreateGameModal} onHide={handleCreateGameModalClose}>
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
                        <Form.Control name="gamePassword" type="password" placeholder="Password"onChange={change}/>
                        {showErrorPassword ? 
                            <div style={{color: "red"}}>
                                Password is required
                            </div> : null}
                    </Form.Group>
                    <Form.Group controlId="formGameAmmount">
                        <Form.Label>Starting ammount</Form.Label>
                        <Form.Control required name="gameAmount" type="text" pattern="[0-9]*" placeholder="Amount"onChange={change}/>
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
            <Button variant="outline-dark" onClick={handleCreateGameModalClose}>
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