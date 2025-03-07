// src/App.jsx
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Services from './features/services/Services.jsx';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminDashboard from './features/admin/AdminDashboard.jsx';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import Navbar from "./components/Navbar.jsx";
import Login from "./features/auth/Login.jsx";
import Signup from "./features/auth/Signup.jsx";
import Vehicles from "./features/vehicles/Vehicles.jsx";
import VehicleDetails from "./features/vehicles/VehicleDetails.jsx";
import AdminVehicleForm from "./features/admin/AdminVehicleForm.jsx";
import UserDashboard from "./features/user/UserDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import {Settings} from "@mui/icons-material";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home/>}/>
        <Route path="/vehicles" element={<Vehicles/>}/>
        <Route path="/services" element={<Services/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/vehicles/:id" element={<VehicleDetails/>}/>
        <Route path="/settings" element={<Settings/>}/>
        
        {/* Protected Admin Route */}
        <Route element={<AdminProtectedRoute/>}>
          <Route path="/admin/vehicle-form" element={<AdminVehicleForm/>}/>
          <Route path="/dashboard" element={<AdminDashboard/>}/>
        </Route>
        
        {/* Protected Routes for User Dashboard */}
        <Route element={<ProtectedRoute/>}>
          <Route path="/user/dashboard" element={<UserDashboard/>}/>
        </Route>
      
      </Routes>
    </Router>
  );
}

export default App;
