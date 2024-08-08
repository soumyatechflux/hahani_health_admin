import React, { useEffect } from 'react';
import axios from 'axios';
import { decryptData } from "./Component/CRYPTO/crypto.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_AQATO_AGENT_APPLICANT_PORTAL_BASE_API_URL,
  timeout: 30000,
});

const axiosInstanceNoAuth = axios.create({
  baseURL: process.env.REACT_APP_AQATO_AGENT_APPLICANT_PORTAL_BASE_API_URL,
  timeout: 30000,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { navigate } = require("react-router-dom");
    if (
      error?.response &&
      error?.response?.data &&
      error?.response?.data?.message === "Expired token"
    ) {
      //toast.error("Time elapsed, Please log in again!");
      console.log("Expired token error....");
      localStorage.clear();
      navigate("/");
    }
    return Promise.reject(error);
  }
);

export function authorizeMe() {
  const encryptedToken = localStorage.getItem("encryptedTokenForAdminOfHanaiHealth");

  const token = decryptData(encryptedToken);

  if (token && token !== null && token !== undefined) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
}

axiosInstance.interceptors.request.use(async (config) => {
  await authorizeMe();
  return config;
});

export async function LoginAPI(data) {
  try {
    const response = await axiosInstanceNoAuth.post(`/adminauth/login`, data);

    return response;
  } catch (error) {
    throw error;
  }
}

export async function LoginOtpAPI(data) {
  try {
    const response = await axiosInstanceNoAuth.post(`/adminauth/verifyotp`, data);

    return response;
  } catch (error) {
    throw error;
  }
}

export async function AddVenderAPI(data) {
  try {
    const response = await axiosInstance.post(`/admin/addvendor`, data);

    return response;
  } catch (error) {
    throw error;
  }
}

export async function GetVenderAPI() {
  try {
    const response = await axiosInstance.get(`/admin/getvendors`);

    return response;
  } catch (error) {
    throw error;
  }
}

export async function GetUserAPI() {
  try {
    const response = await axiosInstance.get(`/admin/getusers`);

    return response;
  } catch (error) {
    throw error;
  }
}

export async function GetVenderAPIById(data) {
  try {
    const response = await axiosInstance.post(`/admin/getvendorbyid`, data);

    return response;
  } catch (error) {
    throw error;
  }
}

export async function EditVenderAPI(data) {
  try {
    const response = await axiosInstance.post(`/admin/editvendor`, data);

    return response;
  } catch (error) {
    throw error;
  }
}

export async function DeleteVendorAPI(data) {
  try {
    const response = await axiosInstance.post(`/admin/deletevendor`, data);

    return response;
  } catch (error) {
    throw error;
  }
}

export async function DeleteUserAPI(data) {
  try {
    const response = await axiosInstance.post(`/admin/deleteuser`, data);

    return response;
  } catch (error) {
    throw error;
  }
}

export async function GetUserAPIById(data) {
  try {
    const response = await axiosInstance.post(`/admin/getuserbyid`, data);

    return response;
  } catch (error) {
    throw error;
  }
}

export async function AddUserAPI(data) {
  try {
    const response = await axiosInstance.post(`/admin/adduser`, data);

    return response;
  } catch (error) {
    throw error;
  }
}

export async function EditUserAPI(data) {
  try {
    const response = await axiosInstance.post(`/admin/edituser`, data);

    return response;
  } catch (error) {
    throw error;
  }
}

export async function GetBillsAPI() {
  try {
    const response = await axiosInstance.get(`/admin/getbills`);

    return response;
  } catch (error) {
    throw error;
  }
}

export async function IsActiveUserAPI(data) {
  try {
    const response = await axiosInstance.post(`/admin/getisactiveusers`, data);

    return response;
  } catch (error) {
    throw error;
  }
}

export async function IsActiveVendorAPI(data) {
  try {
    const response = await axiosInstance.post(`/admin/getisactivevendors`, data);

    return response;
  } catch (error) {
    throw error;
  }
}

const App = () => {
  useEffect(() => {
    authorizeMe();
  }, []);

  // Your component code here

  return (
  <>
  </>
  );
};

export default App;
export { axiosInstance , axiosInstanceNoAuth};