import React, { Component } from "react";
import "./Favorites.css";
import store from "../../redux/store";
import { Link } from "react-router-dom";

class Favorites extends Component {
  state = {
    title: "Новый список",
    isTitle: false,
    movies: [],
    imdbID: [],
    id: "",
  };

  changeTitleHandler = (e) => {
    this.setState({ title: e.target.value });
  };

  componentDidMount() {
    store.subscribe(() => {
      const state = store.getState();
      let cartArray = [];
      if (state.cart.length > 0) {
        state.cart.forEach((item) => {
          cartArray.push(item.imdbID);
        });
      }
      this.setState(
        {
          imdbID: cartArray,
          id: state.getIdForQuery,
          movies: state.cart,
        },
        () => console.log("favorites STATE", this.state.id)
      );
    });
  }

  saveCartHandler = () => {
    this.setState({
      isTitle: !this.state.isTitle,
    });
    let newCart = {
      title: this.state.title,
      movies: this.state.imdbID,
    };

    fetch("https://acb-api.algoritmika.org/api/movies/list", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newCart),
    })
      .then((response) => response.json())
      .then((data) => {
        store.dispatch({
          type: "GET_ID",
          payload: {
            id: data.id,
          },
        });
      });
  };

  removeItemHandler = (id) => {
    store.dispatch({
      type: "DELETE_MOVIE_FROM_CART",
      payload: {
        imdbID: id,
      },
    });
  };

  render() {
    const id = this.state.id;
    return (
      <div className="favorites">
        <input
          disabled={this.state.isTitle}
          value={this.state.title}
          onChange={(e) => this.changeTitleHandler(e)}
          className="favorites__name"
        />

        <ul className="favorites__list">
          {this.state.movies ? (
            this.state.movies.map((item) => (
              <li className="favorites__listItem" key={item.imdbID}>
                {item.Title} {item.Year}{" "}
                <button
                  onClick={() => this.removeItemHandler(item.imdbID)}
                  className="favorites__delButton"
                >
                  Удалить
                </button>
              </li>
            ))
          ) : (
            <li></li>
          )}
        </ul>

        {this.state.isTitle ? (
          <Link to={`/list/` + id} target="_blank">
            Ссылка на список
          </Link>
        ) : (
          <button
            onClick={() => this.saveCartHandler()}
            type="button"
            className="favorites__save"
          >
            Сохранить список
          </button>
        )}
      </div>
    );
  }
}

export default Favorites;
