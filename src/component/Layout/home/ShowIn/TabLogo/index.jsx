import React, { useEffect, useState, Fragment } from "react";
// import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
// import Typography from "@material-ui/core/Typography";
// import Box from "@material-ui/core/Box";
import { connect } from "react-redux";
import * as action from "../../../../../Redux/action/moive";
// import PropTypes from 'prop-types';

// index.propTypes = {

// };

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 350,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: "25%",
  
    "& .MuiTabs-scroller":{

      "& .MuiTabs-flexContainer":{

        height: "100%",
        margin:" 0 auto",
        justifyContent: "center"
      } 
    }

  },
  tab: {
    // position:"relative",
    borderRight: `1px solid ${theme.palette.divider}`,
    "&:focus ": {
      outline: "none",
    },
  },
  img: {
    // padding:" 0 5px 5px 0",
    maxWidth: "60px",
    maxHeight: "60px",

    // position:"absolute",
    // top:0,
    // left:"32px",
  },
  // logo-center:{

  // }
}));
function TabLogo(props) {
  const classes = useStyles();
  const [valueTab, setValue] = useState("BHDStar");
  
  const handleChange = (event, newValue) => {
    setValue(newValue)
    props.getAPISyStemTheaterClusters(newValue, 0 );

  };
  //set render logo
  useEffect(() => {
    setValue("BHDStar");
  }, [props.chonTheoNgayChieu])
  // get API he thong rap
  useEffect(() => {
    
    props.GetMovieTheater(0);
    setValue("BHDStar");
  }, []);
  // get API danh sach he thong rap
  useEffect(() => {
    
    props.getAPISystemTheaterClustersFist(valueTab,0);
  }, []);
  // setChagnemaHeThongRap

  //render ListmovieTheater
  const renderTabMovieTheater = React.useCallback(() => {
    let { listMovieTheater } = props;
    return listMovieTheater.map((theater, index) => {
      return (
        <Tab
        key={index}
            value={theater.maHeThongRap}
            // style={{opacity:valueTab !== theater.maHeThongRap ?"0.4":1}}
          className={classes.tab}
          label={<img className={classes.img} src={theater.logo} alt="logo" />}
          {...a11yProps(theater.maHeThongRap)}
        />
      );
    });
  },[props.listMovieTheater])
// handle change color Tab 
 const changeColorTab = React.useCallback(()=>{
    switch (valueTab) {
      case "BHDStar":
        
        return "#74bf44";
    case "CGV" :
      return "red";
    case "CineStar" :return "#e04e7e";
    case "Galaxy" :return "#fa6838";
    case "LotteCinima" :return "#cc483f";
    case "MegaGS" :return "#e9b537"
      
    }
 },)
  return (
    <Tabs
      orientation="vertical"
      onChange={handleChange}
      variant="scrollable"
      value={valueTab }
      aria-label="Vertical tabs example"
      className={classes.tabs}
      // textColor="secondary"
      style={{color : changeColorTab()}}
      // indicatorColor="secondary"

    >
      {renderTabMovieTheater()}
    </Tabs>
  );
}
const mapStateToProps = (state) => {
  return {
    listMovieTheater: state.MovieManaGerment.listMovieTheater,
    cinemaMovies: state.MovieManaGerment.cinemaMovies,
    chonTheoNgayChieu :state.MovieManaGerment.chonTheoNgayChieu
    
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    GetMovieTheater: (index) => {
      dispatch(action.getHostAPIMovieTheater(index));
    },
    getAPISystemTheaterClustersFist: (id,index) => {
      dispatch(action.getAPISyStemTheaterClusters(id,index));
    },
    getAPISyStemTheaterClusters: (id,index) => {
      dispatch(action.getAPISyStemTheaterClusters(id,index));
    },
    // getdetailsystemTheater: (id) => {
    //   dispatch(action.getdetailsystemTheater(id));
    // },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TabLogo);
