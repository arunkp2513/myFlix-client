import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
     props.onLoggedIn(username);
  };

  const handleRegister = (e) => {
    e.preventDefault()
    props.onRegister(true);
}

  return (
    <Form>
      <Form.Group controlId='formUsername'>
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" onChange={e => setUsername(e.target.value)} /> 
      </Form.Group> 
      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Button variant="primary mr-1" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
      <Button variant="primary" onClick={handleRegister}>Register Here!!</Button>

    </Form>
  );
}