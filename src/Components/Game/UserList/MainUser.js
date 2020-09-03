import React from 'react';
import './MainUser.css';
import Button from 'react-bootstrap/Button';

const MainUser = (props) => {
    var username = props.user.username;
    var amount = props.user.amount;
    return(
        <div className="mainUser">
            <Button variant="light" disabled>
                <div className="playerName"><strong>{username}</strong></div>
                <div className="playerAmount">{amount} &#8364;</div>
            </Button>
        </div>
    );
}
export default MainUser;
