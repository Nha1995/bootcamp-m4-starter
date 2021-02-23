import React, { Component } from "react";
import "./ListPage.css";
import store from "../../redux/store";
import MovieItem from "../../components/MovieItem/MovieItem";


class ListPage extends Component {
  state = {
    title: "Новый список",
    imdbID:[],
    movies: [],
  };

  getMoviesByImdbID = (imdbID) => {
    imdbID.forEach((id) => {
      console.log('IDIDID',`http://www.omdbapi.com/?i=${id}&apikey=56e40d17`)
      fetch(`http://www.omdbapi.com/?i=${id}&apikey=56e40d17`)
      .then((response) =>response.json())
      .then((data) =>{
        console.log(data);
        this.setState({
          movies:[...this.state.movies, data]
        })
      })
    })
  }
  
  componentDidMount() { 
    const id = this.props.match.params.id;
    console.log('PROPS ID',this.props.match.params)
    fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`)
    .then((response) =>response.json())
    .then((data) => {
      console.log(data)
      this.setState({title: data.title,imdbID:data.movies}, () => this.getMoviesByImdbID(this.state.imdbID))
    })
    .catch((err) => console.log('BAD URL'))
  }

  render() {
    console.log(this.state.movies)
    return (
      <div className="list-page">
        <h1 className="list-page__title">{this.state.title}</h1>
        <ul>
          {this.state.movies ? (
            this.state.movies.map((movie) => (
              <li className="movies__item" key={movie.imdbID}>
                <MovieItem {...movie} />
                <a
                  href={"https://www.imdb.com/title/" + movie.imdbID}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {movie.Title} ({movie.Year})
                </a>
              </li>
            ))
          ) : (
            <li></li>
          )}
        </ul>
      </div>
    );
  }
}

export default ListPage;
