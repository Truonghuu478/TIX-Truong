import Axios from "axios";
import * as TyAction from "../constanst";
import Swal from "sweetalert2";


export const _handleGetUser = (user,checked,history) => {


  return (dispatch,getState) => {
    const {scheduleCode,status,maPhim}  = getState().UserReducer;
    Axios({
      method: "POST",
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap`,
      data: user,
    })
      .then((result) => {
        if (result.data !== "" || result.data !== null) {
          if(checked) localStorage.setItem('user',JSON.stringify(result.data));
          Swal.fire({
            icon: "success",
            title: "Đăng nhập thành công!",
            // padding: "0 0 20px 0",
            width: "400px",
            timerProgressBar: false,
            showConfirmButton: false,

            timer: 2000,
          });
          
        setTimeout(() => {
           if((scheduleCode  && status === "detail") ||(scheduleCode  && status === "home")){
        
            
             history.push(`checkout/${scheduleCode}`);

           }
           else if(status === "home"){
             history.push(`/`);

           }
            else     history.push("/phim/"+maPhim);
           
          }, 2000);
        
  
        }
        dispatch({
          type: TyAction.GETDATAUSERLOGIN,
          
          dataLogin: result.data,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Đăng nhập thất bại",
          text: "Something went wrong!",
          // footer: '<a href>Why do I have this issue?</a>',
          timerProgressBar: false,
          showConfirmButton: false,

          timer: 2000,
        });

      });
  };
};

export const _handleRegister =(data) =>{
    return dispatch =>{
      Axios({
        method:"POST",
        url:"https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy",
        data
      })
      .then(res=>{
        if (res.data !== "" || res.data !== null) {
          
          Swal.fire({
            icon: "success",
            title: "Đăng ký thành công!",
            // padding: "0 0 20px 0",
            width: "400px",
            timerProgressBar: false,
            showConfirmButton: false,

            timer: 2000,
          });
        }setTimeout(function() {

          dispatch({
            type : TyAction.GET_DATA_REGISTER,
           formRegister : res.data
          },2000)
        })
          console.log(res);
      }).catch(err=>{

        Swal.fire({
          icon: "error",
          title: "Đăng ký không thành công",
          text: "Có thể những thông tin này đã có người dùng!",
          // footer: '<a href>Why do I have this issue?</a>',
          timerProgressBar: false,
          showConfirmButton: false,

          timer: 2000,
      })
        })
      
    }
}

