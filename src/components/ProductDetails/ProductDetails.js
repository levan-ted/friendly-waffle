import React, { Component } from 'react';
import { connect } from 'react-redux';
import parse from 'html-react-parser';
import { addItemToCart, removeItemFromCart } from '../../store/thunk';
import styles from './ProductDetails.module.scss';
import Attribute from '../Attribute';
import PriceTag from '../PriceTag';

export class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { alreadyInCart: false };
  }

  componentDidMount() {
    const alreadyInCart = this.props.cartItems.some((el) => el.id === this.props.product.id);
    if (alreadyInCart) {
      this.setState(() => ({ alreadyInCart: true }));
    }
  }

  render() {
    const { product } = this.props;
    const description = parse(product.description);

    const handleCart = () => {
      if (!this.state.alreadyInCart) {
        this.setState(() => ({ alreadyInCart: true }));
        this.props.addItemToCart(product);
      } else {
        this.setState(() => ({ alreadyInCart: false }));
        this.props.removeItemFromCart(product);
      }
    };

    const updateAttributes = (id, attr) => {
      if (!product.selectedAttributes) product.selectedAttributes = [];

      if (product.selectedAttributes.some((attr) => attr.id === id)) {
        product.selectedAttributes.find((el) => el.id === id).attr = attr;
      } else {
        product.selectedAttributes.push({ id, attr });
      }
    };

    const btnText = this.state.alreadyInCart ? 'REMOVE FROM CART' : 'ADD TO CART';

    return (
      <div className={styles.container}>
        <div className={styles.title}>
          <h2 className={styles.brand}>{product.brand}</h2>
          <h2 className={styles.name}>{product.name}</h2>
        </div>
        <div className={styles['attribute-container']}>
          {product.attributes.map((el) => (
            <Attribute
              key={el.id}
              element={el}
              updateAttributes={updateAttributes}
              selected={product.selectedAttributes}
            />
          ))}
        </div>
        <div className={styles.price}>
          <span>PRICE:</span>
          <PriceTag product={product} />
        </div>

        <button onClick={handleCart} className={styles.button}>
          {btnText}
        </button>

        <p className={styles.description}>{description}</p>
      </div>
    );
  }
}

const mapDispatchToProps = { addItemToCart, removeItemFromCart };
const mapStateToProps = (state) => ({
  currency: state.currencies.active.label,
  cartItems: state.cart.cartItems
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
