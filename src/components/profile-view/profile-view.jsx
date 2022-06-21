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
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

export function ProfileView(props) {
  const [user, setUser] = useState(props.user);
  const [movies, setMovies] = useState(props.movies);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const token = localStorage.getItem('token');
  const currentUser = localStorage.getItem('user');

  const getUser = () => {
    axios
      .get(`https://myflix2513.herokuapp.com/users/${currentUser}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        setUser(response.data);
        console.log('movies =', response.data);
        setFavoriteMovies(response.data.FavoriteMovies);
      })
      .catch(error => console.error(error));
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
  console.log('favourite', favoriteMovies);
  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <UserInfo user={user} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <UpdateUser user={user} />
              <Button variant="danger" type="submit" onClick={deleteProfile}>
                Delete Profile
              </Button>
              <Link to={`/`}> Back to Movies</Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <FavoriteMovies
        movies={movies}
        favoriteMovies={favoriteMovies}
        currentUser={currentUser}
      />
    </Container>
  );
}
