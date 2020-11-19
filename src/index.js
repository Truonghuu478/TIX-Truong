import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import {ThemeProvider } from "@material-ui/core";

import theme from "./themes"
import App from "./App";


import store from "./setups"
ReactDOM.render(

  <ThemeProvider  theme={theme}>

    <Provider store={store} >
        <App />
      
    </Provider>
  </ThemeProvider>

    , document.getElementById('root')
);


