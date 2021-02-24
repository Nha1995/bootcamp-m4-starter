import React, { Component } from "react";
import "./SearchBox.css";
import store from "../../redux/store";

class SearchBox extends Component {
  state = {
    searchContent: "",
  };
  searchLineChangeHandler = (e) => {
    this.setState({ searchContent: e.target.value });
  };
  searchBoxSubmitHandler = (e) => {
    e.preventDefault();
    store.dispatch({
      type: "SEARCH_MOVIES_BY_TITLE",
      payload: {
        title: this.state.searchContent,
      }
    });
  };
  render() {
    const { searchContent } = this.state;

    return (
      <div className="search-box">
        <form
          className="search-box__form"
          onSubmit={(e) => this.searchBoxSubmitHandler(e)}
        >
          <label className="search-box__form-label">
            Искать фильм по названию:
            <input
              value={searchContent}
              type="text"
              className="search-box__form-input"
              placeholder="Например, Shawshank Redemption"
              onChange={this.searchLineChangeHandler}
            />
          </label>
          <button
            type="submit"
            className="search-box__form-submit"
            disabled={!searchContent}
          >
            Искать
          </button>
        </form>
      </div>
    );
  }
}

export default SearchBox;
