import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";

import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./store/AuthContext";
import Store from "./store/index";

ReactDOM.render(
  <BrowserRouter>
    <AuthContextProvider>
      <Provider store={Store}>
        <App />
      </Provider>
    </AuthContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
