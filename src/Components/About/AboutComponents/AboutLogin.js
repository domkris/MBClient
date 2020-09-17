import React from 'react';

class AboutLogin extends React.Component{

    render(){    
        
        return (
            <div>
                <div>
                    <h4 style={{textAlign:"center"}}>Creating a profile</h4>
                    <p>For the new players it is required to create a profile. Type your desired username and password and click on "Signup" button.
                    Next time just type your username and password and click on "Login" button.</p>
                </div>
                
                <div>
                    <img className="aboutResponsive" src="help/login1.PNG" alt=""></img>
                    <p style ={{color:"red"}}>Never use real usernames or passwords you already use and do not share any important data like credit card numbers etc.!</p>
                </div>
            </div>       
        );    
    }
}
export default AboutLogin;