// import the react and reactDOM libraries

import React, { Component } from "react";
import ReactDOM from "react-dom";
import Seat from "./components/seat";
import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import EventSeatIcon from "@material-ui/icons/EventSeat";
// import Stage from "./components/Stage";
// import TitleStage from "./components/titleStage";
import CenterSectionComponent from "./components/CenterSectionComponent";
import LeftSectionComponent from "./components/LeftSectionComponent";
import LeftsecComponent from "./components/LeftsecComponent";
import ComponentComponent from "./components/ComponentComponent";
import RightSectionComponent from "./components/RightSectionComponent";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Styles from "./styles.css";
import LcSectionComponent from "./components/LcSectionComponent";
import WhiteBoardComponent from "./components/WhiteBoardComponent";
import badgeCustomG from "./components/badgeCustomG";
import badgeCustomP from "./components/badgeCustomP";
import { withStyles } from "@material-ui/core/styles";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

// create a react component
// color :{
//   purple : "#7020FF",
//   orange  : "#FFAB38",
//   red : "#F84B5A",
const StyledBadge1 = withStyles(theme => ({
  badge: {
    backgroundColor: "#7020FF",
    right: -3,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px"
  }
}))(Badge);

const StyledBadge2 = withStyles(theme => ({
  badge: {
    backgroundColor: "#F84B5A",
    right: -3,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px"
  }
}))(Badge);

class App extends Component {
  constructor() {
    super();
    this.state = {
      seatsInClass: 35,
      totalSeats: 35,
      seatsTaken: 0
    };
  }
  // handleChangeSeat = event => {
  //   this.setState({ seatsTaken: event.target.seatsTaken });
  // };

  handleChangeSeat = takenSeats => {
    let total = this.state.totalSeats;
    let seatsinClass = this.state.seatsInClass;
    if (takenSeats < 1) {
      // set max seat number
      this.setState({
        seatsTaken: this.state.seatsTaken + takenSeats,
        totalSeats: this.state.totalSeats - takenSeats
      });
    } else {
      this.setState({
        totalSeats: this.state.totalSeats - takenSeats,
        seatsTaken: this.state.seatsTaken + takenSeats
      });
    }

    console.log(this.state.totalSeats);
  };

  render() {
    return (
      // put in seating component page??
      <div>
        <div>
          <AppBar color="primary" position="static">
            <h1 className="Title">Welcome to VacanSeat</h1>
            <Tabs value={0}>
              <Tab
                label={
                  <Badge color="secondary">
                    {"total seats" + ": " + this.state.seatsInClass}
                  </Badge>
                  // <StyledBadge1 badgeContent={4} color="primary">
                  //   <EventSeatIcon />
                  // </StyledBadge1>
                }
              />
              <Tab
                label={
                  // <Badge color="primary" badgeContent={this.state.totalSeats}>
                  //   Seats Available
                  // </Badge>
                  <StyledBadge1
                    badgeContent={this.state.totalSeats}
                    color="primary"
                  >
                    Seats Available
                  </StyledBadge1>
                }
              />
              <Tab
                label={
                  // <Badge color="info" badgeContent={this.state.seatsTaken}>
                  //   Seats Taken
                  // </Badge>
                  <StyledBadge2
                    badgeContent={
                      this.state.seatsTaken === 0 ? "0" : this.state.seatsTaken
                    }
                    color="primary"
                  >
                    Seats Taken
                  </StyledBadge2>
                }
              />
            </Tabs>
          </AppBar>
          <div className="Page">
            <div className="SeatNumber">
              <div className="spacer">
                <div className="white-board">White Board</div>
              </div>
              <ComponentComponent />
            </div>
            <div>
              <div className="seating-chart">
                <div className="left">
                  {/*<LeftSectionComponent />*/}
                  {/*<LeftsecComponent />*/}
                  <LcSectionComponent />
                </div>
                <div className="center">
                  <Seat
                    seatsTaken={this.state.seatsTaken}
                    onChangeSeatsTaken={this.handleChangeSeat}
                  />
                  {/*<button className="testing">hi</button>*/}

                  <CenterSectionComponent />
                </div>
                <div className="right">
                  <RightSectionComponent />
                </div>
                {/*<CenterSectionComponent />*/}
              </div>
              {/*<div className="room">*/}
              {/*  <Seat*/}
              {/*    seatsTaken={this.state.seatsTaken}*/}
              {/*    onChangeSeatsTaken={this.handleChangeSeat}*/}
              {/*  />*/}
              {/*</div>*/}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/*const App = () => {
  return (
    // put in seating component page??
    <div>
      <h1 className="Text">Login</h1>
      <div className="room">
        <Seat />
      </div>
    </div>
  );
};*/

//take the react component and show it on the screen
ReactDOM.render(<App />, document.querySelector("#root"));
