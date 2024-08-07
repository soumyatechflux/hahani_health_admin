import React, { useState } from "react";
import longlogo from "./Etern logo.jpg";
import "./login.css";
import { useNavigate } from "react-router-dom";
import ForgotPasswordFlow from "./ForgotPassword/ForgotPassword";
import SignUp from "../../SignUp/SignUp/SignUp";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { LoginAPI } from "../../../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    let valid = true;

    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) {
      return;
    }

    // navigate('/verification', { state: { email: email } });

    setIsLoading(true);

    try {
      const data = {
        email: email,
        password: password,
      };

      const response = await LoginAPI(data);


      if (response?.data?.response === true ) {
        toast.success(response?.data?.success_msg);
        navigate("/verification", { state: { email: email } });
      } else {
        if (response?.data?.error_msg) {
          toast.error(response?.data?.error_msg);
        } else {
          toast.error("An error occurred during login. Please try again.");
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const openSignUpModal = () => {
    setShowSignUpModal(true);
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-6 left-side">
            <img src={longlogo} alt="Henai Health" className="logo-img" />
          </div>
          <div className="col-12 col-md-6 right-side">
            <div className="form-field">
              <header className="login-header">Login</header>
              <form onSubmit={handleLogin}>
                <div className="input-field">
                  <input
                    type="text"
                    className="input-mail"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="off"
                  />
                  {emailError && <div className="error">{emailError}</div>}
                </div>
                <div className="password-field">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    className="input-pass"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="off"
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password-visibility"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? <IoEyeOffOutline /> : <IoEyeOutline />}
                  </button>
                </div>
                {passwordError && <div className="error">{passwordError}</div>}

                <div className="para">
                  <span>
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="forgot-password-link"
                      style={{
                        border: "none",
                        color: "red",
                        backgroundColor: "#eaeaea",
                      }}
                    >
                      Forgot Password
                    </button>
                  </span>
                </div>
                <div className="input-submit">
                  <button type="submit" className="submit" disabled={isLoading}>
                    {" "}
                    {isLoading ? "Logging in..." : "Login"}
                  </button>
                </div>
                <div className="login-sing">
                  <span>
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={openSignUpModal}
                      className="sign-btn"
                    >
                      Sign Up
                    </button>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {showForgotPassword && (
        <ForgotPasswordFlow onClose={() => setShowForgotPassword(false)} />
      )}
      {showSignUpModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <SignUp onClose={() => setShowSignUpModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;