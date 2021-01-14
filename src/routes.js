// import Dashboard from "./pages/admin/dashboard";
import { lazy } from "react";
// import Home from  "./component/Router/Home";
// import DetailMovie from    "./component/Router/Cinema";
// import Logins from  "./component/Router/Login";
import "./App.css";
// import BookingTicket from'./component/Router/ListDatVe';
// import DetailUser from "./component/Router/DetailUser";
//admin
// import Dashboard from "./component/Router/Admin";
// import LoginAdmin from "./pages/LoginAdmin";
// import React from "react";
const Home = lazy(() => import("./component/Router/Home"));
const DetailMovie = lazy(() => import("./component/Router/Cinema"));
const Logins = lazy(() => import("./component/Router/Login"));

const BookingTicket = lazy(() => import("./component/Router/ListDatVe"));
//admin
const Dashboard = lazy(() => import("./component/Router/Admin"));
const DetailUser = lazy(() => import("./component/Router/DetailUser"));

const routesHome = [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/login",
    exact: false,
    component: Logins,
  },
  {
    path: "/checkout/:id",
    exact: false,
    component: BookingTicket,
  },
  {
    path: "/phim/:id",
    exact: false,
    component: DetailMovie,
  },
  {
    path: "/detail-user",
    exact: false,
    component: DetailUser,
  },
];

const routesAdmin = [
  {
    path: "/admin",
    exact: false,
    component: Dashboard,
  },
];

export { routesHome, routesAdmin };
