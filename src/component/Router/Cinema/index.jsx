import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import * as action from "../../../Redux/action/moive";
import MovieSection from "./Movie_Section";
import Container from "@material-ui/core/Container";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import MovieTop from "./danhgia";
import PropTypes from "prop-types";
import ModalTrailer from "../../screen/modal-video";
import Footer from "../../Page/Footer";
import TiXLoading from "../../Layout/Loading";

// header 
import Header from "../../Page/Header";
// star 
import BackToTop from "../../mixin/backtotop/backtotop";
DetailMovie.propTypes = {
  infoMovie: PropTypes.object,
};
DetailMovie.defaultProps = {
  infoMovie: {},
};

const useStyles = makeStyles((theme) => ({
  btn_check: {
    color: "white",
    backgroundColor: "#fb4226",
    fontWeight: "bold",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#fb4226",
      color: "white",
    },
    "&:focus": {
      outline: "none",
    },
  },
  loaddingStyle: {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  },
  play: {
    // fontSize:"1.4rem",
    // border: "2px solid white",
    // borderRadius: "50%",
    width: "75px",
    height: "75px",
    // fontSize: "14px",
    // background: "transparent",
    // transform: "scale(1)",
    // transition: "all .4s",
    // transitionDuration: ".2s",
    // "&:hover": {
    //   transform: " scale(0.8)",
    // },
  },
  banner16:{
    backgroundColor: "#fb4226",

},bannerP:{
  backgroundColor: "#00ac4d",
},
}));
function DetailMovie(props) {
  const classes = useStyles();
  // const [loading, setLoading] = useState(true);
  const [sultModal, setSultModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [trailer, setTrailer] = useState("");
  

  // check width  
  let screenWidth = React.useMemo(()=>window.innerWidth)
  useEffect(() => {
 window.scroll({
      top: 0,
  left: 0,
  behavior: 'smooth'
    })

 let setCLear=   setTimeout(() => {
      if (props.infoMovie) setLoading(false);

    }, 2000);
  
         return () => clearTimeout(setCLear)
  }, []);
  // get id movie
  useEffect(() => {
    const id = props.match.params.id;
    props.getDetailMovieToCode(id);
  }, []);
  // handleTrailer
  const _handleSetTrailer = (trailer) => {
    setSultModal(true);
    setTrailer(trailer);
  };
  // get api codemovieTotheater
  useEffect(() => {
    const id = props.match.params.id;

    props.GetAPIDetailMovieToTheater(id);
  }, []);
  const _renderMovie = React.useCallback( () => {
    // if (props.infoMovie) {
    let movie = props.infoMovie || {};

    let day = new Date(movie.ngayKhoiChieu);
    let setDay = day.getDay();
    let month = day.getMonth();
    let year = day.getFullYear();

    if (movie) {
      return (
        <div className="Section__movie  ">
          <img
            src={movie.hinhAnh}
            className="Section__movie--bg"
            alt={`background-phim ${movie.tenPhim}`}
            onError={(e)=>{e.target.onerror = null; e.target.src="\img/default-film.webp"}} 
          />
          {screenWidth < 768 && <div
                    onClick={() => {
                      _handleSetTrailer(movie.trailer);
                    }}
                    className="DetailMovie__mobile--overPlay"
                  >
                    <img style={{width:75,height:75}} src="https://tix.vn/app/assets/img/icons/play-video.png" 
                    />
                  </div>}
          <div className="over-dark"></div>
          {/* start info movie  */}
          { screenWidth > 768 ? <div className="Section__movie--DetailMovie">
            <Container maxWidth="lg">
              <div className="DetailMovie__Section row ">
                <div className="p-0 col-md-3   ">
                  <div className="DetailMovie__Section__card">
                    
                  <img src={movie.hinhAnh} alt={`image-${movie.tenPhim}`} />
                  <div
                    onClick={() => {
                      _handleSetTrailer(movie.trailer);
                    }}
                    className="DetailMovie__Section__card--overPlay"
                  >
                    <img style={{width:75,height:75}} src="https://tix.vn/app/assets/img/icons/play-video.png" 
                    />
                  </div>
                  </div>
                </div>
                <div className=" col-md-4">
                  <div className="DetailMovie__Section--detail">
                    <p className="mb-0 setTime">
                      {setDay < 10 ? "0" + setDay : setDay}.
                      {month < 10 ? "0" + month : month}.{year}
                    </p>
                   {
                    <p className="DetailMovie__Section--detail--nameMovie ">
                      <span 
                      className={`setRoom ${props.room  ===1 ? classes.banner16 : classes.bannerP}`}>
                        {props.room === 1? "C16" :"P"}</span>
                      <span className="setNameMovie">{movie.tenPhim}</span>
                    </p>}

                    <p className="setinfoPhim">
                      100 phút - 0 IMDb - 2D/Digital
                    </p>
                    <Button
                      onClick={()=>{
                         window.scrollTo({top: 500,behavior: 'smooth'});
                      }}
                      className={classes.btn_check}
                      variant="contained"
                    >
                      Mua Vé
                    </Button>
                  </div>
                </div>
                <MovieTop danhGia={movie.danhGia} />
              </div>
            </Container>
          </div> :  <div className="DetailMovie__mobile">
                    <p className="mb-0 setTime">
                      {setDay < 10 ? "0" + setDay : setDay}.
                      {month < 10 ? "0" + month : month}.{year}
                    </p>
                   {
                    <p className="DetailMovie__mobile--nameMovie ">
                      
                      <span className="setNameMovie">{movie.tenPhim}({props.room === 1? "C16" :"P"})</span>
                    </p>}

                    <p className="setinfoPhim">
                      100 phút - 0 IMDb - 2D/Digital
                    </p>
                    {/* <Button
                      onClick={()=>{
                         window.scrollTo({top: 500,behavior: 'smooth'});
                      }}
                      className={classes.btn_check}
                      variant="contained"
                    >
                      Mua Vé
                    </Button> */}
                  </div>}


        {/* end info movie  */}
       
        </div>
      );
    }
    // }
  },[props.infoMovie]);
  const _renderHTML = React.useCallback( () => {
    return (
      <Fragment>
        {loading ? (
          <>
                <Header/>
          <TiXLoading  />
          </>
        ) : (
          <div id="detail-movie">
            <Header/>
            <div  className="Section">
              {/* <div className="over-play"></div> */}
              {_renderMovie()}
              <MovieSection  screenWidth={screenWidth}  />
              <ModalTrailer
                onHide={() => {
                  setSultModal(false);
                }}
                trailer={trailer}
                show={sultModal}
              />
            </div>
            <Footer/>
            <BackToTop/>
          </div>
        )}
      </Fragment>
    );
  });
  return <>
  
  {_renderHTML()}</>;
}
const mapStateToProps = (state) => {
  return {
    infoMovie: state.MovieManaGerment.infoMovie,
    room :state.UserReducer.room
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getDetailMovieToCode: (id) => {
      dispatch(action.getDetailMovieToCode(id));
    },

    GetAPIDetailMovieToTheater: (id) => {
      dispatch(action.GetAPIDetailMovieToTheater(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailMovie);





