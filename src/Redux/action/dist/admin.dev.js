"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createShowTime = exports.editMovie = exports.addMovie = exports.deleteMovie = exports.getListMovies = exports.handleUpdateUser = exports.getListUsers = exports.RemoveUserAdmin = exports.actLogin = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _request = _interopRequireDefault(require("../../configs/request"));

var _sweetalert = _interopRequireDefault(require("sweetalert2"));

var TyAction = _interopRequireWildcard(require("../constanst"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var actLogin = function actLogin(user, history) {
  return function (dispatch) {
    (0, _axios["default"])({
      method: "POST",
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
      data: user
    }).then(function (result) {
      if (result.data.maLoaiNguoiDung === "QuanTri") {
        localStorage.setItem("userAdmin", JSON.stringify(result.data));

        _sweetalert["default"].fire({
          icon: "success",
          title: "successful login!",
          // padding: "0 0 20px 0",
          width: "400px",
          timerProgressBar: false,
          showConfirmButton: false,
          timer: 2000
        });

        history.push("/admin/dashboard");
      } else {
        _sweetalert["default"].fire({
          icon: "error",
          title: "Danger",
          text: "you don't have access !",
          // footer: '<a href>Why do I have this issue?</a>',
          timerProgressBar: false,
          showConfirmButton: true // timer: 2000,

        });
      }
    })["catch"](function (err) {
      console.log(err.response.data);
    });
  };
};

exports.actLogin = actLogin;

var RemoveUserAdmin = function RemoveUserAdmin(taiKhoan) {
  return (0, _axios["default"])({
    method: "DELETE",
    url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=" + taiKhoan,
    headers: {
      Authorization: "Bearer" + JSON.parse(localStorage.getItem("userAdmin")).accessToken
    }
  }).then(function (err) {
    _sweetalert["default"].fire({
      icon: "success",
      title: "successful user deletion!",
      // padding: "0 0 20px 0",
      width: "400px",
      timerProgressBar: false,
      showConfirmButton: false,
      timer: 2000
    });
  })["catch"](function (err) {
    _sweetalert["default"].fire({
      icon: "error",
      title: "Danger",
      text: "This user has booked a ticket so it cannot be deleted!",
      // footer: '<a href>Why do I have this issue?</a>',
      timerProgressBar: false,
      showConfirmButton: true // timer: 2000,

    });
  });
};

exports.RemoveUserAdmin = RemoveUserAdmin;

var getListUsers = function getListUsers() {
  return function (dispatch, getState) {
    var maNhom = getState().MovieManaGerment.maNhom;
    (0, _request["default"])("GET", "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=" + maNhom, {}, "userAdmin").then(function (res) {
      dispatch({
        type: TyAction.GET_LIST_USERS,
        payload: res.data
      });
    });
  };
};

exports.getListUsers = getListUsers;

var handleUpdateUser = function handleUpdateUser(data) {
  return function (dispatch) {
    (0, _request["default"])("PUT", "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung", data, "userAdmin").then(function (res) {
      _sweetalert["default"].fire({
        icon: "success",
        title: "successful user deletion!",
        // padding: "0 0 20px 0",
        width: "400px",
        timerProgressBar: false,
        showConfirmButton: false,
        timer: 2000
      });

      dispatch(getListUsers());
    })["catch"](function (err) {
      dispatch({
        type: TyAction.CHANGE_STATUS_INDEX,
        statusIndex: false
      });

      _sweetalert["default"].fire({
        icon: "error",
        title: "Users update failed",
        text: err.message,
        // footer: '<a href>Why do I have this issue?</a>',
        timerProgressBar: false,
        showConfirmButton: true // timer: 2000,

      });
    });
  };
}; ///config movie  


exports.handleUpdateUser = handleUpdateUser;

var getListMovies = function getListMovies(maNhom) {
  return function (dispatch, getState) {
    var maNhom = getState().MovieManaGerment.maNhom;
    return (0, _request["default"])("GET", "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=" + maNhom, {}, "userAdmin").then(function (res) {
      dispatch({
        type: TyAction.CHANGE_STATUS_MOVIES,
        payload: res.data
      });
    });
  };
}; // delete movie 


exports.getListMovies = getListMovies;

var deleteMovie = function deleteMovie(maPhim) {
  return (0, _request["default"])("DELETE", "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/XoaPhim?MaPhim=" + maPhim, {}, "userAdmin");
}; // add movie


exports.deleteMovie = deleteMovie;

var addMovie = function addMovie(data) {
  return function (dispatch) {
    return (0, _request["default"])("POST", "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/ThemPhimUploadHinh", data, "userAdmin").then(function (res) {
      _sweetalert["default"].fire({
        icon: "success",
        title: "Movie added successfully!",
        // padding: "0 0 20px 0",
        width: "400px",
        timerProgressBar: false,
        showConfirmButton: false,
        timer: 1500
      });

      dispatch(getListMovies());
    })["catch"](function (err) {
      _sweetalert["default"].fire({
        icon: "error",
        title: "Movie added failed",
        text: err.message,
        // footer: '<a href>Why do I have this issue?</a>',
        timerProgressBar: false,
        showConfirmButton: true // timer: 2000,

      });

      console.log(err);
    });
  };
}; // edit movie 


exports.addMovie = addMovie;

var editMovie = function editMovie(data) {
  return function (dispatch) {
    return (0, _request["default"])("POST", "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhimUpload", data, "userAdmin").then(function (res) {
      _sweetalert["default"].fire({
        icon: "success",
        title: "Movie update successfully!",
        // padding: "0 0 20px 0",
        width: "400px",
        timerProgressBar: false,
        showConfirmButton: false,
        timer: 1500
      });

      dispatch(getListMovies());
      dispatch({
        type: TyAction.CHANGE_STATUS_INDEX,
        statusIndex: false
      });
    })["catch"](function (err) {
      dispatch({
        type: TyAction.CHANGE_STATUS_INDEX,
        statusIndex: false
      });

      _sweetalert["default"].fire({
        icon: "error",
        title: "Movie update failed",
        text: "Files exceed 1MB",
        // footer: '<a href>Why do I have this issue?</a>',
        timerProgressBar: false,
        showConfirmButton: true // timer: 2000,

      });
    });
  };
};

exports.editMovie = editMovie;

var createShowTime = function createShowTime(data) {
  return function (dispatch) {
    return (0, _request["default"])("POST", "https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/TaoLichChieu", data, "userAdmin").then(function (res) {
      _sweetalert["default"].fire({
        icon: "success",
        title: "successful showtimes added!",
        // padding: "0 0 20px 0",
        width: "400px",
        timerProgressBar: false,
        showConfirmButton: false,
        timer: 1500
      });

      dispatch(getListMovies());
    })["catch"](function (err) {
      _sweetalert["default"].fire({
        icon: "error",
        title: "successful showtimes failed",
        text: err.message,
        // footer: '<a href>Why do I have this issue?</a>',
        timerProgressBar: false,
        showConfirmButton: true // timer: 2000,

      });
    });
  };
};

exports.createShowTime = createShowTime;