import React, { useState, useEffect } from "react";
// import Grid from '@material-ui/core/Grid';
import { validateMovie } from "../../../../vender/validate";
import { Container, Grid, Box, Typography, IconButton, Tooltip,Accordion ,AccordionSummary ,AccordionDetails ,Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import theme from "../../../../themes";
import ScaleLoader from "react-spinners/ScaleLoader";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import *as action from "../../../../Redux/action/admin";
import Swal from "sweetalert2";
import TabLogo from "../../../Layout/home/ShowIn/TabLogo";
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import ModalAdmin from "../../../screen/modalAdmin/index";
// data MaHeThongRap
import dataMaHeThongRap from "../../../Layout/home/ShowIn/json/maHeThongRap.json";
// css 
import { useLocation } from "react-router-dom";
// redux 
import { useSelector, useDispatch } from "react-redux";
import data from "../../../../json/nameMovie.json";

const useStyle = makeStyles({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  buttonShowTime: {

    margin: "2rem 0",
    textAlign: "center",
    gridColumn: "1 / span 4"
  },
  item: {
    "& .MuiTabs-root": {
      width: "100% !important",
    }
  },
  theaterItem: {
    display: "flex",
    justifyContent: "flex-start",
    algnItems: "center",
    padding: theme.spacing(1)
  },noneOutline:{
    "&:focus":{
      outline: "none"
    }
  }
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function ManagerShowtime() {
  const classes = useStyle();
  const location = useLocation();
  const dispatch = useDispatch();
  const { maHeThongRap, cinemaMovies, detailCinemaToTheater } = useSelector(state => state.MovieManaGerment)
  const [showModal, setShowModal] = useState(false);
  const [typeModal, setTypeModal] = useState(null);
  const [cinemaCode, setCinemaCode] = useState(null);
  const [listTheater,setListTheater] = useState([]);
  const [state, setState] = useState({
    data: { maPhim: null, ngayChieuGioChieu: "", maRap: null, giaVe: null },
    error: { maPhim: "", ngayChieuGioChieu: "", maRap: "", giaVe: "" },

  });
  const checkPath = React.useMemo(() => location.pathname === "/admin/movie-showtime", [])

  // handle change input
  
  // filter movie Theater 
  const filterDetailTheater = React.useCallback(() => {


    if (detailCinemaToTheater.length > 0) {
      return detailCinemaToTheater.map((item, index) => {
        let RapImg = dataMaHeThongRap.find(cumRap => cumRap.maHeThongRap === maHeThongRap);
        let lastChar = item.tenCumRap.split("-");

        let attackChar = item.tenCumRap.split(` `, 1);
  
        let clusterName = data.find(item1 => item1.name === attackChar[0]);
        return  <Accordion key={index}>
          <AccordionSummary
          
          expandIcon={<ExpandMoreIcon />}
          aria-controls={item.tenCumRap}
          >
            {(<Grid className={classes.theaterItem} >
          <img
            width={50}
            height={50}
            src={RapImg.hinhAnh}
            onError={(e) => { e.target.onerror = null; e.target.src = "\img/default-film.webp" }}
            alt="ss"
          />
          <Grid style={{paddingLeft:20}} >
          <Typography  style={{fontWeight:600}} component="p">
                              <span style={{color:clusterName.color}} >{clusterName.name}</span> - 
                                  { lastChar[1] === " CGV Saigonres Nguyễn Xí"?lastChar[1].split(" ").forEach((char,index)=>index !== 1 ? char + " ":null):lastChar[1]}
                            </Typography>
            {/* <Typography component="p">{item.tenCumRap}
            </Typography> */}
            <Typography component="span" style={{fontSize:13,color:"gray"}}>{item.diaChi}</Typography>

          </Grid>
          {/* icons  */}
          <Tooltip className={classes.noneOutline} 
          onClick={() => handleOpenModal(item.maCumRap,item.danhSachRap)} 
          title="Add movie-theater">
            <IconButton aria-label="Add">
              <AddToQueueIcon />
            </IconButton>
          </Tooltip>
        </Grid>)}
            
          </AccordionSummary>
          <AccordionDetails >
              {item.danhSachRap.map((rap,index1)=>{
                return <Button 
                style={{textAlign:"center"}} variant={"contained"} 
                component={"span"}>
                  {rap.tenRap}
                </Button>
              })}
              </AccordionDetails >
        </Accordion>
      })



    } else return <ScaleLoader />



  })
  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = false;
    for (let key in state.error) {

      if (state.error[key] !== "") {
        isValid = true;

      }
    }
    if (isValid) {

      Swal.fire({
        icon: "error",
        title: "successful showtimes failed",
        text: "Not performed because of error",
        // footer: '<a href>Why do I have this issue?</a>',
        timerProgressBar: false,
        showConfirmButton: true,

        // timer: 2000,
      });
    } else dispatch(action.createShowTime(state.data))
  };
  
  // fetch ds movie 
  useEffect(() => {
    dispatch(action.fetchListDetailTheater(maHeThongRap))
  }, [maHeThongRap])
  // handleOpen modal 
  const handleOpenModal = (code,lstTheater) => {
    setCinemaCode(code);
    setListTheater(lstTheater)
    setTypeModal("Add-ShowTimes");
    setShowModal(true);
  }
  return (
    <>
      <Container maxWidth="lg" >
        <Grid container spacing={3}>
          <Grid item lg={3} xs={12} ms={6} md={4} className={checkPath ? classes.item : null}  >
            <TabLogo />
          </Grid>
          <Grid item lg={9} xs={12} ms={6} md={8} >
            <TabPanel >
              {filterDetailTheater()}
            </TabPanel>
          </Grid>
        </Grid>
        <ModalAdmin
          show={showModal}
          listTheater={listTheater}
          type={typeModal}
          cinemaCode={cinemaCode}
          onHide={() => setShowModal(false)}
        />
      </Container>

    </>
  );
}
