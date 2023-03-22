import React, { useEffect, useState } from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import "./App.css";
import UserContext from "./utils/userContext";
import { Api } from "./utils/api";
const App = () => {
  const [user, setUser] = useState(null);
  const getProfile = async () => {
    const response = await Api("get", "show-profile");
    if (response.data?.code === 200) {
      setUser(response.data.data);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);

  const content = useRoutes(routes);
  const values = { user, setUser };
  return (
    <UserContext.Provider value={values}>
      <div style={{ minHeight: "100vh" }}>{content}</div>
    </UserContext.Provider>
  );
};

export default App;
