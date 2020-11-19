import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/umd/popper.min.js';

import ThemeSnow from "./themes/Snow";
import {BrowserRouter,Route,Switch} from "react-router-dom";
import './App.scss';
import {routesHome,routesAdmin} from "./routes"

import PageNotFound from "./pages/pageNotFound";
import HomeTemplate from "./templates/home-template";
import AdminTemplate from "./templates/admin-template";
import LoginAdmin from "./pages/LoginAdmin";
// favicon.ico
const showMenuHome = routes => {
  if (routes && routes.length > 0) {
    return routes.map((item, index) => {
      return (
        <HomeTemplate
          key={index}
          path={item.path}
          exact={item.exact}
          Component={item.component}
        />
      );
    });
  }
};

const showMenuAdmin = routes => {
  if (routes && routes.length > 0) {
    return routes.map((item, index) => {
      return (
        <AdminTemplate
          key={index}
          path={item.path}
          exact={item.exact}
          Component={item.component}
        />
      );
    });
  }
};
function App() {
  return (
    
    <BrowserRouter>
      <div>
        <ThemeSnow/>
        <Switch>
          {showMenuHome(routesHome)}
          {showMenuAdmin(routesAdmin)}
          <Route   path="/admin-login" component={LoginAdmin} />
          {/* <Route path="/admin" component={Admin} /> */}
            {/* <Route path=""/> */}
            <Route exact={false} path="" component={PageNotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App;



