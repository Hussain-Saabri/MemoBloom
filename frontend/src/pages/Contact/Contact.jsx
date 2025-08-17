import Navbar from "../../components/Navbar/Navbar";
import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
export default function ContactUs() {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});
    const [loading,setLoading]=useState(false);
    //validate form 
    const validateForm=()=>{
        console.log("Inside the validateForm function");
        const newErrors={};
        if(!email?.trim())
            {
                newErrors.email="Email is Required";
                console.log("Email is required");
            }    
        if(!name?.trim()) 
        {
                newErrors.name="Title is Required";
        }
        if(!message?.trim())    
        {
            newErrors.message="Message is Required";
        }
        console.log("Newerrors are",newErrors);
       if (Object.values(newErrors).length > 0) {
  console.log("Errors present");
  toast.error("Please fill all required fields!", {
    style: {
      background: "#fa1111",  
      color: "#fff",
      fontSize: "14px",       // smaller text for small screens
      padding: "10px",        // compact padding
      borderRadius: "8px",    // rounded for mobile look
      fontWeight: "600",
      marginTop:"6px",
    },
    icon: "⚠️",
    duration: 3000,           // short duration on mobile
  });
}


        return newErrors;
    }
//calling the api
    const handleContact=async (e)=>{
        e.preventDefault();
        console.log("Inside the contact function");
        const errorsFound=validateForm();
        if (Object.keys(errorsFound).length > 0) {
      setErrors(errorsFound);
      return;
    } else {
      setErrors({});
    }
    setLoading(true);
    try{
        const response =await axiosInstance.post("/contact",{email,name,message});
        console.log("response",response);
        if(!response.data.error)
        {
            toast.success("Message sent successfully 🎉", {
          style: {
            background: "linear-gradient(135deg,#16a34a,#15803d)",
            color: "#fff",
            fontWeight: "600",
            borderRadius: "12px",
            padding: "14px 18px",
            fontSize: "15px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
          },
          icon: "✅",
          position: "top-center",
        });
        setName("");
        setEmail("");
        setMessage("");

        }


    }catch(error){
        console.log("error",error);
        toast.error("Failed to send message ❌", {
        style: {
          background: "#ef4444",
          color: "#fff",
          fontWeight: "600",
          borderRadius: "12px",
          padding: "14px 18px",
          fontSize: "15px",
        },
        icon: "⚠️",
        position: "top-center",
      });


    }finally
    {
        setLoading(false);
    }
    
    



    }


  return (
    <div className="min-h-screen bg-gray-50 px-4">
      <Navbar />
      
      <div className="max-w-2xl mx-auto mt-16">
        <h2 className="text-2xl font-bold text-center text-gray-800 py-2 ">
          Contact Us
        </h2>
        <p className="text-center text-gray-600 mb-5">
          Have a question or feedback? Fill out the form below and we’ll get back to you.
        </p>

        <form className="space-y-3 bg-white p-6 rounded-xl shadow-md" onSubmit={handleContact}>
          <div>
            <label className="block text-gray-600 mb-1">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
               onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>
          {errors.name && <p className="text-red-500 text-sm font-extrabold animate-pulse">{errors.name}</p>}

          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
             {errors.email && <p className="text-red-500 text-sm font-extrabold animate-pulse">{errors.email}</p>}
          </div>
          {}
          <div>
            <label className="block text-gray-600 mb-1">Message</label>
            <textarea
              rows="4"
              placeholder="Write your message..."
              value={message}
              onChange={(e)=>setMessage(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            ></textarea>
          </div>
          {errors.message && <p className="text-red-500 text-sm font-extrabold animate-pulse">{errors.message}</p> }
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition transform hover:scale-[1.02] disabled:opacity-60"
          >
            {loading?"Sending":"Send"}</button>
        </form>

        
      </div>
    </div>
  );
}
