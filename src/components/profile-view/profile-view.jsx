import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link, Nav } from 'react-router-dom';
import UserInfo from './user-info';
import FavoriteMovies from './favorite-movies';
import UpdateUser from './update-user';
import { setUser, updateUser } from '../../actions/actions';
import { connect } from 'react-redux';

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
        setFavoriteMoviesList(response.data.FavoriteMovies);
      })
      .catch(error => console.error(error));
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

  useEffect(() => {
    getUser();
  }, []);

  const deleteProfile = () => {
    axios
      .delete(`https://myflix2513.herokuapp.com/users/${currentUser}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert(`The account ${user.Username} was successfully deleted.`);
        localStorage.clear();
        window.open('/register', '_self');
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <UserInfo user={user} />
      <FavoriteMovies
        favouriteMovieList={favoriteMoviesList}
        removeFav={removeFav}
      />
      <UpdateUser user={user} />
      <Button variant="danger" type="submit" onClick={deleteProfile}>
        Delete Profile
      </Button>
      <Link to={`/`}> Back to Movies</Link>
    </div>
  );
}
