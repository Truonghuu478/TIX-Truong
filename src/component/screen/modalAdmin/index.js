import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import * as action from "../../../Redux/action/admin";
import * as actionRegistry from "../../../Redux/action/user";
import ScaleLoader from "react-spinners/ScaleLoader";
import { css } from "@emotion/core";
import * as tyAction from "../../../Redux/constanst";
import { validateMovie, validate } from "../../../vender/validate";
import Swal from "sweetalert2";
import * as actionMovie from "../../../Redux/action/moive";
import dateFormat from "dateformat";
import { useLocation } from "react-router-dom";

import {
  Button,
  Box,
  TextField,
  TextareaAutosize,
  MenuItem,
  FormControl,
  Select,
  InputBase,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
// css
import useStyles from "./modalAdminStyle";
import { useSelector, useDispatch } from "react-redux";
ModalAdmin.propTypes = {
  types: PropTypes.string.isRequired,
  onHide: PropTypes.func.isRequired,

  detailMovie: PropTypes.object.isRequired,
};

ModalAdmin.defaultProps = {
  detailMovie: {},
  types: "",
};

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);
const override = css`
  position: fixed;
  top: 50%;
  left: 50%;
`;
const urlPublic = process.env.PUBLIC_URL;
function ModalAdmin(props) {
  let location = useLocation();
  const { maNhom } = useSelector((state) => state.MovieManaGerment);
  const formatD = (date) => dateFormat(new Date(date),"dd/mm/yyyy h:MM:ss");
  const { indexSpinner } = useSelector((state) => state.AdminReducer);
  const { types, onHide, detailMovie, listTheater } = props;
  const dispatch = useDispatch();
  const [listMovie, setListMovie] = useState([]);
  // const [upload, setUpload] = useState("./img/no-image.png")
  const [state, setState] = useState({
    tenPhim: "",
    hinhAnh: "https://tix.vn/app/assets/img/default-film.webp",
    maPhim: "",
    moTa: "",
    maNhom,
    trailer: "",
  });
  const [state1, setState1] = useState({
    data: {
      maPhim: "",
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: "",
    },
    error: { maPhim: "", ngayChieuGioChieu: "", maRap: "", giaVe: "" },
  });
  const [formUser, setFormUser] = useState({
    data: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "",
      maLoaiNguoiDung: "",
      hoTen: "",
    },
    errors: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "",
      maLoaiNguoiDung: "",
      hoTen: "",
    },
  });
  const classes = useStyles();
    

  // fetch list movie
  useEffect(() => {
    actionMovie.fetchListMovie(maNhom).then((res) => {
      setListMovie(res.data);
    });
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
      if(Object.entries(detailMovie).length >0){
        setState(detailMovie);
      }
    
  }, [detailMovie])
  const handleChangeInput = (e) => {
    let { name, value } = e.target;
      
    let newData = {
      ...state1.data,
      [name]: name !== "ngayChieuGioChieu" ? parseInt(value) : formatD(value),
    };
    let newError = {
      ...state1.error,
      [name]: validateMovie(name, ""+value) ? validateMovie(name, value) : "",
    };

    setState1({ ...state1, data: newData, error: newError });
  };
  const handleChange = (e) => {
    let { name, value, files } = e.target;

    setState({ ...state, [name]: name === "hinhAnh" ? files[0] : value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (types === "Add-ShowTimes") {
      let isValid = false;
      for (const [key] of Object.entries(state1.data)) {
       
        
        if (state1.data[key] === "") {
          isValid = true;
          break;
        }
      }
      for (const [key] of Object.entries(state1.error)) {
       
        
        if (state1.error[key] !== "") {
          isValid = true;
          break;
        }
      }
      console.log(state1.data);
      if (isValid) {
        dispatch({ type: tyAction.CHANGE_STATUS_INDEX, statusIndex: false })

        Swal.fire({
          icon: "error",
          title: "successful showtimes failed",
          text: "Not performed because of error",
          // footer: '<a href>Why do I have this issue?</a>',
          timerProgressBar: false,
          showConfirmButton: false,

          timer: 2000,
        });
      } else {
        dispatch(action.createShowTime(state1.data));
        setState1({
        ...state1,
        data: {
          maPhim: "",
          ngayChieuGioChieu: formatD("2019-01-01T12:00:00"),
          maRap: "",
          giaVe: "",
        },
        error: { maPhim: "", ngayChieuGioChieu: "", maRap: "", giaVe: "" },
      });
      } ;
      
    } else if (types === "Add-users") {
      let isCheck = true;
      for (const [key] of Object.entries(formUser.data)) {
        if (formUser.data[key].trim() === "") {
          isCheck = false;
          break;
        }
      }
      for (const [key] of Object.entries(formUser.errors)) {
        if (formUser.errors[key].trim() !== "") {
          isCheck = false;
          break;
        }
      }

      isCheck
        ? dispatch(actionRegistry._handleRegister(formUser.data, location))
        : Swal.fire({
            icon: "error",
            title: "Đăng ký không thành công",
            text: "Không được để trống",
            // footer: '<a href>Why do I have this issue?</a>',
            timerProgressBar: false,
            showConfirmButton: true,

            // timer: 2000,
          });
    } else {
      let formData = new FormData();

      for (let key in state) {
        formData.append(key, state[key]);
      }

      dispatch({
        type: tyAction.CHANGE_STATUS_INDEX,
        statusIndex: true,
      });
      dispatch(
        Object.entries(detailMovie).length >0 ?  action.editMovie(formData):action.addMovie(formData) 
      );

      setState({
        ...state,
        tenPhim: "",
        hinhAnh: "https://tix.vn/app/assets/img/default-film.webp",
        maPhim: "",
        moTa: "",
        maNhom,
        trailer: "",
      });
    }

   if(indexSpinner) props.onHide();
  };
  
  const renderHTML = () => {
    if (indexSpinner) {
      return <ScaleLoader color={"#36D7B7"} css={override} />;
    }
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className={classes.root}
      >
        <Modal.Header className={classes.headerModal}>
          <Box
            onClick={() => {
              onHide();
              if (types === "Add-Movies" || types === "Edit-Movie") {
                setState({
                  tenPhim: "",
                  hinhAnh: "https://tix.vn/app/assets/img/default-film.webp",
                  maPhim: "",
                  moTa: "",
                  maNhom,
                  trailer: "",
                });
              }
            }}
            className="close"
          >
            <img src="\img/close/closeFocus.png" alt="close" />
          </Box>

          <Modal.Title>{types}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            className={classes.formModal}
            style={{
              gridTemplateColumns: `repeat(${
                types === "Add-ShowTimes" ? 2 : 3
              }, 1fr) `,
            }}
            onSubmit={handleSubmit}
          >
            {types === "Add-ShowTimes" && renderShowTimes()}
            {(types === "Add-Movies" || types === "Edit-Movie") &&
              renderMovies()}
            {types === "Add-users" && renderUsers()}

            <Button
              variant="contained"
              style={{ fontWeight: "bold" }}
              type="submit"
            >
              {Object.entries(detailMovie).length >0
                ? "UPDATE"
                : types === "Add-Movies" || types === "Add-users"
                ? "ADD"
                : "CREATE SHOWTIME"}
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    );
  };

  // handle onChage form user
  const handleChangeFormUsers = (e) => {
    let { name, value } = e.target;

    let data = { ...formUser.data, [name]: value };
    let errors = {
      ...formUser.errors,
      [name]: validate(name, value) ? validate(name, value) : "",
    };
    setFormUser({ ...formUser, data, errors });
  };
  // handleFocusFormUsers
  const handleFocusFormUsers = (e) => {
    let { name, value } = e.target;

    let errors = {
      ...formUser.errors,
      [name]: validate(name, value) ? validate(name, value) : "",
    };
    setFormUser({ ...formUser, errors });
  };
  // renderUsers
  const renderUsers = () => {
    return (
      <>
        <FormControl>
          <TextField
            name={"hoTen"}
            label="Full Name"
            value={formUser.data.hoTen}
            onChange={handleChangeFormUsers}
            onFocus={handleFocusFormUsers}
            // helperText={formUser.errors.hoTen}
          />
          <FormHelperText error>{formUser.errors.hoTen}</FormHelperText>
        </FormControl>
        <FormControl>
          <TextField
            name={"taiKhoan"}
            label="Account"
            value={formUser.data.taiKhoan}
            onChange={handleChangeFormUsers}
            onFocus={handleFocusFormUsers}
          />
          <FormHelperText error>{formUser.errors.taiKhoan}</FormHelperText>
        </FormControl>
        <FormControl>
          <TextField
            name="matKhau"
            label="Password"
            value={formUser.data.matkhau}
            onChange={handleChangeFormUsers}
            onFocus={handleFocusFormUsers}
          />
          <FormHelperText error>{formUser.errors.matKhau}</FormHelperText>
        </FormControl>
        <FormControl>
          <TextField
            name={"email"}
            label="Email"
            value={formUser.data.email}
            onChange={handleChangeFormUsers}
            onFocus={handleFocusFormUsers}
          />
          <FormHelperText error>{formUser.errors.email}</FormHelperText>
        </FormControl>
        <FormControl>
          <TextField
            name={"soDt"}
            label="Phone"
            value={formUser.data.soDt}
            onChange={handleChangeFormUsers}
            onFocus={handleFocusFormUsers}
          />
          <FormHelperText error>{formUser.errors.soDt}</FormHelperText>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel id="add-selection-users">Code group</InputLabel>
          <Select
            labelId="add-selection-users"
            id="demo-add-selection-users"
            name="maNhom"
            value={formUser.data.maNhom}
            onChange={handleChangeFormUsers}
          >
            {[...Array(10)].map((item, index) => (
              <MenuItem
                key={index}
                className={classes.MenuItem}
                value={`GP${
                  index < 10 ? "0" + parseInt(index + 1) : index + 1
                }`}
              >
                {`GP${index < 10 ? "0" + parseInt(index + 1) : index + 1}`}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{formUser.errors.maNhom}</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="add-selection-maLodai-users">
            {" "}
            User type code
          </InputLabel>
          <Select
            labelId="add-selection-user-type"
            id="demo-add-selection-user-type"
            name="maLoaiNguoiDung"
            value={formUser.data.maLoaiNguoiDung}
            onChange={handleChangeFormUsers}
          >
            <MenuItem value="KhachHang">Customer</MenuItem>
            <MenuItem value="QuanTri">Admin</MenuItem>
          </Select>
          <FormHelperText>{formUser.errors.maLoaiNguoiDung}</FormHelperText>
        </FormControl>
      </>
    );
  };
  // renderMovies
  const renderMovies = () => {
    return (
      <>
        <TextField
          disabled={types !== "Add-Movies"}
          label="Movie's code"
          multiline
          name="maPhim"
          // rowsMax={4}
          // value={value}
          onChange={handleChange}
          value={state.maPhim}
        />

        <TextField
          disabled={types !== "Add-Movies"}
          label="Movie's name"
          multiline
          name="tenPhim"
          // rowsMax={4}
          value={state.tenPhim}
          onChange={handleChange}
        />
        <FormControl className={classes.margin}>
          <InputLabel id="demo-customized-select-label">Code group</InputLabel>
          <Select
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            value={state.maNhom}
            name="maNhom"
            onChange={handleChange}
            input={<BootstrapInput />}
          >
            
            {[...Array(10)].map((item, index) => (
              <MenuItem
                value={"GP" + (index + 1 < 9 ? "0" + (index + 1) : index + 1)}
              >
                {"GP" + (index + 1 <= 9 ? "0" + (index + 1) : "" + (index + 1))}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          style={{ gridColumn: "1 / span 2" }}
          label="Trailer"
          multiline
          value={state.trailer}
          type={"text"}
          name="trailer"
          onChange={handleChange}
        />
        <div className={classes.groupImg}>
          <img
            src={state.hinhAnh}
              width={202}
              height={245}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = urlPublic + "/img/default-film.webp";
            }}
            name="upload-image"
            alt={`img-${state.tenPhim}`}
          />
          <TextField
            type="file"
            // rowsMax={4}
            id="chooseFile"
            // value={state.hinhAnh}
            name="hinhAnh"
            onChange={handleChange}
            accept={"./img/*"}
          />
          <label htmlFor="chooseFile">Choose an image</label>
        </div>

        <TextareaAutosize
          style={{ gridColumn: "1 / span 2", padding: 20 }}
          rows={6}
          name="moTa"
          onChange={handleChange}
          value={state.moTa}
          placeholder={"Write movie description here"}
        />
      </>
    );
  };
  // renderShowTimes
  const renderShowTimes = () => {
    return (
      <>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-helper-label">
            Movie's code
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            name="maPhim"
            value={state1.maPhim}
            onChange={handleChangeInput}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {listMovie.length > 0 &&
              listMovie.map((movie, index2) => {
                return (
                  <MenuItem key={index2} value={movie.maPhim}>
                    {movie.tenPhim}
                  </MenuItem>
                );
              })}
          </Select>
          <FormHelperText error>{state1.error.maPhim}</FormHelperText>
        </FormControl>
    <FormControl>

        <TextField
          className={classes.TextField}
          type="text"
          name="giaVe"
          value={state1.data.giaVe}
          label="Fare"
          onChange={handleChangeInput}
       
        />
        <FormHelperText error>{state1.error.giaVe}</FormHelperText>
    </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-movie-code">
            Theater's code
          </InputLabel>
          <Select
            labelId="demo-simple-select-movie-code"
            name="maRap"
            value={state1.data.maRap}
            onChange={handleChangeInput}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {listTheater.length > 0 &&
              listTheater.map((item1, index2) => {
                return (
                  <MenuItem key={index2} value={item1.maRap}>
                    {item1.tenRap}
                  </MenuItem>
                );
              })}
          </Select>
          <FormHelperText error>{state1.error.maRap}</FormHelperText>
        </FormControl>
  <FormControl>

        <TextField
          id="datetime-local"
          label="Show date and time"
          type="datetime-local"
          name="ngayChieuGioChieu"
          // defaultValue={state1.data.c}
          className={classes.TextField}
          onChange={handleChangeInput}
          InputLabelProps={{
            shrink: true,
          }}
        />
          <FormHelperText error>{state1.error.ngayChieuGioChieu}</FormHelperText>

        </FormControl>
      </>
    );
  };
  return renderHTML();
}

export default ModalAdmin;
