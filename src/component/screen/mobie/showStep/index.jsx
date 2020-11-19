import React,{useCallback} from 'react'
import {makeStyles } from "@material-ui/styles";
import  {Box } from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {useDispatch} from "react-redux"
import  {Link } from "react-router-dom";
const useStyles = makeStyles({
    root:{
        position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: 60,
    backgroundColor: "rgba(255,255,255,.95)",
    boxShadow:" 0 0 15px rgba(0,0,0,.3)",
    zIndex: 99000,
    transition: "all .2s",
   
    },
    root__pan:{
        display:"flex",
        alignItems:"center",
        
        width:"90%",
        margin:"0 auto",
        height:"100%",
    },spanBack:{
        fontWeight: 500,
        fontSize: 19,
        color: "gray",
        border: "1px solid gray",
        padding: "2px 10px",
        background:"#e1e5da",
        boxShadow:"2px 2px grey",
        borderRadius:5
    },
    step:{
        fontWeight:"bold",
        color:"#000",
        fontSize:20
    }
});
export default function ShowStepMobile(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const  {step} = props;

    const screenWidth = React.useMemo(()=>window.innerWidth)
    const filterStep = useCallback(
        () => {
      const arrStep = [
          "01.CHỌN LOẠI VÉ",
           " 02.CHỌN GHẾ & THANH TOÁN",
            "03.KẾT QUẢ ĐẶT VÉ"];
        
            return arrStep.filter((item,i)=>i+1 === step).map((fil,index)=><span key={index} style={{width:step === 1? "60%":step === 2 && screenWidth > 480 ?"70%":null}} className={classes.step}>{fil}</span>
            ) 
        },[step]
        
    )

    const changeStep =(i,status = "step")=>{
        dispatch({
            type:"CHECK_STEP",
            i,
            status
        })
    }
    return (
        <Box className={classes.root}>
            <Box style={{justifyContent: step === 3 ? "center" :"space-between" }} className={classes.root__pan}>
            { step === 2 && <ArrowBackIosIcon
             onClick={()=>changeStep(0,"restart__listChair")} style={{color:"gray"}}/>}
            {step === 1 && <Link to="/" className={classes.spanBack} onClick={()=>dispatch({
                type:"RESTART__ALL"
            })}> Back</Link>}
         {filterStep()}
            </Box>
        </Box>
    )
}
