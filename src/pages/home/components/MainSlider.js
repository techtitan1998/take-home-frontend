import React, { useEffect, useState } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "./slider.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import moment from "moment";
import axios from "axios";

export default function MainSlider() {
  const [topNews, setTopNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const getTopNews = async () => {
    setLoading(true);
    await axios
      .get(`https://api.nytimes.com/svc/mostpopular/v2//viewed/7.json?api-key=${process.env.REACT_APP_NYC_API_KEY}`)
      .then((response) => {
        setTopNews(response.data?.results);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getTopNews();
  }, []);
  return (
    <Swiper navigation={true} loop={true} autoplay={{ delay: 3000, disableOnInteraction: false }} modules={[Navigation]} className="banner-slider-container">
      {topNews?.map((news, index) => (
        <SwiperSlide className="main-slider-slide" key={index} onClick={() => window.open(news?.url, "_blank")} style={{ cursor: "pointer" }}>
          <img src={news?.media[news?.media?.length - 1]?.["media-metadata"][news?.media[news?.media?.length - 1]?.["media-metadata"]?.length - 1]?.url} alt="" />
          <div className="slider-content">
            <p>
              {news?.section} / {moment(news?.updated).format("MMMM DD,YYYY")}
            </p>
            <h4>{news?.title}</h4>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
