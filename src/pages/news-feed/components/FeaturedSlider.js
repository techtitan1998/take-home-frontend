import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./slider.css";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import moment from "moment";
import axios from "axios";
import UserContext from "../../../utils/userContext";
const FeaturedSlider = () => {
  const { user } = useContext(UserContext);
  const [topNews, setTopNews] = useState([]);
  const getTopNews = async () => {
    let query;
    if (user) {
      let parseCategory = user && JSON.parse(user?.categories);
      query = parseCategory?.join(";");
    }
    await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?section=${query}&api-key=${process.env.REACT_APP_NYC_API_KEY}`).then((response) => {
      setTopNews(response.data?.response?.docs);
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
        <SwiperSlide className="featured-slider-slide" key={index} virtualIndex={index} style={{ cursor: "pointer" }} onClick={() => window.open(news?.web_url, "_blank")}>
          <img src={"https://static01.nyt.com/" + news?.multimedia[news?.multimedia?.length - 1]?.url} alt="" />
          <div className="slider-content">
            <p>
              {news?.section_name} / {moment(news?.pub_date).format("MMMM DD,YYYY")}
            </p>
            <h4>{news?.abstract?.slice(0, 30)}</h4>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default FeaturedSlider;
