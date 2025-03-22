import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  CardMedia,
  Box,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserOffers = () => {
  const [offers, setOffers] = useState([]);
  const navigate = useNavigate();

  // Fetch active offers from the backend
  useEffect(() => {
    fetch("http://localhost:3000/offers/active")
      .then((response) => response.json())
      .then((data) => setOffers(data))
      .catch((error) => console.error("Error fetching offers:", error));
  }, []);

  // Navigate to booking page with offer details
  const handleGrabOffer = (offer) => {
    navigate("/useravailable-cars", { state: { offer } });
  };

  return (
    <Box
      sx={{
        backgroundImage: "url('https://source.unsplash.com/random/1920x1080?cars')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        // minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
        // position: "relative",
      }}
    >
      {/* Overlay for transparency */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.4)", // Adjust transparency
        }}
      />

      <Container sx={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom color="white" sx={{ paddingBottom: 3 }}>
          Available Offers
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {offers.length > 0 ? (
            offers.map((offer, index) => (
              <Grid item xs={12} sm={6} md={4} key={offer._id} sx={{ display: "flex", justifyContent: "center" }}>
                <Card sx={{ width: 320, position: "relative", padding: 2 }}>
                  {/* Display Image */}
                  {offer.image && (
                    <CardMedia
                      component="img"
                      height="200"
                      src={`http://localhost:3000/uploads/${offer.image}`}
                      alt={offer.title}
                    />
                  )}
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="h6">{offer.title}</Typography>
                    <Typography variant="body2">{offer.description}</Typography>
                    <Typography variant="body2">
                      Discount: {offer.discountPercentage}%
                    </Typography>
                    <Typography variant="body2">
                      Valid From: {new Date(offer.startDate).toLocaleDateString()} -{" "}
                      {new Date(offer.endDate).toLocaleDateString()}
                    </Typography>
                    {/* Centered Button */}
                    <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
                      <Button variant="contained" color="warning" onClick={() => handleGrabOffer(offer)}>
                        Grab Offer
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body1" color="white">
              No active offers available.
            </Typography>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default UserOffers;
