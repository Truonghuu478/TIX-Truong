import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {Link} from "react-router-dom";

import request from "../../../configs/request";
import * as TyAction from "../../../Redux/constanst";
import { useDispatch, useSelector } from "react-redux";

export default function SimpleMenu(props) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const {userLogin} =  useSelector(state => state.UserReducer)

  const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const fetchDetailUser =()=>{
    request(
      "POST",
      "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan",
      { TaiKhoan: userLogin.taiKhoan }
    )
      .then((result) => {
        let { data } = result;
       
          localStorage.setItem('detail-user',JSON.stringify(data));
      dispatch({ type: TyAction.FETCH_DETAIL_USER,data });
})
      .catch((err) => console.log(err));
  }
    
  return (
    <div className="simple-button">
      <Button
      style={{padding:5,minWidth:"auto"}}
       aria-controls="simple-menu" aria-haspopup="true"
        onClick={handleClick}>
        <ArrowDropDownIcon/>
      </Button>
      <Menu
      style={{zIndex:"99999"}}
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
        <Link style={{color:"black",width:"100%"}} 
        to="/detail-user" onClick={fetchDetailUser}>
        <MenuItem>
          My account
          </MenuItem>
          </Link>
          {userLogin.maLoaiNguoiDung ==="QuanTri" && <Link 
          to="/admin"
          style={{color:"black",width:"100%"}}>
          <MenuItem>Admin</MenuItem>
          </Link>}
        <MenuItem
        style={{color:"black"}} 
          onClick={()=>dispatch({type: "OUT_USER",})}
        >Logout</MenuItem>
      </Menu>
    </div>
  );
}
