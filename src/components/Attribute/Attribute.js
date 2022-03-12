import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./Attribute.module.scss";

export class Attribute extends Component {
  selectColor(e, el, item) {
    e.target.closest("div").childNodes.forEach((node) => (node.innerHTML = ""));
    e.target.innerHTML = "<p style='text-shadow:1px 0px 1px #ffffff'>X</p>";
    console.log(el, item);
    this.props.updateAttributes(el, item);
  }

  selectSize(e, el, item) {
    e.target
      .closest("div")
      .childNodes.forEach((node) =>
        node.classList.remove(styles["selected-size"])
      );
    e.target.classList.add(styles["selected-size"]);
    this.props.updateAttributes(el, item);
  }
  render() {
    const el = this.props.element;
    const buttons = el.items.map((item) => {
      if (el.name === "Color")
        return (
          <span
            onClick={(e) => {
              this.selectColor.bind(this)(e, el.id, item);
            }}
            style={{ background: item.value }}
          ></span>
        );
      return (
        <span
          onClick={(e) => {
            this.selectSize.bind(this)(e, el.id, item);
          }}
        >
          {item.value}
        </span>
      );
    });

    return (
      <div className={styles.attribute}>
        <span className={styles["attr-name"]}>{el.name}</span>
        <div className={styles.buttons}>{buttons}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Attribute);