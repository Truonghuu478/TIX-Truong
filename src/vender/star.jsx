import React from 'react';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarIcon  from '@material-ui/icons/Star';


function RenderStart(danhgia,status) {
    

      // <img key={Math.random()} alt={"star"} style={{maxWidth:10}}  src={"https://tix.vn/app/assets/img/icons/star1.png"}
            let arrStart = [];
          if (status ==="newIns"){
              switch (danhgia) {
                case 4.5:
                  arrStart.push(
                    <img key={Math.random()} alt={"star"} style={{maxWidth:10}} src={"https://tix.vn/app/assets/img/icons/star1.png"} />,
                    <img key={Math.random()} alt={"star"} style={{maxWidth:10}} src={"https://tix.vn/app/assets/img/icons/star1.png"} />,
                    <img key={Math.random()} alt={"star"} style={{maxWidth:10}} src={"https://tix.vn/app/assets/img/icons/star1.png"} />,
                    <img key={Math.random()} alt={"star"} style={{maxWidth:10}} src={"https://tix.vn/app/assets/img/icons/star1.png"} />,
                    <img key={Math.random()} alt={"star"} style={{maxWidth:10}} src={"https://tix.vn/app/assets/img/icons/star1.2.png"} />,
                    )
                    
              break;
                // https://tix.vn/app/assets/img/icons/star1.2.png
                  case 4 : 
                    arrStart.push(
                      <img key={Math.random()} alt={"star"} style={{maxWidth:10}} src={"https://tix.vn/app/assets/img/icons/star1.png"} />,
                      <img key={Math.random()} alt={"star"} style={{maxWidth:10}} src={"https://tix.vn/app/assets/img/icons/star1.png"} />,
                      <img key={Math.random()} alt={"star"} style={{maxWidth:10}} src={"https://tix.vn/app/assets/img/icons/star1.png"} />,
                      <img key={Math.random()} alt={"star"} style={{maxWidth:10}} src={"https://tix.vn/app/assets/img/icons/star1.png"} />,
                      )
                      
                    break;
                  case 3.5:
                    arrStart.push(
                      <img key={Math.random()} alt={"star"} style={{maxWidth:10}} src={"https://tix.vn/app/assets/img/icons/star1.png"} />,
                      <img key={Math.random()} alt={"star"} style={{maxWidth:10}} src={"https://tix.vn/app/assets/img/icons/star1.png"} />,
                      <img key={Math.random()} alt={"star"} style={{maxWidth:10}} src={"https://tix.vn/app/assets/img/icons/star1.png"} />,
                     
                      <img key={Math.random()} alt={"star"} style={{maxWidth:10}} src={"https://tix.vn/app/assets/img/icons/star1.2.png"} />,
                      )
                      
                  break;
                  case 3: 
                    arrStart.push(
                      <img key={Math.random()} alt={"star"} style={{maxWidth:10}} src={"https://tix.vn/app/assets/img/icons/star1.png"} />,
                      <img key={Math.random()} alt={"star"} style={{maxWidth:10}} src={"https://tix.vn/app/assets/img/icons/star1.png"} />,
                      <img key={Math.random()} alt={"star"} style={{maxWidth:10}} src={"https://tix.vn/app/assets/img/icons/star1.png"} />,
                      
                      )
                     
                   break;
                  case 2.5:
                    arrStart.push(
                      <img key={Math.random()} alt={"star"} style={{maxWidth:10}} src={"https://tix.vn/app/assets/img/icons/star1.png"} />,
                      <img key={Math.random()} alt={"star"} style={{maxWidth:10}} src={"https://tix.vn/app/assets/img/icons/star1.png"} />,
                     
                      <img key={Math.random()} alt={"star"} style={{maxWidth:10}} src={"https://tix.vn/app/assets/img/icons/star1.2.png"} />,
                      )
                      
                  break;
                  case 2:
                    arrStart.push(
                      <img key={Math.random()} alt={"star"} style={{maxWidth:10}} src={"https://tix.vn/app/assets/img/icons/star1.png"} />,
                      <img key={Math.random()} alt={"star"} style={{maxWidth:10}} src={"https://tix.vn/app/assets/img/icons/star1.png"} />,
                      
                      )
                     
                   break;
                  case 1.5:
                    arrStart.push(
                      <img key={Math.random()} alt={"star"} style={{maxWidth:10}} src={"https://tix.vn/app/assets/img/icons/star1.png"} />,
                     
                      <img key={Math.random()} alt={"star"} style={{maxWidth:10}} src={"https://tix.vn/app/assets/img/icons/star1.2.png"} />,
                      )
                      
                  break;
                  case 1:
                    arrStart.push(
                      <img key={Math.random()} alt={"star"} style={{maxWidth:10}} src={"https://tix.vn/app/assets/img/icons/star1.png"} />,
                    
                      
                      )
                     
                   break;
                  case 0.5:
                    arrStart.push(
                      <img key={Math.random()} alt={"star"} style={{maxWidth:10}} src={"https://tix.vn/app/assets/img/icons/star1.2.png"} />,
                    
                      
                      )
                     
                   break;
                  default:
                    arrStart.push(
                      <img key={Math.random()} alt={"star"} style={{maxWidth:10}}  src={"https://tix.vn/app/assets/img/icons/star1.png"} />,
                      <img key={Math.random()} alt={"star"} style={{maxWidth:10}} src={"https://tix.vn/app/assets/img/icons/star1.png"} />,
                      <img key={Math.random()} alt={"star"} style={{maxWidth:10}} src={"https://tix.vn/app/assets/img/icons/star1.png"} />,
                      <img key={Math.random()} alt={"star"} style={{maxWidth:10}} src={"https://tix.vn/app/assets/img/icons/star1.png"} />,
                      <img key={Math.random()} alt={"star"} style={{maxWidth:10}} src={"https://tix.vn/app/assets/img/icons/star1.png"} />
                    
                 )
                  break;
                   
                } 
          }else if(status === "detailMovie"){
              switch (danhgia) {
          
        
                  case 4 :
                    arrStart.push(
                      <StarIcon style={{color:"yellow"}}/>,
                      <StarIcon style={{color:"yellow"}}/>,
                      <StarIcon style={{color:"yellow"}}/>,
                      <StarIcon style={{color:"yellow"}}/>
                      )
                      
                  break;
                  case 4.5:
                    arrStart.push(
                      <StarIcon style={{color:"yellow"}}/>,
                      <StarIcon style={{color:"yellow"}}/>,
                      <StarIcon style={{color:"yellow"}}/>,
                      <StarIcon style={{color:"yellow"}}/>,
                      <StarHalfIcon style={{color:"yellow"}}/>
                      )

                  break;
                  
                  case 3: 
                    arrStart.push(
                      <StarIcon style={{color:"yellow"}}/>,
                      <StarIcon style={{color:"yellow"}}/>,
                      <StarIcon style={{color:"yellow"}}/>,
                   
                      
                      )
                   
                     break;
                  case 3.5:
                    arrStart.push(
                      <StarIcon style={{color:"yellow"}}/>,
                      <StarIcon style={{color:"yellow"}}/>,
                      <StarIcon style={{color:"yellow"}}/>,
                   
                      
                      <StarHalfIcon style={{color:"yellow"}}/>
                      )
                  break;
                  case 2:
                    arrStart.push(
                      <StarIcon style={{color:"yellow"}}/>,
                      <StarIcon style={{color:"yellow"}}/>,
                    
                      
                      )
                     
                   break;
                  case 1:
                    arrStart.push(
                      <StarIcon style={{color:"yellow"}}/>
                      )
                     
                   break;
                  default:
                    arrStart.push(
                      <StarIcon style={{color:"yellow"}}/>,
                    <StarIcon style={{color:"yellow"}}/>,
                    <StarIcon style={{color:"yellow"}}/>,
                    <StarIcon style={{color:"yellow"}}/>,
                    <StarIcon style={{color:"yellow"}}/>
                    
                 )
                  
                    break;
                }
          }
      return arrStart;
    
    
  }
  


  export default RenderStart;