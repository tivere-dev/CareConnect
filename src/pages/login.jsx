import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Registration.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await login(email, password);

      if (user.role === "admin") navigate("/admin/dashboard");
      else if (user.role === "doctor") navigate("/doctor/dashboard");
      else navigate("/patient/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
    
    <header className="navbar">
        <div className="logo">
          <div className="logo-icon">+</div>
          <span>CareConnect</span>
        </div>
        <Link to="/register" className="help-btn">Sign Up</Link>
      </header>
    <div className="wrapper">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>
        <p className="subtitle">Please sign in to manage your appointments</p>

        {error && <p style={{ color: "#ef4444", fontSize: "0.875rem", marginBottom: "0.5rem" }}>{error}</p>}

        <div className="input-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="yourname@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-login" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <section className="register">
          <p>
            Don&apos;t have an account?{" "}
            <Link to="/register" className="create">
              Create Account
            </Link>
          </p>
        </section>
      </form>
    </div>
    </div>
  );
};

export default Login;
