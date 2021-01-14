import React from "react";
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Avatar from '@material-ui/core/Avatar';
import classes1 from "classnames";
import Poppers from "@material-ui/core/Popper";
// import Divider from "@material-ui/core/Divider";
// @material-ui/icons
// import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
// import Dashboard from "@material-ui/icons/Dashboard";
import Search from "@material-ui/icons/Search";
// core components
import CustomInput from "../CustomInput/CustomInput.js";
import Button from "../CustomButtons/Button.js";

import styles from "../../../assets/jss/components/headerLinksStyle.js";
// constant  
import *as tyAction from "../../../../Redux/constanst";
// redux 
import { useDispatch, useSelector } from "react-redux";

import { useLocation, Link } from "react-router-dom";
const useStyles = makeStyles(styles);

export default function AdminNavbarLinks(props) {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const { globalSearch, statusAdmin } = useSelector(state => state.AdminReducer)
  const [openNotification, setOpenNotification] = React.useState(null);
  const [openProfile, setOpenProfile] = React.useState(null);
  const handleLocalStorage = React.useCallback(
    (i = "user") => {
      return JSON.parse(localStorage.getItem(i))
    }
    , [])


  const handleClickNotification = event => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };

  const handleCloseNotification = () => {
    setOpenNotification(null);
  };
  const handleClickProfile = event => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };
  React.useEffect(() => {
    if (location.pathname !== "/admin/user") {
      dispatch({
        type: tyAction.POST_VALUE_SEARCH,
        payload: "",
        statusAdmin: location.pathname
      })
    }
    // eslint-disable-next-line
  }, [location])
  return (
    <div>
      { statusAdmin !== "/admin/maps" &&
        <div className={classes.searchWrapper}>
          <CustomInput
            onChange={(e) => dispatch({
              type: tyAction.POST_VALUE_SEARCH,
              payload: e.target.value,
              statusAdmin: location.pathname
            })}
            value={globalSearch}
            formControlProps={{
              className: classes.margin + " " + classes.search
            }}
            inputProps={{
              placeholder: "Search",
              inputProps: {
                "aria-label": "Search"
              }
            }}
          />
          <Button className={classes.noneOutline} color="white" aria-label="edit" justIcon round>
            <Search />
          </Button>
        </div>
      }
      {/* <Button
        color={window.innerWidth > 959 ? "transparent" : "white"}
        justIcon={window.innerWidth > 959}
        simple={!(window.innerWidth > 959)}
        aria-label="Dashboard"
        className={classes.buttonLink}
      >
        <Dashboard className={classes.icons} />
        <Hidden mdUp implementation="css">
          <p className={classes.linkText}>Dashboard</p>
        </Hidden>
      </Button> */}
      <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openNotification ? "notification-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickNotification}
          className={classes1(classes.buttonLink, classes.noneOutline)}
        >
          <Notifications className={classes.icons} />
          <span className={classes.notifications}>5</span>
          <Hidden mdUp implementation="css">
            <p onClick={handleCloseNotification} className={classes.linkText}>
              Notification
            </p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openNotification)}
          anchorEl={openNotification}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openNotification }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="notification-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseNotification}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      Mike John responded to your email
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      You have 5 new tasks
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      You{"'"}re now friend with Andrew
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      Another Notification
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      Another One
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
      <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openProfile ? "profile-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={classes1(classes.buttonLink, classes.noneOutline)}
        >
          {/* <Person className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Profile</p>
          </Hidden> */}
          <Avatar>{handleLocalStorage() && handleLocalStorage().maLoaiNguoiDung === "QuanTri" ? handleLocalStorage().hoTen.slice(0, 1) : handleLocalStorage("userAdmin")?.hoTen.slice(0, 1)}</Avatar>

        </Button>
        <Poppers
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openProfile }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu">

                    <MenuItem
                      onClick={handleCloseProfile}
                      className={classes.dropdownItem}
                    >
                      <Link style={{ width: "100%" }} to="/">

                        Go to website
                    </Link>
                    </MenuItem >
                    <MenuItem className={classes.dropdownItem} onClick={() => {
                      localStorage.removeItem("userAdmin");
                      setOpenProfile(null)
                    }}>
                      {/* <Divider light /> */}
                      <Link style={{ width: "100%" }} to="/admin" > Logout</Link>

                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
    </div>
  );
}
