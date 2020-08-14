import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';

export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;

        return (
            <Card style={{ width: '20rem' }}>
                <Card.Img variant="top" src={movie.ImagePath} />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                    <Link to={`/movies/${movie._id}`}>
                        <Button variant="link">Open</Button>
                    </Link>
                    <Link to={`/movies/director/${movie.Director.Name}`}>
                        <Button variant="link">Director</Button>
                    </Link>
                    <Link to={`/movies/genres/${movie.Genre.Name}`}>
                        <Button variant="link">Genre</Button>
                    </Link>
                </Card.Body>
            </Card>
        );
    }
}