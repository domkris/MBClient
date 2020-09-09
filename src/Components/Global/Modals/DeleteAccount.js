import React from 'react';
import {ServerUrl} from '../../../Services/ServerUrl';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import {useState, useEffect} from 'react';

const DeleteAccount = (props) => {

    const [isUserDeleted, setIsUserDeleted] = useState(false);
    const [areGamesDeleted, setAreGamesDeleted] = useState(false);
    var username = sessionStorage.getItem("userData").split(',')[1];
    var userId = sessionStorage.getItem("userData").split(',')[0];

    useEffect(() => {
        if(isUserDeleted && areGamesDeleted){
            sessionStorage.removeItem("userData");
            props.handleRedirect(true);
        }
    },[isUserDeleted, areGamesDeleted]);


    const deletePlayer = () => {
            var apiUrl = ServerUrl + "/users/";
            fetch(apiUrl,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({ userId, admin: "true7"})})
            .then((response) => response.json())
            .then((data) => {
                if(data.success){
                    setIsUserDeleted(true);
                }else {
                    setIsUserDeleted(false);
                }
            });      
    }
    const deleteGames = () => {
        var apiUrl = ServerUrl + "/games/delete";
            fetch(apiUrl,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({userId, admin: true})})
            .then((response) => response.json())
            .then((data) => {
                if(data.success){
                    setAreGamesDeleted(true);
                }else {
                    setAreGamesDeleted(false);
                }
            });     

    }
    const deletePlayerAndGames = () => {
        deletePlayer();
        deleteGames();      
    }
    


    return(
    <div>
        <Modal className="modalDeleteAccount" {...props}>
            <Modal.Header closeButton><strong>{username}</strong>
            </Modal.Header>
            <Modal.Body>
                <Form autoComplete="off">
                    
                </Form>
                <Button variant="outline-primary" onClick={deletePlayerAndGames}>
                Delete Player
                </Button> 
            </Modal.Body>
            <Modal.Footer>
            <Button variant="outline-dark" onClick={props.onHide}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
    </div>);
}
export default DeleteAccount;