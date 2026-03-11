// import './App.css
import '../index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/homepage";
import DoctorDashboard from "../pages/doctors/dashboard";
import Login from "../pages/login";
import Register from '../pages/Registration';
import Dashboard from '../pages/patients/dashboard';
import Profile from "../pages/patients/doctorsProfile"

function DoctorsRoutes() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/patient/dashboard' element={<Dashboard />} />
          <Route path='/register' element={<Register />} />
          <Route path='/doctor/profile' element={<Profile />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}




export default  DoctorsRoutes;
