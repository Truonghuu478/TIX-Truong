import * as tyAction from "../../constanst";
import Swal from "sweetalert2";

const initialState = {
  listTicketRoom: null,
  step: 1,
  sttNormal: 0,
  sttVip: 0,
  stt: 0,
  chooseChair: false,
  listChairs: [],
  totalChair: 0,
  totalCombo: 0,
};
const BookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case tyAction.CreateShowtime:
      return { ...state, listTicketRoom: action.data };
    case tyAction.GET_COUNT_CHAIR: {
      if (
        action.name === "Vé thường" &&
        (state.sttNormal >= 0 || state.sttNormal <= 11)
      ) {
        if (action.result) {
          state.totalChair += 75000;
          state.sttNormal++;
        } else if (state.sttNormal > 0) {
          state.totalChair -= 75000;
          state.sttNormal--;
        }
      } else if (
        action.name === "Vé vip" &&
        (state.sttVip >= 0 || state.sttVip <= 11)
      ) {
        if (action.result) {
          state.totalChair += 90000;
          state.sttVip++;
        } else if (state.sttVip > 0) {
          state.totalChair -= 90000;
          state.sttVip--;
        }
      }
      state.stt = state.sttNormal + state.sttVip;

      return { ...state };
    }
    case tyAction.CHANGE_STYLE_STEP: {
      if (action.i !== 3) {
        return { ...state, totalChair: 0, step: action.i };
      }
      return { ...state, chooseChair: true, step: action.i };
    }
    case tyAction.GET_DETAIL_CHAIR: {
      // let dataOwl =
      let { sttNormal, sttVip } = state;
      let { stt } = state;
      let { result, name } = action;

      let data = { ...result, name };

      // if(data.loaiGhe === " vip")
      let newArrChairs = [...state.listChairs];
      let index = newArrChairs.findIndex((chair) => chair.maGhe === data.maGhe);

      let delVip = newArrChairs.findIndex((item) => item.loaiGhe === "Vip");
      let delNormal = newArrChairs.findIndex(
        (item) => item.loaiGhe === "Thuong"
      );

      if (data.daDat) {
        if (newArrChairs.length > 0 && (sttNormal !== 1 || sttVip !== 1)) {
          for (let i = newArrChairs.length - 1; i >= 0; i--) {
            if (data.loaiGhe === "Vip" && newArrChairs[i].loaiGhe === "Vip") {
              if (
                parseInt(newArrChairs[i].stt) + 1 === parseInt(data.stt) ||
                parseInt(newArrChairs[i].stt) - 1 === parseInt(data.stt) ||
                parseInt(newArrChairs[i].stt) === parseInt(data.stt) + 1 ||
                parseInt(newArrChairs[i].stt) === parseInt(data.stt) - 1
              ) {
              } else {
                Swal.fire({
                  imageUrl:
                    "https://tix.vn/app/assets/img/Post-notification.png",
                  imageHeight: 90,
                  imageAlt: "A tall image",
                  html: "<b >Không được để trống ghế !!!</b>",
                });
              }
              break;
            } else if (
              data.loaiGhe === "Thuong" &&
              newArrChairs[i].loaiGhe === "Thuong"
            ) {
              if (
                parseInt(newArrChairs[i].stt) + 1 === parseInt(data.stt) ||
                parseInt(newArrChairs[i].stt) - 1 === parseInt(data.stt) ||
                parseInt(newArrChairs[i].stt) === parseInt(data.stt) + 1 ||
                parseInt(newArrChairs[i].stt) === parseInt(data.stt) - 1
              ) {
              } else {
                Swal.fire({
                  imageUrl:
                    "https://tix.vn/app/assets/img/Post-notification.png",
                  imageHeight: 90,
                  imageAlt: "A tall image",
                  html: "<b >Không được để trống ghế !!!</b>",
                });
              }
              break;
            }
          }
        }
        newArrChairs.push(data);

        if (newArrChairs.length > stt) {
          if (data.loaiGhe === "Vip") {
            newArrChairs.splice(delVip, 1);
          } else {
            newArrChairs.splice(delNormal, 1);
          }
          // newArrChairs.push(data);
        } else {
          let count = 0;
          if (data.loaiGhe === "Vip") {
            newArrChairs.forEach((item) => {
              if (item.loaiGhe === "Vip") count++;
            });

            if (count > sttVip) {
              newArrChairs.splice(delVip, 1);
            }
          } else {
            newArrChairs.forEach((item) => {
              if (item.loaiGhe === "Thuong") count++;
            });
            if (count > sttNormal) {
              newArrChairs.splice(delNormal, 1);
            }
          }
        }
        // newArrChairs.push(data);
        // if(data.loaiGhe === "Vip"){

        // }
      } else {
        if (index !== -1) {
          if (newArrChairs.length <= stt) {
            newArrChairs.splice(index, 1);
          }
        } else {
          if (data.loaiGhe === "Vip") {
            newArrChairs.splice(delVip, 1);
          } else {
            newArrChairs.splice(delNormal, 1);
          }
          newArrChairs.push(data);
        }
      }
      // đặt ghế
      // chọn thường  :
      //  -show tất cả ghế thường và ẩn những ghế vip
      // - khi chọn ghế thường thì kiểm tra theo số thứ tự  ;
      // - nếu người dùng chon qua thì đổi thì bỏe ghê đầu && nếu ghế vược qua thì thông báo lỗi và cho phép chọn

      // ghế vip :
      // - show tất cả ghế vip và ẩn đi những ghế không cần thiết
      // - khi chọn ghế thường thì kiểm tra theo số thứ tự  ;
      // - nếu người dùng chon qua thì đổi thì bỏe ghê đầu && nếu ghế vược qua thì thông báo lỗi và cho phép chọn

      // chọn tất cả
      // -show tất cả các ghế  (trừ ghế đã đặt)
      // nếu người dùng vượt quá stt của ghế thường hoặc vip thì xóa ghê ban đầu đi và add cái ghế mới

      // console.log("siza",newArrChairs.length,"vitri",index,"stt",stt);

      return { ...state, listChairs: newArrChairs };
    }
    case "CHECK_STEP": {
      state.sttVip = 0;
      state.sttNormal = 0;
      state.stt = 0;
      if (action.status === "restart__listChair") {
        state.listChairs = [];
        return { ...state, step: action.i + 1 };
      } else return { ...state, step: action.i + 1 };
    }
    case "RESTART_BOOKING": {
      state.listTicketRoom = null;
      state.step = 1;
      state.stt = 2;
      state.chooseChair = false;
      state.listChairs = [];
      state.totalChair = 90000;
      state.totalCombo = 0;
      return { ...state };
    }
    default:
      let newListChairs = [...state.listChairs];
      newListChairs = [];
      state.sttNormal = 0;
      state.sttVip = 0;

      state.step = 1;
      state.chooseChair = false;
      state.totalChair = 0;
      state.totalCombo = 0;
      return { ...state, newListChairs };
  }
};
export default BookingReducer;
