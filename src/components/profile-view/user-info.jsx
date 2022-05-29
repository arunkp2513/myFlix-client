import React from 'react';

export default function UserInfo({ email, name }) {
  return (
    <>
      <p> User : {name} </p>
      <p> Email: {email}</p>
    </>
  );
}
