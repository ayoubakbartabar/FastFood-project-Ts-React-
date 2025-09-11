import React, { useEffect } from "react";
import { FaUser, FaCamera, FaLink } from "react-icons/fa";
import { useAuthStore } from "../../../../store/authStore";
import "./SidebarProfileSection.css";

const SidebarProfileSection: React.FC = () => {
  // Get currentUser and loadUser from Zustand store
  const { currentUser, loadUser } = useAuthStore();

  // Load user data on mount
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // Default role and static stats
  const defaultRole = "Member";
  const defaultStats = {
    applied: 32,
    won: 26,
    current: 6,
  };

  return (
    <aside className="sidebar-card">
      {/* Avatar */}
      <div className="avatar-wrapper">
        <FaUser className="avatar-wrapper-icon" />
        <button className="avatar-btn">
          <FaCamera />
        </button>
      </div>

      {/* User Info */}
      <h2 className="user-name">{currentUser?.name || "Guest User"}</h2>
      <p className="user-role">{defaultRole}</p>

      {/* Stats Section */}
      <div className="stats">
        <div className="stat-item">
          <span>Opportunities applied</span>
          <span className="profile-stat-number">{defaultStats.applied}</span>
        </div>
        <div className="stat-item">
          <span>Opportunities won</span>
          <span className="profile-stat-number">{defaultStats.won}</span>
        </div>
        <div className="stat-item">
          <span>Current opportunities</span>
          <span className="profile-stat-number">{defaultStats.current}</span>
        </div>
      </div>

      {/* Button: Navigate to Public Profile */}
      <button className="btn-public-profile">View Public Profile</button>

      {/* Public Profile Link */}
      <div className="profile-link">
        <FaLink className="link-icon" />
        <span>https://domain.com/user</span>
      </div>
    </aside>
  );
};

export default SidebarProfileSection;
