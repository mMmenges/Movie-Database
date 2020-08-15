import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Badge from 'react-bootstrap/Badge';
import axios from 'axios';
import './director-view.scss';

export function DirectorView(props) {
    const [director, setDirector] = useState(null);

    useEffect(() => {
        axios.get('https://oldmyflix-api.herokuapp.com/movies/director/movies/director/' + props.directorName)
            .then(response => {
                setDirector(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    if (!director) return null

    return (
        <div className="directorContent">
            <Badge variant="primary">Director</Badge>{' - ' + director.Name}
            <br />
            <Badge variant="primary">Bio</Badge>{' - ' + director.Bio}
            <br />
            <Badge variant="primary">Birth year</Badge>{' - ' + director.Birth}
        </div>
    );
}

DirectorView.propTypes = {
    directorName: PropTypes.string.isRequired
};