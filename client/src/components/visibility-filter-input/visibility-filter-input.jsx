import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { setFilter } from '../../actions/actions';
import './visibility-filter-input.scss';

/**
 * @requires React
 * @requires prop-types 
 * @requires react-redux
 * @requires react-bootstrap/Form
 * @requires ../../actions/actions
 * @requires ./visibility-filter-input.scss
 */

/**
 * exporting the visibility view function to allow users to filter through movies
 * @function VisibilityFilterInput
 * @param {string} props 
 */

function VisibilityFilterInput(props) {
    return (
        <Form.Control
            onChange={e => props.setFilter(e.target.value)}
            value={props.visibilityFilter}
            placeholder='filter'
        />
    );
}

VisibilityFilterInput.propTypes = {
    setFilter: PropTypes.func,
};

export default connect(null, { setFilter })(VisibilityFilterInput);