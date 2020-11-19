import *as tyAction from "../../constanst";
let initialState ={
    globalSearch :'',
    statusAdmin :null,
    listUsers :[],
    indexSpinner :false,
    listMovies:[]

}

const AdminReducer = (state = initialState, action) =>{

    switch (action.type) {
        case tyAction.POST_VALUE_SEARCH:{
            
            if(state.statusAdmin !== action.statusAdmin){
                state.statusAdmin = action.statusAdmin
            }
            
       
            return {...state,globalSearch:action.payload}
        }
            case tyAction.GET_LIST_USERS:{
                    let {globalSearch} = state;
                    let newRows  = action.payload;
                    if(globalSearch){
                        newRows= newRows.filter(
                            (item) =>
                              item.taiKhoan.toLowerCase().indexOf(globalSearch.toLowerCase()) >
                                -1 ||
                              item.hoTen.toLowerCase().indexOf(globalSearch.toLowerCase()) > -1
                          )
                    }
                    if(state.indexSpinner){
                        state.indexSpinner = false;
                    }
                        
                return {...state,listUsers:newRows}
            }
            case tyAction.CHANGE_STATUS_USERS:{
                return {...state,listUsers:action.payload}

            }
            case tyAction.CHANGE_STATUS_INDEX:{
                    return {...state,indexSpinner:action.statusIndex}
            }
            case tyAction.GET_LIST_MOVIES:{
                return {...state,listMovies:action.payload}

            }
            case tyAction.CHANGE_STATUS_MOVIES:{
                let {globalSearch} = state;
                    let newRows  = action.payload;
                    if(globalSearch){
                        newRows= newRows.filter(
                            (item) =>
                            item.tenPhim.toLowerCase().indexOf(globalSearch.toLowerCase()) >
                            -1 ||
                          item.moTa.toLowerCase().indexOf(globalSearch.toLowerCase()) > -1
                          )
                    }
                    if(state.indexSpinner){
                        state.indexSpinner = false;
                    }
                        
                return {...state,listMovies:newRows}
            }
        default:
            return {...state};
    }
}
export default AdminReducer;