import React, { useMemo, useEffect } from "react";
import * as action from "../../../../Redux/action/bookingAction";
import nameMovie from "../../../../json/nameMovie.json";
import { useSelector, useDispatch } from "react-redux";
import WeekendIcon from "@material-ui/icons/Weekend";

import Swal from "sweetalert2";
import { Typography, Box } from "@material-ui/core";
import UseStyles from "./style";

function ShowChair(props) {
  const classes = UseStyles();

  const { listTicketRoom, stt, step, listChairs, chooseChair, sttNormal, sttVip } = useSelector(
    (state) => state.BookingReducer
  );
  const { listMovieTheater } = useSelector((state) => state.MovieManaGerment);
  const [movieTimes, setMovieTimes] = React.useState("5:00");
  let { danhSachGhe } = listTicketRoom;
  let times = React.useMemo(() => null);
  let screenWidth = React.useMemo(() => window.innerWidth)
  // const {userLogin} =useSelector((state)=>state.UserReducer);
  let arrChair = [];
  const dispatch = useDispatch();

  const getDetailChair = (chair, name) => {
    if (!chair.daDat) {
      chair.daDat = true;

      document.getElementById(chair.maGhe).style.color = "#44c020";
    } else {
      chair.daDat = false;

      if (chair.loaiGhe === "Vip") {
        document.getElementById(chair.maGhe).style.color = "#e08411";
      } else {
        document.getElementById(chair.maGhe).style.color = "#3e515d";
      }
    }

    dispatch(action.getDetailChair(chair, name));

    // else if(){
    //   document.getElementById(chair.maGhe).style.color = "none";

    // }
  };
  // renderTheater
  const __renderTheater = React.useCallback(() => {
    if (listTicketRoom) {
      const { thongTinPhim } = listTicketRoom;

      let newNameTheater = thongTinPhim.tenCumRap.split(" ")[0];
      // console.log("newTheater",newNameTheater);
      let nameTheater;

      listMovieTheater.forEach((theater) => {
        // console.log(theater);

        if (newNameTheater === "GLX") {
          let GLX = "Galaxy Cinema";
          if (
            theater.tenHeThongRap.split(" ")[0].toLowerCase() ===
            GLX.split(" ")[0].toLowerCase()
          ) {
            nameTheater = theater;
          }
        } else if (
          theater.tenHeThongRap.split(" ")[0].toLowerCase() ===
          newNameTheater.toLowerCase()
        ) {
          nameTheater = theater;
        } else if (newNameTheater === "CNS") {
          let CNS = "CineStar";
          if (
            theater.tenHeThongRap.split(" ")[0].toLowerCase() ===
            CNS.split(" ")[0].toLowerCase()
          ) {
            nameTheater = theater;
          }
        }
      });

      let newTenCumRap = nameMovie.find(
        (movie) => movie.name === thongTinPhim.tenCumRap.split(" ")[0]
      );

      return (
        <React.Fragment>
          <div className="theaterInfo__logo">
            <img
              src={nameTheater.logo}
              alt={`logo - ${nameTheater.maHeThongRap}`}
            />
          </div>
          <div className="theaterInfo__text">
            <p>
              <span style={{ color: `${newTenCumRap.color}`, fontWeight: "bold" }}>
                {newTenCumRap.name}
              </span>
              -{thongTinPhim.tenCumRap.split("-")[1]}
            </p>
            <span>
              {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu} - {thongTinPhim.tenRap}
            </span>
          </div>
        </React.Fragment>
      );
    }
  }, []);
  const __renderTimeOut = React.useCallback(() => {
    let minutes = 5;
    let seconds = 0;

    // function start() {

    // }
    let stepTimes = document.getElementById("count-time");
    times = setInterval(() => {
      seconds--;

      if (seconds === -1) {
        minutes -= 1;
        seconds = 59;
        if (seconds <= 9) {
          stepTimes.innerHTML = "0" + minutes + ":" + "0" + seconds;
          // setMovieTimes("0" + minutes + ":" + "0" + seconds)
        } else stepTimes.innerHTML = "0" + minutes + ":" + seconds;
      } else if (minutes === 0 && seconds === 0) {
        if (seconds <= 9) {
          setMovieTimes("0" + minutes + ":" + "0" + seconds);
        } else setMovieTimes("0" + minutes + ":" + seconds);
        clearInterval(times);

        Swal.fire({
          imageUrl: "https://tix.vn/app/assets/img/Post-notification.png",
          imageHeight: 40,
          imageAlt: "timeout",
          color: "red",
          allowOutsideClick: false,
          html:
            "<p>Đã hết thời gian giữ ghế. Vui lòng thực hiện đơn hàng trong thời hạn 5 phút.<a id='dat-lai' href= >đặt lại ngay</a>  !!!</p>",
          showConfirmButton: false,
        }).then((res) => {
          if (res.value) {
            window.location.reload();
          }
        });
      } else if (seconds <= 9) {
        stepTimes.innerHTML = "0" + minutes + ":" + "0" + seconds;
        // setMovieTimes("0" + minutes + ":" + "0" + seconds)
      } else stepTimes.innerHTML = "0" + minutes + ":" + seconds;
    }, 1000);

  }, [step]);

  // run times and clear time and reset arrChair

  useEffect(() => {
    __renderTimeOut();

    return () => {
      clearInterval(times)
      danhSachGhe.forEach(item => {
        item.daDat = false;
      });
    };
  }, []);

  // changeColor
  useEffect(() => {
    arrChair.forEach(item => {
      item.arr.forEach(chair => {

        let index = listChairs.findIndex(itemC => itemC.stt === chair.stt);
        if (index === -1) {
          chair.daDat = false;
          if (listChairs.length > 0) {
            if (chair.taiKhoanNguoiDat || chair.taiKhoanNguoiDat === "") {
              document.getElementById(chair.maGhe).style.color = "#DFDFDF";


            } else if (chair.loaiGhe === "Vip" && sttVip !== 0) {
              document.getElementById(chair.maGhe).style.color = "#e08411";
            } else if (chair.loaiGhe === "Thuong" && sttNormal !== 0) {
              document.getElementById(chair.maGhe).style.color = "#3e515d";
            }

          }
        }
      });

    }, [stt, listChairs])
  })
  const __renderChairs = React.useCallback(() => {

    let arrChairsVip = danhSachGhe.filter((chair) => chair.loaiGhe === "Vip");
    let arrChairsNormal = danhSachGhe.filter(
      (chair) => chair.loaiGhe === "Thuong"
    );
    let ListColNine = ["A", "B", "C", "D", "E", "F", "G", "H"];
    let totalChairRadom = 2;
    let totalChair = 16;
    let totalChairBetween = 12;

    let colA = arrChairsNormal.filter((chairA, index) => index < totalChair);
    let colB = arrChairsNormal.filter(
      (chairB, index) => index >= totalChair * 2 && index < totalChair * 3
    );
    let colC = arrChairsNormal.filter(
      (chairC, index) => index >= totalChair * 3 && index < totalChair * 4
    );
    let colD = () => {
      let arr = [];
      arrChairsNormal.forEach((chairD, index) => {
        if (index >= totalChairRadom * 24 && index < totalChairRadom * 25) {
          arr.push(chairD);
        }
      });
      arrChairsVip.forEach((chairD, index) => {
        if (index < totalChairBetween) {
          arr.push(chairD);
        }
      });
      arrChairsNormal.forEach((chairD, index) => {
        if (index >= totalChairRadom * 25 && index < totalChairRadom * 26) {
          arr.push(chairD);
        }
      });
      return arr;
    };
    let colE = () => {
      let arr = [];
      arrChairsNormal.forEach((chairD, index) => {
        if (index >= totalChairRadom * 25 && index < totalChairRadom * 26) {
          arr.push(chairD);
        }
      });
      arrChairsVip.forEach((chairD, index) => {
        if (index >= totalChairBetween * 2 && index < totalChairBetween * 3) {
          arr.push(chairD);
        }
      });
      arrChairsNormal.forEach((chairD, index) => {
        if (index >= totalChairRadom * 27 && index < totalChairRadom * 28) {
          arr.push(chairD);
        }
      });
      return arr;
    };
    let colF = () => {
      let arr = [];
      arrChairsNormal.forEach((chairD, index) => {
        if (index >= totalChairRadom * 28 && index < totalChairRadom * 29) {
          arr.push(chairD);
        }
      });
      arrChairsVip.forEach((chairD, index) => {
        if (index >= totalChairBetween * 3 && index < totalChairBetween * 4) {
          arr.push(chairD);
        }
      });
      arrChairsNormal.forEach((chairD, index) => {
        if (index >= totalChairRadom * 29 && index < totalChairRadom * 30) {
          arr.push(chairD);
        }
      });
      return arr;
    };
    let colG = () => {
      let arr = [];
      arrChairsNormal.forEach((chairD, index) => {
        if (index >= totalChairRadom * 30 && index < totalChairRadom * 31) {
          arr.push(chairD);
        }
      });
      arrChairsVip.forEach((chairD, index) => {
        if (index >= totalChairBetween * 4 && index < totalChairBetween * 5) {
          arr.push(chairD);
        }
      });
      arrChairsNormal.forEach((chairD, index) => {
        if (index >= totalChairRadom * 31 && index < totalChairRadom * 32) {
          arr.push(chairD);
        }
      });
      return arr;
    };
    let colH = () => {
      let arr = [];
      arrChairsNormal.forEach((chairD, index) => {
        if (index >= totalChairRadom * 31 && index < totalChairRadom * 32) {
          arr.push(chairD);
        }
      });
      arrChairsVip.forEach((chairD, index) => {
        if (index >= totalChairBetween * 5 && index < totalChairBetween * 6) {
          arr.push(chairD);
        }
      });
      arrChairsNormal.forEach((chairD, index) => {
        if (index >= totalChairRadom * 32 && index < totalChairRadom * 33) {
          arr.push(chairD);
        }
      });
      return arr;
    }


    arrChair = [
      { col: "A", arr: colA },
      { col: "B", arr: colB },
      { col: "C", arr: colD() },
      { col: "D", arr: colE() },
      { col: "E", arr: colF() },
      { col: "F", arr: colG() },
      { col: "G", arr: colH() },
      { col: "H", arr: colC },
    ];

    // style={{color:checkChair !== -1 ?"#44c020":"#3e515d",cursor: "pointer" }}
    return (
      <>
        <Box component={"div"} className={classes.BoxSpaceChair}>
          <Box className={classes.colList} component="div">
            {arrChair.map((col, indexCol) => {
              return (
                <Box key={indexCol} className={classes.configRow}>
                  <Typography component="div" className={classes.colNine}>
                    <p className={classes.colNineText}>{col.col}</p>
                  </Typography>
                  <Box
                    key={indexCol}
                    className={`${classes.colList} ${classes.configRow}`}
                    component="div"
                  >
                    {/* index <= 1  */}
                    <Box component="div" style={{ width: screenWidth > 1024 ? "13%" : null }} className={classes.colListNext}>
                      {renderColChair(col.arr, col.col, totalChair - (totalChair + 1), totalChair - (totalChair - 1))}
                    </Box>

                    <Box component="div" style={{ width: screenWidth > 1024 ? "74%" : null }} className={classes.colListBetween}>
                      {renderColChair(col.arr, col.col, totalChair - (totalChair - 1), totalChair - 3)}
                    </Box>
                    <Box style={{ textAlign: "right" }} component="div" style={{ width: screenWidth > 786 ? "13%" : null }} className={classes.colListNext}>
                      {renderColChair(col.arr, col.col, totalChair - 3, totalChair - 1)}
                    </Box>

                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </>
    );
  }, [listChairs, stt]);



  // renderHTML ROw a
  const renderColChair = React.useCallback(
    (arr, name, min, max) => {
      return arr.map((chair, indexChair) => {
        if (indexChair > min && indexChair <= max) {
          return !chair.taiKhoanNguoiDat && chair.taiKhoanNguoiDat !== "" ?
            chair.loaiGhe === "Vip" ? (
              sttVip !== 0 ?
                <WeekendIcon
                  id={chair.maGhe}
                  key={indexChair}
                  onClick={() => {
                    getDetailChair(chair, name + (indexChair + 1));
                  }}
                  style={{
                    color: chair.daDat ? "#44c020" : "#e08411",
                    cursor: "pointer",

                  }}
                /> : <WeekendIcon
                  id={chair.maGhe}
                  key={indexChair}
                  style={{
                    color: "#DFDFDF",

                  }}
                />
            ) : sttNormal !== 0 ?
                <WeekendIcon
                  id={chair.maGhe}
                  key={indexChair}
                  onClick={() => {
                    getDetailChair(chair, name + (indexChair + 1));
                  }}
                  style={{
                    color: chair.daDat ? "#44c020" : "#3e515d",
                    cursor: "pointer",

                  }}
                /> : <WeekendIcon
                  id={chair.maGhe}
                  key={indexChair}
                  style={{
                    color: "#DFDFDF",

                  }}
                /> : <WeekendIcon
              id={chair.maGhe}
              key={indexChair}
              style={{
                color: "#DFDFDF",

              }}
            />


        } return;
      })
    }, []
  )
  // render content
  return (
    <div className=" showChair ">
      <div className="showChair__title ">
        <div className="showChair__title--info  ">{__renderTheater()}</div>
        <div className="showChair__title--chairs">
          <span style={{ fontWeight: "bold" }} className="countTicket__chair__count--red">Ghế :</span>
          {listChairs.map((chair, index) => {
            if (listChairs.length === index + 1) {
              return (
                <span key={index} className="countTicket__chair__count--green">
                  {chair.name}
                </span>
              );
            }
            return (
              <span className="countTicket__chair__count--green">
                {chair.name + ", "}
              </span>
            );
          })}
        </div>
        <div className={"showChair__title--timeOut "}>
          <p>Thời gian giữ vé </p>
          <span id="count-time">5:00</span>
        </div>
      </div>
      {/* showChair __content      */}
      <div className="showChair__content">
        <div className="showChair__screen">
          <img

            src="https://tix.vn/app/assets/img/icons/screen.png"
            alt="screen-image"
          />
        </div>
        <div className="showChair__res">
          <div className="showChair__out">
            <img src="https://tix.vn/app/assets/img/icons/exit.png" />
          </div>
          {/* show chair  */}
          <div className="showChair__space">
            {__renderChairs()}

          </div>
          <div className="showChair__space__note">
            <div className="">
              <WeekendIcon className={classes.chairDisable} />
              <span>: Ghế không được chọn</span>
            </div>
            <div className="">
              <WeekendIcon className={classes.Choose} />
              <span>: Ghế đã chọn</span>
            </div>
            <div className="">
              <WeekendIcon className={classes.chairVip} />
              <span>: Ghế vip</span>
            </div>
            <div className="">
              <WeekendIcon style={{ color: "#3e515d" }} />
              <span>: Ghế thường</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ShowChair;
