import React from "react";
import "./Appiontments.css";
import {
  FaBell,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaInfoCircle,
} from "react-icons/fa";
import Doctor1 from "..//../assets/images/doctor1.jpg";

/* ================= REUSABLE COMPONENTS ================= */

// Navbar
const Navbar = () => (
  <header className="bg-white border-b border-slate-200">
    <div className="container flex-between py-3">
      <div className="logo">
        <div className="logo-box">+</div>
      <span>CareConnect</span>
      </div>

      <nav className="nav-links">
        <a href="#">Home</a>
        <a href="#">Doctors</a>
        <a href="#" className="active">Appointments</a>
        <a href="#">Profile</a>
        <button className="icon-btn">
          <FaBell />
        </button>
      </nav>
    </div>
  </header>
);

// Section Wrapper
const Section = ({ number, title, children }) => (
  <section className="card">
    <h2 className="section-title">
      <span className="section-number">{number}</span>
      {title}
    </h2>
    {children}
  </section>
);

// Input Field
const InputField = ({ label, ...props }) => (
  <div>
    <label className="label">{label}</label>
    <input className="input" {...props} />
  </div>
);

/* ================= MAIN COMPONENT ================= */

const Booking = () => {
  return (
    <div className="page">

      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="container main">

        {/* PAGE TITLE */}


        <div className="grid">

          {/* LEFT SIDE (FORMS) */}
          <div className="form-section">
            <div className="page-header">
              <h1>Complete Booking</h1>
              <p>Finalize your visit details with Dr. Sarah Jenkins.</p>
            </div>
            {/* Progress Bar */}
            <div className="progress-bar">
              <div className="active"></div>
              <div className="active"></div>
              <div></div>
            </div>

            {/* Patient Details */}
            <Section number="1" title="Patient Details">
              <InputField label="Full Name" defaultValue="Jane Doe" />

              <div className="grid-2">
                <InputField label="Contact Number" defaultValue="(555) 000-0000" />

                <div className="relative">
                  <InputField label="Date of Birth" placeholder="mm/dd/yyyy" />
                  {/* <FaCalendarAlt className="input-icon" /> */}
                </div>
              </div>
            </Section>

            {/* Appointment Reason */}
            <Section number="2" title="Appointment Reason">
              <label className="label">Describe your symptoms or reason for visit</label>
              <textarea
                className="input"
                rows="4"
                placeholder="Briefly describe your condition..."
              />
            </Section>

            {/* Insurance */}
            <Section number="3" title="Insurance Details">
              <div className="grid-2">
                <InputField
                  label="Insurance Provider"
                  defaultValue="Blue Cross"
                />
                <InputField
                  label="Group Number"
                  defaultValue="GRP-12345"
                />
              </div>
            </Section>
          </div>

          {/* RIGHT SIDE (SUMMARY) */}
          <div className="summary">

            <div className="card">
              <h3>Appointment Summary</h3>

              {/* Doctor Info */}
              <div className="doctor-box">
                <img src={Doctor1} alt="doctor" />
                <div>
                  <h4>Dr. Sarah Jenkins</h4>
                  <p>Cardiology Specialist</p>
                  <span className="rating">⭐ 4.9 (120 reviews)</span>
                </div>
              </div>

              {/* Appointment Details */}
              <div className="details">
                <p><FaCalendarAlt /> October 24, 2023</p>
                <p><FaClock /> 10:30 AM</p>
                <p><FaMapMarkerAlt /> Medical Plaza, Suite 402</p>
              </div>

              {/* Pricing */}
              <div className="pricing">
                <p><span>Consultation</span><span>$120</span></p>
                <p><span>Booking Fee</span><span>$0</span></p>
                <h4><span>Total Amount</span><span>$120</span></h4>
              </div>

              {/* Button */}
              <button className="btn-primary">
                <FaCheckCircle /> Confirm Appointment
              </button>

              <p className="small-text">
                By clicking "Confirm Appointment", you agree to our Terms and Health Policy.
              </p>
            </div>

            {/* Help Box */}
            <div className="help-box">
              <FaInfoCircle />
              <p>
                Need help? <a href="#">Contact Support </a> available 24/7 for medical emergencies
              </p>
            </div>

          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2023 CareConnect. All rights reserved.</p>
      </footer>

    </div>
  );
};

export default Booking;