import React from 'react';
import axios from 'axios';

class MainView extends React.Component {
    constructor() {
        // Call the superclass constructor
        // so React can initialize it
        super();

        // Initialize the state to an empty object so we can destructure it later
        this.state = {};
    }

    // This overrides the render() method of the superclass
    // No need to call super() though, as it does nothing by default
    render() {
        return (
            <div className="main-view"></div>
        );
    }
}

export class MainView extends React.Component {

    // One of the "hooks" available in a React Component
    componentDidMount() {
        axios.get('<my-api-endpoint/movies>')
            .then(response => {
                // Assign the result to the state
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    render() {
        // If the state isn't initialized, this will throw on runtime
        // before the data is initially loaded
        const { movies } = this.state;

        // Before the movies have been loaded
        if (!movies) return <div className="main-view" />;

        return (
            <div className="main-view">
                {movies.map(movie => (
                    <div className="movie-card" key={movie._id}>{movie.Title}</div>
                ))}
            </div>
        );
    }
}