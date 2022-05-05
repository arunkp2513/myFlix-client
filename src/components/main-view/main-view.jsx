import React from 'react'; // Not a part of a component but required to create a component.
// react.component is a template/blueprint for creating new components. 
// export exposes the Mainview component which makes it available for use by other components/modules/files(import it)
// React creates MainView component using the generic React.compnent
export class MainView extends React.Component {

    constructor(){ // constructor method is used to create component.
        super(); // related to OOP which initilazes the component's state.
        this.state = {
          movies: [
            { _id: 1, Title: 'Inception', Description: 'desc1...', ImagePath: '...'},
            { _id: 2, Title: 'The Shawshank Redemption', Description: 'desc2...', ImagePath: '...'},
            { _id: 3, Title: 'Gladiator', Description: 'desc3...', ImagePath: '...'}
          ]
        }
      }

    render(){
        const movies = this.state.movies;
            if (movies.length === 0) {
                return <div className="main-view"> The list is empty </div>;
            } else {
                return(
                    <div className="main-view"> 
                     {movies.map((movie)=> {
                         return <div>{movie.Title} </div>
                     })}
                     </div>
                );
            }        
         }
        }