import Axios from "axios";
import * as TyAction from "../constanst";

export const CreateShowTimeAction = (id) => {
  return (dispatch, getState) => {
    Axios({
      method: "GET",
      url: ` https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`,
    })
      .then((result) => {
        dispatch({
          type: TyAction.CreateShowtime,
          data: result.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const changeStyleStep = (i) => {
  return (dispatch) => {
    dispatch({
      type: TyAction.CHANGE_STYLE_STEP,
      i
    });
  };
};
export const handleChangeCount = (name,result) => {
  return (dispatch) => {
    dispatch({
      type: TyAction.GET_COUNT_CHAIR,
      result,
      name
    });
  };
};

export const getDetailChair = (result,name)=>{
    return dispatch =>{
        dispatch({
          type : TyAction.GET_DETAIL_CHAIR,
          result,
          name
        })
    }
}