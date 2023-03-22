import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./slider.css";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import moment from "moment";
import axios from "axios";
const FeaturedSlider = () => {
  const [topNews, setTopNews] = useState([]);
  const getTopNews = async () => {
    await axios.get(`https://content.guardianapis.com/search?show-featured=true&show-fields=thumbnail,body&api-key=${process.env.REACT_APP_GUARDIAN_API_KEY}`).then((response) => {
      setTopNews(response.data?.response?.results);
    });
  };
  useEffect(() => {
    getTopNews();
  }, []);
  return (
    <Swiper
      navigation={true}
      slidesPerView={3}
      breakpoints={{
        200: { slidesPerView: 1, spaceBetween: 10 },
        300: { slidesPerView: 1, spaceBetween: 10 },
        400: { slidesPerView: 1, spaceBetween: 10 },
        500: { slidesPerView: 2, spaceBetween: 20 },
        630: { slidesPerView: 3, spaceBetween: 20 },
        768: { slidesPerView: 3, spaceBetween: 30 },
        1024: { slidesPerView: 4, spaceBetween: 30 },
        1124: { slidesPerView: 4, spaceBetween: 30 },
      }}
      spaceBetween={30}
      scrollbar={true}
      loop={true}
      autoplay
      modules={[Navigation]}
      className="featured-slider-container"
    >
      {topNews?.map((news, index) => (
        <SwiperSlide className="featured-slider-slide" key={index} virtualIndex={index} style={{ cursor: "pointer" }} onClick={() => window.open(news?.webUrl, "_blank")}>
          <img src={news?.fields?.thumbnail} alt="" />
          <div className="slider-content">
            <p>
              {news?.sectionName} / {moment(news?.webPublicationDate).format("MMMM DD,YYYY")}
            </p>
            <h4>{news?.webTitle?.slice(0, 30)}</h4>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default FeaturedSlider;
