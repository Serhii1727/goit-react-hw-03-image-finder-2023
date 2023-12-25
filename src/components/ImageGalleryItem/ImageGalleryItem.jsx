import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
  webformatURL,
  name,
  id,
  getImageId,
}) {
  return (
    <li className={css.imageGalleryItem} onClick={() => getImageId(id)} id={id}>
      <img src={webformatURL} alt={name} />
    </li>
  );
}
