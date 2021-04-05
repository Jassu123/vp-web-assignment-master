import React from 'react'
import './App.css';

import { addWatchedMovie, add, removeWatchedMovie, getWatchedMovies, getAllMovies } from './index.js';



const GetMoviesComponents =   ({movies}) => {

  
   
  console.log("movies in GetMoviesComponents ", {movies})
    var components = [];
    console.log('daatatat',movies)
      movies.forEach(function(movie) {
        console.log('for each',movie)
        components.push(
          <div className="all">
            <div>
              <img src={movie.movieUrl} height="100px" />
            </div>
            <span>
              <a className="movie-watched" href="#" onClick={function() { addWatchedMovie(movie.tittle, movie.comment, movie.movieUrl) }}>
                {movie.tittle}
              </a>
            </span>
            <br />
            <span>
              {movie.comment}
            </span>
            <br />
            <br />
          </div>
        )
      })
    
      return (<ul>{components.map(elem => <li> {elem}</li>)} </ul>)

}

 function  GetWatchedMoviesComponents({movies}) {

 
    var components = [];
    movies.forEach(function(movie) {
      console.log(movie)
      components.push(movie && (
        <div className="watched">
          <div>
            <img src={movie.movieUrl} height="100px" />
          </div>
          <span>
            <a className="movie-watched" href="#" onClick={function() { removeWatchedMovie(movie.tittle) }}>
              {movie.tittle}
            </a>
          </span>
          <br />
          <span>
            {movie.comment}
          </span>
          <br />
          <br />
        </div>
      ))
    })
  
    return (<ul>{components.map(elem => <li> {elem}</li>)} </ul>)
  
}

  class App extends React.Component {
    
    state = {
      all_movies : [],
      watched_movies: []
    }

    componentDidMount(){
     getAllMovies().then(res => {
       this.setState({all_movies: res.data})
     })
     getWatchedMovies().then(res => {
       this.setState({watched_movies: res.data})
     });
    }
  
  render(){
  return (
    <div className="App">
      <h1>Codest Movies!</h1>
      <h1>Add movie!</h1>
      <b>TITLE:<br /><input type="text" onChange={function(e) { title = e.target.value; }} /></b><br />
      <b>IMAGE URL:<br /><input type="text" onChange={function(e) { image = e.target.value; }} /></b><br />
      <b>COMMENT:<br /><input type="text" onChange={function(e) { comment = e.target.value; }} /></b><br />
      <input type="button" onClick={function(e) { add(title, image, comment); }} value="ADD MOVIE" />

      <h1>Watchlist:</h1>
      <GetMoviesComponents movies={this.state.all_movies}  />

      <h1>Already watched:</h1>
      <GetWatchedMoviesComponents movies = {this.state.watched_movies} />
    </div>
  );
}
}

var title = '';
var image = '';
var comment = '';

export default App;
