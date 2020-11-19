import React,{useCallback} from 'react'
import {useSelector} from "react-redux"
import {Box, Typography } from "@material-ui/core"
import  StartBooking from "../../../Layout/booking/startBooking";
import ShowStepMobile from "../showStep";
import ShowChair from "../../../Layout/booking/showChair";
import dataName from "../../../../json/nameMovie.json";
import CountTicket from "../../../Layout/booking/countTicket";
import ShowTicket from "../../../Layout/booking/showTicket";
// css  styles
import useStyles from "./style";
export default function BookingMobile(props) {

    const classes = useStyles();
    const  {listTicketRoom,step}  = useSelector(state => state.BookingReducer);

     const  {room  } = useSelector(state => state.UserReducer);
    // const {thongTinPhim } = listTicketRoom;
    const renderStepComponent = ()=>{
        switch (step) {
            case 1:
                       
                   return renderStepOne()
            
                
                
            case 2:
                return (
                    <><ShowChair/>
                    <CountTicket/> </>
                )
            ;
            default:

                return <ShowTicket/>
            
                
        }
    }

    // renderStepOne  

    const renderStepOne =useCallback(
        ()=>{
            if(listTicketRoom){
                const {thongTinPhim} = listTicketRoom;
                let attackChar = thongTinPhim.tenCumRap.split(` `, 1);
                let lastChar = thongTinPhim.tenCumRap.split("-");
                let clusterName = dataName.find(item => item.name === attackChar[0]);
                return (
                    <>
                    <Box
                    className={classes.booking__fist}
                     
                     component="div" p={0}  >

                    <img className={classes.urlImg} 
                    src={listTicketRoom.thongTinPhim.hinhAnh} alt=""/>
                        <Box className={classes.dark} component="div"></Box>
                    </Box>
                    <Box className={classes.booking__content} component="div">
                    <Typography className={classes.text} component="p">
                    
                    <span style={{ color: `${clusterName.color}` }}>{clusterName.name}</span> - {lastChar[1] === " CGV Saigonres Nguyễn Xí"?lastChar[1].split(" ").map((char,index)=>index !== 1 ? char + " ":null):lastChar[1]}
                        </Typography>
                        
                        <Typography className={classes.text} component="p">
                            <span
                             style={{color:"#fff",fontSize:15,
                             width:34,
                             hight:34,
                             background:room === 16 ? "#fb4226" : "#00ac4d",
                             borderRadius:4,
                             padding :"3px 10px",
                             marginRight: 8,
                             textAlign:"center",
                            
                             height: 34

                            }}
                             >{room}</span>
                            {thongTinPhim.tenPhim}
                        </Typography>
                        <Typography className={classes.text} component="p">
                            {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu} - {thongTinPhim.tenRap}
                        </Typography>
                        
                    </Box>  
                    <StartBooking/>
                    </>
                    
                )
            }
            
        },[step === 1 ,listTicketRoom]
    )
    return (
        <>
            <ShowStepMobile step={step}/>
                <Box  className="booking__content" >
                    {renderStepComponent()}
                    
                </Box>
        </>
    )


    
}

