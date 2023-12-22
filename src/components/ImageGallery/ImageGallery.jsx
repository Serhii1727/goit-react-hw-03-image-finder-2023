import { PureComponent } from 'react';

export default class ImageGallery extends PureComponent {
  state = {
    images: [],
  };
  render() {
    return <ul className="gallery"></ul>;
  }
}
