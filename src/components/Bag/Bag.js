import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './Bag.module.scss';

import CartItem from '../CartItem';
import Backdrop from '../Backdrop';

import { toggleBag } from '../../store/thunk';
import { formatCurrency } from '../../helpers/format-currency';

export class Bag extends Component {
  state = { showBag: false };
  render() {
    const [totalPrice, totalQuantity] = this.props.cartItems.reduce(
      (acc, item) => {
        const quantity = item.quantity;
        const price = item.prices.find(
          (price) => price.currency.label === this.props.currency
        ).amount;
        const total = quantity * price;

        return [acc[0] + total, acc[1] + quantity];
      },
      [0, 0]
    );

    return this.props.showBag ? (
      <>
        <div className={styles.wrapper}>
          <div onClick={this.props.toggleBag} className={styles.backdrop}></div>
          <div className={styles.bag}>
            <h2>
              My Bag, <span>{totalQuantity} items</span>
            </h2>
            {this.props.cartItems.map((product) => {
              return <CartItem key={Math.random()} product={product} xs />;
            })}
            <div className={styles.totals}>
              <span>Total</span>{' '}
              <span>
                {formatCurrency(totalPrice)} {this.props.currency}
              </span>{' '}
            </div>
            <div className={styles.buttons}>
              <Link to="/cart">
                <button onClick={this.props.toggleBag} className={styles.btn}>
                  VIEW BAG
                </button>
              </Link>
              <button onClick={this.props.toggleBag} className={styles.btngreen}>
                CHECKOUT
              </button>
            </div>
          </div>
        </div>
        <Backdrop onClick={this.props.toggleBag} />
      </>
    ) : (
      <></>
    );
  }
}

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
  currency: state.currencies.active.label,
  showBag: state.ui.showBag
});

const mapDispatchToProps = { toggleBag };

export default connect(mapStateToProps, mapDispatchToProps)(Bag);
