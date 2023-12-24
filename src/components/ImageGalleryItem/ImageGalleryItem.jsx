import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  name,
  toggleModal,
}) {
  return (
    <li className={css.imageGalleryItem} onClick={toggleModal}>
      <img src={webformatURL} alt={name} />
    </li>
  );
}
