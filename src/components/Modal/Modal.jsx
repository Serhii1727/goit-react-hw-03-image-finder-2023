import { Component } from 'react';
import css from './Modal.module.css';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.closeModal();
    }
  };

  handleBackDropClick = event => {
    if (event.target === event.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props.modalData;
    return (
      <div className={css.overlay} onClick={this.handleBackDropClick}>
        <div className={css.modal}>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>
    );
  }
}
