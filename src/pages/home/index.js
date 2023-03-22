import axios from "axios";
import React, { useEffect, useState } from "react";
import FeaturedSlider from "./components/FeaturedSlider";
import MainSlider from "./components/MainSlider";
import Loading from "../../components/loading";
import { toast } from "react-toastify";

const Index = () => {
  const [topNews, setTopNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const getTopNews = async () => {
    setLoading(true);
    await axios
      .get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.REACT_APP_OPEN_API_KEY}`)
      .then((response) => {
        setTopNews(response.data?.articles);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error);
        setLoading(false);
      });
  };
  useEffect(() => {
    getTopNews();
  }, []);
  return (
    <div className="container-fluid">
      {loading ? <Loading /> : null}
      <div className="row mt-3 px-lg-5">
        <div className="col-lg-8 col-md-12 col-sm-12">
          <MainSlider />
        </div>
        <div className="col-lg-4 col-md-12 col-sm-12">
          {topNews?.slice(0, 2)?.map((news, index) => (
            <div className="position-relative overflow-hidden mb-3" style={{ height: "167px", cursor: "pointer" }} onClick={() => window.open(news?.url, "_blank")} key={index}>
              <img className="img-fluid w-100 h-100" src={news?.urlToImage} alt="" style={{ objectFit: "cover" }} />
              <p className="position-absolute bottom-0 text-white fw-bold mt-1" style={{ marginLeft: 10, fontSize: 14, textDecoration: "underline" }}>
                {news?.title?.slice(0, 60)}
                {news?.title?.length >= 60 && "..."}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="row mt-3 px-lg-5">
        <div className="d-flex align-items-center justify-content-between bg-light py-2 mb-3">
          <h3 className="m-0">Featured</h3>
        </div>
        <FeaturedSlider />
      </div>
    </div>
  );
};

export default Index;
