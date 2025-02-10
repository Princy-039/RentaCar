const Locations = () => {
  const locations = [
    "Kochi",
    "Trivandrum",
    "Thrissur",
    "Bangalore",
    "Idukki",
    "Kottayam",
    "Kollam",
    "Alappuzha",
  ];

  return (
    <section className="py-5 text-center">
      <h2 className="fw-bold mb-4">Car for <span style={{ color: "black" }}>Rent Locations</span></h2>
      <div className="container">
        <div className="row justify-content-center">
          {locations.map((location, index) => (
            <div key={index} className="col-md-3 col-sm-6 mb-3">
              <a href="#" className="btn btn-outline-warning fw-bold px-4 py-2">
                Rent a car in {location} 🚗
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Locations;
