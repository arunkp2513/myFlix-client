import React from 'react'; // Not a part of a component but required to create a component.
import axios from 'axios'; // Used to fetch movies

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Routes,
} from 'react-router-dom'; //used to set up router.

import { MovieView } from '../movie-view/movie-view';
import { MovieCard } from '../movie-card/movie-card';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { element } from 'prop-types';
// react.component is a template/blueprint for creating new components.
// export exposes the Mainview component which makes it available for use by other components/modules/files(import it)
// React creates MainView component using the generic React.compnent

export class MainView extends React.Component {
  constructor() {
    // constructor method is used to create component.
    super(); // related to OOP which initilazes the component's state.
    //This code is executed as soon as component is created.
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: null,
    };
  }
  // Makin the login data to be present even after a refresh.
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
      });
      this.getMovies(accessToken);
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }
  getMovies(token) {
    axios
      .get('https://myflix2513.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        this.setState({
          movies: response.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
    });
  }

  onRegister(register) {
    this.setState({
      register,
    });
  }

  render() {
    const { movies, user } = this.state;

    return (
      <Router>
        <Row className="main-view justify-content-md-center">
          <Routes>
            <Route
              path="/"
              element={<LoginView />}
              exact
              render={() => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return movies.map(m => (
                  <Col md={3} key={m._id}>
                    <MovieCard movie={m} />
                  </Col>
                ));
              }}
            />

            <Route
              path="/register"
              element={<RegistrationView />}
              render={() => {
                if (user) return <Redirect to="/" />;
                return (
                  <Col>
                    <RegistrationView />
                  </Col>
                );
              }}
            />

            <Route
              path="/movies/:movieId"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;

                return (
                  <Col md={8}>
                    <MovieView
                      movie={movies.find(m => m._id === match.params.movieId)}
                      onBackClick={history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            <Route
              path="/directors/:name"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={8}>
                    <DirectorView
                      director={
                        movies.find(m => m.Director.Name === match.params.name)
                          .Director
                      }
                      onBackClick={history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            <Route
              path="/genres/:name"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={8}>
                    <GenreView
                      genre={
                        movies.find(m => m.Genre.Name === match.params.name)
                          .Genre
                      }
                      onBackClick={history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            <Route
              path="/users/:username"
              render={({ history, match }) => {
                if (!user)
                  return (
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <ProfileView history={history} movies={movies} user={user} />
                );
              }}
            />
          </Routes>
        </Row>
      </Router>
    );
  }
}
