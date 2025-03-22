import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import {
  Home,
  User,
  CreditCard,
  FileText,
  MessageSquare,
  Bell,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const UserSidebar = ({ isCollapsed, toggleSidebar }) => {
  const navigate = useNavigate();
  const [unreadNotifications, setUnreadNotifications] = useState(0); // Dynamic unread count
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUnreadNotifications = async () => {
      try {
        const response = await fetch("http://localhost:3000/notification/unread");
        if (!response.ok) {
          throw new Error("Failed to fetch unread notifications");
        }

        const data = await response.json();
        setUnreadNotifications(data.unreadCount);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUnreadNotifications();
  }, [unreadNotifications]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.clear();
    navigate("/");
  };

  const menuItems = [
    { path: "/user/dashboard", label: "Dashboard", icon: Home },
    { path: "/user/profile", label: "Profile", icon: User },
    { path: "/user/payment-history", label: "Payment History", icon: CreditCard },
    { path: "/user/terms", label: "Terms & Conditions", icon: FileText },
    { path: "/user/feedback", label: "Feedback", icon: MessageSquare },
    { path: "/user/notifications", label: "Notifications", icon: Bell, hasBadge: true },
  ];

  return (
    <div
      className={`d-flex flex-column vh-100 shadow-lg position-fixed ${isCollapsed ? "collapsed-sidebar" : ""}`}
      style={{
        width: isCollapsed ? "90px" : "260px",
        transition: "width 0.3s ease-in-out",
        background: "white",
        borderRight: "4px solid #FFD700",
        color: "#333",
      }}
    >
      {/* Sidebar Header */}
      <div
        className="d-flex align-items-center justify-content-between p-3"
        style={{
          background: "#FFD700",
          color: "#333",
          fontWeight: "bold",
        }}
      >
        <span className="fs-5">{isCollapsed ? "UD" : "User Dashboard"}</span>
        <button
          className="btn btn-light btn-sm"
          onClick={toggleSidebar}
          style={{
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            padding: "0",
          }}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-3">
        {menuItems.map(({ path, label, icon: Icon, hasBadge }) => (
          <Link
            to={path}
            key={path}
            className="d-flex align-items-center p-3 text-dark text-decoration-none hover-effect position-relative"
            style={{
              borderRadius: "8px",
              margin: "0 10px",
              transition: "background 0.2s",
            }}
          >
            <Icon size={24} className="me-3" color="#FFD700" />
            {!isCollapsed && <span>{label}</span>}

            {/* Show Red Dot if there are Unread Notifications */}
            {hasBadge && unreadNotifications > 0 && (
              <span
                className="position-absolute top-50 end-0 translate-middle-y"
                style={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: "red",
                  borderRadius: "50%",
                }}
              />
            )}
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="mt-auto p-3">
        <button
          className="btn w-100 d-flex align-items-center"
          onClick={handleLogout}
          style={{
            borderRadius: "8px",
            backgroundColor: "#FF4A4A",
            color: "white",
            border: "none",
            transition: "background 0.2s",
          }}
        >
          <LogOut size={20} className="me-3" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default UserSidebar;
