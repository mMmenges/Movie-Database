import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
//import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import axios from 'axios';
import './login-view.scss';
import login from './login.jpg';
//import { FormControl } from 'react-bootstrap';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        /* Send a request to the server for authentication */
        axios.post('https://oldmyflix-api.herokuapp.com/login', {
            Username: username,
            Password: password
        })
            .then(response => {
                const data = response.data;
                props.onLoggedIn(data);
            })
            .catch(e => {
                console.log('No such user')
            });
    };

    return (
        <div className="login-view" style={{ backgroundImage: `url(${login})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
        <div className="app-title">
          <h1>myFlix!</h1>
        </div>
        <Form className="login-form">
        
        
        {/*    <Form.Group controlId="formBasicUsername" className="login-item">
                <Form.Label>Username:</Form.Label>
                <FormControl type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username" />
            </Form.Group>

            <FormGroup controlId="formBasicPassword" className="login-item">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" />
            </FormGroup>

            <Form.Group controlId="formBasicCheckbox" className="login-item">
                <Form.Check type="checkbox" label="Check if you are ready for myFlix!" />
            </Form.Group>

            <Button onClick={handleSubmit} variant="danger" type="submit" className="button" >Login</Button>
            <Link to={"/register"}>
                <Button variant="outline-light" className="button">Register</Button>
    </Link> */}
            <Form.Row className="align-items-center">
                <Col xs sm={6} className="loginFormContent">
                    <Form.Group>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                        Login
          </Button>
                    <br />
                    <label>You're not a member yet?</label>
                    <Link to={`/register`}>
                        <Button variant="link"> Sign Up</Button>
                    </Link>
                </Col>
    </Form.Row>
        </Form>
        </div>
    );
}

//LoginView.propTypes = {
//onLoggedIn: PropTypes.func.isRequired,
//};


LoginView.propTypes = {
    user: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired
    }),
    onLoggedIn: PropTypes.func.isRequired,
};


// export default connect(null, {setUser})(LoginView);