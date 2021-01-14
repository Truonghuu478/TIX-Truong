import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Grid } from "@material-ui/core";
import ModalTrailer from "../../../screen/modal-video";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";

import ArrDangChieu from "../../../../json/NewIns/dangChieuData.json";
import ArrSapChieu from "../../../../json/NewIns/sapChieuData.json";

// restar
import RenderStart from "../../../../vender/star.jsx";

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
// end swiper

// router
import { Link } from "react-router-dom";
// install Swiper components
import useStyles from "./NewinStyle";

import { useDispatch } from "react-redux";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

// overflow
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} component={"div"}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const urlPublic = process.env.PUBLIC_URL;
function NewIn(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [modalTrailer, setModalTrailer] = useState(false);
  //  const {groupMovie}  = useSelector(state=>state.MovieManaGerment)
  const [trailer, setTrailer] = useState("");
  const [dangChieuData, setDangChieuData] = useState([]);
  const [sapChieuData, setSapChieuData] = useState([]);

  let screenWidth = React.useMemo(
    () => window.innerWidth,
    //eslint-disable-next-line
    [window.innerWidth]
  );
  const dispatch = useDispatch();
  //handleGetTrailer
  const handleGetTrailer = (trailer) => {
    setModalTrailer(true);
    setTrailer(trailer);
  };

  //rendermovie

  //check login
  const handleCheckLogin = (maPhim, room) => {
    dispatch({
      type: "CHECK_DETAIL_MOVIE_BOOKING",
      status: "detail",
      maPhim,
      room,
    });
  };

  useEffect(() => {
    // const listMovie = async ()=>{
    //     try{

    //       const result = await fetch('../../../../json/NewIns/dangChieuData.json');
    //       const data = await result.json();
    //       setDangChieuData(data);
    //     }catch(error){
    //         console.log(error)
    //     }
    // }
    // listMovie();
    setDangChieuData(ArrDangChieu);
    setSapChieuData(ArrSapChieu);
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // render sap chieu
  const renderSlideDangChieu = (arraySetups = dangChieuData) => {
    if (arraySetups.length > 0) {
      return [...Array(3)].map((item, index) => {
        return (
          <SwiperSlide key={index} tag="div">
            <Grid container spacing={screenWidth > 768 ? 6 : 0}>
              {arraySetups.map((movie, index1) => {
                if (
                  index === 1
                    ? index1 > 8 && index1 < 17
                    : index === 2
                    ? index1 > 16
                    : index1 < 8
                ) {
                  return (
                    <Grid
                      key={index1}
                      style={{ padding: screenWidth > 768 ? null : 20 }}
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                    >
                      {screenWidth > 677 ? (
                        <Card
                          className={`${
                            arraySetups === dangChieuData
                              ? classes.cardDangChieu
                              : classes.cardSapChieu
                          }  ${classes.Card}`}
                        >
                          <CardActionArea variant="contained">
                            <CardMedia
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  urlPublic + "/img/default-film.webp";
                              }}
                              className={classes.imgCard}
                              style={{
                                height: screenWidth < 768 ? "100%" : "70%",
                              }}
                              component="img"
                              alt={`phim-${movie.tenPhim}`}
                              height="140"
                              image={movie.hinhAnh}
                              title={`phim-${movie.tenPhim}`}
                            />
                            {screenWidth >= 768 && (
                              <CardContent className={classes.CardContent}>
                                <Box
                                  className={classes.boxMovie}
                                  component="div"
                                  item={"true"}
                                >
                                  <Typography
                                    component="span"
                                    className={`${classes.banner} ${
                                      movie.room === 16
                                        ? classes.banner16
                                        : classes.bannerP
                                    }`}
                                  >
                                    {movie.room === 16 ? 16 : "P"}
                                  </Typography>
                                  {movie.tenPhim} -{" "}
                                  {movie.room === 16 ? "(16)" : "(P)"}
                                </Box>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                  component="p"
                                >
                                  {movie.room === 16 ? "90 phút " : "60 phút"}
                                </Typography>
                              </CardContent>
                            )}
                          </CardActionArea>
                          {arraySetups === dangChieuData && (
                            <Box className={classes.checkStart} component="div">
                              <Typography
                                style={{
                                  fontWeight: "bold",
                                  color: "white",
                                  textAlign: "center",
                                  marginBottom: 0,
                                  transform: "scaleY(1.2)",
                                }}
                                component="p"
                              >
                                {movie.danhGia}
                              </Typography>
                              <Typography component="span">
                                {RenderStart(movie.danhGia, "newIns")}
                              </Typography>
                            </Box>
                          )}

                          <Box
                            style={{
                              display: screenWidth < 768 ? "none" : "block",
                            }}
                            className={classes.boxMovieOver}
                            component="div"
                          >
                            <Box
                              className={classes.boxMovieOverImg}
                              onClick={() => handleGetTrailer(movie.trailer)}
                              component="div"
                            >
                              <CardMedia
                                component="img"
                                image={
                                  "https://tix.vn/app/assets/img/icons/play-video.png"
                                }
                              />
                            </Box>

                            {arraySetups === dangChieuData && (
                              <CardActions
                                onClick={() => {
                                  handleCheckLogin(movie.maPhim, movie.room);
                                }}
                                className={classes.boxMovieOverBtn}
                              >
                                <Link
                                  style={{ width: "100%" }}
                                  to={`/phim/${movie.maPhim}`}
                                >
                                  <Button
                                    className={classes.btnMovie}
                                    size="small"
                                  >
                                    Mua vé
                                  </Button>
                                </Link>
                              </CardActions>
                            )}
                          </Box>

                          <CardMedia
                            className={classes.datTruoc}
                            component="img"
                            image={
                              "https://tix.vn/app/assets/img/icons/film_type_3.png"
                            }
                          />
                        </Card>
                      ) : (
                        <Link
                          onClick={() => {
                            handleCheckLogin(movie.maPhim, movie.room);
                          }}
                          style={{ width: "100%" }}
                          to={`/phim/${movie.maPhim}`}
                        >
                          <Card
                            className={`${
                              arraySetups === dangChieuData
                                ? classes.cardDangChieu
                                : classes.cardSapChieu
                            }  ${classes.Card}`}
                          >
                            <CardActionArea variant="contained">
                              <CardMedia
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src =
                                    urlPublic + "img/default-film.webp";
                                }}
                                className={classes.imgCard}
                                style={{
                                  height: screenWidth < 768 ? "100%" : "70%",
                                }}
                                component="img"
                                image={movie.hinhAnh}
                                alt={`phim-${movie.tenPhim}`}
                                height="140"
                                title={`phim-${movie.tenPhim}`}
                              />
                            </CardActionArea>
                            {arraySetups === dangChieuData && (
                              <Box
                                className={classes.checkStart}
                                component="div"
                              >
                                <Typography
                                  style={{
                                    fontWeight: "bold",
                                    color: "white",
                                    textAlign: "center",
                                    marginBottom: 0,
                                    transform: "scaleY(1.2)",
                                  }}
                                  component="p"
                                >
                                  {movie.danhGia}
                                </Typography>
                                <Typography component="span">
                                  {RenderStart(movie.danhGia, "newIns")}
                                </Typography>
                              </Box>
                            )}

                            <CardMedia
                              className={classes.datTruoc}
                              component="img"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  urlPublic + "img/default-film.webp";
                              }}
                              image={
                                "https://tix.vn/app/assets/img/icons/film_type_3.png"
                              }
                            />
                          </Card>
                        </Link>
                      )}
                    </Grid>
                  );
                }
              })}
            </Grid>
          </SwiperSlide>
        );
      });
    }
  };

  return (
    <section id="new-in" className="newIn">
      <>
        <AppBar position="static">
          <Tabs
            value={value}
            variant="scrollable"
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="secondary"
            aria-label="simple tabs example"
          >
            <Tab label="Đang Chiếu" {...a11yProps(0)} />
            <Tab label="Sắp Chiếu" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Swiper
            effect="slide"
            speed={500}
            tag="section"
            id="simple-tab-0"
            pagination
            spaceBetween={0}
            slidesPerView={1}
            navigation
            // scrollbar={{ draggable: true }}

            // onSwiper={(swiper) => console.log(swiper)}
          >
            {renderSlideDangChieu()}
          </Swiper>
        </TabPanel>
        <TabPanel color="secondary" value={value} index={1}>
          <Swiper
            tag="section"
            id="simple-tab-1"
            spaceBetween={0}
            slidesPerView={1}
            navigation
            // scrollbar={{ draggable: true }}
          >
            {renderSlideDangChieu(sapChieuData)}
          </Swiper>
        </TabPanel>
      </>
      <ModalTrailer
        onHide={() => {
          setModalTrailer(false);
        }}
        show={modalTrailer}
        trailer={trailer}
      />
    </section>
  );
}
export default NewIn;
