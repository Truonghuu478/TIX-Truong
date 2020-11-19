

import {makeStyles} from "@material-ui/styles";


const useStyles= makeStyles({
    booking__fist:{
        height:200,
        position:"relative"
    },
    booking__content:{
        padding:10,
        background:" rgb(10, 32, 41)",
        color:"#fff",
        
        "& p":{
            fontSize:13,
            "&:nth-child(1)":{
                fontSize:16
            } ,
            "&:nth-child(2)":{
                fontSize :22
            }

        }
      
    },

    urlImg:{
            width: '100%',
            objectFit:"fill",
            height: '100%',
            
           
    },
    dark :{
        position:"absolute",
        top:0,
        left : 0,
        width:"100%",
        height:"100%",
        background:"linear-gradient(to top, rgb(10, 32, 41), transparent 100%)",
    },
    text:{
        fontWeight:"bold",
       color: "#979393",


    }
})



export default useStyles;