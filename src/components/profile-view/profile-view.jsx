import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserInfo from './user-info';
import FavoriteMovies from './favorite-movies';
import UpdateUser from './update-user';

export function ProfileView(props) {
  const [user, setUser] = useState(props.user);

  const [favoriteMoviesList, setFavoriteMoviesList] = useState([]);

  const token = localStorage.getItem('token');
  const currentUser = localStorage.getItem('user');

  const getUser = () => {
    axios
      .get(`https://myflix2513.herokuapp.com/users/${currentUser}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        setUser(response.data);
        setFavoriteMovies(response.data.FavoriteMovies);
      })
      .catch(error => console.error(error));
  };

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .put(
        'https://myflix2513.herokuapp.com/users/${currentUser.userName}',
        user
      )
      .then(res => {
        alert('profile Updated');
      })
      .catch(e => {
        console.log(e);
      });
  };

  const removeFav = id => {
    axios
      .delete(
        `https://myflix2513.herokuapp.com/users/${currentUser.userName}/movies/${id}`
      )
      .then(() => {
        const newFavourites = favoriteMoviesList.filter(
          movie => movie._id != id
        );
        setFavoriteMoviesList(newFavourites);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleUpdate = e => {
    setUser({
      [e.target.name]: e.target.value,
      [e.target.password]: e.target.value,
      [e.target.Email]: e.target.value,
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <UserInfo name={user.name} email={user.email} />
      <FavoriteMovies
        favouriteMovieList={favoriteMoviesList}
        removeFav={removeFav}
      />
      <UpdateUser handleSubmit={handleSubmit} handleUpdate={handleUpdate} />
      <Button variant="danger" type="submit" onClick={deleteProfile}>
        Delete Profile
      </Button>
      <Nav.Link href="/">Back to Movies</Nav.Link>
    </div>
  );
}
