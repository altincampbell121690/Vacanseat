import React, { Component } from "react";
import Websocket from "react-websocket";
import SeatIconOrangeComponent from "./SeatIconOrangeComponent";
import SeatIconPurpleComponent from "./SeatIconPurpleComponent";
import SeatIconRedComponent from "./SeatIconRedComponent";
/* eslint-disable no-restricted-globals */

const protocol = document.location.protocol.startsWith("https")
  ? "wss://"
  : "ws://";
console.log(protocol);
console.log(location.host);
// const logo = require('./logo.jpeg); ALTIN
var count = 0;
var seatsTaken = 0;
class Seat extends Component {
  constructor(props) {
    super(props);
    // Dont bind when using arrow function
    // this.handleChange = this.handleChange.bind(this);
    this.state = {
      isTaken: 0,
      color: "red",
      seatImage: <SeatIconPurpleComponent />
    };
  }

  handleData(data) {
    let result = JSON.parse(data);
    console.log("start");
    console.log(result.IotData);
    console.log("finish");
    //let isTaken = result.IotData.TEST;
    let newColor;
    let newImage;
    if (result.IotData.TEST === 0) {
      // newColor = "red";
      newImage = <SeatIconRedComponent />;
      seatsTaken = 1;
      // isTaken = false;
    } else if (result.IotData.TEST === 1) {
      // newColor = "gray";
      newImage = <SeatIconOrangeComponent />;
      // isTaken = true;
    } else if (result.IotData.TEST === 2) {
      // newColor = "green";
      seatsTaken = 0;
      newImage = <SeatIconPurpleComponent />;
      seatsTaken = -1;
    }
    this.setState({
      // color: newColor,
      isTaken: result.IotData.TEST,
      seatImage: newImage
    });
    this.props.onChangeSeatsTaken(seatsTaken);
    console.log(this.props.seatsTaken);
  }

  handleChange = event => {
    // seatsTaken={this.state.seatsTaken}
    // onChangeSeatsTaken={this.handleChangeSeat}

    let { isTaken } = this.state;
    let newColor;
    let newImage;
    isTaken = count % 3;
    //console.log(isTaken);
    if (isTaken === 0) {
      newColor = "red";
      newImage = <SeatIconRedComponent />;
      seatsTaken = -1;
    } else if (isTaken === 1) {
      newColor = "green";
      newImage = <SeatIconPurpleComponent />;
      seatsTaken = 1;
      console.log(seatsTaken);
    } else if (isTaken === 2) {
      newImage = <SeatIconOrangeComponent />;
      newColor = "blue";
      seatsTaken = 0;
    }
    count += 1;
    //console.log(count);
    this.setState({ color: newColor, isTaken: isTaken, seatImage: newImage });
    this.props.onChangeSeatsTaken(seatsTaken);
    console.log(this.props.seatsTaken);
  };

  render() {
    let chairColor = this.state.seatImage;
    //if(chairColor = )
    return (
      <div className="Seating">
        <div className="class-Room">
          <Websocket
            url={protocol + "localhost:4000"}
            onMessage={this.handleData.bind(this)}
          />
          {/*<div className="circle" style={{ background: this.state.color }}>*/}
          {/*  */}
          {chairColor}
        </div>
        {/*<button className="buttons" onClick={this.handleChange}>*/}
        {/*  refresh*/}
        {/*</button>*/}
      </div>
    );
  }
}

export default Seat;
// we need to mock a signal, form the signal change update the color of the circle
