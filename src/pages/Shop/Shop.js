import React, { Component } from "react";
import styles from "./Shop.module.scss";
import { connect } from "react-redux";

import ProductCard from "../../components/ProductCard/ProductCard";
import Loader from "../../components/Loader";

export class Shop extends Component {
  constructor(props) {
    super();
    this.state = { productList: null };
  }

  componentDidMount() {
    if (!this.state.productList) this.updateProductList();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) this.updateProductList();
  }

  updateProductList() {
    this.setState((state, props) => {
      const category = props.match.params.categoryId;
      const productList = props.data.categories.find(
        (ctg) => ctg.name === category
      )?.products;

      return {
        productList,
        category,
      };
    });
  }

  render() {
    if (!this.state.productList) {
      return <Loader />;
    } else {
      return (
        <main className={styles.wrapper}>
          <h2 className={styles.header}>{this.state.category}</h2>
          <div className={styles.grid}>
            {this.state.productList.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currency={this.props.currency}
              />
            ))}
          </div>
        </main>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
  currency: state.currencies.active.label,
});

//   const mapDispatchToProps = { getCurrencies, getCategories };

export default connect(mapStateToProps, null)(Shop);
