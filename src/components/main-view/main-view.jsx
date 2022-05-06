import React from 'react'; // Not a part of a component but required to create a component.
import { MovieView } from '../movie-view/movie-view';
// react.component is a template/blueprint for creating new components. 
// export exposes the Mainview component which makes it available for use by other components/modules/files(import it)
// React creates MainView component using the generic React.compnent
import {MovieCard} from '../movie-card/movie-card';
export class MainView extends React.Component {

    constructor(){ // constructor method is used to create component.
        super(); // related to OOP which initilazes the component's state.
        this.state = {
          movies: [
            { _id: 1, Title: 'Inception', Description: 'desc1...', ImagePath: '...'},
            { _id: 2, Title: 'The Shawshank Redemption', Description: 'desc2...', ImagePath: '...'},
            { _id: 3, Title: 'Gladiator', Description: 'desc3...', ImagePath: '...'}
          ],
          selectedMovie : null
        };
     }
      setSelectedMovie(newSelectedMovie){
          this.setState({
              selectedMovie : newSelectedMovie
          });
      }
      render() {
        const { movies, selectedMovie } = this.state;
    
    
        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
    
        return (
          <div className="main-view">
            {selectedMovie
              ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
              : movies.map(movie => (
                <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
              ))
            }
          </div>
        );
      }
    }