import React from "react";

// restar 
import RenderStar from "../../../../vender/star"
// import PropTypes from 'prop-types';

// index.propTypes = {

// };

function MovieTop(props) {
  let {danhGia} = props;
  let cmtPerson = Math.random() >0.5 ?1:-1;

  return (
    <div className="col-md-4 cuiler  p-0">
      <div className="container">
        
       <div className="danhgia c100 p52 ">
            <div className="circleBorder">
            </div>
          <span className="ng-binding">{danhGia}</span>
            <div className="slice">
              <div className="bar"></div>
              <div className="fill"></div>
            </div>
          </div>
       <div className="star d-flex mt-3 mb-3 justify-content-center">
              
                
             {RenderStar(danhGia,"newIns")}
               
        </div>
        <span className="">có {cmtPerson === 1? danhGia * 2 :danhGia *1 } người đánh giá</span>
        </div>
     </div>
        
  )

  }
export default MovieTop;
