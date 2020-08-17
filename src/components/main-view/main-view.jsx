import React from 'react';
import axios from 'axios'; //to connect to API
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import {
    Navbar,
    Nav,
    NavDropdown,
    Spinner
} from 'react-bootstrap';
import './main-view.scss';
import { setMovies, setUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

export class MainView extends React.Component {
    constructor() {
        // Call the superclass constructor
        // so React can initialize it
        super();

        // Initialize the state to an empty object so we can destructure it later
        this.state = {
            user: null,
            isRegister: null,
            isLoading: false,
        };
    }
    // One of the "hooks" available in a React Component
    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user'),
            });
            this.getUserData(accessToken);
            this.getMovies(accessToken);
        }
    }

    getMovies(token) {
        this.setState({
            isLoading: true,
        })
        axios.get('https://oldmyflix-api.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.props.setMovies(response.data);
                this.setState({
                    isLoading: false,
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getUserData(token) {
        axios.get('https://oldmyflix-api.herokuapp.com/users/' + localStorage.getItem('user'), {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.props.setUser(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onLoggedIn(authData) {
        this.setState({
            user: authData.user.Username,
        });
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.props.setUser(authData.user);
        this.getMovies(authData.token);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.state = {
            user: null,
        };
        this.props.setMovies([]);
        this.props.setUser({
            Email: null,
            Birthday: null,
            FavouriteMovies: []
        });
        window.open('/client', '_self');
    }

    onRegisterClick() {
        this.setState({
            isRegister: true
        });
    }

    onRegister(user, password) {
        axios.post('https://oldmyflix-api.herokuapp.com/login', {
            Username: user,
            Password: password
        })
            .then(response => {
                const data = response.data;
                this.onLoggedIn(data);
                this.setState({
                    isRegister: false
                });
                window.open('/client', '_self');
            })
            .catch(e => {
                console.log('No such user')
            });
    }

    onDegister() {
        this.setState({
            isLoading: true,
        })
        axios.delete('https://oldmyflix-api.herokuapp.com/users/' + localStorage.getItem('user'))
            .then(response => {
                const data = response.data;
                this.onLoggedOut()
                this.setState({
                    isLoading: false,
                })
            })
            .catch(e => {
                console.log('Error deregistering')
            });
    }

    onAddToFavourites(movieId) {
        let accessToken = localStorage.getItem('token');
        if (accessToken) {
            axios.post(`https://oldmyflix-api.herokuapp.com/users/${this.state.user}/movies/favorites/${movieId}`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            })
                .then(response => {
                    this.props.setUser(response.data);
                })
                .catch(e => {
                    console.log('No such user')
                });
        }
    }

    onRemoveFromFavourites(movieId) {
        let accessToken = localStorage.getItem('token');
        if (accessToken) {
            axios.delete(`https://oldmyflix-api.herokuapp.com/users/${this.state.user}/movies/favorites/${movieId}`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            })
                .then(response => {
                    this.props.setUser(response.data);
                })
                .catch(e => {
                    console.log('No such user')
                });
        }
    }

    onProfileUpdate(user, password, email, birthday) {
        let accessToken = localStorage.getItem('token');
        if (accessToken) {
            axios.put(`https://oldmyflix-api.herokuapp.com/users/${this.state.user}`, {
                Username: user,
                Password: password,
                Email: email,
                Birthday: birthday,
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
                .then(response => {
                    const data = response.data
                    this.props.setUser(data);
                    this.setState({
                        user: data.Username,
                    });
                    localStorage.setItem('user', data.Username);
                    window.open('/client', '_self');
                })
                .catch(e => {
                    console.log('Error updating profile - ', e)
                });
        }
    }

    render() {
        const { movies, userData, visibilityFilter } = this.props;
        const { user, isRegister, isLoading } = this.state;
        const filteredFavoriteMovies = [...new Set(userData.FavoriteMovies)]
        const favouriteMovies = movies.filter(movie => filteredFavoriteMovies.includes(movie._id))
        // add if condition and check if isRegister is true and return RegisterView component
        if (isRegister) return (
            <RegistrationView onRegister={(user, password) => this.onRegister(user, password)} />
        )

        // Before the movies have been loaded
        if (!movies) return <div className="main-view" />;

        return (
            <Router basename="/client">
                <div className="main-view">
                    <Navbar bg="dark" variant="dark" className="header" fixed="top">
                        <Navbar.Brand href="/client">MyFlix</Navbar.Brand>
                        <Nav className="mr-auto" />
                        {!user && (<Nav>
                            <Nav.Link href="/client/register">Sign Up</Nav.Link>
                            <Nav.Link href="/client">Login</Nav.Link>
                        </Nav>)}
                        {
                            user && (
                                <React.Fragment>
                                    <Nav>
                                        <Nav.Link href="/client">Home</Nav.Link>
                                    </Nav>
                                    <Nav>
                                        <Nav.Link href="/client/movies/favourites">My Favorites</Nav.Link>
                                    </Nav>
                                    <NavDropdown title={user}>
                                        <NavDropdown.Item href="/client/profile">Update Profile</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => this.onDegister()}>Deregister</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={() => this.onLoggedOut()}>LogOut</NavDropdown.Item>
                                    </NavDropdown>
                                </React.Fragment>
                            )
                        }
                    </Navbar>
                    <Route exact path="/" render={() => {
                        if (!user) return (
                            <div className="main-view" style={{ margin: '20px' }}>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </div>
                        );
                        return (
                            isLoading ? (
                                <div className="loading-spinner">https://oldmyflix-api.herokuapp.com
                                    <Spinner animation="border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </Spinner>
                                </div>
                            ) : <MoviesList
                                    moviesToShow={movies}
                                    favouriteMovies={filteredFavoriteMovies}
                                    removeFromFavourites={(movieId) => this.onRemoveFromFavourites(movieId)}
                                    addToFavourites={(movieId) => this.onAddToFavourites(movieId)}
                                    visibilityFilter={visibilityFilter}
                                />
                        )
                    }
                    } />
                    <Route path="/register" render={() => <RegistrationView onRegister={(user, password) => this.onRegister(user, password)} />} />
                    <Route
                        path="/movies/:movieId"
                        strict
                        sensitive
                        render={
                            ({ match }) =>
                                movies && match.params.movieId !== 'favourites' && <MovieView movie={movies.find(m => m._id === match.params.movieId)} removeFromFavourites={(movieId) => this.onRemoveFromFavourites(movieId)} addToFavourites={(movieId) => this.onAddToFavourites(movieId)} isFavourite={filteredFavoriteMovies && filteredFavoriteMovies.includes(match.params.movieId)} />}
                    />
                    <Route
                        path="/movies/favourites"
                        strict
                        sensitive
                        render={() => <MoviesList
                            moviesToShow={favouriteMovies}
                            favouriteMovies={filteredFavoriteMovies}
                            removeFromFavourites={(movieId) => this.onRemoveFromFavourites(movieId)}
                            visibilityFilter={visibilityFilter}
                        />} />
                    <Route path="/director/:name" render={({ match }) => <DirectorView directorName={match.params.name} />} />
                    <Route path="/genre/:name" render={({ match }) => <GenreView genreName={match.params.name} />} />
                    <Route path="/profile" render={
                        () =>
                            user && userData.Email && userData.Birthday && <ProfileView
                                username={user}
                                email={userData.Email}
                                birthday={userData.Birthday.split('T')[0]}
                                onProfileUpdate={(user, password, email, birthday) => this.onProfileUpdate(user, password, email, birthday)} />} />
                </div>
            </Router>
        );
    }
}

MainView.propTypes = {
    movies: PropTypes.array,
    userData: PropTypes.shape({
        Username: PropTypes.string,
        Email: PropTypes.string,
        Birthday: PropTypes.string,
        FavoriteMovies: PropTypes.array,
    }),
    visibilityFilter: PropTypes.string
};

let mapStateToProps = state => {
    return {
        movies: state.movies,
        userData: state.user,
        visibilityFilter: state.visibilityFilter,
    }
}

export default connect(mapStateToProps, { setMovies, setUser })(MainView);