import React,{useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//tab 
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';
// data name 
import data from "../../../../json/nameMovie.json";
// data MaHeThongRap
import dataMaHeThongRap from "../../../Layout/home/ShowIn/json/maHeThongRap.json";

// tyAction
import * as TyAction from "../../../../Redux/constanst" ;

import TimesMovie from "../../../Layout/groupShowInmovie/timesMovie";
import "./_TabTimeMovie.scss";


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding:0
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    // flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    color:"#000",
    fontWeight:600
  },
  // cumRapChieu 
  cumRapChieu:{
    display:"flex",
    justifyContent:" flex-start",
    alignItems:"start"
  },
  tabSpan:{
    
    fontWeight:"bold",
    "&:focus":{
      border:"none",
      outline: "none"
    }
  },
  Tabs :{
    "& .MuiTabs-scrollable ": {
      
      scrollbarWidth: "initial"
  }
  },
    
}));


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box component={"div"}>
          {children}
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
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}



 function MovieMobile(props) {


  let screenWidth = React.useMemo(()=>window.innerWidth)

  let {cinemaMovies,
    maHeThongRap,
    chonTheoNgayChieu,
    detailCinemaToTheater,
    indexHome,
    
    status ,
    userLogin } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const [value, setValue] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
      let dayOfBirth = '2019-01-01';
      let day = parseInt(dayOfBirth.slice(8,10)) + newValue ;
      if(day <10){
        day=`0${day}`
      }
      
      let chooseDay = `2019-01-${day}`;
      props.getPickByDayToMovie(chooseDay);
      
        // console.log(chooseDay)
    
 
  };


  const handleChangeAccording = (panel) => (event, isExpanded) => {
        
        setExpanded(isExpanded ? panel : false );

  };

  const renderListDay= React.useCallback( ()=>{ 
    const arrDay = [
          "CN",
          "T2",
          "T3",
          "T4",
          "T5",
          "T6",
          "T7",
  ];
      
          
     const arrDayTAb=   [...Array(14)].map((item,index)=>{
      let day = new Date("January 1, 2019");
  
            let nextDay = new Date(day);
      nextDay.setDate(day.getDate() + index);
     return <Tab key={index} style={{maxWidth:72}}  className={classes.tabSpan}
      label={<><span className={ `d-block ${classes.span}`}>{arrDay[nextDay.getDay()]}
      </span>
     <span
      className={classes.span}
     >{nextDay.getDate() <10 ? 0 +`${nextDay.getDate()}` : nextDay.getDate()}</span></>} {...a11yProps(index)} />
              
      
    })
    return arrDayTAb;
  },[])



  // render theader movie 
  const filterTheaterMovie = React.useCallback(()=>{
  
    if(Object.entries(detailCinemaToTheater).length > 0){
        // console.log(detailCinemaToTheater);

        return detailCinemaToTheater.heThongRapChieu.map((rap,index)=>{
          return (
            <div key={index} className={classes.root}>
              <Accordion 
              style={{borderRadius:0}}
              defaultChecked={false}
              defaultExpanded={false}
             onChange={handleChangeAccording(index)}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={index + "bh-content"}
              id={index+"bh-header"}
            >
              <Typography component={"div"} className={classes.heading}>
                <img src={rap.logo} width={50} height={50} alt={`Rạp-${rap.tenRap}`}/>
              </Typography>
              <Typography component={"p"} className={classes.secondaryHeading}>
                {rap.tenHeThongRap}
                </Typography>
            </AccordionSummary>
            <AccordionDetails style={{display:"block"}} component={"div"}>
          
              {filterTheaters(rap)}
            </AccordionDetails>
          </Accordion>
            </div>
          )
        })
    }
  },[value !== chonTheoNgayChieu]);

  const filterTheaters = (theater ) =>{
    let RapImg = dataMaHeThongRap.find(cumRap => cumRap.maHeThongRap === theater.maHeThongRap)
    return theater.cumRapChieu.map((cumRap,index)=>{
      let lastChar = cumRap.tenCumRap.split("-");

      let attackChar = cumRap.tenCumRap.split(` `, 1);

      let clusterName = data.find(item => item.name === attackChar[0]);

      return <React.Fragment key={index}>  <Typography   className={classes.cumRapChieu}  component="div"  >
                 <img src={RapImg.hinhAnh} width={50} height={50} alt={"logo-"+ RapImg.maHeThongRap}/>
                      <Typography style={{paddingLeft:10}} component="div"  >
                            <Typography  style={{fontWeight:600}} component="p">
                              <span style={{color:clusterName.color}} >{clusterName.name}</span> - 
                                  { lastChar[1] === " CGV Saigonres Nguyễn Xí"?lastChar[1].split(" ").forEach((char,index)=>index !== 1 ? char + " ":null):lastChar[1]}
                            </Typography>
                            <p style={{color:"#9b9b9b",marginBottom:0,fontSize:14}}>890 Trần Hưng Đạo, Q.5</p>

                              
                            </Typography>

                      </Typography>
       <Typography style={{padding:"10px 0"}}  component="div">
         <h2 style={{fontSize:16,fontWeight:"bold"}}>2D Digital</h2>
        <Typography style={{padding:"5px 0"}} component="div" >
                <TimesMovie cinema={cumRap}/>
              </Typography>
      </Typography>
      </React.Fragment>
    })
    // console.log(theater);
  }
    return (
      <div className={classes.root}>
        <AppBar style={{padding:0}} position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChangeTab}
            textColor="secondary"
            variant="scrollable"
            scrollButtons="auto"

         
            aria-label="scrollable auto tabs example"
            className={classes.Tabs}
          >
            {renderListDay()}
          </Tabs>
        </AppBar>
          <TabPanel value={value} index={value}>
          {filterTheaterMovie()}
            </TabPanel>

       
        
        
        
      </div>
    );
}

const maStateToProps = state =>{
  return {
    cinemaMovies: state.MovieManaGerment.cinemaMovies,
    maHeThongRap: state.MovieManaGerment.maHeThongRap,
    chonTheoNgayChieu: state.MovieManaGerment.chonTheoNgayChieu,
    detailCinemaToTheater: state.MovieManaGerment.detailCinemaToTheater,
    indexHome: state.MovieManaGerment.indexHome,
    
    status :state.UserReducer.status,
    userLogin :state.UserReducer.userLogin,
  }
}
const mapDispatchToProps  = dispatch =>{
  return {
    getPickByDayToMovie :(day)=>{
      const action ={
        type:TyAction.GETPICKBYDAYMOVIE,
        PickByDay : day
      }
      
      dispatch(action);

    }
  }
}
  export default connect(maStateToProps,mapDispatchToProps) (MovieMobile);
