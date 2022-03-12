import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./CartItem.module.scss";

import { minusSquare, plusSquare } from "../../assets/images";

export class CartItem extends Component {
  render() {
    const { product } = this.props;
    console.log(product);
    return (
      <div className={styles.container}>
        <div className={styles.details}>
          <h2 className={styles.brand}> {product.brand}</h2>
          <h2 className={styles.name}>{product.name}</h2>
          <span>{product.price}</span>
        </div>
        <div className={styles.actions}>
          <img src={plusSquare} alt="+" className={styles.button} />
          <span>{product.quantity}</span>
          <img src={minusSquare} alt="-" className={styles.button} />
        </div>
        <div className={styles["image-container"]}>
          <img src={product.gallery[0]} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currencies.active.label,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
