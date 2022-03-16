import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./CartBox.module.scss";
import * as images from "../../assets/images";
import { connect } from "react-redux";
import { toggleBag } from "../../store/thunk";

export class CartBox extends Component {
  render() {
    return (
      <>
        <div onClick={this.props.toggleBag} className={styles.icon}>
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

const mapDispatchToProps = { toggleBag };

export default connect(mapStateToProps, mapDispatchToProps)(CartBox);
