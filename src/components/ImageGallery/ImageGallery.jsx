import ImageGalleryItem from 'components/ImageGalleryItem';
import css from './ImageGallery.module.css';

export default function ImageGallery({ images, getImageId }) {
  return (
    <ul className={css.imageGallery}>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          getImageId={getImageId}
          key={id}
          id={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          name={tags}
        />
      ))}
    </ul>
  );
}
