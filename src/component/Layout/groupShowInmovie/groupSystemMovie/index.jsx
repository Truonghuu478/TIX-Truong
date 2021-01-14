import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";

import dataMaHeThongRap from "../../home/ShowIn/json/maHeThongRap.json";

import { Accordion } from "@material-ui/core";
import { AccordionSummary } from "@material-ui/core";
import { AccordionDetails } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
// LinearProgress
import LinearProgress from "@material-ui/core/LinearProgress";

import { connect } from "react-redux";
import data from "../../../../json/nameMovie.json";

import TimesMovie from "../timesMovie";
// set styles
const useStyles = makeStyles(() => ({
  cinemaImg: {
    maxHeight: "50px",
    maxWidth: "50px",
  },
  cinema__name: {
    // display: "block",
    fontWeight: "bold",
    color: "black",
  },
  typography: {
    display: "flex",
  },
  cinema__info: {
    paddingLeft: "10px",
  },
  button: {
    color: `#108f3e !important`,
    fontWeight: "bold",
    margin: "0 10px 10px 0",

    "&:focus": {
      outline: "none",
    },
    "&:hover": {
      "&: .textMovieFist": {
        color: "red",
      },
    },
  },
  cinema__address: {
    fontSize: "12px",
    color: "#9b9b9b",
    maxWidth: "86%",
    overflow: "hidden",
  },
  inTop2d: {
    display: "block",
    fontWeight: "bold",
    height: "40px",
  },
  notChieu: {
    fontWeight: "500",
    textAlign: "center",
    marginTop: 20,
    color: "black",
  },
  textMap: {
    fontSize: "12px",
    fontWeight: "bold",
    color: "red",
    "&:hover": {
      color: "red",
    },
  },
  textMovieFist: {
    color: "green",
    fontSize: 20,
    transition: "all 0.4s",
    "&:hover": {
      color: "red",
    },
  },
}));

function GroupSystemMovie(props) {
  let classes = useStyles();

  // const [expanded, setExpanded] = useState("panel1");

  // const handleChange = (panel) => (event, newExpanded) => {
  //   setExpanded(newExpanded ? panel : false);
  // };

  // let { chonTheoNgayChieu } = props;

  // render html
  const _renderHTML = React.useCallback(() => {
    let arrTheater = [];
    /// set movie theater
    if (Object.entries(props.detailCinemaToTheater).length > 0) {
      props.detailCinemaToTheater.heThongRapChieu.forEach((cinema) => {
        if (cinema.maHeThongRap === props.maHeThongRap) {
          arrTheater.push(cinema);
        }
      });

      // end

      if (arrTheater.length > 0) {
        return arrTheater[0].cumRapChieu.map((cinema, index) => {
          let lastChar = cinema.tenCumRap.split("-");

          let attackChar = cinema.tenCumRap.split(` `, 1);

          let clusterName = data.find((item) => item.name === attackChar[0]);

          let arrRap = dataMaHeThongRap.filter(
            (rap) => rap.maHeThongRap === props.maHeThongRap
          );

          return (
            <Accordion
              key={index}
              defaultExpanded
              // square
              // expanded={expanded === index}
              // onChange={handleChange(index)}
              // key={index}
              expanded={true}
            >
              <AccordionSummary
                // expandIcon={<ExpandMoreIcon />}
                // aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography component={"div"} className={classes.typography}>
                  <div className="cinema__logo  ">
                    <img
                      className={classes.cinemaImg}
                      src={arrRap[0].hinhAnh}
                      alt="cinema-logo"
                    />
                  </div>
                  <div className={classes.cinema__info}>
                    <span className={classes.cinema__name}>
                      <span style={{ color: `${clusterName.color}` }}>
                        {clusterName.name}{" "}
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
                    <div className="d-flex">
                      <span className={classes.cinema__address}>
                        Lầu 5, Crescent Mall Đại lộ Nguyễn Văn Linh, Phú Mỹ Hưng
                        Quận 7 TP. Hồ Chí Minh
                      </span>
                      <a
                        href="https://www.google.com/maps/place/CGV+Crescent+Mall/@10.7290889,106.7166844,17z/data=!3m1!4b1!4m5!3m4!1s0x31752f894ec205e9:0x2a5bb83950a26d5b!8m2!3d10.7290836!4d106.7188731?hl=vi-VN"
                        className={classes.textMap}
                      >
                        [ Bản đồ ]
                      </a>
                    </div>
                  </div>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <span className={classes.inTop2d}>2D Digital</span>
                  {<TimesMovie cinema={cinema} />}
                </Typography>
              </AccordionDetails>
            </Accordion>
          );
        });
      } else {
        return <div className={classes.notChieu}>Không có lịch Chiếu</div>;
      }
    } else
      return (
        <Fragment>
          <LinearProgress />
        </Fragment>
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.detailCinemaToTheater, props.maHeThongRap]);
  return <Fragment>{_renderHTML()}</Fragment>;
}

const mapStateToProps = (state) => {
  return {
    cinemaMovies: state.MovieManaGerment.cinemaMovies,
    maHeThongRap: state.MovieManaGerment.maHeThongRap,
    chonTheoNgayChieu: state.MovieManaGerment.chonTheoNgayChieu,
    detailCinemaToTheater: state.MovieManaGerment.detailCinemaToTheater,
    indexHome: state.MovieManaGerment.indexHome,

    status: state.UserReducer.status,
    userLogin: state.UserReducer.userLogin,
  };
};
const mapDisPatchToProps = (dispatch) => {
  return {
    __checkOutRePage: (scheduleCode) => {
      dispatch({
        type: "CHECK_LOGIN_BOOKING",
        scheduleCode,
      });
    },
  };
};
export default connect(mapStateToProps, mapDisPatchToProps)(GroupSystemMovie);
