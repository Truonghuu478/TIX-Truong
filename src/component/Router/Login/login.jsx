import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import {
  makeStyles,
  styled,
  withStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
// import Container from "react-bootstrap/Container";
import Button from "@material-ui/core/Button";
import * as action from "../../../Redux/action/user";
import { connect } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import { blue, lightBlue } from "@material-ui/core/colors";

import { useHistory } from "react-router-dom";

import { validate } from "../../../vender/validate";

// import InputAdornment from "@material-ui/core/InputAdornment";
// import Visibility from "@material-ui/icons/Visibility";
// import VisibilityOff from "@material-ui/icons/VisibilityOff";
// import IconButton from "@material-ui/core/IconButton";

import Checkbox from "@material-ui/core/Checkbox";

import FormControlLabel from "@material-ui/core/FormControlLabel";
// import { TrendingUpRounded } from "@material-ui/icons";

// import PropTypes from 'prop-types';

// Login.propTypes = {

// };
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
const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    margin: " 0 auto",
  },
  content: {
    width: "85%",
    margin: "60px auto 0",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    padding: 0,
    height: "20%",
  },
  imgHeader: {
    width: "230px",
    height: "130px",
    display: "block",
  },
  modalBody: {
    width: "100%",
    height: "60%",
  },
  input: {
    width: "100%",
    // marginBottom: "10px",
    marginBottom: "2px",
    height: 80,
    "& div": {
      "&:focus": {
        borderWidth: 4,
      },
      "&:hover": {
        cursor: "none",
      },
    },
  },
  modalFooter: {
    // height:"50%",
  },
  btn: {
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    // border: 0,
    // borderRadius: 3,
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    // color: 'white',
    // height: 48,
    // padding: '0 30px',
    margin: "8px 0",
    width: "100%",
    "&:focus": {
      outline: "none",
    },
  },
  SaveForm: {
    width: "100%",
    "& span": {
      "& input": {
        "&:after": {
          display: "block",
        },
      },
    },
  },
  CheckboxCss: {
    color: "#2196f4",
  },
}));
const theme = createMuiTheme({
  palette: {
    primary: blue,
    lightColor: lightBlue,
  },
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

function Login(props) {
  const classes = useStyles();
  const history = useHistory();

  const [checked, setChecked] = React.useState(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const screenWidth = React.useMemo(() => window.innerWidth, [
  //   window.innerWidth,
  // ]);
  const handleChangeBox = (event) => {
    setChecked(event.target.checked);
  };
  const [state, setState] = React.useState({
    users: { taiKhoan: "", matKhau: "" },
    errors: { taiKhoan: "", matKhau: "" },
    valid: true,
    showPassword: false,
  });

  // const handleClickShowPassword = () => {
  //   setState({ ...state, showPassword: !state.showPassword });
  // };

  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  // };

  //set value user
  const _BoxValue = (e) => {
    let { name, value } = e.target;

    let newUser = { ...state.users, [name]: value };
    let error = {
      ...state.errors,
      [name]: validate(name, value) ? validate(name, value, 4, 30) : "",
    };
    let valid = true;
    for (const [key] of Object.entries(newUser)) {
      if (newUser[key] === "") {
        valid = true;
        break;
      } else valid = false;
    }
    if (!valid) {
      for (const [key] of Object.entries(error)) {
        if (error[key] !== "") {
          valid = true;
          break;
        } else valid = false;
      }
    }
    setState({
      users: newUser,
      errors: error,
      valid,
    });
  };
  // change  history to home
  const __handleHistory = () => {
    let { maPhim, status } = props;
    status === "home" ? history.push("") : history.push(`/phim/${maPhim}`);
  };
  // // submit
  const __handleSubmit = (e) => {
    e.preventDefault();

    props._handleGetUser(state.users, checked, history);
  };
  useEffect(() => {
    let { formRegister } = props;
    if (formRegister) {
      let newUsers = { ...state.users, formRegister };
      setState({ ...state, newUsers });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.formRegister]);
  return (
    <div className="Login__content Login__background">
      <div className="Login__header">
        <span onClick={__handleHistory} className="Login__header--close">
          <CloseIcon />
        </span>
      </div>
      <div className={classes.modalHeader}>
        <img
          className={classes.imgHeader}
          src="https://tix.vn/app/assets/img/login/group@2x.png"
          alt="logo"
        />
      </div>
      <form
        onSubmit={__handleSubmit}
        className={classes.root}
        noValidate
        autoComplete="off"
      >
        <div className={classes.modalBody}>
          <p className="mt-5">
            Đăng nhập để được nhiều ưu đãi, mua vé và bảo mật thông tin!
          </p>
          <ThemeProvider theme={theme}>
            <ValidationTextField
              className={classes.input}
              name="taiKhoan"
              label="Tài khoản"
              variant="outlined"
              autoComplete="current-password"
              onChange={_BoxValue}
              value={state.users.taiKhoan}
              helperText={state.errors.taiKhoan}
              autoFocus
            />

            <ValidationTextField
              className={classes.input}
              onChange={_BoxValue}
              name="matKhau"
              id="matKhau"
              type={state.showPassword ? "text" : "password"}
              label="Mật khẩu"
              // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              variant="outlined"
              value={state.users.matKhau}
              // required
              // InputProps={
              //   screenWidth > 768
              //     ? false
              //     : {
              //         endAdornment: (
              //           <InputAdornment position="end">
              //             <IconButton
              //               style={{ color: "#2196f4" }}
              //               aria-label="toggle password visibility"
              //               onClick={handleClickShowPassword}
              //               onMouseDown={handleMouseDownPassword}
              //             >
              //               {state.showPassword ? (
              //                 <Visibility />
              //               ) : (
              //                 <VisibilityOff />
              //               )}
              //             </IconButton>
              //           </InputAdornment>
              //         ),
              //       }
              // }
              helperText={state.errors.matKhau}
            />
            <FormControlLabel
              className={classes.SaveForm}
              control={
                <Checkbox
                  size={"medium"}
                  className={classes.CheckboxCss}
                  onChange={handleChangeBox}
                  name="checked-ps"
                  color="default"
                  required
                />
              }
              label="Remember me "
            />
          </ThemeProvider>
        </div>
        <div className={classes.modalFooter}>
          <MyButton
            color="blue"
            type="submit"
            // disabled={state.valid}
            className={classes.btn}
          >
            Đăng nhập
          </MyButton>

          <MyButton
            onClick={() => props.handleChangeStatus("register")}
            className={classes.btn}
            color="blue"
          >
            Đăng ký
          </MyButton>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userLogin: state.UserReducer.userLogin,
    scheduleCode: state.UserReducer.scheduleCode,
    status: state.UserReducer.status,
    maPhim: state.UserReducer.maPhim,
    formRegister: state.UserReducer.formRegister,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    _handleGetUser: (user, checked, history) => {
      dispatch(action._handleGetUser(user, checked, history));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
