import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../../actions/actions';
import {Form, Button, Container} from 'react-bootstrap';
import './profile-update.scss';
import UpdateImage from './profile-update.jpg';

/**
 * @requires react
 * @requires axios
 * @requires prop-types
 * @requires react-router-dom
 * @requires react-redux
 * @requires ../../actions/actions
 * @requires react-bootstrap
 * @requires ./profile-update.scss
 * @requires ./profile-update.jpg
 */

/**
 * exporting the profile update view function to allow users to update their existing profile information
 * @function ProfileUpdate
 * @param {*} props 
 */

export function ProfileUpdate(props) {
    const [username, updateUsername] = useState('');
    const [password, updatePassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, updateBirthday] = useState('');


    const handleUpdate = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        const  userId = localStorage.getItem('user');
        let data =  {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday,
        }

        console.log("data:", data)
        axios.put(`https://oldmyflix-api.herokuapp.com/users/${userId}`,
           data,
            { headers: { Authorization: `Bearer ${token}` } }
        ).then((res) => {
            const data = res.data;
            localStorage.setItem("user", data.Username);
            alert('Your profile was successfully updated.');
            window.open("/client/users/:userId", "_self");
        })
            .catch((e) => {
                console.log(e);
                console.log(e.response.data)
                alert('There was an error updating your profile. Please check all fields have been completed.');
            });
    };

 /**
   * returning the update profile form with the required fields for users to complete in order to update 
   * their information
   */

    return (
        <Container>
           <div className="update-profile" style={{ backgroundImage: `url(${UpdateImage})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                <h2> Update your profile</h2>
                <Form className="profile-form">
                    <Form.Group controlID="formBasicUsername" className="update-item">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" value={username} onChange={e => updateUsername(e.target.value)} placeholder="Update username" autoFocus />
                        <Form.Text className="text-muted">
                            Must be alphanumeric and have a minumum of 5 characters.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicpassword" className="update-item">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" value={password} onChange={e => updatePassword(e.target.value)} placeholder="Update password" />
                        <Form.Text className="text-muted">
                            We recommend your password to be 8-20 characters long.
                        </Form.Text>
                </Form.Group>

                    <Form.Group controlId="formBasicEmail" className="update-item">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control 
                            type="email" 
                            value={email}
                            onChange={e => setEmail(e.target.value)} 
                            placeholder="Update email" />
                    </Form.Group>
                    
                    <Form.Group controlId="formBasicBirthday" className="update-item">
                        <Form.Label>Birthday:</Form.Label>
                        <Form.Control type="data" value={birthday} onChange={e => updateBirthday(e.target.value)} />
                    </Form.Group>

                    <div className="update-footer">
                        <p>We won't ever share your private details with anyone else.</p>

                        <Button onClick={handleUpdate} variant="light" type="submit" className="button" >Submit</Button>
                    <Link to={"/users/:userId"}>
                        <Button variant="outline-light" className="button">Cancel</Button>
                    </Link>
                </div>
            </Form>
        </div>
</Container>
    )
}

/**
 * setting the prop types to the profile update view that are required to update a users profile
 */

ProfileUpdate.props = {
    user: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Birthday: PropTypes.instanceOf(Date).isRequired
    })
};

export default connect(null, { setUser })(ProfileUpdate);

/*
<div class="update-profile" style={{ backgroundImage: `url(${UpdateImage})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                <h2> Update your profile</h2>
                <Form className="profile-form">
                    <Form.Group controlID="formBasicUsername" className="update-item">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" value={username} onChange={e => updateUsername(e.target.value)} placeholder="Update username" autoFocus />
                        <Form.Text className="text-muted">
                            Must be alphanumeric and have a minumum of 5 characters.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicpassword" className="update-item">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" value={password} onChange={e => updatePassword(e.target.value)} placeholder="Update password" />
                        <Form.Text className="text-muted">
                            We recommend your password to be 8-20 characters long.
                        </Form.Text>
                </Form.Group>

                    <Form.Group controlId="formBasicEmail" className="update-item">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" value={email} onchange={e => updateEmail(e.target.value)} placeholder="Update email" />
                    </Form.Group>
                    
                    <Form.Group controlId="formBasicBirthday" className="update-item">
                        <Form.Label>Birthday:</Form.Label>
                        <Form.Control type="data" value={birthday} onChange={e => updateBirthday(e.target.value)} />
                    </Form.Group>

                    <div className="update-footer">
                        <p>We won't ever share your private details with anyone else.</p>

                        <Button onClick={handleUpdate} variant="light" type="submit" className="button" >Submit</Button>
                    <Link to={"/users/:userId"}>
                        <Button variant="outline-light" className="button">Cancel</Button>
                    </Link>
                </div>
            </Form>
        </div>
export default connect(null, { setUser })(ProfileUpdate);
*/