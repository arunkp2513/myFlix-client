import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios
      .post('https://myflix2513.herokuapp.com/login', {
        Username: username,
        Password: password,
      })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user');
      });
  };

  const handleRegister = e => {
    e.preventDefault();
    props.onRegister(true);
  };

  return (
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary mr-1" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
      <Link to={'/register'}>
        <Button variant="primary" className="custom-btn" type="submit">
          Sign up
        </Button>
      </Link>
    </Form>
  );
}
