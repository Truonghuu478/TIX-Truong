import React, { useState, useEffect } from "react";
// import clsx from 'clsx';
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
// import PerfectScrollbar from 'react-perfect-scrollbar'

// action
import * as Action from "../../../../Redux/action/moive";
import { NavLink } from "react-router-dom";
// redux
import { useSelector, useDispatch } from "react-redux";

const themes = createMuiTheme({
  overrides: {
    // Style sheet name ⚛️
    MuiButton: {
      // Name of the rule
      text: {
        // Some CSS

        borderRadius: 3,
        border: 0,
        color: "white",
        height: 48,
        padding: "0 ",

        "&:focus": {
          outline: "none",
        },
      },
    },
  },
});
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  col: {
    fontSize: 14,
    fontWeight: "500",
    color: "#676767",
    transition: "all .2s",

    "& span": {
      color: "#a99c9c",
    },
    "&:hover": {
      color: "white",

      background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
      " & span": {
        color: "white",
      },
    },
    "&:focus ": {
      color: "white",

      background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
      " & span": {
        color: "white",
      },
    },
  },
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function FastTicket() {
  const classes = useStyles();
  // const theme = useTheme();
  const { maNhom, listMovieOnSystemTheater } = useSelector(
    (state) => state.MovieManaGerment
  );
  const { userLogin } = useSelector((state) => state.UserReducer);
  // dispath
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const [ob, setOb] = useState({
    phim: "",
    rapChieu: "",
    thoiGianChieu: "",
    suatChieu: "",
  });

  const [isValid, setValid] = useState(true);

  // choose movie
  const [nameVal, setNameVal] = useState([]);
  // choose theaters
  const [theaters, setTheaters] = useState([]);
  // choose times
  const [timeVal, setTimeVal] = useState([]);
  // choose interest
  const labelId = React.useMemo(() => {
    return {
      phim: "Phim",
      rapChieu: "Rạp",
      toDay: "Ngày chiếu",
      suatChieu: "Suất chiếu",
    };
  }, []);

  //renderRap
  const handleRenderRap = React.useCallback(() => {
    if (theaters.length > 0) {
      return theaters.map((item, index) => {
        return (
          <MenuItem key={index} value={item.maCumRap} className={classes.col}>
            {item.tenCumRap}
          </MenuItem>
        );
      });
    }

    return <p>Vui lòng chọn phim</p>;
    // eslint-disable-next-line
  }, [theaters]);
  // handle times rap chieu
  const handleAfterTimes = () => {
    let arr = [];
    listMovieOnSystemTheater.forEach((item) =>
      item.lstCumRap.forEach((list) => arr.push(list))
    );
    let a = [];

    arr.forEach((item) => {
      if (
        item.danhSachPhim.findIndex(
          (mob) => parseInt(mob.maPhim) === parseInt(ob.phim)
        ) > -1
      ) {
        a.push(item);
      }
    });
    setTheaters(a);
  };
  // handle time suat chieu
  const handleAfterChoose = (value) => {
    let systemTheater =
      theaters.find((item) => item.maCumRap === ob.rapChieu) || null;
    let checkTimes = [];
    if (theaters.length > 0 && systemTheater) {
      systemTheater.danhSachPhim.forEach((mob) =>
        mob.lstLichChieuTheoPhim.forEach((times) => {
          if (times.ngayChieuGioChieu.slice(0, 10) === value) {
            checkTimes.push(times);
          }
        })
      );
    }
    setTimeVal(checkTimes);
  };
  const handleChange = (e) => {
    let { name, value } = e.target;

    switch (name) {
      case "phim":
        // eslint-disable-next-line
        {
          setOb({
            ...ob,
            phim: value,
            rapChieu: "",
            thoiGianChieu: "",
            suatChieu: "",
          });
          dispatch(Action.fetchListSyStemTheaterClusters("GP01"));
        }
        break;
      case "rapChieu":
        // eslint-disable-next-line
        {
          setOb({ ...ob, rapChieu: value, thoiGianChieu: "", suatChieu: "" });
        }
        break;

      case "thoiGianChieu":
        // eslint-disable-next-line
        {
          setOb({ ...ob, thoiGianChieu: value, suatChieu: "" });
          // console.log(theaters);
          handleAfterChoose(value);
        }
        break;

      default:
        setOb({ ...ob, suatChieu: value });
        break;
    }
  };
  // close select
  const handleSelect = () => {
    document.body.style.cssText = "padding-right:-17px; overflow: auto;";

    setOpen(!open);
  };

  useEffect(() => {
    const a = () => {
      return Action.fetchListMovie(maNhom)

        .then((res) => {
          setNameVal(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    a();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (listMovieOnSystemTheater) {
      handleAfterTimes();
    }
    // eslint-disable-next-line
  }, [listMovieOnSystemTheater]);
  // check button disable
  useEffect(() => {
    for (const [key] of Object.entries(ob)) {
      if (ob[key] !== "") {
        setValid(false);
      } else {
        setValid(true);
        return;
      }
    }
    // eslint-disable-next-line
  }, [ob.suatChieu]);
  // render thoi gian chieu
  const renderTimesChieu = React.useCallback(() => {
    let day = new Date("2019-01-01");

    // let nextDay = setDate()
    let listDay = [
      "Hôm nay",
      "Ngày mai",
      "Thứ ba",
      "Thứ tư",
      "Thứ năm",
      "Thứ sáu",
      "Thứ bảy",
    ];
    if (ob.phim && ob.rapChieu) {
      return listDay.map((item, index) => {
        let newDay = new Date(day.setDate(index + 1));
        let charTime = "";
        let charI = newDay.toLocaleDateString().split("/", 3);

        charTime =
          charI[2] +
          "-" +
          (charI[0] < 10 ? "0" + charI[0] + "-" : charI[0] + "-") +
          (charI[1] < 10 ? "0" + charI[1] : charI[1]);

        // console.log(charTime);
        return (
          <MenuItem
            key={index}
            value={charTime}
            className={classes.col}
            style={{
              display: "block",
              justifyContent: "center",
              textCenter: "center",
            }}
          >
            <p style={{ fontSize: "15px", marginBottom: "2px" }}>{item}</p>
            <span style={{ fontSize: "13px", fontWeight: "600" }}>
              {charTime}
            </span>
          </MenuItem>
        );
      });
    }
    return <span>Vui lòng chọn phim và rạp</span>;
    // console.log(detailCinemaToTheater.heThongRapChieu);
    // eslint-disable-next-line
  }, [ob.phim, ob.rapChieu]);
  //render suat chieu
  const renderScreenings = React.useCallback(() => {
    if (timeVal.length > 0) {
      return timeVal.map((name, index) => (
        <MenuItem key={index} className={classes.col} value={name.maLichChieu}>
          {new Date(name.ngayChieuGioChieu).toLocaleTimeString()}
        </MenuItem>
      ));
    }
    return <span>Không có suất chiếu</span>;
    // eslint-disable-next-line
  }, [ob.phim, ob.rapChieu, ob.thoiGianChieu]);
  //check login
  const handleCheckLogin = () => {
    dispatch({
      type: "CHECK_LOGIN_BOOKING",
      scheduleCode: ob.suatChieu,
    });
  };
  return (
    <div className="FastTicket">
      <div className="FastTicket__content">
        <FormControl className={classes.formControl}>
          <InputLabel id="i-phim-label">{labelId.phim}</InputLabel>

          <Select
            id="i-phim"
            // multiple
            // variant="scrollable"
            open={open}
            // style={{height: 300}}
            onChange={handleChange}
            name="phim"
            onClose={handleSelect}
            onOpen={handleSelect}
            input={<Input />}
            MenuProps={MenuProps}
            value={ob.phim}
          >
            {nameVal.map((item, index) => (
              <MenuItem key={index} className={classes.col} value={item.maPhim}>
                {item.tenPhim}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="rap-chieu-label">{labelId.rapChieu}</InputLabel>
          <Select
            id="rap-chieu"
            name="rapChieu"
            // onClose={handleSelect}
            // onOpen={handleSelect}
            // open={open}
            // open={open}
            // onClose={handleSelect}
            // onOpen={handleSelect}
            onChange={handleChange}
            input={<Input />}
            MenuProps={MenuProps}
            value={ob.rapChieu}
            // renderValue={(selected) => selected.join(', ')}
            // MenuProps={MenuProps}
            displayEmpty={false}
          >
            {handleRenderRap()}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="thoiGianChieu-label">{labelId.toDay}</InputLabel>
          <Select
            id="thoi-gian-chieu"
            name="thoiGianChieu"
            onChange={handleChange}
            input={<Input />}
            MenuProps={MenuProps}
            value={ob.thoiGianChieu}
          >
            {renderTimesChieu()}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="suat-chieu-label">{labelId.suatChieu}</InputLabel>

          <Select
            MenuProps={MenuProps}
            value={ob.suatChieu}
            // multiple
            // displayEmpty
            id="suat-chieu"
            // value={personName}
            onChange={handleChange}
            input={<Input />}
            name="suatChieu"
          >
            {renderScreenings()}
          </Select>
        </FormControl>

        <div className="fast--button">
          <ThemeProvider theme={themes}>
            <Button
              onClick={handleCheckLogin}
              style={{
                background: isValid
                  ? "gray"
                  : "linear-gradient(45deg, rgb(243 33 33) 30%, rgb(236 88 88) 90%)",
              }}
              disabled={isValid}
            >
              <NavLink
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "500",
                  letterSpacing: "2px",
                  fontSize: "20px",
                  width: "100%",
                }}
                to={userLogin ? `/checkout/${ob.suatChieu}` : "/login"}
              >
                MUA VÉ NGAY
              </NavLink>
            </Button>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}
