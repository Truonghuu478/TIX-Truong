import React, { useEffect } from "react";
import PropTypes from "prop-types";
// import * as action from "../../../../../Redux/action/moive";
// import Box from "@material-ui/core/Box";
import { connect } from "react-redux";
import MovieShowin from "../movie";




// import movie from "../movie";
TAbShowTime.propTypes = {
  maHeThongRap: PropTypes.string,
};
TAbShowTime.defaultProps = {
  maHeThongRap: null,
};

function TAbShowTime(props) {
  let {toDay,cinemaMovies} = props;
// useEffect(() => {
//   props.getHostAPIMovieTheater(props.maHeThongRap,0);
//   console.log();
// }, [props.maHeThongRap])
  //renderShowin
  const renderShowin = () => {
    let arrMovie = [];
    let arrMovieFist = [];
    if (props.lstPhim) {
      props.lstPhim.forEach(cinema => {
        if (
          cinema.lstLichChieuTheoPhim.findIndex(
            times => times.ngayChieuGioChieu.slice(0, 10) === toDay
          ) > -1
        ) {
          arrMovie.push(cinema);
        }
      });
    }
    if (cinemaMovies[props.maHeThongRap]) {

          
      let arr= cinemaMovies[props.maHeThongRap][0].lstCumRap[0].danhSachPhim;
      arr.forEach(cinema=> {
        if ( cinema.lstLichChieuTheoPhim.findIndex( times =>
           times.ngayChieuGioChieu.slice(0, 10) === toDay
          ) > -1
        ) {
          arrMovieFist.push(cinema);
        }
      });
    }

    return <MovieShowin dataMovieFist={arrMovieFist} movieToDay={arrMovie} />;
  };
  return <>{renderShowin()}</>;
}
const mapStateToProps = (state) => {
  return {
    // cinemaMovies : state.MovieManaGerment.cinemaMovies,
    lstPhim: state.MovieManaGerment.lstPhim,
    lstPhimFist :state.MovieManaGerment.lstPhimFist,
    toDay : state.MovieManaGerment.toDay,
    maHeThongRap : state.MovieManaGerment.maHeThongRap,
    cinemaMovies : state.MovieManaGerment.cinemaMovies,
  };
};
// const mapDispatchToProps = (dispatch)=>{ 
//   return {
//     getHostAPIMovieTheater :(id,index)=>{
//       dispatch(action.getAPISyStemTheaterClusters(id,index))
//     }
//   }
// }


export default connect(mapStateToProps, null)(TAbShowTime);
