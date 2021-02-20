import React, { Component } from "react";
import "./MainPage.css";
import Header from "../../components/Header/Header";
import SearchBox from "../../components/SearchBox/SearchBox";
import Movies from "../../components/Movies/Movies";
import Favorites from "../../components/Favorites/Favorites";
// import store from "../../redux/store";

class MainPage extends Component {
//   componentDidMount() {
//     const key = "&apikey=56e40d17";
    
//     store.subscribe(() => {
//         const state = store.getState();
//       console.log("Hmmm", state);
//     });
//     const res = fetch(`http://www.omdbapi.com/?s=${state.searchResult}${key}`);
//   }

  render() {
    return (
      <div className="main-page">
        <Header />
        <main className="main-page__content">
          <section className="main-page__main-section">
            <div className="main-page__search-box">
              <SearchBox />
            </div>
            <div className="main-page__movies">
              <Movies />
            </div>
          </section>
          <aside className="main-page__favorites">
            <Favorites />
          </aside>
        </main>
      </div>
    );
  }
}

export default MainPage;
