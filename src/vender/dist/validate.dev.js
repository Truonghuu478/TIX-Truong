"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateMovie = exports.validate = void 0;

var validate = function validate(name, value) {
  var min = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;
  var max = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 30;
  var regexPhone = /(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
  var regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (typeof value === 'string' || value instanceof String) {
    if (value.trim() === "") {
      return "Không được để trống";
    } else if (name === "soDT") {
      if (!regexPhone.test(value)) {
        return "Không hợp lệ!";
      }
    } else if (name === 'email') {
      if (!regexEmail.test(value)) {
        return "Email không hợp lệ";
      }
    } else if (value.length > max) {
      return -"Kh\xF4ng \u0111\u01B0\u1EE3c d\xE0i h\u01A1n ".concat(max, " k\xED t\u1EF1");
    } else if (name !== "maNhom" && value.length < min) {
      return "Kh\xF4ng \u0111\u01B0\u1EE3c  du\u1EDBi ".concat(min, " k\xED t\u1EF1");
    }
  }
};

exports.validate = validate;

var validateMovie = function validateMovie(name, value) {
  var min = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;
  var max = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 5;

  if (name.trim() === "maPhim") {
    if (typeof value !== 'string') {
      if (value.length < min) {
        return "Film code character length must be at least ".concat(min, " digits");
      }

      if (value.length > max) {
        return "The longest film code character length is ".concat(max);
      }
    }
  } else if (name === "maRap") {
    if (typeof value !== 'string') {
      if (value.length < min - 1) {
        return "Film code character length must be at least ".concat(min, " digits");
      }

      if (value.length > max - 1) {
        return "The longest film code character length is ".concat(max);
      }
    }
  }
};

exports.validateMovie = validateMovie;