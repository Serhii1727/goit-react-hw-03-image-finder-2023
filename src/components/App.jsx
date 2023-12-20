import { Component } from 'react';
import Searchbar from './Searchbar';
import css from './App.module.css';

export class App extends Component {
  render() {
    return (
      <div className={css.appContainer}>
        <Searchbar />
      </div>
    );
  }
}
