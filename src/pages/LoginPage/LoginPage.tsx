import React, { useState, useEffect, useCallback } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./LoginPage.css";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, login } = useAuthStore();

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) navigate("/");
  }, [currentUser, navigate]);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  // Strong validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .trim()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .trim()
      .min(6, "Password must be at least 6 characters")
      .matches(/[a-zA-Z]/, "Password must contain at least one letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .required("Password is required"),
  });

  const handleSubmit = useCallback(
    async (values: { email: string; password: string }) => {
      try {
        await login(values.email.trim(), values.password.trim());
        navigate("/");
      } catch (err: any) {
        alert(err.message);
      }
    },
    [login, navigate]
  );

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-illustration">
          <div className="circle-bg">
            <img
              src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
              alt="user icon"
              className="login-icon"
            />
          </div>
        </div>

        <div className="login-form">
          <h2>Member Login</h2>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                {/* Email Input */}
                <div className="input-group">
                  <FiMail className="icon" />
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="input-field"
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message"
                />

                {/* Password Input */}
                <div className="input-group password-group">
                  <FiLock className="icon" />
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="input-field"
                  />
                  <span
                    className="toggle-password"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </span>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />

                <button
                  type="submit"
                  className="login-btn"
                  disabled={isSubmitting}
                >
                  LOGIN
                </button>

                <p className="forgot">
                  Forgot <a href="#">Username</a> / <a href="#">Password</a>?
                </p>
              </Form>
            )}
          </Formik>

          <Link to="/signup" className="create-account">
            Create your Account →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default React.memo(LoginPage);
