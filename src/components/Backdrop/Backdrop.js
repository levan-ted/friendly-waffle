import React, { Component } from 'react';
import styles from './Backdrop.module.scss';
import { connect } from 'react-redux';

export class Backdrop extends Component {
  render() {
    return <div className={styles.backdrop} onClick={this.props.onClick}></div>;
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Backdrop);
