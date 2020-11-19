import React,{ useState,useEffect} from 'react';
import {useSelector } from "react-redux";

export default function useCountDay(props) {
        const {listTicketRoom }= useSelector(state => state.BookingReducer);
        const [day,setDay] = useState()
     const getDayBooking = () =>{
         let day1 = new Date(listTicketRoom.thongTinPhim.ngayChieu) ;
            setDay(`${day1}`.split(" ")[0])
        
                return day;
     }

    return [getDayBooking]
}
