import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { useSelector, useDispatch } from "react-redux";
import *as action from "../../../../Redux/action/bookingAction";
import classes1 from "classnames";
// import ModalCombo from "../../../../json/combo.json";
import Axios from "axios";
import Swal from "sweetalert2";
import { makeStyles } from "@material-ui/styles";
import request from "../../../../configs/request";
// import PropTypes from 'prop-types';

// CountTicket.propTypes = {

// };
const styles = makeStyles({
  disabled: {
    cursor: "no",
    background: "gray",
  },
  notDisabled: {
    cursor: "pointer",
    background: "linear-gradient(223deg, #b4ec51 0, #429321 100%)",
  }
})

function CountTicket(props) {
  const classes = styles();
  const { listTicketRoom, totalChair, listChairs, totalCombo, stt } = useSelector(
    (state) => state.BookingReducer
  );
  const { userLogin, room } = useSelector(state => state.UserReducer);
  let { email, soDT } = userLogin;


  const dispatch = useDispatch();
  let user = JSON.parse(localStorage.getItem('user'));
  //start , off table combo
  let { thongTinPhim } = listTicketRoom;
  if (thongTinPhim) {
    var day1 = new Date(thongTinPhim.ngayChieu);
  }
  //valid 
  let valid = listChairs.length === stt;
  const handleBooking = (e) => {
    // listChairs
    e.preventDefault();

    let danhSachVe = [];
    listChairs.forEach(chairs => {
      danhSachVe.push({ maGhe: chairs.maGhe, giaVe: chairs.giaVe })
    })

    let data = {
      maLichChieu: thongTinPhim.maLichChieu,
      danhSachVe: danhSachVe,

      taiKhoanNguoiDung: user.taiKhoan
    }
    // Axios({
    //   method:"POST",
    //   url:`http://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/DatVe`,
    //   data,
    //   headers: { Authorization: "Bearer " + user.accessToken }
    // })
    request("POST", "https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/DatVe", data)
      .then(rel => {

        if (rel.status === 200) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Đặt vé thành công',
            showConfirmButton: false,
            timer: 1500
          })
          let a = setTimeout(() => {

            dispatch(action.changeStyleStep(3))
          }, 1500);
          return () => clearTimeout(a)
        }
      }).catch(err => {
        console.log(err.message)
      })



  }

  return (

    <div className="countTicket">
      {/* countTicket__total  */}
      <div className="countTicket__total">
        <h2>{totalChair.toLocaleString("fn") + totalCombo} đ</h2>
      </div>

      {/* countTicket__info  */}
      <div className="countTicket__info">
        <div className="countTicket__info__set">
          <button>{room}</button>
          <p>{thongTinPhim.tenPhim}</p>
        </div>

        <div className="countTicket__info__name">
          {thongTinPhim.tenCumRap}
        </div>

        <div className="countTicket__info__times">
          <span style={{ paddingRight: "5px" }}>
            {`${day1}`.split(" ")[0]}
          </span>
          <span>{thongTinPhim.ngayChieu}</span> -
            <span>{thongTinPhim.gioChieu}</span> -
            <span>{thongTinPhim.tenRap}</span>
        </div>
      </div>
      {/* countTicket__chair  */}
      <div className="countTicket__chair">
        <div className="countTicket__chair__count">
          <span className="countTicket__chair__count--red">Ghế</span>
          {listChairs.map((chair, index) => {
            if (listChairs.length === index + 1) {
              return (
                <span key={index} className="countTicket__chair__count--green">
                  {chair.name}
                </span>
              );
            }
            return (
              <span key={index} className="countTicket__chair__count--green">
                {chair.name + ", "}
              </span>
            );
          })}
        </div>
        <span className="countTicket__chair--total">
          {totalChair.toLocaleString("fn") + "đ"}{" "}
        </span>
      </div>

      {/* count choose Combo    */}
      <div
        className="countTicket__combo"


      >
        <div className="countTicket__combo--left">
          <img
            src="https://tix.vn/app/assets/img/icons/popcorn.png"
            alt="bap"
          />
          <span>chọn combo</span>
        </div>
        <div className="countTicket__combo--right">{totalCombo}đ</div>
      </div>

      {/* combo-menu  */}
      {/* write email   */}
      <div className="countTicket__email">
        <TextField id="standard-basic" value={email} fullWidth={true} label="E-Mail" />
        {/* <input type="email" className=" form-control"  /> */}
      </div>
      <div>
        <div className="countTicket__phone">
          <TextField id="standard-basic" value={`+84${soDT}`} fullWidth={true} label="Phone" />
        </div>
        {/* error buy  */}
        <div className="countTicket__buy">
          <div className="countTicket__buy--note">
            <img
              src="https://tix.vn/app/assets/img/icons/exclamation.png"
              alt="error"
            />
            <span>
              Vé đã mua không thể đổi hoặc hoàn tiền Mã vé sẽ được gửi qua tin
                nhắn <span style={{ color: "#e08411" }}>ZMS</span> (tin nhắn
                Zalo) và
                <span style={{ color: "#e08411" }}>Email</span> đã nhập.
              </span>
          </div>
          <button disabled={!valid}
            onSubmit={handleBooking}
            onClick={handleBooking}
            className={valid ? classes1(classes.notDisabled, " countTicket__buy--btn") : classes1(classes.disabled, " countTicket__buy--btn")}>
            <span>Đặt vé</span>
          </button>
        </div>
      </div>


    </div>

  );
}

export default CountTicket;
