import React from 'react';
import './OtherUser.css';
import Button from 'react-bootstrap/Button';

const OtherUser = (props) => {
    var userCurrent = sessionStorage.getItem("userData").split(',')[1];
    var username = props.user.username;
    var amount = props.user.amount;
    return(
        <div className="main">
            { username !== userCurrent ? 
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
export default OtherUser;
