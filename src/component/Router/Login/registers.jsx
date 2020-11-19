import React, { useState,useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import {
  makeStyles,
  styled,
  withStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import {Box} from "@material-ui/core";
import {FormControl,Select,InputLabel,MenuItem,InputBase,FormHelperText} from '@material-ui/core';

// import Container from "react-bootstrap/Container";
import Button from "@material-ui/core/Button";
import * as action from "../../../Redux/action/user";
import { connect } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import { blue, lightBlue } from "@material-ui/core/colors";
import "./_login.scss";
import {useHistory} from "react-router-dom"
import {validate} from "../../../vender/validate";
// useSelector 


const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: "transparent",
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    borderColor: "#2196f4",
    borderWidth: 3,
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

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
    transition :"all 0.4s"
  },
  content: {
    
    // backgroundImage: "linear-gradient( to bottom,rgba(20, 50, 93, 0.9),rgba(8, 22, 48, 0.9)",
    // boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.45)"

    
  },
  close: {
    position: "absolute",
    right: -11,
    top: -15,
    width: 40,
    height: 40,
    lineHeight: "40px",
    borderRadius: "50%",
  
    backgroundColor: "#081630",
    boxShadow: "0 2px 10px 0 rgba(0,0,0,.5)",
    cursor: "pointer"
  },
  MenuItem:{
    color:"#2196f4",
    background:"linear-gradient(to bottom, rgba(20, 50, 93, 0.9), rgba(8, 22, 48, 0.9) )",
    padding:"10px 0",display:"flex",
    justifyContent:"center",
    fontWeight:"bold"
  },
  BoxInput:{
    display:'flex',
    justifyContent:"space-between",
    alignItems:"center",
    
  },

  modalHeader: {
    display: "flex",
    justifyContent: "center",
    // width: "100%",
    padding: 0,

  },
  imgHeader: {
    width: "230px",
    height: "113px",
    display: "block",
  },
  modalBody: {
    width: "100%",
    height: "60%",
  },
  input: {

    // marginBottom: "10px",
    
    height: 50
  },
  selection:{
    color:"#2196f4",
    marginTop:"0 !important",
    // padding: "20px 26px 10px 12px !important",
    "& .MuiSelect-root-215 ":{
      padding:"19px 16px 12px"
    },
    "& svg":{
      color:"#2196f4"
    }


  },
  modalFooter: {
    // height:"50%",
 display:"flex",

    
  },
  btnMarginR:{
    marginRight:"auto"
  },
  btnMarginL:{
    marginLeft:"auto"
  },
  btn: {
    margin:10,
    "&:focus": {
      outline: "none",
    },
  },
  formControl:{
    width:"47%"
  }
}));
const theme = createMuiTheme({
  palette: {
    primary: blue,
    lightColor: lightBlue,
  },
});
const ValidationTextField = withStyles({
  root: {
    
    "& input:valid ,& fieldset": {
      
      color: "#2196f4",
      borderWidth: 3,
      borderColor: "#2196f4",   

    },
    "& p": {
      color: "red",
      fontSize: 16,
      margin:0
    },
    
    "& label":{
      color: "#2196f4"
    },
    "& input:valid + fieldset": {
      borderColor: "#2196f4",
      borderWidth: 3,
      color: "#2196f4",
    },
    "& input:valid:focus + fieldset": {
      transition:"all 0.3s",
      borderLeftWidth: 10,
      borderWidth: 3,

      color: "#2196f4",
      padding: "4px !important",
    },
    "& input:valid:hover + fieldset": {
      
      color: "#2196f4",
      borderColor: "#2196f4",
      // borderWidth: 3,
   

    },
  },
})(TextField);

