import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
// import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
// import { Button } from 'react-bootstrap';


export class MainView extends React.Component {
    constructor() {
        // Call the suopercalss constructor so React can initialize it
        super();

        // Initialize the state to an empty object so we cn destructure it later
        this.state = {
            movies: null,
            selectedMovie: null,
            user: null,
        };
    }
    // One of the "hooks" available in a React Component
    componentDidMount() {
        axios
            .get('https://oldmyflix-api.herokuapp.com/movies')
            .then((response) => {
                // Assign the result to the state
                this.setState({
                    movies: response.data,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onMovieClick(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    onLoggedIn(user) {
        this.setState({
            user,
        });
    }

    render() {
        const { movies, selectedMovie, user } = this.state;
        if (!user)
            return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

        // Before the movies have been loaded
        if (!movies) return <div className="main-view" />;

        return (
            <div className="main-view">
                <Row>
                    {selectedMovie ? (
                        <MovieView movie={selectedMovie} />
                    ) : (
                            movies.map((movie) => (
                                <Col>
                                    <MovieCard
                                        key={movie._id}
                                        movie={movie}
                                        onClick={(movie) => this.onMovieClick(movie)}
                                    />
                                </Col>
                            ))
                        )}
                </Row>
            </div>
        );
    }
}