import React from 'react';
import './Transaction.css';
const Transaction = (props) => {

    var username = props.message.username;
    var amount = props.message.text;
    var otherUser = props.message.otherUser;
    var time = props.message.time;
    return (
        <div className="transaction">
            <div className="transactionImage">
            </div>
            <div className="transactionHeader">
                <div className="transactionTitle">Transaction</div>
                <div className="transactionTime">{time}</div>
            </div>
            <div className="transactionBody">
                <div className="transactionDetails"> {username} &#8594; {otherUser} ({amount} &#8364;)</div>
            </div>
        </div>   
    );
}

export default Transaction;