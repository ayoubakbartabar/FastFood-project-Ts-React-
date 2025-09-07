import React from "react";

import { FiMail, FiLock, FiUser } from "react-icons/fi";

import "./SignInPage.css";
import { Link } from "react-router-dom";

const SignInPage: React.FC = () => {
  return (
    <div className="signin-container">
      <div className="signin-box">
        {/* Left Side (Illustration) */}
        <div className="signin-illustration">
          <div className="circle-bg">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="signup icon"
              className="signin-icon"
            />
          </div>
        </div>

        {/* Right Side (Form) */}
        <div className="signin-form">
          <h2>Create Account</h2>
          <form>
            <div className="input-group">
              <FiUser className="icon" />
              <input type="text" placeholder="Full Name" required />
            </div>
            <div className="input-group">
              <FiMail className="icon" />
              <input type="email" placeholder="Email" required />
            </div>
            <div className="input-group">
              <FiLock className="icon" />
              <input type="password" placeholder="Password" required />
            </div>
            <div className="input-group">
              <FiLock className="icon" />
              <input type="password" placeholder="Confirm Password" required />
            </div>
            <button type="submit" className="signin-btn">
              SIGN UP
            </button>
          </form>
          <Link to={"/login"} className="have-account">
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
