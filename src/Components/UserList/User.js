import React from 'react';
import {useState, useEffect} from 'react';
import './User.css';
import Button from 'react-bootstrap/Button';
import {Socket} from '../../Services/Socket';
import SendMoneyModal from '../Home/Modals/SendMoney';

const User = (props) => {
    var userCurrent = sessionStorage.getItem("userData").split(',')[1];
    var username = props.user.username;
    var amount = props.user.amount;
    return(
        <div className="mainUser">
            { username != userCurrent ? 
                <Button variant="outline-dark">
                    <div className="playerName"><strong>{username}</strong></div>
                    <div className="playerAmount">{amount} &#8364;</div>
                </Button> : 
                <Button variant="light" disabled>
                <div className="playerName"><strong>{username}</strong></div>
                <div className="playerAmount">{amount} &#8364;</div>
            </Button>
            }
        </div>
    );
}
export default User;
