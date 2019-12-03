import React, { Component } from "react";
import Websocket from "react-websocket";
/* eslint-disable no-restricted-globals */

const protocol = document.location.protocol.startsWith("https")
  ? "wss://"
  : "ws://";
console.log(protocol);
console.log(location.host);

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

  handleData(data) {
    let result = JSON.parse(data);
    console.log(result.IotData);
    //let isTaken = result.IotData.TEST;
    let newColor;
    if (result.IotData.TEST) {
      newColor = "red";
      // isTaken = false;
    } else {
      newColor = "green";
      // isTaken = true;
    }
    this.setState({ color: newColor, isTaken: result.IotData.TEST });
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
          <Websocket
            url={protocol + location.host}
            onMessage={this.handleData.bind(this)}
          />
          <div
            className="circle"
            style={{ background: this.state.color }}
          ></div>
        </div>
        <button className="buttons" onClick={this.handleChange}>
          refresh
        </button>
      </div>
    );
  }
}

export default Seat;
// we need to mock a signal, form the signal change update the color of the circle
