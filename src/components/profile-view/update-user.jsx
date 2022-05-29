import React from 'react';

export default function UpdateUser({ handleSubmit, handleUpdate }) {
  return (
    <form className="profile-form" onSubmit={e => handleSubmit(e)}>
      <h2>Do yo want to update your info?</h2>
      <label>Username:</label>
      <input
        type="text"
        name="Username"
        defaultValue={user.Username}
        onChange={e => handleUpdate(e)}
      />
      <label>Password</label>
      <input
        type="password"
        name="password"
        defaultValue={user.Password}
        onChange={e => handleUpdate(e)}
      />
      <label>Email-address</label>
      <input
        type="email"
        name="email"
        defaultValue={user.Email}
        onChange={e => handleUpdate(e)}
      />
    </form>
  );
}
