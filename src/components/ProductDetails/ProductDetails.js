import React, { Component } from "react";
import { connect } from "react-redux";
import { formatCurrency } from "../../helpers/format-currency";
import { addItemToCart, removeItemFromCart } from "../../store/thunk";
import styles from "./ProductDetails.module.scss";

export class ProductDetails extends Component {
  constructor(props) {
    super();
    this.state = { alreadyInCart: false };
  }

  componentDidMount() {
    const alreadyInCart = this.props.cartItems.some(
      (el) => el.id === this.props.product.id
    );
    if (alreadyInCart) {
      this.setState(() => ({ alreadyInCart: true }));
    }
  }

  render() {
    const { product, currency } = this.props;
    const price = product.prices.find((el) => el.currency.label === currency);

    const priceTag = `${price.currency.symbol} ${formatCurrency(price.amount)}`;
    const handleCart = () => {
      if (!this.state.alreadyInCart) {
        this.setState(() => ({ alreadyInCart: true }));
        this.props.addItemToCart(product);
      } else {
        this.setState(() => ({ alreadyInCart: false }));
        this.props.removeItemFromCart(product);
      }
    };

    const btnText = this.state.alreadyInCart
      ? "REMOVE FROM CART"
      : "ADD TO CART";

    return (
      <div className={styles.container}>
        <div className={styles.title}>
          <h2 className={styles.brand}>{product.brand}</h2>
          <h2 className={styles.name}>{product.name}</h2>
        </div>
        <div className={styles.price}>
          <span>PRICE:</span>
          <span>{priceTag}</span>
        </div>

        <button onClick={handleCart} className={styles.button}>
          {btnText}
        </button>

        <p className={styles.description}>{product.description}</p>
      </div>
    );
  }
}

const mapDispatchToProps = { addItemToCart, removeItemFromCart };
const mapStateToProps = (state) => ({
  currency: state.currencies.active.label,
  cartItems: state.cart.cartItems,
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
