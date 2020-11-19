"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Dashboard = _interopRequireDefault(require("@material-ui/icons/Dashboard"));

var _Person = _interopRequireDefault(require("@material-ui/icons/Person"));

var _LibraryBooks = _interopRequireDefault(require("@material-ui/icons/LibraryBooks"));

var _LocationOn = _interopRequireDefault(require("@material-ui/icons/LocationOn"));

var _Dashboard2 = _interopRequireDefault(require("./Dashboard/Dashboard"));

var _Maps = _interopRequireDefault(require("./Maps/Maps.js"));

var _index = _interopRequireDefault(require("./manageuser/index.js"));

var _index2 = _interopRequireDefault(require("./managemovie/index.js"));

var _index3 = _interopRequireDefault(require("./managershowtimes/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
// import BubbleChart from "@material-ui/icons/BubbleChart";
// import Notifications from "@material-ui/icons/Notifications";
// import Unarchive from "@material-ui/icons/Unarchive";
// import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
// import UserProfile from "views/UserProfile/UserProfile.js";
// import TableList from "views/TableList/TableList.js";
// import Typography from "views/Typography/Typography.js";
// import Icons from "views/Icons/Icons.js";
// import NotificationsPage from "views/Notifications/Notifications.js";
// import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
var dashboardRoutes = [{
  path: "/dashboard-page",
  name: "Dashboard",
  icon: _Dashboard["default"],
  component: _Dashboard2["default"],
  layout: "/admin"
}, {
  path: "/user",
  name: "Users",
  icon: _Person["default"],
  component: _index["default"],
  layout: "/admin"
}, {
  path: "/movie-theater",
  name: "Movie-theaters",
  icon: "content_paste",
  component: _index2["default"],
  layout: "/admin"
}, {
  path: "/movie-showtime",
  name: "movie-showtime",
  icon: _LibraryBooks["default"],
  component: _index3["default"],
  layout: "/admin"
}, // {
//   path: "/icons",
//   name: "Icons",
//   rtlName: "الرموز",
//   icon: BubbleChart,
//   component: Icons,
//   layout: "/admin"
// },
{
  path: "/maps",
  name: "Maps",
  icon: _LocationOn["default"],
  component: _Maps["default"],
  layout: "/admin"
} // {
//   path: "/notifications",
//   name: "Notifications",
//   rtlName: "إخطارات",
//   icon: Notifications,
//   component: NotificationsPage,
//   layout: "/admin"
// },
// {
//   path: "/rtl-page",
//   name: "RTL Support",
//   rtlName: "پشتیبانی از راست به چپ",
//   icon: Language,
//   component: RTLPage,
//   layout: "/rtl"
// },
// {
//   path: "/upgrade-to-pro",
//   name: "Upgrade To PRO",
//   rtlName: "التطور للاحترافية",
//   icon: Unarchive,
//   component: UpgradeToPro,
//   layout: "/admin"
// }
];
var _default = dashboardRoutes;
exports["default"] = _default;