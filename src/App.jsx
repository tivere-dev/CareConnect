<<<<<<< HEAD
import "./App.css";
import Navbar from "./components/landing/Navbar";
import Hero from "./components/landing/Hero";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
=======
import './App.css'
import{ BrowserRouter, Routes, Route } from "react-router-dom"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={} /> */}

        </Routes>
      </BrowserRouter>
>>>>>>> f6de9aeb6c48d0d02decb40a7b993f1e4d7ec5c2
    </>
  );
}

export default App;
