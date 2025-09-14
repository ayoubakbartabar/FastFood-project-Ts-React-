import React from "react";
import { FaUserCog, FaShoppingBasket, FaBell } from "react-icons/fa";
import "./ProfileTabsSection.css";

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ProfileTabsSection: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { key: "account", label: "Account Settings", icon: <FaUserCog /> },
    { key: "Orders", label: "Orders", icon: <FaShoppingBasket /> },
    { key: "notifications", label: "Notifications", icon: <FaBell /> },
  ];

  return (
    <div className="profile-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`tab-btn ${activeTab === tab.key ? "active" : ""}`}
        >
          <span className="tab-icon">{tab.icon}</span>
          {tab.label}
          {activeTab === tab.key && <span className="tab-underline" />}
        </button>
      ))}
    </div>
  );
};

export default ProfileTabsSection;
