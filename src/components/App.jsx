import { Component } from 'react';
import Searchbar from './Searchbar';
import css from './App.module.css';

export class App extends Component {
  state = {
    searchQuery: '',
  };

  handleSearchForm = searchQuery => {
    this.setState({
      searchQuery,
    });
  };

  render() {
    console.log(this.state);
    return (
      <div className={css.appContainer}>
        <Searchbar onSubmit={this.handleSearchForm} />
      </div>
    );
  }
}
