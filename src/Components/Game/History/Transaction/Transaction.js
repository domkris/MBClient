import React from 'react';
import './Transaction.css';
const Transaction = (props) => {

    var username = props.message.username;
    var amount = props.message.text;
    var otherUser = props.message.otherUser;
    var time = props.message.time;
    var type = props.message.type;
    return (
        <div className="transaction">
            {type === "transaction" ?  <div className="transactionImage"></div> : <div className="transactionBankImage"></div>}
            <div className="transactionHeader">
                <div className="transactionTitle">Transaction</div>
                <div className="transactionTime">{time}</div>
            </div>
            {type === "transaction" ? 
            <div className="transactionBody">
                <div className="transactionDetails"> {username} &#8594; {otherUser} ({amount} &#8364;)</div>
            </div> : null }
            {type === "toBankTransaction" ? 
            <div className="transactionBody">
                <div className="transactionDetails"> {username} &#8594; Bank ({amount} &#8364;)</div>
            </div> : null }
            {type === "fromBankTransaction" ? 
            <div className="transactionBody">
                <div className="transactionDetails"> Bank &#8594; {username} ({amount} &#8364;)</div>
            </div> : null }
        </div>   
    );
}

export default Transaction;