function Registers(props) {
  const classes = useStyles();
  const history = useHistory();
  // state Redux  
  const [state, setState] = useState(
        {  
          users:{ 
            
            taiKhoan: "",
            matKhau :"", 
            email :"", 
            hoTen:"", 
            maNhom :"",
            maLoaiNguoiDung :"",
            soDT :"",
           },
          errors:{
           
            taiKhoan: "",
            matKhau :"", 
            email :"", 
            hoTen:"", 
            maNhom :"",
            maLoaiNguoiDung :"",
            soDT :"",
          },
          isValid :true
      })  
  
      let screenWidth = React.useMemo(()=>window.innerWidth);

      
  //set value user
  const _handleChangeValue = (e) => {
    let { name, value } = e.target;
  
    let isValid = true;
    let users = {...state.users,[name]:value};
    let errors ={...state.errors,
      [name]: validate(name,value) ? validate(name,value) :""};
      
     for(const [key] of Object.entries(users)){
        if(users[key] !== ""){
            isValid = false;
        }else {
          isValid = true;
          break;
        }
     }
     if(!isValid){
      for(const [key] of Object.entries(errors)){
        if(errors[key] === ""){
            isValid = false;
            

        }else {
          isValid = true;
         
          break;
        }
     }
     }
    setState({
      users,
      errors  ,
      isValid
    })
  };
  // change  history to home
  const __handleHistory = () => {
    let {maPhim,status} = props;

    status === "home"?history.push("") :history.push(`/phim/${maPhim}`)
    
  };

  // // submit
  const __handleSubmit = (e) => {
   
    e.preventDefault();
    props._handleRegister(state.users)
      
  };
  
  return (
    
          <div style={{width :screenWidth < 813 ? screenWidth <445 ?"100%":"90%" :800}} className={`${classes.content} Login__background`}>
            <div onClick={__handleHistory} className={`${classes.close} Login__close` }>
                <CloseIcon />
             
            </div>
            <div style={{height: 125 }} className={classes.modalHeader}>
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
              <div className={`${classes.modalBody} form__body`}>
                {/* <p className="mt-5">
                  Đăng nhập để được nhiều ưu đãi, mua vé và bảo mật thông tin!
            </p> */}
                <ThemeProvider theme={theme}>
                  <Box style={{marginBottom:screenWidth < 813 ? 0:"2rem"}} className={`${classes.BoxInput} form__body--BoxInput`} component="div" >
                  <ValidationTextField
                  style={{marginBottom:screenWidth < 813 ? 30:10,width:screenWidth <812 ?"98%" : "48%",padding:screenWidth <813 ? 0:10}}
                    className={classes.input}
                    name="taiKhoan"
                    label="Tài khoản"
                    variant="outlined"
                    autoComplete="current-password"
                    onChange={_handleChangeValue}
                    helperText={state.errors.taiKhoan}
                    autoFocus
                  />

                  <ValidationTextField
                  style={{marginBottom:screenWidth < 813 ? 30:10,width:screenWidth <812 ?"98%" : "48%",padding:screenWidth <813 ? 0:10}}
                    className={classes.input}
                    onChange={_handleChangeValue}
                    name="matKhau"
                    id="matKhau"
                    type="password"
                    label="Mật khẩu"
                    variant="outlined"
                    helperText={state.errors.matKhau}
                  />
                  </Box>
                 <Box style={{marginBottom:screenWidth < 813 ? 0:"2rem"}} component="div" className={`${classes.BoxInput} form__body--BoxInput`}>
                  <ValidationTextField
                  style={{marginBottom:screenWidth < 813 ? 30:10,width:screenWidth <812 ?"98%" : "48%",padding:screenWidth <813 ? 0:10}}
                      className={classes.input}
                      onChange={_handleChangeValue}
                      name="email"
                      id="email"
                      type="text"
                      label="Email"
                      variant="outlined"
                      helperText={state.errors.email}
                    />
                  <ValidationTextField
                  style={{marginBottom:screenWidth < 813 ? 30:10,width:screenWidth <812 ?"98%" : "48%",padding:screenWidth <813 ? 0:10}}
                    className={classes.input}
                    onChange={_handleChangeValue}
                    name="soDT"
                    id="soDT"
                    type="tel"
                    label="Số điện thoại"
                    variant="outlined"
                    helperText={state.errors.soDT}
                  />
                 </Box>
                  <Box style={{marginBottom:screenWidth < 813 ? 0:"2rem"}} component="div" className={`${classes.BoxInput} form__body--BoxInput`}>
                  <ValidationTextField
                  style={{marginBottom:screenWidth < 813 ? 30:10,width:screenWidth <812 ?"98%" : "48%",padding:screenWidth <813 ? 0:10}}
                
                    className={classes.input}
                    onChange={_handleChangeValue}
                    name="hoTen"
                    id="hoTen"
                    type="text"
                    label="Họ tên"
                    
                    variant="outlined"
                    helperText={state.errors.hoTen}
                  />
                  <Box component="div" style={{display: 'flex',justifyContent: 'space-between',width: screenWidth < 813 ? "98%":"48%" ,padding:screenWidth <813 ? 0:10,marginBottom:screenWidth < 813 ? 0:20}} className={classes.input}> 

                 
                <FormControl style={{width:"100%"}}>
                      <InputLabel
                      style={{color:"#2196f4",left:"7px"}}
                       id="ma-nhom">Mã nhóm</InputLabel>
                      <Select
                        id="select-ma-nhom"
                        name="maNhom"
                        labelId="ma-nhom"
                        onChange={_handleChangeValue}
                        input={<BootstrapInput />}
                        className={classes.selection}
                    

                      >
                      {[...Array(10)].map((item,index)=>{
                        return <MenuItem key={index}
                         className={classes.MenuItem} 
                         value={`GP${index <10 ? "0"+parseInt(index+1):index+1}`}>
                        {`GP${index <10 ? "0"+parseInt(index+1):index+1}`}
                        </MenuItem>
                      })}
                      </Select>
                      <FormHelperText> {state.errors.maNhom}</FormHelperText>

                    </FormControl>
                    {/* <FormControl className={classes.formControl}>
                      <InputLabel 

                        style={{color:"#2196f4",left:"7px"}}

                       id="ma-nguoi-dung">
                         Loại người dùng</InputLabel>
                      <Select
                       labelId="ma-nguoi-dung"
                        id="select-nguoi-dung"
                        name={"maLoaiNguoiDung"}
                        onChange={_handleChangeValue}
                        className={classes.selection}

                        input={<BootstrapInput />}

                      >
                        <MenuItem className={classes.MenuItem} value={"KhachHang"}>Khách hàng</MenuItem>
                        <MenuItem className={classes.MenuItem} value={"QuanTri"}>Quản trị</MenuItem>

                      </Select>
                      <FormHelperText> {state.errors.maLoaiNguoiDung}</FormHelperText>
                     

                    </FormControl> */}
                    </Box>
                  </Box>
                </ThemeProvider>
              </div>
              <div style={{width:"100%",margin:screenWidth <813 ? " 0 auto":0}}  className={classes.modalFooter}>
              <MyButton  
              style={{width: screenWidth <813 ? "100%":"45%"}}
                 type="button"
                 onClick={()=>props.handleChangeStatus("login")}
                  className={`${classes.btn} `} color="blue">
                  Đăng nhập
            </MyButton>
                <MyButton  
                style={{width: screenWidth <813 ? "100%":"45%"}}
                disabled={state.isValid}
                 type="submit"
                  className={`${classes.btn} `} color="blue">
                  Đăng ký
            </MyButton>
              </div>
            </form>
          </div>
       
  )


}

const mapStateToProps = (state) => {
  return {
    userLogin: state.UserReducer.userLogin,
    status:state.UserReducer.status,
    maPhim:state.UserReducer.maPhim,
 
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    _handleGetUser: (user, history) => {
      dispatch(action._handleGetUser(user, history));
    },
    _handleRegister:(data)=>{
      dispatch(action._handleRegister(data))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Registers);
