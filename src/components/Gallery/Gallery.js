import React, { Component } from 'react';
import styles from './Gallery.module.scss';

export class Gallery extends Component {
  constructor(props) {
    super();
    this.state = { imageUrl: props.product.gallery[0] };
  }

  changeImage(url) {
    this.setState((state) => {
      return { ...state, imageUrl: url };
    });
  }

  render() {
    return (
      <div className={styles['image-container']}>
        <div className={styles.thumbnails}>
          {this.props.product.gallery.map((imgUrl, idx) => (
            <img
              key={idx}
              onMouseOver={() => this.changeImage(imgUrl)}
              src={imgUrl}
              alt={this.props.product.name}
            />
          ))}
        </div>
        <div className={styles['image-preview']}>
          <img src={this.state.imageUrl} alt={this.props.product.name} />
        </div>
      </div>
    );
  }
}

export default Gallery;
