import { PureComponent } from 'react';
import fetchImage from 'components/api/api';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Button from 'components/Button';
import Modal from 'components/Modal';
import css from './ImageGallery.module.css';

export default class ImageGallery extends PureComponent {
  state = {
    page: 1,
    images: [],
    showModal: false,
    modalData: null,
  };

  componentDidUpdate(prevProp, prevState) {
    const { searchQuery } = this.props;
    const { page } = this.state;

    if (prevProp.searchQuery !== this.props.searchQuery) {
      this.setState({ page: 1, images: [] });

      fetchImage(searchQuery, page).then(data => {
        const { hits } = data;

        const images = hits.map(({ id, webformatURL, largeImageURL, tags }) => {
          return { id, webformatURL, largeImageURL, tags };
        });

        this.setState({ images });
        this.setState(prevState => ({
          page: prevState.page + 1,
        }));
      });
    }
  }

  loadMore = () => {
    const { searchQuery } = this.props;
    const { page } = this.state;

    fetchImage(searchQuery, page).then(data => {
      const { hits } = data;

      const images = hits.map(({ id, webformatURL, largeImageURL, tags }) => {
        return { id, webformatURL, largeImageURL, tags };
      });

      console.log(images);

      this.setState(prevState => ({
        page: prevState.page + 1,
        images: [...prevState.images, ...images],
      }));
    });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  getImageId = id => {
    const currentImage = this.state.images.find(item => item.id === id);
    this.setState({ showModal: true, modalData: currentImage });
  };

  render() {
    const { images, showModal, modalData } = this.state;

    return (
      <>
        <ul className={css.imageGallery}>
          {images.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              toggleModal={this.toggleModal}
              getImageId={this.getImageId}
              key={id}
              id={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              name={tags}
            />
          ))}
        </ul>
        {images.length >= 1 && <Button loadMore={this.loadMore} />}
        {showModal && (
          <Modal modalData={modalData} closeModal={this.closeModal} />
        )}
      </>
    );
  }
}
