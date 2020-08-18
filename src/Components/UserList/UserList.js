import React from 'react';
import {useState, useEffect} from 'react';
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
        <div>
            <h3>Users:</h3>
            {usersInGame.map(user => (
                <div>
                    <p>{user.username}</p>
                    <p>{user.amount}</p>
                </div>
                        ))}
        </div>
    );
}

export default UserList;