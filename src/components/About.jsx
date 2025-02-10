const About = () => {
    return (
      <section id="about" className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            {/* Text Content */}
            <div className="col-md-6">
              <p className="text-dark">
                At <strong>QDRIVE CAR </strong>Rentals offers a seamless and affordable car rental experience across Kerala, providing both self-drive and chauffeur-driven options. Since 2000, we have built a strong reputation for reliability, offering a diverse fleet of well-maintained vehicles to suit every travel need. Whether you're on a short trip, a long-term lease, or require airport pickup, we ensure convenience with home delivery and round-the-clock customer support. Our transparent pricing, commitment to hygiene and safety, and customer-first approach have earned us a loyal clientele across South India.
              </p>
              <p className="text-dark">
              With QDrive, you can enjoy the freedom to explore Kerala without relying on public transport or expensive taxis. We provide a range of automatic and manual cars, from budget-friendly models to luxury rides, all thoroughly tested for top performance. Our experienced team ensures a hassle-free rental process, making travel smooth and enjoyable. Whether it’s a weekend getaway, business trip, or wedding rental, QDrive Car Rentals guarantees a premium experience. Book your ride today and hit the road with confidence!
              </p>
              <p className="fw-bold text-warning">
              Choose Your Favourite Car & Enjoy Your Drive!
              </p>
            </div>
            <div className="col-md-5">
              <img
                src="https://images.pexels.com/photos/3441201/pexels-photo-3441201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Car Image"
                className="img-fluid rounded shadow"
                style={{ width: "600px", height: "400px", objectFit: "cover" }} // Adjust values as needed
              />

            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default About;
  