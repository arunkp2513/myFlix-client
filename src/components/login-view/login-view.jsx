import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post('https://myflix2513.herokuapp.com/login', {
        Username: username,
        Password: password,
      })
      .then(res => {
        const data = res.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no user found');
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
        <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          onChange={e => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary mr-1" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
      <Button variant="primary" onClick={handleRegister}>
        Register Here!!
      </Button>
    </Form>
  );
}
