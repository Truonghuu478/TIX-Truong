import React from 'react'
// import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';
import {useDispatch,useSelector } from "react-redux";
import {Box,Card,CardMedia,CardContent,CardHeader,Grid,Typography} from "@material-ui/core";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import nameMovie from "../../../../json/nameMovie.json";
import {useStyles} from "./style";
import classNames  from "classnames";
function ShowTicket(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const  {listTicketRoom }  = useSelector(state => state.BookingReducer);
    const {listMovieTheater } = useSelector(state=>state.MovieManaGerment);
    const { thongTinPhim } = listTicketRoom || {};
    const screenWidth = React.useMemo(()=>window.innerWidth)

   
    const __renderTheater = React.useCallback(() => {
        if (listTicketRoom) {
                    
            let newNameTheater = thongTinPhim.tenCumRap.split(" ")[0];
            let nameTheater;
            listMovieTheater.forEach(theater => {
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
                < Card style={{height:screenWidth <768 ? 400 :500,
                    maxWidth:screenWidth <768 ? 282 :345,
                    margin :"4% auto"}} className={classNames(classes.card) }> 

                    <CardHeader 
                            avatar={<img className={classes.cardHeaderImg} src={nameTheater.logo} />}
                            title={`${newTenCumRap.name }- ${thongTinPhim.tenCumRap.split("-")[1]}`}
                            subheader={`${thongTinPhim.gioChieu} - ${thongTinPhim.ngayChieu}`}

                                
                            
                    />
                    <CardMedia  className={classes.media}
                                image={thongTinPhim.hinhAnh}
                                title={`Hinh anh - ${thongTinPhim.tenPhim}`}
                    />
                    <CardContent >
                        <Typography component="p" className={classes.cardContentText}  component="p">
                        Chúc bạn xem phim vui vẻ <FavoriteIcon/>
                        </Typography>
                    </CardContent>
                    

                </Card>
            )
        }
    },[listTicketRoom])
    return (
        <div className="showTicket">
            <Grid container className={classes.root} spacing={0} >
            <Grid item lg={12} md={12} sm={12}>
                        <Link style={{position:screenWidth > 768 ? "absolute" : "fixed",top:screenWidth >768 ?30:null,left:screenWidth > 768 ?30:0,bottom:screenWidth < 768 ?0:null,width:screenWidth <768 ? "50%":null,background:screenWidth <768 ? "linear-gradient(223deg, rgb(133 136 127) 0px, rgb(59 61 58) 100%)":null,height:screenWidth <768 ? "100px":null,color:screenWidth <768 ? "#fff":null,lineHeight:screenWidth <768 ?"100px" :null,fontSize:screenWidth < 768 ?13 :null,textAlign:screenWidth <768 ? "center":null}}   className={classes.LinkBack} onClick={()=>dispatch({type:"RESTART_BOOKING"})} to="/">
                        {/* <h1 className={classes.textInfo}>Thông tin vé </h1> */}
                      {  screenWidth >768 && <KeyboardBackspaceIcon/>}
                        Trở về trang chủ</Link>

                    
                        {__renderTheater()}
                    <div  style={{position:screenWidth > 768 ? "absolute" : "fixed",top:screenWidth >768 ?30:null,right:screenWidth > 768 ?30:0,bottom:screenWidth < 768 ?0:null,width:screenWidth <768 ? "50%":null,background:screenWidth <768 ? "linear-gradient(223deg, rgb(133 136 127) 0px, rgb(59 61 58) 100%)":null,height:screenWidth <768 ? "100px":null,color:screenWidth <768 ? "#fff":null,lineHeight:screenWidth <768 ?"100px" :null,fontSize:screenWidth < 768 ?13 :null,textAlign:screenWidth <768 ? "center":null}} className={classes.LinkNext} onClick={()=>{
                        window.location.reload();
                        dispatch({type:"RESTART__S"})
                    }}>
                       Tiếp tục đặt vé 
                        {screenWidth >768 && <TrendingFlatIcon/>}
                    </div>
</Grid>
                {/* <Grid  item lg={6} md={6} sm={12}>
                        
                </Grid> */}

             

            </Grid>

            <Box component="div" className="over-play"></Box>
        </div>
    )
}

// showTicket.propTypes = {

// }

export default ShowTicket;

