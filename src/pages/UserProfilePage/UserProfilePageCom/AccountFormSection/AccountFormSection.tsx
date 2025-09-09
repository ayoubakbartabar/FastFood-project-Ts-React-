import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FaUser, FaEnvelope } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useAuthStore } from "../../../../store/authStore";
import "./AccountFormSection.css";

// Form interface
interface ProfileForm {
  name: string;
  email: string;
  password: string;
}

// Yup validation schema
const schema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
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
});

// Main component
const AccountFormSection: React.FC = () => {
  const { currentUser, loadUser, updateProfile } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileForm>({
    resolver: yupResolver(schema),
  });

  // Load current user on mount
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // Reset form values when currentUser changes
  useEffect(() => {
    if (currentUser) {
      reset({
        name: currentUser.name,
        email: currentUser.email,
        password: currentUser.password,
      });
    }
  }, [currentUser, reset]);

  // Toggle password visibility
  const togglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  // Submit form and update user
  const onSubmit = useCallback(
    async (data: ProfileForm) => {
      if (!currentUser?.id) {
        alert("No user logged in ❌");
        return;
      }

      try {
        // Use Zustand store method for updating profile
        await updateProfile(data);
        alert("Profile updated ✅");
      } catch (error: any) {
        alert(error.message);
      }
    },
    [currentUser, updateProfile]
  );

  return (
    <form className="Account-form" onSubmit={handleSubmit(onSubmit)}>
      {/* Name field */}
      <div className="Account-form-group">
        <label className="Account-form-label">
          <FaUser className="Account-form-icon" /> Full Name
        </label>
        <input
          type="text"
          {...register("name")}
          className="Account-form-input"
          placeholder="Full Name"
        />
        {errors.name && <p className="error-msg">{errors.name.message}</p>}
      </div>

      {/* Email field */}
      <div className="Account-form-group">
        <label className="Account-form-label">
          <FaEnvelope className="Account-form-icon" /> Email Address
        </label>
        <input
          type="email"
          {...register("email")}
          className="Account-form-input"
          placeholder="Email Address"
        />
        {errors.email && <p className="error-msg">{errors.email.message}</p>}
      </div>

      {/* Password field */}
      <div className="Account-form-group">
        <label className="Account-form-label">
          <FiLock className="Account-form-icon" /> Password
        </label>
        <div className="password-group">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className="Account-form-input"
            placeholder="Password"
          />
          <span className="toggle-password" onClick={togglePassword}>
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </span>
        </div>
        {errors.password && (
          <p className="error-msg">{errors.password.message}</p>
        )}
      </div>

      {/* Submit button */}
      <div className="Account-form-submit-wrapper">
        <button
          type="submit"
          className="Account-btn-submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Update"}
        </button>
      </div>
    </form>
  );
};

export default AccountFormSection;
