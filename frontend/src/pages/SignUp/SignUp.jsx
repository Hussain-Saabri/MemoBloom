import React, { useState } from "react";

import PasswordInput from "../../components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { ClipLoader } from "react-spinners";
import { use } from "react";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
 const[isLoading,setIsLoading]=useState(false);
   const navigate = useNavigate();

 const handleSignUp = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError("");

  if (!name) {
    setIsLoading(false);
    return setError("Please enter your name");
  }
  if (!validateEmail(email)) {
    setIsLoading(false);
    return setError("Please enter a valid email address.");
  }
  if (!password) {
    setIsLoading(false);
    return setError("Please enter the password");
  }

  try {
    const response = await axiosInstance.post("/create-account", {
      fullname: name,
      email: email,
      password: password,
    });

    if (response.data?.error) {
      setError(response.data.message);
      setIsLoading(false);
      return;
    }

    if (response.data?.accessToken) {
      localStorage.setItem("token", response.data.accessToken);
      setTimeout(() => {
        setIsLoading(false);
        navigate("/dashboard");
      }, 1000);
    }
  } catch (error) {
    if (error.response?.data?.message) {
      setError(error.response.data.message);
    } else {
      setError("An unexpected error occurred. Please try again.");
    }
    setIsLoading(false);
  }
};


  return (
    <>
      
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100 px-4">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl p-8 sm:p-10 space-y-6 border border-gray-200 mb-10">
          <h4 className="text-3xl text-center font-extrabold text-gray-900 m-0">Create Account</h4>
           <h1 className="text-3xl text-center font-extrabold text-gray-900"> <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-500 to-lime-400 drop-shadow-md">MemoBloom</span></h1>

          <form onSubmit={handleSignUp} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white shadow-sm"
            />

            <input
              type="text"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white shadow-sm"
            />

            <PasswordInput
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            
           
           <button
              type="submit"
              disabled={isLoading}  
              className={`w-full py-3 font-semibold rounded-xl shadow-md transition ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-700 hover:bg-blue-800 text-white"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <ClipLoader size={22} color="#ffffff" loading={true} />
                  <span className="ml-2">Creating Accout...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </button>






           
            
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline font-medium">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
