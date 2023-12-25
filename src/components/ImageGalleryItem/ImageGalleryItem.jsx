import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
  webformatURL,
  name,
  id,
  getImageId,
  toggleModal,
}) {
  return (
    <li
      className={css.imageGalleryItem}
      onClick={toggleModal}
      onClickCapture={() => getImageId(id)}
      id={id}
    >
      <img src={webformatURL} alt={name} />
    </li>
  );
}
