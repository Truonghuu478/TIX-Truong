import { combineReducers } from "redux";
import MovieManaGerment from "./movie";
import UserReducer from "./User";
import BookingReducer from "./TicketBooking";
import LoadingReducer from "./isLoading";
import AdminReducer from "./admin";

const RootReducer = combineReducers({ MovieManaGerment, UserReducer ,BookingReducer,LoadingReducer,AdminReducer});

export default RootReducer;
