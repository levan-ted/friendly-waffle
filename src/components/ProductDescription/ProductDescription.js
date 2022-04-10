import React, { Component } from 'react';
import parse from 'html-react-parser';
import { connect } from 'react-redux';
import styles from './ProductDescription.module.scss';

export class ProductDescription extends Component {
  render() {
    const { product } = this.props;
    const description = parse(product.description);
    return <p className={styles.description}>{description}</p>;
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDescription);
