import React from 'react';

export default function UserInfo({ user }) {
  return (
    <>
      <h2> User : {user.Username} </h2>
      <h2> Email: {user.Email}</h2>
    </>
  );
}
