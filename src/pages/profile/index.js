import React, { useEffect, useState } from "react";
import "./styles.css";
import { Api } from "../../utils/api";
import { toast } from "react-toastify";
import Loading from "../../components/loading";
import Avatar from "../../assets/avatarIcon.png";
import { API_IMG_URL } from "../../utils/constant";
import { RxCross2 } from "react-icons/rx";
const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({ img: null, name: "", email: "", phone: "", gender: "", age: "", password: "", city: "", address: "", categories: [], authors: [] });
  const [inputCategoryValue, setInputCategoryValue] = useState(null);
  const [inputAuthorsValue, setInputAuthorsValue] = useState(null);
  const handleChange = (e) => setValues({ ...values, [e.target.id]: e.target.value });
  const updateProfile = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("image", values.img);
    formData.append("phone_number", values.phone);
    formData.append("password", values.password);
    formData.append("gender", values.gender);
    formData.append("age", values.age);
    formData.append("address", values.address);
    formData.append("categories", JSON.stringify(values.categories));
    formData.append("author_name", JSON.stringify(values.authors));
    const response = await Api("post", `profile-update/${values.user_id}`, formData);
    if (response.data?.code === 200) {
      setLoading(false);
      toast.success("profile updated successfully");
    } else {
      setLoading(false);
      toast.error(response.data?.msg);
    }
  };
  const getProfile = async () => {
    setLoading(true);
    const response = await Api("get", "show-profile");
    if (response.data?.code === 200) {
      setLoading(false);
      const data = response.data.data;
      setValues({
        ...values,
        name: data?.name,
        email: data?.email,
        phone: data?.phone_number,
        gender: data?.gender,
        address: data?.address,
        user_id: data?.id,
        age: data?.age,
        image: data?.image,
        authors: data?.author_name ? JSON.parse(data?.author_name) : [],
        categories: JSON.parse(data?.categories),
      });
    } else {
      setLoading(false);
      toast.error(response.data?.msg);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  const handleRemoveCat = (i) => setValues({ ...values, categories: [...values.categories.filter((e, j) => j !== i)] });
  const handleKeyDown = (event) => {
    if (!inputCategoryValue) return;
    if (event.key === "Enter") {
      if (values.categories.includes(inputCategoryValue)) {
        alert("Error: categories already exists");
        setInputCategoryValue("");
      } else {
        setValues({ ...values, categories: [...values.categories, inputCategoryValue] });
        setInputCategoryValue("");
      }
    }
  };
  const handleRemoveAuthors = (i) => setValues({ ...values, authors: [...values.authors.filter((e, j) => j !== i)] });
  const handleAuthors = (event) => {
    if (!inputAuthorsValue) return;
    if (event.key === "Enter") {
      if (values.authors.includes(inputAuthorsValue)) {
        alert("Error: authors already exists");
        setInputAuthorsValue("");
      } else {
        setValues({ ...values, authors: [...values.authors, inputAuthorsValue] });
        setInputAuthorsValue("");
      }
    }
  };
  return (
    <div className="container-fluid px-lg-5">
      {loading && <Loading />}
      <div className="row gutters px-lg-3">
        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
          <div className="card h-100" style={{ background: "#f5f5f5" }}>
            <div className="card-body">
              <div className="account-settings">
                <div className="user-profile">
                  <label htmlFor="profile">
                    <div className="user-avatar">
                      <img src={values?.image ? API_IMG_URL + values?.image : values.img ? URL.createObjectURL(values.img) : Avatar} alt="Maxwell Admin" />
                    </div>
                    <input id="profile" type={"file"} onChange={(e) => setValues({ ...values, img: e.target.files[0] })} className="d-none" accept="image/*" />
                  </label>
                  <h5 className="user-name">{values.name}</h5>
                  <h6 className="user-email">{values.email}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
          <div className="card h-100">
            <div className="card-body">
              <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <h6 className="mb-2 text-primary">Personal Details</h6>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 my-2">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" value={values.name || ""} id="name" placeholder="Enter Name" onChange={handleChange} />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 my-2">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" readOnly className="form-control" value={values.email || ""} id="email" placeholder="Enter email" onChange={handleChange} />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 my-2">
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input type="text" className="form-control" value={values.phone || ""} id="phone" placeholder="Enter phone number" onChange={handleChange} />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 my-2">
                  <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <select class="form-select" onChange={handleChange} defaultValue={values.gender || ""} id="gender">
                      <option selected disabled>
                        Select Gender
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 my-2">
                  <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input type="number" autoComplete={false} className="form-control" value={values.age || ""} id="age" placeholder="Enter age" onChange={handleChange} />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 my-2">
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" value={values.password || ""} id="password" placeholder="Enter password" onChange={handleChange} />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 my-2">
                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" className="form-control" value={values.address || ""} id="address" placeholder="Enter address" onChange={handleChange} />
                  </div>
                </div>
              </div>
              <div className="row gutters mt-3">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <h6 className="mb-2 text-primary">News Feed</h6>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 my-2">
                  <div className="form-group">
                    <label htmlFor="name">Categories</label>
                    <input type="text" className="form-control" placeholder="Press enter to add categories" onChange={(newValue) => setInputCategoryValue(newValue.target.value)} onKeyDown={handleKeyDown} value={inputCategoryValue || ""} />
                  </div>
                  {values.categories?.map((ele, index) => (
                    <span class="badge bg-secondary my-1 mx-1" key={index}>
                      {ele}
                      <RxCross2 style={{ marginLeft: 10, cursor: "pointer" }} onClick={handleRemoveCat} />
                    </span>
                  ))}
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 my-2">
                  <div className="form-group">
                    <label htmlFor="email">Authors</label>
                    <input type="text" className="form-control" placeholder="Press enter to add authors" onChange={(newValue) => setInputAuthorsValue(newValue.target.value)} onKeyDown={handleAuthors} value={inputAuthorsValue || ""} />
                  </div>
                  {values.authors?.map((ele, index) => (
                    <span class="badge bg-secondary my-1 mx-1" key={index}>
                      {ele}
                      <RxCross2 style={{ marginLeft: 10, cursor: "pointer" }} onClick={handleRemoveAuthors} />
                    </span>
                  ))}
                </div>
              </div>

              <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                  <div style={{ float: "right" }}>
                    <button className="btn btn-primary" onClick={updateProfile}>
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
