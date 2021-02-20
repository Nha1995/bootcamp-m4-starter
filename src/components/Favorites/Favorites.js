import React, { Component } from "react";
import "./Favorites.css";
import store from "../../redux/store";
import { Link } from 'react-router-dom';

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

  saveCartHandler = () => {
    this.setState({ 
      isTitle:!this.state.isTitle
    })
    store.dispatch({
      type:"Название списка",
      payload:{
        title: this.state.title
      }
    })
  }

  render() {
    return (
      <div className="favorites">
        <input
        disabled = {this.state.isTitle}
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

        {this.state.isTitle ? <Link to={'/list/:'+this.state.title.replace(/\s/g, '')} target="_blank" rel="noopener noreferrer">Ссылка на список</Link> : <button onClick={() => this.saveCartHandler()} type="button" className="favorites__save">
          Сохранить список
        </button>}
        

      </div>
    );
  }
}

export default Favorites;
