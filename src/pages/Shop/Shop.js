import React, { Component } from 'react';
import styles from './Shop.module.scss';
import { connect } from 'react-redux';
import { client } from '../../store/thunk';
import { CATEGORY_PRODUCTS } from '../../constants/gql-queries';
import ProductCard from '../../components/ProductCard/ProductCard';
import Loader from '../../components/Loader';

export class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = { productList: null };
  }

  componentDidMount() {
    const category = this.props.match.params.categoryId;
    this.fetch(category);
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      const category = this.props.match.params.categoryId;
      this.fetch(category);
    }
  }

  async fetch(category) {
    const res = await client.query({ query: CATEGORY_PRODUCTS(category) });
    this.setState(() => {
      return {
        productList: res.data.category.products,
        category
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
              <ProductCard key={product.id} product={product} currency={this.props.currency} />
            ))}
          </div>
        </main>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  currency: state.currencies.active.label
});

export default connect(mapStateToProps, null)(Shop);
