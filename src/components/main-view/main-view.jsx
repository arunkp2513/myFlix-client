import React from 'react'; // Not a part of a component but required to create a component.
import axios from 'axios'; // Used to fetch movies 
import { MovieView } from '../movie-view/movie-view';
import {MovieCard} from '../movie-card/movie-card';
// react.component is a template/blueprint for creating new components. 
// export exposes the Mainview component which makes it available for use by other components/modules/files(import it)
// React creates MainView component using the generic React.compnent
export class MainView extends React.Component {

    constructor(){ // constructor method is used to create component.
        super(); // related to OOP which initilazes the component's state.
        //This code is executed as soon as component is created.
        this.state = {
          movies: [],
          selectedMovie : null
        };
     }

     componentDidMount(){
         axios.get('https://myflix2513.herokuapp.com/movies')
         .then(response =>{
             this.setState({
                 movies: response.data
             });
         })
         .catch(error => {
             console;error.log(error);
         });
     }


      setSelectedMovie(newSelectedMovie){   
          this.setState({
              selectedMovie : newSelectedMovie
          });
      }
      render() {
        const { movies, selectedMovie } = this.state;
    
    
        if (movies.length === 0) return <div className="main-view" />;
    
        return (
          <div className="main-view">
            {selectedMovie
              ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
              : movies.map(movie => (
                <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }}/>
              ))
            }
          </div>
        );
      }
    }