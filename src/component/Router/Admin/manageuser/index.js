import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";

import {
  LinearProgress,
  TableHead,
  IconButton,
  Tooltip,
  Paper,
  TableRow,
  TablePagination,
  TableFooter,
  TableContainer,
  TableCell,
  TableBody,
} from "@material-ui/core";

import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import Input from "@material-ui/core/Input";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import DeleteIcon from "@material-ui/icons/Delete";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
// request
// import request from "../../../../configs/request";
// action
import * as action from "../../../../Redux/action/admin";
// constant 
import *as tyAction from "../../../../Redux/constanst";



import { useSelector ,useDispatch} from "react-redux";
// *css loading 
import loadingStyle  from "../../../assets/jss/components/LoadingStyle";
// react router dom
import { useLocation } from "react-router-dom";
import classes1 from "classnames";
const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
  focusUser: {
    boxShadow: "1px 1px 6px 3px grey",
    background: "#e4e4e4",
  },
  tableCell:{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    "& button":{

      "&:hover":{
        outline:"none "
      },
      "&:focus":{
        outline:"none "
      }
    }
  }
});

export default function ManagerUser() {
  const location = useLocation();
  const classesLoading = loadingStyle();

  const dispatch = useDispatch();
  const { maNhom } = useSelector((state) => state.MovieManaGerment);
  const { indexSpinner,globalSearch,listUsers } = useSelector((state) => state.AdminReducer);
  const [refIndex, setRefIndex] = useState(null);
  const userRef = useRef(null);
  const classes = useStyles2();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [checkClose, setCheckClose] = useState(true);
  
  const [formUser, setFormUer] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom,
    maLoaiNguoiDung: "",
    hoTen: "",
   
  });
  let emptyRows = null;
  useEffect(() => {
    emptyRows =
      rowsPerPage - Math.min(rowsPerPage, listUsers.length - page * rowsPerPage);
  }, [listUsers]);

  //  rows?.sort((a, b) => (a.calories < b.calories ? -1 : 1));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // get list user
  // useEffect(() => {
  //   action.fetchListUser().then(res=>setRows(res.data)).catch(err=>{
  //     console.log(err);
  //   })

  // }, [])
  // setList user search
  useEffect(() => {
    if (location.pathname === "/admin/user") {
     
     if (globalSearch === "") {
        dispatch(action.getListUsers());
        
      } 
    }
    // return () => {
    //   cleanup
    // }
  }, [globalSearch]);
