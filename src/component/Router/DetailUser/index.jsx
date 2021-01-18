import React, { useState, useEffect, useCallback, useMemo } from "react";
import classes from "classnames";
// import Header from "../../Page/Header";
import { Grid, Button } from "@material-ui/core";
// button
import { Link } from "react-router-dom";
// import {useSelector} from "react-redux";
// show password
// import InputAdornment from "@material-ui/core/InputAdornment";
// import Visibility from "@material-ui/icons/Visibility";
// import VisibilityOff from "@material-ui/icons/VisibilityOff";
// import IconButton from "@material-ui/core/IconButton";
// table
import { withStyles, styled } from "@material-ui/core/styles";
import TableHistory from "./tableHistory";
import { validate } from "../../../vender/validate";
import TextField from "@material-ui/core/TextField";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Layout/Loading";
import * as TyAction from "../../../Redux/constanst";
import request from "../../../configs/request";

import Footer from "../../Page/Footer";
// import { SignalCellularNullOutlined } from "@material-ui/icons";
// sweetalert2
import Swal from "sweetalert2";

const MyButton = styled(({ color, ...other }) => <Button {...other} />)({
  background: (props) =>
    props.color === "red"
      ? "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
      : "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  border: 0,
  borderRadius: 3,
  boxShadow: (props) =>
    props.color === "red"
      ? "0 3px 5px 2px rgba(255, 105, 135, .3)"
      : "0 3px 5px 2px rgba(33, 203, 243, .3)",
  color: "white",
  height: 48,
  padding: "0 30px",
  margin: 8,
  fontWeight: "bold",
});
const ValidationTextField = withStyles({
  root: {
    "& div": {
      paddingRight: 0,

      // ,
    },
    "& input:valid ,& fieldset": {
      color: "#2196f4",
      borderColor: "#2196f4",
      borderWidth: 4,
    },
    "& p": {
      color: "red",
      fontSize: 16,
      margin: 0,
    },

    "& label": {
      color: "#2196f4",
    },
    "& input:valid + fieldset": {
      borderColor: "#2196f4",
      borderWidth: 4,
      color: "#2196f4",
    },
    "& input:valid:focus + fieldset": {
      borderWidth: 4,

      color: "#2196f4",
      padding: "4px !important",
    },
    "& input:valid:hover + fieldset": {
      color: "#2196f4",
      borderColor: "#2196f4",
    },
    "& input:hover ": {
      borderColor: "#2196f4",
    },
  },
})(TextField);

