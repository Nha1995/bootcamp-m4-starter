import React, { Component } from "react";
import "./ListPage.css";
import MovieItem from "../../components/MovieItem/MovieItem";

class ListPage extends Component {
  state = {
    title: "Новый список",
    imdbID: [],
    movies: [],
  };

  getMoviesByImdbID = (imdbID) => {
    imdbID.forEach(async (id) => {
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?i=${id}&apikey=56e40d17`
        );
        const data = await response.json();
        this.setState({
          movies: [...this.state.movies, data],
        });
      } catch (err) {
        console.log(err);
      }
    });
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ title: data.title, imdbID: data.movies }, () =>
          this.getMoviesByImdbID(this.state.imdbID)
        );
      })
      .catch((err) => console.log(err));
  }

  render() {
    console.log(this.state.movies);
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
