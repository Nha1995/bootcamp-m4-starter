import React, { Component } from "react";
import "./ListPage.css";
import store from "../../redux/store";
import MovieItem from "../../components/MovieItem/MovieItem";

class ListPage extends Component {
  state = {
    title: "Новый список",
    movies: [],
  };
  componentDidMount() {
      const state = store.getState();
      console.log(state);
      this.setState(
        {
          movies: state.cart,
          title: state.cartTitle,
        },
        () => console.log(this.state.title)
      );
  }

  render() {
      console.log(store.getState())
    return (
      <div className="list-page">
        <h1 className="list-page__title">{this.state.title}</h1>
        <ul>
          {this.state.movies ? (
            this.state.movies.map((movie) => (
              <li className="movies__item" key={movie.imdbID}>
                <MovieItem {...movie} />
                <a href={"https://www.imdb.com/title/"+movie.imdbID} target="_blank" rel="noopener noreferrer">{movie.Title} ({movie.Year})</a>
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
