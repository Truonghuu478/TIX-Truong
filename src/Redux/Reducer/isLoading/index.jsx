
import * as TyAction from "../../constanst"
const initialState ={
    loading : true,

}


const LoadingReducer = (state = initialState, action) =>{
    switch(action.type){
        case TyAction.DISPLAY_LOADING_TRUE :{

                state.loading = true;

                return {...state}
        }
        case TyAction.DISPLAY_LOADING_FALSE :{
                state.loading = false;
            return {...state};
        }
        default : return {...state};
    }
    
}
 
export default LoadingReducer;