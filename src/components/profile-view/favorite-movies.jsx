import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
export default function FavoriteMovies(props) {
  const { movies, favoriteMovies, currentUser } = props;

  const removeFav = id => {
    axios
      .delete(
        `https://myflix2513.herokuapp.com/users/${currentUser.userName}/movies/${id}`
      )
      .then(() => {
        const newFavourites = favoriteMovies.filter(movie => movie._id != id);
        setFavoriteMovies(newFavourites);
      })
      .catch(e => {
        console.log(e);
      });
  };
  // const favouriteMoviesId = favoriteMovies.map(m => m._id);
  // console.log('ID', favouriteMoviesId);
  const favouriteMoviesList = movies.filter(m => {
    return favoriteMovies.includes(m._id);
  });

  return (
    <div>
      <h2>Favorite Movies:</h2>

      {favouriteMoviesList.map(movies => {
        return (
          <div key={movies.id}>
            <img src={movies.ImagePath} />
            <Link to={`/movies/${movies._id}`}></Link>
            <h2>{movies.Title}</h2>
            <button variant="secondary" onClick={() => removeFav(movies._id)}>
              Remove from your list
            </button>
          </div>
        );
      })}
    </div>
  );
}
