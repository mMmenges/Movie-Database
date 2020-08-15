import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import './profile-view.scss';

export function ProfileView(props) {
    const [username, setUsername] = useState(props.username);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(props.email);
    const [birthday, setBirthday] = useState(props.birthday);

    return (
        <Form className="profileForm">
            <Form.Row className="align-items-center">
                <Col xs sm={6} className="profileFormContent">
                    <Form.Group>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="date">
                        <Form.Label>Date of Birth:</Form.Label>
                        <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" onClick={() => props.onProfileUpdate(username, password, email, birthday)}>
                        Submit
          </Button>
                </Col>
            </Form.Row>
        </Form>
    )
}

ProfileView.propTypes = {
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
    onProfileUpdate: PropTypes.func.isRequired
};