export default function DetailUser() {
  const { userLogin } = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  // const history = useHistory();
  const { loading } = useSelector((state) => state.LoadingReducer);
  const profileUser = useMemo(
    () => JSON.parse(localStorage.getItem("detail-user")) || {},
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [localStorage.getItem("detail-user")]
  );
  // console.log(profileUser);
  const [user, setUser] = useState({
    showPassword: false,
    isChangePassword: false,
    data: profileUser || {},
  });

  const [mk, setMK] = useState({
    data: { newMK: "", replaceMK: "" },
    error: {
      newMK: "",
      replaceMK: "",
    },
    isValid: true,
  });
  // const handleClickShowPassword = () => {
  //   setUser({ ...user, showPassword: !user.showPassword });
  // };

  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  // };
  // hanle change reset mk
  const handleChangeMK = (e) => {
    let { name, value } = e.target;
    let data = { ...mk.data, [name]: value };

    let error = {
      ...mk.error,
      [name]: validate(name, value) ? validate(name, value, 4, 30) : "",
    };
    let isValid = true;
    for (const [key] of Object.entries(data)) {
      if (data[key] !== "") {
        isValid = false;
      } else {
        isValid = true;
        break;
      }
    }
    setMK({ ...mk, data, error, isValid });
  };

  useEffect(() => {
    if (profileUser && Object.entries(profileUser).length > 0) {
      setUser({ ...user, data: profileUser });
      dispatch({ type: TyAction.DISPLAY_LOADING_FALSE });
    }
    // eslint-disable-next-line
  }, [profileUser]);
  useEffect(() => {
    function fetchDetailUser() {
      request(
        "POST",
        "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan",
        { TaiKhoan: userLogin.taiKhoan }
      ).then((result) => {
        let { data } = result;

        localStorage.setItem("detail-user", JSON.stringify(data));
        dispatch({ type: TyAction.FETCH_DETAIL_USER, data });
      });
      // .catch((err) => console.log(err));
    }
    fetchDetailUser();
    // eslint-disable-next-line
  }, [userLogin.taiKhoan]); // ✅ OK in this example because we don't use *any* values from component scope
  // tính số lần user use for
  const toTalVisit = useCallback(() => {
    if (Object.entries(user.data).length > 0) {
      return user.data.thongTinDatVe.reduce((toTal) => {
        return (toTal += 1);
      }, 0);
    }
  }, [user]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (mk.data.newMK !== mk.data.replaceMK) {
      Swal.fire({
        icon: "error",
        title: "mật khẩu không khớp !",
        // padding: "0 0 20px 0",
        width: "400px",
        timerProgressBar: false,
        showConfirmButton: true,
      });
    } else {
      let matKhau = mk.data.replaceMK;
      let data = { ...user.data, maLoaiNguoiDung: "KhachHang", matKhau };
      // console.log(data);
      request(
        "PUT",
        "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        data
      )
        .then((result) => {
          let { data } = result;

          let newMatKhau = data.matKhau;
          let newData = { ...user.data, matKhau: newMatKhau };
          Swal.fire({
            icon: "success",
            title: "Cập nhật thành công!",
            // padding: "0 0 20px 0",
            width: "400px",
            timerProgressBar: false,
            showConfirmButton: false,

            timer: 2000,
          });
          setUser({ ...user, data: newData, isChangePassword: false });
          setMK({
            data: { newMK: "", replaceMK: "" },
            error: {
              newMK: "",
              replaceMK: "",
            },
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
  // tính số điểm
  const toTolPointUser = useCallback(() => {
    return Math.round(toTalVisit() * 220) / 100;
    // eslint-disable-next-line
  }, [user]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {" "}
          <div className={classes("detail-user")}>
            <div className="detail-user--Out">
              <span>{userLogin.hoTen}</span> <Link to="/">| thoát</Link>
            </div>
            <div className="detail-user__content">
              <Grid container spacing={6}>
                <Grid item xs={12} md={12} lg={6} xl={6}>
                  <div className="detail-user__content--item ">
                    <div className="item__intro item--bg">
                      “ Hi, <span>{userLogin.hoTen} </span>
                      Từ bảng thông tin tài khoản, bạn có thể xem bản sao các
                      hoạt động của tài khoản bạn trong thời gian gần đây và cập
                      nhật thông tin tài khoản của bạn. Chọn liên kết bên dưới
                      để xem hoặc chỉnh sửa thông tin”
                    </div>
                    <div className="item__Avatar item--bg">
                      <img
                        src="./img/avatar.png"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://www.bhdstar.vn/wp-content/themes/bhd/assets/images/avatar.png";
                        }}
                        alt={"avatar of " + userLogin.hoTen}
                      />
                      <div className="item__Avatar--infoA">
                        <div className="infoA">{userLogin.hoTen}</div>
                        <div className="infoA__active">
                          <span> Tổng visit: {toTalVisit()}</span>
                          <span> Active visit: 0</span>
                          <span> Expried visit: {toTalVisit()}</span>
                          <span style={{ gridColumn: "1/span 3" }}>
                            Điểm thưởng: {toTolPointUser()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={12} lg={6} xl={6}>
                  <form className="detail-user__content--item detail__form">
                    {/* ht  */}
                    <div className="item__form ">
                      <ValidationTextField
                        name="hoTen"
                        value={user.data.hoTen}
                        label="Họ tên"
                        variant="outlined"
                      />
                    </div>

                    {/* ten TK   */}
                    <div className="item__form ">
                      <ValidationTextField
                        name="taiKhoan"
                        value={user.data.taiKhoan}
                        label="Tài khoản"
                        // className={classes.input}

                        type="text"
                        variant="outlined"
                      />
                    </div>
                    <div className="item__form ">
                      <ValidationTextField
                        // className={classes.input}
                        name="email"
                        id="email"
                        type="text"
                        label="Email"
                        variant="outlined"
                        value={user.data.email}
                      />
                    </div>

                    {/* sdt  */}
                    <div className="item__form ">
                      <ValidationTextField
                        name="soDT"
                        value={user.data.soDT}
                        label="Số DT"
                        variant="outlined"
                      />
                    </div>

                    {/* mk  */}
                    <div
                      className="item__form "
                      style={{ gridRow: "3 / span 2" }}
                    >
                      {/* <TextField
                        type={user.showPassword ? "text" : "password"}
                        onChange={handleOnChange}
                        name="matKhau"
                        value={user.data.matKhau}
                        
                        label="Mật khẩu"
                      /> */}
                      <ValidationTextField
                        label="Mật khẩu"
                        // className={classes.input}
                        name="matKhau"
                        value={user.data.matKhau}
                        type="password"
                        variant="outlined"
                      />

                      <MyButton
                        type="button"
                        className="item__form--button"
                        onClick={() => {
                          let { isChangePassword } = user;
                          setUser({
                            ...user,
                            isChangePassword: !isChangePassword,
                          });
                        }}
                      >
                        Đổi mật khẩu
                      </MyButton>
                    </div>
                    <div
                      className="item__form "
                      style={{
                        height: user.isChangePassword ? "55px" : "0",
                        transition: "all 0.5s",
                      }}
                    >
                      {/* sss */}
                      <ValidationTextField
                        style={{ opacity: user.isChangePassword ? 1 : 0 }}
                        type="password"
                        onChange={handleChangeMK}
                        name="newMK"
                        value={mk.data.newMK}
                        label="Mật khẩu mới"
                        variant="outlined"
                        helperText={mk.error.newMK}
                      />
                    </div>
                    <div
                      className="item__form "
                      style={{
                        height: user.isChangePassword ? "55px" : "0",
                        transition: "all 0.5s",
                      }}
                    >
                      <ValidationTextField
                        style={{ opacity: user.isChangePassword ? 1 : 0 }}
                        type="password"
                        variant="outlined"
                        name="replaceMK"
                        value={mk.data.replaceMK}
                        helperText={mk.error.replaceMK}
                        onChange={handleChangeMK}
                        label="Nhập lại mật khẩu"
                      />
                    </div>
                    {/* ss */}

                    {user.isChangePassword && (
                      <MyButton
                        onClick={handleSubmit}
                        type="submit"
                        variant="contained"
                        color="blue"
                        className={"item__btn"}
                        style={{ gridColumn: "1/span 2" }}
                        disabled={mk.isValid}
                      >
                        Confirm
                      </MyButton>
                    )}
                  </form>
                </Grid>
              </Grid>

              <div className="user__transaction">
                <TableHistory thongTinDatVe={user.data.thongTinDatVe} />
              </div>
            </div>
            <Footer />
          </div>
        </>
      )}
    </>
  );
}
