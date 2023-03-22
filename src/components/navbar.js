import React, { Fragment, useContext, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Modal from "./modal/modal";
import { CgProfile } from "react-icons/cg";
import { Api } from "../utils/api";
import { toast } from "react-toastify";
import axios from "axios";
import Loading from "./loading";
import Image from "../assets/login.jpg";
import UserContext from "../utils/userContext";

function Navbar() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState("");
  const [loading, setLoading] = useState(false);
  const [trendingNews, setTrendingNews] = useState([]);
  const [values, setValues] = useState({ email: "", password: "", name: "", c_password: "" });
  const [userInfo, setUserInfo] = useState(null);
  const [isLocalStorageUpdated, setIsLocalStorageUpdated] = useState(false);
  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!values.email || !values.password || !values.c_password || !values.name) return toast.warning("Email, password, name and confirm password is required");
    if (values.password !== values.c_password) return toast.warning("password and confirm password not match");
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("c_password", values.c_password);
    const response = await Api("post", "register", formData);
    if (response.data?.statusCode === 200) {
      setValues({ email: "", password: "", name: "", c_password: "" });
      setActionType("login");
      toast.success("user registered successfully");
    } else {
      toast.error(response.data?.message);
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!values.email || !values.password) return toast.warning("Email and password is required");
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    const response = await Api("post", "login", formData);
    if (response.data?.code === 200) {
      toast.success("user logged in successfully");
      localStorage.setItem("auth-token", response.data?.token);
      setShowModal(false);
      setIsLocalStorageUpdated(!isLocalStorageUpdated);
      setUser(response.data.data);
      navigate("/news-feed");
    } else {
      toast.error(response.data?.msg);
    }
  };
  const topTrendingNews = async () => {
    setLoading(true);
    axios
      .get(`https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${process.env.REACT_APP_NYC_API_KEY}`)
      .then((response) => {
        setTrendingNews(response.data?.results);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error);
      });
  };
  const forgotPassword = async (e) => {
    e.preventDefault();
    if (!values.email) return toast.warning("Email is required");
    const formData = new FormData();
    formData.append("email", values.email);
    const response = await Api("post", "forgot-password", formData);
    if (response.data?.code === 200) {
      setActionType("changePassword");
      setValues({ email: "", password: "", name: "", c_password: "" });
      setUserInfo(response.data.message);
    } else {
      toast.error(response.data?.message);
    }
  };
  const updatePassword = async (e) => {
    e.preventDefault();
    if (!values.password) return toast.warning("password is required");
    const formData = new FormData();
    formData.append("password", values.password);
    const response = await Api("post", `reset-password/${userInfo?.id}`, formData);
    if (response.data?.code === 200) {
      setActionType("login");
      toast.success("password updated successfully");
      setValues({ email: "", password: "", name: "", c_password: "" });
    } else {
      toast.error(response.data?.message);
    }
  };
  useEffect(() => {
    topTrendingNews();
  }, []);
  return (
    <Fragment>
      {loading && <Loading />}
      <div className="container-fluid">
        <div className="row align-items-center bg-light px-lg-5">
          <div className="col-12 col-md-8">
            <div className="d-flex justify-content-between">
              <div className="bg-primary text-white text-center py-2" style={{ width: "100px" }}>
                Trending
              </div>
              <marquee className="my-auto">{trendingNews?.slice(0, 3)?.map((ele, index) => ele?.title + ". ")}</marquee>
            </div>
          </div>
          {localStorage.getItem("auth-token") ? (
            <div className="col-md-3 text-right ">
              <span
                onClick={() => {
                  setUser(null);
                  localStorage.removeItem("auth-token");
                  setIsLocalStorageUpdated(!isLocalStorageUpdated);
                  navigate("/");
                }}
                style={{ cursor: "pointer" }}
              >
                Logout
              </span>
            </div>
          ) : (
            <div className="col-md-3 text-right ">
              <span
                onClick={() => {
                  setValues({ email: "", password: "", name: "", c_password: "" });
                  setActionType("login");
                  setShowModal(true);
                }}
                style={{ cursor: "pointer" }}
              >
                Login{" "}
              </span>
              /
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setValues({ email: "", password: "", name: "", c_password: "" });
                  setActionType("register");
                  setShowModal(true);
                }}
              >
                {" "}
                Register
              </span>
            </div>
          )}
          <div className="col-md-1 text-right ">{localStorage.getItem("auth-token") && <CgProfile onClick={() => navigate("/profile")} style={{ cursor: "pointer" }} size={20} />}</div>
        </div>
        <div className="row align-items-center py-2 px-lg-5">
          <div className="col-lg-4">
            <span className="navbar-brand d-none d-lg-block" style={{ cursor: "pointer" }}>
              <h1 className="m-0 display-5 text-uppercase">
                <span className="text-primary">News</span>Room
              </h1>
            </span>
          </div>
          <div className="col-lg-8 text-center text-lg-right"></div>
        </div>
      </div>
      <div className="container-fluid p-0 mb-3">
        <nav className="navbar navbar-expand-lg bg-light navbar-light py-2 py-lg-0 px-lg-5">
          <span className="navbar-brand d-block d-lg-none" style={{ cursor: "pointer" }}>
            <h1 className="m-0 display-5 text-uppercase">
              <span className="text-primary">News</span>Room
            </h1>
          </span>
          <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-between px-0 px-lg-3" id="navbarCollapse">
            <div className="navbar-nav mr-auto py-0">
              {!localStorage.getItem("auth-token") && (
                <span onClick={() => navigate("/")} className="nav-item nav-link active">
                  Home
                </span>
              )}

              {localStorage.getItem("auth-token") ? (
                <span onClick={() => navigate("/news-feed")} className="nav-item nav-link">
                  News Feed
                </span>
              ) : null}
              <span onClick={() => navigate("/contact")} className="nav-item nav-link">
                Contact
              </span>
            </div>
          </div>
        </nav>
      </div>
      <Modal showModal={showModal} closeModal={() => setShowModal(false)}>
        <div className="container-fluid">
          <div className="row d-flex flex-wrap">
            <div className="col-lg-6 col-md-6 col-sm-10 col-12 p-4">
              <h2 className="text-center mt-3">{actionType === "login" ? "Login" : actionType === "forgot" ? "Forgot Password" : actionType === "changePassword" ? "Update password" : "Register"}</h2>
              <form onSubmit={actionType === "login" ? handleLogin : actionType === "register" ? handleRegister : actionType === "forgot" ? forgotPassword : updatePassword}>
                {actionType === "register" && (
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input type="text" required className="form-control" id="name" value={values.name} name="name" onChange={handleChange} />
                  </div>
                )}
                {actionType !== "changePassword" && (
                  <div className={actionType === "forgot" ? "mb-3 mt-5" : "mb-3"}>
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email address
                    </label>
                    <input type="email" required className="form-control" name="email" value={values.email} onChange={handleChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                  </div>
                )}
                {actionType !== "forgot" && (
                  <div className={actionType === "changePassword" ? "mb-3 mt-5" : "mb-3"}>
                    <label htmlFor="exampleInputPassword1" className="form-label">
                      Password
                    </label>
                    <input type="password" required className="form-control" name="password" value={values.password} onChange={handleChange} id="exampleInputPassword1" />
                    {actionType === "login" && (
                      <div
                        className="form-text fw-bold my-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setValues({ email: "", password: "", name: "", c_password: "" });
                          setActionType("forgot");
                        }}
                      >
                        forgot password ?
                      </div>
                    )}
                  </div>
                )}
                {actionType === "register" && (
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                      Confirm Password
                    </label>
                    <input type="password" required className="form-control" name="c_password" value={values.c_password} onChange={handleChange} id="exampleInputPassword1" />
                  </div>
                )}
                <button type="submit" className="btn btn-primary">
                  {actionType === "login" ? "Login" : actionType === "register" ? "Register" : actionType === "changePassword" ? "Update" : "Forgot Password"}
                </button>
              </form>
            </div>
            <div className="col-lg-6 col-md-6 d-none d-lg-block d-md-block">
              <img src={Image} alt="LOGO" style={{ height: 400, width: "100%" }} />
            </div>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
}

export default Navbar;
