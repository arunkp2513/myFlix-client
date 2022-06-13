import React from 'react';

export default function UserInfo({ user }) {
  return (
    <>
      <h4>Your Information:</h4>
      <p> Name : {user.Username} </p>
      <p> E-mail: {user.Email}</p>
    </>
  );
}
