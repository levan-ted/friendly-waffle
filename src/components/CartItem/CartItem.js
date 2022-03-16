import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./CartItem.module.scss";

import { minusSquare, plusSquare } from "../../assets/images";
import {
  addItemToCart,
  reduceItemQuantity,
  updateItemAttributes,
} from "../../store/thunk";
import PriceTag from "../../components/PriceTag";
import Attribute from "../Attribute";

export class CartItem extends Component {
  render() {
    const product = JSON.parse(JSON.stringify(this.props.product));

    const updateAttributes = (id, attr) => {
      if (!product.selectedAttributes) product.selectedAttributes = [];

      if (product.selectedAttributes.some((attr) => attr.id === id)) {
        product.selectedAttributes.find((el) => el.id === id).attr = attr;
      } else {
        product.selectedAttributes.push({ id, attr });
      }
      this.props.updateItemAttributes(product);
    };

    return (
      <div className={styles.container}>
        <div className={styles.details}>
          <h2 className={styles.brand}> {product.brand}</h2>
          <h2 className={styles.name}>{product.name}</h2>
          <PriceTag product={product} className={styles.pricetag} />
          {product.attributes.map((element) => {
            return (
              <Attribute
                key={element.id}
                element={element}
                hideLabel={true}
                selected={product.selectedAttributes}
                updateAttributes={updateAttributes}
              />
            );
          })}
        </div>
        <div className={styles.actions}>
          <img
            onClick={() => this.props.addItemToCart(product)}
            src={plusSquare}
            alt="+"
            className={styles.button}
          />
          <span>{product.quantity}</span>
          <img
            onClick={() => this.props.reduceItemQuantity(product)}
            src={minusSquare}
            alt="-"
            className={styles.button}
          />
        </div>
        <div className={styles["image-container"]}>
          <img src={product.gallery[0]} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currencies.active.label,
});

const mapDispatchToProps = {
  addItemToCart,
  reduceItemQuantity,
  updateItemAttributes,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
