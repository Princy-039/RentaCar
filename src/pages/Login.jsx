import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

 const handleLogin = async (e) => {
  e.preventDefault();
  setError(""); // Reset error before each attempt

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    email: email,
    password: password,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch("http://localhost:3000/login", requestOptions);
    const result = await response.json();
    
    console.log("API Response:", result); // Debugging

    if (response.ok) {
      // Ensure the token exists before saving
      if (result.token) {
        localStorage.setItem("authToken", result.token);
        localStorage.setItem("userRole", result.user.role);

        // Store user object with token
        const userWithToken = { ...result.user, token: result.token };
        localStorage.setItem("user", JSON.stringify(userWithToken));

        console.log("Stored User:", localStorage.getItem("user"));
        console.log("Stored Token:", localStorage.getItem("authToken"));

        // Redirect based on the role after successful login
        if (result.user.role === "admin") {
          navigate("/admin/dashboard");
        } else if (result.user.role === "user") {
          navigate("/user/dashboard");
        } else {
          navigate("/car-selection");
        }
      } else {
        console.error("Token missing from API response:", result);
        setError("Login failed: Token missing.");
      }
    } else {
      setError(result.error || "Invalid credentials");
    }
  } catch (error) {
    console.error("Login Error:", error);
    setError("An error occurred. Please try again.");
  }
};


  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/3311574/pexels-photo-3311574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        color: "#fff", // Text color for better contrast
      }}
    >
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      ></div>

      <form
        onSubmit={handleLogin}
        className="position-relative p-4"
        style={{
          maxWidth: "400px",
          width: "100%",
          backgroundColor: "transparent",
          color: "#fff",
        }}
      >
        <div className="text-center mb-4">
          <h3>Welcome to Qdrive</h3>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            className="form-control bg-transparent text-white border-light"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control bg-transparent text-white border-light"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="d-flex justify-content-between mb-3">
          <a href="/forgot-password" className="text-decoration-none text-light">
            Forgot Password?
          </a>
          <a href="/signup" className="text-decoration-none text-light">
            New User? Signup
          </a>
        </div>
        <button type="submit" className="btn btn-light w-100">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
