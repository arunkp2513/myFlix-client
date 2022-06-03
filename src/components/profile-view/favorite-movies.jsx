import React from 'react';
import { Link } from 'react-router-dom';

export default function FavoriteMovies({ favouriteMovieList }) {
  return (
    <div>
      <h2>Favorite Movies:</h2>
      {favouriteMovieList.map(movies => {
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
