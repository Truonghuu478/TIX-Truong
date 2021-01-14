

import React, { useState, useEffect, Fragment } from "react";
import * as Action from "../../../Redux/action/moive";
import Header from "../../Page/Header";
import NewIn from "../../Layout/home/Newin";
import ShowIn from "../../Layout/home/ShowIn";
import About from "../../Layout/home/about";
import News from "../../Layout/home/News";
import Carousel from "../../Layout/home/Carousel";
import Footer from "../../Page/Footer";
import { connect } from "react-redux";
import FastTicket from "../../Layout/home/fastTicket/FastTicket";
import Pack from "../../Layout/home/pack";
// import {useLocation} from "react-router-dom";
import TiXLoading from "../../Layout/Loading";

function Home(props) {
  const [loading, setLoading] = useState(true);
  // const location = useLocation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const screenWidth = React.useMemo(() => window.innerWidth, [
    window.innerWidth,
  ]);

  useEffect(() => {
    let GetMovieFist = async () => {
      try {
        const result = await fetch(
          `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${props.maHeThongRap}&maNhom=GP01`
        );

        const json = await result.json();
        props.handleGetMovieFist(
          // eslint-disable-next-line array-callback-return
          json[0].lstCumRap.find((cinemaFist, index) => {
            if (index === 0) return cinemaFist;
          })
        );
      } catch (error) {
        console.log(error);
      }
    };
    GetMovieFist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    let a = null;
    props.getHostAPIMovieTheater(0);
    if (props.listMovieTheater) {
      a = setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
    window.scrollTo({ top: "500px", behavior: "smooth" });
    return () => clearTimeout(a);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        <div className="sweet-loading">
          <Header />
          <TiXLoading />
        </div>
      ) : (
        <Fragment>
          <Header />

          <Carousel />
          <FastTicket />
          <NewIn loading={loading} />
          {screenWidth > 1024 && <Pack />}
          <ShowIn />
          <Pack />
          <News />
          <About />
          <Footer />
        </Fragment>
      )}
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    listMovieTheater: state.MovieManaGerment.listMovieTheater,
    cinemaMovies: state.MovieManaGerment.cinemaMovies,
    maHeThongRap: state.MovieManaGerment.maHeThongRap,
  };
};
const mapDisPatchToProps = (dispatch) => {
  return {
    getHostAPIMovieTheater: (index) => {
      dispatch(Action.getHostAPIMovieTheater(index));
    },
    handleGetMovieFist: (data) => {
      const action = {
        type: "GET_FIST_MOVIE",
        data: data,
      };
      dispatch(action);
    },
  };
};
export default connect(mapStateToProps, mapDisPatchToProps)(Home);
