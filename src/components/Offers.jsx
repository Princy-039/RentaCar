import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

const SpecialOffers = () => {
  const offers = [
    {
      title: "RIDE YOUR WAY WITH OUR APP",
      description: "Enjoy exclusive discounts when you book via our app.",
      image: "https://images.pexels.com/photos/97075/pexels-photo-97075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      coupon: "APP10",
      discount: "10% OFF",
    },
    {
      title: "Valentine's Day Special",
      description: "Celebrate love with a special discount on luxury rides.",
      image: "https://images.pexels.com/photos/20192809/pexels-photo-20192809/free-photo-of-ceramic-car-valentines-decoration.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      coupon: "LOVE14",
      discount: "14% OFF",
    },
    {
      title: "Weekend Getaway Deals",
      description: "Plan a perfect trip with our weekend special discounts.",
      image: "https://images.pexels.com/photos/9050677/pexels-photo-9050677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      coupon: "WEEKEND15",
      discount: "15% OFF",
    },
    {
      title: "Summer Road Trip Sale",
      description: "Get ready for summer adventures with great savings.",
      image: "https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      coupon: "SUMMER20",
      discount: "20% OFF",
    },
    {
      title: "Exclusive Members Offer",
      description: "Loyal customers get extra rewards & discounts.",
      image: "https://images.pexels.com/photos/5816297/pexels-photo-5816297.jpeg?auto=compress&cs=tinysrgb&w=600",
      coupon: "MEMBER25",
      discount: "25% OFF",
    },
    {
      title: "Festival Season Deals",
      description: "Celebrate every festival with an amazing ride discount.",
      image: "https://images.pexels.com/photos/30519793/pexels-photo-30519793/free-photo-of-vibrant-night-at-the-holiday-market.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      coupon: "FEST30",
      discount: "30% OFF",
    },
  ];

  const scrollRef = useRef(null);
  const [scrollIndex, setScrollIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % offers.length;
        scrollRef.current.scrollLeft = newIndex * 320; // Adjust scroll distance
        return newIndex;
      });
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [offers.length]);

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center fw-bold text-warning mb-5" style={{ fontFamily: "'Open Sans', sans-serif" }}>
          Special Offers & Discounts
        </h2>
        <div
          ref={scrollRef}
          className="d-flex overflow-hidden"
          style={{
            scrollBehavior: "smooth",
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
            gap: "20px",
            paddingBottom: "10px",
            overflowX: "auto",
            whiteSpace: "nowrap",
          }}
        >
          {offers.map((offer, index) => (
            <div
              key={index}
              className="card border-0 shadow-sm"
              style={{
                minWidth: "400px",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.1)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
              }}
            >
              <img
                src={offer.image}
                alt={offer.title}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title fw-bold">{offer.title}</h5>
                <p className="card-text text-muted">{offer.description}</p>
                <p className="fw-bold text-success">Use Code: {offer.coupon}</p>
                <p className="fw-bold text-danger">{offer.discount}</p>
                <a href="#" className="btn shadow-sm" style={{ backgroundColor: "#808000", color: "white", border: "none" }}>
                  Grab Offer
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
