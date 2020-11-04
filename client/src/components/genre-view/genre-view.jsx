import React from 'react';
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './genre-view.scss';

export class GenreView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  onLogOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.open('/client', '_self');
  }

  render() {
    const { genre } = this.props;

    if (!genre) return <div className="main-view" />;

    return (
      <div>
        <Container className="genre-view-container">
          <Card style={{ width: '45rem' }} className="genre-card">
            <Card.Img variant="top" src={genre.Img} style={{ maxHeight: 400 }} />
            <Card.Body>
              <Card.Title className="genre-name">{genre.Name}</Card.Title>
              <Card.Text>{genre.Description}</Card.Text>
              <Link to={"/"}>
                <Button variant="link" className="button genre-view-back">Back</Button>
              </Link>
            </Card.Body>
          </Card>
        </Container>
        <footer>
            <p> Created and Design by Michael Menges. </p>
            <p> Director information from IMDb | Images and Pictures from Unsplash </p>
        </footer>        
    </div> 
    );
  }
}

GenreView.propTypes = {
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Img: PropTypes.string.isRequired
    })
  };