import React from "react";
import { FiMail, FiLock } from "react-icons/fi";
import "./LoginPage.css";

const LoginPage: React.FC = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        {/* Left Side (Illustration) */}
        <div className="login-illustration">
          <div className="circle-bg">
            <img
              src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
              alt="user icon"
              className="login-icon"
            />
          </div>
        </div>

        {/* Right Side (Form) */}
        <div className="login-form">
          <h2>Member Login</h2>
          <form>
            <div className="input-group">
              <FiMail className="icon" />
              <input type="email" placeholder="Email" required />
            </div>
            <div className="input-group">
              <FiLock className="icon" />
              <input type="password" placeholder="Password" required />
            </div>
            <button type="submit" className="login-btn">
              LOGIN
            </button>
            <p className="forgot">
              Forgot <a href="#">Username</a> / <a href="#">Password</a>?
            </p>
          </form>
          <a href="#" className="create-account">
            Create your Account <a href="#">→</a>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
