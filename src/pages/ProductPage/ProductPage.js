import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./ProductPage.module.scss";
import Loader from "../../components/Loader";
import Gallery from "../../components/Gallery";
import ProductDetails from "../../components/ProductDetails";
import { client } from "../../store/thunk";
import { SINGLE_PRODUCT } from "../../constants/gql-queries";

export class ProductPage extends Component {
  constructor(props) {
    super();
    this.state = { product: null };
  }
  componentDidMount() {
    const { productId } = this.props.match.params;
    this.fetch(productId);
  }

  async fetch(id) {
    const res = await client.query({ query: SINGLE_PRODUCT(id) });
    this.setState((state, props) => {
      return {
        product: res.data.product,
      };
    });
  }

  render() {
    if (!this.state.product) {
      return <Loader />;
    } else {
      const { product } = this.state;
      return (
        <main className={styles.grid}>
          <Gallery product={this.state.product} />
          <ProductDetails product={this.state.product} />
        </main>
      );
    }
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
