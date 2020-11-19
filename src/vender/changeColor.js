
import React from 'react'


const changeColor =()=>{
    switch (props.maHeThongRap){
      case "BHDStar":{
          return "#8bc541";
      };case "CGV":{
        return "red"
      };case "CineStar":{
        return "#e04e7e"
      };case "Galaxy":{
        return "#fa6838"
      }case "LotteCinima"  :{
        return "#cc483f"
      }
      default :{
        return "#e9b537"
      }
    }
}

export default changeColor;