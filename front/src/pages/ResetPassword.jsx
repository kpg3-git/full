import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function ResetPassword() {

  const { token } = useParams();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Password match validation
    if (newPassword !== confirmPassword) {
      setAlertType("danger");
      setMessage("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/reset-password/${token}`,
        { newPassword }
      );

      setAlertType("success");
      setMessage(res.data.message);
    } catch (err) {
      setAlertType("danger");
      setMessage(
        err.response?.data?.message || "Invalid or expired token"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}
    >
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Reset Password</h3>

        <form onSubmit={handleSubmit}>
          {/* New Password */}
          <div className="mb-3 input-group">
            <span className="input-group-text">
              <i className="bi bi-lock-fill"></i>
            </span>
            <input
              type="password"
              className="form-control"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-3 input-group">
            <span className="input-group-text">
              <i className="bi bi-lock-fill"></i>
            </span>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-success w-100" disabled={loading}>
            {loading ? "Updating..." : (
              <>
                <i className="bi bi-check-circle-fill me-2"></i>
                Reset Password
              </>
            )}
          </button>
        </form>

        {message && (
          <div
            className={`alert alert-${alertType} mt-3 text-center`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;