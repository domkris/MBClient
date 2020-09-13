import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {Socket} from '../../Services/Socket'; 
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import History from './History/History';
import Chat from './Chat/Chat';
import UserList from './UserList/UserList';
import DeleteAccount from '../Global/Modals/DeleteAccount';
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
            showDeleteAccountModal : false
        }
        this.exitGame = this.exitGame.bind(this);
        this.logout = this.logout.bind(this);
        this.submit = this.submit.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
        this.showDeleteAccountModal = this.showDeleteAccountModal.bind(this);
    }
    submit = (event) => {
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
            this.setState({showModal : false});
        }else{
            this.setState({showModal : true});
        }
    }

    showDeleteAccountModal(){
        if(this.state.showDeleteAccountModal){
            this.setState({showDeleteAccountModal : false});
        }else{
            this.setState({showDeleteAccountModal : true});
        }
    }

    
    exitGame(){
        Socket.emit("userLeftGame");
        sessionStorage.removeItem("game");
        this.setState({homeRedirect: true});
    }
    logout(){
        Socket.emit("userLogOut");
        sessionStorage.removeItem("userData");
        this.setState({loginRedirect: true});
    }
    handleRedirect(){
        Socket.emit("userLogOut");
        sessionStorage.removeItem("game");
        sessionStorage.removeItem("userData");
        this.setState({loginRedirect: true});
    }

    componentDidMount(){

        if(sessionStorage.getItem("game")){
            this.setState({gameName: sessionStorage.getItem("game")});
            this.setState({username: sessionStorage.getItem("userData").split(",")[1]});
        }else {
            this.setState({homeRedirect: true});
        }

        Socket.on("usersInGame", (data) => {
            this.setState({usersInGame: data.users});
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
                        <Nav>
                            <Nav.Link href="about">Help</Nav.Link>
                        </Nav>
                        <Nav className="mr-auto">
                        </Nav>
                        <Nav>
                            <Nav.Link onClick= {this.showDeleteAccountModal}>
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
                    <div id="historyDiv">
                        <History></History>
                    </div>
                    <div id="userListDiv">
                        <UserList onClick= {this.showModal}></UserList>
                    </div>
                    <div>
                        <Chat></Chat>
                    </div>
                    <DeleteAccount show={this.state.showDeleteAccountModal} handleRedirect={this.handleRedirect} onHide={ () => this.setState({showDeleteAccountModal : false})}></DeleteAccount>         
                </div>
            </div>     
        </div>
    );    
  }
}
export default Game;
//<Button id="exitButton" variant="outline-dark"  onClick= {this.exitGame}>Exit game</Button>
//<Button id="signoutButton" variant="outline-dark"  onClick= {this.register}>Sign Out</Button>