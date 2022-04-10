import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addItemToCart, removeItemFromCart } from '../../store/thunk';
import styles from './ProductDetails.module.scss';
import Attribute from '../Attribute';
import PriceTag from '../PriceTag';

export class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { alreadyInCart: false, product: { ...props.product } };
  }

  componentDidMount() {
    const alreadyInCart = this.props.cartItems.some((el) => el.id === this.state.product.id);
    const product = { ...this.state.product };
    product.selectedAttributes = product.attributes.map((attribute) => ({
      id: attribute.id,
      attr: attribute.items[0]
    }));
    product.combinedId =
      product.id + product.selectedAttributes.map((attribute) => attribute.attr.value).join('');
    this.setState(() => ({ alreadyInCart, product }));
  }

  handleCart() {
    if (!this.state.alreadyInCart) {
      this.setState((prevState) => ({ ...prevState, alreadyInCart: true }));
      this.props.addItemToCart(this.state.product);
    } else {
      this.setState(() => ({ alreadyInCart: false }));
      this.props.removeItemFromCart(this.state.product);
    }
  }

  updateAttributes(id, attr) {
    const product = JSON.parse(JSON.stringify(this.state.product));
    product.selectedAttributes.find((el) => el.id === id).attr = attr;
    product.combinedId =
      product.id + product.selectedAttributes.map((attribute) => attribute.attr.value).join('');
    const itemsFromCart = this.props.cartItems.filter((item) => item.id === this.state.product.id);
    const alreadyInCart = itemsFromCart.some((item) => item.combinedId === product.combinedId);

    this.setState(() => ({ alreadyInCart, product }));
  }

  render() {
    const btnText = this.state.alreadyInCart ? 'REMOVE FROM CART' : 'ADD TO CART';

    return (
      <div className={styles.container}>
        <div className={styles.title}>
          <h2 className={styles.brand}>{this.state.product.brand}</h2>
          <h2 className={styles.name}>{this.state.product.name}</h2>
        </div>
        <div className={styles['attribute-container']}>
          {this.state.product.attributes.map((el) => (
            <Attribute
              key={el.id}
              element={el}
              updateAttributes={this.updateAttributes.bind(this)}
              selected={this.state.product.selectedAttributes}
            />
          ))}
        </div>
        <div className={styles.price}>
          <span>PRICE:</span>
          <PriceTag product={this.state.product} />
        </div>

        <button
          disabled={!this.state.product.inStock}
          onClick={this.handleCart.bind(this)}
          className={styles.button}>
          {btnText}
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = { addItemToCart, removeItemFromCart };
const mapStateToProps = (state) => ({
  currency: state.currencies.active.label,
  cartItems: state.cart.cartItems
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
