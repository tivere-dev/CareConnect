import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "./Registration.css";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(name, email, password, "patient");
      navigate("/patient/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <header className="navbar">
        <div className="logo">
          <div className="logo-icon">+</div>
          <span>CareConnect</span>
        </div>
        <Link to="/login" className="help-btn">Sign In</Link>
      </header>

      <div className="register-container">
        <form className="register-card" onSubmit={handleSubmit}>
          <h2>Create Account</h2>
          <p className="subtitle">Join CareConnect as a patient today.</p>

          {error && <p style={{ color: "#ef4444", fontSize: "0.875rem" }}>{error}</p>}

          <div className="input-group">
            <label>Full Name</label>
            <div className="input-field">
              <User size={18} />
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <div className="input-field">
              <Mail size={18} />
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-field">
              <Lock size={18} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password (min 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                {showPassword ? <EyeOff size={18} className="eye" /> : <Eye size={18} className="eye" />}
              </button>
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Creating Account..." : "Create Patient Account"}
          </button>

          <div className="divider">
            <span>OR</span>
          </div>

          <p className="signin">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>

      <footer className="footer">
        &copy; 2024 CareConnect Healthcare Systems. All rights reserved.
      </footer>
    </div>
  );
};

export default Register;
