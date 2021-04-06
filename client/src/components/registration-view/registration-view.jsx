import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './registration-view.scss';
import Register from './register.jpg';

 
/**
 * @requires React
 * @requires axios
 * @requires prop-types 
 * @requires react-router-dom
 * @requires react-bootstrap/Button
 * @requires react-bootstrap/Form
 * @requires ./registration-view.scss
 * @requires ./register.jpg
 */

/**
 * exporting the registration view function to allow new users to register their information
 * @function RegistrationView
 * @param {string} props 
 */

export function RegistrationView(props) {
  const [username, createUsername] = useState('');
  const [password, createPassword] = useState('');
  const [email, createEmail] = useState('');
  const [birthday, createBirthday] = useState('');

/**
 * submitting the register information to be added 
 * @type {*} username
 * @type {*} password
 * @type {*} email
 * @type {*} birthday
 */

  const handleRegister = (e) => {
    e.preventDefault();

    axios.post('https://oldmyflix-api.herokuapp.com/users',
      {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      }).then((res) => {
        const data = res.data;
        console.log(data);
        alert('Congratulations! Your account has been created - you can now login.');
        window.open('/client', '_self');
      }).catch((e) => {
        console.log('registration error');
        alert('There was an error with your registration.');
      });
  };

  /**
   * returning the registration form with the required fields for users to complete
   */

  return (
    <div className="registration-view" style={{ backgroundImage: `url(${Register})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
      <h2>Thanks for signing up!</h2>
      <Form className="registration-form">
        <Form.Group controlId="formBasicUsername" className="registration-item">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" value={username} onChange={e => createUsername(e.target.value)} placeholder="Create username" />
          <Form.Text className="text-muted">
            Must be alphanumeric and have a minimim of 5 characters.
      </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicpassword" className="registration-item">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" value={password} onChange={e => createPassword(e.target.value)} placeholder="Create password" />
          <Form.Text className="text-muted">
            We recommend your password to be 8-20 characters long.
      </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicEmail" className="registration-item">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={e => createEmail(e.target.value)} placeholder="Enter valid email" />
        </Form.Group>

        <Form.Group controlId="formBasicBirthday" className="registration-item">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control type="date" value={birthday} onChange={e => createBirthday(e.target.value)} />
        </Form.Group>

        <div className="register-footer">
          <p>We'll never share your private details with anyone else.</p>

          <Button onClick={handleRegister} variant="light" type="submit" className="button" >Submit</Button>
          <Link to={"/"}>
            <Button variant="outline-light" className="button">Cancel</Button>
          </Link>
        </div>
      </Form>
    </div >
  );
}

/**
 * setting the prop types to the registration view that are required to register
 */

RegistrationView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Birthday: PropTypes.instanceOf(Date).isRequired
  })
};