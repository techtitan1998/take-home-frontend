import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Loading from "../../components/loading";

const Index = () => {
  const getQueryParams = () =>
    window.location.search
      .replace("?", "")
      .split("&")
      .reduce((r, e) => ((r[e.split("=")[0]] = decodeURIComponent(e.split("=")[1])), r), {});
  const { id } = getQueryParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const getArticleById = async () => {
    setLoading(true);
    await axios
      .get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=_id:"${id}"&api-key=${process.env.REACT_APP_NYC_API_KEY}`)
      .then((response) => {
        setArticle(response.data?.response?.docs[0]);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getArticleById();
  }, []);
  return (
    <div className="container-fluid px-lg-5">
      {loading ? <Loading /> : null}
      <div className="row px-lg-3">
        <div className="col-lg-12">
          <article>
            <header className="mb-4">
              <h3 className="fw-bolder mb-1">{article?.abstract}</h3>
              <div className="text-muted fst-italic mb-2">
                Posted on {moment(article?.pub_date).format("MMMM DD,YYYY")} {article?.byline?.original}
              </div>
              {article?.keywords?.map((ele, index) => (
                <span className="badge bg-secondary text-decoration-none link-light mx-1" key={index}>
                  {ele?.value}
                </span>
              ))}
            </header>
            <figure className="mb-4">
              <img className="img-fluid rounded" style={{ height: "400px", width: "100%" }} src={"https://static01.nyt.com/" + article?.multimedia[article?.multimedia?.length - 1]?.url} alt="..." />
            </figure>
            <section className="mb-5">
              <p className="fs-5 mb-4">{article?.lead_paragraph}</p>
              <button className="btn btn-primary" onClick={() => window.open(article?.web_url, "_blank")}>
                Read more
              </button>
            </section>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Index;
