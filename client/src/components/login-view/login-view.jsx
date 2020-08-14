import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://oldmyflix-api.herokuapp.com//login', {
        Username: username,
        Password: password
    })
        .then(response => {
            const data = response.data;
            props.onLoggedIn(data);
        })
        .catch(e => {
            console.log('no such user')
        });
};

return (
    <Form>
        <Form.Group controlId="formBasicUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
        </Button>
    </Form>
)