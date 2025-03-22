import React, { useEffect, useState } from "react";
import { 
  Card, CardContent, Typography, Grid, Button, TextField, 
  Dialog, DialogTitle, DialogContent, DialogActions 
} from "@mui/material";

const AdminOffers = () => {
  const [offers, setOffers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    description: "",
    discountPercentage: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    fetch("http://localhost:3000/offers/active")
      .then((response) => response.json())
      .then((data) => setOffers(data))
      .catch((error) => console.error("Error fetching offers:", error));
  }, []);

  const handleEdit = (offer) => {
    setFormData({ id: offer._id, ...offer });
    setOpen(true);
  };

  const handleAddNew = () => {
    setFormData({
      id: null,
      title: "",
      description: "",
      discountPercentage: "",
      startDate: "",
      endDate: "",
    });
    setSelectedFile(null);
    setOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const method = formData.id ? "PUT" : "POST";
    const url = formData.id 
      ? `http://localhost:3000/offers/update/${formData.id}`
      : "http://localhost:3000/offers/add";
    
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("discountPercentage", formData.discountPercentage);
    formDataToSend.append("startDate", formData.startDate);
    formDataToSend.append("endDate", formData.endDate);
    if (selectedFile) {
      formDataToSend.append("image", selectedFile);
    } else if (formData.image) {
      formDataToSend.append("existingImage", formData.image); // Send existing image name
    }

    const response = await fetch(url, {
      method: method,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("authToken")}`  
      },
      body: formDataToSend,
    });

    if (response.ok) {
      const updatedOffer = await response.json();
      setOffers((prevOffers) =>
        formData.id
          ? prevOffers.map((offer) =>
              offer._id === updatedOffer.updatedOffer._id ? updatedOffer.updatedOffer : offer
            )
          : [...prevOffers, updatedOffer.offer]
      );
      setOpen(false);
    } else {
      console.error("Error updating/adding offer");
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Admin Offers</Typography>
      <Button variant="contained" color="primary" onClick={handleAddNew} style={{ marginBottom: 10 }}>
        Add New Offer
      </Button>
      <Grid container spacing={3}>
        {offers.length > 0 ? (
          offers.map((offer) => (
            <Grid item xs={6} key={offer._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{offer.title}</Typography>
                  <Typography variant="body2">{offer.description}</Typography>
                  <Typography variant="body2">
                    Discount: {offer.discountPercentage}%
                  </Typography>
                  <Typography variant="body2">
                    Valid From: {new Date(offer.startDate).toLocaleDateString()} - {new Date(offer.endDate).toLocaleDateString()}
                  </Typography>
                  {offer.image && <img src={`http://localhost:3000/uploads/${offer.image}?t=${Date.now()}`} alt={offer.title} style={{ width: "50%", height: "200px", objectFit: "cover", marginTop: 10, borderRadius: 5 }} />}
                  <Button variant="contained" color="primary" style={{ marginTop: 10 }} onClick={() => handleEdit(offer)}>
                    Edit Offer
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1">No active offers available.</Typography>
        )}
      </Grid>

      {/* Modal for Add/Edit Offer */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{formData.id ? "Edit Offer" : "Add New Offer"}</DialogTitle>
        <DialogContent>
          <TextField label="Title" name="title" value={formData.title} onChange={handleChange} fullWidth margin="dense" />
          <TextField label="Description" name="description" value={formData.description} onChange={handleChange} fullWidth margin="dense" />
          <TextField label="Discount (%)" name="discountPercentage" type="number" value={formData.discountPercentage} onChange={handleChange} fullWidth margin="dense" />
          <TextField label="Start Date" name="startDate" type="date" value={formData.startDate} onChange={handleChange} fullWidth margin="dense" InputLabelProps={{ shrink: true }} />
          <TextField label="End Date" name="endDate" type="date" value={formData.endDate} onChange={handleChange} fullWidth margin="dense" InputLabelProps={{ shrink: true }} />
          <input type="file" accept="image/*" onChange={handleFileChange} style={{ marginTop: 10 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {formData.id ? "Update Offer" : "Add Offer"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminOffers;
