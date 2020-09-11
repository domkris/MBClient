import React from 'react';

class AboutHome extends React.Component{
    constructor(props){
        super(props);  
    }

    render(){    
        
        return (
            <div>
                <div>
                    <h4 style={{textAlign:"center"}}>Creating a game</h4>
                    <p>After "Log In" or "Sign Up" player can create a game clicking on "Create Game" button, or join an existing game
                        clicking on "Join Game" button. When creating a game, player has to choose game name, game password and amount of money that all players 
                        in the game start with. Players can also see games they've created and delete those as well.
                    </p>
                </div>
                <img className="aboutResponsive" src="help/home1.PNG" alt=""></img>
                <p style ={{color:"red"}}>Maximum of 3 games can be created per player.</p>
            </div>    
        );    
    }
}
export default AboutHome;