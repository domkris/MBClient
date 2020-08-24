import React from 'react';
import {useState, useEffect} from 'react';
import './UserList.css';
import Button from 'react-bootstrap/Button';
import {Socket} from '../../Services/Socket';
import SendMoneyModal from '../Home/Modals/SendMoney';
import User from '../UserList/User';

const UserList = () => {

    var username = sessionStorage.getItem("userData").split(',')[1];
    const [usersInGame, setUsersInGame] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        Socket.on("usersInGame", (data) => {
            setUsersInGame(data.users);
        });
    },[usersInGame]);

    useEffect(()=>{
        Socket.on("usersAfterTransaction", (data) => {
            setUsersInGame(data.users);
        });
    }, []);

    var changeShowModal = () => {
        if(showModal){
            setShowModal(false);
        }else{
            setShowModal(true); 
        }
    };

    return(
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 80px)', gridGap: '10px', gridAutoRows: 'minMax(60px, 60px)'}}>
            {usersInGame.map((user, i) => {
                if(user.username == username){
                    return(
                        <div className="main" key={i}>
                            <User user={user}></User>
                        </div>
                    )
                }else {
                    return(
                        <div className="main" onClick={changeShowModal} key = {i}>
                            <User user={user}></User>
                            <SendMoneyModal showModal={showModal} userClicked={user.username} userAmount={user.amount}></SendMoneyModal>
                        </div>
                    )
                }
                })}
        </div>
    );
}

export default UserList;