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
    isModal: false,
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

  toggleModal = () => {
    if (this.state.isModal) {
      this.setState({ isModal: false });
    }
    this.setState({ isModal: true });
  };

  addImageToModal = event => {
    console.log(event.target);
  };

  render() {
    const { images, isModal } = this.state;
    return (
      <>
        <ul className={css.imageGallery}>
          {images.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              toggleModal={this.toggleModal}
              addImageToModal={this.addImageToModal}
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              name={tags}
            />
          ))}
        </ul>
        {images.length >= 1 && <Button loadMore={this.loadMore} />}
        {isModal && <Modal />}
      </>
    );
  }
}
