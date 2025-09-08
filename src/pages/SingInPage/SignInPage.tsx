import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import "./SignInPage.css";

interface SignUpForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Validation schema with stronger filtering
const schema = Yup.object().shape({
  name: Yup.string()
    .trim() // Remove leading/trailing spaces
    .required("Name is required")
    .matches(/^[A-Za-z0-9 ]+$/, "Only letters and numbers are allowed"),
  email: Yup.string()
    .trim()
    .email("Invalid email")
    .required("Email is required"),
  password: Yup.string()
    .trim()
    .min(6, "Password must be at least 6 characters")
    .matches(/[a-zA-Z]/, "Password must contain at least one letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
});

const SignInPage: React.FC = () => {
  const { register: authRegister, loadUser, currentUser } = useAuthStore();
  const navigate = useNavigate();

  // Load user once
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // Redirect if user already logged in
  useEffect(() => {
    if (currentUser) navigate("/");
  }, [currentUser, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data: SignUpForm) => {
    try {
      await authRegister({
        name: data.name.trim(),
        email: data.email.trim(),
        password: data.password.trim(),
      });
      navigate("/");
    } catch (err: any) {
      // Show error for duplicate email or other registration errors
      alert(err.message);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <div className="signin-illustration">
          <div className="circle-bg">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="signup icon"
              className="signin-icon"
            />
          </div>
        </div>

        <div className="signin-form">
          <h2>Create Account</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name Field */}
            <div className="input-group">
              <FiUser className="icon" />
              <input
                type="text"
                placeholder="Full Name"
                {...register("name")}
              />
            </div>
            {errors.name && <p className="error-msg">{errors.name.message}</p>}

            {/* Email Field */}
            <div className="input-group">
              <FiMail className="icon" />
              <input type="email" placeholder="Email" {...register("email")} />
            </div>
            {errors.email && (
              <p className="error-msg">{errors.email.message}</p>
            )}

            {/* Password Field */}
            <div className="input-group password-group">
              <FiLock className="icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password")}
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </span>
            </div>
            {errors.password && (
              <p className="error-msg">{errors.password.message}</p>
            )}

            {/* Confirm Password Field */}
            <div className="input-group password-group">
              <FiLock className="icon" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                {...register("confirmPassword")}
              />
              <span
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </span>
            </div>
            {errors.confirmPassword && (
              <p className="error-msg">{errors.confirmPassword.message}</p>
            )}

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
