import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import firebase from "firebase/app";
import { Auth0Provider } from "@auth0/auth0-react";
// import reportWebVitals from './reportWebVitals';

import App from "./App";

import store from "./store";

import getConfig from "./services/config";
import getAuthConfig from "./services/authConfig";

// styles
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import "react-toastify/dist/ReactToastify.css";
import "aos/dist/aos.css";
import "./index.css";

firebase.initializeApp(getConfig());

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider {...getAuthConfig()}>
      <Provider store={store.getStore()}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
