import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fetchImage from 'components/services/api';
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
    showLoadMore: false,
  };

  componentDidUpdate(prevProp, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ status: 'pending' });

      if (searchQuery === '') {
        this.setState({ status: 'idle' });
        return;
      }

      fetchImage(searchQuery, page)
        .then(data => {
          const { totalHits, hits } = data;

          const isShow = this.state.page < Math.ceil(totalHits / 12);

          this.setState({ showLoadMore: isShow });

          const images = hits.map(
            ({ id, webformatURL, largeImageURL, tags }) => {
              return { id, webformatURL, largeImageURL, tags };
            }
          );

          if (images.length === 0) {
            this.setState({ status: 'rejected' });
            return;
          }
          this.setState({ status: 'resolved' });
          this.setState(prevState => ({
            images: [...prevState.images, ...images],
          }));
        })
        .catch(error => this.setState({ error }));
    }
  }

  handleSearchForm = searchQuery => {
    this.setState({
      searchQuery,
      images: [],
      page: 1,
      showLoadMore: false,
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
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { showModal, modalData, images, status, searchQuery, showLoadMore } =
      this.state;

    return (
      <div className={css.appContainer}>
        <Searchbar onSubmit={this.handleSearchForm} />
        {images.length > 0 && (
          <ImageGallery images={images} getImageId={this.getImageId} />
        )}
        {status === 'pending' && <Loader />}
        {status === 'rejected' && (
          <h1 className={css.title}>
            There was nothing found for your request "{searchQuery}"
          </h1>
        )}
        {status === 'resolved' && (
          <>
            {showLoadMore ? (
              <Button loadMore={this.loadMore} />
            ) : (
              <p className={css.message}>
                We're sorry, but you've reached the end of search results.
              </p>
            )}
            {showModal && (
              <Modal modalData={modalData} closeModal={this.closeModal} />
            )}
          </>
        )}
        <ToastContainer autoClose={3000} theme="colored" />;
      </div>
    );
  }
}
