import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";

const AdminCustomerManagement = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ _id: "", name: "", email: "", phone: "", licenseNumber: "" });

  // Fetch all users
  useEffect(() => {
    const token = localStorage.getItem("authToken");
  
    if (!token) {
      console.error("No token found. User is not authenticated.");
      return;
    }
  
    fetch("http://localhost:3000/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data.filter(user => user.role !== "admin"))) // Filter out admins
      .catch((error) => console.error("Error fetching users:", error));
  }, []);
  

  // Handle Edit Click
  const handleEditClick = (user) => {
    setFormData(user); // Fill form with user data
    setOpen(true);
  };

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Save Changes
  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3000/users/${formData.email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setUsers(users.map((user) => (user._id === formData._id ? formData : user)));
        setOpen(false);
      } else {
        console.error("Error updating user:", await response.json());
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Handle Delete User
  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });

      if (response.ok) {
        setUsers(users.filter((user) => user._id !== id));
      } else {
        console.error("Error deleting user:", await response.json());
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2> Customer Details</h2>

      {/* Display Users in a Box */}
      <div style={styles.userList}>
        {users.map((user) => (
          <div key={user._id} style={styles.userBox}>
            {user.photo && <img src={`http://localhost:3000/${user.photo}`} alt="User" style={styles.userPhoto} />}
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>License:</strong> {user.licenseNumber}</p>

            <button style={styles.editButton} onClick={() => handleEditClick(user)}>Edit</button>
            <button style={styles.deleteButton} onClick={() => handleDeleteUser(user._id)}>Delete</button>
          </div>
        ))}
      </div>

      {/* Modal for Editing User */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField label="Name" name="name" value={formData.name || ""} onChange={handleChange} fullWidth margin="dense" />
          <TextField label="Email" name="email" value={formData.email || ""} onChange={handleChange} fullWidth margin="dense" />
          <TextField label="Phone" name="phone" value={formData.phone || ""} onChange={handleChange} fullWidth margin="dense" />
          <TextField label="License Number" name="licenseNumber" value={formData.licenseNumber || ""} onChange={handleChange} fullWidth margin="dense" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

// CSS-like styles for better layout
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  userList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
  },
  userBox: {
    border: "1px solid #ccc",
    padding: "15px",
    borderRadius: "10px",
    width: "250px",
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
  },
  userPhoto: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "10px",
  },
  editButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "5px 10px",
    margin: "5px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    color: "white",
    padding: "5px 10px",
    margin: "5px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default AdminCustomerManagement;