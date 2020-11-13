import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { setMovies, setUser } from '../../actions/actions';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard} from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { ProfileUpdate } from '../profile-update/profile-update';

import { Link } from 'react-router-dom';
import { Row,Container} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import './main-view.scss';

export class MainView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
             movies: [],
             user: null 
      }; 
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        console.log("component did mount ran")
        // console.log(accessToken)
        if (accessToken !== null) {
            this.setState({
               user: localStorage.getItem('user'),
             }); 
            // this.props.setUser(localStorage.getItem('user'));
            this.getMovies(accessToken);
        }
    }

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });
        // this.props.setUser(authData.user.Username);
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    getMovies(token) {
        // console.log("token", token)
        axios.get('https://oldmyflix-api.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                console.log(response.data)
                this.setState({
                    movies: response.data
                })
                // the redux code being implemented
                // this.props.setMovies(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onLogOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.open('/client', '_self');
    }

    render() {
        // if state not initialized this will throw on runtime
        // before the data is initially loaded
        console.log('state', this.state)
        console.log('props', this.props)
        // now updated for Redux 
        let { movies, user } = this.state;

        // before the movies have loaded
        if (!movies) return <div className="main-view" />;

        if (!user) {
            return (
                <Router basename="/client">
                    <div className="main-view">
                        <Container>
                            <Route exact path="/" render={() => <LoginView onLoggedIn={user => this.onLoggedIn(user)} />} />
                            <Route exact path="/register" render={() => <RegistrationView />} />
                        </Container>
                    </div>
                </Router>
            );
        } else {
            
            return (
                <Router basename="/client">
                    <Navbar collapseOnSelect expand="lg" bg="custom" variant="dark" className="fixed-top navbar-main">
                        <Navbar.Brand as={Link} to="/" className="navbar-brand"></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link as={Link} to="/" className="navbar-link">Home</Nav.Link>
                                <Nav.Link as={Link} to={`/users/${user}`} className="navbar-link">Profile</Nav.Link>
                                <Nav.Link href="https://mmmenges.github.io/portfolio-website" target="_blank" className="navbar-link">My Portfolio</Nav.Link>
                            </Nav>
                            <Button onClick={this.onLogOut} variant="dark" type="submit" className="button log-out-button"> Log Out</Button>
                        </Navbar.Collapse>
                    </Navbar>
                    <div className="main-view">
                        <Switch>
                        {/* <Route exact path="/" render={() => <MoviesList movies={movies} />} /> */}
                        <Route exact path="/" render={() => {
                        return (<Row> {movies.map((m) => <MovieCard  key={m._id} movie={m} />)} </Row>)

                        }}/> 
                                                

                        

                        <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />
                        <Route path="/directors/:name" render={({ match }) => {
                          if (!movies || movies.length === 0) return <div className="main-view" />;
                        return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
                        }} />

                        <Route path="/genres/:name" render={({ match }) => {
                            if (!movies || movies.length === 0) return <div className="main-view" />;
                            return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} />
                        }} />
                        
                        <Route path="/users/:userId/update" render={(props) => <ProfileUpdate user={user} {...props} />} />

                        <Route path="/users/:userId" render={(props) => <ProfileView movies={movies}  {...props} />} />
                        
                        </Switch>
                    </div>
                </Router>
            );
        }
    }
}
let mapStateToProps = (state) => {
    return { movies: state.movies, user: state.user };
};
export default connect(mapStateToProps, { setMovies, setUser })(MainView);