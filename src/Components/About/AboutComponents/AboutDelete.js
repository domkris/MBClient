import React from 'react';

class AboutDelete extends React.Component{
 
    render(){    
        
        return (
            <div>
                <div>
                    <h4 style={{textAlign:"center"}}>How to delete profile</h4>
                    <p>At any time you can delete your profile. Click on the navigation bar ( 3 lines in the top right corner) and click on "Player your_username"
                    </p>
                </div>
                <img className="aboutResponsive" src="help/game2.PNG" alt=""></img>
                <div>
                <p>Here you can click on "Delete Player" and your profile as well as all the games you've created will be deleted.
                    </p>
                </div>
                <img className="aboutResponsive" src="help/deletePlayer.PNG" alt=""></img>
            </div>  
        );    
    }
}
export default AboutDelete;