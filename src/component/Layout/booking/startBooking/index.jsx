
import React,{useState} from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import *as action from "../../../../Redux/action/bookingAction";
// import data from "../../ShowIn/json/maHeThongRap.json";
import nameMovie from "../../../../json/nameMovie.json";
import {useSelector} from "react-redux";


import {makeStyles} from "@material-ui/styles"

const styles = makeStyles({
  disabled:{
    cursor: "no",
    background:"gray",
  },
  notDisabled :{
    cursor: "pointer",
    background: "linear-gradient(223deg, #b4ec51 0, #429321 100%)",
    "& img":{
        width:70
    }
  }
})
function StartBooking(props) {
    const classes = styles();
        let {stt,sttNormal,sttVip} = props;
    let valid = stt !== 0?true:false;
    let [loading,setLoading] =  useState(false);
        const screenWidth = React.useMemo(()=>window.innerWidth)
    const handleCheckChooseChair = ()=>{
        setLoading(true);
        setTimeout(() => {
            if(valid){
                props.changeStyleStepOne(2);
                setLoading(false);

            }
        }, 1500);
            
        
    }
    const __renderTheater = React.useCallback(() => {
        if (props.listTicketRoom) {
            const { thongTinPhim } = props.listTicketRoom;
            let newNameTheater = thongTinPhim.tenCumRap.split(" ")[0];
            let nameTheater;
            props.listMovieTheater.forEach(theater => {
                if (newNameTheater === "GLX") {
                    let GLX = "Galaxy Cinema";
                    if (theater.tenHeThongRap.split(" ")[0].toLowerCase() === GLX.split(" ")[0].toLowerCase()) {
                        nameTheater = theater;
                       
                    }
                } else if (theater.tenHeThongRap.split(" ")[0].toLowerCase() === newNameTheater.toLowerCase()){
                    nameTheater = theater;

                }else if ( newNameTheater === "CNS"){
                     let CNS ="CineStar";
                     if (theater.tenHeThongRap.split(" ")[0].toLowerCase() === CNS.split(" ")[0].toLowerCase()) {
                        nameTheater = theater;
                       
                    }
                   
                
                }
            });
            
            let newTenCumRap = nameMovie.find(movie => movie.name === thongTinPhim.tenCumRap.split(" ")[0]);
           
            return (
                < >
                    <div className="theaterInfo__logo">
                        <img src={nameTheater.logo} alt={`logo - ${nameTheater.maHeThongRap}`} />
                    </div>
                    <div className="theaterInfo__text">
                        <p>
                            <span style={{ color: `${newTenCumRap.color}` }}
                            >{newTenCumRap.name}</span>
                            -
                            {thongTinPhim.tenCumRap.split("-")[1]}
                        </p>
                        <span>{thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu} - {thongTinPhim.tenRap}</span>

                    </div>

                </>
            )
        }
    },[props.listTicketRoom])
    
    const __renderChoose =React.useCallback( (nameVe,toTal,sttChair) => {
        let { stt } = props;
        return (
            <>
                <div className="theaterChoose__person">
                    <p>{nameVe} </p>
                  
                </div>
                <div className="theaterChoose__count">{toTal} đ</div>
                <div className="theaterChoose__change">
                    <i style={{ color:sttChair === 0 ? "gray":"red" ,cursor :sttChair === 0 ?null:"pointer"}} onClick={() => {
                        props.handleChangeCount(nameVe,false)

                    }} className="fa fa-minus"></i>
                    <p>{sttChair}</p>
                    <i style={{ color:sttChair >= 12 ? "gray":"red" ,cursor :sttChair >= 12 ?null:"pointer"}} onClick={() => {
                        props.handleChangeCount(nameVe,true)

                    }} className="fa fa-plus"></i>
                </div>
            </>
        )
    })
    const __renderTotal = React.useCallback( () => {
        return (
            <>
                <div className="theaterTotal__to">
                    <p>TỔNG TIỀN</p>
                    <span> {props.totalChair.toLocaleString("fn")}đ</span>
                </div>
                <button disabled={!valid} 
                className={valid?classes.notDisabled+" theaterTotal__last" :
                classes.disabled +" theaterTotal__last"}
                 onClick={handleCheckChooseChair}>
                   { !loading && "CHỌN GHẾ"}
                   {loading &&  <img src="\img/loading/loading.gif" alt="loading"/>}

                </button>
               
            </>
        )
    })
    return (
        <div className="startBooking">
            <div className="startBooking__content">
                {screenWidth  > 768 && <div className="theaterInfo">
                    {__renderTheater()}
                </div>}
                <div className="theaterChoose">
                    {__renderChoose("Vé vip","90,000",sttVip)}
                </div>
                <div className="theaterChoose">
                    {__renderChoose("Vé thường","75,000",sttNormal)}
                </div>
                
                <div className="theaterTotal">
                    {__renderTotal()}
                </div>
                <span className="theater__danger">Xin lưu ý, bạn không thể hủy hoặc thay đổi suất chiếu cho vé đã mua.</span>
                <div className="theater__call">


                    <div className="theater__call--hotline"><p>
                        HOTLINE
                    </p>

                        <span>
                            Phí cuộc gọi 1000VND/phút
                    </span>
                    </div>
                    <h2>1900 545 436</h2>

                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {

        listTicketRoom: state.BookingReducer.listTicketRoom,
        listMovieTheater: state.MovieManaGerment.listMovieTheater,
        totalChair: state.BookingReducer.totalChair,
        stt: state.BookingReducer.stt,
       sttNormal  :state.BookingReducer.sttNormal,
       sttVip :state.BookingReducer.sttVip
    }

}

const mapDispatchToProps = dispatch => {
    return {
        handleChangeCount: (nameVe,result) => {
            dispatch(action.handleChangeCount(nameVe,result))
        },
       changeStyleStepOne:(i)=>{
            dispatch(action.changeStyleStep(i))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartBooking);