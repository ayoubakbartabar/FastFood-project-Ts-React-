import React, { useState, useMemo } from "react";
import SidebarProfileSection from "./UserProfilePageCom/SidebarProfileSection/SidebarProfileSection";
import ProfileTabsSection from "./UserProfilePageCom/ProfileTabsSection/ProfileTabsSection";
import AccountFormSection from "./UserProfilePageCom/AccountFormSection/AccountFormSection";

import "./UserProfilePage.css";
import PageHeader from "../../components/layout/PageHeader/PageHeader";
import OrderSection from "../../components/layout/OrderSection/OrderSection";

const UserProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("account");

  // Rendered content based on active tab
  const tabContent = useMemo(() => {
    switch (activeTab) {
      case "account":
        return <AccountFormSection />;
      case "Orders":
        return <OrderSection/>;
      case "notifications":
        return (
          <p>Notifications Settings Content...</p>
        );
      default:
        return null;
    }
  }, [activeTab]);

  return (
    <div className="user-profile-page">
      <PageHeader title="User Profile" />

      <div className="user-profile-page__content">
        <SidebarProfileSection />

        <div className="user-profile-page__main">
          {/* Tabs */}
          <ProfileTabsSection
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* Content */}
          <div key={activeTab} className="animate-fadeIn">
            {tabContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
