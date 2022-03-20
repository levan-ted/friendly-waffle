import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatCurrency } from '../../helpers/format-currency';
// import styles from "./PriceTag.module.scss";

export class PriceTag extends Component {
  render() {
    const { product, currency } = this.props;

    const price = product.prices.find((el) => el.currency.label === currency);
    const priceTag = `${price.currency.symbol} ${formatCurrency(price.amount)}`;
    return <span className={this.props.className}>{priceTag}</span>;
  }
}

const mapStateToProps = (state) => ({
  currency: state.currencies.active.label
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PriceTag);
