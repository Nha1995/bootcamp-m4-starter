import React, { Component } from "react";
import "./Favorites.css";
import store from "../../redux/store";

class Favorites extends Component {
  state = {
    title: "Новый список",
    isTitle: false,
    movies: [],
  };

  changeTitleHandler = (e) => {
    this.setState({ title: e.target.value });
  };

  componentDidMount() {
    store.subscribe(() => {
      const state = store.getState();
      console.log(state);
      this.setState({ movies: state.cart });
    });
  }

  removeItemHandler = (id) => {
    store.dispatch({
      type:"Удалить элемент из корзины",
      payload:{
        imdbID:id,
      }
    })
  }

  render() {
    console.log(this.state.movies);
    return (
      <div className="favorites">
        <input
          value={this.state.title}
          onChange={(e) => this.changeTitleHandler(e)}
          className="favorites__name"
        />

        <ul className="favorites__list">
          {this.state.movies ? (
            this.state.movies.map((item) => (
              <li className="favorites__listItem" key={item.imdbID} >
                {item.Title} {item.Year} <button onClick={()=>this.removeItemHandler(item.imdbID)} className="favorites__delButton">Удалить</button>
              </li>
            ))
          ) : (
            <li></li>
          )}
        </ul>

        <button type="button" className="favorites__save">
          Сохранить список
        </button>
      </div>
    );
  }
}

export default Favorites;
