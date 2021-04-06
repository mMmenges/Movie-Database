import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './movie-card.scss';

/**
 * @requires react
 * @requires prop-types
 * @requires react-router-dom
 * @requires react-bootstrap/Card
 * @requires react-bootstrap/Button
 * @requires ./movie-card.scss
 */

export class MovieCard extends React.Component {

  render() {
    // This is given to the <MovieCard/> component by the outer world 
    // which, in this case, is `MainView`, as `MainView` is what’s
    // connected to your database via the movies endpoint of the API
    const { movie } = this.props;

    return (
      <Card key={movie._id} style={{ width: '30rem' }} className="movie-card" >
        <Card.Img variant="top" src={movie.ImagePath} className="movie-card-img" />
        <Card.Body>
          <NavLink to={`/movies/${movie._id}`}>
            <Card.Title className="movie-card-title">{movie.Title + ' - ' + movie.Released}</Card.Title>
          </NavLink>
          <Card.Text style={{ maxHeight: 650 }} className="movie-card-description">{movie.Description}</Card.Text>
          <div>
            <NavLink className="movie-links movie-card-director" to={`/directors/${movie.Director.Name}`}>
            Director Info
            </NavLink>
            <NavLink to={`/genres/${movie.Genre.Name}`}>
              <Button variant="link" className="movie-links movie-card-genre">{movie.Genre.Name}</Button>
            </NavLink>
          </div>
        </Card.Body>
      </Card>
    );
  }
}

/**
 * setting the prop types that are allowed for the movie card
 */

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Released: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
   //   Img: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
     // Bio: PropTypes.string.isRequired,
     // Birth: PropTypes.string.isRequired
    }),
    Staring: PropTypes.array.isRequired,
    Featured: PropTypes.bool.isRequired
  }).isRequired
};