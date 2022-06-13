import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

import { Form } from 'react-bootstrap';

export default function UpdateUser(props) {
  const { user } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    axios
      .put(
        `https://myflix2513.herokuapp.com/users/${user.Username}`,
        {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(res => {
        alert('profile Updated');
      })
      .catch(e => {
        console.log(e);
      });
  };
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formUsername">
        <h4>Do yo want to update your info?</h4>
        <p>Please entire all the fields</p>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          name="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email-address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@mail.com"
          required
        />
      </Form.Group>

      <Button variant="warning" onClick={handleSubmit}>
        Update you profile
      </Button>
    </Form>
  );
}
