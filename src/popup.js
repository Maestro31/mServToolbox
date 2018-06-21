import React, { Component } from "react";
import ReactDOM from "react-dom";

class Popup extends Component {
  render() {
    return (
      <div className="Popup">
        <div className="Popup-header">
          <h2>Welcome to React</h2>
        </div>
        <p className="Popup-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

ReactDOM.render(<Popup />, document.getElementById("root"));
