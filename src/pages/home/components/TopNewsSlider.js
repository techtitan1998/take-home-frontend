import React from "react";
import "./slider.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";
const Slider = () => {
  return (
    <div className="container-fluid py-2 py-lg-0 px-lg-5">
      <Swiper
        slidesPerView={3}
        breakpoints={{
          200: { slidesPerView: 1, spaceBetween: 10 },
          300: { slidesPerView: 1, spaceBetween: 10 },
          400: { slidesPerView: 1, spaceBetween: 10 },
          500: { slidesPerView: 2, spaceBetween: 20 },
          630: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 30 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
          1124: { slidesPerView: 3, spaceBetween: 30 },
        }}
        spaceBetween={30}
        navigation={true}
        scrollbar={true}
        loop={true}
        autoplay
        modules={[Navigation]}
        className="mySwiper px-lg-3"
      >
        {topNews?.map((news, index) => (
          <SwiperSlide className="slider-container" key={index} virtualIndex={index}>
            <div className="slider-img">
              <img src={news?.urlToImage} alt="news" />
            </div>
            <p className="text-underline" onClick={() => window.open(news?.url, "_blank")}>
              {news?.title?.slice(0, 60)}
              {news?.title?.length >= 60 && "..."}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
