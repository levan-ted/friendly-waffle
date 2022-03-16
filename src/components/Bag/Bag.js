import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styles from "./Bag.module.scss";

import CartItem from "../CartItem";

import { toggleBag } from "../../store/thunk";

export class Bag extends Component {
  state = { showBag: false };
  render() {
    const quantity = this.props.cartItems.length;
    const totalPrice = 100;

    return this.props.showBag ? (
      <div className={styles.wrapper}>
        <div onClick={this.props.toggleBag} className={styles.backdrop}></div>
        <div className={styles.bag}>
          <h2>
            My Bag, <span>{quantity} items</span>
          </h2>
          {this.props.cartItems.map((product) => {
            return <CartItem product={product} xs />;
          })}
          <div className={styles.totals}>Total: {totalPrice} </div>
          <div className={styles.buttons}>
            <Link to="/cart">
              <button className={styles.btn}>VIEW BAG</button>
            </Link>
            <button className={styles.btngreen}>CHECKOUT</button>
          </div>
        </div>
      </div>
    ) : (
      <></>
    );
  }
}

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
  showBag: state.ui.showBag,
});

const mapDispatchToProps = { toggleBag };

export default connect(mapStateToProps, mapDispatchToProps)(Bag);
