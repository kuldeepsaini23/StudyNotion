import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import {Provider}  from "react-redux";
import rootReducer from "./reducer"
import { configureStore } from "@reduxjs/toolkit";
import { Toaster } from "react-hot-toast";
import { Analytics } from '@vercel/analytics/react';

const store = configureStore({
  reducer: rootReducer,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // ! Changed React.Strict mode to ract fragment
  <React.Fragment>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Analytics/>
        <Toaster/>
      </BrowserRouter>
    </Provider>
  </React.Fragment>
);
