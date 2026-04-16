import React from "react";
import "./Registration.css";
import { User, Mail, Lock, Eye, Stethoscope, Shield } from "lucide-react";

const Register = () => {
  return (
    <div className="page">

      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo">
          <div className="logo-icon">+</div>
          <span>CareConnect</span>
        </div>

        <button className="help-btn">Help</button>
      </header>


      {/* REGISTER CARD */}
      <div className="register-container">

        <div className="register-card">

          <h2>Create Account</h2>
          <p className="subtitle">Join our healthcare network today.</p>

          {/* FULL NAME */}
          <div className="input-group">
            <label>Full Name</label>
            <div className="input-field">
              <User size={18} />
              <input type="text" placeholder="John Doe" />
            </div>
          </div>

          {/* EMAIL */}
          <div className="input-group">
            <label>Email Address</label>
            <div className="input-field">
              <Mail size={18} />
              <input type="email" placeholder="name@example.com" />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="input-group">
            <label>Password</label>
            <div className="input-field">
              <Lock size={18} />
              <input type="password" placeholder="Create a password" />
              <Eye size={18} className="eye" />
            </div>
          </div>

          {/* ROLE SELECT */}
          <div className="role-section">
            <p>Register as</p>

            <div className="roles">
              <button className="role-btn">
                <User size={18} />
                <span>Patient</span>
              </button>

              <button className="role-btn">
                <Stethoscope size={18} />
                <span>Doctor</span>
              </button>

              <button className="role-btn active">
                <Shield size={18} />
                <span>Admin</span>
              </button>
            </div>
          </div>

          {/* SUBMIT */}
          <button className="submit-btn">
            Create Account
          </button>

          {/* OR */}
          <div className="divider">
            <span>OR</span>
          </div>

          <p className="signin">
            Already have an account? <a href="#">Sign in</a>
          </p>

        </div>

    </div>

  


    

{/* FOOTER */}
      <footer className="footer">
        © 2024 CareConnect Healthcare Systems. All rights reserved.
      </footer>
      </div>
  );
};

export default Register;