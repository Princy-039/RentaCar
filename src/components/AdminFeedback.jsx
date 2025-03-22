import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from "@mui/material";

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    // Fetch feedback messages
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch("http://localhost:3000/feedback/");
        const data = await response.json();
        setFeedbacks(data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        User Feedback
      </Typography>

      {feedbacks.length === 0 ? (
        <Typography>No feedback available.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>#</b></TableCell>
                <TableCell><b>Name</b></TableCell>
                <TableCell><b>Email</b></TableCell>
                <TableCell><b>Message</b></TableCell>
                <TableCell><b>Rating</b></TableCell>
                <TableCell><b>Date</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feedbacks.map((fb, index) => (
                <TableRow key={fb._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{fb.name}</TableCell>
                  <TableCell>{fb.email}</TableCell>
                  <TableCell>{fb.message}</TableCell>
                  <TableCell>{fb.rating ? `${fb.rating} ⭐` : "N/A"}</TableCell>
                  <TableCell>{fb.createdAt? new Date(fb.createdAt).toLocaleDateString() : "N/A"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default AdminFeedback;
