import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';

import { makeStyles, useTheme ,ThemeProvider} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from "@material-ui/core/Container";
// import red from "@material-ui/core/colors/red";
import InfoMovieDes from "../InfoMovieDes";
import Evaluate from "../../../Layout/Cinema/Evaluate";
import GroupShowInMovie from "../../../Layout/groupShowInmovie";
import MovieMobile from "../../../screen/mobie/TabtimeMovie"
// index.propTypes = {
    
// };
// const theme = createMuiTheme({
//   palette: {
//     red: {
//       // Purple and green play nicely together.
//       main: red[500],
//     },
    
//   },
// });

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box key={index} component="div" p={window.innerWidth > 768 ?  3:0 } >
          <Typography component={"div"}>{children}</Typography>
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
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
     
      width:"100%",
      
      backgroundColor: "transparent",
    },
    
    Tab:{
      color:"white",
      fontWeight:"bold",
      textTransform: "none",
      
      
      padding:0,
      transform:"scale(1)",
      transition : "all .4s",
      '&:focus ':{
        outline : "none",
        // border:"none",
      // color:"#b71c1c",
      },
      '&:hover':{

        transform:"scale(1.2)",
      },
      '&:focus':{

        transform:"scale(1.2)",
      }
    }
  }));
function MovieSection(props) {
    const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  let {screenWidth} = props;
  // console.log(screenWidth);
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div id="muaVe" style={{marginTop:screenWidth > 768 ? "-4rem":"-73px" }} className={classes.root}>
      <Container maxWidth="md">
      <AppBar position="static" style={{boxShadow:"none",backgroundColor:"transparent"}}  >
      <ThemeProvider theme={theme}>

        <Tabs
          value={value}
          onChange={handleChange}
          
          textColor="secondary"
          centered
         
          aria-label="full width tabs example"
        >
          <Tab style={{fontSize: screenWidth >768 ? 24 : 16 ,padding:screenWidth >768 ? 0 : "0 15px"}} className={classes.Tab}   label="Lịch Chiếu " {...a11yProps(0)} />
          <Tab style={{fontSize: screenWidth > 768 ? 24 : 16 ,padding:screenWidth >768 ? 0 : "0 15px"}} className={classes.Tab}   label="Thông Tin" {...a11yProps(1)} />
          <Tab style={{fontSize: screenWidth > 768 ? 24 : 16 ,padding:screenWidth >768 ? 0 : "0 15px"}} className={classes.Tab}   label="Đánh Giá" {...a11yProps(2)} />
        </Tabs>
      </ThemeProvider>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel  value={value} index={0} >
        
          {screenWidth > 768 ?<GroupShowInMovie/> : <MovieMobile/>}   </TabPanel>
        <TabPanel value={value} index={1} >
          <InfoMovieDes/>
        </TabPanel>
        <TabPanel value={value} index={2} >
          <Evaluate/>
        </TabPanel>
      </SwipeableViews>
      </Container>
    </div>
  );
}

export default MovieSection;