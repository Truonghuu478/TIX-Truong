import * as tyAction from "../../constanst";

const initialMovie = {
  listMovieTheater: [],
  cinemaMovies: [],
  listMovieOnSystemTheater: null,
  maHeThongRap: "BHDStar",
  detailCinemaToTheater: {},
  lstPhim: [],
  lstPhimFist: null,
  infoMovie: {},
  chonTheoNgayChieu: "2019-01-01",
  maNhom: "GP01",
  indexHome: 0,

  toDay: "2019-01-01",

  listUser: [
    // {
    // name: "Thúy Hằng",
    // hinhAnh: "/img/avatar/hang.jpg",
    // activeTimes: "1 giờ trước",
    // text: "Phim này hay quá, đợi phần 2  ",
    // appendHeart: 3,
    // evaluate: 5,
    // like: 3,
    // activeLike: false,
    // status: 0, //0 :face,   1:normal,
    // id: "hang-01",}
    // ,
    {
      name: "Tân",
      hinhAnh: "/img/avatar/tan.jpg",
      activeTimes: "20 phút trước",
      text: "Phim này có phần 2 không nhỉ ",
      appendHeart: 0,
      evaluate: 4.5,
      like: 1,
      activeLike: false,
      status: 0, //0 :face,   1:normal,
      id: "tan-01",
    },
    {
      name: "Mẫn",
      hinhAnh: "/img/avatar/man.jpg",
      activeTimes: "3 phút trước",
      text: "Trường đẹp trai quá, yêu quá đi ",
      appendHeart: 1,
      evaluate: 4.5,
      like: 4,
      activeLike: false,
      status: 0, //0 :face,   1:normal,
      id: "man-01",
    },
    // {
    //   name: "Yến Như",
    //   hinhAnh: "/img/avatar/nhu.jpg",
    //   activeTimes: "1 phút trước",
    //   text: "Hẹn trường một buổi chiều mưa phùn  ",
    //   appendHeart: 2,
    //   evaluate: 5,
    //   like: 0,
    //   activeLike: false,
    //   status: 0, //0 :face,   1:normal,
    //   id: "nhu-01",
    // }
  ],
};
const MovieManaGerment = (state = initialMovie, action) => {
  switch (action.type) {
    case tyAction.GETAPIMOVIETHEATER: {
      let listMovieTheater = [...state.listMovieTheater];
      listMovieTheater = action.listMovieTheater;
      state.indexHome = action.index;

      return { ...state, listMovieTheater };
    }
    case tyAction.getAPISYSTEMThEATERCLUSTERS: {
      let cinemaMovies = [...state.cinemaMovies];
      cinemaMovies[action.maHeThongRap] = action.systemTheater;
      state.maHeThongRap = action.maHeThongRap;
      state.indexHome = action.index;

      return { ...state, cinemaMovies };
    }
    case tyAction.GET_API_SYSTEM_MOVIE_SHOW: {
      return { ...state, cinemaMoviesShow: action.lstShowMovie };
    }
    case "GET_LIST_MOVIE": {
      state.lstPhim = action.data.danhSachPhim;
      state.indexHome = action.index;
      return { ...state };
    }
    case "GET_FIST_MOVIE": {
      state.lstPhimFist = action.data.danhSachPhim;

      return { ...state };
    }
    case tyAction.GETAPIDETAILMOVIE: {
      state.infoMovie = action.infoMovie;
      return { ...state };
    }
    case tyAction.GET_DETAIL_MOVIE_TO_THEATER: {
      return { ...state, detailCinemaToTheater: action.detailCinemaToTheater };
    }
    case tyAction.FETCH_ALL_LIST_SYSTEM_THEATER: {
      return {
        ...state,
        listMovieOnSystemTheater: action.listMovieOnSystemTheater,
      };
    }
    case tyAction.GETPICKBYDAYMOVIE: {
      state.chonTheoNgayChieu = action.PickByDay;
      state.maHeThongRap = "BHDStar";
      state.indexHome = 0;
      return { ...state };
    }
    case "ADD_LIST_USER": {
      let newListUser = [...state.listUser, action.data];
      return { ...state, listUser: newListUser };
    }
    case "EDIT_LIKE_USER": {
      return { ...state, listUser: action.data };
    }
    case "RESTART__ALL": {
      state.listMovieTheater = [];
      state.cinemaMovies = [];
      state.listMovieOnSystemTheater = null;
      state.maHeThongRap = "BHDStar";
      state.detailCinemaToTheater = null;
      state.lstPhim = [];
      state.lstPhimFist = null;
      state.infoMovie = {};
      state.chonTheoNgayChieu = "2019-01-01";
      state.indexHome = 0;

      return { ...state };
    }
    case "RESTART__MOVIE": {
      return { ...state };
    }
    case tyAction.FETCH_LIST_DETAIL_THEATER: {
      return { ...state, detailCinemaToTheater: action.detailTheaters };
    }
    default: {
      return { ...state };
    }
  }
};
export default MovieManaGerment;
