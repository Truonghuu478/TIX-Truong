import React, { Fragment, useCallback, useMemo, useRef } from "react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Box } from "@material-ui/core";
import { Swiper, SwiperSlide } from "swiper/react";
import VoucherStyles from "./voucherStyle";
// import bannerBHD59k from "../../../../../public/img/voucher/bhd-59k-voucher.jpg";
// import bannerBHD1k from "../../../../../public/img/voucher/bhd-1k-voucher.jpg";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const urlPublic = process.env.PUBLIC_URL;
export default function VoucherOne() {
  const classes = VoucherStyles();
  let boxRef = useRef();
  const arrTotals = useMemo(
    () => [
      {
        hinhAnh: "/img/voucher/bhd-59k-voucher.jpg",
        title: "BHD 59K/VÉ CẢ TUẦN !!!",
      },
      {
        hinhAnh: "/img/voucher/bhd-1k-voucher.jpg",
        title: "TIX 1K/VÉ NGẠI CHI GIÁ VÉ",
      },
    ],
    []
  );

  const renderBannerVoucher = useCallback(() => {
    return arrTotals.map((item, index) => {
      return (
        <SwiperSlide className={classes.BoxBanner} key={index} tag={"div"}>
          <Box ref={boxRef} component="div" className={classes.BoxImg}>
            <img
              src={urlPublic + item.hinhAnh}
              alt={item.title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = urlPublic + "/img/voucher/default-trailer.webp";
              }}
            />
          </Box>
        </SwiperSlide>
      );
    });
    // eslint-disable-next-line
  }, [arrTotals]);
  const handleChangeSlide = (e) => {
    let { slides, snapIndex } = e;

    // let indexFind = slides.findIndex((slide, index) => index === snapIndex);
    // slides[indexFind]
    boxRef.current = slides[snapIndex].childNodes[0];
    // console.log(boxRef);
    boxRef.current.style = "transform:scale(1)";
    slides.forEach((slide) => {
      if (slide.childNodes[0] !== boxRef.current) {
        slide.childNodes[0].style = "transform:scale(0.8)";
      }
    });
    // let findSlide = arrSlide.findIndex((slide,index)=>slide)
  };
  return (
    <Fragment>
      <Box className={classes.root}>
        <Swiper
          effect="slide"
          speed={1000}
          tag="section"
          id="simple-tab-0"
          loop={true}
          autoplay={{
            delay: 2500,

            disableOnInteraction: false,
          }}
          //   pagination
          spaceBetween={0}
          slidesPerView={1}
          onSlideChange={(e) => handleChangeSlide(e)}
          onSwiper={(swiper) => {
            boxRef.current = swiper.slides[0].childNodes[0];

            boxRef.current.style = "transform:scale(1)";
          }}
        >
          {renderBannerVoucher()}
        </Swiper>
      </Box>
    </Fragment>
  );
}
