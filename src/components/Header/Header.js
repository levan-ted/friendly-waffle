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
    console.log(this.state);
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
            <p>$</p>
            <img
              className={this.state.arrowStyle}
              src={images.selectArrow}
              onClick={this.toggleCurrency.bind(this)}
            />
            <ul
              className={`${styles["currency-list"]} ${this.state.currencyListStyle}`}
            >
              <li>USD</li>
              <li>EUR</li>
              <li>JPY</li>
            </ul>
          </span>
          <img src={images.emptyCart} alt="cart" />
        </div>
      </header>
    );
  }
}

export default Header;
