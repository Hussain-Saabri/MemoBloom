import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import PasswordInput from '../../components/Input/PasswordInput';
import { ClipLoader } from 'react-spinners';
import Loader from '../../components/Loader/Loader';
import toast from 'react-hot-toast';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email) {
      setIsLoading(false);
      return setError("Email is required");
    }
    if (!password) {
      setIsLoading(false);
      return setError("Password is required");
    }

    try {
      const response = await axiosInstance.post("/login", { email, password });
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        toast.success("Logged In!", {
  style: {
    background: "linear-gradient(135deg, #4ade80, #16a34a)", // brighter green gradient
    color: "#f0fdfa", // super light teal-ish
    fontWeight: "700",
    borderRadius: "20px",
    padding: "10px 20px",  // increased padding for height
    boxShadow: "0 8px 25px rgba(22, 163, 74, 0.7), 0 0 18px rgba(5, 150, 105, 0.5)", // stronger glow with bigger spread
    fontSize: "19px",
    lineHeight: "1.4",  // better vertical alignment
    letterSpacing: "0.8px",
    textTransform: "capitalize",
    fontFamily: "'Poppins', sans-serif",
    backdropFilter: "blur(10px)",
    border: "1.5px solid rgba(22, 163, 74, 0.5)",
  },
  iconTheme: {
    primary: "#a7f3d0",
    secondary: "#065f46",
  },
  duration: 4500,
});


        setTimeout(() => {
          setIsLoading(false);
          navigate("/dashboard");
        }, 800);
      } else {
        setError("Invalid credentials. Please try again.");
        setIsLoading(false);
      }
    } catch (err) {
      console.log("Error", err);
      setError("Invalid credentials. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 via-white to-purple-100">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl shadow-lg rounded-2xl p-6 sm:p-10 border border-gray-200 transform transition-all hover:scale-[1.01]">
        
        {/* Logo & Heading */}
        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-500 to-lime-400 drop-shadow-md">
              MemoBloom
            </span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white shadow-sm transition"
          />

          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 font-semibold rounded-xl shadow-md transition-all duration-200 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-700 hover:bg-blue-800 text-white"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <ClipLoader size={20} color="#ffffff" loading={true} />
                <span className="ml-2">Logging in...</span>
              </div>
            ) : (
              "Login"
            )}
          </button>

          {error && (
            <p className="text-red-500 text-sm text-center animate-pulse">
              {error}
            </p>
          )}
        </form>

        {/* Sign up link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link
            to="/signUp"
            className="text-blue-600 hover:underline font-medium transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
