// import the react and reactDOM libraries

import React from "react";
import ReactDOM from "react-dom";
import Seat from "./components/seat";

import Styles from "./styles.css";

// create a react component

const App = () => {
  return (
    // put in seating component page??
    <div>
      <h1 className="Text">Login</h1>
      <div className="room">
        <Seat />
      </div>
    </div>
  );
};

//take the react component and show it on the screen
ReactDOM.render(<App />, document.querySelector("#root"));
