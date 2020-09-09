import React from 'react';
import './GameCreated.css';
import Button from 'react-bootstrap/Button';

const GameCreated = (props) => {

    var name = props.game.name;
    var time = props.game.timeCreated;
    


    var handleDelete = () => {
        props.deleteGame();
    }

    return (
        <div className="gameCreated">
            <div className="gameCreatedHeader">
                <div className="gameCreatedName"><strong>{name}</strong></div>
                <div className="gameCreatedTime"><small>{time}</small></div>
            </div>
            <div className="gameCreatedBody">
                <Button variant="outline-danger" onClick={handleDelete}>Delete</Button>
            </div>
        </div>   
    );
}

export default GameCreated;