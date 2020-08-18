import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {Socket} from '../../Services/Socket'; 
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Chat from '../Chat/Chat';
import UserList from '../UserList/UserList';
import Image from 'react-bootstrap/Image'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Game.css';
class Game extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:'',
            gameName: '',
            homeRedirect: false,
            loginRedirect: false,
            usersInGame: []
        }
        this.exitGame = this.exitGame.bind(this);
        this.logout = this.logout.bind(this);
        this.submit = this.submit.bind(this);
    }
    submit = (event) => {
        console.log(event.target.elements.money);
        var username = sessionStorage.getItem("userData").split(',')[1];
        var gameMessage = event.target.elements.formMessage.value;
        var money = event.target.elements.money.options;
        var selectedIndex = money.selectedIndex;
        var sendToUser = money[selectedIndex].value;  
        event.target.elements.formMessage.value = null;
        event.target.elements.formMessage.focus();
        event.preventDefault();

        // emit message to the server
        Socket.emit("gameMessage",{username: username, text: gameMessage, otherUser: sendToUser});
    }

    
    exitGame(){
        sessionStorage.removeItem("game");
        this.setState({homeRedirect: true});
    }
    logout(){
        sessionStorage.removeItem("userData");
        this.setState({loginRedirect: true});
    }

    // prije je bilo componentWillMount
    componentDidMount(){
        if(sessionStorage.getItem("game")){
            this.setState({gameName: sessionStorage.getItem("game")});
            this.setState({username: sessionStorage.getItem("userData").split(",")[1]});
        }else {
            this.setState({homeRedirect: true});
        }

        Socket.on("usersInGame", (data) => {
            this.setState({usersInGame: data.users});
            console.log(this.state.usersInGame);
        }); 
    }   
  render(){
    if(!sessionStorage.getItem("userData")){
        return(
            <Route>
                <Redirect to={'./login'}/>
            </Route>);
    }
    if(!sessionStorage.getItem("game")){
        return(
            <Route>
                <Redirect to={'./home'}/>
            </Route>);
    }
    if(this.state.homeRedirect){
        return(
            <Route>
                <Redirect to={'./home'}/>
            </Route>);
    } 
    if(this.state.loginRedirect){
        return(
            <Route>
                <Redirect to={'./login'}/>
            </Route>);
    }  

    return (
        <div className="GameDiv">
            <div className="welcomeDiv">
                <p>
                    <h3>
                        Welcome <strong>{sessionStorage.getItem("userData").split(",")[1]}</strong> to the game <strong>{sessionStorage.getItem("game").split(",")[1]}</strong>
                    </h3>
                </p> 
            </div>
            <div className="navigationDiv">
                <Button id="goBackButton" variant="outline-primary" onClick= {this.exitGame}> &#8592; Go Back </Button>{' '}
                <Button id="logoutButton" variant="outline-secondary" onClick= {this.logout}>Log out &#9746;</Button>{' '}
            </div>
            <div className="gameMainDispayDiv">
                <div id="chatDiv">
                    <Chat></Chat>
                </div>
                <div id="userListDiv">
                    <UserList></UserList>
                </div>
            </div>
            <div className="sendMoneyForm">
                <Form onSubmit={this.submit} style={{display: 'grid', boxSizing: 'border-box',gridGap:'1%', gridTemplateColumns: 'repeat(auto-fill, 25%)', gridAutoRows: 'minMax(40px, 40px)'}}>
                    
                    <Form.Group controlId="formMessage" >
                        <Form.Control required name="gameMessage" type="text" pattern="[0-9]*"placeholder="Amount.." />
                    </Form.Group>
                                
                    <Form.Group controlId="money" >
                        <Form.Control required as="select" placeholder="send to">
                            <option disabled={true}></option>
                            {this.state.usersInGame.map(users => (
                                <option>{users.username}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                                
                    <Button id="sendMoneyButton" variant="outline-primary" type="submit">
                        Send <img src="https://image.flaticon.com/icons/svg/138/138281.svg"/>
                    </Button>
                        
                </Form>
            </div>
     </div>    
    );    
  }
}
export default Game;
//<Button id="exitButton" variant="outline-dark"  onClick= {this.exitGame}>Exit game</Button>
//<Button id="signoutButton" variant="outline-dark"  onClick= {this.register}>Sign Out</Button>