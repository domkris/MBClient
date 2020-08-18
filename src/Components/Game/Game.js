import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
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
            loginRedirect: false
        }
        this.exitGame = this.exitGame.bind(this);
        this.logout = this.logout.bind(this);
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
        }else {
            this.setState({homeRedirect: true});
            this.setState({gameName: sessionStorage.getItem("game")});
            this.setState({username: sessionStorage.getItem("userData").split(",")[1]});
        }
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
            <Container className="GameJumbotron">
                <Jumbotron id="AppJumbotron">
                    <p>
                        <h2>Game: <strong>{sessionStorage.getItem("game").split(",")[1]}</strong></h2>
                    </p>
                    <p>
                        <h3>Player: <strong>{sessionStorage.getItem("userData").split(",")[1]}</strong></h3>
                    </p>  
                </Jumbotron>
            </Container>
            <Container>
                <Row>
                    <Col xs="1"></Col>
                    <Col xs="3">
                        <Button variant="outline-primary" onClick= {this.exitGame}> &#8592; Go Back </Button>{' '}
                    </Col>
                    <Col xs="5"></Col>
                    <Col xs="3">
                        <Button variant="outline-secondary" onClick= {this.logout}>Log out &#9746;</Button>{' '}
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col>
                        <Chat></Chat>
                    </Col>
                    <Col xs="4">
                        <UserList></UserList>
                    </Col>
                </Row>
                <br></br>
            </Container>
     </div>    
    );    
  }
}
export default Game;
//<Button id="exitButton" variant="outline-dark"  onClick= {this.exitGame}>Exit game</Button>
//<Button id="signoutButton" variant="outline-dark"  onClick= {this.register}>Sign Out</Button>