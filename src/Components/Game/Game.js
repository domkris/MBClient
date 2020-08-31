import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {Socket} from '../../Services/Socket'; 
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Chat from '../Chat/Chat';
import UserList from '../UserList/UserList';
import GetMoneyFromBankModal from '../Home/Modals/GetFromBank';
import SendMoneyToBankModal from '../Home/Modals/SendToBank';
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
            usersInGame: [],
            showModal: false,
            showGetFromBankModal: false
        }
        this.exitGame = this.exitGame.bind(this);
        this.logout = this.logout.bind(this);
        this.submit = this.submit.bind(this);
        this.showModal = this.showModal.bind(this);
        this.showGetFromBankModal = this.showGetFromBankModal.bind(this);
        this.showSendToBankModal = this.showSendToBankModal.bind(this);
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
    showModal(){
        if(this.state.showModal){
            this.setState({showModal : false}, console.log(this.state.showModal));
        }else{
            this.setState({showModal : true}, console.log(this.state.showModal));
        }
    }
    showGetFromBankModal(){
        if(this.state.showGetFromBankModal){
            this.setState({showGetFromBankModal : false}, console.log(this.state.showGetFromBankModal));
        }else{
            this.setState({showGetFromBankModal : true}, console.log(this.state.showGetFromBankModal));
        }
    }

    showSendToBankModal(){
        if(this.state.showSendToBankModal){
            this.setState({showSendToBankModal : false}, console.log(this.state.showSendToBankModal));
        }else{
            this.setState({showSendToBankModal : true}, console.log(this.state.showSendToBankModal));
        }
    }
    
    exitGame(){
        var username = sessionStorage.getItem("userData").split(',')[1];
        Socket.emit("userLeftGame");
        sessionStorage.removeItem("game");
        this.setState({homeRedirect: true});
    }
    logout(){
        var username = sessionStorage.getItem("userData").split(',')[1];
        Socket.emit("userLogOut");
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
        <div>
            <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="login"><img src="eurocoin_64px.png" alt=""></img>MBank</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link href="help">Help</Nav.Link>
                        <Nav.Link>
                            <Button variant="outline-secondary"  onClick= {this.showSendToBankModal}>
                                 Send to Bank
                            </Button>
                        </Nav.Link>
                        <Nav.Link>
                            <Button variant="outline-secondary"  onClick= {this.showGetFromBankModal}>
                                 Get from Bank
                            </Button>
                        </Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link >
                                Player <strong>{sessionStorage.getItem("userData").split(",")[1]}</strong>
                            </Nav.Link>
                            <Nav.Link >
                                Game <strong>{sessionStorage.getItem("game").split(",")[1]}</strong>
                            </Nav.Link>
                            <Nav.Link href="" onClick={this.exitGame}>Exit Game </Nav.Link>
                            <Nav.Link href="" onClick={this.logout}>Log out </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
            </Navbar>
            <div className="GameDiv">
                <div className="gameMainDispayDiv">
                    <div id="chatDiv">
                        <Chat></Chat>
                    </div>
                    <div id="userListDiv">
                        <UserList onClick= {this.showModal}></UserList>
                    </div>
                </div>
            </div>
            <GetMoneyFromBankModal showModal={this.state.showGetFromBankModal}></GetMoneyFromBankModal>
            <SendMoneyToBankModal showModal={this.state.showSendToBankModal}></SendMoneyToBankModal>        
        </div>
    );    
  }
}
export default Game;
//<Button id="exitButton" variant="outline-dark"  onClick= {this.exitGame}>Exit game</Button>
//<Button id="signoutButton" variant="outline-dark"  onClick= {this.register}>Sign Out</Button>