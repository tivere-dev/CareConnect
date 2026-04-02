import React, { useState } from "react";
import "./doctorsProfile.css";
import Doctor1 from "..//../assets/images/doctor1.jpg";
import GoogleMap from "./Map"


const BookingPage = () => {
  const [selectedDate, setSelectedDate] = useState(8);
  const [selectedTime, setSelectedTime] = useState("");

  const dates = [30, "", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const times = {
    morning: ["09:00 AM", "09:30 AM", "10:30 AM"],
    afternoon: ["01:00 PM", "02:30 PM", "04:00 PM"],
    evening: ["05:30 PM", "06:00 PM"],
  };

  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar">
        <h2 className="logo">CareConnect</h2>
        <ul className="nav-links">
          <li>Find Doctors</li>
          <li>Clinics</li>
          <li>My Appointments</li>
        </ul>
        <input className="search" placeholder="Search doctors or clinics" />
      </nav>

      <div className="container">

        <div className="main">
          {/* LEFT SIDE */}
          <div className="left">
            {/* PROFILE CARD */}
            <div className="card profile">
              <img
                src={Doctor1}
                alt="doctor"
              />
              <div>
                <h2>Dr. Sarah Jenkins</h2>
                <span className="badge">BOARD CERTIFIED</span>
                <p>Senior Cardiologist • 15 Years Experience</p>
                <div className="rating">⭐⭐⭐⭐⭐ 4.9 (120 reviews)</div>
              </div>
            </div>

            {/* ABOUT */}
            <div className="card">
              <h3>About the Doctor</h3>
              <p>
                Dr. Sarah Jenkins is a highly distinguished board-certified Senior
                Cardiologist with over 15 years of dedicated experience in advanced
                cardiovascular health.
              </p>
            </div>

            {/* SPECIALIZATION */}
            <div className="card">
              <h3>Specializations</h3>
              <div className="tags">
                {[
                  "Interventional Cardiology",
                  "Heart Failure Surgery",
                  "Echocardiography",
                  "Valve Therapy",
                  "Preventative Cardiology",
                ].map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>

            {/* LOCATION */}
            <div className="card location">
              <div>
                <h3>Clinic Location</h3>
                <p>CareConnect Heart Center, NY</p>
                <p>123 Medical Plaza, 4th Floor</p>
                <p>Mon - Fri: 08:00 AM - 06:00 PM</p>
              </div>
              <GoogleMap />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="right card">
            <h3>Book Appointment</h3>
            <p className="month">May 2024</p>

            <div className="calendar">
              {dates.map((d, i) => (
                <button
                  key={i}
                  className={selectedDate === d ? "active" : ""}
                  onClick={() => d && setSelectedDate(d)}
                >
                  {d}
                </button>
              ))}
            </div>

            <div className="time-section">
              <h4>Morning</h4>
              {times.morning.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTime(t)}
                  className={selectedTime === t ? "active" : ""}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="time-section">
              <h4>Afternoon</h4>
              {times.afternoon.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTime(t)}
                  className={selectedTime === t ? "active" : ""}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="time-section">
              <h4>Evening</h4>
              {times.evening.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTime(t)}
                  className={selectedTime === t ? "active" : ""}
                >
                  {t}
                </button>
              ))}
            </div>


            <button className="confirm">Confirm Appointment</button>
            <p>No payment required now. Secure booking</p>
          </div>
        </div>
      </div>



      {/* FOOTER */}
      <footer className="footer">
        <p>© 2023 CareConnect. All rights reserved.</p>
      </footer>

    </div>
  );
};

export default BookingPage;