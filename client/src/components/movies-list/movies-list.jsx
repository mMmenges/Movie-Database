import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

import { MovieCard } from '../movie-card/movie-card';
import './movies-list.scss';

const mapStateToProps = state => {
    const { visibilityFilter } = state;
    return { visibilityFilter };
};

function MoviesList(props) {
    console.log(props)
    const { moviesToShow, favouriteMovies, visibilityFilter, removeFromFavourites, addToFavourites } = props;
    let filteredMovies = moviesToShow;
    if (!moviesToShow) return <div className="main-view" />;

    if (visibilityFilter !== '') {
        filteredMovies = moviesToShow.filter(m => m.Title.includes(visibilityFilter));
    }

    if (moviesToShow.length === 0) {
        return <h3 className='empty-favourites'>No Movies Found!</h3>
    }

    return <div className="movies-list">
        <div className="movies-filter-wrapper">
            <VisibilityFilterInput visibilityFilter={visibilityFilter} />
        </div>
        <div className="card-deck justify-content-center">
            {filteredMovies.length === 0 && <h3 className='filter-empty-movies'>No Movies Found!</h3>}
            {filteredMovies.map(
                m =>
                    <MovieCard
                        key={m._id}
                        movie={m}
                        removeFromFavourites={(movieId) => removeFromFavourites(movieId)}
                        isFavourite={favouriteMovies && favouriteMovies.includes(m._id)}
                        addToFavourites={(movieId) => addToFavourites(movieId)}
                    />
            )}
        </div>
    </div >;
}

MoviesList.propTypes = {
    moviesToShow: PropTypes.array.isRequired,
    visibilityFilter: PropTypes.string.isRequired,
    removeFromFavourites: PropTypes.func.isRequired,
    addToFavourites: PropTypes.func,
    favouriteMovies: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(MoviesList);