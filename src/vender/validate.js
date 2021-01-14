export const validate = (name, value, min = 4, max = 30) => {
  const regexPhone = /(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;

  const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const regexPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  if (typeof value === "string" || value instanceof String) {
    if (value.trim() === "") {
      return "Không được để trống";
    } else if (name === "matKhau") {
      if (!regexPassword.test(value)) {
        return "Mật khẩu không hợp lệ ";
      }
    } else if (name === "soDt") {
      if (!regexPhone.test(value)) {
        return "Số điện thoại hợp lệ!";
      }
    } else if (name === "email") {
      if (!regexEmail.test(value)) {
        return "Email không hợp lệ";
      }
    } else if (value.length > max) {
      return -`Không được dài hơn ${max} kí tự`;
    } else if (name !== "maNhom" && value.length < min) {
      return `Không được  duới ${min} kí tự`;
    }
  }
};

export const validateMovie = (name, value, min = 4, max = 5) => {
  if (name === "maPhim") {
    if (value.length < min) {
      return `Film code character length must be at least ${min} digits`;
    }
    if (value.length > max) {
      return `The longest film code character length is ${max}`;
    }
  } else if (name === "maRap") {
    if (value.length < min - 1) {
      return `Film code character length must be at least ${min - 1} digits`;
    }
    if (value.length > max - 1) {
      return `The longest film code character length is ${max - 1}`;
    }
  } else if (name === "giaVe") {
    if (value > 1000000) {
      return `Film code character length must be at least 1000000 digits`;
    }
    if (value < 1000) {
      return `The longest film code character length is 1000`;
    }
  }
};
