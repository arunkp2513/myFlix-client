import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

import { BrowserRouter as Router, Link } from 'react-router-dom';

export class MovieCard extends React.Component {
  addToFavoriteList(movieId) {
    const currentUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios
      .post(
        `https://myflix2513.herokuapp.com/users/${currentUser}/movies/${movieId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(response => {
        console.log(response.data);
        alert(`The movie was successfully add to your list.`);
      })
      .catch(error => console.error(error));
  }

  render() {
    const { movie } = this.props;

    return (
      <Card>
        <Link to={`/movies/${movie._id}`}>
          <Card.Img variant="top" src={movie.ImagePath} />
        </Link>
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button className="button" variant="outline-primary" size="sm">
              Open
            </Button>
          </Link>
          <Button
            className="button"
            variant="outline-primary"
            size="sm"
            onClick={() => this.addToFavoriteList(movie._id)}
          >
            Add
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
};
