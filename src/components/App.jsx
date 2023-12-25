import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fetchImage from 'components/services/api';
import scrollTop from './services/scrollTop';
import Searchbar from './Searchbar';
import Modal from 'components/Modal';
import Button from 'components/Button';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import css from './App.module.css';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    showModal: false,
    modalData: null,
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProp, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery && searchQuery.trim() === '') {
      this.setState({ page: 1, status: 'idle' });
      return;
    }

    if (prevState.searchQuery !== searchQuery) {
      this.setState({ page: 1, status: 'pending' });

      scrollTop();

      fetchImage(searchQuery, page)
        .then(data => {
          const { hits } = data;

          const images = hits.map(
            ({ id, webformatURL, largeImageURL, tags }) => {
              return { id, webformatURL, largeImageURL, tags };
            }
          );

          if (images.length === 0) {
            this.setState({ status: 'rejected' });
            return;
          }

          this.setState({ images, status: 'resolved' });
          this.setState(prevState => ({
            page: prevState.page + 1,
          }));
        })
        .catch(error => this.setState({ error }));
    }
  }

  handleSearchForm = searchQuery => {
    this.setState({
      searchQuery,
    });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  getImageId = id => {
    const currentImage = this.state.images.find(item => item.id === id);
    this.setState({ showModal: true, modalData: currentImage });
  };

  loadMore = () => {
    const { searchQuery, page } = this.state;
    this.setState({ status: 'pending' });

    fetchImage(searchQuery, page)
      .then(data => {
        const { hits } = data;

        const images = hits.map(({ id, webformatURL, largeImageURL, tags }) => {
          return { id, webformatURL, largeImageURL, tags };
        });

        this.setState(prevState => ({
          status: 'resolved',
          page: prevState.page + 1,
          images: [...prevState.images, ...images],
        }));
      })
      .catch(error => this.setState({ error }));
  };

  render() {
    const { showModal, modalData, images, status, searchQuery } = this.state;

    if (status === 'idle') {
      return (
        <div className={css.appContainer}>
          <Searchbar onSubmit={this.handleSearchForm} />
          <ToastContainer autoClose={3000} theme="colored" />;
        </div>
      );
    }

    if (status === 'pending') {
      return (
        <div className={css.appContainer}>
          <Searchbar onSubmit={this.handleSearchForm} />
          {images.length > 1 && (
            <ImageGallery images={images} getImageId={this.getImageId} />
          )}
          <Loader />
          <ToastContainer autoClose={3000} theme="colored" />;
        </div>
      );
    }

    if (status === 'rejected') {
      return (
        <div className={css.appContainer}>
          <Searchbar onSubmit={this.handleSearchForm} />
          <h1 className={css.title}>
            There was nothing found for your request "{searchQuery}"
          </h1>
          <ToastContainer autoClose={3000} theme="colored" />;
        </div>
      );
    }

    if (status === 'resolved') {
      return (
        <div className={css.appContainer}>
          <Searchbar onSubmit={this.handleSearchForm} />
          <ImageGallery images={images} getImageId={this.getImageId} />;
          {images.length >= 1 && <Button loadMore={this.loadMore} />}
          {showModal && (
            <Modal modalData={modalData} closeModal={this.closeModal} />
          )}
          <ToastContainer autoClose={3000} theme="colored" />;
        </div>
      );
    }
  }
}
