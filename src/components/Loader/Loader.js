import React, { Component } from 'react';
import styles from './Loader.module.scss';

export class Loader extends Component {
  render() {
    return <div className={styles.loader}>Loading...</div>;
  }
}

export default Loader;
