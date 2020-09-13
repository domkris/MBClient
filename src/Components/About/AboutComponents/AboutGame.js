import React from 'react';

class AboutGame extends React.Component{

    render(){    
        
        return (
            <div>
                <div>
                    <h4 style={{textAlign:"center"}}>How to play</h4>
                    <p>After joining a game or creating a game, a game screen is shown. Here you can see the welcoming messsage, Bank Bot and other users you can 
                        send money to or chat with. Notice the amount of money player starts with, it was defined when creating a game by choosing "Amount".
                    </p>
                </div>
                <img className="aboutResponsive" src="help/game1.PNG" alt=""></img>
                <div style={{marginTop:"10%"}}>
                    <p>When other players join a game, they are shown on the screen with their amounts as well as the blue notification of them joining.
                    </p>
                </div>
                <img className="aboutResponsive" src="help/game3_other_player_joins.PNG" alt=""></img>
                <div style={{marginTop:"10%"}}>
                    <p>To send money to other players, click on the player, type the amount you want to send and when finished click on Send to "player".
                        Transaction will be shown as a pink notification.
                    </p>
                </div>
                <img className="aboutResponsive" src="help/game4_sendMoney_to_otherPlayer.PNG" alt=""></img>
                <div style={{marginTop:"10%"}}>
                    <p>To send money or receive money from the bank, click on the Bank Bot, type the amount and click on "Get From Bank" or "Send To Bank".
                    </p>
                </div>
                <img className="aboutResponsive" src="help/game5_bankTransactions.PNG" alt=""></img>
                <div style={{marginTop:"10%"}}>
                    <p>To chat with other players type the message in the bottom of the screen "Type to chat.." and click on "Send ". You can also see notifications 
                        when players leave or join the game
                    </p>
                </div>
                <img className="aboutResponsive" src="help/game6_chat_leavingGame.PNG" alt=""></img>
            </div>   
        );    
    }
}
export default AboutGame;