/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
// import RTL from "layouts/RTL.js";

import "assets/css/material-dashboard-react.css?v=1.8.0";

import { Provider } from "mobx-react";
import store from "./store";
import * as serviceWorker from "./serviceWorker";

import Mobx from "./pages/Mobx.js";
import Home from "./pages/Home.js";
import Django from "./pages/Django.js";
import nodeExpress from "./pages/nodeExpress.js";


const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <Route path="/admin" component={Admin} />
        {/* <Route path="/rtl" component={RTL} /> */}
        <Route path="/mobx" component={Mobx} />
        <Route path="/home" component={Home} />
        <Route path="/django" component={Django} />
        <Route path="/express" component={nodeExpress} />
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
