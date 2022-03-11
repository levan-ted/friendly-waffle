import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { formatCurrency } from "../../helpers/format-currency";
import styles from "./ProductCard.module.scss";

export class ProductCard extends Component {
  render() {
    console.log(this.props);
    if (!this.props.product) {
      return <p>Loading...</p>;
    } else {
      const { product } = this.props;
      const price = product.prices.find(
        (el) => el.currency.label === this.props.currency
      );
      const priceTag = `${price.currency.symbol} ${formatCurrency(
        price.amount
      )}`;

      return (
        <Link className={styles.link} to={`/product/${product.id}`}>
          <div className={styles.card}>
            <div className={styles["image-container"]}>
              <img src={product.gallery[0]} />
              {!!product.inStock && (
                <span className={styles["out-of-stock"]}>OUT OF STOCK</span>
              )}
            </div>
            <div className={styles.details}>
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
  currency: state.currencies.active.label,
});

//   const mapDispatchToProps = { getCurrencies, getCategories };

export default connect(mapStateToProps, null)(ProductCard);
