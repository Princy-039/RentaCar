// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
// //     const myHeaders = new Headers();
// //     myHeaders.append("Content-Type", "application/json");

// //     const raw = JSON.stringify({
// //       email: email,
// //       password: password,
// //     });

// //     const requestOptions = {
// //       method: "POST",
// //       headers: myHeaders,
// //       body: raw,
// //       redirect: "follow",
// //     };

// //     try {
// //       const response = await fetch("http://localhost:3000/login", requestOptions);
// //       const result = await response.json();
// //       console.log("Result", result);

// //       if (response.ok) {
// //         // Store the token in localStorage
// //         localStorage.setItem("authToken", result.token);

// //         if (result.user.role === "admin") {
// //           navigate("/admin"); // Redirect admin to admin dashboard
// //         } else if (result.user.seatAssigned) {
// //           navigate("/user"); // Redirect returning users to user dashboard
// //         } else {
// //           navigate("/seat-selection"); // Redirect first-time users to seat selection
// //         }
// //       } else {
// //         alert(result.error || "Invalid credentials");
// //       }
// //     } catch (error) {
// //       console.error("Error:", error);
// //       alert("An error occurred. Please try again.");
// //     }
//   };

//   return (
//     <div
//       className="d-flex justify-content-center align-items-center vh-100"
//       style={{
//         background: "linear-gradient(135deg, #f3f4f6, #e3e8ec)",
//       }}
//     >
//       <div className="row w-100 mx-0">
//         <div className="col-md-6 d-flex justify-content-center align-items-center">
//           <div
//             className="card shadow-lg p-4"
//             style={{ maxWidth: "400px", width: "100%", opacity: 0.95 }}
//           >
//             <div className="text-center mb-4">
//               <img
//                 src="public/RS-Logo.png"
//                 alt="Reading Space Logo"
//                 className="img-fluid mb-3"
//                 style={{ maxWidth: "80px" }}
//               />
//               <h3 className="text-primary">Welcome to Qdrive-Rental Cars</h3>
//             </div>
//             <form onSubmit={handleLogin}>
//               <div className="mb-3">
//                 <label htmlFor="email" className="form-label">
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   className="form-control"
//                   id="email"
//                   placeholder="Enter your email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="password" className="form-label">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   className="form-control"
//                   id="password"
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="d-flex justify-content-between mb-3">
//                 <a
//                   href="/forgot-password"
//                   className="text-decoration-none text-primary"
//                 >
//                   Forgot Password?
//                 </a>
//                 <a href="/signup" className="text-decoration-none text-primary">
//                   New User? Signup
//                 </a>
//               </div>
//               <button type="submit" className="btn btn-primary w-100">
//                 Login
//               </button>
//             </form>
//           </div>
//         </div>
//         <div className="col-md-6 d-none d-md-flex justify-content-center align-items-center">
//           <img
//             src="https://images.pexels.com/photos/3311574/pexels-photo-3311574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//             alt="Car"
//             className="img-fluid"
//             style={{ maxWidth: "80%", borderRadius: "10px" }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
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
      {/* Overlay for better readability */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      ></div>

      {/* Login Form */}
      <form
        onSubmit={handleLogin}
        className="position-relative p-4"
        style={{
          maxWidth: "400px",
          width: "100%",
          backgroundColor: "transparent", // No background box
          color: "#fff", // White text for contrast
        }}
      >
        <div className="text-center mb-4">
        
          <h3>Welcome to Qdrive</h3>
        </div>
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
            style={{ color: "#fff" }}
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
            style={{ color: "#fff" }}
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

