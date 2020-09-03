import React from 'react';
import './BankBot.css';
import Button from 'react-bootstrap/Button';

const BankBot = () => {
    return(
        <div className="bankBot">
            <Button id="bankBotButton"variant="outline-warning">
                <div className="playerName"><strong>Bank Bot</strong></div>
            </Button>
        </div>
    );
}
export default BankBot;
