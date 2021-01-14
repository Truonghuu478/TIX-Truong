import React, { useMemo } from "react";
import Button from "@material-ui/core/Button";
// import * as action from "../../../../Redux/action/moive";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles(() => ({
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
}));
function TimesMovie(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { chonTheoNgayChieu } = useSelector((state) => state.MovieManaGerment);
  let { cinema } = props;
  // eslint-disable-next-line 
  let screenWidth = useMemo(() => window.innerWidth, [window.innerWidth]);

  const renderInfoMovie = () => {
    if (Object.entries(cinema).length > 0) {
      let a = cinema.lichChieuPhim.filter(
        (lichChieu) =>
          lichChieu.ngayChieuGioChieu.slice(0, 10) === chonTheoNgayChieu
      );
      return a.length > 0 ? (
        a.map((lich, index) => {
          return (
            <Link
              key={index}
              to={
                props.userLogin || localStorage.getItem("user")
                  ? `/checkout/${lich.maLichChieu}`
                  : "/login"
              }
            >
              <Button
                onClick={() => {
                  let { maLichChieu } = lich;
                  dispatch({
                    type: "CHECK_LOGIN_BOOKING",
                    scheduleCode: maLichChieu,
                  });
                }}
                style={{
                  padding: screenWidth > 768 ? "8px" : "12px 6px",
                  fontSize: screenWidth > 768 ? 14 : 17,
                }}
                variant="contained"
                className={classes.button}
              >
                <span className={"textMovieFist"}>
                  {lich.ngayChieuGioChieu.slice(11, 16)}
                </span>
                <span className="text-secondary">~</span>
                <span className="text-secondary">
                  {parseInt(lich.ngayChieuGioChieu.slice(11, 16)) + 1 < 10
                    ? `0${
                        parseInt(lich.ngayChieuGioChieu.slice(11, 16)) + 1
                      }:00`
                    : `${
                        parseInt(lich.ngayChieuGioChieu.slice(11, 16)) + 1
                      }:90`}
                </span>
              </Button>
            </Link>
          );
        })
      ) : (
        <Alert severity="error">
          Xin lỗi Lịch chiếu chưa cập nhật, mời bạn chọn rạp khác !
        </Alert>
      );
    }
  };
  return <>{renderInfoMovie()}</>;
}
export default TimesMovie;
