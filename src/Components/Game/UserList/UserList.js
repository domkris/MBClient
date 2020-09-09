import React from 'react';
import {useState, useEffect} from 'react';
import {Socket} from '../../../Services/Socket';
import SendMoneyModal from './Modals/SendMoney';
import OtherUser from './OtherUser';
import MainUser from './MainUser';
import BankBot from './BankBot';
import BankTrasactionModal from './Modals/BankTransactionModal';

const UserList = () => {

    var username = sessionStorage.getItem("userData").split(',')[1];
    const [modalId, setModalId] = useState("");
    const [usersInGame, setUsersInGame] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showBankTransactionModal, setShowBankTransactionModal] = useState(false);

    useEffect(() => {
        Socket.on("usersInGame", (data) => {
            setUsersInGame(data.users);
        });
    
        return () => {
            //Socket.off("usersInGame");
        }
    },[usersInGame]);

    useEffect(()=>{
        Socket.on("usersAfterTransaction", (data) => {
            setUsersInGame(data.users);
        });
        
        return () => {
            Socket.off("usersAfterTransaction");
        }
    }, []);

    var changeShowModal = (i) => {
        if(showModal){
            setShowModal(false);
            setModalId("");
        }else{
            setShowModal(true); 
            setModalId(i);
        }
    };

    var changeShowBankTransactionModal = () => {
        setShowBankTransactionModal(!showBankTransactionModal);
    };


    return(
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 80px)', gridGap: '10px', gridAutoRows: 'minMax(60px, 60px)'}}>
            <div onClick={changeShowBankTransactionModal}>
                <BankBot></BankBot>
            </div>    
            {usersInGame.map((user, i) => {
                if(user.username === username){
                    return(
                        <div className="main" key={i}>
                            <MainUser user={user}></MainUser>
                        </div>
                    )
                }else return null
                })
            }
             {usersInGame.map((user, i) => {
                if(user.username === username){
                   return null
                }else {
                    return(
                        <div className="main" onClick={()=>{changeShowModal(i)}} key = {i}>
                            <OtherUser user={user}></OtherUser>
                            <SendMoneyModal showModal={showModal && modalId === i} userClicked={user.username} userAmount={user.amount}></SendMoneyModal>
                        </div>
                    )
                }
                })
            }
            <BankTrasactionModal show={showBankTransactionModal} onHide={ ()=> {setShowBankTransactionModal(false)}}></BankTrasactionModal>
        </div>
    );
}

export default UserList;