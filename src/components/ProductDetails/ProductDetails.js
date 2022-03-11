import React, { Component } from "react";
import { connect } from "react-redux";
import { formatCurrency } from "../../helpers/format-currency";
import styles from "./ProductDetails.module.scss";

export class ProductDetails extends Component {
  constructor(props) {
    super();
  }
  render() {
    const { product, currency } = this.props;
    const price = product.prices.find((el) => el.currency.label === currency);

    const priceTag = `${price.currency.symbol} ${formatCurrency(price.amount)}`;

    console.log(this.state);
    return (
      <div className={styles.container}>
        <h2 className={styles.brand}>{product.brand}</h2>
        <h2 className={styles.name}>{product.name}</h2>

        <div className={styles.price}>
          <span>PRICE:</span>
          <span>{priceTag}</span>
        </div>

        <button className={styles.button}>ADD TO CART</button>

        <p className={styles.description}>{product.description}</p>
      </div>
    );
  }
}

const mapDispatchToProps = { method: null };
const mapStateToProps = (state) => ({
  currency: state.currencies.active.label,
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
