import axios from "axios";
import { API_BASE_URL } from "./constant";

export const Api = async (method, route, data) => {
  const promise = axios({
    method: method,
    url: `${API_BASE_URL}/${route}`,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("auth-token"),
      "content-type": "multipart/form-data",
      "ngrok-skip-browser-warning": true,
    },
    data: data,
  });
  const response = await promise
    .then((response) => {
      return response;
    })
    .catch((err) => {
      if (err.response?.status === 404) {
        return err?.response;
      } else if (err.response?.status === 403 || err.response?.status === 401) {
        return err?.response;
      } else {
        return err?.response;
      }
    });

  return response;
};
