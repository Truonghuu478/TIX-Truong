import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function BackHome(props) {
  // const classes = styles();

  const __renderHTML = () => {
    if (props.listTicketRoom) {
      const { thongTinPhim } = props.listTicketRoom;
      return (
        <>
          <div className="backHome__bg">
            <img
              src={thongTinPhim.hinhAnh}
              alt={`phim - ${thongTinPhim.tenPhim}`}
            />
          </div>
          <div className="over-dark"></div>
          <Link
            onClick={props.handleRestart}
            style={{ opacity: props.step !== 1 ? 0 : 1 }}
            to=""
          >
            <div className="backHome__next">
              {/* <KeyboardBackspaceIcon /> */}
              {/* <img src="img/icon/prev_checkout.png" alt="icon-checkout" /> */}
              <i className="fa fa-long-arrow-alt-left"></i>
            </div>
          </Link>
          <div
            style={{ opacity: props.step !== 1 ? 0 : 1 }}
            className="backHome__detail"
          >
            <p>Hôm nay</p>
            <div className="backHome__detail__group">
              <button> C18</button>
              <p>{thongTinPhim.tenPhim}</p>
            </div>
            <span>95 phút - TIX - IMDb 0 - 2D/L.Tiếng</span>
          </div>
        </>
      );
    }
  };
  return (
    <div
      style={{ padding: props.step !== 1 ? "0 -15px" : " 0" }}
      className={
        props.step !== 1
          ? "  col-lg-1 col-xl-1 col-md-1 "
          : "col-lg-4 col-xl-3 col-md-3"
      }
    >
      <div
        style={{ width: props.step === 2 ? "40px" : "100%" }}
        className={" backHome"}
      >
        {__renderHTML()}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  listTicketRoom: state.BookingReducer.listTicketRoom,
  chooseChair: state.BookingReducer.chooseChair,
  step: state.BookingReducer.step,
});

const mapDispatchToProps = (dispatch) => {
  return {
    handleRestart: () => {
      dispatch({
        type: "RESTART__ALL",
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BackHome);
