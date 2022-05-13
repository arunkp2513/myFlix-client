import React from 'react'; // Not a part of a component but required to create a component.
import axios from 'axios'; // Used to fetch movies
import { MovieView } from '../movie-view/movie-view';
import { MovieCard } from '../movie-card/movie-card';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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

  componentDidMount() {
    axios
      .get('https://myflix2513.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data,
        });
      })
      .catch(error => {
        console.error.log(error);
      });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  onLoggedIn(user) {
    this.setState({
      user,
    });
  }
  onRegister(register) {
    this.setState({
      register,
    });
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state;
    if (register) {
      return (
        <RegistrationView onRegister={register => this.onRegister(register)} />
      );
    }

    if (!user)
      return (
        <LoginView
          onLoggedIn={user => this.onLoggedIn(user)}
          onRegister={register => this.onRegister(register)}
        />
      );

    if (movies.length === 0) return <div className="main-view" />;

    return (
      <Row className="main-view justify-content-md-center">
        {selectedMovie ? (
          <Col md={8}>
            <MovieView
              movie={selectedMovie}
              onBackClick={newSelectedMovie => {
                this.setSelectedMovie(newSelectedMovie);
              }}
            />
          </Col>
        ) : (
          movies.map(movie => (
            <Col md={3}>
              <MovieCard
                key={movie._id}
                movie={movie}
                onMovieClick={newSelectedMovie => {
                  this.setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))
        )}
      </Row>
    );
  }
}
