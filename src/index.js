import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

const viewport = document.getElementsByTagName("body")[0];
const app = document.createElement("div");
app.id = "root";

if (viewport) viewport.prepend(app);

//ReactDOM.render(<App />, document.getElementById("root"));
