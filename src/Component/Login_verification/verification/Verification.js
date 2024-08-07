import React, { useState } from "react";
import longlogo from "./Etern logo.jpg";
import smalllogo from "./Logo.png";
import { useNavigate } from "react-router-dom";
import "./verification.css";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginOtpAPI } from "../../../api";
import { encryptData } from "../../CRYPTO/crypto";

const Verification = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const email = location.state?.email;

  const handleVerification = async (e) => {
    e.preventDefault();

    if (!code) {
      setError("Please enter the verification code");
    } else {
      // setError("");
      // navigate("/about");

      setIsLoading(true);
      try {
        const data = {
          email: email,
          otp: code,
        };

        const response = await LoginOtpAPI(data);

        if (response?.data && response?.data?.response === true) {
          const token = response?.data?.data?.token;
          const encryptedToken = encryptData(token);

          localStorage.clear();
          localStorage.setItem("isVendorLoggedIn", true);
          localStorage.setItem(
            "encryptedTokenForVendorOfHanaiHealth",
            encryptedToken
          );

          toast.success("OTP verified successfully.");

          setError("");
          navigate("/dashboard");
        } else {
          toast.error(
            response?.data?.error_msg ||
              "Failed to varify OTP. Please try again."
          );
        }
      } catch (error) {
        console.error("Error varifying OTP:", error);
        toast.error("An error occurred while varifying OTP. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };
    return (
        <div>
            <div className="container-fluid">
                <div className='row'>
                    <div className='col-12 col-md-6 left_page'>
                        <img src={longlogo} alt="Henai Health" className="logo-img" /> 
                    </div>
                    
                    <div className=' col-12 col-md-6 right_page'>
                        <div className='verify_field'>
                            <div>
                                <img src={smalllogo} alt="Henai Health" className="small_logo" />
                            </div>
                            <div className='verify_heading'>
                                <h2>Verify that it's you</h2>
                                <p>We sent a verification code to the phone number attached to your account</p>
                            </div>
                            <form onSubmit={handleVerification}>
                                <div className="verify_code">
                                    <label>Verification code*</label>
                                    <input
                                        type="text"
                                        className="code"
                                        id="code"
                                        placeholder=''
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        autoComplete="off"
                                    />
                                    {error && <div className='error'>{error}</div>}
                                </div>
                                <div className="verify_login">
                                    <button type="submit" className="login" value="Verify and Login">Verify and Login</button>
                                </div>
                            </form>
                            <div className='verify_info'>
                                <span>By logging into your account, you agree with our <a href='#'>Term & Condition</a> and <a href='#'>Privacy Statement</a></span>
                            </div>
                        </div>
                    </div>        
                </div>
            </div>
        </div>
    );
}

export default Verification;
