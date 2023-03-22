import React, { useContext, useEffect, useState } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "./slider.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import moment from "moment";
import axios from "axios";
import UserContext from "../../../utils/userContext";

export default function MainSlider() {
  const { user } = useContext(UserContext);
  const [topNews, setTopNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const getTopNews = async () => {
    setLoading(true);
    await axios
      .get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${user && JSON.parse(user?.categories)?.[0]}&fq=news_desk:(${user && JSON.parse(user?.categories)?.[0]})&api-key=${process.env.REACT_APP_NYC_API_KEY}`)
      .then((response) => {
        setTopNews(response.data?.response?.docs);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getTopNews();
  }, []);
  console.log(topNews);
  return (
    <Swiper navigation={true} loop={true} autoplay={{ delay: 3000, disableOnInteraction: false }} modules={[Navigation]} className="banner-slider-container">
      {topNews?.slice(2, 9)?.map((news, index) => (
        <SwiperSlide className="main-slider-slide" key={index} onClick={() => window.open(news?.web_url, "_blank")} style={{ cursor: "pointer" }}>
          <img src={"https://static01.nyt.com/" + news?.multimedia[news?.multimedia?.length - 1]?.url} alt="" />
          <div className="slider-content">
            <p>
              {news?.section_name} / {moment(news?.pub_date).format("MMMM DD,YYYY")}
            </p>
            <h4>{news?.abstract}</h4>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
