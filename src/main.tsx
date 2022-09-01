import React from "react";
import ReactDOM from "react-dom/client";
import Initialize from "./Initialize";
import "./storage/index";
import "antd/dist/antd.css";
import "./styles/index.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Initialize />
  </React.StrictMode>
);
