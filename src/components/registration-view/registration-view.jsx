import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col, Card, CardGroup } from 'react-bootstrap';
import axios from 'axios';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    props.onRegister(false);
  };

  function handleRegister() {
    axios
      .post('https://myflix2513.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
      })
      .then(res => {
        const data = res.data;
        console.log(data);
        window.open('/', '_self');
      })
      .catch(e => {
        console.log('Error in registering the user');
      });
  }

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Title>Please Register here!</Card.Title>
              <Form>
                <Form.Group>
                  <Form.Label>Username :</Form.Label>
                  <Form.Control
                    input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                    placeholder="Enter Username"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password :</Form.Label>
                  <Form.Control
                    input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    placeholder="Enter Password"
                    minLength="8"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>E-mail :</Form.Label>
                  <Form.Control
                    input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="Enter E-mail"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Birthday : </Form.Label>
                  <Form.Control
                    input
                    type="date"
                    value={birthday}
                    onChange={e => setBirthday(e.target.value)}
                    placeholder="Enter Birthday"
                  />
                </Form.Group>

                <Button
                  variant="primary mr-1"
                  type="submit"
                  onClick={handleRegister}
                >
                  Submit
                </Button>
              </Form>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}
