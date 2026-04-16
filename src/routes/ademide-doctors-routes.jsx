import{ BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "../pages/homepage";
import DoctorDashboard from "../pages/doctors/dashboard";
import  FindDoctors  from "../pages/doctors/find-doctors";
import Appointment from "../pages/doctors/appointment"


function DoctorsRoutes() {
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor/find-doctors" element={<FindDoctors />} />
          <Route path="/doctor/appointment" element={<Appointment />} />
        </Routes>
      </BrowserRouter>

    </>
  );}


export default DoctorsRoutes;
