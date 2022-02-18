import React, { Component } from "react";
import styles from "./Header.module.scss";
import * as images from "../../assets/images";

export class Header extends Component {
  render() {
    return (
      <header className={styles.header}>
        <nav className={styles.navigation}>
          <ul>
            <li>WOMEN</li>
            <li>MEN</li>
            <li>KIDS</li>
          </ul>
        </nav>
        <img src={images.logo} alt="Logo" />
        <div className={styles.actions}>
          <select>
            <option>USD</option>
            <option>EUR</option>
            <option>JPY</option>
          </select>
          <img src={images.emptyCart} alt="cart" />
        </div>
      </header>
    );
  }
}

export default Header;
