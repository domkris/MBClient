import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import {PostData} from '../../Services/PostData';
import {Redirect, Route} from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:'',
            redirect: false,
            loginUser: false,
            showError: false,
            errorMessage: ""
        }
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
        this.hideAfterSomeTime = this.hideAfterSomeTime.bind(this);
    }

    login(){
        if(this.state.username && this.state.password){
            var data = { username: this.state.username, password : this.state.password };
            fetch('http://localhost:3002/users/login', {
                method: 'POST', // or 'PUT'
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
              })
              .then(response => response.json())
              .then(data => {
                console.log('Success:', data);
                if(data.success){
                    sessionStorage.setItem('userData', data.userData._id + "," + data.userData.username);
                    this.setState({redirect : true});
                }
                else{
                    this.setState({showError: true});
                    this.setState({errorMessage: data.message});
                }
              })
              .catch((error) => {
                console.error('Error:', error);
              });
            // console.log("evo ga")
            // console.log(this.state);
            // await PostData('users/login',{ username: this.state.username, password : this.state.password }).then((result) => {
            //     let responseJSON = result;
            //     if(responseJSON.success){
            //         sessionStorage.setItem('userData', responseJSON.userData._id + "," + responseJSON.userData.username);
            //         this.setState({redirect : true});
            //     }
            // });
        }else {
            // upisi da je doslo do greske 
        }
    }
    register(){
        var data = { username: this.state.username, password : this.state.password };
        fetch('http://localhost:3002/users/', {
                method: 'POST', // or 'PUT'
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
              })
              .then(response => response.json())
              .then(data => {
                console.log('Success:', data);
                if(data.success){
                     sessionStorage.setItem('userData', data.userData._id + "," + data.userData.username);
                     this.setState({redirect : true});
                }
                else {
                    this.setState({showError: true});
                    this.setState({errorMessage: data.message});
                }
              })
              .catch((error) => {
                console.error('Error:', error);
              });
    }
    change(e){
        this.setState({[e.target.name]: e.target.value});
        this.setState({showError: false});
    }
    submit(e){
        e.preventDefault();
        if(this.state.loginUser){
            //LOGIN
            this.login();
        }else{
            //REGISTER
            this.register();
        }
    }
    hideAfterSomeTime(){
        setTimeout(() => {
            this.setState({
                showError: false
            });
          }, 2000);
    }
    render(){    
        
        if(this.state.redirect){
            return(
                <Route>
                    <Redirect to={'./home'}/>
                </Route>);
        }

        if(sessionStorage.getItem("userData")){
            return(
                <Route>
                    <Redirect to={'./home'}/>
                </Route>);
        }
        return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Jumbotron id="AppJumbotron">
                            <h1>MonopolBank web</h1>
                            <p>
                            Welcome to a web page made for virtual games cash transactions.
                            </p>
                        </Jumbotron>
                    </Col>
                    </Row>
            </Container>
            <Container className="LoginForm">
               <Row>
                   <Col>
                        <Form onSubmit={this.submit}>
                            <Row>
                                <Col>
                                    <Form.Group controlId="formBasicUsername">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control required name="username" minLength="4" maxLength="20" placeholder="Enter username" onChange= {this.change}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group required controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control required name="password" minLength="4" maxLength="25" type="password" placeholder="Password" onChange= {this.change}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button variant="outline-primary"  onClick= {() => this.setState({loginUser : true})} type="submit">Login</Button>
                                    <Button variant="outline-success"  onClick= {() => this.setState({loginUser : false})} type="submit">SignUp</Button>
                                </Col>
                            </Row>
                        </Form>       
                   </Col>
               </Row>
            </Container>
            <br/>
            { this.state.showError ? 
                <Container className="LoginError">
                    <Row>
                        <Col>
                            <div style={{color: "red"}}>
                                {this.state.errorMessage}
                            </div>
                        </Col>
                    </Row>
                </Container> 
             : null }
        </div>      
        );    
    }
}
export default Login;

// <Button variant="outline-primary"  onClick= {this.login} type="submit">Login</Button>
//<Button variant="outline-success"  onClick= {this.register} type="submit">SignUp</Button>