import React,{useState} from 'react';
import PropTypes from 'prop-types';
// tab 
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TabConTent from "./TabContent";
import * as TyAction from "../../../Redux/constanst";
import classA from "classnames"
// import red from "@material-ui/core/colors/red";

import { connect } from 'react-redux';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box component="div" p={3}>{children}</Box>}
    </Typography>
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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position:"relative",
   
    
  },
  tabSpan:{
    width:105,
    minWidth:105,
    '&:focus':{
      outline:"none"  ,

    
    },
    "& span":{
     fontWeight:600,
     
    }
  },
  span:{
    fontSize:"16px",
    textTransform:"none",
    border:"none",
    fontWeight:"500",
    
  },
  tabPane:{
    outline:"none !important",
    position: 'absolute',
    top:0,
    right:0,
    
    width: '75%',
 
  }
  // GroupShowInMovie:{
  //   textTransform:"none",
  // }
  
  
}));


 function GroupShowInMovie(props) { 

    let classes = useStyles();
    // const primary = red[500]; // #F44336
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
      // let day  = new Date(newValue);
      // let dayNext = new Date(day);
      // dayNext.setDate(dayNext.getDate() + 1);
      
      //  let toDay = dayNext.getDay();
      setValue(newValue);
      let dayOfBirth = '2019-01-01';
      let day = parseInt(dayOfBirth.slice(8,10)) + newValue ;
      if(day <10){
        day=`0${day}`
      }
      
      let chooseDay = `2019-01-${day}`;
      props.getPickByDayToMovie(chooseDay);
      
    
    
    };
    const renderListDay=  ()=>{
  const arrDay = [
        "Chủ nhật",
        "Thứ hai",
        "Thứ ba",
        "Thứ tư",
        "Thứ năm",
        "Thứ sáu",
        "Thứ bảy",
];
    
        
  return   [...Array(14)].map((item,index)=>{
    let day = new Date("January 1, 2019");

          let nextDay = new Date(day);
    nextDay.setDate(day.getDate() + index);
   return (<Tab key={index}   disabled={nextDay.getDate() >= 10} className={classes.tabSpan}
   label={<><span  className={classA("d-block",classes.span)} >{arrDay[nextDay.getDay()]}
   </span>
  <span
   className={classes.span}
  >{nextDay.getDate() <10 ? 0 +`${nextDay.getDate()}` : nextDay.getDate()}</span></>} {...a11yProps(index)} 
  >
    </Tab>)
            
    
  })
 
}
    // useEffect(() => {

      
    // }, [])
    return (
      <div  className={classes.root}>
        <AppBar className={classes.tabPane} position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            variant="scrollable"
            scrollButtons="auto"
            // centered

            aria-label="scrollable auto tabs example"
            
          >
            {renderListDay()}
          </Tabs>
        </AppBar>
        
          <TabConTent/>

        
      </div>
    );
  }

const maStateToProps = state =>{
  return {
    chonTheoNgayChieu : state.MovieManaGerment.chonTheoNgayChieu,
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
  export default connect(maStateToProps,mapDispatchToProps) (GroupShowInMovie);