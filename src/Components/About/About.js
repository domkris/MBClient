import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import AboutLogin from './AboutComponents/AboutLogin';
import AboutHome from './AboutComponents/AboutHome';
import AboutGame from './AboutComponents/AboutGame';
import AboutDelete from './AboutComponents/AboutDelete';
import 'bootstrap/dist/css/bootstrap.min.css';
import './About.css';

class About extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            creatingAProfileShow: true,
            creatingAGameShow: false,
            howtoPlayShow: false,
            deletingProfile: false
        }

        this.showCreatingAProfile = this.showCreatingAProfile.bind(this);
        this.showCreatingAGame = this.showCreatingAGame.bind(this);
        this.showHowToPlay = this.showHowToPlay.bind(this);
        this.showDeletingProfile = this.showDeletingProfile.bind(this);
        
    }

    showCreatingAProfile(event){
        this.setState({creatingAProfileShow : true})
        this.setState({creatingAGameShow : false})
        this.setState({howtoPlayShow : false})
        this.setState({deletingProfile : false})
        console.log(this.creatingAProfileShow);
        event.preventDefault();
    }

    showCreatingAGame(event){
        this.setState({creatingAProfileShow : false})
        this.setState({creatingAGameShow : true})
        this.setState({howtoPlayShow : false})
        this.setState({deletingProfile : false})
        event.preventDefault();
    }

    showHowToPlay(event){
        this.setState({creatingAProfileShow : false})
        this.setState({creatingAGameShow : false})
        this.setState({howtoPlayShow : true})
        this.setState({deletingProfile : false})
        event.preventDefault();
    }

    showDeletingProfile(event){
        this.setState({creatingAProfileShow : false})
        this.setState({creatingAGameShow : false})
        this.setState({howtoPlayShow : false})
        this.setState({deletingProfile : true})
        event.preventDefault();
    }

    
    
    
    render(){    
        
        return (
        <div>
            <Navbar bg="light" expand="lg">
            <Navbar.Brand href="login"><img src="eurocoin_64px.png" alt=""></img>MBank</Navbar.Brand>
                <Nav>
                    <Nav.Link href="game">Back</Nav.Link>
                </Nav>
            </Navbar>
            <Container style={{marginTop:"5%"}} className="aboutContainer">
                <div className="aboutWelcome">
                    <h2 style={{textAlign:"center"}}>Welcome to the info page</h2>
                </div>
                <div className="aboutNavigation">
                    <DropdownButton id="dropdown-variants-Info" variant="info" title="Click the category">
                        <Dropdown.Item onClick={this.showCreatingAProfile}>Creating a profile</Dropdown.Item>
                        <Dropdown.Item onClick={this.showCreatingAGame}>Creating a game</Dropdown.Item>
                        <Dropdown.Item onClick={this.showHowToPlay}>How to play</Dropdown.Item>
                        <Dropdown.Item onClick={this.showDeletingProfile}>How to delete profile</Dropdown.Item>
                    </DropdownButton>
                </div>
                <div className="aboutComponents" style={{marginTop:"5%"}}>
                    {this.state.creatingAProfileShow ? <AboutLogin/> : null }
                    {this.state.creatingAGameShow ? <AboutHome/> : null}
                    {this.state.howtoPlayShow ? <AboutGame/> : null }
                    {this.state.deletingProfile ? <AboutDelete/> : null }  
                </div>
                <div style={{height:"10px"}}></div>
            </Container>
            
        </div>      
        );    
    }
}
export default About;
/*

<div className="aboutGame">
                    <img className="aboutResponsive" src="help/game1.PNG" alt=""></img>
                    <img className="aboutResponsive" src="help/game2.PNG" alt=""></img>
                    <img className="aboutResponsive" src="help/game3_other_player_joins.PNG" alt=""></img>
                    <img className="aboutResponsive" src="help/game4_sendMoney_to_otherPlayer.PNG" alt=""></img>
                    <img className="aboutResponsive" src="help/game5_bankTransactions.PNG" alt=""></img>
                    <img className="aboutResponsive" src="help/game6_chat_leavingGame.PNG" alt=""></img>
                </div>
                <div className="aboutDelete">
                    <img className="aboutResponsive" src="help/deletePlayer.PNG" alt=""></img>
                </div>

                */