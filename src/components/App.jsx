import { Component } from 'react';
import Searchbar from './Searchbar';
import css from './App.module.css';

export class App extends Component {
  state = {
    searchQuery: '',
  };
  render() {
    return (
      <div className={css.appContainer}>
        <Searchbar />
      </div>
    );
  }
}
