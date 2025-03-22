import React, { useState, useEffect } from 'react';

const AdminNotificationDashboard = () => {
  const [message, setMessage] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [notificationId, setNotificationId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch notifications for all users (display all notifications)
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('http://localhost:3000/notification/'); // Adjust endpoint to get all notifications
      const data = await response.json();

      if (response.ok) {
        setNotifications(data.data);
      } else {
        setError(data.message || 'Error fetching notifications');
      }
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError('Error fetching notifications');
    }
  };

  const createNotification = async () => {
    try {
      const response = await fetch('http://localhost:3000/notification/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
        setMessage('');
        fetchNotifications(); // Refresh the notification list
      } else {
        setError(data.message || 'Error creating notification');
      }
    } catch (err) {
      console.error('Error creating notification:', err);
      setError('Error creating notification');
    }
  };

  const sendNotificationToAll = async () => {
    try {
      const response = await fetch('http://localhost:3000/notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
        setMessage('');
        fetchNotifications(); // Refresh the notification list
      } else {
        setError(data.message || 'Error sending notification to all users');
      }
    } catch (err) {
      console.error('Error sending notification to all users:', err);
      setError('Error sending notification to all users');
    }
  };

  const deleteNotification = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/notification/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
        fetchNotifications(); // Refresh the notification list
      } else {
        setError(data.message || 'Error deleting notification');
      }
    } catch (err) {
      console.error('Error deleting notification:', err);
      setError('Error deleting notification');
    }
  };

  const markAsRead = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/notification/${id}/read`, {
        method: 'PATCH',
      });
      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
        fetchNotifications(); // Refresh the notification list
      } else {
        setError(data.message || 'Error marking notification as read');
      }
    } catch (err) {
      console.error('Error marking notification as read:', err);
      setError('Error marking notification as read');
    }
  };

  const editNotification = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/notification/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
        setMessage('');
        fetchNotifications(); // Refresh the notification list
      } else {
        setError(data.message || 'Error editing notification');
      }
    } catch (err) {
      console.error('Error editing notification:', err);
      setError('Error editing notification');
    }
  };

  return (
    <div>
      <h1>Admin Notification Dashboard</h1>

      {/* Form to create a new notification */}
      <div>
        <input
          type="text"
          placeholder="Enter notification message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={createNotification} disabled={!message}>
          Create Notification
        </button>
      </div>

      {/* Button to send notification to all users */}
      <div>
        <button onClick={sendNotificationToAll} disabled={!message}>
          Send Notification to All Users
        </button>
      </div>

      {/* Success and error messages */}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}

      <h2>All Notifications</h2>
      <div>
        {notifications.length === 0 ? (
          <p>No notifications available</p>
        ) : (
          <ul>
            {notifications.map((notification) => (
              <li key={notification._id}>
                <p>{notification.message}</p>
                <p>Status: {notification.read ? 'Read' : 'Unread'}</p>

                {/* Mark notification as read */}
                {!notification.read && (
                  <button onClick={() => markAsRead(notification._id)}>
                    Mark as Read
                  </button>
                )}

                {/* Edit notification */}
                <button onClick={() => {
                  setNotificationId(notification._id);
                  setMessage(notification.message);  // Pre-fill the message for editing
                }}>
                  Edit
                </button>

                {/* Delete notification */}
                <button onClick={() => deleteNotification(notification._id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminNotificationDashboard;
