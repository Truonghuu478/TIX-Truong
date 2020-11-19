import React from "react";
import { connect } from "react-redux";
// import PropTypes from 'prop-types';

// InfoMovieDes.propTypes = {

// };
import "./_InfoMovieDes.scss";
function InfoMovieDes(props) {
  let { infoMovie } = props;
  // console.log(infoMovie);
  let movie = infoMovie || null;
  let day = new Date(movie.ngayKhoiChieu);
  let setDay = day.getDay();
  let month = day.getMonth();
  let year = day.getFullYear();

  return (
    <div className="InfoMovie ">
      <div className="row">
        <div className="col-md-6">
          <div className="InfoMovie__item">
            <p className="" >Ngày khởi chiếu </p>
            <p className=" "  >
              {setDay < 10 ? "0" + setDay : setDay}.
              {month < 10 ? "0" + month : month}.{year}
            </p>
          </div>
          <div className=" InfoMovie__item ">
            <p className=""  >Tên phim</p>
            <p className="InfoPhim-item  ">{movie.tenPhim}</p>
          </div>
          <div className="InfoMovie__item ">
            <p className=""  >Bí danh</p>
            <p className="InfoPhim-item  ">{movie.biDanh}</p>
          </div>
          <div className="InfoMovie__item ">
            <p className=""  >Thể loại</p>
            <p className="InfoPhim-item  ">Phim hay</p>
          </div>
          <div className="InfoMovie__item ">
            <p className=""  >Định dạng</p>
            <p className="InfoPhim-item  ">2D/Digital</p>
          </div>
          <div className="InfoMovie__item">
            <p className="">Quốc gia</p>
            <p className="">Mỹ</p>
          </div>
        
         
        </div>
        <div className="col-md-6">
          <p>Nội dung </p>
          <p className="text-justify">{movie.moTa}</p>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    infoMovie: state.MovieManaGerment.infoMovie,
  };
};
export default connect(mapStateToProps, null)(InfoMovieDes);
