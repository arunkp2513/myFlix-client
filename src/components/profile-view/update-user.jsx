import React, { useState } from 'react';

import axios from 'axios';

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
          Username: username,
          Password: password,
          Email: email,
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
    <form className="profile-form">
      <h2>Do yo want to update your info?</h2>
      <p>Please entire all the fields</p>
      <label>Username:</label>
      <input
        type="text"
        name="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <label>Password</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <label>Email-address</label>
      <input
        type="email"
        name="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="your@mail.com"
        required
      />
      <button variant="warning" onClick={handleSubmit}>
        Update you profile
      </button>
    </form>
  );
}
