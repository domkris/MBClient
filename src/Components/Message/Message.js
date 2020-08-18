import React from 'react';
import './Message.css';
const Message = (props) => {

    console.log("Hej " + JSON.stringify(props));
    console.log(JSON.stringify(props.message));
    var userCurrent = props.message.username;
    var text = props.message.text;
    var usertoSent = "Test";
    var time = props.message.time;
    return (
        <div>
            <div className="message">
                <div className="messageHeader">
                    <div className="messageUser">
                        {userCurrent}
                    </div>
                    <div className="messageTime">
                        {time}
                    </div>
                </div>
                <div className="messageBody">
                        {text}
                    
                </div>
            </div>   
        </div>    
    );
}

export default Message;

// sent {text}<img src="https://image.flaticon.com/icons/svg/138/138281.svg"/> to {usertoSent}