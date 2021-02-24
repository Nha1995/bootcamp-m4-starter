const initialState = {
  searchResult: "",
  cart: [],
  movies: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "SEARCH_MOVIES_BY_TITLE": {
      return {
        searchResult: action.payload.title,
        cart: state.cart,
        movies:state.movies,
      };
    }
    case "ADD_MOVIE_TO_CART": {      
      return {
        searchResult: state.searchResult,
        cart: [...state.cart, action.payload.movie],
        movies:state.movies,
      };
    }
    case "DELETE_MOVIE_FROM_CART": {
      const newCarts = state.cart.filter((item)=> {
        if(item.imdbID !== action.payload.imdbID) {
          return item;
        }
        return null;
      });
      return {
        searchResult: state.searchResult,
        cart: newCarts,
        movies:state.movies,
      }
    }
    case "GET_ID": {
      return {
        searchResult: state.searchResult,
        cart: state.cart,
        movies:state.movies,
        getIdForQuery:action.payload.id,
      }
    }
    default: {
      return state;
    }
  }
}
export default reducer;
