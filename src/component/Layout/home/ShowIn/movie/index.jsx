import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core";

import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import propType from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";



const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    textAlign: "left",
    overflowX: "hidden",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    width: "100%",
    display: "flex"
  },
  movie_logo: {
    maxHeight: 50,
    maxWidth: 50,
    paddingRight: 15
  },

  nameMovie: {
    marginLeft: "5px",
    fontWeight: "bold",
    color: "black",
  },
  btc16: {
    borderRadius: "4px",
    padding: "2px",
    background: "red",
    fontSize: "12px",
    textAlign: "center",
    minWidth: "33px",
    color: "white",
  },
  info_show: {
    margin: 0,
    fontSize: "12px",
    color: "gray",
    lineHeight: 1.7,
  },
  nullMovie: {
    fontWeight: "bold",
    fontSize: "1.2rem",
    color: "black",
    textAlign: "center",
    height: "70px",
    lineHeight: "70px",
  },
  button: {
    color: `#108f3e !important`,
    fontWeight: "bold",
    margin: "0 5px 10px 0",

    "&:focus": {
      outline: "none",
    },
  },
}));
MovieShowIn.prototype = {
  movieToDay: propType.array,
  dataMovieFist: propType.array,
};
MovieShowIn.defaultProps = {
  movieToDay: [],
  dataMovieFist: [],
};
function MovieShowIn(props) {
  const classes = useStyles();
  let { toDay } = props;
  const { movieToDay, dataMovieFist, indexHome } = props;
  const onerror = React.useMemo(() => "\img/no-image.png")




  const renderMovie = React.useCallback(() => {
    // render lich chieu  phim
    if ((indexHome !== 0 ? movieToDay : dataMovieFist).length > 0) {
      return (indexHome !== 0 ? movieToDay : dataMovieFist).map((movie, index) => {
        let lichChieu = movie.lstLichChieuTheoPhim.filter(
          (lc) => lc.ngayChieuGioChieu.slice(0, 10) === toDay
        );
        return (
          <Accordion key={index} defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={movie.tenPhim}
              id={movie.tenPhim}
            >
              <div className={classes.heading} >
                <img
                  className={classes.movie_logo}
                  src={movie.hinhAnh}
                  onError={(e) => { e.target.onerror = null; e.target.src = "\img/default-film.webp" }}

                  alt="phim"
                />
                <div className=" pl-0">
                  <span className={classes.btc16}>C 16</span>
                  <span className={classes.nameMovie}>{movie.tenPhim}</span>
                  <p className={classes.info_show}>
                    120 phút - TIX 9.1 - IMDb 0
                      </p>
                </div>
              </div>
            </AccordionSummary >
            <AccordionDetails >
              <Typography>
                {_renderShowTimeMovie(lichChieu)}
              </Typography>
            </AccordionDetails >
          </Accordion>
        );
      });
    }
    return <p className={classes.nullMovie}>Không có lịch chiếu</p>;

  }, [indexHome !== 0 ? movieToDay : dataMovieFist]);


  const _renderShowTimeMovie = React.useCallback((lstSuatChieu) => {

    return lstSuatChieu.map((lc, index) => {
      // console.log(lc.maLichChieu);
      let soPast = parseInt(lc.ngayChieuGioChieu.slice(11, 13)) + 2;
      if (soPast === 24) {
        soPast = "00";
      }
      if (soPast === "2") {
        soPast = "02";
      }
      let startMovie = lc.ngayChieuGioChieu.slice(11, 16);
      return (
        <Link key={index} to={props.userLogin ? `/checkout/${lc.maLichChieu}` : "/login"}>
          <Button onClick={() => { props.__checkOutRePage(lc.maLichChieu) }} variant="contained" className={classes.button}>
            <span className="text-success">{startMovie}</span>
            <span className="font-weight-bold text-secondary px-1"> ~ </span>
            <span className="text-secondary">{soPast}:90</span>
          </Button>
        </Link>
      );
    });
  }, [indexHome !== 0 ? movieToDay : dataMovieFist]);
  return <div className={classes.root}>{renderMovie()}</div>;
}
const mapStateToProps = (state) => {
  return {
    maHeThongRap: state.MovieManaGerment.maHeThongRap,
    userLogin: state.UserReducer.userLogin,
    scheduleCode: state.UserReducer.scheduleCode,
    toDay: state.MovieManaGerment.toDay,
    indexHome: state.MovieManaGerment.indexHome,



  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    __checkOutRePage: (maLichChieu) => {
      dispatch({
        type: "CHECK_LOGIN_BOOKING",
        scheduleCode: maLichChieu
      })
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MovieShowIn);
