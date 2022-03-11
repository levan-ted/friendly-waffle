import React, { Component } from "react";
import styles from "./Shop.module.scss";
import { connect } from "react-redux";

import ProductCard from "../../components/ProductCard/ProductCard";

export class Shop extends Component {
  constructor(props) {
    super();
    this.state = { productList: null };
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.setState((state, props) => {
        return {
          productList: props.data.categories[0].products,
          category: props.data.categories[0].name,
        };
      });
    }
  }

  render() {
    if (!this.state.productList) {
      return <div>Loading...</div>;
    } else {
      return (
        <main>
          <h2>{this.state.category}</h2>
          <div className={styles.grid}>
            {this.state.productList.map((product) => (
              <ProductCard product={product} currency={this.props.currency} />
            ))}
          </div>
        </main>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
  productList: null,
  currency: state.currencies.active.label,
});

//   const mapDispatchToProps = { getCurrencies, getCategories };

export default connect(mapStateToProps, null)(Shop);
