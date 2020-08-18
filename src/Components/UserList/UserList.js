import React from 'react';
import {useState, useEffect} from 'react';
import {Socket} from '../../Services/Socket';

const UserList = () => {

    var gameAmount = sessionStorage.getItem("game").split(",")[2];
    var player = sessionStorage.getItem("userData").split(",")[1];
    const [playerAmount, setPlayerAmount] = useState(gameAmount);
    const [usersInGame, setUsersInGame] = useState([]);

    useEffect(() => {
        Socket.on("usersInGame", (data) => {
            setUsersInGame(data.users);
            console.log(data);
        });
    },[usersInGame]);

    useEffect(()=>{
        Socket.on("gameMessage", (data) => {
            if(player === data.otherUser){
                setPlayerAmount(data.text);
            }
        });
    }, []);

    return(
        <div>
            <h3>Users:</h3>
            {usersInGame.map(user => (
                <div>
                    <p>{user.username}</p>
                    <p>{playerAmount}</p>
                </div>
                        ))}
        </div>
    );
}

export default UserList;