import React, { Component } from 'react';
import './ListPage.css';
import { Link } from 'react-router-dom';
// import store from "../../redux/store";

class ListPage extends Component {
    state = {
        movies: [
            { title: 'The Godfather', year: 1972, imdbID: 'tt0068646' }
        ]
    }
    // componentDidMount() {
    //     const key = "&apikey=56e40d17";
    //     const id = this.props.match.params;
    //     console.log(id);
    //     // TODO: запрос к сервер на получение списка
    //     const state =store.getState();
    //     console.log(state.searchResult)
    //     const res = fetch(`http://www.omdbapi.com/?s=${state.searchResult}${key}`);
    //     // TODO: запросы к серверу по всем imdbID
    // }
    render() { 
        return (
            <div className="list-page">
                <h1 className="list-page__title">Мой список</h1>
                <ul>
                    {this.state.movies.map((item) => {
                        return (
                            <li key={item.imdbID}>
                                <Link to="/list/:id" target="_blank">{item.title} ({item.year})</Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
 
export default ListPage;