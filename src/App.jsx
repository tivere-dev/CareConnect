import "./App.css";
import{ BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/homepage";
import DoctorDashboard from "./pages/doctors/dashboard";


function App() {
  return(
    <>


      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />

        </Routes>
      </BrowserRouter>

    </>
  );}


export default App;
