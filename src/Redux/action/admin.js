import Axios from "axios";
import request from "../../configs/request";
import Swal from "sweetalert2";
import *as TyAction from "../constanst";
export const actLogin = (user, history) => {
    return dispatch => {
      Axios({
        method: "POST",
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
        data: user
      })
        .then(result => {
          if (result.data.maLoaiNguoiDung === "QuanTri") {
            localStorage.setItem("userAdmin", JSON.stringify(result.data));
            Swal.fire({
              icon: "success",
              title: "successful login!",
              // padding: "0 0 20px 0",
              width: "400px",
              timerProgressBar: false,
              showConfirmButton: false,
      
              timer: 2000,
            });
            
            history.push("/admin/dashboard");
          } else {
            Swal.fire({
              icon: "error",
              title: "Danger",
              text: "you don't have access !",
              // footer: '<a href>Why do I have this issue?</a>',
              timerProgressBar: false,
              showConfirmButton: true,
      
              // timer: 2000,
            });
          }
        })
        .catch(err => {
          console.log(err.response.data);
        });
    };
  };

  export const RemoveUserAdmin =(taiKhoan)=>{

    return Axios({
      method:"DELETE",
      url:"https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan="+taiKhoan,

      headers:{
        Authorization : "Bearer" + JSON.parse(localStorage.getItem("userAdmin")).accessToken
      }
    }).then(err=>{
      Swal.fire({
        icon: "success",
        title: "successful user deletion!",
        // padding: "0 0 20px 0",
        width: "400px",
        timerProgressBar: false,
        showConfirmButton: false,

        timer: 2000,
      });
    }).catch(err=>{
      Swal.fire({
        icon: "error",
        title: "Danger",
        text: "This user has booked a ticket so it cannot be deleted!",
        // footer: '<a href>Why do I have this issue?</a>',
        timerProgressBar: false,
        showConfirmButton: true,

        // timer: 2000,
      });
    })
    
  }

export const getListUsers = ()=>{
  return (dispatch,getState) =>{
    const {maNhom } = getState().MovieManaGerment;
    
     request(
      "GET",
      "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=" +
        maNhom,
      {},
      "userAdmin"
    ).then(res=>{
      dispatch({
        type:TyAction.GET_LIST_USERS,
        payload:res.data,
       
      })
    })
  }
}
export const handleUpdateUser =(data)=>{
  return dispatch =>{
    request("PUT","https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",data,"userAdmin")
    .then(function(res){
      
      Swal.fire({
        icon: "success",
        title: "successful user deletion!",
        // padding: "0 0 20px 0",
        width: "400px",
        timerProgressBar: false,
        showConfirmButton: false,

        timer: 2000,
      });
      dispatch(getListUsers());
     
    }).catch(err=>{
      dispatch({type:TyAction.CHANGE_STATUS_INDEX,
        statusIndex:false}
        )
        Swal.fire({
          icon: "error",
         title:"Users update failed",
          text: err.message,
          // footer: '<a href>Why do I have this issue?</a>',
          timerProgressBar: false,
          showConfirmButton: true,
    
          // timer: 2000,
        });
    })
    
  }

}

///config movie  
export const getListMovies = (maNhom) =>{
  return  (dispatch,getState) =>{
    const {maNhom }  = getState().MovieManaGerment;
      return  request("GET","https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom="+maNhom,{},"userAdmin")
      .then(res=>{
   dispatch({
     type:TyAction.CHANGE_STATUS_MOVIES,
     payload:res.data
   })
      })  
  
    }

}


// delete movie 
export const deleteMovie = (maPhim)=>{
  return request("DELETE","https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/XoaPhim?MaPhim="+maPhim,{},"userAdmin")
  
}
// add movie
export const addMovie  = (data)=>{
  return (dispatch )=>{
   
    return request("POST","https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/ThemPhimUploadHinh",data,"userAdmin").then(res=>{
    Swal.fire({
      icon: "success",
      title: "Movie added successfully!",
      // padding: "0 0 20px 0",
      width: "400px",
      timerProgressBar: false,
      showConfirmButton: false,

      timer: 1500
    })  
    dispatch(getListMovies());
  }).catch(err=>{
    Swal.fire({
      icon: "error",
     title:"Movie added failed",
      text: err.message,
      // footer: '<a href>Why do I have this issue?</a>',
      timerProgressBar: false,
      showConfirmButton: true,

      // timer: 2000,
    });
    console.log(err)})
  }
}

// edit movie 
export const editMovie = (data)=>{

  return (dispatch)=>{
    return request("POST","https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhimUpload",data,"userAdmin")
    .then(res=>{
      Swal.fire({
        icon: "success",
        title: "Movie update successfully!",
        // padding: "0 0 20px 0",
        width: "400px",
        timerProgressBar: false,
        showConfirmButton: false,
  
        timer: 1500
      })  
      dispatch(getListMovies());
      dispatch({type:TyAction.CHANGE_STATUS_INDEX,
        statusIndex:false})
    }).catch(err=>{
      dispatch({type:TyAction.CHANGE_STATUS_INDEX,
        statusIndex:false})
      Swal.fire({
        icon: "error",
       title:"Movie update failed",
        text: "Files exceed 1MB",
        // footer: '<a href>Why do I have this issue?</a>',
        timerProgressBar: false,
        showConfirmButton: true,
  
        // timer: 2000,
      });
      
    })
  }
}

export const createShowTime = (data)=>{

  return dispatch => {
  return request("POST","https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/TaoLichChieu",data,"userAdmin")
  .then(res => {
    Swal.fire({
      icon: "success",
      title: "successful showtimes added!",
      // padding: "0 0 20px 0",
      width: "400px",
      timerProgressBar: false,
      showConfirmButton: false,
  
      timer: 1500
    })   
    dispatch(getListMovies())
  }
  
  ).catch(err=>{
    Swal.fire({
      icon: "error",
     title:"successful showtimes failed",
      text: err.message,
      // footer: '<a href>Why do I have this issue?</a>',
      timerProgressBar: false,
      showConfirmButton: true,

      // timer: 2000,
    });
  })
  }
}

export const fetchListDetailTheater = (maHeThongRap) => {
  return dispatch => {
      Axios({
          method: "GET",
          url: `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`
      }).then(result => {
      
          dispatch({
              type: TyAction.FETCH_LIST_DETAIL_THEATER,
              detailTheaters: result.data
          })
      }).catch(error => {
          console.log(error);

      })
  }
}