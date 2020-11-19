import React, { useState,useEffect ,useCallback} from "react";
import ModalTrailer from "../../../screen/modal-video";
import ListCar from "./carousle.json"
// icon 
// swiper 
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y,Autoplay } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
// end swiper 

// router 
// install Swiper components

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y,Autoplay]);


function Carousel() {

  
  const [detailTrailer, setdetailTrailer] = useState("");
  const [show, setShow] = useState(false);
  const handleGetShow = (trailer) => {
    
    setdetailTrailer(trailer);
    setShow(true);
  };
useEffect(() => {
  if(show){
    document.body.style.cssText ="padding-right:-17px";

  }
}, [show])
  const handleClose = () => setShow(false);
  const renderSlide = useCallback(()=>{
    return ListCar.map((movie,index)=>{
      return <SwiperSlide  className="swiper-item" key={index} tag="div">
        
          {/* <Link to={`/phim/${movie.maPhim}`}> */}
          <img   src={movie.hinhAnh} alt=""/>
            <div   className="swiper-item__detail">
              <div onClick={()=>handleGetShow(movie.trailer)}   className="swiper-item--hover">

                <img src="https://tix.vn/app/assets/img/icons/play-video.png" alt=""/>
              </div>
            </div>
            {/* </Link> */}
      </SwiperSlide>
    })
  },[])


  return (
    < >
     <Swiper
     tag="section"
     id="carousel"
     effect="slide"
                             
      speed={1000}
      autoplay={{
        delay: 4000,
        
        disableOnInteraction: false
    }}
                         
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      // onSwiper={(swiper) => console.log(swiper)}
      // onSlideChange={() => console.log('slide change')}
    >
      {renderSlide()}
    
    </Swiper>
      <ModalTrailer trailer={detailTrailer} show={show} onHide={handleClose} />
    </>
  );
}
export default Carousel;
