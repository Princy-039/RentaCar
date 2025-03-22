import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

const reviews = [
  { id: 1, user: "John Doe", rating: 5, comment: "Excellent service!", date: "2024-02-24" },
  { id: 2, user: "Jane Smith", rating: 4, comment: "Good experience, but can improve.", date: "2024-02-23" },
  { id: 3, user: "Alex Johnson", rating: 3, comment: "Average service.", date: "2024-02-22" },
];

const AdminReviews = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        User Reviews
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>User</b></TableCell>
              <TableCell><b>Rating</b></TableCell>
              <TableCell><b>Comment</b></TableCell>
              <TableCell><b>Date</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell>{review.user}</TableCell>
                <TableCell>{review.rating} ⭐</TableCell>
                <TableCell>{review.comment}</TableCell>
                <TableCell>{review.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminReviews;
