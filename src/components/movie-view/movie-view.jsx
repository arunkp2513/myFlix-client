import React from 'react';
import { Link } from 'react-router-dom';

import { Button, Col, Container, Row } from 'react-bootstrap/';

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container className="movie-view">
        <Row className="movie-poster">
          <img src={movie.ImagePath} />
        </Row>
        <Row className="movie-title">
          <Col className="label">Title: </Col>
          <Col className="value">{movie.Title}</Col>
        </Row>
        <Row className="movie-description">
          <Col className="label">Description: </Col>
          <Col className="value">{movie.Description}</Col>
        </Row>

        <Row className="Director">
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button className="d-block mt-3" variant="info">
              Director
            </Button>
          </Link>
        </Row>
        <Row className="Genre">
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button className="d-block mt-3" variant="info">
              Genre
            </Button>
          </Link>
        </Row>
        <Button
          className="d-block mt-3"
          onClick={() => {
            onBackClick();
          }}
        >
          Back
        </Button>
      </Container>
    );
  }
}
