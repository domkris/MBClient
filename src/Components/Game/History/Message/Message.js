import React from 'react';
import './Message.css';
const Message = (props) => {
    var userCurrent = props.message.username;
    var text = props.message.text;
    var time = props.message.time;
    var type = props.message.type;

    return (
        <div className="message">
            {type === "userStatus" ? <div className="messageImageUserJoined"></div> : null}
            {type === "message" ? <div className="messageImage"></div> : null}
            {type === "chat" ? <div className="messageChat"></div> : null}
            <div className="messageHeader">
                <div className="messageTitle">{userCurrent}</div>
                <div className="messageTime">{time}</div>
            </div>
            <div className="messageBody">
                    {text}
            </div>
        </div>   
    );
    
}

export default Message;
