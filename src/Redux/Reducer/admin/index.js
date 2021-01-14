import * as tyAction from "../../constanst";
let initialState = {
  globalSearch: "",
  statusAdmin: null,
  listUsers: [],
  indexSpinner: false,
  listMovies: [],
};

const AdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case tyAction.POST_VALUE_SEARCH: {
      let { listUsers, defaultListUser, listMovies, defaultListMovie } = state;
      let { payload, statusAdmin } = action;


      switch (statusAdmin) {
        case "/admin/user": {
          let newRows = [];
          if (payload) {
            const postArray = listUsers.length > 0 ? listUsers : defaultListUser;

            newRows = postArray.filter(
              (item) =>
                item.taiKhoan
                  .toLowerCase()
                  .indexOf(payload.toLowerCase()) > -1 ||
                item.hoTen.toLowerCase().indexOf(payload.toLowerCase()) >
                -1
            );

          }
          // let ;

          return { ...state, globalSearch: payload, listUsers: newRows };
        }
        case "/admin/movie-theater": {
          let newMovie = [];
          if (payload) {
            const postMovie = listMovies.length > 0 ? listMovies : defaultListMovie;
            newMovie = postMovie.filter(movie =>
              movie.tenPhim.toLowerCase().indexOf(payload.toLowerCase()) > -1 || movie.moTa.toLowerCase().indexOf(payload.toLowerCase()) > -1)


          }
          return { ...state, globalSearch: payload, listMovies: newMovie }

        }


        default: return { ...state, globalSearch: payload };
      }
    }
    case tyAction.GET_LIST_USERS: {




      return { ...state, listUsers: action.payload, defaultListUser: action.payload };
    }
    case tyAction.CHANGE_STATUS_LOCATION: {
      return { ...state, statusAdmin: action.payload }
    }
    case tyAction.CHANGE_STATUS_USERS: {
      return { ...state, listUsers: action.payload, defaultListUser: action.payload };
    }
    case tyAction.CHANGE_STATUS_INDEX: {
      return { ...state, indexSpinner: action.statusIndex };
    }
    case tyAction.GET_LIST_MOVIES: {
      return { ...state, listMovies: action.payload, defaultListUser: action.payload };
    }
    case tyAction.CHANGE_STATUS_MOVIES: {


      return { ...state, listMovies: action.payload, defaultListMovie: action.payload };
    }
    default:
      return { ...state };
  }
};
export default AdminReducer;
