import React from "react";
import { useNavigate } from "react-router-dom";
import "./card.css";
const Card = ({ title, tags, thumbnail, _id }) => {
  const navigate = useNavigate();
  return (
    <div className="news-card" onClick={() => navigate(`/article-detail?id=${_id}`)} style={{ cursor: "pointer" }}>
      <div className="news-image">
        <img src={`https://static01.nyt.com/` + thumbnail} alt="News Image" />
      </div>
      <div className="news-content">
        <div className="news-tags">
          {tags &&
            tags?.slice(0, 1)?.map((tag, index) => (
              <span className="tag" key={index}>
                {tag?.value}
              </span>
            ))}
          <span className="tag">Election</span>
        </div>
        <h2 className="news-title">
          {title && title?.slice(0, 100)}
          {title && title?.length > 100 && "..."}
        </h2>
      </div>
    </div>
  );
};

export default Card;
