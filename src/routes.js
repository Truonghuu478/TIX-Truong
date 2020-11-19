// import Dashboard from "./pages/admin/dashboard";

import Home from  "./component/Router/Home";
import DetailMovie from    "./component/Router/Cinema";
import Logins from  "./component/Router/Login";
import   "./App.css";
import BookingTicket from'./component/Router/ListDatVe';
import DetailUser from "./component/Router/DetailUser";
//admin 
import Dashboard from "./component/Router/Admin";
// import LoginAdmin from "./pages/LoginAdmin";
// import React from "react";
// const  Home = React.lazy(()=>"./component/Router/Home")  ;
// const DetailMovie =  React.lazy(()=>"./component/Router/Cinema")    ;
// const Logins  = React.lazy(()=>"./component/Router/Login")  ;

// const BookingTicket =  React.lazy(()=>'./component/Router/ListDatVe');
// //admin 
// const Dashboard =  React.lazy(()=>"./component/Router/Admin");
const routesHome = [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/login",
    exact: false,
    component: Logins
  },
  {
    path: "/checkout/:id",
    exact: false,
    component: BookingTicket
  },
  {
    path: "/phim/:id",
    exact: false,
    component: DetailMovie
  },
  {
    path: "/detail-user",
    exact: false,
    component: DetailUser
  }
];

const routesAdmin = [
  {
    path: "/admin",
    exact: false,
    component: Dashboard
  }
];

export { routesHome, routesAdmin };
