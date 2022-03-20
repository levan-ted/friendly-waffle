import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { formatCurrency } from '../../helpers/format-currency';
import { addItemToCart, removeItemFromCart } from '../../store/thunk';
import styles from './ProductCard.module.scss';
import { cartWhite, checkWhite } from '../../assets/images';
export class ProductCard extends Component {
  state = { showCartIcon: false, isInCart: false };

  showCartIcon() {
    this.setState(() => ({ showCartIcon: true }));
  }

  hideCartIcon() {
    this.setState(() => ({ showCartIcon: false }));
  }

  handleCart(e, product) {
    e.preventDefault();

    const shallowCopy = JSON.parse(JSON.stringify(product));

    if (!this.state.isInCart) {
      this.props.addItemToCart(shallowCopy);
      this.setState((prevState) => ({ ...prevState, isInCart: true }));
    } else {
      this.props.removeItemFromCart(shallowCopy);
      this.setState((prevState) => ({ ...prevState, isInCart: false }));
    }
  }

  render() {
    if (!this.props.product) {
      return <p>Loading...</p>;
    } else {
      const { product } = this.props;
      const price = product.prices.find((el) => el.currency.label === this.props.currency);
      const priceTag = `${price.currency.symbol} ${formatCurrency(price.amount)}`;

      return (
        <Link className={styles.link} to={`/product/${product.id}`}>
          <div
            onMouseEnter={this.showCartIcon.bind(this)}
            onMouseLeave={this.hideCartIcon.bind(this)}
            className={styles.card}>
            <div className={styles['image-container']}>
              <img src={product.gallery[0]} />
              {!!product.inStock && <span className={styles['out-of-stock']}>OUT OF STOCK</span>}
            </div>
            <div className={styles.details}>
              {this.state.showCartIcon && !product.inStock && (
                <span
                  onClick={(e) => this.handleCart.bind(this)(e, product)}
                  className={styles['cart-icon']}>
                  <img src={this.state.isInCart ? checkWhite : cartWhite} alt="Add to Cart" />
                </span>
              )}
              <span>{product.name}</span>
              <span>{priceTag}</span>
            </div>
          </div>
        </Link>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  currency: state.currencies.active.label
});

const mapDispatchToProps = { addItemToCart, removeItemFromCart };

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
