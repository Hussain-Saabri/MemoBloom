import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import VerifyOtp from "./pages/VerifyOtp/Verify-otp";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import ContactUs from "./pages/Contact/Contact";
const routes=(
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/verify-otp" element={<VerifyOtp />} />
              <Route path="/reset-password" element={<ResetPassword />} />
               <Route path="/contact" element={<ContactUs />} />
            </Routes>    
);      
const App=()=>{
    return <div>{routes}
      </div>
}   
export default App
