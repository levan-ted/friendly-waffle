import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./CartBox.module.scss";
import * as images from "../../assets/images";
import { connect } from "react-redux";

export class CartBox extends Component {
  state = { showCart: false };

  render() {
    return (
      <>
        <div className={styles.icon}>
          {!!this.props.numberOfItems && (
            <span className={styles.counter}>{this.props.numberOfItems}</span>
          )}
          <Link to="/cart">
            <img src={images.emptyCart} alt="cart" />
          </Link>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  numberOfItems: state.cart.cartItems.length,
  cartItems: state.cart.cartItems,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CartBox);
