import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar';
import css from './App.module.css';
import ImageGallery from './ImageGallery';

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
    const { searchQuery } = this.state;
    return (
      <div className={css.appContainer}>
        <Searchbar onSubmit={this.handleSearchForm} />
        <ImageGallery searchQuery={searchQuery} />
        <ToastContainer autoClose={3000} theme="colored" />
      </div>
    );
  }
}
