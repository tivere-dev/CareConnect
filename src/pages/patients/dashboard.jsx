import "./dashboard.css";
import {
  Bell,
  Calendar,
  Video,
  Info,
  FileText,
  Pill,
  CheckCircle,
  CalendarCheck,
  Search,
  MapPin,
} from "lucide-react";
import Doctor1 from "../../assets/images/doctor1.jpg";
import Doctor2 from "../../assets/images/doctor2.jpg";

const Dashboard = () => {
  return (
    
    <div className="dashboard">
      {/* ================= NAVBAR ================= */}
      <header className="navbar">
        <div className="logo">
          <div className="logo-icon">+</div>
          <h2>CareConnect</h2>
        </div>

        <ul className="nav-links">
          <li className="active">Dashboard</li>
          <li>Appointments</li>
          <li>Medical Records</li>
          <li>Messages</li>
        </ul>

        <div className="nav-right">
          <Bell className="icon" />
          <div className="user">
            <img
              src={Doctor2}
              alt="user"
            />
            <div>
              <h4>John Doe</h4>
              <span>Patient ID: #8821</span>
            </div>
          </div>
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <div className="main-layout">
        {/* LEFT CONTENT */}
        <div className="content-left">
          <div className="welcome-card">
            <h1>Welcome back, John 👋</h1>
            <p>You have one upcoming appointment today.</p>
          </div>

          {/* Appointment */}
          <div className="appointment-card">
            <div className="appointment-info">
              <img
                src={Doctor1}
                alt="doctor"
              />
              <div>

                <span className="badge">NEXT APPOINTMENT</span>
                <h3 className="text-white" >Dr. Sarah Jenkins</h3>
                <p className="text-white">Senior Cardiologist</p>
                <div className="buttons">
                  <button className="btn primary button">
                    <Video size={16} /> Join Call
                  </button>
                  <button className="btn outline">
                    <Info size={16} /> Details
                  </button>
                </div>
              </div>

            </div>

            <div className="appointment-actions">
              <div className="date">
                <Calendar size={18} />
                <span>Today, 10:00 AM</span>
              </div>


            </div>
          </div>

          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <FileText size={26} />
              <div>
                <p>Total Consultations</p>
                <h2>12</h2>
              </div>
            </div>

            <div className="stat-card">
              <Pill size={26} />
              <div>
                <p>Active Prescriptions</p>
                <h2>03</h2>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <h2 className="section-title">Quick Actions</h2>
          <div className="actions-grid">
            <div className="action-card">
              <CalendarCheck size={22} />
              <h4>Book Appointment</h4>
              <p>Schedule a visit with a doctor.</p>
            </div>

            <div className="action-card">
              <Search size={22} />
              <h4>Find Doctors</h4>
              <p>Browse through specialists.</p>
            </div>
          </div>
        </div>


        {/* RIGHT SIDEBAR */}
        <aside className="sidebar">

          {/* Health Feed */}
          <div className="health-feed">
            <h3>Health Feed</h3>

            

            <div className="feed-item">
              <FileText />
              <div>
                <h4>New Lab Result</h4>
                <p>Blood test results available.</p>
                <span>2 HOURS AGO</span>
              </div>
            </div>

            <div className="feed-item">
              <Pill />
              <div>
                <h4>Refill Reminder</h4>
                <p>Your prescription is running low.</p>
                <span>YESTERDAY</span>
              </div>
            </div>

            <div className="feed-item">
              <CheckCircle />
              <div>
                <h4>Profile Updated</h4>
                <p>Insurance verified.</p>
                <span>OCT 20, 2023</span>
              </div>
              {/* <section> */}
                {/* <div className="tttt">
                  <p>View All Activity</p>

                </div> */}
              {/* </section> */}
            </div>
            
          </div>
          
          </aside>


        

          {/* Health Score */}
          <div className="health-score">

            <div className="score-header">
              <h3>Health Score</h3>
              <h1>84</h1>
            </div>

            <div className="progress-bar">
              <div className="progress"></div>
            </div>

            <p className="health-text">
              Your health vitals are looking great this month. Keep up the daily walking routine!
            </p>

            <div className="vitals">

              <div className="vital">
                <p>BP</p>
                <h4>120/80</h4>
              </div>

              <div className="vital">
                <p>WEIGHT</p>
                <h4>78 kg</h4>
              </div>

            </div>

          </div>
        

        {/* <!-- CLINIC --> */}
        <div class="card clinic-card">

          <div class="map">
          
          <MapPin />
            </div>

          <div class="clinic-info">

            <p class="small">NEAREST CLINIC</p>

            <h3>CareConnect Central Hospital</h3>

            <p>123 Health Ave, Chicago, IL</p>

          </div>

        </div>


        {/* </div> */}


        {/* ================= TABLE SECTION ================= */}
        <section className="consultations">
          <div className="consult-header">
            <h3>Recent Consultations</h3>
            <button className="btn outline">Download All (PDF)</button>
          </div>

          <table className="consult-table">
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Specialization</th>
                <th>Date</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Dr. Robert Fox</td>
                <td>Dermatologist</td>
                <td>Oct 12, 2023</td>
                <td>Skin Allergy</td>
                {/* <td>View Report</td> */}
                <td><span className="status success">Completed</span></td>
                <td>View Report</td>

              </tr>

              <tr>
                <td>Dr. Sarah Jenkins</td>
                <td>Cardiologist</td>
                <td>Sep 28, 2023</td>
                <td>Routine Checkup</td>
                {/* <td>View Report</td> */}
                <td><span className="status success">Completed</span></td>
                <td>View Report</td>
              </tr>

              <tr>
                <td>Dr. Michael Chen</td>
                <td>Neurologist</td>
                <td>Aug 15, 2023</td>
                <td>Follow-up</td>
                {/* <td>N/A</td> */}
                <td><span className="status danger">Cancelled</span></td>
                <td>N/A</td>
              </tr>

              {/* <tr>
              <td>ACTION</td>
              <td>View Report</td>
              <td>View Report</td>
              <td>N/A</td>
            </tr> */}
            </tbody>
          </table>
           {/* ================= FOOTER ================= */}
        <footer className="footer" >
          <p>© 2026 CareConnect. All rights reserved.</p>
        </footer>
        </section>
       </div>
       </div>

  );
};

export default Dashboard;