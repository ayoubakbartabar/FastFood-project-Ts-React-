import React, { useEffect } from "react";
import { FaUser, FaCamera, FaLink } from "react-icons/fa";
import { useAuthStore } from "../../../../store/authStore";
import "./SidebarProfileSection.css";

// Move constants outside to avoid re-creation on each render
const DEFAULT_ROLE = "Member";
const DEFAULT_STATS = {
  applied: 32,
  won: 26,
  current: 6,
};

const SidebarProfileSection: React.FC = () => {
  // Extract only needed values from store (prevents unnecessary re-renders if store grows)
  const { currentUser, loadUser } = useAuthStore();

  // Load user once when component mounts
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // Fallback values
  const userName = currentUser?.name || "Guest User";
  const profileLink = currentUser?.profileUrl || "https://domain.com/user";

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
      <h2 className="user-name">{userName}</h2>
      <p className="user-role">{currentUser?.role || DEFAULT_ROLE}</p>

      {/* Stats Section */}
      <div className="stats">
        <div className="stat-item">
          <span>Opportunities applied</span>
          <span className="profile-stat-number">{DEFAULT_STATS.applied}</span>
        </div>
        <div className="stat-item">
          <span>Opportunities won</span>
          <span className="profile-stat-number">{DEFAULT_STATS.won}</span>
        </div>
        <div className="stat-item">
          <span>Current opportunities</span>
          <span className="profile-stat-number">{DEFAULT_STATS.current}</span>
        </div>
      </div>

      {/* Button: Navigate to Public Profile */}
      <button className="btn-public-profile">View Public Profile</button>

      {/* Public Profile Link */}
      <div className="profile-link">
        <FaLink className="link-icon" />
        <a href={profileLink} target="_blank" rel="noopener noreferrer">
          {profileLink}
        </a>
      </div>
    </aside>
  );
};

export default SidebarProfileSection;
