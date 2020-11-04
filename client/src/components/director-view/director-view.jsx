import React from 'react';
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import './director-view.scss';
//
export class DirectorView extends React.Comoponent {

  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { director } = this.props;

    if (!director) return <div className="main-view" />;

    return (
      <div>
        <Container>
          <div className="director-view-container">
            <Card style={{ width: '45rem' }} className="director-card">
              <Card.Img variant="top" src={DirectorImage} style={{ maxHeight: 400 }} />
              <Card.Body>
                <Card.Title className="director-name">{director.Name}</Card.Title>
                <Card.Text>Birth: {director.Birth}</Card.Text>
                <Card.Text>{director.Bio}</Card.Text>
              </Card.Body>
              <Link to={"/"}>
                <Button variant="link" className="button director-view-back">Back</Button>
              </Link>
            </Card>
          </div>
        </Container>
        <footer>
                    <p> Created and Design by Michael Menges. </p>
                    <p> Director information from IMDb | Images and Pictures from Unsplash </p>
          </footer>
      </div>
    );
  }
}

DirectorView.propTypes = {
  Director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  })
};