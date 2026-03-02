import { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
        { email }
      );
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred");
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="d-flex justify-content-center align-items-center vh-100"
     style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}>
    <div className="card shadow-lg p-4" style={{ width: "400px" }}>
      <h3 className="text-center mb-4">Forgot Password</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <div className="mb-3 input-group">
            <span className="input-group-text">
              <i className="bi bi-envelope-fill"></i>
            </span>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <button className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Sending..." : (
            <>
              <i className="bi bi-send-fill me-2"></i>
              Send Reset Link
            </>
          )}
        </button>
      </form>

      <p className="text-center mt-3">
      Don't have an account?{" "}
        <a href="/register" className="text-decoration-none">
        Register
        </a>
      </p>

      {message && (
        <div className="alert alert-info mt-3 text-center">
          {message}
        </div>
      )}
    </div>
  </div>
);
}

export default ForgotPassword;