import './App.css'
import DoctorsRoutes from './routes/doctors-routes';
import  AdemideRoutes from "./routes/ademide-doctors-routes";
import './index.css'
import './public.css'
import Admin from "./routes/admin-routes";

function App() {

  return (
    <>
    <AdemideRoutes />
     <DoctorsRoutes /> 
      <Admin />
    </>
  )
}



export default App;



