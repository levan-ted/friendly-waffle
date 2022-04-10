import React, { PureComponent } from 'react';
import styles from './CurrencySelector.module.scss';
import * as images from '../../assets/images';
import { connect } from 'react-redux';
import { changeCurrency } from '../../store/thunk';
import Backdrop from '../Backdrop';
export class CurrencySelector extends PureComponent {
  constructor() {
    super();
    this.state = {
      showCurrencyList: false,
      arrowStyle: '',
      currencyListStyle: styles.hidden
    };
  }

  toggleCurrency() {
    this.setState((state) => {
      const updatedArrowStyle = state.arrowStyle === '' ? styles.rotated : '';
      const updatedCurrencyListStyle = state.currencyListStyle === '' ? styles.hidden : '';
      return {
        showCurrencyList: !state.showCurrencyList,
        arrowStyle: updatedArrowStyle,
        currencyListStyle: updatedCurrencyListStyle
      };
    });
  }

  selectCurrency(e) {
    const value = e.target.dataset.value;
    this.props.changeCurrency(value);
    this.toggleCurrency();
  }

  render() {
    return (
      <>
        <span className={styles.currency}>
          <p onClick={this.toggleCurrency.bind(this)}>{this.props.active.symbol}</p>
          <img
            className={this.state.arrowStyle}
            src={images.selectArrow}
            onClick={this.toggleCurrency.bind(this)}
          />
          <ul
            onClick={this.selectCurrency.bind(this)}
            className={`${styles['currency-list']} ${this.state.currencyListStyle}`}>
            {this.props.list.map((cur) => (
              <li key={cur.label} data-value={cur.label}>{`${cur.symbol} ${cur.label}`}</li>
            ))}
          </ul>
        </span>
        {this.state.showCurrencyList && (
          <Backdrop onClick={() => this.state.showCurrencyList && this.toggleCurrency()} />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  list: state.currencies.list,
  active: state.currencies.active
});

const mapDispatchToProps = { changeCurrency };

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySelector);
