import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/loading";
import Card from "./components/card";

const Index = () => {
  const { category } = useParams();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const getNewsAgainstCatgegories = async () => {
    setLoading(true);
    await axios
      .get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${category}&fq=news_desk:(${category.charAt(0).toUpperCase() + category.slice(1)})&api-key=${process.env.REACT_APP_NYC_API_KEY}`)
      .then((response) => {
        setList(response.data?.response?.docs);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getNewsAgainstCatgegories();
  }, []);
  return (
    <div className="container-fluid">
      {loading ? <Loading /> : null}
      <div className="row mt-3 px-lg-5 d-flex flex-wrap">
        {list?.map((news, index) => (
          <div className="col-lg-3 col-md-6 col-sm-12 col-12" key={index}>
            <Card title={news?.abstract} tags={news?.keywords} key={index} thumbnail={news?.multimedia[news?.multimedia?.length - 1]?.url} _id={news?._id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
