import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import * as images from '../../assets/images';
import CurrencySelector from './CurrencySelector';
import CartBox from './CartBox';

export class Header extends PureComponent {
  render() {
    return (
      <header className={styles.header}>
        <nav className={styles.navigation}>
          <ul>
            {this.props.categories.map((ctg) => (
              <li key={ctg.name}>
                <NavLink activeClassName={styles['active-link']} to={`/shop/${ctg.name}`}>
                  {ctg.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <img src={images.logo} alt="Logo" />
        <div className={styles.actions}>
          <CurrencySelector />
          <CartBox />
        </div>
      </header>
    );
  }
}

export default Header;
