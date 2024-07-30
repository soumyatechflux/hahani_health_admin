import React, { useState } from "react";
import longlogo from "./longlogo.PNG";
import "./login.css";
import { useNavigate } from 'react-router-dom';
// import ForgotPasswordFlow from './ForgotPasswordFlow';
import ForgotPasswordFlow from "./ForgotPassword/ForgotPassword";

const Login = () => {
  const [email, setEmail] = useState('hanaihealth@123.com');
  const [password, setPassword] = useState('hanaihealth@123.com');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false); // State for controlling modal visibility
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    let valid = true;

    if (!email) {
      setEmailError('Email is required');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      navigate('/dashboard');
    }
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true); // Show the Forgot Password modal
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row ">
          <div className="col-12 col-md-6 left-side" style={{ height: '100vh' }}>
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
                  <input
                    type="password"
                    className="input-pass"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="off"
                  />
                  {passwordError && <div className="error">{passwordError}</div>}
                </div>
                <div className="para">
                  <span>
                    <button type="button" onClick={handleForgotPassword} className="forgot-password-link" style={{border:"none", color:"red",backgroundColor:'#eaeaea'}}>
                      Forgot Password
                    </button>
                  </span>
                </div>
                <div className="input-submit">
                  <button type="submit" className="submit">Login</button>
                </div>
                <div className="login-sing">
                  <span>
                    Don't have an account? <a href="/signup">Sign Up</a>
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
    </div>
  );
};

export default Login;
