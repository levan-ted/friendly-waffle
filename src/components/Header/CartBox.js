import React, { Component } from 'react';
import styles from './CartBox.module.scss';
import * as images from '../../assets/images';
import { connect } from 'react-redux';
import { toggleBag } from '../../store/thunk';

export class CartBox extends Component {
  render() {
    return (
      <>
        <div onClick={this.props.toggleBag} className={styles.icon}>
          {!!this.props.numberOfItems && (
            <span className={styles.counter}>{this.props.numberOfItems}</span>
          )}
          <img src={images.emptyCart} alt="cart" />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  numberOfItems: state.cart.cartItems.length,
  cartItems: state.cart.cartItems
});

const mapDispatchToProps = { toggleBag };

export default connect(mapStateToProps, mapDispatchToProps)(CartBox);
