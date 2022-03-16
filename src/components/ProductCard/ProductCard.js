import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { formatCurrency } from "../../helpers/format-currency";
import styles from "./ProductCard.module.scss";
import { cartWhite } from "../../assets/images";
export class ProductCard extends Component {
  state = { showCartIcon: false };

  showCartIcon(e) {
    this.setState((prevState) => ({ showCartIcon: true }));
  }

  hideCartIcon(e) {
    this.setState((prevState) => ({ showCartIcon: false }));
  }

  handleCart(e, product) {
    e.preventDefault();
    console.log(product);
  }

  render() {
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
          <div
            onMouseEnter={this.showCartIcon.bind(this)}
            onMouseLeave={this.hideCartIcon.bind(this)}
            className={styles.card}
          >
            <div className={styles["image-container"]}>
              <img src={product.gallery[0]} />
              {!!product.inStock && (
                <span className={styles["out-of-stock"]}>OUT OF STOCK</span>
              )}
            </div>
            <div className={styles.details}>
              {this.state.showCartIcon && !product.inStock && (
                <span
                  onClick={(e) => this.handleCart.bind(this)(e, product)}
                  className={styles["cart-icon"]}
                >
                  <img src={cartWhite} alt="Add to Cart" />
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
  currency: state.currencies.active.label,
});

//   const mapDispatchToProps = { getCurrencies, getCategories };

export default connect(mapStateToProps, null)(ProductCard);
