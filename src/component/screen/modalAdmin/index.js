import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import *as action from "../../../Redux/action/admin";
import ScaleLoader from "react-spinners/ScaleLoader";
import { css } from "@emotion/core";
import *as tyAction from "../../../Redux/constanst";
import { validateMovie } from "../../../vender/validate";
import Swal from "sweetalert2";
import *as actionMovie from "../../../Redux/action/moive";
import dateFormat from "dateformat";
import {
  Button,
  Box,

  TextField,
  TextareaAutosize,
  MenuItem,
  FormControl,
  Select,
  InputBase,
  InputLabel, FormHelperText
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
// css
import useStyles from "./modalAdminStyle";
import { useSelector, useDispatch } from "react-redux";
ModalAdmin.propTypes = {
  type: PropTypes.number.isRequired,
  onHide: PropTypes.func.isRequired,

  detailMovie: PropTypes.object.isRequired,

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
 
  position:fixed;top:50%;left:50%;
`;
function ModalAdmin(props) {
  const { maNhom } = useSelector((state) => state.MovieManaGerment);
  const formatD = useCallback((date) => dateFormat(new Date(date), "dd/mm/yyyy h:MM:ss"))
  const { indexSpinner } = useSelector((state) => state.AdminReducer);
  const { type, onHide, detailMovie, listTheater } = props;
  const dispatch = useDispatch();
  const [listMovie, setListMovie] = useState([]);
  const [upload, setUpload] = useState("./img/no-image.png")
  const [state, setState] = useState({
    tenPhim: "",
    hinhAnh: "https://tix.vn/app/assets/img/default-film.webp",
    maPhim: "",
    moTa: "",
    maNhom,
    trailer: "",
  });
  const [state1, setState1] = useState({
    data: { maPhim: "", ngayChieuGioChieu: "2019-01-01T12:00:00", maRap: "", giaVe: "" },
    error: { maPhim: "", ngayChieuGioChieu: "", maRap: "", giaVe: "" },

  });
  const classes = useStyles();
  useEffect(() => {

    if (detailMovie) {

      setState(detailMovie)
    }
  }, [detailMovie]);

  // fetch list movie 
  useEffect(() => {

    actionMovie.fetchListMovie(maNhom).then(res => {

      setListMovie(res.data);
    })
  }, []);
  const handleChangeInput = (e) => {
    let { name, value } = e.target;

    let newData = {
      ...state1.data,
      [name]: name !== "ngayChieuGioChieu" ? parseInt(value) : formatD(value)
    };
    let newError = {
      ...state1.error,
      [name]: validateMovie(name, value) ? validateMovie(name, value) : "",
    };

    setState1({ ...state, data: newData, error: newError });

  };
  const handleChange = (e) => {
    let { name, value, files } = e.target;
    // if(name ==="hinhAnh"){
    //     let formData = new FormData();
    //     formData.append("hinhAnh",files[0]);
    //     action.uploadImage(formData)
    //     .then(res=>console.log(res)).catch(err=>console.log(err))
    // }
    setState({ ...state, [name]: name === "hinhAnh" ? files[0] : value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();


    if (type === "Add-ShowTimes") {

      let isValid = false;
      for (let key in state.error) {

        if (state.error[key] !== "") {
          isValid = true;

        }
      }
      if (isValid) {

        Swal.fire({
          icon: "error",
          title: "successful showtimes failed",
          text: "Not performed because of error",
          // footer: '<a href>Why do I have this issue?</a>',
          timerProgressBar: false,
          showConfirmButton: true,

          // timer: 2000,
        });
      } else dispatch(action.createShowTime(state1.data));
      setState1({ ...state1, data: { maPhim: "", ngayChieuGioChieu: formatD("2019-01-01T12:00:00"), maRap: "", giaVe: "" }, error: { maPhim: "", ngayChieuGioChieu: "", maRap: "", giaVe: "" } })
    } else {
      let formData = new FormData();
      for (let key in state) {

        formData.append(key, state[key]);
      }
      e.preventDefault();
      dispatch({
        type: tyAction.CHANGE_STATUS_INDEX,
        statusIndex: true
      })
      dispatch(!detailMovie ? action.addMovie(formData) : action.editMovie(formData));

      setState({
        ...state,
        tenPhim: "",
        hinhAnh: "https://tix.vn/app/assets/img/default-film.webp",
        maPhim: "",
        moTa: "",
        maNhom,
        trailer: "",
      })

    }



    if (!indexSpinner) props.onHide();
  };

  const renderHTML = () => {
    if (indexSpinner) { return <ScaleLoader color={"#36D7B7"} css={override} /> }
    return <Modal {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={classes.root}
    >
      <Modal.Header className={classes.headerModal}>
        <Box onClick={() => {
          onHide();
          if (type === "Add-Movies" || type === "Edit-Movie") {
            setState({
              tenPhim: "",
              hinhAnh: "https://tix.vn/app/assets/img/default-film.webp",
              maPhim: "",
              moTa: "",
              maNhom,
              trailer: "",
            });

          }
        }} className="close">

          <img src="\img/close/closeFocus.png" alt="close" />
        </Box>

        <Modal.Title >{type}</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <form
          className={classes.formModal}
          style={{ gridTemplateColumns: `repeat(${type === "Add-ShowTimes" ? 2 : 3}, 1fr) ` }}
          onSubmit={handleSubmit}
        >
          {type === "Add-ShowTimes" && renderShowTimes()}
          {(type === "Add-Movies" || type === "Edit-Movie") && renderMovies()}

          <Button variant="contained" style={{ fontWeight: "bold" }} type="submit" >{detailMovie ? "UPDATE" : type === "Add-Movies" ? "ADD" : "CREATE SHOWTIME"}</Button>
        </form>
      </Modal.Body>

    </Modal>
  }

  const renderMovies = React.useCallback(() => {
    return (<>

      <TextField

        label="Movie's code"
        multiline
        name="maPhim"
        // rowsMax={4}
        // value={value}
        onChange={handleChange}
        value={state.maPhim}
      />

      <TextField

        label="Movie's name"
        multiline
        name="tenPhim"
        // rowsMax={4}
        value={state.tenPhim}

        onChange={handleChange}
      />
      <FormControl className={classes.margin}>
        <InputLabel id="demo-customized-select-label">
          Code group
      </InputLabel>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={state.maNhom}
          name="maNhom"
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <MenuItem value="">None</MenuItem>
          {[...Array(10)].map((item, index) => (
            <MenuItem
              value={"GP" + (index + 1 < 9 ? "0" + (index + 1) : index + 1)}
            >
              {"GP" +
                (index + 1 <= 9 ? "0" + (index + 1) : "" + (index + 1))}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        style={{ gridColumn: "1 / span 2" }}

        label="Trailer"
        multiline
        value={state.trailer}
        // rowsMax={4}

        name="trailer"
        onChange={handleChange}
      />
      <div className={classes.groupImg}>
        <img
          src={state.hinhAnh}
          //  onError={(e)=>{e.target.onerror = null; e.target.src="./img/default-film.webp"}}

          name="upload-image" alt={`img-${state.tenPhim}`} />
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
      /></>)
  })
  const renderShowTimes = React.useCallback(() => {
    return (<>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-helper-label">Movie's code</InputLabel>
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
          {listMovie.length > 0 && listMovie.map((movie, index2) => {
            return <MenuItem key={index2} value={movie.maPhim} >
              {movie.tenPhim}
            </MenuItem>
          })}
        </Select>
        <FormHelperText>{state1.error.maPhim}</FormHelperText>
      </FormControl>

      <TextField
        className={classes.textField}
        type="text"
        name="giaVe"
        value={state1.data.giaVe}
        label="Fare"
        onChange={handleChangeInput}
        helperText={state1.error.giaVe}
      />

      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-movie-code">Theater's code</InputLabel>
        <Select
          labelId="demo-simple-select-movie-code"
          name="maRap"
          value={state1.data.maRap}
          onChange={handleChangeInput}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {listTheater.length > 0 && listTheater.map((item1, index2) => {
            return <MenuItem key={index2} value={item1.maRap} >
              {item1.tenRap}
            </MenuItem>
          })}
        </Select>
        <FormHelperText>{state1.error.maRap}</FormHelperText>
      </FormControl>


      <TextField
        id="datetime-local"
        label="Show date and time"
        type="datetime-local"
        name="ngayChieuGioChieu"

        defaultValue={state1.data.ngayChieuGioChieu}
        className={classes.textField}
        onChange={handleChangeInput}
        InputLabelProps={{
          shrink: true,
        }}
      />

      {/* <Grid className={classes.buttonShowTime}>
        <Button type="submit" variant="contained">
          Create showtimes{" "}
        </Button>
      </Grid> */}
    </>)
  })
  return (
    renderHTML()

  );
}

export default ModalAdmin;
