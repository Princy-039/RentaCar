import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");  // ✅ Added licenseNumber state
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("Before sending request...");

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      name: name,
      email: email,
      phone: phone,
      licenseNumber: licenseNumber,  // ✅ Added licenseNumber in request body
      password: password,
      role: "user",
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch("http://localhost:3000/users/register", requestOptions);  // ✅ Ensure correct endpoint
      const result = await response.json();

      console.log("Response:", result);

      if (response.ok) {
        alert("Signup successful!");
        navigate("/login");
      } else {
        alert(result.message || "Signup failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        color: "#fff",
      }}
    >
      <div className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}></div>

      <form onSubmit={handleSignup} className="position-relative p-4"
        style={{
          maxWidth: "600px",
          width: "100%",
          backgroundColor: "transparent",
          color: "#fff",
        }}
      >
        <div className="text-center mb-4">
          <h3>Create an Account</h3>
        </div>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input type="text" className="form-control bg-transparent text-white border-light"
            id="name" placeholder="Enter your full name" value={name}
            onChange={(e) => setName(e.target.value)} required style={{ color: "#fff" }} />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input type="email" className="form-control bg-transparent text-white border-light"
            id="email" placeholder="Enter your email" value={email}
            onChange={(e) => setEmail(e.target.value)} required style={{ color: "#fff" }} />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone Number</label>
          <input type="tel" className="form-control bg-transparent text-white border-light"
            id="phone" placeholder="Enter your phone number" value={phone}
            onChange={(e) => setPhone(e.target.value)} required style={{ color: "#fff" }} />
        </div>

        <div className="mb-3">
          <label htmlFor="licenseNumber" className="form-label">License Number</label>
          <input type="text" className="form-control bg-transparent text-white border-light"
            id="licenseNumber" placeholder="Enter your license number" value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)} required style={{ color: "#fff" }} />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control bg-transparent text-white border-light"
            id="password" placeholder="Create a password" value={password}
            onChange={(e) => setPassword(e.target.value)} required style={{ color: "#fff" }} />
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control bg-transparent text-white border-light"
            id="confirmPassword" placeholder="Re-enter your password" value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} required style={{ color: "#fff" }} />
        </div>

        <div className="d-flex justify-content-between mb-3">
          <a href="/login" className="text-decoration-none text-light">
            Already have an account? Login
          </a>
        </div>

        <button type="submit" className="btn btn-light w-100">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
