import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";
  const [otp, setOtp] = useState("");
const [error,setError]=useState("");
const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Verifying OTP:", otp, "for email:", email);
  
    // Call backend API to verify
    setLoading(true);
     
    try {
       
        const response = await axiosInstance.post("/verify-otp", {
          email: email,
          otp: otp,
        });
        console.log("otp ",otp);
        console.log("Respose from the api for verifying the otp",response);
       if (response.data.message === 'otp is required') {
  toast.error("Please enter the 6-digit OTP to proceed.", {
    style: {
      background: "#e53e3e",  // a strong red (Tailwind red-600)
      color: "#fff",
      fontWeight: "600",
      borderRadius: "8px",
      padding: "12px 16px",
      boxShadow: "0 4px 12px rgba(229, 62, 62, 0.5)",
      fontSize: "16px",
      letterSpacing: "0.5px",
    },
  
  });
}

        if(response.data.message==='OTP has expired')
        {
            
            toast.error("Otp has been expired!Resend otp", {
        style: {
          background: "red",
          color: "#fff",
          fontWeight: "bold",
          
        },
        icon: "⚠️",
      });
      
        }

       
        
     if(response.data.message === 'otp verified')
    {
       
        toast.success("otp gets verified", {
        style: {
          background: "blue",
          color: "#fff",
          fontWeight: "bold",
          
        },
        icon: "⚠️",
      });
      
       navigate('/dashboard');
    }
        if (response.data.message === 'Otp doesnot match') {
  toast.error("The OTP you entered is incorrect. Please try again.", {
    style: {
      background: "rgba(37, 99, 235, 0.8)",  // semi-transparent blue
      color: "#fff",
      fontWeight: "600",
      borderRadius: "12px",
      padding: "14px 18px",
      boxShadow: "0 8px 24px rgba(37, 99, 235, 0.4)",
      fontSize: "16px",
      letterSpacing: "0.5px",
      backdropFilter: "blur(8px)",   // blur effect behind toast
      border: "1px solid rgba(255, 255, 255, 0.2)",
    },
  });
}


        
    {/*
        if (response.data?.error) {
          setError(response.data.message);
            console.log()
          return;
        }
    */}
        
      } catch (error) {
        if (error.response?.data?.message) {
          setError(error.response.data.message);
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
       
      }finally{
        setTimeout(() => {
    setLoading(false);
  }, 500);
      }
    };
 const handleResendOtp = async (e) => {
  e.preventDefault();
  setLoading(true); // 
  setOtp(""); 
  try {
     
    const response = await axiosInstance.post("/resend-otp", { email });
    console.log("Response from the api resending otp ", response);
    console.log("otp existing",setOtp);
    if(response.data.error===false)
    {
        
        toast.success("Otp sent again", {
        style: {
    background: "#22c55e",  // green
    color: "#fff",
    fontWeight: "bold",
  },
  
      });

    }

   
    

  } catch (error) {
    if (error.response?.data?.message) {
      setError(error.response.data.message);
    } else {
      setError("An unexpected error occurred. Please try again.");
    }
  } finally {
    setLoading(false); //
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md animate-fadeIn">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Verify OTP
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Enter the 6-digit code sent to  
          <span className="font-medium text-gray-800"> {email}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between gap-2">
            {[...Array(6)].map((_, i) => (
              <input
                key={i}
                type="text"
                value={otp[i] || ""}   
                maxLength="1"
                className="w-12 h-12 text-center text-lg font-bold border-2 border-black rounded-lg focus:outline-none  focus:border-blue-500"
               onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, "");
                    if (val.length === 1 && i < 5) {
    e.target.nextSibling.focus();  // next input pe cursor bhej do
  }
                  setOtp((prev) => {
                    const arr = prev.split("");
                    arr[i] = val;
                    return arr.join("");
                  });
                }}
              />
            ))}
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 cursor-pointer rounded-lg font-medium transition-colors "
          >
            Verify OTP
          </button>
        </form>

        <div className="text-center text-sm text-gray-500 mt-4">
  Didn’t get the code?{" "}
  {loading ? (
    <Loader />
  ) : (
    <button onClick={handleResendOtp} className="text-blue-500 hover:underline cursor-pointer">
      Resend Otp
    </button>
  )}
</div>

       
      </div>
    </div>
  );
};

export default VerifyOtp;
