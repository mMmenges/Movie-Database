import React, { Component } from 'react'
import {MovieView } from '../movie-view/movie-view'

export class MoviesView extends Component {
    render() {
        console.log("movies view")
        return (
            <div>
                {this.props.movies.map((movie, i) => (
                    <MovieView movie={movie} key={i}/>
                ))}
            </div>
        )
    }
}

