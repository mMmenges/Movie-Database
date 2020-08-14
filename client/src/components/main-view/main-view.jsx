import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from "react-router-dom";


import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { Button } from 'react-bootstrap';


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
        const { movies, user } = this.state;

        if (!user)
            return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

        // Before the movies have been loaded
        if (!movies) return <div className="main-view" />;

        return (
            <Router>
                <div>
                    <MyNavbar />
                    <Button
                        variant="primary"
                        type="submit"
                        onClick={() => this.onLoggedOut()}
                    >
                        Logout
          </Button>
                    <div className="main-view row">
                        <Route
                            exact
                            path="/"
                            render={() => {
                                if (!user)
                                    return (
                                        <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                                    );
                                return movies.map((m) => <MovieCard key={m._id} movie={m} />);
                            }}
                        />
                        <Route path="/register" render={() => <RegistrationView />} />
                        <Route
                            exact
                            path="/movies/:movieId"
                            render={({ match }) => (
                                <MovieView
                                    movie={movies.find((m) => m._id === match.params.movieId)}
                                />
                            )}
                        />
                        <Route
                            exact
                            path="/genres/:name"
                            render={({ match }) => {
                                if (!movies) return <div className="main-view" />;
                                return (
                                    <GenreView
                                        genre={
                                            movies.find((m) => m.Genre.Name === match.params.name)
                                                .Genre
                                        }
                                    />
                                );
                            }}
                        />
                        <Route
                            exact
                            path="/directors/:name"
                            render={({ match }) => {
                                if (!movies) return <div className="main-view" />;
                                return (
                                    <DirectorView
                                        director={
                                            movies.find((m) => m.Director.Name === match.params.name)
                                                .Director
                                        }
                                    />
                                );
                            }}
                        />
                    </div>
                </div>
            </Router>
        );
    }
}
