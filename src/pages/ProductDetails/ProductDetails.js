import React, { Component } from "react";
import { connect } from "react-redux";

export class ProductDetails extends Component {
  render() {
    return <div>ProductDetails</div>;
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
