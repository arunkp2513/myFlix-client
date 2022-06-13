import React from 'react';
import { Link } from 'react-router-dom';

export default function FavoriteMovies(props) {
  const { movies, favoriteMovies } = props;

  const favouriteMoviesId = favoriteMovies.map(m => m._id);

  const favouriteMoviesList = movies.filter(m => {
    return favouriteMoviesId.includes(m._id);
  });

  return (
    <div>
      <h2>Favorite Movies:</h2>

      {favouriteMoviesList.map(movies => {
        return (
          <div key={movies.id}>
            <img src={movies.ImagePath} />
            <Link to={`/movies/${movies._id}`}></Link>
            <button variant="secondary" onClick={() => removeFav(movies._id)}>
              Remove from your list
            </button>
          </div>
        );
      })}
    </div>
  );
}
