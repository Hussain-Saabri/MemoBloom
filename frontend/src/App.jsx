import { Routes, Route } from "react-router-dom";
import  { lazy, Suspense } from "react";
import Loader from "./components/Loader/Loader";
import "./App.css";

const Home = lazy(() => import("./pages/Home/Home"));
const Login = lazy(() => import("./pages/Login/Login"));
const SignUp = lazy(() => import("./pages/SignUp/SignUp"));
const VerifyOtp = lazy(() => import("./pages/VerifyOtp/Verify-otp"));
const ResetPassword = lazy(() => import("./pages/ResetPassword/ResetPassword"));
const ContactUs = lazy(() => import("./pages/Contact/Contact"));

const App = () => {
  return (
    <Suspense fallback={<Loader/>}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </Suspense>
  );
};

export default App;
