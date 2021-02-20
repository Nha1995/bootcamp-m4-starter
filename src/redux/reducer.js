const initialState = {
  searchResult: "",
  cart: [],
  movies: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "Поиск фильма по названию": {
      return {
        searchResult: action.payload.title,
        cart: [],
      };
    }
    case "Добавить фильм в корзину": {
      for (let i = 0; i < state.cart.length; i++) {
        if(state.cart[i].imdbID == action.payload.movie.imdbID) {
          return state;
        }
      }
      return {
        searchResult: state.searchResult,
        cart: [...state.cart, action.payload.movie],
      };
    }
    case "Удалить элемент из корзины": {
      const newCarts = state.cart.filter((item)=> {
        if(item.imdbID !== action.payload.imdbID) {
          return item;
        }
      })
      return {
        searchResult: state.searchResult,
        cart: newCarts,
      }
    }
    default: {
      return state;
    }
  }
}
export default reducer;
