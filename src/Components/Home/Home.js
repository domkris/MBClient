import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import CreateGameModal from '../Home/Modals/CreateGame';
import JoinGameModal from '../Home/Modals/JoinGame';
import DeleteAccount from '../Global/Modals/DeleteAccount';
import GameCreated from '../Home/GameCreated/GameCreated';
import {Redirect} from 'react-router-dom';
import {ServerUrl} from '../../Services/ServerUrl';
import {fetchFindGameData, fetchDeleteGameData} from '../../Utils/utils';
import './Home.css';



class Home extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            redirect: false,
            redirectToGame: false,
            gameId: '',
            gamePassword: '',
            foundGames: [],
            showCreateGameModal: false,
            showJoinGameModal: false,
            createGamesDisabled: false,
            showDeleteAccountModal : false
        }
        
        this.logout = this.logout.bind(this);
        this.deleteGame = this.deleteGame.bind(this);
        this.change = this.change.bind(this);
        this.findGame = this.findGame.bind(this);
        this.showButtons = this.showButtons.bind(this);
        this.showCreateGameModal = this.showCreateGameModal.bind(this);
        this.showJoinGameModal = this.showJoinGameModal.bind(this);
        this.showDeleteAccountModal = this.showDeleteAccountModal.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
    }

    handleRedirect(value){
        this.setState({redirectToGame : value})
    }
    showDeleteAccountModal(){
        if(this.state.showDeleteAccountModal){
            this.setState({showDeleteAccountModal : false});
        }else{
            this.setState({showDeleteAccountModal : true});
        }
    }
    showCreateGameModal(){
        if(this.state.showCreateGameModal){
            this.setState({showCreateGameModal : false});
        }else{
            this.setState({showCreateGameModal : true});
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
    deleteGame(i){

        var gameToDeleteId = this.state.foundGames[i]._id;
        fetchDeleteGameData(gameToDeleteId)
        .then((data) => {
        })
        .catch( err => { 
            console.error('error', err);
        }); 

        let newList = this.state.foundGames.filter((game)=>{
            return gameToDeleteId !== game._id;
        });

        // remove from DOM
        this.setState( state => {
            state.foundGames = newList;
            return state;
        });
        this.setState({createGamesDisabled : false})

        alert(`game ${this.state.foundGames[i].name} successfully deleted!`);
    }
    findGame(){
        if(sessionStorage.getItem("userData")){
            fetchFindGameData(sessionStorage.getItem("userData").split(',')[0])
            .then((data) => {
                if(data.success){
                    this.setState({foundGames : data.games})
                    if(this.state.foundGames.length > 2){
                        this.setState({createGamesDisabled : true})
                    }
                }
            });
        }
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
        }else {
            this.setState({redirect: true});
        }
    }
    // componentWillMount(){
    //     if(sessionStorage.getItem("userData")){
    //     }else {
    //         this.setState({redirect: true});
    //     }
    // }
    render(){
        if(this.state.redirect){
            return(<Redirect to="./login"/>);
        }
        if(this.state.redirectToGame){
            return(<Redirect to="./game"/>);
        }
        var username = sessionStorage.getItem("userData");
        if(username){
            username = username.split(',')[1];
        }else{
            return(<Redirect to="./login"/>);
        }
        return(
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="login"><img src="eurocoin_64px.png" alt=""></img>MBank</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        </Nav>
                        <Nav>
                            <Nav.Link href="about">Help</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link onClick= {this.showDeleteAccountModal}>
                                Player <strong>{username}</strong>
                            </Nav.Link>
                            <Nav.Link href="" onClick={this.logout}>Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <p style={{marginTop:"5%"}}>Welcome <strong>{sessionStorage.getItem("userData").split(',')[1]}</strong></p>
                <Container style={{marginTop:"5%"}}>
                    <div className="HomeForm">
                        <Row>
                            <Col>
                            <CreateGameModal show={this.state.showCreateGameModal} handleRedirect={this.handleRedirect} onHide={ () => this.setState({showCreateGameModal : false})}></CreateGameModal>
                            <JoinGameModal show={this.state.showJoinGameModal} handleRedirect={this.handleRedirect} onHide={ () => this.setState({showJoinGameModal : false})}></JoinGameModal>
                            <DeleteAccount show={this.state.showDeleteAccountModal} handleRedirect={this.handleRedirect} onHide={ () => this.setState({showDeleteAccountModal : false})}></DeleteAccount>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button variant="outline-success" onClick= {this.showCreateGameModal} disabled={this.state.createGamesDisabled}>Create Game</Button>
                            </Col>
                            <Col>
                                <Button variant="outline-primary" onClick = {this.showJoinGameModal}>Join Game</Button>
                            </Col>
                        </Row>
                    </div>
                    <br/>
                    {this.state.foundGames.length === 0 ? null :
                        <div className="HomeForm">
                            Games created: {this.state.foundGames.length}
                            {this.state.foundGames.map((game,i)=>{
                                return(
                                    <GameCreated game={game} key={game._id} foundGames={this.state.foundGames} deleteGame={() => this.deleteGame(i)}></GameCreated>
                                );
                            })}
                        </div>
                    }
                    {this.state.createGamesDisabled ? 
                        <div style={{color: "red", marginTop:"2%"}} className="HomeForm">
                            Cannot create more then 3 games!
                        </div> : null
                    }
                </Container>
            </div>
        );
    }
}
export default Home;
