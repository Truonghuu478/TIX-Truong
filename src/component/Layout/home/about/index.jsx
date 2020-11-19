import React  from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import red from "@material-ui/core/colors/red";
import data from "./dataSlide.json";

// swiper 

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {  Scrollbar ,Autoplay} from 'swiper';


// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
// end swiper 

// router 
import {Link} from "react-router-dom"
// install Swiper components


import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
// import PropTypes from 'prop-types';
SwiperCore.use([ Scrollbar,Autoplay]);
// index.propTypes = {

// };

const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: red[500],
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#11cb5f",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    // textAlign: "center",
    color: theme.palette.text.secondary,
    background: "transparent !important",
    color: "white",
    width: "100%",

    height:"100%"
  },
  titleOne: {
    fontWeight: "bold",
  },
  titleTwo: {
    fontSize: "16px",
    marginTop: "47px",
  },
  btnDownload: {
    //   background:"#f84337",
    fontWeight: "bold",
    color: "white",
    textTransform: "none",
    fontSize: "19px",
    marginBottom: "20px",
    "&:focus": {
      outline: "none",
    },
  },
  slideItem:{
    '& img':{
      width:"100%",
      height:"100%",
      objectFit:"cover"
      }
    
  },
  swiperItem:{
    width:"100%"
  }
}));

function About(props) {
  let classes = useStyles();
  return (
    <div id="ungDung" className="about">
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item sm={12} xs={12} md={6} lg={6}>
            <Paper className={classes.paper}>
              <h2 className={classes.titleOne} >
                Ứng dụng tiện lợi dành cho người yêu điện ảnh
              </h2>
              <p className={classes.titleTwo}>
                Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp
                và đổi quà hấp dẫn.
              </p>
              <ThemeProvider theme={theme}>
                <a target="_blank" href="https://apps.apple.com/us/app/123phim-mua-ve-lien-tay-chon/id615186197">
              
                  <Button
                    className={classes.btnDownload}
                    variant="contained"
                    color="primary"
                  >
                    App miễn phí - Tải về ngay!
                  </Button>
                </a>
              </ThemeProvider>

              <p>
                TIX có hai phiên bản
                <a className="text-danger font-weight-bold" href="#">
                
                  iOS
                </a>
                
                <a className="text-success font-weight-bold" href="#">
                
                  Android
                </a>
              </p>
            </Paper>
          </Grid>
          <Grid item sm={12} xs={12} md={6} lg={6}>
            <Paper className={classes.paper}>
                <div className="right">
                  
                   <div className="about__right">

                  
                   <div className="about__right--phone">
                     <img
                            src="https://tix.vn/app/assets/img/icons/mobile.png"
                            alt="mobile"
                        />
                        </div>
                
                            <Swiper
                              loop={true}
                              effect="slide"
                              speed={1000}
                              autoplay={{
                                  delay: 2500,
                                  
                                  disableOnInteraction: false
                              }}
                              spaceBetween={0}
                              slidesPerView={1}
                             className="about__right--slider"  >
                            {data.map((item,index) => {
                              return <SwiperSlide key={index}>

                                 <img  src={item.image} alt={`slide`}
                                  alt={`slide-app${index+1}`} />;
                              </SwiperSlide>
                                })}
                                
                            </Swiper>
                        
                   </div>
                </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default About;
