import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;

    return (
      <Container className="director-view">
        <Row>
          <Col className="label">Director: </Col>
          <Col className="value">{director.Name}</Col>
        </Row>
        <Row className="mt-3">
          <Col className="label">Bio: </Col>
          <Col className="value">{director.Bio}</Col>
        </Row>
        <Row className="mt-3">
          <Col className="label">Birth: </Col>
          <Col className="value">{director.Birth}</Col>
        </Row>
        <Row className="mt-3">
          <Col className="label">Death: </Col>
          <Col className="value">{director.Death}</Col>
        </Row>
        <Button
          className="d-block mt-3"
          onClick={() => {
            onBackClick(null);
          }}
          variant="warning"
        >
          Back
        </Button>
      </Container>
    );
  }
}
