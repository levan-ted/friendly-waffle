import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Cart.module.scss';
import CartItem from '../../components/CartItem';

export class Cart extends Component {
  render() {
    return (
      <>
        <h2 className={styles.header}>CART</h2>
        <div className={styles['cart-container']}>
          {this.props.cartItems.map((product) => (
            <CartItem key={product.id} product={product} />
          ))}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({ cartItems: state.cart.cartItems });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
