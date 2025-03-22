import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setError("Invalid or expired reset link.");
      return;
    }

    setLoading(true); // Prevent multiple clicks
    setError("");
    setMessage("");

    try {
      const res = await fetch("http://localhost:3000/email/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();
      console.log("API Response:", data); // ✅ Debugging Step

      if (res.ok) {
        setMessage("Password reset successful! Redirecting to login...");
        localStorage.removeItem("user"); // 🔹 Clear old user data
        sessionStorage.removeItem("user");

        setTimeout(() => navigate("/login"), 3000);
      } else {
        setError(data.error || "Failed to reset password.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Reset Password</h3>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Enter new password"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Resetting..." : "Reset Password"}
      </button>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default ResetPassword;
