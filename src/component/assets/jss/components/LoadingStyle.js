
// import {makeStyles} from "@material-ui/core";
import { css } from "@emotion/core";

// const loadingStyle = makeStyles({
//     basic:{
//         position:"absolute",
//   width:"100%",height:"100%",
//   display:"flex",
//   zIndex:9999,
//   alignItems: "center",
//   justifyContent: "center",
//     }
// })

const loadingStyle = css`
 position:absolute;
  width:100%;height:100%;
  display:flex;
  z-index:9999;
  align-items: center;
  justify-content: center`;

export default loadingStyle;