useEffect(() => {
  dispatch({
    type:tyAction.CHANGE_STATUS_LOCATION,
    payload :location.pathname
  })
  
}, [])
  //
  const renderHTML = () => {
// if(indexSpinner){
//   return  <TableRow>
//       <TableCell
//       colSpan="9"
//     style={{ color: "red", textAlign: "center" }}
    
//   >
//     <LinearProgress />
//   </TableCell>
//     </TableRow>
  
// }else  

if(listUsers.length > 0) {
    return (<TableBody>{(rowsPerPage > 0
            ? listUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : listUsers
          ).map((row, index) => (
            <TableRow
              ref={index === refIndex ? userRef : null}
              key={index}
              className={
                index === refIndex ? classes1(classes.focusUser) : null
              }
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <Input
                  placeholder="Họ tên"
                  name={"hoTen"}
                  type="text"
                  value={index !== refIndex ?row.hoTen:formUser.hoTen}
                  inputProps={{ "aria-label": "description" }}
                  onChange={index === refIndex ?handleChangeFormUser:null}
    
                />
              </TableCell>
              <TableCell component="th" scope="row">
                <Input
                
                  placeholder="Tài khoản"
                  type="text"
                  name={"taiKhoan"}
                  value={index !== refIndex ?row.taiKhoan:formUser.taiKhoan}
                  inputProps={{ "aria-label": "description" }}
                  onChange={index === refIndex ?handleChangeFormUser:null}
    
                />
              </TableCell>
              <TableCell>
                <Input
                type="text"
                  placeholder="Mật khẩu"
                  name={"matKhau"}
                  value={index !== refIndex ?row.matKhau:formUser.matKhau}
                  onChange={index === refIndex ?handleChangeFormUser:null}
                  inputProps={{ "aria-label": "description" }}
                />
              </TableCell>
              <TableCell>
                <Input
                name={"email"}
                  placeholder="email"
                  value={index !== refIndex ?row.email:formUser.email}
                  inputProps={{ "aria-label": "description" }}
                   onChange={index === refIndex ?handleChangeFormUser:null}
                  type="text"
              
    
                />
              </TableCell>
              <TableCell>
                <Input
                  name="soDt"
                  placeholder="số DT"
                  type="text"
                  value={index !== refIndex ?row.soDt:formUser.soDt}
                  inputProps={{ "aria-label": "description" }}
    
                  onChange={index === refIndex ?handleChangeFormUser:null}
                />
              </TableCell>
              <TableCell>
                <Input
                name={"maLoaiNguoiDung"}
                onChange={index === refIndex ?handleChangeFormUser:null}
                
                type="text"
                  placeholder="Mã người dùng"
                  value={index !== refIndex ?row.maLoaiNguoiDung:formUser.maLoaiNguoiDung}
                  inputProps={{ "aria-label": "description" }}
    
    
                />
              </TableCell>
              <TableCell className={classes.tableCell} style={{ cursor: "pointer" }}>
              {/* done  */}
                {!checkClose && index === refIndex && (
                  <Tooltip
                    onClick={handleDoneUser}
                    title="Done"
                  >
                    <IconButton
                      
                      aria-label="Done"
                    >
                      <DoneIcon />
                    </IconButton>
                  </Tooltip>
                )}
                  {/* delete  */}
                {checkClose && (
                  <Tooltip title="Delete">
                    <IconButton
                      onClick={() => handleRemoveUser(row.taiKhoan)}
                      aria-label="Delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                )}
                  {/* Close  */}
                {!checkClose && index === refIndex && (
                  <Tooltip title="Close">
                    <IconButton
                      onClick={handleCloseUser}
                      aria-label="Close"
                    >
                      <CloseIcon />
                    </IconButton>
                  </Tooltip>
                )}
                {/* edit  */}
                {checkClose && (
                  <Tooltip title="Edit">
                    <IconButton
                      onClick={() => handleEditUser(row, index)}
                      aria-label="Edit"
                    >
                      <EditRoundedIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </TableCell>
            </TableRow>
          ))}
    
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        
    )
} else return(  <TableRow>
  <TableCell
  colSpan="7"
style={{ color: "red", textAlign: "center" }}

>
Can't find the users!
</TableCell>
</TableRow>
);

   
  };
  // handle Change formUser 
  const handleChangeFormUser = (e) => {
    let { name, value } = e.target;
    setFormUer({ ...formUser, [name]: value });
  };
  // handle close
   const handleDoneUser = ()=>{
    dispatch({type:tyAction.CHANGE_STATUS_INDEX,
      statusIndex:true})
      setRefIndex(null);
      dispatch(action.handleUpdateUser(formUser));
    setCheckClose(!checkClose);

    
   }
  // handle done user 
  const handleCloseUser = ()=>{
    
    setCheckClose(!checkClose);
    setRefIndex(null);
    setFormUer({ taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom,
    maLoaiNguoiDung: "",
    hoTen: ""})
  }
  
  // remove user
  const handleRemoveUser = (user) => {
    action.RemoveUserAdmin(user);
    // action.fetchListUser().then((res)=>{
    //     console.log(res)
    // }).catch((err)=>{console.log(err.message)})
  };
  // useEffect(() => {
  //   if(userRef.current){
  //     userRef.current.style.boxShadow = "1px 1px 6px 3px grey"  ;

  //   }
  // }, [refIndex])
  // edit user
  const handleEditUser = (user, index) => {
    setFormUer({ ...user,maNhom});
    setRefIndex(index);
    setCheckClose(!checkClose);
  };

  return <TableContainer component={Paper}>
    
    <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>Order </TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Full Name</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Account</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Password</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Email</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Phone</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>User type </TableCell>
            <TableCell style={{ fontWeight: "bold" }}></TableCell>
            <TableCell style={{ fontWeight: "bold" }}></TableCell>
          </TableRow>
        </TableHead>
    {renderHTML()}
    <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={9}
              count={listUsers.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
        </Table>
    </TableContainer>;
}

