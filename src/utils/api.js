// utils/api.js
import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const apiRequest = async (method, endpoint, options = {}) => {
  const { data, params, headers } = options;
  const token = localStorage.getItem("access_token");

  try {
    const isFormData = data instanceof FormData;

    const response = await axios({
      method,
      url: `${BASE_URL}${endpoint}`,
      data,
      params,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
        ...(isFormData ? {} : { "Content-Type": "application/json" }), // don't set Content-Type for FormData
      },
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Something went wrong!");
    } else {
      throw new Error("Server not reachable!");
    }
  }
};


