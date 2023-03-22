import React, { Fragment, useContext, useEffect, useState } from "react";
import { AiFillYoutube, AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import Loading from "../components/loading";
import axios from "axios";
import UserContext from "../utils/userContext";
const Footer = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const getCategories = async () => {
    setLoading(true);
    await axios
      .get(`https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=${process.env.REACT_APP_NYC_API_KEY}`)
      .then((response) => {
        setCategories(response.data?.results);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <Fragment>
      {loading ? <Loading /> : null}
      <div className="container-fluid bg-light pt-5 px-sm-3 px-md-5">
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-5">
            <span onClick={() => navigate("/")} style={{ cursor: "pointer" }} className="navbar-brand">
              <h1 className="mb-2 mt-n2 display-5 text-uppercase">
                <span className="text-primary">News</span>Room
              </h1>
            </span>
            <p>Volup amet magna clita tempor. Tempor sea eos vero ipsum. Lorem lorem sit sed elitr sed kasd et</p>
            <div className="d-flex justify-content-start mt-4">
              {[<AiOutlineTwitter />, <FaFacebookF />, <FaLinkedinIn />, <AiOutlineInstagram />, <AiFillYoutube />].map((e, i) => (
                <span className="btn btn-outline-secondary text-center mr-2 px-0" style={{ width: "38px", height: "38px" }} key={i}>
                  {e}
                </span>
              ))}
            </div>
          </div>
          <div className="col-lg-6 col-md-6 mb-5">
            <h4 className="font-weight-bold mb-4">Categories</h4>
            <div className="d-flex flex-wrap m-n1">
              {(user ? (user?.categories?.length > 0 ? JSON.parse(user?.categories) : categories?.slice(0, 25)) : categories?.slice(0, 25))?.map((e, i) => (
                <span
                  className="btn btn-sm btn-outline-secondary m-1 text-capitalize"
                  key={i}
                  onClick={() => (user ? (user?.categories?.length > 0 ? navigate(`/categories/${e}`) : navigate(`/categories/${e?.section}`)) : navigate(`/categories/${e?.section}`))}
                >
                  {user ? e : e?.display_name}
                </span>
              ))}
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-5">
            <h4 className="font-weight-bold mb-4">Quick Links</h4>
            <div className="d-flex flex-column justify-content-start">
              <span className="text-secondary" onClick={() => navigate("/contact")} style={{ cursor: "pointer" }}>
                <MdOutlineArrowForwardIos className="mr-2" />
                Contact
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid py-4 px-sm-3 px-md-5">
        <p className="m-0 text-center">&copy; All Rights Reserved. </p>
      </div>
    </Fragment>
  );
};

export default Footer;
