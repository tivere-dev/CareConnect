import {
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
  MapPin,
  Search,
  ShieldCheck,
  Video,
} from "lucide-react";
import heroConsultationImage from "../../assets/vitaly-gariev-EiL21cqvo58-unsplash.jpg";

const steps = [
  {
    id: 1,
    title: "Search Doctors",
    description:
      "Find the right specialist based on symptoms, location, or ratings.",
    icon: Search,
  },
  {
    id: 2,
    title: "Schedule Time",
    description: "Pick a convenient date and time that fits your busy schedule.",
    icon: CalendarCheck2,
  },
  {
    id: 3,
    title: "Consult Online",
    description: "Join a secure video call or visit the clinic for your consultation.",
    icon: Video,
  },
];

const specialists = [
  {
    specialty: "Cardiologist",
    name: "Dr. Sarah Jenkins",
    location: "New York, NY",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80",
  },
  {
    specialty: "Pediatrician",
    name: "Dr. Michael Chen",
    location: "Chicago, IL",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80",
  },
  {
    specialty: "Dermatologist",
    name: "Dr. Elena Rodriguez",
    location: "Miami, FL",
    rating: "5.0",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
  },
  {
    specialty: "Neurologist",
    name: "Dr. James Wilson",
    location: "Seattle, WA",
    rating: "4.7",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=600&q=80",
  },
];

export default function Hero() {
  return (
    <main>
      <section className="hero-section" id="home">
        <div className="container hero-grid">
          <div>
            <p className="trust-pill">
              <ShieldCheck size={14} /> Trusted by 50,000+ patients
            </p>

            <h1 className="hero-title">
              Book Trusted
              <br />
              Healthcare
              <br />
              <span>Appointments Easily</span>
            </h1>

            <p className="hero-copy">
              Access top-rated doctors and manage your health journey from the
              comfort of your home. Secure, fast, and professional.
            </p>

            <div className="hero-actions">
              <button className="btn btn-primary">Get Started</button>
              <button className="btn btn-secondary">Find a Doctor</button>
            </div>

            <div className="network-row">
              <div className="avatar-group" aria-hidden>
                <img
                  src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=100&q=80"
                  alt=""
                />
                <img
                  src="https://images.unsplash.com/photo-1614436163996-25cee5f54290?auto=format&fit=crop&w=100&q=80"
                  alt=""
                />
                <img
                  src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=100&q=80"
                  alt=""
                />
              </div>
              <p>
                Join our network
                <span>of 1,200+ Specialists</span>
              </p>
            </div>
          </div>

          <div className="consultation-visual" aria-label="Doctor consultation">
            <img
              className="consultation-image"
              src={heroConsultationImage}
              alt="Doctor consulting with a patient"
            />
            <div className="availability-card">
              <CheckCircle2 size={18} />
              <div>
                <p>Next Available</p>
                <strong>Today at 2:00 PM</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="how-section" id="services">
        <div className="container">
          <h2>How CareConnect Works</h2>
          <p className="section-copy">
            Get the care you need in three simple steps. We&apos;ve streamlined
            the process to prioritize your health.
          </p>
          <div className="steps-grid">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <article className="step-card" key={step.id}>
                  <div className="step-icon">
                    <Icon size={18} />
                  </div>
                  <h3>
                    {step.id}. {step.title}
                  </h3>
                  <p>{step.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="specialists-section" id="doctors">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Featured Specialists</h2>
              <p className="section-copy">
                Hand-picked medical professionals with excellent patient
                satisfaction.
              </p>
            </div>
            <a href="#" className="link-arrow">
              View all doctors <ArrowRight size={15} />
            </a>
          </div>

          <div className="specialists-grid">
            {specialists.map((doctor) => (
              <article className="doctor-card" key={doctor.name}>
                <div className="doctor-photo-wrap">
                  <img src={doctor.image} alt={doctor.name} className="doctor-photo" />
                  <span className="rating-badge">★ {doctor.rating}</span>
                </div>
                <div className="doctor-content">
                  <p className="doctor-specialty">{doctor.specialty}</p>
                  <h3>{doctor.name}</h3>
                  <p className="doctor-location">
                    <MapPin size={13} /> {doctor.location}
                  </p>
                  <button className="book-btn">Book Now</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section" id="about">
        <div className="container cta-grid">
          <div>
            <h2>Ready to prioritize your health?</h2>
            <div className="cta-actions">
              <button className="btn btn-light">Create Free Account</button>
              <button className="btn btn-outline-light">Learn More</button>
            </div>
          </div>

          <aside className="appointments-panel">
            <div className="panel-head">
              <h3>My Appointments</h3>
              <span>...</span>
            </div>

            <div className="appointment-item">
              <span className="dot" />
              <div>
                <strong>Dr. Sarah Jenkins</strong>
                <p>Tomorrow at 10:00 AM</p>
              </div>
              <span className="status confirmed">Confirmed</span>
            </div>

            <div className="appointment-item">
              <span className="dot muted" />
              <div>
                <strong>Dr. Michael Chen</strong>
                <p>22 Oct, 2:30 PM</p>
              </div>
              <span className="status completed">Completed</span>
            </div>

            <button className="manage-btn">Manage Schedule</button>
          </aside>
        </div>
      </section>

      <footer className="footer" id="contact">
        <div className="container footer-grid">
          <div>
            <p className="footer-brand">CareConnect</p>
            <p className="footer-copy">
              Leading the digital healthcare transformation. We make
              professional care accessible to everyone, everywhere.
            </p>
          </div>

          <div>
            <h4>Resources</h4>
            <ul>
              <li>Find a Doctor</li>
              <li>Lab Tests</li>
              <li>Video Consult</li>
              <li>Health Packages</li>
            </ul>
          </div>

          <div>
            <h4>Company</h4>
            <ul>
              <li>About Us</li>
              <li>Careers</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>

          <div>
            <h4>Support</h4>
            <ul>
              <li>Help Center</li>
              <li>Contact Support</li>
              <li>FAQs</li>
              <li>Patient Stories</li>
            </ul>
          </div>
        </div>

        <div className="container footer-bottom">
          <p>© 2024 CareConnect Healthcare. All rights reserved.</p>
          <p>English (US)</p>
        </div>
      </footer>
    </main>
  );
}
