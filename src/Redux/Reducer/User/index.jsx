import * as TyAction from "../../constanst";

const initialUser = {
  userLogin:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):  null,
  scheduleCode:null,
  status:"home",
  maPhim:null,
  formRegister :null,
  room:16,

  

};
const UserReducer = (state = initialUser, action) => {
  switch (action.type) {
    case "CHANGE_TARGET":{
      state.targetPage = action.targetPage;
      return {...state}
    }
    case TyAction.GETDATAUSERLOGIN: {
      // if(action.dataLogin){
      //   localStorage.setItem("user",JSON.stringify(action.dataLogin))

      // }
     

      state.userLogin = action.dataLogin;
      return { ...state };
    }
    case "OUT_USER": {
      state.userLogin=null;
      localStorage.removeItem("user");
      localStorage.removeItem("detail-user");

      return { ...state };
    }
    case  "CHECK_LOGIN_BOOKING":{
          state.scheduleCode = action.scheduleCode;
         
          if(localStorage.getItem('user')) {
            state.targetPage = "_blank";


          }else     state.targetPage= "_self";
            

          
          return {...state}
    }
    case "CHECK_DETAIL_MOVIE_BOOKING":{
      
        state.status = action.status;
         state.maPhim = action.maPhim;
         state.room = action.room;
         return {...state}
    }
    case TyAction.GET_DATA_REGISTER:{
        let {formRegister} = action;
      let newFormRegister = {...state.formRegister,formRegister};
        return {...state,formRegister:newFormRegister}
    }
    case "RESTART__ALL":{
      state.status = "home";
      state.scheduleCode = null;
      state.targetPage = null;
      state.room = null;
      state.maPhim=null;
      return {...state}
    }
    case "RESTART__MOVIE":{
      state.status = "home";
      state.targetPage = null;
      return {...state}    }


    
    default:
      return { ...state };
  }
};
export default UserReducer;
