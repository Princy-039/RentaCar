import { useRef } from "react";

const Features = () => {
  const features = [
    {
      title: "24*7 Customer Support",
      image: "https://images.pexels.com/photos/7658399/pexels-photo-7658399.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      title: "Wide Range of Cars",
      image: "https://images.pexels.com/photos/29633964/pexels-photo-29633964/free-photo-of-vintage-alfa-romeo-cars-display-in-museum.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Comfort And Well Maintained Vehicles",
      image: "https://images.pexels.com/photos/10054676/pexels-photo-10054676.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Flexible Start & End Points",
      image: "https://images.pexels.com/photos/30565271/pexels-photo-30565271/free-photo-of-vintage-red-truck-on-european-city-street.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Doorstep Delivery",
      image: "https://images.pexels.com/photos/14541150/pexels-photo-14541150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Low Security Deposits",
      image: "https://images.pexels.com/photos/4968391/pexels-photo-4968391.jpeg?auto=compress&cs=tinysrgb&w=600",
    },

  ];

  const scrollRef = useRef(null);

  const handleDrag = (e) => {
    const container = scrollRef.current;
    container.scrollLeft += e.deltaY;
  };

  return (
    <section id="features" className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center fw-bold text-olive mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>
          Why Choose QDrive?
        </h2>

        <div
          ref={scrollRef}
          onWheel={handleDrag}
          className="d-flex overflow-auto"
          style={{
            scrollBehavior: "smooth",
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
            gap: "20px",
            paddingBottom: "10px",
            cursor: "grab",
          }}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="card border-0 shadow-sm"
              style={{
                minWidth: "250px",
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
                src={feature.image}
                alt={feature.title}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title fw-bold" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                  {feature.title}
                </h5>
                <p className="card-text text-muted" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
