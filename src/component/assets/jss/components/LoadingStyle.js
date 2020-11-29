
import {makeStyles} from "@material-ui/core";

const loadingStyle = makeStyles({
    basic:{
        position:"absolute",
  width:"100%",height:"100%",
  display:"flex",
  zIndex:9999,
  alignItems: "center",
  justifyContent: "center",
    }
})

export default loadingStyle;