import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./Context/AuthContext";
import { StyledEngineProvider } from "@mui/material/styles";
ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};
