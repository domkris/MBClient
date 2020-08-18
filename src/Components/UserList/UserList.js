import React from 'react';
import {useState, useEffect} from 'react';
import './UserList.css';
import {Socket} from '../../Services/Socket';

const UserList = () => {

    const [usersInGame, setUsersInGame] = useState([]);

    useEffect(() => {
        Socket.on("usersInGame", (data) => {
            setUsersInGame(data.users);
        });
    },[usersInGame]);

    useEffect(()=>{
        Socket.on("transaction", (data) => {
            setUsersInGame(data.users);
        });
    }, []);

    return(
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 80px)', gridGap: '10px', gridAutoRows: 'minMax(60px, 60px)'}}>
            {usersInGame.map(user => (
                <div className="player">
                    <div><strong>{user.username}</strong></div>
                    <div>{user.amount} &#8364;</div>
                </div>
                        ))}
        </div>
    );
}

export default UserList;