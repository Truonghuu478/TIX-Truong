import React, { useEffect, useCallback } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import dataMeThongRap from "./json/maHeThongRap.json";

import { connect } from "react-redux";
import TabLogo from "./TabLogo";
import TAbShowTime from "./MovieShowtime";
import data from "../../../../json/nameMovie.json";

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 500,
    textAlign: "center",
    width: "80%",
    margin: "0 auto",
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: "-1px 2px 7px #777",
  },

  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: "50%",
  },
  tab: {
    padding: 0,
    minWidth: 308,

    "&:focus ": {
      outline: "none",
    },
  },
  img: {
    borderBottom: `1px solid gray`,
    paddingBottom: "5px",
    maxWidth: "60px",
    maxHeight: "60px",
  },
}));

//showin
function ShowIn(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setValue(0);
  }, [props.cinemaMovies]);
  // get API he thong rap

  // setChagnemaHeThongRap

  // renderTAbSystemTheater
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const renderTAbSystemTheater = useCallback((maHeThongRap) => {
    if (props.cinemaMovies[maHeThongRap]) {
      return props.cinemaMovies[maHeThongRap][0].lstCumRap.map(
        (cinema, index) => {
          let Rap = dataMeThongRap.filter(
            (rap) => rap.maHeThongRap === maHeThongRap
          );
          let lastChar = cinema.tenCumRap.split("-");
          let attackChar = cinema.tenCumRap.split(` `, 1);

          let clusterName = data.find((item) => item.name === attackChar[0]);

          return (
            <Tab
              key={index}
              orientation="vertical"
              onChange={handleChange}
              variant="scrollable"
              onClick={() => {
                props.handleLstMovie(cinema, index);
              }}
              className={classes.tab}
              label={
                <div className="cinema">
                  <div className="cinema__logo ">
                    <img className="" src={Rap[0].hinhAnh} alt="cinema-logo" />
                  </div>
                  <div className="cinema__info">
                    <span className="cinema__name cut">
                      <span style={{ color: `${clusterName.color}` }}>
                        {clusterName.name}
                      </span>{" "}
                      -{" "}
                      {lastChar[1] === " CGV Saigonres Nguyễn Xí"
                        ? lastChar[1]
                            .split(" ")
                            .map((char, index) =>
                              index !== 1 ? char + " " : null
                            )
                        : lastChar[1]}
                    </span>
                    <span className="cinema__address cut">{cinema.diaChi}</span>
                    <span className="cinema__detail">[chi tiết]</span>
                  </div>
                </div>
              }
              {...a11yProps(index)}
            />
          );
        }
      );
    }
  });
  // handle change color
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const changeColor = React.useCallback(() => {
    switch (props.maHeThongRap) {
      // eslint-disable-next-line no-lone-blocks
      case "BHDStar": {
        return "#74bf44";
        // eslint-disable-next-line no-lone-blocks
      }
      case "CGV": {
        return "red";
        // eslint-disable-next-line no-lone-blocks
      }
      case "CineStar": {
        return "#e04e7e";
      }
      case "Galaxy": {
        return "#fa6838";
      }
      case "LotteCinima": {
        return "#cc483f";
      }
      default: {
        return "#e9b537";
      }
    }
  }, [props.maHeThongRap]);
  return (
    <div id="show-in" className="ShowIn">
      <div className={classes.root}>
        <TabLogo />

        <Tabs
          border={1}
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
          style={{ color: changeColor() }}
        >
          {renderTAbSystemTheater(props.maHeThongRap)}
        </Tabs>

        <TAbShowTime maHeThongRap={props.maHeThongRap} />
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    listMovieTheater: state.MovieManaGerment.listMovieTheater,
    cinemaMovies: state.MovieManaGerment.cinemaMovies,
    maHeThongRap: state.MovieManaGerment.maHeThongRap,
  };
};
const mapDispatchProps = (dispatch) => {
  return {
    handleLstMovie: (cinema, index) => {
      const action = {
        type: "GET_LIST_MOVIE",
        data: cinema,
        index,
      };
      dispatch(action);
    },
  };
};
export default connect(mapStateToProps, mapDispatchProps)(ShowIn);
