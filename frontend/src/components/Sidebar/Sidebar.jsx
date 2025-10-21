import React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import ContactUs from "../../pages/Contact/Contact";
import { Button } from "flowbite-react";
export default function Sidebar({ isOpen, onClose, className }) {
const navigate=useNavigate();
  const onLogout=()=>{
    
    console.log("Logging out");
    localStorage.clear();
    console.log("navigating to the login");
    navigate("/login");
  }
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-white z-40"
            
          />

          {/* Sidebar */}
       <motion.div
  initial={{ x: "100%" }}
  animate={{ x: 0 }}
  exit={{ x: "100%" }}
  transition={{ type: "tween", duration: 0.5 }}
  className={`fixed top-12 right-0 h-full w-full sm:w-72 md:w-85 lg:w-96 shadow-xl z-50 flex flex-col bg-white text-black ${className}`}
>

            {/* Close Button */}
           

            {/* Menu Items */}
           <nav className="flex flex-col px-4  font-sans space-y-3 mt-6">
 
 
  
 
<Link 
  to="/contact" 
  className="text-gray-800 text-[25px] font-medium tracking-wide hover:text-yellow-500 transition duration-200"
  onClick={onClose} // also close sidebar after navigating
>
  Contact
</Link>
  

  
  
  
  <button
  onClick={onLogout}
  className="absolute top-[70px] left-4 text-gray-800 text-[25px] font-medium tracking-wide hover:text-yellow-500"
>
  SignOut
</button>
</nav>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
