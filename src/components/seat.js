import React, { Component } from "react";

class Seat extends Component {
  constructor() {
    super();
    // Dont bind when using arrow function
    // this.handleChange = this.handleChange.bind(this);
    this.state = {
      isTaken: false,
      color: "red"
    };
  }

  handleChange = event => {
    let { isTaken } = this.state;
    let newColor;
    if (isTaken) {
      newColor = "red";
      isTaken = false;
    } else {
      newColor = "green";
      isTaken = true;
    }
    this.setState({ color: newColor, isTaken: isTaken });
  };

  render() {
    return (
      <div className="Seating">
        <div className="class-Room">
          <div
            className="circle"
            style={{ background: this.state.color }}
          ></div>
        </div>
        <button className="buttons" onClick={this.handleChange}>
          {" "}
          refresh
        </button>
      </div>
    );
  }
}

export default Seat;
// we need to mock a signal, form the signal change update the color of the circle
