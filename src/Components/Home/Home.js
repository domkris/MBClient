import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CreateGameModal from '../Home/Modals/CreateGame';
import JoinGameModal from '../Home/Modals/JoinGame';
import Jumbotron from 'react-bootstrap/Jumbotron';
import {Redirect} from 'react-router-dom';
import './Home.css';



class Home extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            redirect: false,
            redirectToGame: false,
            gameId: '',
            gamePassword: '',
            foundGame: '',
            showCreateGameModal: false,
            showJoinGameModal: false
        }
        
        this.logout = this.logout.bind(this);
        this.joinGame = this.joinGame.bind(this);
        this.change = this.change.bind(this);
        this.findGame = this.findGame.bind(this);
        this.showButtons = this.showButtons.bind(this);
        this.showCreateGameModal = this.showCreateGameModal.bind(this);
        this.showJoinGameModal = this.showJoinGameModal.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
    }

    handleRedirect(value){
        this.setState({redirectToGame : value})
    }
    showCreateGameModal(){
        if(this.state.showCreateGameModal){
            this.setState({showCreateGameModal : false}, console.log(this.state.showCreateGameModal));
        }else{
            this.setState({showCreateGameModal : true}, console.log(this.state.showCreateGameModal));
        }
    }
    showJoinGameModal(){
        if(this.state.showJoinGameModal){
            this.setState({showJoinGameModal : false});
        }else{
            this.setState({showJoinGameModal : true});
        }
    }
    showButtons(){
        if(this.state.foundGame){
            return true;
        }
    }
    joinGame(){
        var apiUrl = "http://localhost:3002/games/" + this.state.gameId;
        fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            if(data[0].password !== this.state.gamePassword)
            {
                console.log("wrong password");
                // ovdi ogromna greska... upises id vrati se citav objekt ! na temelju samo id-a vrati i id i sifru
            }else {
                sessionStorage.setItem("gameId", data[0]._id);
                this.setState({redirectToGame : true})
            }
        });

    }
    findGame(){
        var apiUrl = "http://localhost:3001/games/" + sessionStorage.getItem("userData").split(',')[0];
        fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            this.setState({foundGame : data})
            console.log(this.state);
        });
    }

    change(e){
        this.setState({[e.target.name]: e.target.value});
    }

    logout(){
        sessionStorage.removeItem("userData");
        this.setState({redirect: true});
    }
    componentDidMount(){
        if(sessionStorage.getItem("userData"))
        {
            this.findGame();
        }
    }
    componentWillMount(){
        if(sessionStorage.getItem("userData")){
        }else {
            this.setState({redirect: true});
        }
    }
    render(){
        if(this.state.redirect){
            return(<Redirect to="./login"/>);
        }
        if(this.state.redirectToGame){
            return(<Redirect to="./game"/>);
        }
        var username = sessionStorage.getItem("userData").split(',')[1]
        return(
            <div>
                 <Container>
                    <Row>
                        <Col>
                            <Jumbotron id="AppJumbotron">
                                <h1>Welcome player: {username}</h1>
                            </Jumbotron>
                        </Col>
                    </Row>
                </Container>
                <Container className="HomeForm">
                    <Row>
                        <Col>
                        <CreateGameModal showModal={this.state.showCreateGameModal} handleRedirect={this.handleRedirect}></CreateGameModal>
                        <JoinGameModal showModal={this.state.showJoinGameModal} handleRedirect={this.handleRedirect}></JoinGameModal>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button variant="outline-success" onClick= {this.showCreateGameModal}>Create Game</Button>
                        </Col>
                        <Col>
                            <Button variant="outline-primary" onClick = {this.showJoinGameModal}>Join Game</Button>
                        </Col>
                        <Col>
                            <Button variant="outline-dark"  onClick= {this.logout}>Logout</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
export default Home;
