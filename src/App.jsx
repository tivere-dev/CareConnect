import './App.css'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/homepage";
import DoctorDashboard from "./pages/doctors/dashboard";
import Login from "./pages/login";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}




export default App;
