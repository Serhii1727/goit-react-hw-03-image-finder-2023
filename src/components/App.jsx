import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { BallTriangle } from 'react-loader-spinner';
import fetchImage from 'components/api/api';
import Searchbar from './Searchbar';
import Modal from 'components/Modal';
import Button from 'components/Button';
import ImageGallery from './ImageGallery';
import css from './App.module.css';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    showModal: false,
    modalData: null,
    loading: false,
    error: null,
  };

  componentDidUpdate(prevProp, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== this.state.searchQuery) {
      this.setState({ page: 1, images: [] });
      this.setState({ loading: true });

      fetchImage(searchQuery, page)
        .then(data => {
          const { hits } = data;

          const images = hits.map(
            ({ id, webformatURL, largeImageURL, tags }) => {
              return { id, webformatURL, largeImageURL, tags };
            }
          );

          if (images.length === 0) {
            toast.info('There was nothing found for your request');
            return;
          }

          this.setState({ images });
          this.setState(prevState => ({
            page: prevState.page + 1,
          }));
        })
        .catch(error => this.setState({ error }))
        .finally(this.setState({ loading: false }));
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

    this.setState({ loading: true });

    fetchImage(searchQuery, page)
      .then(data => {
        const { hits } = data;

        const images = hits.map(({ id, webformatURL, largeImageURL, tags }) => {
          return { id, webformatURL, largeImageURL, tags };
        });

        this.setState(prevState => ({
          page: prevState.page + 1,
          images: [...prevState.images, ...images],
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(this.setState({ loading: false }));
  };

  render() {
    const { showModal, modalData, loading, images } = this.state;
    return (
      <div className={css.appContainer}>
        <Searchbar onSubmit={this.handleSearchForm} />
        {loading && (
          <div className={css.loader}>
            <BallTriangle
              height={100}
              width={100}
              radius={5}
              color="blue"
              ariaLabel="ball-triangle-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        )}
        <ImageGallery images={images} getImageId={this.getImageId} />
        {images.length >= 1 && <Button loadMore={this.loadMore} />}
        {showModal && (
          <Modal modalData={modalData} closeModal={this.closeModal} />
        )}
        <ToastContainer autoClose={3000} theme="colored" />
      </div>
    );
  }
}
