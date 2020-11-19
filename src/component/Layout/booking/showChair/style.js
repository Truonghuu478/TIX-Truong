import { makeStyles } from "@material-ui/styles";
const UseStyles = makeStyles({
    chairVip: {
      color: "#e08411",
    },
    Choose: {
      color: "#44c020",
    },
    chairDisable :{
        color:"#DFDFDF"
    },
    colNine:{
     
  
      width:"10%",
      "& p":{
        color: "gray",
        fontWeight: "bold",
        fontSize: 21,
        marginBottom:9
    
      }
      
    },
    colNine:{
      width: "5%",

    },
    colNineText:{
      fontSize: 20,
      fontWeight: 400,
      color: "gray",
      marginBottom:0
    },colList :{
      width:"100%",
      
    }, 
    configRow:{
     display:"flex" ,
     justifyContent:"flex-start",
     alignItems:"center"
    },
    colList:{
      width:"95%"
    }
    ,BoxSpaceChair:{
        display:"flex",
        justifyContent:"space-around",
        alignItem:"center",
        width:"100%"
    },
    colListNext:{
      "& svg":{
        margin:6
      }
    },
    colListBetween:{
      textAlign:"center",
      "& svg":{
        margin:6
      }
    }
  });

export default UseStyles;