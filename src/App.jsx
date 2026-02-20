import "./App.css";
import LandingPage from "./pages/homepage";
import{ BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return(
    <>


      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />

        </Routes>
      </BrowserRouter>

    </>
  );}


export default App;
