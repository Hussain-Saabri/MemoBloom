import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import PasswordInput from "../../components/Input/PasswordInput";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || {}; // email passed from previous page

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpdatePassword = async (e) => {

    e.preventDefault();
    
    setError("");

    if (!password || !confirmPassword) {
      return setError("Both fields are required");
    }
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/update-password", {
        email,
        password,
      });
      console.log("Updated the password successfylly",response);
      toast.success("Password updated successfully!");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      console.log(err);
      setError("Failed to update password. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 via-white to-purple-100">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl shadow-lg rounded-2xl p-6 sm:p-10 border border-gray-200 transform transition-all hover:scale-[1.01]">
        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Update Password
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Enter your new password below
          </p>
        </div>

        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
          />
          <PasswordInput
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 font-semibold rounded-xl shadow-md transition-all duration-200 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <ClipLoader size={20} color="#ffffff" loading={true} />
                <span className="ml-2">Updating...</span>
              </div>
            ) : (
              "Update Password"
            )}
          </button>

          {error && (
            <p className="text-red-500 text-sm text-center animate-pulse">
              {error}
            </p>
          )}
        </form>

        <p
          onClick={() => navigate("/login")}
          className="text-gray-600 hover:underline text-center cursor-pointer mt-4 text-sm"
        >
          Back to Login
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
