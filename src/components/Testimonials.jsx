const Testimonials = () => {
    const reviews = [
      {
        name: "Hitesh Rao",
        message:
          "Had an amazing experience with Q Drive Rent a Car! 🚗 The booking process was seamless, the car was in excellent condition, and their customer service was top-notch. Made my trip stress-free and enjoyable. Highly recommend them for anyone looking for a reliable rental service.",
        image:
          "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      {
        name: "Kiran Saji",
        message:
          "I recently rented two cars from QDrive and I was extremely impressed with their service. The car was clean, well-maintained, and perfect conditions. The staff was very friendly and helpful, and the booking process was easy and hassle-free. I would highly recommend this company to anyone looking for a car rental in Kochi.",
        image:
          "https://images.pexels.com/photos/375880/pexels-photo-375880.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      {
        name: "Dr. Ruchir Rustagi",
        message:
          "The best experience of a self drive rental one can have....delivered car at a short notice without delay, reasonable and competitive pricings, smooth driving experience, super responsive customer support and quick return and security refund, without any hassles.",
        image:
          "https://images.pexels.com/photos/32976/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
      },
      {
        name: "Vivek Agarwal",
        message:
          "Had a Great experience with QDrive (Self Drive Rent a car) service. I would personally recommend QDrive to everyone who wants to had a personal car experience for exploring the Kerala Tourism. The service charges are also cheaper and have  multiple car brands listed under them.",
        image:
          "https://images.pexels.com/photos/819530/pexels-photo-819530.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ];
  
    return (
      <section id="reviews" className="py-5 bg-light">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold text-warning" style={{ fontFamily: "'Open Sans', sans-serif" }}>
              What Our Users Say
            </h2>
            <a
              href="https://g.page/r/Cau2CfUQfGGhEBE/review "
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-primary"
            >
              Read More
            </a>
          </div>
          <div className="row g-4">
            {reviews.map((review, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <div
                  className="card text-center shadow-sm h-100 border-0"
                  style={{ transition: "transform 0.3s ease, box-shadow 0.3s ease" }}
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
                    src={review.image}
                    alt={review.name}
                    className="rounded-circle mt-4 mx-auto shadow-sm"
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      border: "3px solid #fff",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title fw-bold" style={{ fontFamily: "'Times New Roman', serif" }}>
                      {review.name}
                    </h5>
                    <p className="card-text text-muted" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                      {review.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default Testimonials;