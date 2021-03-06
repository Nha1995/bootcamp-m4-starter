import React, { Component } from "react";
import MovieItem from "../MovieItem/MovieItem";
import "./Movies.css";
import store from "../../redux/store";

class Movies extends Component {
  state = {
    movies: [],
  };

  addToCartHandler = (movie) => {
    const state = store.getState();
    const isMovie = state.cart.find(item => item.imdbID === movie.imdbID);
    console.log(isMovie)
    isMovie ||
      store.dispatch({
        type: "ADD_MOVIE_TO_CART",
        payload: {
          movie: movie,
        },
      });
  };

  componentDidMount() {
    store.subscribe(() => {
      const key = "&apikey=56e40d17";
      const state = store.getState();
      const getChangeStateMovies = async () => {
        const res = await fetch(
          `http://www.omdbapi.com/?s=${state.searchResult}${key}`
        );
        const data = await res.json();
        this.setState({
          movies: data.Search,
        });
      };
      getChangeStateMovies();
    });
  }

  render() {
    return (
      <ul className="movies">
        {this.state.movies ? (
          this.state.movies.map((movie) => (
            <li className="movies__item" key={movie.imdbID}>
              <MovieItem
                {...movie}
                addToCartHandler={() => this.addToCartHandler(movie)}
              />
            </li>
          ))
        ) : (
          <li></li>
        )}
      </ul>
    );
  }
}

export default Movies;
