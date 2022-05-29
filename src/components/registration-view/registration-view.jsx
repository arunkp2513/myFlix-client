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

  //Declaring hook for each input
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  //Validating user inputs

  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Please enter UserName');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr('Username should be atleast 2 characters');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Please enter a password');
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr('Password should be atleast 6 letters');
      isReq = false;
    }
    return isReq;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios
        .post('https://myflix2513.herokuapp.com/users', {
          Username: username,
          Password: password,
        })
        .then(res => {
          const data = res.data;
          props.onLoggedIn(data);
        })
        .catch(e => {
          console.log('no such user');
        });
    }
  };

  const handleRegister = e => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
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
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username :</Form.Label>
                    <Form.Control
                      input
                      type="text"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      required
                      placeholder="Enter Username"
                    />
                    {usernameErr && <p>{passwordErr}</p>}
                  </Form.Group>

                  <Form.Group controlId="formPassword">
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
                    {passwordErr && <p>{passwordErr}</p>}
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
  };
}
