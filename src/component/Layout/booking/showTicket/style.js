
import {makeStyles }from "@material-ui/core/styles"

// set style 
const useStyles = makeStyles({
  LinkBack:{
   
    fontSize:"1.2rem",
    color:"#211e1e",
    textDecoration:"none",
    fontWeight:"500",
    "& svg":{
      

      fontSize:"2rem"
    },
    "&:hover":{
      color:"#211e1e",
    }
  },LinkNext:{
    
    cursor:"pointer",
    fontSize:"1.2rem",
    color:"#211e1e",
    textDecoration:"none",
    fontWeight:"500",
    "& svg":{
      
      fontSize:"2.5rem"
    },
    "&:hover":{
      color:"#211e1e",
    }
  }
  ,
    root: {
        flexGrow: 1,
        
      },
      textInfo:{
        textAlign:"center"
      },
    card: {
     
      boxShadow: "0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048),0 12.5px 10px rgba(0, 0, 0, 0.06),0 22.3px 17.9px rgba(0, 0, 0, 0.072),0 41.8px 33.4px rgba(0, 0, 0, 0.086),0 100px 80px rgba(0, 0, 0, 0.12)"
      ,
    },
    media: {
      height:"70%",
      objectFit:'cover',
      paddingTop: '56.25%', // 16:9
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain'
  
    },
    cardContentText:{
      color:"#868489",
      fontWeight:500,
      textAlign:'center',
      "& svg":{
        color:"red",
        fontFamily: "Advent Pro "
      }
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    cardHeaderImg:{
        width:50,
        objectFit: 'cover'
    },
    
}
  
    
 
);
export {useStyles}