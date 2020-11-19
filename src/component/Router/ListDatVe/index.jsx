import React, { useEffect, useState } from 'react'
import StepTicket from "../../Layout/booking/showStep";
//step 2 
import ShowChair from "../../Layout/booking/showChair";
import CountTicket from "../../Layout/booking/countTicket";
//step 1
import BackHome from "../../Layout/booking/backHome";
import StartBooking from "../../Layout/booking/startBooking";
// step 3 
import ShowTicket from "../../Layout/booking/showTicket";
//modal 
import { connect } from 'react-redux';
import *as ActionMovie from "../.././../Redux/action/moive";
import *as ActionBooking from "../../../Redux/action/bookingAction";

import TiXLoading from "../../Layout/Loading";
// mobile 
import BookingMobile from "../../screen/mobie/BookingMobile"
function BookingTicket(props) {
  const [loading, setLoading] = useState(true);
  const {listTicketRoom} = props;
  const {thongTinPhim} = props;
  let screenWidth = React.useMemo(()=>window.innerWidth)
  // stop timeout  
  useEffect(() => {

    let params = props.match.params.id;
    props.__creatShowtime(params);
    try {

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.log(err);

    }
  }, [])

 
   
  useEffect(() => {
    props.getHostAPIMovieTheater();
  }, [])
  const __renderBookingStep =React.useCallback( () => {
    switch (props.step) {
      case 1: {

        return <div className="booking__content row">

          <BackHome />

  <div className="col-lg-8 col-xl-9 col-md-9">

          <StartBooking />
  </div>
        </div>
      }

      case 2: {
        return <div className="booking__content row">
          <BackHome />
          <div className="col-lg-7 col-xl-7 col-md-7">
            <ShowChair  />

          </div>
          <div   className="col-lg-4 col-xl-4 col-md-4 ">
            <CountTicket  />

          </div>

          
        </div>
      }
      case 3:{
        return <div   className="booking__content row ">
          <ShowTicket/>
        </div>
      }
      default:
        break;
    }
  },[props.step])

  return (
    loading ? <div className="sweet-loading">
      <TiXLoading />

    </div> : <div className="booking">
        {screenWidth > 768 ?<div className={"container-fluid"}>
        <StepTicket />
        {__renderBookingStep()}
        </div> : <BookingMobile listTicketRoom={listTicketRoom} />
        }
      </div>
  )
}
const mapStateToProps = (state) => {
  return {
    listTicketRoom: state.BookingReducer.listTicketRoom,
    step: state.BookingReducer.step
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getHostAPIMovieTheater: () => {
      dispatch(ActionMovie.getHostAPIMovieTheater())
    },
    __creatShowtime: (id) => {
      dispatch(ActionBooking.CreateShowTimeAction(id))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(BookingTicket);