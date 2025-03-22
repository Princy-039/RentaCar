import React, { useEffect, useState } from "react";
import { Bell, Loader } from "lucide-react";

const UserNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("http://localhost:3000/notification/");

        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }

        const data = await response.json();
        setNotifications(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const markAllAsRead = async () => {
    try {
      const response = await fetch("http://localhost:3000/notification/mark-read", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to mark notifications as read");
      }

      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      );
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">
        <Bell size={24} className="me-2 text-warning" />
        Notifications
      </h2>

      {loading && <Loader className="text-primary animate-spin" size={32} />}
      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && notifications.length === 0 && (
        <p className="text-muted">No notifications available.</p>
      )}

      {!loading && !error && notifications.length > 0 && (
        <button onClick={markAllAsRead} className="btn btn-primary mb-3">
          Mark All as Read
        </button>
      )}

      <ul className="list-group">
        {notifications.map((notification) => (
          <li
            key={notification._id}
            className={`list-group-item d-flex justify-content-between ${notification.isRead ? "bg-light" : ""}`}
          >
            <span>{notification.message}</span>
            <small className="text-muted">{new Date(notification.createdAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserNotifications;
