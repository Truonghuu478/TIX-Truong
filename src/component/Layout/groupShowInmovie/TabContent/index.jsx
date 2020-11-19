import React from "react";
// import PropTypes from "prop-types";
import Tablogo from "../../../Layout/home/ShowIn/TabLogo";
import SA from "../groupSystemMovie";
// TabConTent.propTypes = {

// };


// const useStyle = makeStyles( ()=>({
//   padContnent:{
//     padding: ' 0 !important' ,
//     background:"red",

//   }
// }))

function TabConTent(props) {
  // let  classes = useStyle();
  return (
    <div className="row mx-0  w-100">
    <Tablogo  />
      {/* <div className="col-md-3 col-lg-3 col-xl-3">

      </div> */}
      <div style={{marginTop:"4rem"}}
       className="col-md-9 col-xl-9 col-lg-9 px-0 " >
        <SA  variant="scrollable"  
        scrollButtons="auto"  aria-label="scrollable auto tabs example"/>
      </div>
    </div>
  );
}

export default TabConTent;
