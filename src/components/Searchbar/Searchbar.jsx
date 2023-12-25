import { Component } from 'react';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';
import { IconContext } from 'react-icons/lib';

export default class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleForm = event => {
    event.preventDefault();
    const { searchQuery } = this.state;

    if (searchQuery.trim() === '') {
      toast.warn('Please enter your request');
    }

    this.props.onSubmit(searchQuery);
    this.resetSearchQuery();
  };

  onChangeInput = event => {
    event.preventDefault();
    const { value } = event.currentTarget;
    this.setState({
      searchQuery: value,
    });
  };

  resetSearchQuery = () => {
    this.setState({
      searchQuery: '',
    });
  };

  render() {
    return (
      <header className={css.searchBar}>
        <form className={css.searchForm} onSubmit={this.handleForm}>
          <button type="submit" className={css.searchFormButton}>
            <IconContext.Provider
              value={{ style: { height: '25px', width: '25px' } }}
            >
              <FaSearch />
            </IconContext.Provider>
          </button>

          <input
            onChange={this.onChangeInput}
            className={css.searchFormInput}
            value={this.state.searchQuery}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
