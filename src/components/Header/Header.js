import React, { Component } from "react";
import styles from "./Header.module.scss";
import * as images from "../../assets/images";

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCurrencyList: false,
      arrowStyle: "",
      currencyListStyle: styles.hidden,
    };
  }

  toggleCurrency() {
    this.setState((state, props) => {
      const updatedArrowStyle = state.arrowStyle === "" ? styles.rotated : "";
      const updatedCurrencyListStyle =
        state.currencyListStyle === "" ? styles.hidden : "";
      return {
        showCurrencyList: !state.showCurrencyList,
        arrowStyle: updatedArrowStyle,
        currencyListStyle: updatedCurrencyListStyle,
      };
    });
  }

  selectCurrency(e) {
    console.log(e.target.dataset.value);
    this.toggleCurrency();
  }

  render() {
    return (
      <header className={styles.header}>
        <nav className={styles.navigation}>
          <ul>
            <li className={styles["active-link"]}>WOMEN</li>
            <li>MEN</li>
            <li>KIDS</li>
          </ul>
        </nav>
        <img src={images.logo} alt="Logo" />
        <div className={styles.actions}>
          <span className={styles.currency}>
            <p onClick={this.toggleCurrency.bind(this)}>$</p>
            <img
              className={this.state.arrowStyle}
              src={images.selectArrow}
              onClick={this.toggleCurrency.bind(this)}
            />
            <ul
              onClick={this.selectCurrency.bind(this)}
              className={`${styles["currency-list"]} ${this.state.currencyListStyle}`}
            >
              <li data-value="USD">$ USD</li>
              <li data-value="EUR">€ EUR</li>
              <li data-value="JPY">¥ JPY</li>
            </ul>
          </span>
          <img src={images.emptyCart} alt="cart" />
        </div>
      </header>
    );
  }
}

export default Header;
