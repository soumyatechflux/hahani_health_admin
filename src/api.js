import axios from "axios";
import { decryptData } from "./Component/CRYPTO/crypto.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_HANAI_ADMIN_APPLICANT_PORTAL_BASE_API_URL,
  timeout: 30000,
});

// Create a new Axios instance without setting the Authorization header
const axiosInstanceNoAuth = axios.create({
  baseURL: process.env.REACT_APP_HANAI_ADMIN_APPLICANT_PORTAL_BASE_API_URL,
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
      toast.error("Time elapsed, Please log in again!");
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

// Intercept requests and authorize them before sending
axiosInstance.interceptors.request.use(async (config) => {
  await authorizeMe();
  return config;
});

export async function LoginAPI(data) {
  try {
    const response = await axiosInstanceNoAuth.post(`/adminauth/login`,data );

    return response;
  } catch (error) {
    throw error;
  }
}

export async function LoginOtpAPI(data) {
  try {
    const response = await axiosInstanceNoAuth.post( `/adminauth/verifyotp`, data);

    return response;
  } catch (error) {
    throw error;
  }
}


export async function AddVenderAPI(data) {
  try {
    const response = await axiosInstance.post(`/admin/addvendor`, data );

    return response;
  } catch (error) {
    throw error;
  }
}



export async function GetVenderAPI(data) {
  console.log("hhakhsdajh")
  try {
    console.log("hjh")
    const response = await axiosInstance.get(`/admin/getvendors`, data );

    return response;
  } catch (error) {
    throw error;
  }
}

export async function GetUserAPI(data) {
  
  try {
    
    const response = await axiosInstance.get(`/admin/getusers`, data );

    return response;
  } catch (error) {
    throw error;
  }
}

export async function GetVenderAPIById(data) {
  
  try {
    
    const response = await axiosInstance.post(`/admin/getvendorbyid`, data );

    return response;
  } catch (error) {
    throw error;
  }
}

export async function EditVenderAPI(data) {
  try {
    const response = await axiosInstance.post(`/admin/editvendor`, data );

    return response;
  } catch (error) {
    throw error;
  }
}


export async function DeleteVendorAPI(data) {
  try {
    const response = await axiosInstance.post(`/admin/deletevendor`, data );

    return response;
  } catch (error) {
    throw error;
  }
}

export async function DeleteUserAPI(data) {
  try {
    const response = await axiosInstance.post(`/admin/deleteuser`, data );

    return response;
  } catch (error) {
    throw error;
  }
}



export async function GetUserAPIById(data) {
  
  try {
    
    const response = await axiosInstance.post(`/admin/getuserbyid`, data );

    return response;
  } catch (error) {
    throw error;
  }
}

export async function AddUserAPI(data) {
  try {
    const response = await axiosInstance.post(`/admin/adduser`, data );

    return response;
  } catch (error) {
    throw error;
  }
}

export async function EditUserAPI(data) {
  try {
    const response = await axiosInstance.post(`/admin/edituser`, data );

    return response;
  } catch (error) {
    throw error;
  }
}


export async function GetBillsAPI() {
  try {
    const response = await axiosInstance.get(`/admin/getbills` );

    return response;
  } catch (error) {
    throw error;
  }
}


export async function IsActiveUserAPI(data) {
  try {
    const response = await axiosInstance.post(`/admin/getisactiveusers`, data );

    return response;
  } catch (error) {
    throw error;
  }
}

export async function IsActiveVendorAPI(data) {
  try {
    const response = await axiosInstance.post(`/admin/getisactivevendors`, data );

    return response;
  } catch (error) {
    throw error;
  }
}

// export async function ForgotPasswordEnterEmailAPI(data) {
//   try {
//     const response = await axiosInstanceNoAuth.post(`/auth/forgotpass`,data);

//     return response;
//   } catch (error) {
//     throw error;
//   }
// }



// export async function ForgotPasswordEnterOtpAPI(data) {
//   try {
//     const response = await axiosInstanceNoAuth.post(
//       `/auth/forgototpverify`,
//       data
//     );

//     return response;
//   } catch (error) {
//     throw error;
//   }
// }




// export async function ForgotPasswordEnterNewPasswordAPI(data) {
//   try {
//     const response = await axiosInstanceNoAuth.post(
//       `/auth/changepassword`,
//       data
//     );

//     return response;
//   } catch (error) {
//     throw error;
//   }
// }




// export async function SignupAPI(data) {
//   try {
//     const response = await axiosInstanceNoAuth.post(
//       `/auth/signup`,
//       data
//     );

//     return response;
//   } catch (error) {
//     throw error;
//   }
// }



// export async function SignUpOtpAPI(data) {
//   try {
//     const response = await axiosInstanceNoAuth.post(
//       `/auth/verifysignupotp`,
//       data
//     );

//     return response;
//   } catch (error) {
//     throw error;
//   }
// }




// export async function getCustomerDataAPI() {
//   try {
//     const response = await axiosInstance.get(
//       `/user/getformdata`,
//     );

//     return response;
//   } catch (error) {
//     throw error;
//   }
// }


// export async function postCustomerDataAPI(data) {
//   try {
//     const response = await axiosInstance.post(
//       `/user/formdata`,
//       data
//     );

//     return response;
//   } catch (error) {
//     throw error;
//   }
// }



// export async function getBMI_RulerDataAPI() {
//   try {
//     const response = await axiosInstance.get(
//       `/health/bmi_info`,
//     );

//     return response;
//   } catch (error) {
//     throw error;
//   }
// }


// export async function postBMI_RulerDataAPI(data) {
//   try {
//     const response = await axiosInstance.post(
//       `/health/bmi_info`,
//       data
//     );

//     return response;
//   } catch (error) {
//     throw error;
//   }
// }


