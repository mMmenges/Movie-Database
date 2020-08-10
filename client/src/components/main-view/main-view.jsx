import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
    constructor() {
        super();

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
            selectedMovie: movie,
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