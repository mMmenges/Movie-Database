/**
 * @requires React
 * @requires prop-types
 * @requires react-router-dom
 * @requires react-bootstrap/container
 * @requires react-bootstrap/card
 * @requires ./director-view.scss
 * @requires ./director.jpg
*/

import React from 'react';
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";

// import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import './director-view.scss';
import DirectorImage from './director.jpg';
export class DirectorView extends React.Component {

//  constructor(props) {
//    super(props);
//    this.state = {};
//  }



  render() {
    const { director } = this.props;

/**
 * renderinge the director view component
 */

    // if (!director) return <div className="main-view" />;
console.log(this.props)
    return (
      <div> {director &&
        <Container>
          <div className="director-view-container">
            <Card style={{ width: '45rem' }} className="director-card">
             <Card.Img variant="top" src={DirectorImage} style={{ maxHeight: 400 }} />
              <Card.Body>
                <Card.Title className="director-name">{director.Name}</Card.Title>
                <Card.Text>Birth: {director.Birth}</Card.Text>
                <Card.Text>{director.Bio}</Card.Text>
              </Card.Body>
              <Link to={"/"} className="director-view-back">Back
              </Link>
            </Card>
          </div>
        </Container> }
       
      </div>
    );
  }
}

DirectorView.propTypes = {
  Director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
   // ImagePath: PropTypes.string.isRequired
  })
};