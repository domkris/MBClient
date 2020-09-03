import React from 'react';
import {useState, useEffect} from 'react';
import {Socket} from '../../../../Services/Socket'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './Style/Money.css';

const SendMoneyModal = (props) => {
    
    
    var username = sessionStorage.getItem("userData").split(',')[1];
    const [showModal, setShowModal] = useState(false);
    const [amount, setAmount] = useState([]);

    const handleModalClose = () => {
        setAmount([]);
        setShowModal(false);
    };

    var makeTransaction = (e) =>{
        var money = amount.join('');
        Socket.emit("transaction",{username: username, amountArray: money, otherUser: props.userClicked});
        setAmount([]);
    }
    var changeAmount = (e, input) => {
        if(input === "clear"){
            if(amount.length > 0){
                setAmount(amount.slice(0,-1));
            }
        }else {
            setAmount((state) => [...state, input])
        }
        e.preventDefault();
        e.stopPropagation();
    };
    useEffect(() => {
        setShowModal(props.showModal)
      },[props.showModal]);

    return(
        <div>
            <Modal className="modalSendMoney"show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>&#8364; <strong>{amount}</strong>
                </Modal.Header>
                <Modal.Body>
                   <div className="mainCalc">
                       <Button variant="outline-info" onClick={(e) => {changeAmount(e, "1")}}>1</Button>
                       <Button variant="outline-info" onClick={(e) => {changeAmount(e, "2")}}>2</Button>
                       <Button variant="outline-info" onClick={(e) => {changeAmount(e, "3")}}>3</Button>
                       <Button variant="outline-info" onClick={(e) => {changeAmount(e, "4")}}>4</Button>
                       <Button variant="outline-info" onClick={(e) => {changeAmount(e, "5")}}>5</Button>
                       <Button variant="outline-info" onClick={(e) => {changeAmount(e, "6")}}>6</Button>
                       <Button variant="outline-info" onClick={(e) => {changeAmount(e, "7")}}>7</Button>
                       <Button variant="outline-info" onClick={(e) => {changeAmount(e, "8")}}>8</Button>
                       <Button variant="outline-info" onClick={(e) => {changeAmount(e, "9")}}>9</Button>
                       <Button variant="outline-info" onClick={(e) => {changeAmount(e, "0")}}>0</Button>
                       <Button variant="outline-warning" onClick={(e) => {changeAmount(e, "clear")}}>Clear</Button>

                   </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="outline-danger" onClick={handleModalClose}>
                    Close
                </Button>
                <Button variant="outline-success" onClick={(e)=> makeTransaction(e)}>
                    Send to <strong>{props.userClicked}</strong>
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default SendMoneyModal;