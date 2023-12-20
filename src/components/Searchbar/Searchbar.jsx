import { Component } from 'react';
import { FaSearch } from 'react-icons/fa';
import css from './Searchbar.module.css';
import { IconContext } from 'react-icons/lib';

export default class Searchbar extends Component {
  render() {
    return (
      <header className={css.searchBar}>
        <form className={css.searchForm}>
          <button type="submit" className={css.searchFormButton}>
            <IconContext.Provider
              value={{ style: { height: '25px', width: '25px' } }}
            >
              <FaSearch />
            </IconContext.Provider>
          </button>

          <input
            className={css.searchFormInput}
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
