import React from 'react';
import { connect } from 'react-redux';
//import { Link } from 'react-router-dom';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';
//import Button from 'react-bootstrap/Button';

/**
 * @requires react
 * @requires react-redux 
 * @requires ../visibility-filter-input/visibility-filter-input
 * @requires ../movie-card/movie-card
 */

/**
 * Allowing the movies to be mapped state to props so they can be searched
 * @constant 
 * @param {*} state 
 */



const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

/**
   * function to allow users to log out of the app
   * @function onLogOut
   */

const onLogOut = (e) => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.open('/client', '_self');
};

/**
 * Allowing the movies to be maped state to props so they can be searched
 * @function MoviesList
 * @param {string} props
 */


export function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

/**
   * allowing movies to be filter by name, by genre or by director
   */

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase())
      || m.Director.Name.toLowerCase().includes(visibilityFilter.toLowerCase())
      || m.Genre.Name.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className="main-view" />;

  return <div className="movies-list">
    <VisibilityFilterInput visibilityFilter={visibilityFilter} />
    {filteredMovies.map(m => <MovieCard key={m._id} movie={m} />)}
    <footer>
        <p> Created and Design by Michael Menges. </p>
        <p> Director information from IMDb | Images and Pictures from Unsplash </p>
    </footer>
  </div>;
}
export default connect(mapStateToProps)(MoviesList);