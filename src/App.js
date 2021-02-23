import React from 'react';
import { Route } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import ListPage from './pages/ListPage/ListPage';
import store from './redux/store';



import './reset.css';
import './common.css';

class App extends React.Component {
  state = {
    id:''
  }
  componentDidMount() {
    store.subscribe(() => {
    const state = store.getState();
    this.setState({id:state.getIdForQuery},()=>console.log("APPPP",this.state.id))
  });
}
  render() {
    return (
      <div className="app">
        <Route path="/" exact component={MainPage} />
        <Route path={"/list/:id"} exact component={ListPage} />
      </div>
    );
  }
}

export default App;
